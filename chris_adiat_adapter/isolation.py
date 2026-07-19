import atexit
import multiprocessing
import os
import threading
import time
import traceback


_worker_lock = threading.Lock()
_worker_process = None
_worker_connection = None


def run_with_timeout(
    target,
    args=None,
    kwargs=None,
    timeout_seconds=270,
    progress_callback=None,
):
    """Run one serialized call in a spawn child retained by this worker process."""
    if multiprocessing.current_process().daemon:
        return {
            "status": "failed",
            "reason": "isolation_unavailable",
            "value": None,
            "error": "analysis isolation is unavailable in a daemonic process",
        }
    if timeout_seconds <= 0:
        raise ValueError("timeout_seconds must be positive")

    args = args or ()
    kwargs = kwargs or {}
    with _worker_lock:
        process, connection = _ensure_worker()
        try:
            connection.send(
                {
                    "target": target,
                    "args": args,
                    "kwargs": kwargs,
                    "stream_progress": progress_callback is not None,
                }
            )
        except (BrokenPipeError, EOFError, OSError):
            exitcode = process.exitcode
            _reset_worker()
            return _worker_failed_result(exitcode)

        try:
            if not connection.poll(30):
                _reset_worker()
                return _worker_failed_result(process.exitcode)
            started = connection.recv()
        except (EOFError, OSError):
            exitcode = process.exitcode
            _reset_worker()
            return _worker_failed_result(exitcode)
        if not isinstance(started, dict) or started.get("kind") != "started":
            _reset_worker()
            return _worker_failed_result(process.exitcode)

        deadline = time.monotonic() + timeout_seconds
        while True:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                _reset_worker()
                return {
                    "status": "failed",
                    "reason": "timeout",
                    "value": None,
                    "error": f"analysis exceeded {timeout_seconds} seconds",
                }
            try:
                if connection.poll(min(remaining, 0.05)):
                    message = connection.recv()
                    result = _handle_child_message(message, progress_callback)
                    if result is not None:
                        return result
            except (EOFError, OSError):
                exitcode = process.exitcode
                _reset_worker()
                return _worker_failed_result(exitcode)
            if not process.is_alive():
                exitcode = process.exitcode
                _reset_worker()
                return _worker_failed_result(exitcode)


def _ensure_worker():
    global _worker_connection, _worker_process
    if _worker_process is not None and _worker_process.is_alive():
        return _worker_process, _worker_connection
    _reset_worker()
    context = _multiprocessing_context()
    parent_connection, child_connection = context.Pipe(duplex=True)
    process = context.Process(target=_worker_loop, args=(child_connection,))
    process.daemon = True
    process.start()
    child_connection.close()
    if not parent_connection.poll(30):
        parent_connection.close()
        _stop_process(process)
        raise RuntimeError("analysis worker did not become ready")
    message = parent_connection.recv()
    if not isinstance(message, dict) or message.get("kind") != "ready":
        parent_connection.close()
        _stop_process(process)
        raise RuntimeError("analysis worker failed readiness handshake")
    _worker_process = process
    _worker_connection = parent_connection
    return process, parent_connection


def _reset_worker():
    global _worker_connection, _worker_process
    connection = _worker_connection
    process = _worker_process
    _worker_connection = None
    _worker_process = None
    if connection is not None:
        connection.close()
    if process is not None:
        _stop_process(process)


def _stop_process(process):
    if not process.is_alive():
        process.join()
        return
    process.terminate()
    process.join(5)
    if process.is_alive():
        process.kill()
        process.join(5)


def _worker_failed_result(exitcode):
    return {
        "status": "failed",
        "reason": "worker_failed",
        "value": None,
        "error": f"worker exited with code {exitcode}",
    }


def _handle_child_message(message, progress_callback):
    if not isinstance(message, dict) or message.get("kind") != "progress":
        if isinstance(message, dict) and message.get("kind") == "result":
            return message.get("value")
        return message
    if progress_callback is not None:
        try:
            progress_callback(message.get("value"))
        except Exception:
            pass
    return None


def _worker_loop(connection):
    _apply_child_memory_limit()
    connection.send({"kind": "ready"})
    while True:
        try:
            request = connection.recv()
        except EOFError:
            break
        target = request["target"]
        args = request["args"]
        kwargs = request["kwargs"]
        connection.send({"kind": "started"})
        try:
            if request["stream_progress"]:
                kwargs = dict(kwargs)
                kwargs["progress_callback"] = lambda event: _send_progress(
                    connection, event
                )
            value = target(*args, **kwargs)
            result = {
                "status": "succeeded",
                "reason": None,
                "value": value,
                "error": None,
            }
        except BaseException as exc:
            result = {
                "status": "failed",
                "reason": "worker_failed",
                "value": None,
                "error": f"{exc}\n{traceback.format_exc()}",
            }
        try:
            connection.send({"kind": "result", "value": result})
        except (BrokenPipeError, EOFError, OSError):
            break
    connection.close()


def _send_progress(connection, event):
    try:
        connection.send({"kind": "progress", "value": event})
    except (BrokenPipeError, EOFError, OSError):
        pass


def _multiprocessing_context():
    return multiprocessing.get_context("spawn")


def _apply_child_memory_limit():
    raw_limit = os.getenv("ADIAT_CHILD_MEMORY_LIMIT_BYTES")
    if not raw_limit:
        return
    try:
        limit_bytes = int(raw_limit)
    except (TypeError, ValueError):
        raise RuntimeError(
            "ADIAT_CHILD_MEMORY_LIMIT_BYTES must be a positive integer"
        ) from None
    if limit_bytes <= 0:
        raise RuntimeError("ADIAT_CHILD_MEMORY_LIMIT_BYTES must be a positive integer")

    try:
        import resource
    except ImportError:
        raise RuntimeError(
            "child memory limits are unavailable on this platform"
        ) from None

    _soft_limit, hard_limit = resource.getrlimit(resource.RLIMIT_AS)
    if hard_limit not in (resource.RLIM_INFINITY, -1):
        limit_bytes = min(limit_bytes, hard_limit)
        resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, hard_limit))
    else:
        resource.setrlimit(resource.RLIMIT_AS, (limit_bytes, limit_bytes))


atexit.register(_reset_worker)
