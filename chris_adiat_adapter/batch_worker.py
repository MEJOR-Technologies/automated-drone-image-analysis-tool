import multiprocessing
import time

from chris_adiat_adapter import __version__
from chris_adiat_adapter.analysis import (
    _fit_response_to_byte_limit,
    _max_result_bytes,
    run_batch,
)


def run(payload):
    if multiprocessing.current_process().daemon:
        return _fit_response_to_byte_limit(
            _isolation_failure(payload), _max_result_bytes()
        )
    started_at = time.time()
    result = run_batch(payload)
    result.setdefault("metadata", {}).update(
        _worker_metadata(started_at, time.time() - started_at)
    )
    return _fit_response_to_byte_limit(result, _max_result_bytes())


def _worker_metadata(started_at, duration_seconds):
    metadata = {
        "worker_started_at_epoch": started_at,
        "worker_duration_seconds": duration_seconds,
    }
    try:
        from distributed import get_worker

        worker = get_worker()
    except (ImportError, ValueError):
        return metadata
    metadata.update(
        {
            "worker_address": str(worker.address),
            "worker_nthreads": int(worker.nthreads),
            "worker_resources": dict(worker.state.total_resources),
        }
    )
    return metadata


def _isolation_failure(payload):
    return {
        "status": "failed",
        "reason": "isolation_unavailable",
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
            "source_count": 0,
            "processed_source_count": 0,
            "task_id": (
                str(payload.get("task_id"))[:128]
                if isinstance(payload, dict) and payload.get("task_id") is not None
                else None
            ),
            "attempt_id": (
                str((payload.get("metadata") or {}).get("attempt_id"))[:128]
                if isinstance(payload, dict)
                and isinstance(payload.get("metadata"), dict)
                and (payload.get("metadata") or {}).get("attempt_id") is not None
                else None
            ),
        },
        "error": "ADIAT worker requires a non-daemonic Dask worker process",
    }
