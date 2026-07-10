import multiprocessing
import os
import time
import traceback


def run_with_timeout(target, args=None, kwargs=None, timeout_seconds=270):
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
    context = _multiprocessing_context()
    result_reader, result_writer = context.Pipe(duplex=False)
    process = context.Process(
        target=_run_child, args=(result_writer, target, args, kwargs)
    )
    process.start()
    result_writer.close()
    deadline = time.monotonic() + timeout_seconds

    try:
        while True:
            if result_reader.poll(0):
                try:
                    result = result_reader.recv()
                except EOFError:
                    break
                process.join(5)
                if process.is_alive():
                    _stop_process(process)
                return result

            remaining = deadline - time.monotonic()
            if remaining <= 0:
                _stop_process(process)
                return {
                    "status": "failed",
                    "reason": "timeout",
                    "value": None,
                    "error": f"analysis exceeded {timeout_seconds} seconds",
                }

            if result_reader.poll(min(remaining, 0.05)):
                try:
                    result = result_reader.recv()
                except EOFError:
                    break
                process.join(5)
                if process.is_alive():
                    _stop_process(process)
                return result

            if not process.is_alive():
                if result_reader.poll(0.05):
                    try:
                        return result_reader.recv()
                    except EOFError:
                        pass
                break
    finally:
        result_reader.close()

    process.join()
    return {
        "status": "failed",
        "reason": "worker_failed",
        "value": None,
        "error": f"worker exited with code {process.exitcode}",
    }


def _stop_process(process):
    if not process.is_alive():
        process.join()
        return
    process.terminate()
    process.join(5)
    if process.is_alive():
        process.kill()
        process.join(5)


def _run_child(result_writer, target, args, kwargs):
    try:
        _apply_child_memory_limit()
        value = target(*args, **kwargs)
        result_writer.send(
            {
                "status": "succeeded",
                "reason": None,
                "value": value,
                "error": None,
            }
        )
    except BaseException as exc:
        result_writer.send(
            {
                "status": "failed",
                "reason": "worker_failed",
                "value": None,
                "error": f"{exc}\n{traceback.format_exc()}",
            }
        )
    finally:
        result_writer.close()


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
