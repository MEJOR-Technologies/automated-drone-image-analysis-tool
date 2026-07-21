import pytest

from chris_adiat_adapter.schemas import PayloadValidationError, validate_payload


def valid_payload():
    return {
        "task_id": "task-1",
        "request": {
            "profile": "search_rescue",
            "sources": [
                {
                    "media_id": "media-1",
                    "bucket": "mission-media",
                    "object_key": "original/source.jpg",
                    "sensor_type": "rgb",
                    "media_type": "raw",
                    "content_type": "image/jpeg",
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
                }
            ],
        },
    }


@pytest.mark.parametrize(
    ("field", "value", "message"),
    [
        ("media_type", "projected", "original raw"),
        ("content_type", "video/mp4", "photo"),
    ],
)
def test_validate_payload_rejects_non_projected_rgb_photos(field, value, message):
    payload = valid_payload()
    payload["request"]["sources"][0][field] = value

    with pytest.raises(PayloadValidationError, match=message):
        validate_payload(payload)


def test_validate_payload_rejects_unsupported_algorithms():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap", "UnknownDetector"]

    with pytest.raises(PayloadValidationError, match="UnknownDetector"):
        validate_payload(payload)


def test_validate_payload_accepts_thermal_raw_source():
    payload = valid_payload()
    source = payload["request"]["sources"][0]
    source.update(
        {
            "object_key": "original/source.raw",
            "sensor_type": "thermal",
            "content_type": "application/octet-stream",
        }
    )
    payload["request"]["algorithms"] = ["ThermalRange"]

    assert validate_payload(payload) is payload


def test_validate_payload_accepts_only_supported_algorithms():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["AIPersonDetector", "MRMap", "RXAnomaly"]

    assert validate_payload(payload) is payload


def test_validate_payload_accepts_single_source_detector_parquet_contract():
    payload = valid_payload()
    payload["metadata"] = {"attempt_id": "attempt-1"}
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

    assert validate_payload(payload) is payload


def test_validate_payload_accepts_optional_legacy_xml_export():
    payload = valid_payload()
    payload["metadata"] = {"attempt_id": "attempt-1"}
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
                "legacy_xml": {
                    "enabled": True,
                    "canonical_object_key": "mission/ADIAT_Data.xml",
                    "attempt_object_key": "mission/_attempts/a/ADIAT_Data.xml",
                    "content_type": "application/xml",
                    "immutable": True,
                },
            },
        }
    )

    assert validate_payload(payload) is payload


@pytest.mark.parametrize(
    ("legacy_xml", "message"),
    [
        ({"enabled": "yes"}, "enabled must be a boolean"),
        (
            {"enabled": True, "immutable": True},
            "canonical_object_key is required",
        ),
        (
            {
                "enabled": True,
                "canonical_object_key": "mission/ADIAT_Data.xml",
                "attempt_object_key": "mission/_attempts/a/ADIAT_Data.xml",
                "content_type": "text/xml",
                "immutable": True,
            },
            "content_type must be application/xml",
        ),
    ],
)
def test_validate_payload_rejects_invalid_legacy_xml_export(legacy_xml, message):
    payload = valid_payload()
    payload["metadata"] = {"attempt_id": "attempt-1"}
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
                "legacy_xml": legacy_xml,
            },
        }
    )

    with pytest.raises(PayloadValidationError, match=message):
        validate_payload(payload)


def test_validate_payload_rejects_multi_detector_parquet_contract():
    payload = valid_payload()
    payload["metadata"] = {"attempt_id": "attempt-1"}
    payload["request"]["persistence"] = {
        "mode": "parquet",
        "contract_version": 2,
        "artifact_schema_version": 1,
        "bucket": "processed",
        "canonical_object_key": "mission/result.parquet",
        "attempt_object_key": "mission/_attempts/a/result.parquet",
        "manifest_object_key": "mission/manifest.json",
        "content_type": "application/vnd.apache.parquet",
        "immutable": True,
    }

    with pytest.raises(
        PayloadValidationError, match="exactly one source and one algorithm"
    ):
        validate_payload(payload)


def test_validate_payload_rejects_duplicate_algorithms():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap", "MRMap"]

    with pytest.raises(PayloadValidationError, match="duplicates"):
        validate_payload(payload)


def test_validate_payload_rejects_oversized_algorithm_list():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap"] * 17

    with pytest.raises(PayloadValidationError, match="at most 7"):
        validate_payload(payload)


@pytest.mark.parametrize(
    "footprint",
    [
        {
            "type": "Polygon",
            "coordinates": [
                [[4.0, 52.0], [4.1, 52.1], [4.0, 52.1], [4.1, 52.0], [4.0, 52.0]]
            ],
        },
        {
            "type": "Polygon",
            "coordinates": [
                [[4.0, 52.0], [4.1, 52.0], [4.2, 52.0], [4.0, 52.0], [4.0, 52.0]]
            ],
        },
        {
            "type": "Polygon",
            "coordinates": [
                [
                    [float("nan"), 52.0],
                    [4.1, 52.0],
                    [4.1, 52.1],
                    [4.0, 52.1],
                    [float("nan"), 52.0],
                ]
            ],
        },
    ],
)
def test_validate_payload_rejects_invalid_projection_footprints(footprint):
    payload = valid_payload()
    payload["request"]["sources"][0]["projection_footprint"] = footprint

    with pytest.raises(PayloadValidationError, match="projection_footprint"):
        validate_payload(payload)


@pytest.mark.parametrize(
    ("field", "value"),
    [
        ("task_id", "x" * 257),
        ("media_id", "x" * 257),
        ("bucket", "x" * 64),
        ("object_key", "x" * 1025),
    ],
)
def test_validate_payload_bounds_identifiers(field, value):
    payload = valid_payload()
    if field == "task_id":
        payload[field] = value
    else:
        payload["request"]["sources"][0][field] = value

    with pytest.raises(PayloadValidationError, match="at most"):
        validate_payload(payload)


def test_validate_payload_rejects_inline_storage_credentials():
    payload = valid_payload()
    payload["request"]["sources"][0]["aws_secret_access_key"] = "do-not-pass-secrets"

    with pytest.raises(PayloadValidationError, match="storage credentials"):
        validate_payload(payload)


def test_validate_payload_requires_projection_footprint():
    payload = valid_payload()
    payload["request"]["sources"][0].pop("projection_footprint")

    with pytest.raises(PayloadValidationError, match="projection_footprint"):
        validate_payload(payload)


def test_validate_payload_rejects_local_and_url_sources():
    payload = valid_payload()
    source = payload["request"]["sources"][0]
    source.pop("bucket")
    source.pop("object_key")
    source["url"] = "https://example.invalid/source.jpg"

    with pytest.raises(PayloadValidationError, match="bucket/object_key"):
        validate_payload(payload)


def test_validate_payload_rejects_legacy_profile():
    payload = valid_payload()
    payload["request"]["profile"] = "broad_scan"

    with pytest.raises(PayloadValidationError, match="search_rescue"):
        validate_payload(payload)


def test_validate_payload_requires_bound_sha256():
    payload = valid_payload()
    payload["request"]["sources"][0].pop("checksum_sha256")

    with pytest.raises(PayloadValidationError, match="checksum_sha256"):
        validate_payload(payload)


def test_validate_payload_caps_batch_source_count():
    payload = valid_payload()
    payload["request"]["sources"] *= 101

    with pytest.raises(PayloadValidationError, match="at most 100"):
        validate_payload(payload)
