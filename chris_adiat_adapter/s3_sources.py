from pathlib import Path
from urllib.parse import urlparse
from urllib.request import urlopen


def load_source(source, work_dir):
    """Materialize one CHRIS source locally and return its local file path."""
    if source.get("local_path"):
        return source["local_path"]

    work_path = Path(work_dir)
    work_path.mkdir(parents=True, exist_ok=True)
    filename = Path(source.get("object_key") or urlparse(source["url"]).path).name or source["media_id"]
    local_path = work_path / filename

    if source.get("url"):
        with urlopen(source["url"], timeout=120) as response:
            local_path.write_bytes(response.read())
        return str(local_path)

    return _download_s3_object(source, local_path)


def _download_s3_object(source, local_path):
    try:
        import boto3
    except ImportError as exc:
        raise RuntimeError("boto3 is required for bucket/object_key sources") from exc

    client = boto3.client("s3")
    client.download_file(source["bucket"], source["object_key"], str(local_path))
    return str(local_path)
