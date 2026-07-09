import os

from chris_adiat_adapter.analysis import run_batch
from chris_adiat_adapter.isolation import run_with_timeout


def run(payload):
    timeout_seconds = float(os.getenv("ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS", "270"))
    isolated = run_with_timeout(run_batch, args=(payload,), timeout_seconds=timeout_seconds)
    if isolated["status"] == "succeeded":
        return isolated["value"]

    return {
        "status": "failed",
        "reason": isolated["reason"],
        "result": {"observations": []},
        "details": {
            "raw_observation_count": 0,
            "normalized_observation_count": 0,
        },
        "metadata": {"task_id": payload.get("task_id") if isinstance(payload, dict) else None},
        "error": isolated["error"],
    }
