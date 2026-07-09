def normalize_aoi(source, algorithm_name, aoi):
    metadata = source.get("metadata") or {}
    polygon = _polygon_from_aoi(aoi)
    bbox = _bbox_from_polygon(polygon)
    center = _center_from_aoi(aoi, bbox)

    return {
        "source_media_id": source["media_id"],
        "source_checksum": source.get("checksum"),
        "algorithm": algorithm_name,
        "algorithm_version": None,
        "algorithm_options": {},
        "detection_class": "adiat_detection",
        "source_pixel_polygon": polygon,
        "source_pixel_bbox": bbox,
        "source_center_pixel": center,
        "source_image_width": metadata.get("image_width"),
        "source_image_height": metadata.get("image_height"),
        "map_geometry": None,
        "geometry_quality": "image_only",
        "score": aoi.get("confidence"),
        "properties": {
            "area": aoi.get("area"),
            "radius": aoi.get("radius"),
            "score_type": aoi.get("score_type"),
            "raw_score": aoi.get("raw_score"),
            "score_method": aoi.get("score_method"),
        },
    }


def _polygon_from_aoi(aoi):
    contour = aoi.get("contour")
    if contour:
        return [[int(point[0]), int(point[1])] for point in contour]

    pixels = aoi.get("detected_pixels") or []
    if pixels:
        return _polygon_from_bbox(_bbox_from_points(pixels))

    center = aoi.get("center") or [0, 0]
    radius = int(aoi.get("radius") or 0)
    cx, cy = int(center[0]), int(center[1])
    return _polygon_from_bbox([cx - radius, cy - radius, radius * 2, radius * 2])


def _bbox_from_polygon(polygon):
    return _bbox_from_points(polygon)


def _bbox_from_points(points):
    xs = [int(point[0]) for point in points]
    ys = [int(point[1]) for point in points]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    return [min_x, min_y, max_x - min_x, max_y - min_y]


def _polygon_from_bbox(bbox):
    x, y, width, height = bbox
    return [[x, y], [x + width, y], [x + width, y + height], [x, y + height]]


def _center_from_aoi(aoi, bbox):
    if aoi.get("center"):
        return [int(aoi["center"][0]), int(aoi["center"][1])]

    x, y, width, height = bbox
    return [int(x + width / 2), int(y + height / 2)]
