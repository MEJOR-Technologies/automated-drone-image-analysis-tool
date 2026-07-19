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


def test_normalization_preserves_detector_confidence_and_raw_score():
    observation = normalize_aoi(
        {
            "media_id": "media-1",
            "metadata": {"image_width": 10, "image_height": 10},
        },
        "AIPersonDetector",
        {
            "center": [5, 5],
            "radius": 1,
            "confidence": 87.5,
            "raw_score": 0.875,
            "score_type": "model_confidence",
            "score_method": "AIPersonDetector",
        },
    )

    assert observation["score"] == 87.5
    assert observation["properties"] == {
        "area": None,
        "radius": 1,
        "score_type": "model_confidence",
        "raw_score": 0.875,
        "score_method": "AIPersonDetector",
    }


def test_normalization_preserves_effective_algorithm_options():
    observation = normalize_aoi(
        {
            "media_id": "media-1",
            "metadata": {"image_width": 10, "image_height": 10},
        },
        "AIPersonDetector",
        {"center": [5, 5], "radius": 1},
        algorithm_options={
            "person_detector_confidence": 0.0,
            "cpu_only": True,
        },
    )

    assert observation["algorithm_options"] == {
        "person_detector_confidence": 0.0,
        "cpu_only": True,
    }


def test_normalization_preserves_runtime_provenance_consistently():
    provenance = {
        "adapter_version": "0.2.1",
        "service_version": "1",
        "ai_model_filename": "model.onnx",
        "ai_model_sha256": "a" * 64,
        "actual_provider": "CPUExecutionProvider",
    }

    observation = normalize_aoi(
        {"media_id": "media-1", "metadata": {}},
        "AIPersonDetector",
        {"center": [5, 5], "radius": 1},
        runtime_provenance=provenance,
    )

    assert observation["algorithm_version"] == "1"
    assert observation["runtime_provenance"] == provenance


def test_normalization_preserves_thermal_component_statistics():
    observation = normalize_aoi(
        {
            "media_id": "thermal-1",
            "metadata": {"image_width": 10, "image_height": 10},
        },
        "ThermalAnomaly",
        {
            "center": [5, 5],
            "radius": 1,
            "minimum_c": 31.0,
            "maximum_c": 42.0,
            "mean_c": 36.0,
        },
    )

    assert observation["properties"]["minimum_c"] == 31.0
    assert observation["properties"]["maximum_c"] == 42.0
    assert observation["properties"]["mean_c"] == 36.0
