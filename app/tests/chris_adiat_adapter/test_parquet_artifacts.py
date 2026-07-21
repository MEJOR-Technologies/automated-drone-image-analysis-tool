import hashlib
import io
import json
import xml.etree.ElementTree as ET
from copy import deepcopy

import pyarrow.parquet as pq
import pytest
from botocore.exceptions import ClientError

from chris_adiat_adapter.parquet_artifacts import (
    ArtifactPublicationError,
    ObservationArtifactWriter,
    PARQUET_ROW_GROUP_SIZE,
    publish_prepared_observation_artifact,
    publish_observation_artifact,
    TransientArtifactPublicationError,
)
from chris_adiat_adapter.legacy_xml_artifacts import (
    write_legacy_xml_from_parquet,
)


RUN_ID = "50df8cac-5ff8-47b5-8f02-745857db4821"
FLIGHT_ID = "ab538a6a-64c5-4d0b-87f9-2480461048c5"
SOURCE_ID = "466be890-2b1a-43fc-ae2b-22053fc89335"


class MemoryS3:
    def __init__(self):
        self.objects = {}
        self.put_calls = []

    def put_object(self, **kwargs):
        self.put_calls.append(
            {
                "Bucket": kwargs["Bucket"],
                "Key": kwargs["Key"],
                "IfNoneMatch": kwargs.get("IfNoneMatch"),
            }
        )
        key = (kwargs["Bucket"], kwargs["Key"])
        if kwargs.get("IfNoneMatch") == "*" and key in self.objects:
            raise ClientError(
                {"Error": {"Code": "PreconditionFailed", "Message": "exists"}},
                "PutObject",
            )
        payload = kwargs["Body"].read()
        self.objects[key] = {
            "Body": payload,
            "Metadata": dict(kwargs.get("Metadata") or {}),
            "ContentType": kwargs.get("ContentType"),
        }

    def head_object(self, *, Bucket, Key):
        item = self.objects.get((Bucket, Key))
        if item is None:
            raise ClientError(
                {"Error": {"Code": "404", "Message": "missing"}},
                "HeadObject",
            )
        return {"Metadata": item["Metadata"], "ContentLength": len(item["Body"])}


def _payload():
    return {
        "task_id": "5aaf3770-9e70-4c3b-95e5-d0e23261fe0f",
        "metadata": {"attempt_id": "attempt-1"},
        "request": {
            "analysis_run_id": RUN_ID,
            "mission_id": "3c62af7c-f242-4f0b-9c28-d9334de98ed2",
            "flight_id": FLIGHT_ID,
            "profile": "search_rescue",
            "algorithms": ["MRMap"],
            "sources": [
                {
                    "media_id": SOURCE_ID,
                    "sensor_type": "rgb",
                    "bucket": "mission-media",
                    "object_key": "original/source.jpg",
                    "checksum_sha256": "a" * 64,
                    "projection_footprint": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [4.0, 52.0],
                                [4.1, 52.0],
                                [4.1, 52.1],
                                [4.0, 52.1],
                                [4.0, 52.0],
                            ]
                        ],
                    },
                    "metadata": {"image_width": 100, "image_height": 100},
                }
            ],
            "persistence": {
                "mode": "parquet",
                "contract_version": 2,
                "artifact_schema_version": 1,
                "bucket": "processed",
                "canonical_object_key": "mission/flight/analysis/search-rescue/result.parquet",
                "attempt_object_key": "mission/flight/analysis/search-rescue/_attempts/a/result.parquet",
                "manifest_object_key": "mission/analysis/search-rescue/manifest.json",
                "content_type": "application/vnd.apache.parquet",
                "immutable": True,
            },
        },
    }


def _observation(score=87.5):
    return {
        "source_media_id": SOURCE_ID,
        "source_checksum": "a" * 64,
        "algorithm": "MRMap",
        "algorithm_options": {
            "segments": 16,
            "threshold": 150,
            "window": 30,
            "colorspace": "LAB",
        },
        "detection_class": "adiat_detection",
        "source_pixel_polygon": [[10, 20], [30, 20], [30, 40], [10, 40]],
        "source_pixel_bbox": [10, 20, 20, 20],
        "source_center_pixel": [20, 30],
        "source_image_width": 100,
        "source_image_height": 100,
        "score": score,
        "properties": {
            "area": 400,
            "radius": 10,
            "raw_score": 0.42,
            "score_type": "confidence",
            "score_method": "detector",
        },
    }


def _payload_with_legacy_xml():
    payload = deepcopy(_payload())
    payload["request"]["execution_plan"] = {
        "entries": [
            {
                "algorithm": "MRMap",
                "sensor_type": "rgb",
                "options": {"threshold": 150, "segments": 16},
            }
        ]
    }
    payload["request"]["persistence"]["legacy_xml"] = {
        "enabled": True,
        "canonical_object_key": "mission/flight/analysis/search-rescue/ADIAT_Data.xml",
        "attempt_object_key": "mission/flight/analysis/search-rescue/_attempts/a/ADIAT_Data.xml",
        "content_type": "application/xml",
        "immutable": True,
    }
    return payload


def test_publishes_deterministic_queryable_parquet_with_projected_geometry(tmp_path):
    client = MemoryS3()
    first = publish_observation_artifact(
        _payload(), [_observation()], work_dir=tmp_path, s3_client=client
    )
    second = publish_observation_artifact(
        _payload(), [_observation()], work_dir=tmp_path, s3_client=client
    )

    artifact = first["artifacts"][0]
    assert first == second
    assert len(client.put_calls) == 2
    assert {call["IfNoneMatch"] for call in client.put_calls} == {"*"}
    assert artifact["row_count"] == 1
    assert artifact["minimum_confidence"] == 87.5
    assert artifact["maximum_confidence"] == 87.5
    canonical = client.objects[
        ("processed", _payload()["request"]["persistence"]["canonical_object_key"])
    ]
    assert (
        hashlib.sha256(canonical["Body"]).hexdigest() == artifact["artifact_checksum"]
    )
    table = pq.read_table(io.BytesIO(canonical["Body"]))
    row = table.to_pylist()[0]
    assert row["source_pixel_polygon_json"] == "[[10,20],[30,20],[30,40],[10,40]]"
    map_geometry = json.loads(row["map_geometry_json"])
    assert map_geometry["type"] == "MultiPolygon"
    assert map_geometry["coordinates"] == [
        [
            [
                [4.01010101010101, 52.02020202020202],
                [4.03030303030303, 52.02020202020202],
                [4.03030303030303, 52.04040404040404],
                [4.01010101010101, 52.04040404040404],
                [4.01010101010101, 52.02020202020202],
            ]
        ]
    ]
    assert row["confidence"] == 87.5
    assert row["raw_score"] == 0.42
    assert json.loads(row["algorithm_options_json"]) == {
        "colorspace": "LAB",
        "segments": 16,
        "threshold": 150,
        "window": 30,
    }


def test_normalizes_supplied_polygon_to_one_part_multipolygon(tmp_path):
    client = MemoryS3()
    observation = _observation()
    coordinates = [[[4.0, 52.0], [4.1, 52.0], [4.1, 52.1], [4.0, 52.0]]]
    observation["map_geometry"] = {
        "type": "Polygon",
        "coordinates": coordinates,
    }

    publish_observation_artifact(
        _payload(), [observation], work_dir=tmp_path, s3_client=client
    )

    canonical = client.objects[
        ("processed", _payload()["request"]["persistence"]["canonical_object_key"])
    ]
    row = pq.read_table(io.BytesIO(canonical["Body"])).to_pylist()[0]
    assert json.loads(row["map_geometry_json"]) == {
        "type": "MultiPolygon",
        "coordinates": [coordinates],
    }


def test_preserves_supplied_multipolygon_geometry(tmp_path):
    client = MemoryS3()
    observation = _observation()
    geometry = {
        "type": "MultiPolygon",
        "coordinates": [[[[4.0, 52.0], [4.1, 52.0], [4.1, 52.1], [4.0, 52.0]]]],
    }
    observation["map_geometry"] = geometry

    publish_observation_artifact(
        _payload(), [observation], work_dir=tmp_path, s3_client=client
    )

    canonical = client.objects[
        ("processed", _payload()["request"]["persistence"]["canonical_object_key"])
    ]
    row = pq.read_table(io.BytesIO(canonical["Body"])).to_pylist()[0]
    assert json.loads(row["map_geometry_json"]) == geometry


def test_publishes_thermal_component_statistics(tmp_path):
    client = MemoryS3()
    payload = _payload()
    payload["request"]["algorithms"] = ["ThermalAnomaly"]
    observation = _observation()
    observation["algorithm"] = "ThermalAnomaly"
    observation["properties"].update(
        {"minimum_c": 31.0, "maximum_c": 42.0, "mean_c": 36.0}
    )

    publish_observation_artifact(
        payload, [observation], work_dir=tmp_path, s3_client=client
    )

    canonical = client.objects[
        ("processed", payload["request"]["persistence"]["canonical_object_key"])
    ]
    row = pq.read_table(io.BytesIO(canonical["Body"])).to_pylist()[0]
    assert row["thermal_minimum_c"] == 31.0
    assert row["thermal_maximum_c"] == 42.0
    assert row["thermal_mean_c"] == 36.0


def test_publishes_valid_zero_row_parquet(tmp_path):
    client = MemoryS3()
    result = publish_observation_artifact(
        _payload(), [], work_dir=tmp_path, s3_client=client
    )

    artifact = result["artifacts"][0]
    assert artifact["row_count"] == 0
    assert artifact["minimum_confidence"] is None
    payload = client.objects[
        ("processed", _payload()["request"]["persistence"]["canonical_object_key"])
    ]["Body"]
    assert pq.read_table(io.BytesIO(payload)).num_rows == 0


def test_rows_persist_effective_runtime_provider_and_model_provenance(tmp_path):
    client = MemoryS3()
    observation = _observation()
    observation["algorithm_version"] = "1"
    observation["runtime_provenance"] = {
        "effective_options": observation["algorithm_options"],
        "adapter_version": "0.2.1",
        "service_version": "1",
        "ai_model_filename": "ai_person_model_V2_640.onnx",
        "ai_model_sha256": "b" * 64,
        "actual_provider": "CPUExecutionProvider",
    }

    result = publish_observation_artifact(
        _payload(), [observation], work_dir=tmp_path, s3_client=client
    )

    canonical = client.objects[
        ("processed", _payload()["request"]["persistence"]["canonical_object_key"])
    ]
    row = pq.read_table(io.BytesIO(canonical["Body"])).to_pylist()[0]
    assert row["adapter_version"] == "0.2.1"
    assert row["service_version"] == "1"
    assert row["ai_model_filename"] == "ai_person_model_V2_640.onnx"
    assert row["ai_model_sha256"] == "b" * 64
    assert row["actual_provider"] == "CPUExecutionProvider"
    assert result["runtime_provenance"] == [observation["runtime_provenance"]]
    assert result["artifacts"][0]["runtime_provenance"] == [
        observation["runtime_provenance"]
    ]


def test_zero_row_artifact_manifest_retains_runtime_provenance(tmp_path):
    client = MemoryS3()
    path = tmp_path / "zero.parquet"
    writer = ObservationArtifactWriter(_payload(), path)
    provenance = {
        "effective_options": {
            "person_detector_confidence": 50.0,
            "cpu_only": True,
        },
        "adapter_version": "0.2.1",
        "service_version": "1",
        "ai_model_filename": "ai_person_model_V2_640.onnx",
        "ai_model_sha256": "c" * 64,
        "actual_provider": "CPUExecutionProvider",
    }
    writer.record_runtime_provenance(provenance)

    result = publish_prepared_observation_artifact(
        _payload(), writer.close(), s3_client=client
    )

    assert result["observation_count"] == 0
    assert result["runtime_provenance"] == [provenance]
    assert result["artifacts"][0]["runtime_provenance"] == [provenance]
    parquet = pq.ParquetFile(path)
    assert parquet.schema_arrow.metadata[b"chris.adapter_version"] == b"0.2.1"
    assert (
        parquet.schema_arrow.metadata[b"chris.service_version"]
        == b"chris-adiat-gpl-worker-0.2.1"
    )


def test_rejects_conflicting_immutable_retry(tmp_path):
    client = MemoryS3()
    publish_observation_artifact(
        _payload(), [_observation(10)], work_dir=tmp_path, s3_client=client
    )
    attempt_key = _payload()["request"]["persistence"]["attempt_object_key"]
    original_attempt = client.objects[("processed", attempt_key)]["Body"]

    with pytest.raises(ArtifactPublicationError, match="different checksum"):
        publish_observation_artifact(
            _payload(), [_observation(90)], work_dir=tmp_path, s3_client=client
        )

    assert client.objects[("processed", attempt_key)]["Body"] == original_attempt
    assert len(client.put_calls) == 2


def test_transient_canonical_failure_retains_immutable_attempt_evidence(tmp_path):
    payload = _payload()

    class CanonicalFailureS3(MemoryS3):
        def put_object(self, **kwargs):
            if (
                kwargs["Key"]
                == payload["request"]["persistence"]["canonical_object_key"]
            ):
                raise ClientError(
                    {
                        "Error": {"Code": "ServiceUnavailable"},
                        "ResponseMetadata": {"HTTPStatusCode": 503},
                    },
                    "PutObject",
                )
            return super().put_object(**kwargs)

    client = CanonicalFailureS3()
    attempt_key = payload["request"]["persistence"]["attempt_object_key"]
    canonical_key = payload["request"]["persistence"]["canonical_object_key"]

    with pytest.raises(TransientArtifactPublicationError) as raised:
        publish_observation_artifact(
            payload, [_observation()], work_dir=tmp_path, s3_client=client
        )

    diagnostics = raised.value.diagnostics()
    assert diagnostics["retryable"] is True
    assert diagnostics["failure_kind"] == "transient"
    assert diagnostics["attempt_uri"] == f"s3://processed/{attempt_key}"
    assert ("processed", attempt_key) in client.objects
    assert ("processed", canonical_key) not in client.objects


def test_incremental_writer_uses_bounded_deterministic_row_groups(tmp_path):
    path = tmp_path / "incremental.parquet"
    writer = ObservationArtifactWriter(_payload(), path)

    for start in range(0, PARQUET_ROW_GROUP_SIZE * 2 + 7, 37):
        writer.write_observations(
            _observation(float(index))
            for index in range(
                start,
                min(start + 37, PARQUET_ROW_GROUP_SIZE * 2 + 7),
            )
        )
    prepared = writer.close()

    parquet = pq.ParquetFile(path)
    assert prepared["row_count"] == PARQUET_ROW_GROUP_SIZE * 2 + 7
    assert prepared["minimum_confidence"] == 0.0
    assert prepared["maximum_confidence"] == float(PARQUET_ROW_GROUP_SIZE * 2 + 6)
    assert parquet.num_row_groups == 3
    assert [
        parquet.metadata.row_group(index).num_rows
        for index in range(parquet.num_row_groups)
    ] == [PARQUET_ROW_GROUP_SIZE, PARQUET_ROW_GROUP_SIZE, 7]


def test_optional_legacy_xml_is_streamed_from_same_rows_without_changing_parquet(
    tmp_path,
):
    baseline_client = MemoryS3()
    baseline = publish_observation_artifact(
        _payload(),
        [_observation()],
        work_dir=tmp_path / "baseline",
        s3_client=baseline_client,
    )
    legacy_client = MemoryS3()
    payload = _payload_with_legacy_xml()
    first = publish_observation_artifact(
        payload,
        [_observation()],
        work_dir=tmp_path / "legacy",
        s3_client=legacy_client,
    )
    second = publish_observation_artifact(
        payload,
        [_observation()],
        work_dir=tmp_path / "legacy-retry",
        s3_client=legacy_client,
    )

    parquet_key = (
        "processed",
        payload["request"]["persistence"]["canonical_object_key"],
    )
    xml_key = (
        "processed",
        payload["request"]["persistence"]["legacy_xml"]["canonical_object_key"],
    )
    assert first == second
    assert len(legacy_client.put_calls) == 4
    assert {call["IfNoneMatch"] for call in legacy_client.put_calls} == {"*"}
    assert "legacy_xml" not in baseline
    assert (
        baseline_client.objects[parquet_key]["Body"]
        == legacy_client.objects[parquet_key]["Body"]
    )
    assert first["legacy_xml"]["row_count"] == 1
    assert first["legacy_xml"]["content_type"] == "application/xml"
    root = ET.fromstring(legacy_client.objects[xml_key]["Body"])
    settings = root.find("settings")
    image = root.find("images/image")
    aoi = root.find("images/image/areas_of_interest")
    assert settings is not None
    assert settings.get("algorithm") == "MRMap"
    assert settings.get("thermal") == "False"
    assert {
        option.get("name"): option.get("value")
        for option in settings.findall("options/option")
    } == {
        "colorspace": "LAB",
        "segments": "16",
        "threshold": "150",
        "window": "30",
    }
    assert image is not None
    assert image.get("path") == "original/source.jpg"
    assert image.get("source_bucket") == "mission-media"
    assert aoi is not None
    assert aoi.get("center") == "(20, 30)"
    assert aoi.get("radius") == "10"
    assert aoi.get("area") == "400"
    assert aoi.get("confidence") == "87.5"
    assert aoi.get("contour") == "[[10, 20], [30, 20], [30, 40], [10, 40]]"


def test_optional_legacy_xml_remains_valid_for_zero_detections(tmp_path):
    client = MemoryS3()
    payload = _payload_with_legacy_xml()

    result = publish_observation_artifact(
        payload,
        [],
        work_dir=tmp_path,
        s3_client=client,
    )

    xml_key = (
        "processed",
        payload["request"]["persistence"]["legacy_xml"]["canonical_object_key"],
    )
    root = ET.fromstring(client.objects[xml_key]["Body"])
    assert result["legacy_xml"]["row_count"] == 0
    assert root.find("images/image") is not None
    assert root.findall("images/image/areas_of_interest") == []


def test_existing_parquet_can_be_converted_in_record_batches(tmp_path):
    parquet_path = tmp_path / "observations.parquet"
    writer = ObservationArtifactWriter(_payload(), parquet_path)
    writer.write_observations(_observation(float(index)) for index in range(13))
    writer.close()
    xml_path = tmp_path / "ADIAT_Data.xml"

    prepared = write_legacy_xml_from_parquet(
        _payload(),
        parquet_path,
        xml_path,
        batch_size=5,
    )

    root = ET.parse(xml_path).getroot()
    assert prepared["row_count"] == 13
    assert len(root.findall("images/image/areas_of_interest")) == 13
