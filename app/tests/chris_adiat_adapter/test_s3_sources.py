import hashlib
import io

import boto3
import pytest
from PIL import Image

from chris_adiat_adapter.s3_sources import SourceFetchError, load_source


def _source(checksum="0" * 64):
    source = {
        "media_id": "media-1",
        "bucket": "mission-media",
        "object_key": "original/image.jpg",
        "content_type": "image/jpeg",
    }
    source["checksum_sha256"] = checksum
    return source


class Body(io.BytesIO):
    pass


def _image_bytes(size=(16, 16)):
    payload = io.BytesIO()
    Image.new("RGB", size, color=(32, 64, 96)).save(payload, format="JPEG")
    return payload.getvalue()


def _mpo_bytes(size=(16, 16)):
    payload = io.BytesIO()
    Image.new("RGB", size, color=(32, 64, 96)).save(
        payload,
        format="MPO",
        save_all=True,
        append_images=[Image.new("RGB", size, color=(96, 64, 32))],
    )
    return payload.getvalue()


def test_s3_download_uses_explicit_endpoint_region_size_and_checksum(
    tmp_path, monkeypatch
):
    content = _image_bytes()
    body = Body(content)
    calls = {}

    class Client:
        def get_object(self, **kwargs):
            calls["get_object"] = kwargs
            return {
                "Body": body,
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    def client(service, **kwargs):
        calls["client"] = (service, kwargs)
        return Client()

    monkeypatch.setattr(boto3, "client", client)
    monkeypatch.setenv("ADIAT_S3_ENDPOINT_URL", "http://minio:9000")
    monkeypatch.setenv("ADIAT_S3_REGION", "eu-central-1")

    path = load_source(
        _source(hashlib.sha256(content).hexdigest()),
        tmp_path,
        max_source_bytes=1024,
    )

    assert calls["client"] == (
        "s3",
        {"endpoint_url": "http://minio:9000", "region_name": "eu-central-1"},
    )
    assert calls["get_object"] == {
        "Bucket": "mission-media",
        "Key": "original/image.jpg",
    }
    assert open(path, "rb").read() == content


def test_s3_download_accepts_dji_mpo_encoded_jpeg(tmp_path, monkeypatch):
    content = _mpo_bytes()

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())

    path = load_source(
        _source(hashlib.sha256(content).hexdigest()),
        tmp_path,
        max_source_bytes=1024 * 1024,
    )

    with Image.open(path) as image:
        assert image.format == "MPO"


def test_s3_download_rejects_reported_oversize_source(tmp_path, monkeypatch):
    body = Body(b"unused")

    class Client:
        def get_object(self, **kwargs):
            return {"Body": body, "ContentLength": 2048, "ContentType": "image/jpeg"}

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())

    with pytest.raises(SourceFetchError, match="maximum size"):
        load_source(_source(), tmp_path, max_source_bytes=1024)


def test_checksum_mismatch_removes_download(tmp_path, monkeypatch):
    content = _image_bytes()

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())

    with pytest.raises(SourceFetchError, match="checksum mismatch"):
        load_source(_source("0" * 64), tmp_path, max_source_bytes=1024)

    assert list(tmp_path.iterdir()) == []


def test_s3_download_rejects_non_image_content_type(tmp_path, monkeypatch):
    content = _image_bytes()

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "application/octet-stream",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())

    with pytest.raises(SourceFetchError, match="content type"):
        load_source(
            _source(hashlib.sha256(content).hexdigest()),
            tmp_path,
            max_source_bytes=1024 * 1024,
        )


def test_s3_download_rejects_declared_content_type_mismatch(tmp_path, monkeypatch):
    content = _image_bytes()

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/png",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())
    with pytest.raises(SourceFetchError, match="content type"):
        load_source(
            _source(hashlib.sha256(content).hexdigest()),
            tmp_path,
            max_source_bytes=1024 * 1024,
        )


def test_s3_download_rejects_detected_format_mismatch(tmp_path, monkeypatch):
    content = io.BytesIO()
    Image.new("RGB", (16, 16), color=(1, 2, 3)).save(content, format="PNG")
    content = content.getvalue()

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())
    with pytest.raises(SourceFetchError, match="image format"):
        load_source(
            _source(hashlib.sha256(content).hexdigest()),
            tmp_path,
            max_source_bytes=1024 * 1024,
        )


def test_s3_download_rejects_unreadable_image(tmp_path, monkeypatch):
    content = b"not-an-image"

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    monkeypatch.setattr(boto3, "client", lambda *args, **kwargs: Client())

    with pytest.raises(SourceFetchError, match="readable image"):
        load_source(
            _source(hashlib.sha256(content).hexdigest()),
            tmp_path,
            max_source_bytes=1024,
        )

    assert list(tmp_path.iterdir()) == []


def test_source_payload_cannot_override_s3_endpoint(tmp_path, monkeypatch):
    content = _image_bytes()
    calls = {}

    class Client:
        def get_object(self, **kwargs):
            return {
                "Body": Body(content),
                "ContentLength": len(content),
                "ContentType": "image/jpeg",
            }

    def client(service, **kwargs):
        calls["kwargs"] = kwargs
        return Client()

    monkeypatch.setattr(boto3, "client", client)
    monkeypatch.setenv("ADIAT_S3_ENDPOINT_URL", "http://trusted-minio:9000")
    source = _source(hashlib.sha256(content).hexdigest())
    source["endpoint_url"] = "http://untrusted:9000"

    load_source(source, tmp_path, max_source_bytes=1024 * 1024)

    assert calls["kwargs"]["endpoint_url"] == "http://trusted-minio:9000"
