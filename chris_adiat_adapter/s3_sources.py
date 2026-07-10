import hashlib
import hmac
import os
import re
from pathlib import Path

from PIL import Image, UnidentifiedImageError


DEFAULT_MAX_SOURCE_BYTES = 256 * 1024 * 1024
DEFAULT_MAX_IMAGE_PIXELS = 60_000_000
READ_CHUNK_BYTES = 1024 * 1024
SHA256_PATTERN = re.compile(r"^(?:sha256:)?([0-9a-fA-F]{64})$")
SUPPORTED_CONTENT_TYPES = frozenset(
    {"image/jpeg", "image/png", "image/tiff", "image/webp"}
)
DETECTED_FORMAT_CONTENT_TYPES = {
    "JPEG": "image/jpeg",
    "MPO": "image/jpeg",
    "PNG": "image/png",
    "TIFF": "image/tiff",
    "WEBP": "image/webp",
}


class SourceFetchError(RuntimeError):
    """Raised when a source cannot be materialized safely."""


def load_source(source, work_dir, max_source_bytes=None):
    """Materialize one bounded CHRIS source locally and return its path."""
    max_source_bytes = _max_source_bytes(max_source_bytes)
    expected_checksum = _expected_sha256(source)

    input_path = Path(work_dir) / "input"
    input_path.mkdir(parents=True, exist_ok=True)
    local_path = input_path / _safe_filename(source)

    try:
        _download_s3_object(source, local_path, max_source_bytes)
        _validate_checksum(local_path, expected_checksum)
        _validate_image(local_path, str(source.get("content_type") or "").lower())
        local_path.chmod(0o440)
    except Exception:
        local_path.unlink(missing_ok=True)
        try:
            input_path.rmdir()
        except OSError:
            pass
        raise

    return str(local_path)


def _download_s3_object(source, local_path, max_source_bytes):
    try:
        import boto3
    except ImportError as exc:
        raise SourceFetchError(
            "boto3 is required for bucket/object_key sources"
        ) from exc

    client_kwargs = {}
    endpoint_url = os.getenv("ADIAT_S3_ENDPOINT_URL") or os.getenv(
        "AWS_ENDPOINT_URL_S3"
    )
    region_name = (
        os.getenv("ADIAT_S3_REGION")
        or os.getenv("AWS_REGION")
        or os.getenv("AWS_DEFAULT_REGION")
    )
    if endpoint_url:
        client_kwargs["endpoint_url"] = endpoint_url
    if region_name:
        client_kwargs["region_name"] = region_name

    client = boto3.client("s3", **client_kwargs)
    response = client.get_object(Bucket=source["bucket"], Key=source["object_key"])
    body = response["Body"]
    try:
        declared_content_type = str(source.get("content_type") or "").lower()
        s3_content_type = str(response.get("ContentType") or "").lower()
        if (
            declared_content_type not in SUPPORTED_CONTENT_TYPES
            or s3_content_type not in SUPPORTED_CONTENT_TYPES
            or declared_content_type != s3_content_type
        ):
            raise SourceFetchError(
                "source object is not a supported image content type"
            )
        content_length = response.get("ContentLength")
        if content_length is not None:
            _validate_reported_size(int(content_length), max_source_bytes)
        with local_path.open("wb") as destination:
            _copy_bounded(body, destination, max_source_bytes)
    finally:
        body.close()


def _copy_bounded(source, destination, max_source_bytes):
    total = 0
    while True:
        chunk = source.read(min(READ_CHUNK_BYTES, max_source_bytes - total + 1))
        if not chunk:
            return
        total += len(chunk)
        if total > max_source_bytes:
            raise SourceFetchError(
                f"source exceeds maximum size of {max_source_bytes} bytes"
            )
        destination.write(chunk)


def _validate_reported_size(size_bytes, max_source_bytes):
    if size_bytes < 0 or size_bytes > max_source_bytes:
        raise SourceFetchError(
            f"source exceeds maximum size of {max_source_bytes} bytes"
        )


def _expected_sha256(source):
    checksum = source.get("checksum_sha256")
    if not checksum:
        raise SourceFetchError("source checksum_sha256 is required")
    match = SHA256_PATTERN.fullmatch(str(checksum))
    if not match:
        raise SourceFetchError("source checksum_sha256 must be a SHA-256 hex digest")
    return match.group(1).lower()


def _validate_checksum(local_path, expected_checksum):
    if expected_checksum is None:
        return
    digest = hashlib.sha256()
    with local_path.open("rb") as source_file:
        for chunk in iter(lambda: source_file.read(READ_CHUNK_BYTES), b""):
            digest.update(chunk)
    if not hmac.compare_digest(digest.hexdigest(), expected_checksum):
        raise SourceFetchError("source SHA-256 checksum mismatch")


def _max_source_bytes(value):
    if value is None:
        value = os.getenv("ADIAT_MAX_SOURCE_BYTES", str(DEFAULT_MAX_SOURCE_BYTES))
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        raise SourceFetchError(
            "ADIAT_MAX_SOURCE_BYTES must be a positive integer"
        ) from None
    if parsed <= 0:
        raise SourceFetchError("ADIAT_MAX_SOURCE_BYTES must be a positive integer")
    return parsed


def _validate_image(local_path, declared_content_type):
    try:
        with Image.open(local_path) as image:
            width, height = image.size
            image_format = str(image.format or "").upper()
            image.verify()
    except (OSError, UnidentifiedImageError, Image.DecompressionBombError):
        raise SourceFetchError("source object is not a readable image") from None
    if DETECTED_FORMAT_CONTENT_TYPES.get(image_format) != declared_content_type:
        raise SourceFetchError("source object uses an unsupported image format")
    max_pixels = _max_image_pixels()
    if width <= 0 or height <= 0 or width * height > max_pixels:
        raise SourceFetchError(
            f"source image exceeds maximum pixel count of {max_pixels}"
        )
    try:
        with Image.open(local_path) as image:
            image.load()
    except (OSError, UnidentifiedImageError, Image.DecompressionBombError):
        raise SourceFetchError("source object is not a readable image") from None


def _max_image_pixels():
    value = os.getenv("ADIAT_MAX_IMAGE_PIXELS", str(DEFAULT_MAX_IMAGE_PIXELS))
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        raise SourceFetchError(
            "ADIAT_MAX_IMAGE_PIXELS must be a positive integer"
        ) from None
    if parsed <= 0:
        raise SourceFetchError("ADIAT_MAX_IMAGE_PIXELS must be a positive integer")
    return parsed


def _safe_filename(source):
    suffix = Path(source.get("object_key") or "").suffix
    media_id = re.sub(r"[^A-Za-z0-9_.-]", "_", str(source["media_id"]))
    return f"{media_id}{suffix[:16]}"
