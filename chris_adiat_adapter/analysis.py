import base64
import gzip
import json
import os
import re
import shutil
import tempfile
import time
from itertools import islice
from pathlib import Path

from PIL import Image, ImageOps, UnidentifiedImageError

from chris_adiat_adapter import __version__
from chris_adiat_adapter.algorithms import (
    effective_options_for_algorithm,
    run_adiat_algorithm,
)
from chris_adiat_adapter.isolation import run_with_timeout
from chris_adiat_adapter.normalization import normalize_aoi
from chris_adiat_adapter.parquet_artifacts import (
    ObservationArtifactWriter,
    publish_prepared_observation_artifact,
)
from chris_adiat_adapter.profiles import algorithms_for_profile
from chris_adiat_adapter.s3_sources import load_source
from chris_adiat_adapter.schemas import PayloadValidationError, validate_payload


DEFAULT_MAX_OBSERVATIONS_PER_SOURCE = 1000
# Keep the adapter aligned with CHRIS's direct-persistence guard. The old 5k
# inline ceiling silently dropped valid observations from multi-flight runs.
DEFAULT_MAX_OBSERVATIONS_PER_BATCH = 100_000
DEFAULT_BATCH_TIMEOUT_SECONDS = 3600
BATCH_TIMEOUT_SAFETY_SECONDS = 15 * 60
DEFAULT_MAX_RESULT_BYTES = 750_000
MAX_ERROR_CHARS = 1024
# Source-terminal events are the incremental hand-off used by CHRIS while a
# multi-flight run is still executing. Keep the event envelope bounded so one
# unusually dense image cannot block the Dask scheduler event stream.
MAX_PROGRESS_OBSERVATION_BYTES = 5_000_000
PARQUET_OBSERVATION_BATCH_SIZE = 256


def run_batch(
    payload,
    source_loader=None,
    algorithm_runner=None,
    work_dir=None,
    source_timeout_seconds=None,
    batch_timeout_seconds=None,
    progress_callback=None,
    apply_result_byte_limit=True,
    artifact_s3_client=None,
):
    source_loader = source_loader or load_source
    algorithm_runner = algorithm_runner or run_adiat_algorithm

    try:
        validate_payload(payload)
    except PayloadValidationError as exc:
        return _empty_response("failed", "invalid_payload", str(exc), payload)

    request = payload["request"]
    algorithms = request.get("algorithms") or algorithms_for_profile(request["profile"])
    if not algorithms:
        return _empty_response(
            "failed",
            "not_configured",
            f"profile {request['profile']} is not configured",
            payload,
        )

    sources = request["sources"]
    if source_timeout_seconds is None:
        source_timeout_seconds = _positive_float(
            os.getenv(
                "ADIAT_SOURCE_TIMEOUT_SECONDS",
                os.getenv("ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS", "270"),
            ),
            270,
        )
    else:
        source_timeout_seconds = _positive_float(source_timeout_seconds, 270)
    if batch_timeout_seconds is None:
        configured_batch_timeout_seconds = _positive_float(
            os.getenv(
                "ADIAT_BATCH_TIMEOUT_SECONDS", str(DEFAULT_BATCH_TIMEOUT_SECONDS)
            ),
            DEFAULT_BATCH_TIMEOUT_SECONDS,
        )
        batch_timeout_seconds = _effective_batch_timeout_seconds(
            configured_batch_timeout_seconds,
            source_count=len(sources),
            source_timeout_seconds=source_timeout_seconds,
        )
    else:
        batch_timeout_seconds = _positive_float(
            batch_timeout_seconds,
            DEFAULT_BATCH_TIMEOUT_SECONDS,
        )

    parquet_persistence = _uses_parquet_persistence(request)
    # Legacy Dask work publishes source chunks. Parquet work must retain its
    # bounded photo-detector rows until the worker has published the artifact.
    stream_observations = progress_callback is not None and not parquet_persistence
    observations = [] if not stream_observations else None
    normalized_observation_count = 0
    processed_sources = []
    source_failures = []
    algorithm_failures = []
    truncations = []
    successful_algorithm_runs = 0
    runtime_provenance = []
    processed_source_count = 0
    progress_state = {
        "source_sequence": 0,
        "checkpoint_sequence": 0,
        "completed_sources": 0,
        "failed_sources": 0,
        "completed_algorithm_runs": 0,
        "failed_algorithm_runs": 0,
        "total_algorithm_runs": 0,
    }
    batch_deadline = time.monotonic() + batch_timeout_seconds
    max_batch_observations = _max_observations_per_batch()
    task_id = _bounded_text(payload.get("task_id"), 128)
    attempt_id = _payload_attempt_id(payload)
    persistence_result = None
    artifact_errors = []

    with _work_dir(work_dir) as batch_work_dir:
        artifact_writer = (
            ObservationArtifactWriter(
                payload,
                Path(batch_work_dir) / "artifact" / "observations.parquet",
            )
            if parquet_persistence
            else None
        )
        algorithms_by_source = {
            source["media_id"]: _algorithms_for_source(request, source, algorithms)
            for source in sources
        }
        algorithm_options_by_source = {
            source["media_id"]: _algorithm_options_for_source(
                request,
                source,
                algorithms_by_source[source["media_id"]],
            )
            for source in sources
        }
        progress_state["total_algorithm_runs"] = sum(
            len(value) for value in algorithms_by_source.values()
        )
        source_observation_limits = _source_observation_limits(
            max_batch_observations,
            len(sources),
            _max_observations_per_source(),
        )
        for source_index, source in enumerate(sources):
            remaining_batch_seconds = batch_deadline - time.monotonic()
            if remaining_batch_seconds <= 0:
                unprocessed_sources = sources[source_index:]
                source_failures.extend(
                    _unprocessed_source_failures(unprocessed_sources, "batch_timeout")
                )
                _emit_unprocessed_source_terminals(
                    progress_callback,
                    task_id,
                    attempt_id,
                    len(sources),
                    unprocessed_sources,
                    algorithms_by_source,
                    progress_state,
                )
                break
            source_algorithms = algorithms_by_source[source["media_id"]]
            source_algorithm_options = algorithm_options_by_source[source["media_id"]]
            effective_timeout = min(source_timeout_seconds, remaining_batch_seconds)
            batch_limited_timeout = effective_timeout < source_timeout_seconds
            source_work_dir = _source_work_dir(
                batch_work_dir, source_index, source["media_id"]
            )
            source_work_dir.mkdir(parents=True, exist_ok=True)
            cleanup_error = None
            try:
                isolated = run_with_timeout(
                    _run_source,
                    args=(
                        source,
                        source_algorithms,
                        source_loader,
                        algorithm_runner,
                        str(source_work_dir),
                        source_observation_limits[source_index],
                        source_algorithm_options,
                        parquet_persistence,
                    ),
                    timeout_seconds=effective_timeout,
                    progress_callback=lambda event: _handle_source_event(
                        event,
                        artifact_writer=artifact_writer,
                        artifact_errors=artifact_errors,
                        progress_callback=progress_callback,
                        task_id=task_id,
                        attempt_id=attempt_id,
                        total_sources=len(sources),
                        source=source,
                        source_index=source_index,
                        source_algorithms=source_algorithms,
                        progress_state=progress_state,
                    ),
                )
            except Exception as exc:
                isolated = {
                    "status": "failed",
                    "reason": "worker_failed",
                    "value": None,
                    "error": _bounded_error(exc),
                }
            finally:
                try:
                    shutil.rmtree(source_work_dir)
                except OSError as exc:
                    cleanup_error = exc
            processed_source_count += 1
            if cleanup_error is not None:
                source_failures.append(
                    {
                        "source_media_id": source["media_id"],
                        "reason": "source_cleanup_failed",
                        "error": _bounded_error(cleanup_error),
                    }
                )
            if isolated["status"] != "succeeded":
                failure_reason = (
                    "batch_timeout"
                    if isolated["reason"] == "timeout" and batch_limited_timeout
                    else "source_timeout"
                    if isolated["reason"] == "timeout"
                    else isolated["reason"]
                )
                source_failures.append(
                    {
                        "source_media_id": source["media_id"],
                        "reason": failure_reason,
                        "error": _bounded_error(isolated["error"]),
                    }
                )
                _emit_source_terminal(
                    progress_callback,
                    task_id,
                    attempt_id,
                    len(sources),
                    source,
                    source_algorithms,
                    [],
                    "failed",
                    progress_state,
                )
                if failure_reason == "batch_timeout":
                    unprocessed_sources = sources[source_index + 1 :]
                    source_failures.extend(
                        _unprocessed_source_failures(
                            unprocessed_sources,
                            "batch_timeout",
                        )
                    )
                    _emit_unprocessed_source_terminals(
                        progress_callback,
                        task_id,
                        attempt_id,
                        len(sources),
                        unprocessed_sources,
                        algorithms_by_source,
                        progress_state,
                    )
                    break
                continue

            source_result = isolated["value"]
            source_runtime_provenance = source_result.get("runtime_provenance") or []
            runtime_provenance.extend(source_runtime_provenance)
            if artifact_writer is not None:
                for provenance in source_runtime_provenance:
                    artifact_writer.record_runtime_provenance(provenance)
            source_observations = source_result["observations"]
            if observations is not None:
                observations.extend(source_observations)
            normalized_observation_count += int(
                source_result.get("observation_count", len(source_observations))
            )
            processed_sources.extend(source_result["processed_sources"])
            source_failures.extend(source_result["source_failures"])
            algorithm_failures.extend(source_result["algorithm_failures"])
            truncations.extend(source_result["truncations"])
            successful_algorithm_runs += source_result["successful_algorithm_runs"]
            algorithms_completed = _completed_algorithms_for_progress(source_result)
            source_status = (
                "succeeded"
                if (
                    cleanup_error is None
                    and not source_result.get("source_failures")
                    and not source_result.get("algorithm_failures")
                    and _all_algorithms_completed(
                        source_algorithms, algorithms_completed
                    )
                )
                else "failed"
            )
            _emit_source_terminal(
                progress_callback,
                task_id,
                attempt_id,
                len(sources),
                source,
                source_algorithms,
                algorithms_completed,
                source_status,
                progress_state,
                observations=None if parquet_persistence else source_observations,
                algorithm_durations_ms=source_result.get("algorithm_durations_ms"),
            )

        if artifact_writer is not None:
            prepared = artifact_writer.close()
            if successful_algorithm_runs and not artifact_errors:
                try:
                    persistence_result = publish_prepared_observation_artifact(
                        payload,
                        prepared,
                        s3_client=artifact_s3_client,
                    )
                except Exception as exc:
                    artifact_errors.append(exc)

    # A batch can still provide useful evidence when one flight/source or one
    # detector fails. Preserve successful observations and expose the run as
    # partial; only an all-failure batch is failed.
    if artifact_errors:
        status = "failed"
    elif successful_algorithm_runs and (source_failures or algorithm_failures):
        status = "partial"
    elif source_failures or algorithm_failures:
        status = "failed"
    elif successful_algorithm_runs and truncations:
        status = "partial"
    elif successful_algorithm_runs:
        status = "succeeded"
    else:
        status = "failed"

    reason = None
    error = None
    if artifact_errors:
        reason = "artifact_publication_failed"
    elif source_failures:
        reason = source_failures[0]["reason"]
    elif algorithm_failures:
        reason = "algorithm_failed"
    elif truncations:
        reason = truncations[0]["reason"]
    if status == "failed":
        error = reason or "no_observations"
        reason = reason or "no_observations"
        if observations is not None:
            observations = []
        processed_sources = []

    response = {
        "status": status,
        "reason": reason,
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": observations or [],
        },
        "details": {
            # Source chunks are authoritative for Dask runs. The terminal
            # result carries only attestations and stays small.
            "result_transport": (
                "parquet"
                if parquet_persistence
                else "source_chunks"
                if stream_observations
                else "inline"
            ),
            "observations_streamed": stream_observations,
            "raw_observation_count": normalized_observation_count,
            "normalized_observation_count": normalized_observation_count,
            "processed_sources": processed_sources,
            "source_failures": source_failures,
            "algorithm_failures": algorithm_failures,
            "truncations": truncations,
            "configured_limits": {
                "max_observations_per_source": _max_observations_per_source(),
                "max_observations_per_batch": max_batch_observations,
                "max_result_bytes": _max_result_bytes(),
                "result_byte_limit_applied": bool(apply_result_byte_limit),
            },
        },
        "metadata": {
            "source_count": len(request["sources"]),
            "processed_source_count": processed_source_count,
            "task_id": _bounded_text(payload.get("task_id"), 128),
            "attempt_id": _payload_attempt_id(payload),
        },
        "error": error,
    }
    if persistence_result is not None:
        response["persistence"] = persistence_result
    if artifact_errors:
        publication_error = artifact_errors[0]
        response["error"] = "Parquet artifact publication failed: " + _bounded_error(
            publication_error
        )
        diagnostics = (
            publication_error.diagnostics()
            if hasattr(publication_error, "diagnostics")
            else {"retryable": False, "failure_kind": "permanent"}
        )
        response["details"]["publication_failure"] = diagnostics
    if apply_result_byte_limit:
        return _fit_response_to_byte_limit(response, _max_result_bytes())
    return response


def _uses_parquet_persistence(request):
    persistence = request.get("persistence")
    return isinstance(persistence, dict) and persistence.get("mode") == "parquet"


def _handle_source_event(
    event,
    *,
    artifact_writer,
    artifact_errors,
    progress_callback,
    task_id,
    attempt_id,
    total_sources,
    source,
    source_index,
    source_algorithms,
    progress_state,
):
    if isinstance(event, dict) and event.get("event") == "observation_batch":
        if artifact_writer is not None and not artifact_errors:
            try:
                artifact_writer.write_observations(event.get("observations") or [])
            except Exception as exc:
                artifact_errors.append(exc)
        return
    _emit_algorithm_terminal(
        progress_callback,
        task_id,
        attempt_id,
        total_sources,
        source,
        source_index,
        source_algorithms,
        event,
        progress_state,
    )


def _stream_normalized_observations(
    progress_callback,
    source,
    algorithm_name,
    aois,
    algorithm_options=None,
    runtime_provenance=None,
):
    count = 0
    batch = []
    for aoi in aois:
        batch.append(
            normalize_aoi(
                source,
                algorithm_name,
                aoi,
                algorithm_options=algorithm_options,
                runtime_provenance=runtime_provenance,
            )
        )
        count += 1
        if len(batch) >= PARQUET_OBSERVATION_BATCH_SIZE:
            _emit_observation_batch(progress_callback, batch)
            batch = []
    if batch:
        _emit_observation_batch(progress_callback, batch)
    return count


def _emit_observation_batch(progress_callback, observations):
    if progress_callback is None:
        raise RuntimeError("Parquet observation streaming requires a progress channel")
    progress_callback(
        {
            "event": "observation_batch",
            "observations": observations,
        }
    )


def _run_source(
    source,
    algorithms,
    source_loader,
    algorithm_runner,
    work_dir,
    max_observations,
    algorithm_options_by_name=None,
    stream_observation_batches=False,
    progress_callback=None,
):
    observations = []
    processed_sources = []
    source_failures = []
    algorithm_failures = []
    truncations = []
    successful_algorithm_runs = 0
    observation_count = 0
    runtime_provenance = []

    try:
        image_path = source_loader(source, work_dir)
    except Exception as exc:
        source_failures.append(
            {
                "source_media_id": source["media_id"],
                "reason": "source_fetch_failed",
                "error": _bounded_error(exc),
            }
        )
        return {
            "observations": observations,
            "processed_sources": processed_sources,
            "source_failures": source_failures,
            "algorithm_failures": algorithm_failures,
            "truncations": truncations,
            "successful_algorithm_runs": successful_algorithm_runs,
        }

    algorithm_work_dir = _algorithm_work_dir(work_dir, source["media_id"])
    source = _with_actual_image_dimensions(source, image_path)
    algorithms_completed = []
    algorithms_processed = []
    algorithm_durations_ms = {}
    observation_limits = _algorithm_observation_limits(
        max_observations, len(algorithms)
    )
    algorithm_options_by_name = algorithm_options_by_name or {}
    for algorithm_index, algorithm_name in enumerate(algorithms):
        algorithm_options = dict(algorithm_options_by_name.get(algorithm_name) or {})
        observation_limit = (
            None if stream_observation_batches else observation_limits[algorithm_index]
        )
        algorithm_started_at_epoch = time.time()
        _emit_local_algorithm_started(
            progress_callback,
            algorithm_name,
            algorithm_index,
            algorithms_completed,
            algorithms_processed,
            algorithm_durations_ms,
            algorithm_started_at_epoch,
        )
        try:
            aois = algorithm_runner(
                algorithm_name,
                image_path,
                source,
                algorithm_work_dir,
                -1 if stream_observation_batches else observation_limit,
                algorithm_options,
            )
            if aois is None:
                aois = []
        except Exception as exc:
            algorithm_durations_ms[algorithm_name] = max(
                round((time.time() - algorithm_started_at_epoch) * 1000),
                1,
            )
            algorithm_failures.append(
                {
                    "source_media_id": source["media_id"],
                    "algorithm": algorithm_name,
                    "reason": "algorithm_failed",
                    "error": _bounded_error(exc),
                }
            )
            algorithms_processed.append(algorithm_name)
            _emit_local_algorithm_terminal(
                progress_callback,
                algorithm_name,
                algorithm_index,
                "failed",
                algorithms_completed,
                algorithms_processed,
                algorithm_durations_ms,
                algorithm_started_at_epoch,
            )
            continue

        successful_algorithm_runs += 1
        algorithm_runtime_provenance = getattr(aois, "runtime_provenance", None)
        if algorithm_runtime_provenance:
            runtime_provenance.append(dict(algorithm_runtime_provenance))
        algorithm_durations_ms[algorithm_name] = max(
            round((time.time() - algorithm_started_at_epoch) * 1000),
            1,
        )
        algorithms_completed.append(algorithm_name)
        algorithms_processed.append(algorithm_name)
        available_count = getattr(aois, "available_count", None)
        if available_count is None and not stream_observation_batches:
            try:
                available_count = len(aois)
            except TypeError:
                aois = list(islice(aois, observation_limit + 1))
                available_count = len(aois)
        if stream_observation_batches:
            retained_count = _stream_normalized_observations(
                progress_callback,
                source,
                algorithm_name,
                aois,
                algorithm_options,
                algorithm_runtime_provenance,
            )
        else:
            retained_aois = aois[:observation_limit]
            observations.extend(
                normalize_aoi(
                    source,
                    algorithm_name,
                    aoi,
                    algorithm_options=algorithm_options,
                    runtime_provenance=algorithm_runtime_provenance,
                )
                for aoi in retained_aois
            )
            retained_count = len(retained_aois)
        observation_count += retained_count
        if not stream_observation_batches and available_count > observation_limit:
            truncations.append(
                {
                    "reason": "algorithm_observation_limit",
                    "source_media_id": source["media_id"],
                    "algorithm": algorithm_name,
                    "available": available_count,
                    "retained": retained_count,
                }
            )
        _emit_local_algorithm_terminal(
            progress_callback,
            algorithm_name,
            algorithm_index,
            "succeeded",
            algorithms_completed,
            algorithms_processed,
            algorithm_durations_ms,
            algorithm_started_at_epoch,
        )

    processed_sources.append(
        {
            "source_media_id": source["media_id"],
            "source_checksum": source["checksum_sha256"],
            "algorithms_completed": algorithms_completed,
        }
    )
    return {
        "observations": observations,
        "processed_sources": processed_sources,
        "source_failures": source_failures,
        "algorithm_failures": algorithm_failures,
        "truncations": truncations,
        "successful_algorithm_runs": successful_algorithm_runs,
        "algorithm_durations_ms": algorithm_durations_ms,
        "observation_count": observation_count,
        "runtime_provenance": runtime_provenance,
    }


def _algorithm_work_dir(work_dir, media_id):
    safe_media_id = re.sub(r"[^A-Za-z0-9_.-]", "_", str(media_id))
    output_dir = Path(work_dir) / "output" / safe_media_id
    output_dir.mkdir(parents=True, exist_ok=True)
    return str(output_dir)


def _source_work_dir(work_dir, source_index, media_id):
    safe_media_id = re.sub(r"[^A-Za-z0-9_.-]", "_", str(media_id))
    return Path(work_dir) / "sources" / f"{source_index:03d}-{safe_media_id}"


def _algorithm_observation_limits(max_observations, algorithm_count):
    """Return an independent observation budget for each detector on a photo.

    ``max_observations`` is the per-detector, per-source safety ceiling. A noisy
    detector must not consume or reduce the allowance of another detector that
    runs against the same source photo.
    """
    if algorithm_count <= 0:
        return []
    return [max(max_observations, 1) for _ in range(algorithm_count)]


def _source_observation_limits(max_batch_observations, source_count, max_per_source):
    """Return an independent observation budget for every source photo.

    ``max_batch_observations`` remains a compatibility argument for older
    callers and diagnostics. It must not divide one photo's budget by the
    number of photos in a mission-wide run.
    """
    del max_batch_observations
    return [max(max_per_source, 1) for _ in range(source_count)]


def _unprocessed_source_failures(sources, reason):
    return [
        {
            "source_media_id": source["media_id"],
            "reason": reason,
            "error": "analysis batch deadline exceeded",
        }
        for source in sources
    ]


def _completed_algorithms_for_progress(source_result):
    processed_sources = source_result.get("processed_sources") or []
    if len(processed_sources) != 1:
        return []
    return list(processed_sources[0].get("algorithms_completed") or [])


def _all_algorithms_completed(expected, completed):
    return len(expected) == len(completed) and set(expected) == set(completed)


def _algorithms_for_source(request, source, fallback_algorithms):
    execution_plan = request.get("execution_plan")
    entries = (
        execution_plan.get("entries") if isinstance(execution_plan, dict) else None
    )
    sensor_type = str(source.get("sensor_type") or "").strip().lower()
    if isinstance(entries, list) and entries and sensor_type:
        requested = {
            str(algorithm).strip()
            for algorithm in fallback_algorithms
            if str(algorithm).strip()
        }
        planned = [
            str(entry.get("algorithm") or "").strip()
            for entry in entries
            if isinstance(entry, dict)
            and str(entry.get("sensor_type") or "").strip().lower() == sensor_type
            and str(entry.get("algorithm") or "").strip()
            and str(entry.get("algorithm") or "").strip() in requested
        ]
        return planned
    return list(fallback_algorithms)


def _algorithm_options_for_source(request, source, algorithms):
    execution_plan = request.get("execution_plan")
    entries = (
        execution_plan.get("entries") if isinstance(execution_plan, dict) else None
    )
    sensor_type = str(source.get("sensor_type") or "").strip().lower()
    requested = [str(algorithm).strip() for algorithm in algorithms]
    overrides = {}
    if isinstance(entries, list) and sensor_type:
        overrides = {
            algorithm: dict(entry.get("options") or {})
            for entry in entries
            if isinstance(entry, dict)
            and (algorithm := str(entry.get("algorithm") or "").strip()) in requested
            and str(entry.get("sensor_type") or "").strip().lower() == sensor_type
        }
    return {
        algorithm: effective_options_for_algorithm(
            algorithm,
            overrides.get(algorithm),
        )
        for algorithm in requested
    }


def _emit_local_algorithm_started(
    progress_callback,
    algorithm,
    algorithm_index,
    algorithms_completed,
    algorithms_processed,
    algorithm_durations_ms,
    algorithm_started_at_epoch,
):
    if progress_callback is None:
        return
    try:
        progress_callback(
            {
                "event": "algorithm_started",
                "algorithm": algorithm,
                "algorithm_sequence": algorithm_index + 1,
                "algorithm_status": "running",
                "algorithms_completed": list(algorithms_completed),
                "algorithms_processed": list(algorithms_processed),
                "algorithm_durations_ms": dict(algorithm_durations_ms),
                "algorithm_started_at_epoch": algorithm_started_at_epoch,
            }
        )
    except Exception:
        pass


def _emit_local_algorithm_terminal(
    progress_callback,
    algorithm,
    algorithm_index,
    algorithm_status,
    algorithms_completed,
    algorithms_processed,
    algorithm_durations_ms,
    algorithm_started_at_epoch,
):
    if progress_callback is None:
        return
    try:
        progress_callback(
            {
                "event": "algorithm_terminal",
                "algorithm": algorithm,
                "algorithm_sequence": algorithm_index + 1,
                "algorithm_status": algorithm_status,
                "algorithms_completed": list(algorithms_completed),
                "algorithms_processed": list(algorithms_processed),
                "algorithm_durations_ms": dict(algorithm_durations_ms),
                "algorithm_started_at_epoch": algorithm_started_at_epoch,
                "algorithm_duration_ms": algorithm_durations_ms.get(algorithm),
            }
        )
    except Exception:
        pass


def _emit_algorithm_terminal(
    progress_callback,
    task_id,
    attempt_id,
    total_sources,
    source,
    source_index,
    algorithms_expected,
    local_event,
    state,
):
    if not isinstance(local_event, dict):
        return
    event_type = local_event.get("event")
    algorithm_status = local_event.get("algorithm_status")
    if event_type == "algorithm_terminal":
        if algorithm_status == "succeeded":
            state["completed_algorithm_runs"] += 1
        elif algorithm_status == "failed":
            state["failed_algorithm_runs"] += 1
        else:
            return
    elif event_type != "algorithm_started" or algorithm_status != "running":
        return
    state["checkpoint_sequence"] += 1
    event = {
        **local_event,
        "task_id": task_id,
        "attempt_id": attempt_id,
        "sequence": source_index + 1,
        "checkpoint_sequence": state["checkpoint_sequence"],
        "total_sources": total_sources,
        "source_media_id": source["media_id"],
        "source_checksum": source["checksum_sha256"],
        "algorithms_expected": list(algorithms_expected),
        "completed_sources": state["completed_sources"],
        "failed_sources": state["failed_sources"],
        "completed_algorithm_runs": state["completed_algorithm_runs"],
        "failed_algorithm_runs": state["failed_algorithm_runs"],
        "total_algorithm_runs": state["total_algorithm_runs"],
    }
    try:
        if progress_callback is not None:
            progress_callback(event)
    except Exception:
        pass


def _emit_source_terminal(
    progress_callback,
    task_id,
    attempt_id,
    total_sources,
    source,
    algorithms_expected,
    algorithms_completed,
    source_status,
    state,
    observations=None,
    algorithm_durations_ms=None,
):
    state["source_sequence"] += 1
    state["checkpoint_sequence"] += 1
    if source_status == "succeeded":
        state["completed_sources"] += 1
    else:
        state["failed_sources"] += 1
    event = {
        "event": "source_terminal",
        "task_id": task_id,
        "attempt_id": attempt_id,
        "sequence": state["source_sequence"],
        "checkpoint_sequence": state["checkpoint_sequence"],
        "total_sources": total_sources,
        "source_media_id": source["media_id"],
        "source_checksum": source["checksum_sha256"],
        "algorithms_expected": list(algorithms_expected),
        "algorithms_completed": list(algorithms_completed),
        "source_status": source_status,
        "completed_sources": state["completed_sources"],
        "failed_sources": state["failed_sources"],
        "completed_algorithm_runs": state["completed_algorithm_runs"],
        "failed_algorithm_runs": state["failed_algorithm_runs"],
        "total_algorithm_runs": state["total_algorithm_runs"],
        "algorithm_durations_ms": dict(algorithm_durations_ms or {}),
    }
    observation_envelope = _progress_observation_envelope(observations)
    if observation_envelope is not None:
        event.update(observation_envelope)
    try:
        if progress_callback is not None:
            progress_callback(event)
    except Exception:
        pass


def _progress_observation_envelope(observations):
    """Return a bounded gzip envelope for one completed source's observations."""
    if not observations:
        return None
    try:
        encoded = json.dumps(
            list(observations),
            separators=(",", ":"),
            ensure_ascii=False,
            default=str,
        ).encode("utf-8")
        compressed = gzip.compress(encoded, compresslevel=6)
    except (TypeError, ValueError, OSError):
        return None
    if len(compressed) > MAX_PROGRESS_OBSERVATION_BYTES:
        return {
            "observations_count": len(observations),
            "observations_omitted_reason": "progress_event_size_limit",
        }
    return {
        "observations_gzip_base64": base64.b64encode(compressed).decode("ascii"),
        "observations_count": len(observations),
        "observation_encoding": "gzip+base64",
    }


def _emit_unprocessed_source_terminals(
    progress_callback,
    task_id,
    attempt_id,
    total_sources,
    sources,
    algorithms_by_source,
    state,
):
    for source in sources:
        _emit_source_terminal(
            progress_callback,
            task_id,
            attempt_id,
            total_sources,
            source,
            algorithms_by_source[source["media_id"]],
            [],
            "failed",
            state,
        )


def _with_actual_image_dimensions(source, image_path):
    """Use decoded image dimensions as the authoritative pixel coordinate space."""
    try:
        with Image.open(image_path) as image:
            width, height = ImageOps.exif_transpose(image).size
    except (FileNotFoundError, OSError, UnidentifiedImageError):
        # Injected test loaders may not materialize a real image. Production's
        # S3 loader has already decoded and validated the file at this point.
        return source

    normalized_source = dict(source)
    metadata = dict(source.get("metadata") or {})
    metadata.update({"image_width": width, "image_height": height})
    normalized_source["metadata"] = metadata
    return normalized_source


def _max_observations_per_source():
    try:
        value = int(
            os.getenv(
                "ADIAT_MAX_OBSERVATIONS_PER_SOURCE",
                str(DEFAULT_MAX_OBSERVATIONS_PER_SOURCE),
            )
        )
    except (TypeError, ValueError):
        return DEFAULT_MAX_OBSERVATIONS_PER_SOURCE
    return min(max(value, 1), 10000)


def _max_observations_per_batch():
    try:
        value = int(
            os.getenv(
                "ADIAT_MAX_OBSERVATIONS_PER_BATCH",
                str(DEFAULT_MAX_OBSERVATIONS_PER_BATCH),
            )
        )
    except (TypeError, ValueError):
        return DEFAULT_MAX_OBSERVATIONS_PER_BATCH
    return min(max(value, 1), 100000)


def _max_result_bytes():
    try:
        value = int(
            os.getenv(
                "ADIAT_MAX_RESULT_BYTES",
                str(DEFAULT_MAX_RESULT_BYTES),
            )
        )
    except (TypeError, ValueError):
        return DEFAULT_MAX_RESULT_BYTES
    return min(max(value, 4096), 900_000)


def _fit_response_to_byte_limit(response, max_result_bytes):
    if _serialized_size(response) <= max_result_bytes:
        return response

    observations = list(response["result"]["observations"])
    truncation = {
        "reason": "result_byte_limit",
        "available": len(observations),
        "retained": 0,
        "max_bytes": max_result_bytes,
    }
    response["details"]["truncations"].append(truncation)
    if response["status"] == "succeeded":
        response["status"] = "partial"
    if response.get("reason") is None:
        response["reason"] = "result_byte_limit"

    response["result"]["observations"] = []
    if _serialized_size(response) > max_result_bytes:
        response["details"]["source_failures"] = []
        response["details"]["algorithm_failures"] = []
        response["details"]["truncations"] = [truncation]
        response["error"] = _bounded_error(response.get("error"))[:128] or None
        response["metadata"]["task_id"] = _bounded_text(
            response["metadata"].get("task_id"), 128
        )

    low = 0
    high = len(observations)
    while low < high:
        midpoint = (low + high + 1) // 2
        response["result"]["observations"] = observations[:midpoint]
        truncation["retained"] = midpoint
        if _serialized_size(response) <= max_result_bytes:
            low = midpoint
        else:
            high = midpoint - 1

    response["result"]["observations"] = observations[:low]
    response["details"]["normalized_observation_count"] = low
    truncation["retained"] = low
    if _serialized_size(response) > max_result_bytes:
        return _minimal_oversize_response(response, max_result_bytes)
    return response


def _minimal_oversize_response(response, max_result_bytes):
    return {
        "status": "failed",
        "reason": "result_byte_limit",
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": [],
        },
        "details": {
            "raw_observation_count": int(
                response.get("details", {}).get("raw_observation_count") or 0
            ),
            "normalized_observation_count": 0,
            "processed_sources": [],
            "source_failures": [],
            "algorithm_failures": [],
            "truncations": [
                {
                    "reason": "result_byte_limit",
                    "available": int(
                        response.get("details", {}).get("raw_observation_count") or 0
                    ),
                    "retained": 0,
                    "max_bytes": max_result_bytes,
                }
            ],
        },
        "metadata": {
            "source_count": int(response.get("metadata", {}).get("source_count") or 0),
            "processed_source_count": int(
                response.get("metadata", {}).get("processed_source_count") or 0
            ),
            "task_id": _bounded_text(response.get("metadata", {}).get("task_id"), 128),
            "attempt_id": _bounded_text(
                response.get("metadata", {}).get("attempt_id"),
                128,
            ),
        },
        "error": "ADIAT result exceeded the configured serialized byte limit",
    }


def _serialized_size(response):
    return len(json.dumps(response, separators=(",", ":"), default=str).encode("utf-8"))


def _bounded_error(value):
    return str(value or "")[:MAX_ERROR_CHARS]


def _bounded_text(value, max_chars):
    if value is None:
        return None
    return str(value)[:max_chars]


def _payload_attempt_id(payload):
    if not isinstance(payload, dict):
        return None
    metadata = payload.get("metadata")
    if not isinstance(metadata, dict):
        return None
    return _bounded_text(metadata.get("attempt_id"), 128)


def _positive_float(value, default):
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return float(default)
    return parsed if parsed > 0 else float(default)


def _effective_batch_timeout_seconds(
    configured_timeout_seconds, *, source_count, source_timeout_seconds
):
    """Keep the default batch deadline long enough for every source to run.

    Explicit per-call deadlines remain hard caps. The derived floor applies only
    when the caller relies on the worker's configured/default batch timeout.
    """
    required_seconds = (
        max(int(source_count or 0), 1) * float(source_timeout_seconds)
        + BATCH_TIMEOUT_SAFETY_SECONDS
    )
    return max(float(configured_timeout_seconds), required_seconds)


def _empty_response(status, reason, error, payload):
    request = payload.get("request") if isinstance(payload, dict) else None
    request = request if isinstance(request, dict) else {}
    sources = request.get("sources")
    source_count = len(sources) if isinstance(sources, list) else 0
    response = {
        "status": status,
        "reason": reason,
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": [],
        },
        "details": {
            "raw_observation_count": 0,
            "normalized_observation_count": 0,
            "processed_sources": [],
            "source_failures": [],
            "algorithm_failures": [],
            "truncations": [],
        },
        "metadata": {
            "source_count": source_count,
            "processed_source_count": 0,
            "task_id": _bounded_text(
                payload.get("task_id") if isinstance(payload, dict) else None,
                128,
            ),
            "attempt_id": _payload_attempt_id(payload),
        },
        "error": _bounded_error(error),
    }
    return _fit_response_to_byte_limit(response, _max_result_bytes())


class _work_dir:
    def __init__(self, path):
        self.path = path
        self.temp_dir = None

    def __enter__(self):
        if self.path:
            return self.path
        self.temp_dir = tempfile.TemporaryDirectory(prefix="chris-adiat-")
        return self.temp_dir.__enter__()

    def __exit__(self, exc_type, exc, tb):
        if self.temp_dir:
            return self.temp_dir.__exit__(exc_type, exc, tb)
        return False
