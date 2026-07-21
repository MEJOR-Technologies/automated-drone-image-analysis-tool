import json
import math
from pathlib import Path
from xml.sax.saxutils import XMLGenerator

import pyarrow.parquet as pq

from chris_adiat_adapter.algorithms import effective_options_for_algorithm


LEGACY_XML_CONTENT_TYPE = "application/xml"


class LegacyXmlArtifactWriter:
    """Stream normalized observation rows into legacy ``ADIAT_Data.xml``."""

    def __init__(self, payload, path):
        self.payload = payload
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._stream = self.path.open("w", encoding="utf-8", newline="\n")
        self._xml = XMLGenerator(
            self._stream,
            encoding="utf-8",
            short_empty_elements=True,
        )
        self._row_count = 0
        self._closed = False
        self._start_document()

    def write_row(self, row):
        if self._closed:
            raise RuntimeError("legacy XML artifact writer is closed")
        self._xml.startElement("areas_of_interest", _aoi_attributes(row))
        self._xml.endElement("areas_of_interest")
        self._row_count += 1

    def close(self):
        if not self._closed:
            self._xml.endElement("image")
            self._xml.endElement("images")
            self._xml.endElement("data")
            self._xml.endDocument()
            self._stream.close()
            self._closed = True
        return {
            "path": str(self.path),
            "row_count": self._row_count,
        }

    def _start_document(self):
        request = self.payload["request"]
        source = request["sources"][0]
        algorithm = request["algorithms"][0]
        options = effective_options_for_algorithm(
            algorithm,
            request.get("algorithm_options")
            or _execution_plan_options(request, algorithm, source),
        )
        self._xml.startDocument()
        self._xml.startElement("data", {})
        self._xml.startElement(
            "settings",
            {
                "output_dir": "",
                "input_dir": "",
                "num_processes": "1",
                "identifier_color": "(255, 0, 0)",
                "aoi_radius": "0",
                "min_area": "0",
                "max_area": "0",
                "hist_ref_path": "",
                "kmeans_clusters": "0",
                "algorithm": str(algorithm),
                "thermal": str(
                    str(source.get("sensor_type") or "").lower() == "thermal"
                ),
            },
        )
        if isinstance(options, dict) and options:
            self._xml.startElement("options", {})
            for name in sorted(options):
                self._xml.startElement(
                    "option",
                    {"name": str(name), "value": str(options[name])},
                )
                self._xml.endElement("option")
            self._xml.endElement("options")
        self._xml.endElement("settings")
        self._xml.startElement("images", {})
        self._xml.startElement(
            "image",
            {
                "path": _source_path(source),
                "hidden": "False",
                "source_media_id": str(source["media_id"]),
                "source_checksum": _normalized_checksum(source.get("checksum_sha256")),
                "source_bucket": str(source.get("bucket") or ""),
            },
        )


def write_legacy_xml_from_parquet(payload, parquet_path, xml_path, batch_size=512):
    """Convert an existing normalized Parquet artifact without loading it whole."""
    writer = LegacyXmlArtifactWriter(payload, xml_path)
    try:
        parquet = pq.ParquetFile(parquet_path)
        for batch in parquet.iter_batches(batch_size=batch_size):
            for row in batch.to_pylist():
                writer.write_row(row)
        return writer.close()
    finally:
        writer.close()


def legacy_xml_export_config(payload):
    request = payload.get("request") if isinstance(payload, dict) else None
    persistence = request.get("persistence") if isinstance(request, dict) else None
    config = persistence.get("legacy_xml") if isinstance(persistence, dict) else None
    if not isinstance(config, dict) or config.get("enabled") is not True:
        return None
    return config


def _execution_plan_options(request, algorithm, source):
    execution_plan = request.get("execution_plan")
    entries = (
        execution_plan.get("entries") if isinstance(execution_plan, dict) else None
    )
    sensor_type = str(source.get("sensor_type") or "").strip().lower()
    if not isinstance(entries, list):
        return {}
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        if str(entry.get("algorithm") or "").strip() != str(algorithm):
            continue
        if str(entry.get("sensor_type") or "").strip().lower() != sensor_type:
            continue
        return dict(entry.get("options") or {})
    return {}


def _aoi_attributes(row):
    properties = _json_object(row.get("properties_json"))
    polygon = _json_list(row.get("source_pixel_polygon_json"))
    bbox = _json_list(row.get("source_pixel_bbox_json"))
    center = _json_list(row.get("source_center_pixel_json"))
    center = center if len(center) >= 2 else _bbox_center(bbox)
    radius = _first_finite(properties.get("radius"))
    if radius is None and len(bbox) >= 4:
        radius = max(float(bbox[2]), float(bbox[3])) / 2.0
    area = _first_finite(properties.get("area"))
    if area is None:
        area = _polygon_area(polygon)
    attributes = {
        "center": str((int(round(center[0])), int(round(center[1])))),
        "radius": str(max(int(round(radius or 0)), 0)),
        "area": _number_text(area or 0),
        "flagged": "False",
    }
    _set_optional(attributes, "contour", polygon or None, transform=str)
    _set_optional(attributes, "confidence", row.get("confidence"))
    _set_optional(attributes, "score_type", row.get("score_type"), transform=str)
    _set_optional(attributes, "raw_score", row.get("raw_score"))
    _set_optional(attributes, "score_method", row.get("score_method"), transform=str)
    temperature = _first_finite(
        properties.get("temperature"),
        row.get("thermal_mean_c"),
    )
    _set_optional(attributes, "temperature", temperature)
    if row.get("algorithm_version"):
        attributes["algorithm_version"] = str(row["algorithm_version"])
    if row.get("detection_class"):
        attributes["detection_class"] = str(row["detection_class"])
    return attributes


def _source_path(source):
    object_key = str(source.get("object_key") or "")
    return object_key or str(source.get("media_id") or "")


def _bbox_center(bbox):
    if len(bbox) < 4:
        return [0, 0]
    return [
        float(bbox[0]) + float(bbox[2]) / 2.0,
        float(bbox[1]) + float(bbox[3]) / 2.0,
    ]


def _polygon_area(points):
    if len(points) < 3:
        return 0.0
    return abs(
        sum(
            float(first[0]) * float(second[1]) - float(second[0]) * float(first[1])
            for first, second in zip(points, points[1:] + points[:1])
        )
        / 2.0
    )


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


def _first_finite(*values):
    for value in values:
        try:
            parsed = float(value)
        except (TypeError, ValueError):
            continue
        if math.isfinite(parsed):
            return parsed
    return None


def _number_text(value):
    parsed = float(value)
    return str(int(parsed)) if parsed.is_integer() else repr(parsed)


def _set_optional(attributes, name, value, transform=_number_text):
    if value is None:
        return
    attributes[name] = transform(value)


def _normalized_checksum(value):
    text = str(value or "").lower()
    return text[7:] if text.startswith("sha256:") else text
