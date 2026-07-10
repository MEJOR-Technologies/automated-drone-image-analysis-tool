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
        ("sensor_type", "thermal", "RGB"),
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
    payload["request"]["algorithms"] = ["MRMap", "ThermalRange"]

    with pytest.raises(PayloadValidationError, match="ThermalRange"):
        validate_payload(payload)


def test_validate_payload_accepts_only_supported_algorithms():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap", "RXAnomaly"]

    assert validate_payload(payload) is payload


def test_validate_payload_rejects_duplicate_algorithms():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap", "MRMap"]

    with pytest.raises(PayloadValidationError, match="duplicates"):
        validate_payload(payload)


def test_validate_payload_rejects_oversized_algorithm_list():
    payload = valid_payload()
    payload["request"]["algorithms"] = ["MRMap"] * 17

    with pytest.raises(PayloadValidationError, match="at most 2"):
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
