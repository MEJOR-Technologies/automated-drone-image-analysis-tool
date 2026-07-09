import multiprocessing
import queue
import traceback


def run_with_timeout(target, args=None, kwargs=None, timeout_seconds=270):
    args = args or ()
    kwargs = kwargs or {}
    context = _multiprocessing_context()
    result_queue = context.Queue(maxsize=1)
    process = context.Process(target=_run_child, args=(result_queue, target, args, kwargs))
    process.start()
    process.join(timeout_seconds)

    if process.is_alive():
        process.terminate()
        process.join(5)
        if process.is_alive():
            process.kill()
            process.join(5)
        return {
            "status": "failed",
            "reason": "timeout",
            "value": None,
            "error": f"analysis exceeded {timeout_seconds} seconds",
        }

    try:
        return result_queue.get_nowait()
    except queue.Empty:
        return {
            "status": "failed",
            "reason": "worker_failed",
            "value": None,
            "error": f"worker exited with code {process.exitcode}",
        }


def _run_child(result_queue, target, args, kwargs):
    try:
        value = target(*args, **kwargs)
        result_queue.put({
            "status": "succeeded",
            "reason": None,
            "value": value,
            "error": None,
        })
    except Exception as exc:
        result_queue.put({
            "status": "failed",
            "reason": "worker_failed",
            "value": None,
            "error": f"{exc}\n{traceback.format_exc()}",
        })


def _multiprocessing_context():
    try:
        return multiprocessing.get_context("fork")
    except ValueError:
        return multiprocessing.get_context("spawn")
