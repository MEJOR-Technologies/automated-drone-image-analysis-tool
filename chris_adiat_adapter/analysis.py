import tempfile

from chris_adiat_adapter import __version__
from chris_adiat_adapter.algorithms import run_adiat_algorithm
from chris_adiat_adapter.normalization import normalize_aoi
from chris_adiat_adapter.profiles import algorithms_for_profile
from chris_adiat_adapter.s3_sources import load_source
from chris_adiat_adapter.schemas import PayloadValidationError, validate_payload


def run_batch(payload, source_loader=None, algorithm_runner=None, work_dir=None):
    source_loader = source_loader or load_source
    algorithm_runner = algorithm_runner or run_adiat_algorithm

    try:
        validate_payload(payload)
    except PayloadValidationError as exc:
        return _empty_response("failed", "invalid_payload", str(exc), payload)

    request = payload["request"]
    algorithms = request.get("algorithms") or algorithms_for_profile(request["profile"])
    if not algorithms:
        return _empty_response("failed", "not_configured", f"profile {request['profile']} is not configured", payload)

    observations = []
    source_failures = []
    algorithm_failures = []

    with _work_dir(work_dir) as batch_work_dir:
        for source in request["sources"]:
            try:
                image_path = source_loader(source, batch_work_dir)
            except Exception as exc:
                source_failures.append({
                    "source_media_id": source["media_id"],
                    "reason": "source_fetch_failed",
                    "error": str(exc),
                })
                continue

            for algorithm_name in algorithms:
                try:
                    aois = algorithm_runner(algorithm_name, image_path, source, batch_work_dir) or []
                except Exception as exc:
                    algorithm_failures.append({
                        "source_media_id": source["media_id"],
                        "algorithm": algorithm_name,
                        "reason": "algorithm_failed",
                        "error": str(exc),
                    })
                    continue

                for aoi in aois:
                    observations.append(normalize_aoi(source, algorithm_name, aoi))

    if observations and (source_failures or algorithm_failures):
        status = "partial"
    elif observations:
        status = "succeeded"
    else:
        status = "failed"

    reason = None
    error = None
    if source_failures:
        reason = "source_fetch_failed"
    elif algorithm_failures:
        reason = "algorithm_failed"
    if status == "failed":
        error = reason or "no_observations"
        reason = reason or "no_observations"

    return {
        "status": status,
        "reason": reason,
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": observations,
        },
        "details": {
            "raw_observation_count": len(observations),
            "normalized_observation_count": len(observations),
            "source_failures": source_failures,
            "algorithm_failures": algorithm_failures,
        },
        "metadata": {
            "source_count": len(request["sources"]),
            "task_id": payload.get("task_id"),
        },
        "error": error,
    }


def _empty_response(status, reason, error, payload):
    return {
        "status": status,
        "reason": reason,
        "result": {
            "service_version": f"chris-adiat-gpl-worker-{__version__}",
            "observations": [],
        },
        "details": {
            "raw_observation_count": 0,
            "normalized_observation_count": 0,
            "source_failures": [],
            "algorithm_failures": [],
        },
        "metadata": {
            "source_count": len(((payload or {}).get("request") or {}).get("sources") or []),
            "task_id": (payload or {}).get("task_id"),
        },
        "error": error,
    }


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
