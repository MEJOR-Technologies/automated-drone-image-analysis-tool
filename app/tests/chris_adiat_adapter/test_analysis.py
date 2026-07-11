import time
from pathlib import Path

import chris_adiat_adapter.batch_worker as batch_worker
from PIL import Image
from chris_adiat_adapter.analysis import run_batch


def _source(media_id):
    return {
        "media_id": media_id,
        "bucket": "mission-media",
        "object_key": f"original/{media_id}.jpg",
        "sensor_type": "rgb",
        "media_type": "raw",
        "content_type": "image/jpeg",
        "checksum_sha256": "a" * 64,
        "projection_footprint": {
            "type": "Polygon",
            "coordinates": [
                [[4.0, 52.0], [4.1, 52.0], [4.1, 52.1], [4.0, 52.1], [4.0, 52.0]]
            ],
        },
        "metadata": {"image_width": 640, "image_height": 480},
    }


def _payload(*media_ids):
    return {
        "task_id": "task-1",
        "metadata": {"attempt_id": "attempt-1"},
        "request": {
            "profile": "search_rescue",
            "sources": [_source(media_id) for media_id in media_ids],
        },
    }


def _load_source(source, work_dir):
    return f"/tmp/{source['media_id']}.jpg"


def _load_materialized_source(_source, work_dir):
    image_path = Path(work_dir) / "actual.jpg"
    Image.new("RGB", (320, 240)).save(image_path)
    return str(image_path)


def _run_algorithm(algorithm_name, image_path, source, work_dir, max_observations):
    if source["media_id"] == "slow":
        time.sleep(2)
    return [
        {
            "center": [20, 30],
            "radius": 6,
            "area": 42,
            "confidence": 87.5,
            "contour": [[10, 20], [30, 20], [30, 40], [10, 40]],
        }
    ]


def test_run_batch_isolates_each_source_and_aggregates_partial_results(tmp_path):
    result = run_batch(
        _payload("ok", "slow"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "failed"
    assert result["reason"] == "source_timeout"
    assert result["result"]["observations"] == []
    assert result["details"]["source_failures"][0]["source_media_id"] == "slow"
    assert result["details"]["source_failures"][0]["reason"] == "source_timeout"


def test_batch_worker_rejects_daemonic_runtime(monkeypatch):
    class DaemonicProcess:
        daemon = True

    monkeypatch.setattr(
        batch_worker.multiprocessing, "current_process", lambda: DaemonicProcess()
    )

    result = batch_worker.run(_payload("ok"))

    assert result["status"] == "failed"
    assert result["reason"] == "isolation_unavailable"
    assert result["details"]["processed_sources"] == []
    assert "non-daemonic" in result["error"]


def test_batch_worker_reports_dask_worker_identity(monkeypatch):
    class WorkerState:
        total_resources = {"adiat_analysis": 1.0}

    class Worker:
        address = "tcp://worker-1:8790"
        nthreads = 1
        state = WorkerState()

    monkeypatch.setattr("distributed.get_worker", lambda: Worker())
    monkeypatch.setattr(
        batch_worker,
        "run_batch",
        lambda payload, progress_callback=None: _empty_success(payload),
    )

    result = batch_worker.run(_payload("ok"))

    assert result["metadata"]["worker_address"] == "tcp://worker-1:8790"
    assert result["metadata"]["worker_nthreads"] == 1
    assert result["metadata"]["worker_resources"] == {"adiat_analysis": 1.0}
    assert result["metadata"]["worker_duration_seconds"] >= 0


def test_batch_worker_logs_progress_events_to_dask(monkeypatch):
    class WorkerState:
        total_resources = {"adiat_analysis": 1.0}

    class Worker:
        address = "tcp://worker-1:8790"
        nthreads = 1
        state = WorkerState()

        def __init__(self):
            self.events = []

        def log_event(self, topic, event):
            self.events.append((topic, event))

    worker = Worker()
    monkeypatch.setattr("distributed.get_worker", lambda: worker)

    def fake_run_batch(payload, progress_callback=None):
        progress_callback({"event": "source_terminal"})
        return _empty_success(payload)

    monkeypatch.setattr(batch_worker, "run_batch", fake_run_batch)

    batch_worker.run(_payload("ok"))

    assert worker.events == [
        (batch_worker.PROGRESS_TOPIC, {"event": "source_terminal"})
    ]


def _empty_success(payload):
    return {
        "status": "succeeded",
        "reason": None,
        "result": {"service_version": "test", "observations": []},
        "details": {
            "raw_observation_count": 0,
            "normalized_observation_count": 0,
            "processed_sources": [],
            "source_failures": [],
            "algorithm_failures": [],
            "truncations": [],
        },
        "metadata": {"task_id": payload["task_id"]},
        "error": None,
    }


def _run_algorithm_without_detections(
    algorithm_name, image_path, source, work_dir, max_observations
):
    return []


def _run_partially_failing_algorithms(
    algorithm_name, image_path, source, work_dir, max_observations
):
    if algorithm_name == "RXAnomaly":
        raise RuntimeError("RXAnomaly failed")
    return []


def _run_failing_algorithm(
    algorithm_name, image_path, source, work_dir, max_observations
):
    raise RuntimeError(f"{algorithm_name} failed")


def _run_many_detections(
    algorithm_name, image_path, source, work_dir, max_observations
):
    return [
        {"center": [index, index], "radius": 1, "detected_pixels": [[index, index]]}
        for index in range(3)
    ]


def _load_materialized_tiff(source, work_dir):
    input_dir = Path(work_dir) / "input"
    input_dir.mkdir(parents=True, exist_ok=True)
    image_path = input_dir / f"{source['media_id']}.tif"
    Image.new("RGB", (32, 24), color=(16, 32, 64)).save(image_path)
    return str(image_path)


def _run_algorithm_with_same_named_output(
    algorithm_name, image_path, source, work_dir, max_observations
):
    with Image.open(image_path) as image:
        assert image.size == (32, 24)
    output_path = Path(work_dir) / Path(image_path).name
    output_path.write_bytes(f"{algorithm_name}-mask".encode())
    with Image.open(image_path) as image:
        assert image.size == (32, 24)
    return []


def _load_materialized_slow_source(source, work_dir):
    input_dir = Path(work_dir) / "input"
    input_dir.mkdir(parents=True, exist_ok=True)
    image_path = input_dir / f"{source['media_id']}.jpg"
    Image.new("RGB", (32, 24)).save(image_path)
    return str(image_path)


def _run_many_large_detections(
    algorithm_name, image_path, source, work_dir, max_observations
):
    return [
        {
            "center": [index, index],
            "radius": 1,
            "contour": [[index, 0], [index + 1, 0], [index + 1, 1]],
            "confidence": 0.5,
        }
        for index in range(100)
    ]


def _load_oriented_source(source, work_dir):
    image_path = Path(work_dir) / "oriented.jpg"
    image = Image.new("RGB", (320, 240))
    image.getexif()[274] = 6
    image.save(image_path, exif=image.getexif())
    return str(image_path)


def test_run_batch_treats_zero_detections_as_success(tmp_path):
    result = run_batch(
        _payload("clear"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "succeeded"
    assert result["metadata"]["attempt_id"] == "attempt-1"
    assert result["result"]["observations"] == []
    assert result["details"]["processed_sources"] == [
        {
            "source_media_id": "clear",
            "source_checksum": "a" * 64,
            "algorithms_completed": ["MRMap", "RXAnomaly"],
        }
    ]


def test_run_batch_counts_two_algorithms_as_one_completed_source(tmp_path):
    events = []

    result = run_batch(
        _payload("image"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        progress_callback=events.append,
    )

    assert result["status"] == "succeeded"
    assert events == [
        {
            "event": "source_terminal",
            "task_id": "task-1",
            "attempt_id": "attempt-1",
            "sequence": 1,
            "total_sources": 1,
            "source_media_id": "image",
            "source_checksum": "a" * 64,
            "algorithms_expected": ["MRMap", "RXAnomaly"],
            "algorithms_completed": ["MRMap", "RXAnomaly"],
            "source_status": "succeeded",
            "completed_sources": 1,
            "failed_sources": 0,
        }
    ]


def test_run_batch_counts_failed_algorithm_as_failed_source(tmp_path):
    events = []

    result = run_batch(
        _payload("partial"),
        source_loader=_load_source,
        algorithm_runner=_run_partially_failing_algorithms,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        progress_callback=events.append,
    )

    assert result["status"] == "failed"
    assert len(events) == 1
    assert events[0]["algorithms_completed"] == ["MRMap"]
    assert events[0]["source_status"] == "failed"
    assert events[0]["completed_sources"] == 0
    assert events[0]["failed_sources"] == 1


def test_progress_callback_errors_do_not_fail_analysis(tmp_path):
    events = []

    def failing_callback(event):
        events.append(event)
        raise RuntimeError("progress sink unavailable")

    result = run_batch(
        _payload("image"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        progress_callback=failing_callback,
    )

    assert result["status"] == "succeeded"
    assert len(events) == 1
    assert result["details"]["processed_sources"]


def test_run_batch_attests_only_successfully_completed_algorithms(tmp_path):
    result = run_batch(
        _payload("partial"),
        source_loader=_load_source,
        algorithm_runner=_run_partially_failing_algorithms,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "failed"
    assert result["details"]["processed_sources"] == []


def test_run_batch_attestation_preserves_source_checksum(tmp_path):
    payload = _payload("checksum")
    checksum = "sha256:" + "B" * 64
    payload["request"]["sources"][0]["checksum_sha256"] = checksum

    result = run_batch(
        payload,
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["details"]["processed_sources"][0]["source_checksum"] == checksum


def test_run_batch_attests_complete_algorithm_coverage_for_each_source(tmp_path):
    result = run_batch(
        _payload("first", "second"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["details"]["processed_sources"] == [
        {
            "source_media_id": media_id,
            "source_checksum": "a" * 64,
            "algorithms_completed": ["MRMap", "RXAnomaly"],
        }
        for media_id in ("first", "second")
    ]


def test_failed_response_has_no_processed_source_attestations(tmp_path):
    result = run_batch(
        _payload("failed"),
        source_loader=_load_source,
        algorithm_runner=_run_failing_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "failed"
    assert result["details"]["processed_sources"] == []


def test_run_batch_uses_decoded_image_dimensions(tmp_path):
    result = run_batch(
        _payload("actual"),
        source_loader=_load_materialized_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "succeeded"
    assert {
        (item["source_image_width"], item["source_image_height"])
        for item in result["result"]["observations"]
    } == {(320, 240)}


def test_run_batch_executes_every_algorithm_when_observations_are_capped(
    tmp_path, monkeypatch
):
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_SOURCE", "1")

    result = run_batch(
        _payload("busy"),
        source_loader=_load_source,
        algorithm_runner=_run_many_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "partial"
    assert len(result["result"]["observations"]) == 1
    assert {item["algorithm"] for item in result["details"]["truncations"]} == {
        "MRMap",
        "RXAnomaly",
    }


def test_run_batch_enforces_whole_batch_deadline(tmp_path):
    events = []

    result = run_batch(
        _payload("slow", "never-started"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        batch_timeout_seconds=0.2,
        progress_callback=events.append,
    )

    assert result["status"] == "failed"
    assert result["reason"] == "batch_timeout"
    assert [
        item["source_media_id"] for item in result["details"]["source_failures"]
    ] == [
        "slow",
        "never-started",
    ]
    assert [event["source_media_id"] for event in events] == [
        "slow",
        "never-started",
    ]
    assert events[0]["total_sources"] == 2
    assert events[0]["completed_sources"] == 0
    assert events[0]["failed_sources"] == 1
    assert events[1]["sequence"] == 2
    assert events[1]["completed_sources"] == 0
    assert events[1]["failed_sources"] == 2


def test_tiff_source_remains_immutable_across_both_algorithms(tmp_path):
    result = run_batch(
        _payload("tiff-source"),
        source_loader=_load_materialized_tiff,
        algorithm_runner=_run_algorithm_with_same_named_output,
        work_dir=str(tmp_path),
        source_timeout_seconds=2,
    )

    assert result["status"] == "succeeded"
    assert list((tmp_path / "sources").iterdir()) == []


def test_source_work_directory_is_cleaned_after_timeout(tmp_path):
    result = run_batch(
        _payload("slow"),
        source_loader=_load_materialized_slow_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=0.05,
    )

    assert result["status"] == "failed"
    assert result["reason"] == "source_timeout"
    assert list((tmp_path / "sources").iterdir()) == []


def test_batch_cap_is_fair_across_two_sources(tmp_path, monkeypatch):
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_BATCH", "2")
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_SOURCE", "100")
    payload = _payload("first", "second")
    payload["request"]["algorithms"] = ["MRMap"]

    result = run_batch(
        payload,
        source_loader=_load_source,
        algorithm_runner=_run_many_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "partial"
    assert {item["source_media_id"] for item in result["result"]["observations"]} == {
        "first",
        "second",
    }
    assert len(result["result"]["observations"]) == 2


def test_serialized_response_byte_cap_records_truncation_reason(tmp_path, monkeypatch):
    monkeypatch.setenv("ADIAT_MAX_RESULT_BYTES", "4096")
    payload = _payload("large")
    payload["request"]["algorithms"] = ["MRMap"]

    result = run_batch(
        payload,
        source_loader=_load_source,
        algorithm_runner=_run_many_large_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "partial"
    assert result["reason"] == "result_byte_limit"
    assert any(
        item["reason"] == "result_byte_limit"
        for item in result["details"]["truncations"]
    )
    assert result["details"]["processed_sources"] == [
        {
            "source_media_id": "large",
            "source_checksum": "a" * 64,
            "algorithms_completed": ["MRMap"],
        }
    ]
    assert len(__import__("json").dumps(result, separators=(",", ":")).encode()) <= 4096


def test_serialized_response_fails_closed_when_attestations_cannot_fit(
    tmp_path, monkeypatch
):
    monkeypatch.setenv("ADIAT_MAX_RESULT_BYTES", "4096")
    media_ids = [f"{index:02d}-" + "x" * 117 for index in range(16)]

    result = run_batch(
        _payload(*media_ids),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "failed"
    assert result["reason"] == "result_byte_limit"
    assert result["details"]["processed_sources"] == []
    assert len(__import__("json").dumps(result, separators=(",", ":")).encode()) <= 4096


def test_invalid_payload_response_is_bounded(tmp_path, monkeypatch):
    monkeypatch.setenv("ADIAT_MAX_RESULT_BYTES", "4096")
    payload = _payload("large-identifier")
    payload["task_id"] = "x" * 100_000

    result = run_batch(payload, work_dir=str(tmp_path))

    assert result["status"] == "failed"
    assert result["reason"] == "invalid_payload"
    assert result["details"]["processed_sources"] == []
    assert len(__import__("json").dumps(result, separators=(",", ":")).encode()) <= 4096


def test_exif_orientation_transposes_image_dimensions(tmp_path):
    result = run_batch(
        _payload("oriented"),
        source_loader=_load_oriented_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["result"]["observations"]
    assert {
        (item["source_image_width"], item["source_image_height"])
        for item in result["result"]["observations"]
    } == {(240, 320)}
