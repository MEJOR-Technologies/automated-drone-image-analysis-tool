import json
import xml.etree.ElementTree as ET
from copy import deepcopy

from core.services.XmlService import XmlService

from chris_adiat_adapter.artifact_parity import (
    compare_native_xml_to_parquet,
    native_xml_field_accounting,
)
from chris_adiat_adapter.parquet_artifacts import ObservationArtifactWriter

from app.tests.chris_adiat_adapter.test_parquet_artifacts import (
    _observation,
    _payload,
    _payload_with_legacy_xml,
)


SOURCE_COUNT = 28


def _payload_for_source(index, *, legacy_xml=False):
    payload = deepcopy(_payload_with_legacy_xml() if legacy_xml else _payload())
    source = payload["request"]["sources"][0]
    source["media_id"] = f"source-media-{index:02d}"
    source["object_key"] = f"deterministic/source-{index:02d}.jpg"
    source["checksum_sha256"] = f"{index + 1:064x}"
    payload["request"]["algorithm_options"] = {
        "segments": 16,
        "threshold": 150,
        "window": 30,
        "colorspace": "LAB",
    }
    return payload


def _observation_for_source(payload, index):
    observation = _observation(60.0 + index)
    observation["source_media_id"] = payload["request"]["sources"][0]["media_id"]
    observation["source_checksum"] = payload["request"]["sources"][0]["checksum_sha256"]
    left = 10 + index
    top = 20 + index
    observation["source_pixel_polygon"] = [
        [left, top],
        [left + 20, top],
        [left + 20, top + 20],
        [left, top + 20],
    ]
    observation["source_pixel_bbox"] = [left, top, 20, 20]
    observation["source_center_pixel"] = [left + 10, top + 10]
    observation["properties"] = {
        "area": 400,
        "radius": 10,
        "raw_score": round(0.1 + index / 100, 2),
        "score_type": "confidence",
        "score_method": "detector",
    }
    return observation


def _native_xml_service():
    # Bypass LoggerService setup: this test exercises the native serializer,
    # while remaining hermetic and avoiding writes under the user's home.
    service = XmlService.__new__(XmlService)
    service.xml_path = None
    service.logger = None
    service.xml = ET.ElementTree(ET.Element("data"))
    return service


def _write_native_xml(path, payloads, observations):
    service = _native_xml_service()
    request = payloads[0]["request"]
    service.add_settings_to_xml(
        algorithm=request["algorithms"][0],
        options=request["algorithm_options"],
    )
    for payload, observation in zip(payloads, observations):
        source = payload["request"]["sources"][0]
        properties = observation["properties"]
        service.add_image_to_xml(
            {
                "path": source["object_key"],
                "aois": [
                    {
                        "center": tuple(observation["source_center_pixel"]),
                        "radius": properties["radius"],
                        "area": properties["area"],
                        "contour": observation["source_pixel_polygon"],
                        "confidence": observation["score"],
                        "raw_score": properties["raw_score"],
                        "score_type": properties["score_type"],
                        "score_method": properties["score_method"],
                    }
                ],
            }
        )
    service.save_xml_file(path)


def test_native_xml_matches_adapter_parquet_for_28_deterministic_sources(tmp_path):
    payloads = [_payload_for_source(index) for index in range(SOURCE_COUNT)]
    observations = [
        _observation_for_source(payload, index)
        for index, payload in enumerate(payloads)
    ]
    artifacts = []
    for index, (payload, observation) in enumerate(zip(payloads, observations)):
        path = tmp_path / "parquet" / f"source-{index:02d}.parquet"
        writer = ObservationArtifactWriter(payload, path)
        writer.write_observations([observation])
        writer.close()
        artifacts.append((payload, path))

    xml_path = tmp_path / "ADIAT_Data.xml"
    _write_native_xml(xml_path, payloads, observations)

    report = compare_native_xml_to_parquet(xml_path, artifacts)

    assert report["matches"] is True
    assert report["source_count"] == SOURCE_COUNT
    assert report["expected_observation_count"] == SOURCE_COUNT
    assert report["actual_observation_count"] == SOURCE_COUNT
    assert report["mismatches"] == []
    # Nightly tooling must be able to retain this exact report as JSON evidence.
    assert json.loads(json.dumps(report)) == report


def test_xml_on_and_off_produce_byte_identical_parquet_for_all_28_sources(tmp_path):
    for index in range(SOURCE_COUNT):
        baseline_payload = _payload_for_source(index)
        legacy_payload = _payload_for_source(index, legacy_xml=True)
        observation = _observation_for_source(baseline_payload, index)

        baseline_path = tmp_path / "baseline" / f"source-{index:02d}.parquet"
        baseline_writer = ObservationArtifactWriter(baseline_payload, baseline_path)
        baseline_writer.write_observations([observation])
        baseline_prepared = baseline_writer.close()

        legacy_path = tmp_path / "legacy" / f"source-{index:02d}.parquet"
        legacy_writer = ObservationArtifactWriter(legacy_payload, legacy_path)
        legacy_writer.write_observations([observation])
        legacy_prepared = legacy_writer.close()

        assert baseline_path.read_bytes() == legacy_path.read_bytes()
        assert baseline_prepared["row_count"] == legacy_prepared["row_count"] == 1
        assert legacy_prepared["legacy_xml"]["row_count"] == 1


def test_native_xml_parity_reports_exact_source_mismatch(tmp_path):
    payload = _payload_for_source(0)
    observation = _observation_for_source(payload, 0)
    parquet_path = tmp_path / "source.parquet"
    writer = ObservationArtifactWriter(payload, parquet_path)
    writer.write_observations([observation])
    writer.close()
    xml_path = tmp_path / "ADIAT_Data.xml"
    _write_native_xml(xml_path, [payload], [observation])
    tree = ET.parse(xml_path)
    tree.find("images/image/areas_of_interest").set("confidence", "1.0")
    tree.write(xml_path)

    report = compare_native_xml_to_parquet(xml_path, [(payload, parquet_path)])

    assert report["matches"] is False
    assert report["mismatches"][0]["path"] == ("images['deterministic/source-00.jpg']")


def test_native_xml_field_accounting_keeps_lossy_fields_explicit():
    accounting = native_xml_field_accounting()

    assert accounting["partial"]["properties_json"].startswith(
        "native XML retains area"
    )
    assert accounting["unsupported"]["ai_model_sha256"] == (
        "desktop XML has no AI model checksum"
    )
    assert "source_pixel_polygon_json" in accounting["comparable"]
