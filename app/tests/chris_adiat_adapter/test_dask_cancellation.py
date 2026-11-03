"""Real Dask cancellation must stop the isolated computation, not only its Future."""

import os
import tempfile
import time
import unittest
from pathlib import Path

import psutil
from distributed import Client, LocalCluster, get_worker

from chris_adiat_adapter import isolation
from chris_adiat_adapter.batch_worker import _cancellation_check


def _block_and_write(pid_file, finished_file):
    Path(pid_file).write_text(str(os.getpid()))
    time.sleep(60)
    Path(finished_file).write_text("late side effect")
    return "finished"


def _isolated_work(pid_file, finished_file):
    return isolation.run_with_timeout(
        _block_and_write,
        args=(pid_file, finished_file),
        timeout_seconds=90,
        cancellation_check=_cancellation_check(get_worker()),
    )


def _reset_isolated_work():
    isolation._reset_worker()


def _seven():
    return 7


def _isolated_successor():
    return isolation.run_with_timeout(_seven, timeout_seconds=5)["value"]


class DaskCancellationTests(unittest.TestCase):
    def test_cancel_stops_child_and_releases_worker_for_next_task(self):
        with tempfile.TemporaryDirectory() as directory:
            pid_file = Path(directory) / "pid"
            finished_file = Path(directory) / "finished"
            with LocalCluster(
                processes=False,
                n_workers=1,
                threads_per_worker=1,
                dashboard_address=None,
            ) as cluster:
                with Client(cluster) as client:
                    future = client.submit(
                        _isolated_work, str(pid_file), str(finished_file), pure=False
                    )
                    try:
                        deadline = time.monotonic() + 15
                        while not pid_file.exists() and time.monotonic() < deadline:
                            time.sleep(0.05)
                        self.assertTrue(
                            pid_file.exists(), "the actual computation must start"
                        )
                        child_pid = int(pid_file.read_text())
                        self.assertTrue(psutil.pid_exists(child_pid))
                        started = time.monotonic()
                        client.cancel(future, force=True)
                        deadline = time.monotonic() + 5
                        while (
                            psutil.pid_exists(child_pid) and time.monotonic() < deadline
                        ):
                            time.sleep(0.05)
                        self.assertFalse(
                            psutil.pid_exists(child_pid),
                            "cancel must terminate the active child",
                        )
                        self.assertLess(time.monotonic() - started, 5)
                        self.assertFalse(finished_file.exists())
                        self.assertEqual(
                            client.submit(_isolated_successor, pure=False).result(
                                timeout=5
                            ),
                            7,
                        )
                    finally:
                        client.run(_reset_isolated_work)


if __name__ == "__main__":
    unittest.main()
