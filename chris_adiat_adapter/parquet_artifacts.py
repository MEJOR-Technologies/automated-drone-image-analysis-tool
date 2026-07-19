import hashlib
import json
import math
import os
import tempfile
import uuid
from pathlib import Path

import boto3
import pyarrow as pa
import pyarrow.parquet as pq
from botocore.exceptions import BotoCoreError, ClientError

from chris_adiat_adapter import __version__
from chris_adiat_adapter.legacy_xml_artifacts import (
    LEGACY_XML_CONTENT_TYPE,
    LegacyXmlArtifactWriter,
    legacy_xml_export_config,
)


ARTIFACT_SCHEMA_VERSION = 1
PARQUET_ROW_GROUP_SIZE = 512
OBSERVATION_NAMESPACE = uuid.UUID("a0a3b36a-0d7d-5fd5-a4ac-d9e7309783f7")


class ArtifactPublicationError(RuntimeError):
    """Raised when an immutable result artifact cannot be published safely."""


class TransientArtifactPublicationError(ArtifactPublicationError):
    def __init__(self, message, *, attempt_uri=None, artifact_checksum=None):
        super().__init__(message)
        self.retryable = True
        self.failure_kind = "transient"
        self.attempt_uri = attempt_uri
        self.artifact_checksum = artifact_checksum

    def diagnostics(self):
        return {
            "retryable": True,
            "failure_kind": "transient",
            "attempt_uri": self.attempt_uri,
            "artifact_checksum": self.artifact_checksum,
        }


PARQUET_SCHEMA = pa.schema(
    [
        ("schema_version", pa.int16()),
        ("observation_id", pa.string()),
        ("observation_index", pa.int64()),
        ("analysis_run_id", pa.string()),
        ("attempt_id", pa.string()),
        ("flight_id", pa.string()),
        ("source_media_id", pa.string()),
        ("source_checksum", pa.string()),
        ("algorithm", pa.string()),
        ("algorithm_version", pa.string()),
        ("algorithm_options_json", pa.string()),
        ("adapter_version", pa.string()),
        ("service_version", pa.string()),
        ("ai_model_filename", pa.string()),
        ("ai_model_sha256", pa.string()),
        ("actual_provider", pa.string()),
        ("detection_class", pa.string()),
        ("confidence", pa.float64()),
        ("raw_score", pa.float64()),
        ("score_type", pa.string()),
        ("score_method", pa.string()),
        ("source_pixel_polygon_json", pa.string()),
        ("source_pixel_bbox_json", pa.string()),
        ("source_center_pixel_json", pa.string()),
        ("source_image_width", pa.int32()),
        ("source_image_height", pa.int32()),
        ("map_geometry_json", pa.string()),
        ("geometry_quality", pa.string()),
        ("thermal_minimum_c", pa.float64()),
        ("thermal_maximum_c", pa.float64()),
        ("thermal_mean_c", pa.float64()),
        ("properties_json", pa.string()),
    ],
    metadata={
        b"chris.artifact": b"search_rescue_observations",
        b"chris.schema_version": str(ARTIFACT_SCHEMA_VERSION).encode("ascii"),
    },
)


class ObservationArtifactWriter:
    """Incrementally write one photo-detector artifact in bounded row groups."""

    def __init__(self, payload, path):
        self.payload = payload
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        schema_metadata = dict(PARQUET_SCHEMA.metadata or {})
        schema_metadata.update(
            {
                b"chris.adapter_version": __version__.encode("utf-8"),
                b"chris.service_version": (
                    f"chris-adiat-gpl-worker-{__version__}".encode("utf-8")
                ),
            }
        )
        self._writer = pq.ParquetWriter(
            self.path,
            PARQUET_SCHEMA.with_metadata(schema_metadata),
            compression="zstd",
            use_dictionary=True,
            write_statistics=True,
        )
        self._row_count = 0
        self._minimum_confidence = None
        self._maximum_confidence = None
        self._classes = set()
        self._versions = set()
        self._runtime_provenance = {}
        self._pending_rows = []
        self._closed = False
        self.legacy_xml_path = self.path.with_name("ADIAT_Data.xml")
        self._legacy_xml_writer = (
            LegacyXmlArtifactWriter(payload, self.legacy_xml_path)
            if legacy_xml_export_config(payload) is not None
            else None
        )

    def write_observations(self, observations):
        if self._closed:
            raise RuntimeError("observation artifact writer is closed")
        for observation in observations:
            row = _artifact_row_from_payload(
                self.payload,
                observation,
                index=self._row_count,
            )
            self.record_runtime_provenance(
                observation.get("runtime_provenance")
                if isinstance(observation, dict)
                else None
            )
            self._row_count += 1
            confidence = row["confidence"]
            if confidence is not None:
                self._minimum_confidence = (
                    confidence
                    if self._minimum_confidence is None
                    else min(self._minimum_confidence, confidence)
                )
                self._maximum_confidence = (
                    confidence
                    if self._maximum_confidence is None
                    else max(self._maximum_confidence, confidence)
                )
            if row["detection_class"]:
                self._classes.add(row["detection_class"])
            if row["algorithm_version"]:
                self._versions.add(row["algorithm_version"])
            if self._legacy_xml_writer is not None:
                self._legacy_xml_writer.write_row(row)
            self._pending_rows.append(row)
            if len(self._pending_rows) >= PARQUET_ROW_GROUP_SIZE:
                self._write_batch(self._pending_rows)
                self._pending_rows = []

    def record_runtime_provenance(self, provenance):
        if not provenance:
            return
        value = dict(provenance)
        key = json.dumps(value, sort_keys=True, separators=(",", ":"))
        self._runtime_provenance[key] = value

    def close(self):
        if not self._closed:
            if self._pending_rows:
                self._write_batch(self._pending_rows)
                self._pending_rows = []
            self._writer.close()
            self._closed = True
        prepared = {
            "path": str(self.path),
            "row_count": self._row_count,
            "minimum_confidence": self._minimum_confidence,
            "maximum_confidence": self._maximum_confidence,
            "detection_classes": sorted(self._classes),
            "algorithm_version": (
                next(iter(self._versions)) if len(self._versions) == 1 else None
            ),
            "runtime_provenance": [
                self._runtime_provenance[key]
                for key in sorted(self._runtime_provenance)
            ],
        }
        if self._legacy_xml_writer is not None:
            prepared["legacy_xml"] = self._legacy_xml_writer.close()
        return prepared

    def _write_batch(self, rows):
        self._writer.write_table(
            pa.Table.from_pylist(rows, schema=PARQUET_SCHEMA),
            row_group_size=PARQUET_ROW_GROUP_SIZE,
        )


def publish_prepared_observation_artifact(payload, prepared, s3_client=None):
    """Publish a completed local artifact using immutable retry semantics."""
    request = payload["request"]
    persistence = request["persistence"]
    source = request["sources"][0]
    algorithm = request["algorithms"][0]
    attempt_id = str((payload.get("metadata") or {}).get("attempt_id") or "")
    flight_id = str(request["flight_id"])
    run_id = str(request["analysis_run_id"])
    artifact_path = Path(prepared["path"])
    checksum = _file_sha256(artifact_path)
    size_bytes = artifact_path.stat().st_size
    client = s3_client or _s3_client()
    bucket = persistence["bucket"]
    attempt_key = persistence["attempt_object_key"]
    canonical_key = persistence["canonical_object_key"]
    attempt_uri = f"s3://{bucket}/{attempt_key}"
    metadata = {
        "sha256": checksum,
        "schema-version": str(persistence["artifact_schema_version"]),
        "analysis-run-id": run_id,
        "source-media-id": str(source["media_id"]),
        "algorithm": algorithm,
    }
    try:
        _put_object(
            client,
            artifact_path,
            bucket=bucket,
            object_key=attempt_key,
            content_type=persistence["content_type"],
            metadata=metadata,
            immutable=True,
        )
    except Exception as exc:
        _raise_classified_publication_error(exc, artifact_checksum=checksum)
    try:
        _put_object(
            client,
            artifact_path,
            bucket=bucket,
            object_key=canonical_key,
            content_type=persistence["content_type"],
            metadata=metadata,
            immutable=bool(persistence.get("immutable", True)),
        )
    except Exception as exc:
        _raise_classified_publication_error(
            exc,
            attempt_uri=attempt_uri,
            artifact_checksum=checksum,
        )

    artifact_uri = f"s3://{persistence['bucket']}/{persistence['canonical_object_key']}"
    artifact = {
        "source_media_id": str(source["media_id"]),
        "flight_id": flight_id,
        "source_checksum": _normalized_checksum(source["checksum_sha256"]),
        "algorithm": algorithm,
        "algorithm_version": prepared["algorithm_version"],
        "artifact_uri": artifact_uri,
        "attempt_uri": attempt_uri,
        "artifact_checksum": checksum,
        "artifact_size_bytes": size_bytes,
        "schema_version": int(persistence["artifact_schema_version"]),
        "row_count": int(prepared["row_count"]),
        "minimum_confidence": prepared["minimum_confidence"],
        "maximum_confidence": prepared["maximum_confidence"],
        "detection_classes": list(prepared["detection_classes"]),
        "runtime_provenance": list(prepared.get("runtime_provenance") or []),
        "metadata": {
            "content_type": persistence["content_type"],
            "attempt_object_key": persistence["attempt_object_key"],
            "attempt_uri": attempt_uri,
            "unmerged": True,
            "geometry": "source_pixels_and_wgs84",
        },
    }
    digest = hashlib.sha256(
        json.dumps(artifact, sort_keys=True, separators=(",", ":")).encode("utf-8")
    ).hexdigest()
    result = {
        "mode": "parquet",
        "contract_version": int(persistence["contract_version"]),
        "run_id": run_id,
        "attempt_id": attempt_id,
        "attempt_uri": attempt_uri,
        "observation_count": int(prepared["row_count"]),
        "detection_count": int(prepared["row_count"]),
        "digest": digest,
        "geometry_type": "MultiPolygon",
        "runtime_provenance": list(prepared.get("runtime_provenance") or []),
        "artifacts": [artifact],
    }
    if prepared.get("legacy_xml") is not None:
        result["legacy_xml"] = _publish_legacy_xml_artifact(
            payload,
            prepared["legacy_xml"],
            client,
        )
    return result


def _raise_classified_publication_error(
    exc,
    *,
    attempt_uri=None,
    artifact_checksum=None,
):
    if _is_transient_publication_error(exc):
        raise TransientArtifactPublicationError(
            str(exc),
            attempt_uri=attempt_uri,
            artifact_checksum=artifact_checksum,
        ) from exc
    raise exc


def _is_transient_publication_error(exc):
    if isinstance(exc, BotoCoreError):
        return True
    if not isinstance(exc, ClientError):
        return False
    response = exc.response or {}
    code = str((response.get("Error") or {}).get("Code") or "")
    status = int((response.get("ResponseMetadata") or {}).get("HTTPStatusCode") or 0)
    return status >= 500 or code in {
        "InternalError",
        "RequestTimeout",
        "RequestTimeoutException",
        "ServiceUnavailable",
        "SlowDown",
        "Throttling",
        "ThrottlingException",
    }


def publish_observation_artifact(payload, observations, work_dir=None, s3_client=None):
    """Compatibility wrapper for callers that already hold an observation iterable."""
    base_dir = Path(work_dir) if work_dir else Path(
        tempfile.mkdtemp(prefix="adiat-artifact-")
    )
    cleanup_dir = work_dir is None
    artifact_path = base_dir / "observations.parquet"
    writer = ObservationArtifactWriter(payload, artifact_path)
    try:
        writer.write_observations(observations)
        prepared = writer.close()
        return publish_prepared_observation_artifact(
            payload,
            prepared,
            s3_client=s3_client,
        )
    finally:
        writer.close()
        artifact_path.unlink(missing_ok=True)
        writer.legacy_xml_path.unlink(missing_ok=True)
        if cleanup_dir:
            try:
                base_dir.rmdir()
            except OSError:
                pass


def _publish_legacy_xml_artifact(payload, prepared, client):
    request = payload["request"]
    persistence = request["persistence"]
    config = legacy_xml_export_config(payload)
    if config is None:
        return None
    source = request["sources"][0]
    path = Path(prepared["path"])
    checksum = _file_sha256(path)
    metadata = {
        "sha256": checksum,
        "schema-version": "legacy-adiat-data-1",
        "analysis-run-id": str(request["analysis_run_id"]),
        "source-media-id": str(source["media_id"]),
        "algorithm": str(request["algorithms"][0]),
    }
    for object_key, immutable in (
        (config["attempt_object_key"], True),
        (config["canonical_object_key"], bool(config.get("immutable", True))),
    ):
        _put_object(
            client,
            path,
            bucket=persistence["bucket"],
            object_key=object_key,
            content_type=config.get("content_type", LEGACY_XML_CONTENT_TYPE),
            metadata=metadata,
            immutable=immutable,
        )
    return {
        "artifact_uri": (
            f"s3://{persistence['bucket']}/{config['canonical_object_key']}"
        ),
        "artifact_checksum": checksum,
        "artifact_size_bytes": path.stat().st_size,
        "content_type": config.get("content_type", LEGACY_XML_CONTENT_TYPE),
        "row_count": int(prepared["row_count"]),
        "schema_version": "legacy-adiat-data-1",
    }


def _artifact_row_from_payload(payload, observation, *, index):
    request = payload["request"]
    return _artifact_row(
        observation,
        index=index,
        source=request["sources"][0],
        algorithm=request["algorithms"][0],
        run_id=str(request["analysis_run_id"]),
        attempt_id=str((payload.get("metadata") or {}).get("attempt_id") or ""),
        flight_id=str(request["flight_id"]),
    )


def _artifact_row(observation, *, index, source, algorithm, run_id, attempt_id, flight_id):
    observation = dict(observation)
    properties = dict(observation.get("properties") or {})
    runtime_provenance = dict(observation.get("runtime_provenance") or {})
    polygon = observation.get("source_pixel_polygon")
    map_geometry = _normalize_map_geometry(
        observation.get("map_geometry") or _project_polygon(source, polygon)
    )
    confidence = _finite_number(observation.get("score"))
    stable_payload = {
        "run_id": run_id,
        "source_media_id": str(source["media_id"]),
        "algorithm": algorithm,
        "index": index,
        "polygon": polygon,
        "confidence": confidence,
        "raw_score": _finite_number(properties.get("raw_score")),
    }
    observation_id = uuid.uuid5(
        OBSERVATION_NAMESPACE,
        json.dumps(stable_payload, sort_keys=True, separators=(",", ":")),
    )
    return {
        "schema_version": ARTIFACT_SCHEMA_VERSION,
        "observation_id": str(observation_id),
        "observation_index": index,
        "analysis_run_id": run_id,
        "attempt_id": attempt_id,
        "flight_id": flight_id,
        "source_media_id": str(source["media_id"]),
        "source_checksum": _normalized_checksum(source["checksum_sha256"]),
        "algorithm": algorithm,
        "algorithm_version": observation.get("algorithm_version"),
        "algorithm_options_json": _json(observation.get("algorithm_options") or {}),
        "adapter_version": _optional_text(runtime_provenance.get("adapter_version")),
        "service_version": _optional_text(runtime_provenance.get("service_version")),
        "ai_model_filename": _optional_text(runtime_provenance.get("ai_model_filename")),
        "ai_model_sha256": _optional_text(runtime_provenance.get("ai_model_sha256")),
        "actual_provider": _optional_text(runtime_provenance.get("actual_provider")),
        "detection_class": str(observation.get("detection_class") or "adiat_detection"),
        "confidence": confidence,
        "raw_score": _finite_number(properties.get("raw_score")),
        "score_type": _optional_text(properties.get("score_type")),
        "score_method": _optional_text(properties.get("score_method")),
        "source_pixel_polygon_json": _json(polygon),
        "source_pixel_bbox_json": _json(observation.get("source_pixel_bbox")),
        "source_center_pixel_json": _json(observation.get("source_center_pixel")),
        "source_image_width": _optional_int(observation.get("source_image_width")),
        "source_image_height": _optional_int(observation.get("source_image_height")),
        "map_geometry_json": _json(map_geometry),
        "geometry_quality": "projection_footprint" if map_geometry else str(observation.get("geometry_quality") or "image_only"),
        "thermal_minimum_c": _first_finite(properties, "minimum_c", "min_temperature_c", "temperature_min_c"),
        "thermal_maximum_c": _first_finite(properties, "maximum_c", "max_temperature_c", "temperature_max_c"),
        "thermal_mean_c": _first_finite(properties, "mean_c", "mean_temperature_c", "temperature_mean_c"),
        "properties_json": _json(properties),
    }


def _project_polygon(source, polygon):
    footprint = source.get("projection_footprint") or {}
    rings = footprint.get("coordinates") if isinstance(footprint, dict) else None
    metadata = source.get("metadata") or {}
    width = _finite_number(metadata.get("image_width"))
    height = _finite_number(metadata.get("image_height"))
    if not polygon or not rings or len(rings[0]) < 4 or not width or not height:
        return None
    top_left, top_right, bottom_right, bottom_left = rings[0][:4]
    projected = []
    for point in polygon:
        u = min(max(float(point[0]) / max(width - 1.0, 1.0), 0.0), 1.0)
        v = min(max(float(point[1]) / max(height - 1.0, 1.0), 0.0), 1.0)
        top = _lerp(top_left, top_right, u)
        bottom = _lerp(bottom_left, bottom_right, u)
        projected.append(_lerp(top, bottom, v))
    if projected and projected[0] != projected[-1]:
        projected.append(projected[0])
    return {"type": "Polygon", "coordinates": [projected]} if len(projected) >= 4 else None


def _normalize_map_geometry(geometry):
    if not isinstance(geometry, dict):
        return geometry
    if geometry.get("type") != "Polygon":
        return geometry
    return {
        **geometry,
        "type": "MultiPolygon",
        "coordinates": [geometry.get("coordinates")],
    }


def _lerp(first, second, amount):
    return [float(first[0]) + (float(second[0]) - float(first[0])) * amount, float(first[1]) + (float(second[1]) - float(first[1])) * amount]


def _put_object(client, path, *, bucket, object_key, content_type, metadata, immutable):
    if immutable:
        existing = _existing_checksum(client, bucket, object_key)
        if existing is not None:
            if existing != metadata["sha256"]:
                raise ArtifactPublicationError("immutable artifact already exists with a different checksum")
            return
    with path.open("rb") as body:
        kwargs = {
            "Bucket": bucket,
            "Key": object_key,
            "Body": body,
            "ContentLength": path.stat().st_size,
            "ContentType": content_type,
            "Metadata": metadata,
        }
        if immutable:
            kwargs["IfNoneMatch"] = "*"
        try:
            client.put_object(**kwargs)
        except ClientError as exc:
            code = str(exc.response.get("Error", {}).get("Code") or "")
            if immutable and code in {"PreconditionFailed", "412"}:
                if _existing_checksum(client, bucket, object_key) == metadata["sha256"]:
                    return
                raise ArtifactPublicationError("immutable artifact publication conflicted") from exc
            raise


def _existing_checksum(client, bucket, object_key):
    try:
        response = client.head_object(Bucket=bucket, Key=object_key)
    except ClientError as exc:
        code = str(exc.response.get("Error", {}).get("Code") or "")
        if code in {"404", "NoSuchKey", "NotFound"}:
            return None
        raise
    return str((response.get("Metadata") or {}).get("sha256") or "") or None


def _s3_client():
    kwargs = {}
    endpoint = os.getenv("ADIAT_S3_ENDPOINT_URL") or os.getenv("AWS_ENDPOINT_URL_S3")
    region = os.getenv("ADIAT_S3_REGION") or os.getenv("AWS_REGION") or os.getenv("AWS_DEFAULT_REGION")
    if endpoint:
        kwargs["endpoint_url"] = endpoint
    if region:
        kwargs["region_name"] = region
    return boto3.client("s3", **kwargs)


def _file_sha256(path):
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def _algorithm_version(rows):
    versions = {row["algorithm_version"] for row in rows if row["algorithm_version"]}
    return next(iter(versions)) if len(versions) == 1 else None


def _normalized_checksum(value):
    text = str(value or "").lower()
    return text[7:] if text.startswith("sha256:") else text


def _finite_number(value):
    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return None
    return parsed if math.isfinite(parsed) else None


def _first_finite(mapping, *keys):
    for key in keys:
        value = _finite_number(mapping.get(key))
        if value is not None:
            return value
    return None


def _optional_int(value):
    try:
        return int(value) if value is not None else None
    except (TypeError, ValueError):
        return None


def _optional_text(value):
    return str(value) if value is not None else None


def _json(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":")) if value is not None else None
