class PayloadValidationError(ValueError):
    """Raised when a CHRIS ADIAT task payload is not executable."""


def validate_payload(payload):
    if not isinstance(payload, dict):
        raise PayloadValidationError("payload must be an object")

    if not payload.get("task_id"):
        raise PayloadValidationError("task_id is required")

    request = payload.get("request")
    if not isinstance(request, dict):
        raise PayloadValidationError("request is required")

    if not request.get("profile"):
        raise PayloadValidationError("request.profile is required")

    sources = request.get("sources")
    if not isinstance(sources, list) or len(sources) == 0:
        raise PayloadValidationError("request.sources must contain at least one source")

    for index, source in enumerate(sources):
        if not isinstance(source, dict):
            raise PayloadValidationError(f"request.sources[{index}] must be an object")
        if not source.get("media_id"):
            raise PayloadValidationError(f"request.sources[{index}].media_id is required")
        has_local = bool(source.get("local_path"))
        has_object_ref = bool(source.get("bucket")) and bool(source.get("object_key"))
        has_url = bool(source.get("url"))
        if not (has_local or has_object_ref or has_url):
            raise PayloadValidationError(
                f"request.sources[{index}] needs local_path, url, or bucket/object_key"
            )

    return payload
