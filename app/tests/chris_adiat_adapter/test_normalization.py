from chris_adiat_adapter.normalization import MAX_POLYGON_POINTS, normalize_aoi


def test_long_contour_is_sampled_across_full_shape_and_keeps_full_bbox():
    contour = [[index, index % 7] for index in range(100)]
    observation = normalize_aoi(
        {
            "media_id": "media-1",
            "checksum": "a" * 64,
            "metadata": {"image_width": 100, "image_height": 10},
        },
        "MRMap",
        {"contour": contour, "center": [50, 3]},
    )

    polygon = observation["source_pixel_polygon"]
    assert len(polygon) == MAX_POLYGON_POINTS
    assert polygon[0] == contour[0]
    assert polygon[-1] == contour[-1]
    assert observation["source_pixel_bbox"] == [0, 0, 99, 6]


def test_normalization_uses_checksum_sha256():
    observation = normalize_aoi(
        {
            "media_id": "media-1",
            "checksum_sha256": "b" * 64,
            "metadata": {"image_width": 10, "image_height": 10},
        },
        "MRMap",
        {"center": [5, 5], "radius": 1},
    )

    assert observation["source_checksum"] == "b" * 64
