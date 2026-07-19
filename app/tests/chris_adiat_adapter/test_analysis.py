import io
import json
import time
from pathlib import Path

import chris_adiat_adapter.batch_worker as batch_worker
import pyarrow.parquet as pq
from PIL import Image
from botocore.exceptions import ClientError
from chris_adiat_adapter.analysis import (
    PARQUET_OBSERVATION_BATCH_SIZE,
    _algorithm_options_for_source,
    _algorithms_for_source,
    _effective_batch_timeout_seconds,
    _run_source,
    _stream_normalized_observations,
    run_batch,
)


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
            "algorithms": ["MRMap", "RXAnomaly"],
            "sources": [_source(media_id) for media_id in media_ids],
        },
    }


def _parquet_payload(media_id="parquet-source"):
    payload = _payload(media_id)
    payload["request"].update(
        {
            "analysis_run_id": "50df8cac-5ff8-47b5-8f02-745857db4821",
            "mission_id": "3c62af7c-f242-4f0b-9c28-d9334de98ed2",
            "flight_id": "ab538a6a-64c5-4d0b-87f9-2480461048c5",
            "algorithms": ["MRMap"],
            "persistence": {
                "mode": "parquet",
                "contract_version": 2,
                "artifact_schema_version": 1,
                "bucket": "processed",
                "canonical_object_key": "mission/result.parquet",
                "attempt_object_key": "mission/_attempts/a/result.parquet",
                "manifest_object_key": "mission/manifest.json",
                "content_type": "application/vnd.apache.parquet",
                "immutable": True,
            },
        }
    )
    return payload


class _MemoryS3:
    def __init__(self):
        self.objects = {}

    def put_object(self, **kwargs):
        key = (kwargs["Bucket"], kwargs["Key"])
        if kwargs.get("IfNoneMatch") == "*" and key in self.objects:
            raise ClientError({"Error": {"Code": "PreconditionFailed"}}, "PutObject")
        self.objects[key] = {
            "body": kwargs["Body"].read(),
            "metadata": dict(kwargs.get("Metadata") or {}),
        }

    def head_object(self, *, Bucket, Key):
        value = self.objects.get((Bucket, Key))
        if value is None:
            raise ClientError({"Error": {"Code": "404"}}, "HeadObject")
        return {"Metadata": value["metadata"], "ContentLength": len(value["body"])}


def _load_source(source, work_dir):
    return f"/tmp/{source['media_id']}.jpg"


def _load_materialized_source(_source, work_dir):
    image_path = Path(work_dir) / "actual.jpg"
    Image.new("RGB", (320, 240)).save(image_path)
    return str(image_path)


def _run_algorithm(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    if source["media_id"] == "slow":
        time.sleep(5)
    return [
        {
            "center": [20, 30],
            "radius": 6,
            "area": 42,
            "confidence": 87.5,
            "contour": [[10, 20], [30, 20], [30, 40], [10, 40]],
        }
    ]


def _run_algorithm_with_planned_options(
    algorithm_name,
    image_path,
    source,
    work_dir,
    max_observations,
    algorithm_options,
):
    assert algorithm_options == {
        "segments": 16,
        "threshold": 99,
        "window": 30,
        "colorspace": "LAB",
    }
    return _run_algorithm(
        algorithm_name,
        image_path,
        source,
        work_dir,
        max_observations,
        algorithm_options,
    )


def test_run_batch_isolates_each_source_and_aggregates_partial_results(tmp_path):
    result = run_batch(
        _payload("ok", "slow"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=3,
    )

    assert result["status"] == "partial"
    assert result["reason"] == "source_timeout"
    assert len(result["result"]["observations"]) == 2
    assert {item["source_media_id"] for item in result["result"]["observations"]} == {"ok"}
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
        lambda payload, progress_callback=None, **_kwargs: _empty_success(payload),
    )

    result = batch_worker.run(_payload("ok"))

    assert result["metadata"]["worker_address"] == "tcp://worker-1:8790"
    assert result["metadata"]["worker_nthreads"] == 1
    assert result["metadata"]["worker_resources"] == {"adiat_analysis": 1.0}
    assert result["metadata"]["worker_duration_seconds"] >= 0


def test_batch_worker_keeps_large_results_for_dispatcher_compression(monkeypatch):
    captured = {}

    def fake_run_batch(payload, progress_callback=None, **kwargs):
        captured.update(kwargs)
        result = _empty_success(payload)
        result["result"]["observations"] = [{"id": index} for index in range(6000)]
        return result

    monkeypatch.setattr(batch_worker, "run_batch", fake_run_batch)

    result = batch_worker.run(_payload("ok"))

    assert captured["apply_result_byte_limit"] is False
    assert len(result["result"]["observations"]) == 6000


def test_batch_worker_reports_parquet_transport_without_inline_streaming(monkeypatch):
    monkeypatch.setattr(
        batch_worker,
        "run_batch",
        lambda payload, progress_callback=None, **_kwargs: _empty_success(payload),
    )

    result = batch_worker.run(_parquet_payload())

    assert result["metadata"]["result_transport"] == "parquet"
    assert result["metadata"]["observations_streamed"] is False


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

    def fake_run_batch(payload, progress_callback=None, **_kwargs):
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
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    return []


class _RuntimeAois(list):
    runtime_provenance = {
        "effective_options": {"cpu_only": True},
        "adapter_version": "0.2.1",
        "service_version": "1",
        "ai_model_filename": "ai_person_model_V2_640.onnx",
        "ai_model_sha256": "d" * 64,
        "actual_provider": "CPUExecutionProvider",
    }


def _run_algorithm_without_detections_with_runtime(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    return _RuntimeAois()


def _run_partially_failing_algorithms(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    if algorithm_name == "RXAnomaly":
        raise RuntimeError("RXAnomaly failed")
    return []


def _run_failing_algorithm(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    raise RuntimeError(f"{algorithm_name} failed")


def _run_many_detections(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
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
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
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
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
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


def _run_unbounded_detections(
    algorithm_name, image_path, source, work_dir, max_observations, algorithm_options
):
    assert max_observations == -1
    return (
        {
            "center": [index, index],
            "radius": 1,
            "contour": [[index, 0], [index + 1, 0], [index + 1, 1]],
            "confidence": float(index),
        }
        for index in range(1500)
    )


def test_stream_normalization_consumes_large_iterator_in_bounded_ordered_batches():
    events = []
    consumed = 0
    maximum_ahead = 0

    def aois():
        nonlocal maximum_ahead
        for index in range(10_000):
            maximum_ahead = max(maximum_ahead, index + 1 - consumed)
            yield {"center": [index, index], "radius": 1}

    def receive(event):
        nonlocal consumed
        observations = event["observations"]
        assert len(observations) <= PARQUET_OBSERVATION_BATCH_SIZE
        events.append(event)
        consumed += len(observations)

    count = _stream_normalized_observations(
        receive,
        _source("bounded"),
        "MRMap",
        aois(),
    )

    centers = [
        observation["source_center_pixel"]
        for event in events
        for observation in event["observations"]
    ]
    assert count == 10_000
    assert consumed == 10_000
    assert maximum_ahead <= PARQUET_OBSERVATION_BATCH_SIZE
    assert centers == [[index, index] for index in range(10_000)]


def test_stream_normalization_zero_result_emits_no_batches():
    events = []

    count = _stream_normalized_observations(
        events.append,
        _source("empty"),
        "MRMap",
        iter(()),
    )

    assert count == 0
    assert events == []


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
        source_timeout_seconds=3,
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
    assert [event["event"] for event in events] == [
        "algorithm_started",
        "algorithm_terminal",
        "algorithm_started",
        "algorithm_terminal",
        "source_terminal",
    ]
    assert [event["checkpoint_sequence"] for event in events] == [1, 2, 3, 4, 5]
    assert [event.get("algorithm") for event in events[:4]] == [
        "MRMap",
        "MRMap",
        "RXAnomaly",
        "RXAnomaly",
    ]
    assert events[0]["algorithm_status"] == "running"
    assert events[1]["completed_algorithm_runs"] == 1
    assert events[3]["completed_algorithm_runs"] == 2
    assert events[4]["algorithms_completed"] == ["MRMap", "RXAnomaly"]
    assert events[4]["source_status"] == "succeeded"
    assert events[4]["completed_sources"] == 1
    assert set(events[4]["algorithm_durations_ms"]) == {"MRMap", "RXAnomaly"}


def test_execution_plan_routes_only_sensor_compatible_algorithms():
    request = {
        "execution_plan": {
            "entries": [
                {"algorithm": "AIPersonDetector", "sensor_type": "rgb"},
                {"algorithm": "MRMap", "sensor_type": "rgb"},
                {"algorithm": "ThermalAnomaly", "sensor_type": "thermal"},
            ]
        }
    }

    assert _algorithms_for_source(
        request,
        {"sensor_type": "rgb"},
        ["AIPersonDetector", "MRMap", "ThermalAnomaly"],
    ) == ["AIPersonDetector", "MRMap"]
    assert _algorithms_for_source(
        request,
        {"sensor_type": "thermal"},
        ["AIPersonDetector", "MRMap", "ThermalAnomaly"],
    ) == ["ThermalAnomaly"]


def test_execution_plan_keeps_fanout_child_scoped_to_its_assigned_detector():
    request = {
        "execution_plan": {
            "entries": [
                {"algorithm": "AIPersonDetector", "sensor_type": "rgb"},
                {"algorithm": "MRMap", "sensor_type": "rgb"},
                {"algorithm": "RXAnomaly", "sensor_type": "rgb"},
            ]
        }
    }

    assert _algorithms_for_source(
        request,
        {"sensor_type": "rgb"},
        ["MRMap"],
    ) == ["MRMap"]
    assert _algorithms_for_source(
        request,
        {"sensor_type": "thermal"},
        ["MRMap"],
    ) == []


def test_execution_plan_options_reach_detector_and_normalized_observation(tmp_path):
    source = _source("planned")
    source["sensor_type"] = "rgb"
    request = {
        "execution_plan": {
            "entries": [
                {
                    "algorithm": "AIPersonDetector",
                    "sensor_type": "rgb",
                    "options": {
                        "person_detector_confidence": 0.0,
                    },
                }
            ]
        }
    }
    options_by_name = _algorithm_options_for_source(
        request,
        source,
        ["AIPersonDetector"],
    )
    captured = {}

    def runner(
        algorithm_name,
        image_path,
        source_value,
        work_dir,
        max_observations,
        algorithm_options,
    ):
        captured.update(algorithm_options)
        return [{"center": [20, 30], "radius": 4, "confidence": 12.5}]

    result = _run_source(
        source,
        ["AIPersonDetector"],
        _load_materialized_source,
        runner,
        str(tmp_path),
        100,
        options_by_name,
    )

    assert captured == {
        "person_detector_confidence": 0.0,
        "cpu_only": True,
    }
    assert result["observations"][0]["algorithm_options"] == captured


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

    assert result["status"] == "partial"
    assert len(events) == 5
    terminal_events = [event for event in events if event["event"] != "algorithm_started"]
    assert terminal_events[0]["algorithm_status"] == "succeeded"
    assert terminal_events[1]["algorithm_status"] == "failed"
    assert terminal_events[2]["algorithms_completed"] == ["MRMap"]
    assert terminal_events[2]["source_status"] == "failed"
    assert terminal_events[2]["completed_sources"] == 0
    assert terminal_events[2]["failed_sources"] == 1


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
    assert len(events) == 5
    assert result["details"]["processed_sources"]


def test_run_batch_attests_only_successfully_completed_algorithms(tmp_path):
    result = run_batch(
        _payload("partial"),
        source_loader=_load_source,
        algorithm_runner=_run_partially_failing_algorithms,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
    )

    assert result["status"] == "partial"
    assert result["details"]["processed_sources"] == [
        {
            "source_media_id": "partial",
            "source_checksum": "a" * 64,
            "algorithms_completed": ["MRMap"],
        }
    ]


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
        source_timeout_seconds=3,
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
    assert len(result["result"]["observations"]) == 2
    assert {item["algorithm"] for item in result["details"]["truncations"]} == {
        "MRMap",
        "RXAnomaly",
    }
    assert all(item["retained"] == 1 for item in result["details"]["truncations"])


def test_default_batch_deadline_scales_with_source_count(monkeypatch):
    monkeypatch.setenv("ADIAT_BATCH_TIMEOUT_SECONDS", "1")

    result = _effective_batch_timeout_seconds(
        1,
        source_count=28,
        source_timeout_seconds=270,
    )

    assert result == 28 * 270 + 15 * 60


def test_run_batch_processes_all_sources_in_a_28_flight_batch(tmp_path):
    source_ids = [f"flight-{index:02d}" for index in range(28)]

    result = run_batch(
        _payload(*source_ids),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        batch_timeout_seconds=60,
    )

    assert result["status"] == "succeeded"
    assert result["metadata"]["processed_source_count"] == 28
    assert len(result["details"]["processed_sources"]) == 28
    assert result["details"]["source_failures"] == []
    assert result["details"]["algorithm_failures"] == []
    assert len(result["result"]["observations"]) == 56


def test_run_batch_keeps_all_observations_across_a_28_flight_batch(tmp_path):
    source_ids = [f"flight-{index:02d}" for index in range(28)]

    result = run_batch(
        _payload(*source_ids),
        source_loader=_load_source,
        algorithm_runner=_run_many_large_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=2,
        batch_timeout_seconds=120,
        apply_result_byte_limit=False,
    )

    assert result["status"] == "succeeded"
    assert result["details"]["truncations"] == []
    assert result["details"]["raw_observation_count"] == 28 * 2 * 100
    assert len(result["result"]["observations"]) == 28 * 2 * 100


def test_streaming_run_processes_all_sources_without_inline_accumulation(tmp_path):
    source_ids = [f"flight-{index:02d}" for index in range(28)]
    events = []

    result = run_batch(
        _payload(*source_ids),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        batch_timeout_seconds=120,
        progress_callback=events.append,
    )

    assert result["status"] == "succeeded"
    assert result["details"]["result_transport"] == "source_chunks"
    assert result["details"]["normalized_observation_count"] == 28 * 2
    assert result["result"]["observations"] == []
    assert len([event for event in events if event["event"] == "source_terminal"]) == 28


def test_parquet_run_streams_every_detection_without_response_caps(tmp_path, monkeypatch):
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_SOURCE", "1")
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_BATCH", "1")
    monkeypatch.setenv("ADIAT_MAX_RESULT_BYTES", "4096")
    client = _MemoryS3()

    result = run_batch(
        _parquet_payload(),
        source_loader=_load_source,
        algorithm_runner=_run_unbounded_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=5,
        batch_timeout_seconds=10,
        artifact_s3_client=client,
    )

    assert result["status"] == "succeeded"
    assert result["reason"] is None
    assert result["result"]["observations"] == []
    assert result["details"]["truncations"] == []
    assert result["details"]["normalized_observation_count"] == 1500
    assert result["persistence"]["observation_count"] == 1500
    assert result["persistence"]["detection_count"] == 1500
    assert result["persistence"]["artifacts"][0]["row_count"] == 1500
    assert len(__import__("json").dumps(result, separators=(",", ":")).encode()) <= 4096


def test_parquet_run_persists_effective_execution_plan_options(tmp_path):
    client = _MemoryS3()
    payload = _parquet_payload()
    payload["request"]["execution_plan"] = {
        "entries": [
            {
                "algorithm": "MRMap",
                "sensor_type": "rgb",
                "options": {"threshold": 99},
            }
        ]
    }

    result = run_batch(
        payload,
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_with_planned_options,
        work_dir=str(tmp_path),
        source_timeout_seconds=5,
        batch_timeout_seconds=10,
        artifact_s3_client=client,
    )

    assert result["status"] == "succeeded"
    body = client.objects[("processed", "mission/result.parquet")]["body"]
    row = pq.read_table(io.BytesIO(body)).to_pylist()[0]
    assert json.loads(row["algorithm_options_json"]) == {
        "colorspace": "LAB",
        "segments": 16,
        "threshold": 99,
        "window": 30,
    }


def test_parquet_run_publishes_zero_detection_artifact(tmp_path):
    client = _MemoryS3()

    result = run_batch(
        _parquet_payload(),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections,
        work_dir=str(tmp_path),
        source_timeout_seconds=5,
        batch_timeout_seconds=10,
        artifact_s3_client=client,
    )

    assert result["status"] == "succeeded"
    assert result["details"]["normalized_observation_count"] == 0
    assert result["persistence"]["observation_count"] == 0
    assert result["persistence"]["artifacts"][0]["row_count"] == 0
    assert ("processed", "mission/result.parquet") in client.objects


def test_parquet_run_publishes_zero_detection_runtime_provenance(tmp_path):
    client = _MemoryS3()

    result = run_batch(
        _parquet_payload(),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections_with_runtime,
        work_dir=str(tmp_path),
        source_timeout_seconds=5,
        batch_timeout_seconds=10,
        artifact_s3_client=client,
    )

    assert result["status"] == "succeeded"
    assert result["persistence"]["runtime_provenance"] == [
        _RuntimeAois.runtime_provenance
    ]
    assert result["persistence"]["artifacts"][0]["runtime_provenance"] == [
        _RuntimeAois.runtime_provenance
    ]


def test_parquet_run_returns_transient_promotion_diagnostics(tmp_path):
    payload = _parquet_payload()

    class CanonicalFailureS3(_MemoryS3):
        def put_object(self, **kwargs):
            if kwargs["Key"] == "mission/result.parquet":
                raise ClientError(
                    {
                        "Error": {"Code": "ServiceUnavailable"},
                        "ResponseMetadata": {"HTTPStatusCode": 503},
                    },
                    "PutObject",
                )
            return super().put_object(**kwargs)

    client = CanonicalFailureS3()
    result = run_batch(
        payload,
        source_loader=_load_source,
        algorithm_runner=_run_algorithm_without_detections_with_runtime,
        work_dir=str(tmp_path),
        source_timeout_seconds=5,
        batch_timeout_seconds=10,
        artifact_s3_client=client,
    )

    assert result["status"] == "failed"
    assert result["details"]["publication_failure"] == {
        "retryable": True,
        "failure_kind": "transient",
        "attempt_uri": "s3://processed/mission/_attempts/a/result.parquet",
        "artifact_checksum": client.objects[
            ("processed", "mission/_attempts/a/result.parquet")
        ]["metadata"]["sha256"],
    }
    assert "persistence" not in result
    assert ("processed", "mission/_attempts/a/result.parquet") in client.objects


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
    terminal_events = [event for event in events if event["event"] == "source_terminal"]
    assert [event["source_media_id"] for event in terminal_events] == [
        "slow",
        "never-started",
    ]
    assert terminal_events[0]["total_sources"] == 2
    assert terminal_events[0]["completed_sources"] == 0
    assert terminal_events[0]["failed_sources"] == 1
    assert terminal_events[1]["sequence"] == 2
    assert terminal_events[1]["completed_sources"] == 0
    assert terminal_events[1]["failed_sources"] == 2


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


def test_observation_limit_is_independent_per_source(tmp_path, monkeypatch):
    # A mission-wide run must not divide one photo's budget by the number of
    # photos. The batch setting remains diagnostic/compatibility metadata.
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_BATCH", "1")
    monkeypatch.setenv("ADIAT_MAX_OBSERVATIONS_PER_SOURCE", "2")
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
    assert len(result["result"]["observations"]) == 4
    assert result["details"]["configured_limits"]["max_observations_per_batch"] == 1
    assert all(item["retained"] == 2 for item in result["details"]["truncations"])


def test_streaming_run_keeps_observations_out_of_terminal_result(tmp_path):
    events = []

    result = run_batch(
        _payload("first", "second"),
        source_loader=_load_source,
        algorithm_runner=_run_algorithm,
        work_dir=str(tmp_path),
        source_timeout_seconds=1,
        progress_callback=events.append,
    )

    assert result["status"] == "succeeded"
    assert result["details"]["result_transport"] == "source_chunks"
    assert result["details"]["observations_streamed"] is True
    assert result["details"]["normalized_observation_count"] == 4
    assert result["result"]["observations"] == []
    source_events = [event for event in events if event["event"] == "source_terminal"]
    assert len(source_events) == 2
    assert [event["observations_count"] for event in source_events] == [2, 2]
    assert all(event.get("observations_gzip_base64") for event in source_events)


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
