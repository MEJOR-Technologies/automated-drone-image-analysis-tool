"""Canonical comparison of desktop ``ADIAT_Data.xml`` and adapter Parquet.

The desktop XML format cannot represent the complete Parquet contract.  Keep
the field accounting below exhaustive so schema additions cannot silently be
treated as parity-tested.
"""

import json
import math
from ast import literal_eval
from pathlib import Path
import xml.etree.ElementTree as ET

import pyarrow.parquet as pq

from chris_adiat_adapter.algorithms import effective_options_for_algorithm
from chris_adiat_adapter.parquet_artifacts import PARQUET_SCHEMA


NATIVE_XML_COMPARABLE_PARQUET_FIELDS = frozenset(
    {
        "algorithm",
        "algorithm_options_json",
        "confidence",
        "raw_score",
        "score_method",
        "score_type",
        "source_center_pixel_json",
        "source_pixel_polygon_json",
        "thermal_mean_c",
    }
)

# These fields have some information represented by native XML, but not enough
# for lossless field equality.
NATIVE_XML_PARTIAL_PARQUET_FIELDS = {
    "properties_json": (
        "native XML retains area, radius, and one temperature value only"
    ),
    "source_pixel_bbox_json": (
        "native XML retains a rounded center and radius, not the original bbox"
    ),
}

NATIVE_XML_UNSUPPORTED_PARQUET_FIELDS = {
    "schema_version": "native XML has no schema-version attribute",
    "observation_id": "native XML has no stable observation identifier",
    "observation_index": "native XML has document order only",
    "analysis_run_id": "native XML has no CHRIS run identity",
    "attempt_id": "native XML has no CHRIS attempt identity",
    "flight_id": "native XML has no CHRIS flight identity",
    "source_media_id": "desktop XML predates CHRIS media identifiers",
    "source_checksum": "desktop XML does not persist source checksums",
    "algorithm_version": "desktop XML does not persist algorithm versions",
    "adapter_version": "desktop XML has no adapter provenance",
    "service_version": "desktop XML has no service provenance",
    "ai_model_filename": "desktop XML has no AI model provenance",
    "ai_model_sha256": "desktop XML has no AI model checksum",
    "actual_provider": "desktop XML has no runtime-provider provenance",
    "detection_class": "desktop XML has no detection-class attribute",
    "source_image_width": "desktop XML does not persist image dimensions",
    "source_image_height": "desktop XML does not persist image dimensions",
    "map_geometry_json": "desktop XML contains source pixels, not map geometry",
    "geometry_quality": "desktop XML has no projection-quality field",
    "thermal_minimum_c": "desktop XML retains one temperature value only",
    "thermal_maximum_c": "desktop XML retains one temperature value only",
}


def native_xml_field_accounting():
    """Return exhaustive, machine-readable Parquet-to-native-XML accounting."""
    comparable = sorted(NATIVE_XML_COMPARABLE_PARQUET_FIELDS)
    partial = dict(sorted(NATIVE_XML_PARTIAL_PARQUET_FIELDS.items()))
    unsupported = dict(sorted(NATIVE_XML_UNSUPPORTED_PARQUET_FIELDS.items()))
    accounted = set(comparable) | set(partial) | set(unsupported)
    schema_fields = set(PARQUET_SCHEMA.names)
    missing = sorted(schema_fields - accounted)
    unknown = sorted(accounted - schema_fields)
    overlap = sorted(
        (set(comparable) & set(partial))
        | (set(comparable) & set(unsupported))
        | (set(partial) & set(unsupported))
    )
    if missing or unknown or overlap:
        raise RuntimeError(
            "native XML field accounting is invalid: "
            f"missing={missing}, unknown={unknown}, overlap={overlap}"
        )
    return {
        "comparable": comparable,
        "partial": partial,
        "unsupported": unsupported,
    }


def compare_native_xml_to_parquet(native_xml, artifacts):
    """Compare one desktop XML document with one Parquet artifact per source.

    ``artifacts`` is an iterable of ``(payload, parquet_path)`` pairs.  The
    report is JSON-serializable and preserves unsupported-field accounting for
    downstream nightly evidence.
    """
    expected = _canonical_parquet_document(artifacts)
    actual = _canonical_native_xml_document(native_xml)
    mismatches = []
    if expected["settings"] != actual["settings"]:
        mismatches.append(
            {
                "path": "settings",
                "expected": expected["settings"],
                "actual": actual["settings"],
            }
        )

    expected_images = {image["path"]: image for image in expected["images"]}
    actual_images = {image["path"]: image for image in actual["images"]}
    for path in sorted(set(expected_images) | set(actual_images)):
        expected_image = expected_images.get(path)
        actual_image = actual_images.get(path)
        if expected_image != actual_image:
            mismatches.append(
                {
                    "path": f"images[{path!r}]",
                    "expected": expected_image,
                    "actual": actual_image,
                }
            )

    expected_rows = sum(
        len(image["areas_of_interest"]) for image in expected_images.values()
    )
    actual_rows = sum(
        len(image["areas_of_interest"]) for image in actual_images.values()
    )
    return {
        "matches": not mismatches,
        "source_count": len(expected_images),
        "expected_observation_count": expected_rows,
        "actual_observation_count": actual_rows,
        "mismatches": mismatches,
        "field_accounting": native_xml_field_accounting(),
    }


def _canonical_parquet_document(artifacts):
    documents = []
    settings = None
    for payload, parquet_path in artifacts:
        request = payload["request"]
        source = request["sources"][0]
        algorithm = request["algorithms"][0]
        current_settings = {
            "algorithm": str(algorithm),
            "options": _normalized_options(
                effective_options_for_algorithm(
                    algorithm,
                    request.get("algorithm_options") or {},
                )
            ),
        }
        if settings is None:
            settings = current_settings
        elif current_settings != settings:
            raise ValueError(
                "native XML comparison requires uniform algorithm settings"
            )
        rows = pq.read_table(parquet_path).to_pylist()
        documents.append(
            {
                "path": _normalized_path(
                    source.get("object_key") or source.get("media_id")
                ),
                "areas_of_interest": [_canonical_parquet_area(row) for row in rows],
            }
        )
    return {
        "settings": settings or {"algorithm": "", "options": {}},
        "images": sorted(documents, key=lambda item: item["path"]),
    }


def _canonical_native_xml_document(source):
    root = _xml_root(source)
    settings = root.find("settings")
    images = []
    for image in root.findall("images/image"):
        images.append(
            {
                "path": _normalized_path(image.get("path") or ""),
                "areas_of_interest": [
                    _canonical_xml_area(area)
                    for area in image.findall("areas_of_interest")
                ],
            }
        )
    return {
        "settings": {
            "algorithm": str(settings.get("algorithm") or "")
            if settings is not None
            else "",
            "options": {
                str(option.get("name")): str(option.get("value") or "")
                for option in (
                    settings.findall("options/option") if settings is not None else []
                )
            },
        },
        "images": sorted(images, key=lambda item: item["path"]),
    }


def _canonical_parquet_area(row):
    properties = _json_object(row.get("properties_json"))
    polygon = _json_list(row.get("source_pixel_polygon_json"))
    bbox = _json_list(row.get("source_pixel_bbox_json"))
    center = _json_list(row.get("source_center_pixel_json"))
    if len(center) < 2:
        center = _bbox_center(bbox)
    radius = _finite(properties.get("radius"))
    if radius is None and len(bbox) >= 4:
        radius = max(float(bbox[2]), float(bbox[3])) / 2.0
    area = _finite(properties.get("area"))
    if area is None:
        area = _polygon_area(polygon)
    temperature = _first_finite(
        properties.get("temperature"), row.get("thermal_mean_c")
    )
    return _drop_none(
        {
            "center": [int(round(float(center[0]))), int(round(float(center[1])))],
            "radius": max(int(round(radius or 0)), 0),
            "area": _normalized_number(area or 0),
            "contour": _normalized_numbers(polygon) if polygon else None,
            "confidence": _finite(row.get("confidence")),
            "score_type": _optional_text(row.get("score_type")),
            "raw_score": _finite(row.get("raw_score")),
            "score_method": _optional_text(row.get("score_method")),
            "temperature": temperature,
        }
    )


def _canonical_xml_area(area):
    return _drop_none(
        {
            "center": _normalized_numbers(_literal(area.get("center"), (0, 0))),
            "radius": max(int(float(area.get("radius") or 0)), 0),
            "area": _normalized_number(float(area.get("area") or 0)),
            "contour": _normalized_numbers(_literal(area.get("contour"), None)),
            "confidence": _finite(area.get("confidence")),
            "score_type": _optional_text(area.get("score_type")),
            "raw_score": _finite(area.get("raw_score")),
            "score_method": _optional_text(area.get("score_method")),
            "temperature": _finite(area.get("temperature")),
        }
    )


def _xml_root(source):
    if isinstance(source, (str, Path)):
        return ET.parse(source).getroot()
    if isinstance(source, bytes):
        return ET.fromstring(source)
    if hasattr(source, "read"):
        return ET.parse(source).getroot()
    raise TypeError("native_xml must be a path, bytes, or readable stream")


def _normalized_options(options):
    return {str(name): str(value) for name, value in sorted((options or {}).items())}


def _normalized_path(value):
    return str(value or "").replace("\\", "/")


def _json_object(value):
    parsed = _json_value(value, {})
    return parsed if isinstance(parsed, dict) else {}


def _json_list(value):
    parsed = _json_value(value, [])
    return parsed if isinstance(parsed, list) else []


def _json_value(value, default):
    if value is None:
        return default
    try:
        return json.loads(value) if isinstance(value, str) else value
    except (TypeError, ValueError):
        return default


def _literal(value, default):
    if not value:
        return default
    try:
        return literal_eval(value)
    except (SyntaxError, ValueError):
        return default


def _bbox_center(bbox):
    if len(bbox) < 4:
        return [0, 0]
    return [float(bbox[0]) + float(bbox[2]) / 2, float(bbox[1]) + float(bbox[3]) / 2]


def _polygon_area(points):
    if len(points) < 3:
        return 0.0
    return abs(
        sum(
            float(first[0]) * float(second[1]) - float(second[0]) * float(first[1])
            for first, second in zip(points, points[1:] + points[:1])
        )
        / 2
    )


def _first_finite(*values):
    for value in values:
        parsed = _finite(value)
        if parsed is not None:
            return parsed
    return None


def _finite(value):
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return None
    return parsed if math.isfinite(parsed) else None


def _normalized_number(value):
    parsed = float(value)
    return int(parsed) if parsed.is_integer() else parsed


def _normalized_numbers(value):
    if isinstance(value, (list, tuple)):
        return [_normalized_numbers(item) for item in value]
    if isinstance(value, (int, float)):
        return _normalized_number(value)
    return value


def _optional_text(value):
    return str(value) if value is not None else None


def _drop_none(value):
    return {key: item for key, item in value.items() if item is not None}
