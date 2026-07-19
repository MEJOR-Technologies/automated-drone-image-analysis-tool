import math
import re


class PayloadValidationError(ValueError):
    """Raised when a CHRIS ADIAT task payload is not executable."""


SUPPORTED_ALGORITHMS = frozenset(
    {
        "AIPersonDetector",
        "MRMap",
        "RXAnomaly",
        "ThermalResidualAnomaly",
        "ThermalAnomaly",
        "ThermalRange",
        "HSVColorRange",
    }
)
SUPPORTED_PROFILE = "search_rescue"
MAX_SOURCES_PER_BATCH = 100
MAX_ALGORITHMS_PER_REQUEST = len(SUPPORTED_ALGORITHMS)
MAX_TASK_ID_LENGTH = 128
MAX_MEDIA_ID_LENGTH = 256
MAX_BUCKET_LENGTH = 63
MAX_OBJECT_KEY_LENGTH = 1024
MAX_CONTENT_TYPE_LENGTH = 128
SHA256_PATTERN = re.compile(r"^(?:sha256:)?[0-9a-fA-F]{64}$")
SUPPORTED_CONTENT_TYPES = frozenset(
    {
        "image/jpeg",
        "image/png",
        "image/tiff",
        "image/webp",
        "application/octet-stream",
    }
)
FORBIDDEN_SOURCE_SECRET_FIELDS = frozenset(
    {
        "access_key",
        "secret_key",
        "session_token",
        "aws_access_key_id",
        "aws_secret_access_key",
        "aws_session_token",
    }
)


def validate_payload(payload):
    if not isinstance(payload, dict):
        raise PayloadValidationError("payload must be an object")

    _validate_identifier(payload.get("task_id"), "task_id", MAX_TASK_ID_LENGTH)

    request = payload.get("request")
    if not isinstance(request, dict):
        raise PayloadValidationError("request is required")

    if request.get("profile") != SUPPORTED_PROFILE:
        raise PayloadValidationError(f"request.profile must be {SUPPORTED_PROFILE}")

    algorithms = request.get("algorithms")
    if algorithms is not None:
        if not isinstance(algorithms, list):
            raise PayloadValidationError("request.algorithms must be a list")
        if len(algorithms) > MAX_ALGORITHMS_PER_REQUEST:
            raise PayloadValidationError(
                f"request.algorithms must contain at most {MAX_ALGORITHMS_PER_REQUEST} algorithms"
            )
        if any(not isinstance(name, str) for name in algorithms):
            raise PayloadValidationError("request.algorithms must contain names")
        if len(set(algorithms)) != len(algorithms):
            raise PayloadValidationError(
                "request.algorithms must not contain duplicates"
            )
        unsupported = sorted(
            {name for name in algorithms if name not in SUPPORTED_ALGORITHMS}
        )
        if unsupported:
            raise PayloadValidationError(
                f"request.algorithms contains unsupported algorithms: {', '.join(unsupported)}"
            )

    sources = request.get("sources")
    if not isinstance(sources, list) or len(sources) == 0:
        raise PayloadValidationError("request.sources must contain at least one source")
    if len(sources) > MAX_SOURCES_PER_BATCH:
        raise PayloadValidationError(
            f"request.sources must contain at most {MAX_SOURCES_PER_BATCH} sources"
        )

    for index, source in enumerate(sources):
        if not isinstance(source, dict):
            raise PayloadValidationError(f"request.sources[{index}] must be an object")
        _validate_identifier(
            source.get("media_id"),
            f"request.sources[{index}].media_id",
            MAX_MEDIA_ID_LENGTH,
        )
        if not SHA256_PATTERN.fullmatch(str(source.get("checksum_sha256") or "")):
            raise PayloadValidationError(
                f"request.sources[{index}].checksum_sha256 must be a SHA-256 digest"
            )
        secret_fields = sorted(FORBIDDEN_SOURCE_SECRET_FIELDS.intersection(source))
        if secret_fields:
            raise PayloadValidationError(
                f"request.sources[{index}] must not contain storage credentials"
            )

        sensor_type = str(source.get("sensor_type") or "").lower()
        if sensor_type not in {"rgb", "thermal"}:
            raise PayloadValidationError(
                f"request.sources[{index}] must be an RGB or thermal source"
            )
        if str(source.get("media_type") or "").lower() != "raw":
            raise PayloadValidationError(
                f"request.sources[{index}] must reference original raw media"
            )
        content_type = str(source.get("content_type") or "").lower()
        if content_type not in SUPPORTED_CONTENT_TYPES:
            raise PayloadValidationError(
                f"request.sources[{index}] must be a supported photo source"
            )
        if sensor_type == "thermal" and content_type != "application/octet-stream":
            raise PayloadValidationError(
                f"request.sources[{index}] must use application/octet-stream for thermal raw media"
            )
        if sensor_type == "rgb" and content_type == "application/octet-stream":
            raise PayloadValidationError(
                f"request.sources[{index}] must use an image content type for RGB media"
            )
        _validate_projection_footprint(source.get("projection_footprint"), index)

        if not source.get("bucket") and not source.get("object_key"):
            raise PayloadValidationError(
                f"request.sources[{index}] needs bucket/object_key"
            )
        _validate_identifier(
            source.get("bucket"), f"request.sources[{index}].bucket", MAX_BUCKET_LENGTH
        )
        _validate_identifier(
            source.get("object_key"),
            f"request.sources[{index}].object_key",
            MAX_OBJECT_KEY_LENGTH,
        )

    _validate_persistence(payload, request, sources, algorithms)

    return payload


def _validate_persistence(payload, request, sources, algorithms):
    persistence = request.get("persistence")
    if persistence is None:
        return
    if not isinstance(persistence, dict):
        raise PayloadValidationError("request.persistence must be an object")
    mode = persistence.get("mode")
    if mode == "postgres":
        return
    if mode != "parquet":
        raise PayloadValidationError("request.persistence.mode must be postgres or parquet")
    if len(sources) != 1 or not isinstance(algorithms, list) or len(algorithms) != 1:
        raise PayloadValidationError(
            "parquet persistence requires exactly one source and one algorithm"
        )
    for field in ("contract_version", "artifact_schema_version"):
        if not isinstance(persistence.get(field), int) or persistence[field] < 1:
            raise PayloadValidationError(f"request.persistence.{field} must be positive")
    _validate_identifier(
        persistence.get("bucket"), "request.persistence.bucket", MAX_BUCKET_LENGTH
    )
    for field in (
        "canonical_object_key",
        "attempt_object_key",
        "manifest_object_key",
    ):
        _validate_identifier(
            persistence.get(field),
            f"request.persistence.{field}",
            MAX_OBJECT_KEY_LENGTH,
        )
    _validate_identifier(
        persistence.get("content_type"),
        "request.persistence.content_type",
        MAX_CONTENT_TYPE_LENGTH,
    )
    if persistence.get("content_type") != "application/vnd.apache.parquet":
        raise PayloadValidationError(
            "request.persistence.content_type must be application/vnd.apache.parquet"
        )
    if persistence.get("immutable") is not True:
        raise PayloadValidationError("request.persistence.immutable must be true")
    _validate_legacy_xml_export(persistence)
    metadata = payload.get("metadata")
    if not isinstance(metadata, dict):
        raise PayloadValidationError("metadata is required for parquet persistence")
    _validate_identifier(
        metadata.get("attempt_id"), "metadata.attempt_id", MAX_TASK_ID_LENGTH
    )


def _validate_legacy_xml_export(persistence):
    config = persistence.get("legacy_xml")
    if config is None:
        return
    if not isinstance(config, dict):
        raise PayloadValidationError(
            "request.persistence.legacy_xml must be an object"
        )
    enabled = config.get("enabled")
    if not isinstance(enabled, bool):
        raise PayloadValidationError(
            "request.persistence.legacy_xml.enabled must be a boolean"
        )
    if not enabled:
        return
    for field in ("canonical_object_key", "attempt_object_key"):
        _validate_identifier(
            config.get(field),
            f"request.persistence.legacy_xml.{field}",
            MAX_OBJECT_KEY_LENGTH,
        )
    content_type = config.get("content_type", "application/xml")
    if content_type != "application/xml":
        raise PayloadValidationError(
            "request.persistence.legacy_xml.content_type must be application/xml"
        )
    if config.get("immutable") is not True:
        raise PayloadValidationError(
            "request.persistence.legacy_xml.immutable must be true"
        )


def _validate_identifier(value, field, max_length):
    if not isinstance(value, str) or not value:
        raise PayloadValidationError(f"{field} is required")
    if len(value) > max_length:
        raise PayloadValidationError(f"{field} must be at most {max_length} characters")
    if any(ord(character) < 32 or ord(character) == 127 for character in value):
        raise PayloadValidationError(f"{field} contains invalid control characters")


def _validate_projection_footprint(value, source_index):
    if not isinstance(value, dict) or value.get("type") != "Polygon":
        raise PayloadValidationError(
            f"request.sources[{source_index}].projection_footprint must be a Polygon"
        )
    coordinates = value.get("coordinates")
    if not isinstance(coordinates, list) or len(coordinates) != 1:
        raise PayloadValidationError(
            f"request.sources[{source_index}].projection_footprint must have one outer ring"
        )
    ring = coordinates[0]
    if not isinstance(ring, list) or len(ring) != 5 or ring[0] != ring[-1]:
        raise PayloadValidationError(
            f"request.sources[{source_index}].projection_footprint must have four closed corners"
        )
    corners = []
    for point in ring[:-1]:
        if not isinstance(point, list) or len(point) != 2:
            raise PayloadValidationError(
                f"request.sources[{source_index}].projection_footprint has an invalid corner"
            )
        try:
            longitude, latitude = float(point[0]), float(point[1])
        except (TypeError, ValueError):
            raise PayloadValidationError(
                f"request.sources[{source_index}].projection_footprint has an invalid corner"
            ) from None
        if not (
            math.isfinite(longitude)
            and math.isfinite(latitude)
            and -180 <= longitude <= 180
            and -90 <= latitude <= 90
        ):
            raise PayloadValidationError(
                f"request.sources[{source_index}].projection_footprint is outside WGS84"
            )
        corners.append((longitude, latitude))
    if len(set(corners)) != 4:
        raise PayloadValidationError(
            f"request.sources[{source_index}].projection_footprint corners must be unique"
        )
    area = sum(
        x1 * y2 - x2 * y1
        for (x1, y1), (x2, y2) in zip(corners, corners[1:] + corners[:1])
    )
    if math.isclose(area, 0.0, abs_tol=1e-12):
        raise PayloadValidationError(
            f"request.sources[{source_index}].projection_footprint must have nonzero area"
        )
    for first in range(4):
        for second in range(first + 1, 4):
            if second in {first, (first + 1) % 4} or first == (second + 1) % 4:
                continue
            if _segments_intersect(
                corners[first],
                corners[(first + 1) % 4],
                corners[second],
                corners[(second + 1) % 4],
            ):
                raise PayloadValidationError(
                    f"request.sources[{source_index}].projection_footprint must be simple"
                )


def _segments_intersect(first_start, first_end, second_start, second_end):
    def orientation(a, b, c):
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])

    def on_segment(a, b, point):
        return min(a[0], b[0]) <= point[0] <= max(a[0], b[0]) and min(
            a[1], b[1]
        ) <= point[1] <= max(a[1], b[1])

    values = (
        orientation(first_start, first_end, second_start),
        orientation(first_start, first_end, second_end),
        orientation(second_start, second_end, first_start),
        orientation(second_start, second_end, first_end),
    )
    if values[0] == 0 and on_segment(first_start, first_end, second_start):
        return True
    if values[1] == 0 and on_segment(first_start, first_end, second_end):
        return True
    if values[2] == 0 and on_segment(second_start, second_end, first_start):
        return True
    if values[3] == 0 and on_segment(second_start, second_end, first_end):
        return True
    return (values[0] > 0) != (values[1] > 0) and (values[2] > 0) != (values[3] > 0)
