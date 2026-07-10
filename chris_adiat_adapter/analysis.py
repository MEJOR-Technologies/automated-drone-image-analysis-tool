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
from chris_adiat_adapter.algorithms import run_adiat_algorithm
from chris_adiat_adapter.isolation import run_with_timeout
from chris_adiat_adapter.normalization import normalize_aoi
from chris_adiat_adapter.profiles import algorithms_for_profile
from chris_adiat_adapter.s3_sources import load_source
from chris_adiat_adapter.schemas import PayloadValidationError, validate_payload


DEFAULT_MAX_OBSERVATIONS_PER_SOURCE = 1000
DEFAULT_MAX_OBSERVATIONS_PER_BATCH = 5000
DEFAULT_BATCH_TIMEOUT_SECONDS = 3600
DEFAULT_MAX_RESULT_BYTES = 750_000
MAX_ERROR_CHARS = 1024


def run_batch(
    payload,
    source_loader=None,
    algorithm_runner=None,
    work_dir=None,
    source_timeout_seconds=None,
    batch_timeout_seconds=None,
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
        batch_timeout_seconds = _positive_float(
            os.getenv(
                "ADIAT_BATCH_TIMEOUT_SECONDS", str(DEFAULT_BATCH_TIMEOUT_SECONDS)
            ),
            DEFAULT_BATCH_TIMEOUT_SECONDS,
        )
    else:
        batch_timeout_seconds = _positive_float(
            batch_timeout_seconds,
            DEFAULT_BATCH_TIMEOUT_SECONDS,
        )

    observations = []
    processed_sources = []
    source_failures = []
    algorithm_failures = []
    truncations = []
    successful_algorithm_runs = 0
    processed_source_count = 0
    batch_deadline = time.monotonic() + batch_timeout_seconds
    max_batch_observations = _max_observations_per_batch()

    with _work_dir(work_dir) as batch_work_dir:
        sources = request["sources"]
        source_observation_limits = _source_observation_limits(
            max_batch_observations,
            len(sources),
            _max_observations_per_source(),
        )
        for source_index, source in enumerate(sources):
            remaining_batch_seconds = batch_deadline - time.monotonic()
            if remaining_batch_seconds <= 0:
                source_failures.extend(
                    _unprocessed_source_failures(
                        sources[source_index:], "batch_timeout"
                    )
                )
                break
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
                        algorithms,
                        source_loader,
                        algorithm_runner,
                        str(source_work_dir),
                        source_observation_limits[source_index],
                    ),
                    timeout_seconds=effective_timeout,
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
                if failure_reason == "batch_timeout":
                    source_failures.extend(
                        _unprocessed_source_failures(
                            sources[source_index + 1 :],
                            "batch_timeout",
                        )
                    )
                    break
                continue

            source_result = isolated["value"]
            source_observations = source_result["observations"]
            observations.extend(source_observations)
            processed_sources.extend(source_result["processed_sources"])
            source_failures.extend(source_result["source_failures"])
            algorithm_failures.extend(source_result["algorithm_failures"])
            truncations.extend(source_result["truncations"])
            successful_algorithm_runs += source_result["successful_algorithm_runs"]

    if source_failures or algorithm_failures:
        status = "failed"
    elif successful_algorithm_runs and truncations:
        status = "partial"
    elif successful_algorithm_runs:
        status = "succeeded"
    else:
        status = "failed"

    reason = None
    error = None
    if source_failures:
        reason = source_failures[0]["reason"]
    elif algorithm_failures:
        reason = "algorithm_failed"
    elif truncations:
        reason = truncations[0]["reason"]
    if status == "failed":
        error = reason or "no_observations"
        reason = reason or "no_observations"
        observations = []
        processed_sources = []

    response = {
        "status": status,
        "reason": reason,
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": observations,
        },
        "details": {
            "raw_observation_count": len(observations),
            "normalized_observation_count": len(observations),
            "processed_sources": processed_sources,
            "source_failures": source_failures,
            "algorithm_failures": algorithm_failures,
            "truncations": truncations,
        },
        "metadata": {
            "source_count": len(request["sources"]),
            "processed_source_count": processed_source_count,
            "task_id": _bounded_text(payload.get("task_id"), 128),
            "attempt_id": _payload_attempt_id(payload),
        },
        "error": error,
    }
    return _fit_response_to_byte_limit(response, _max_result_bytes())


def _run_source(
    source,
    algorithms,
    source_loader,
    algorithm_runner,
    work_dir,
    max_observations,
):
    observations = []
    processed_sources = []
    source_failures = []
    algorithm_failures = []
    truncations = []
    successful_algorithm_runs = 0

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
    observation_limits = _algorithm_observation_limits(
        max_observations, len(algorithms)
    )
    for algorithm_index, algorithm_name in enumerate(algorithms):
        observation_limit = observation_limits[algorithm_index]
        try:
            aois = (
                algorithm_runner(
                    algorithm_name,
                    image_path,
                    source,
                    algorithm_work_dir,
                    observation_limit,
                )
                or []
            )
        except Exception as exc:
            algorithm_failures.append(
                {
                    "source_media_id": source["media_id"],
                    "algorithm": algorithm_name,
                    "reason": "algorithm_failed",
                    "error": _bounded_error(exc),
                }
            )
            continue

        successful_algorithm_runs += 1
        algorithms_completed.append(algorithm_name)
        available_count = getattr(aois, "available_count", None)
        if available_count is None:
            try:
                available_count = len(aois)
            except TypeError:
                aois = list(islice(aois, observation_limit + 1))
                available_count = len(aois)
        retained_aois = aois[:observation_limit]
        observations.extend(
            normalize_aoi(source, algorithm_name, aoi) for aoi in retained_aois
        )
        if available_count > observation_limit:
            truncations.append(
                {
                    "reason": "algorithm_observation_limit",
                    "source_media_id": source["media_id"],
                    "algorithm": algorithm_name,
                    "available": available_count,
                    "retained": len(retained_aois),
                }
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
    if algorithm_count <= 0:
        return []
    base, remainder = divmod(max_observations, algorithm_count)
    return [base + (1 if index < remainder else 0) for index in range(algorithm_count)]


def _source_observation_limits(max_batch_observations, source_count, max_per_source):
    fair_limits = _algorithm_observation_limits(max_batch_observations, source_count)
    return [min(limit, max_per_source) for limit in fair_limits]


def _unprocessed_source_failures(sources, reason):
    return [
        {
            "source_media_id": source["media_id"],
            "reason": reason,
            "error": "analysis batch deadline exceeded",
        }
        for source in sources
    ]


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
    return min(max(value, 1), 50000)


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
