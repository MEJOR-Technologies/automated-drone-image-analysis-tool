import time
import sys
from types import SimpleNamespace

import chris_adiat_adapter.isolation as isolation
from chris_adiat_adapter.isolation import run_with_timeout


def _large_result():
    return b"x" * (4 * 1024 * 1024)


def _sleep():
    time.sleep(2)


def _raise_error():
    raise RuntimeError("worker failed")


def test_run_with_timeout_drains_large_result_before_joining_child():
    result = run_with_timeout(_large_result, timeout_seconds=2)

    assert result["status"] == "succeeded"
    assert len(result["value"]) == 4 * 1024 * 1024


def test_run_with_timeout_kills_child_after_deadline():
    result = run_with_timeout(_sleep, timeout_seconds=0.05)

    assert result["status"] == "failed"
    assert result["reason"] == "timeout"


def test_run_with_timeout_returns_child_exception():
    result = run_with_timeout(_raise_error, timeout_seconds=2)

    assert result["status"] == "failed"
    assert result["reason"] == "worker_failed"
    assert "worker failed" in result["error"]


def test_run_with_timeout_rejects_daemonic_process(monkeypatch):
    class DaemonicProcess:
        daemon = True

    monkeypatch.setattr(
        isolation.multiprocessing, "current_process", lambda: DaemonicProcess()
    )

    result = run_with_timeout(_large_result, timeout_seconds=2)

    assert result["reason"] == "isolation_unavailable"


def test_child_memory_limit_is_applied(monkeypatch):
    calls = []
    fake_resource = SimpleNamespace(
        RLIMIT_AS=9,
        RLIM_INFINITY=-1,
        getrlimit=lambda _resource: (-1, -1),
        setrlimit=lambda resource_id, limits: calls.append((resource_id, limits)),
    )
    monkeypatch.setitem(sys.modules, "resource", fake_resource)
    monkeypatch.setenv("ADIAT_CHILD_MEMORY_LIMIT_BYTES", "1024")

    isolation._apply_child_memory_limit()

    assert calls == [(9, (1024, 1024))]
