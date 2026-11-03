import cv2
import numpy as np
import pytest

from chris_adiat_adapter import algorithms
from chris_adiat_adapter.algorithms import effective_options_for_algorithm


def _write_image(path, image):
    assert cv2.imwrite(str(path), image)
    return str(path)


def _rgb_source(*, width=80, height=80, sizing=None):
    metadata = {"image_width": width, "image_height": height}
    if sizing is not None:
        metadata["detection_sizing"] = sizing
    return {"sensor_type": "rgb", "metadata": metadata}


def _hsv_config(rgb):
    if rgb == [255, 0, 0]:
        h = 0.0
    elif rgb == [0, 255, 0]:
        h = 60 / 179
    else:
        raise AssertionError(f"test does not define HSV for {rgb}")
    return {
        "selected_color": rgb,
        "hsv_ranges": {
            "h": h,
            "s": 1.0,
            "v": 1.0,
            "h_minus": 8 / 179,
            "h_plus": 8 / 179,
            "s_minus": 20 / 255,
            "s_plus": 20 / 255,
            "v_minus": 20 / 255,
            "v_plus": 20 / 255,
        },
    }


def test_native_color_range_unions_independent_rgb_samples(tmp_path):
    image = np.zeros((160, 160, 3), dtype=np.uint8)
    image[50:58, 50:58] = (0, 0, 255)  # Red in OpenCV's BGR image.
    image[100:108, 100:108] = (0, 255, 0)
    image_path = _write_image(tmp_path / "two-colors.png", image)

    results = algorithms.run_adiat_algorithm(
        "ColorRange",
        image_path,
        _rgb_source(width=160, height=160),
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "color_ranges": [
                {"color_range": [[250, 0, 0], [255, 5, 5]]},
                {"color_range": [[0, 250, 0], [5, 255, 5]]},
            ]
        },
    )

    assert len(results) == 2
    centers = [aoi["center"] for aoi in results]
    assert any(50 <= x <= 58 and 50 <= y <= 58 for x, y in centers)
    assert any(100 <= x <= 108 and 100 <= y <= 108 for x, y in centers)


def test_native_hsv_color_range_unions_independent_samples(tmp_path):
    image = np.zeros((160, 160, 3), dtype=np.uint8)
    image[50:58, 50:58] = (0, 0, 255)  # Red in OpenCV's BGR image.
    image[100:108, 100:108] = (0, 255, 0)
    image_path = _write_image(tmp_path / "hsv-two-colors.png", image)

    results = algorithms.run_adiat_algorithm(
        "HSVColorRange",
        image_path,
        _rgb_source(width=160, height=160),
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "hsv_configs": [_hsv_config([255, 0, 0]), _hsv_config([0, 255, 0])]
        },
    )

    assert len(results) == 2
    centers = [aoi["center"] for aoi in results]
    assert any(50 <= x <= 58 and 50 <= y <= 58 for x, y in centers)
    assert any(100 <= x <= 108 and 100 <= y <= 108 for x, y in centers)


def test_native_matched_filter_unions_independent_rgb_samples(tmp_path):
    rng = np.random.default_rng(7)
    image = rng.integers(90, 111, size=(160, 160, 3), dtype=np.uint8)
    image[12:28, 12:28] = (0, 0, 255)  # Red in OpenCV's BGR image.
    image[128:144, 128:144] = (0, 255, 0)
    image_path = _write_image(tmp_path / "matched-filter-two-colors.png", image)

    results = algorithms.run_adiat_algorithm(
        "MatchedFilter",
        image_path,
        _rgb_source(),
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "color_configs": [
                {"selected_color": [255, 0, 0], "match_filter_threshold": 0.5},
                {"selected_color": [0, 255, 0], "match_filter_threshold": 0.5},
            ]
        },
    )

    centers = [aoi["center"] for aoi in results]
    assert any(12 <= x <= 28 and 12 <= y <= 28 for x, y in centers)
    assert any(128 <= x <= 144 and 128 <= y <= 144 for x, y in centers)


def test_native_color_range_tolerance_and_dem_area_survive_downscaling(tmp_path):
    image = np.zeros((80, 80, 3), dtype=np.uint8)
    image[30:38, 30:38] = (0, 0, 255)
    image_path = _write_image(tmp_path / "dem-sized-target.png", image)
    sizing = {
        "version": 1,
        "status": "ready",
        "min_area_pixels": 64,
        "max_area_pixels": 64,
        "provenance": {
            "source": "DEM-derived GSD",
            "ground_pixel_area_m2": 0.25,
            "target_area_m2": 16.0,
        },
    }

    results = algorithms.run_adiat_algorithm(
        "ColorRange",
        image_path,
        _rgb_source(width=80, height=80, sizing=sizing),
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "processing_resolution_percent": 50,
            "color_ranges": [
                {"color_range": [[250, 0, 0], [255, 5, 5]]}
            ],
        },
    )

    assert len(results) == 1
    aoi = results[0]
    assert abs(aoi["center"][0] - 33.5) <= 2
    assert abs(aoi["center"][1] - 33.5) <= 2
    assert aoi["area"] == 64
    assert all(0 <= x < 80 and 0 <= y < 80 for x, y in aoi["contour"])
    assert results.runtime_provenance["detector_controls_contract_version"] == 2
    sizing_provenance = results.runtime_provenance["detection_sizing"]
    assert sizing_provenance["min_area_pixels"] == 64.0
    assert sizing_provenance["processing_min_area_pixels"] == 16.0
    assert sizing_provenance["processing_max_area_pixels"] == 16.0
    assert sizing_provenance["processing_pixel_area_scale"] == 0.25
    resolution = results.runtime_provenance["processing_resolution"]
    assert resolution == {
        "requested_percent": 50,
        "source_width": 80,
        "source_height": 80,
        "processing_width": 40,
        "processing_height": 40,
        "scale_x": 0.5,
        "scale_y": 0.5,
        "pixel_area_scale": 0.25,
    }


def test_native_thermal_detection_resizes_and_maps_to_source_pixels(tmp_path):
    temperatures = np.zeros((80, 80), dtype=np.float32)
    temperatures[26:54, 26:54] = 20.0
    image_path = tmp_path / "thermal-target.raw"
    temperatures.tofile(image_path)
    source = {
        "sensor_type": "thermal",
        "metadata": {"image_width": 80, "image_height": 80},
    }

    results = algorithms.run_adiat_algorithm(
        "ThermalAnomaly",
        str(image_path),
        source,
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "segments": 1,
            "threshold": 2.5,
            "type": "Above or Below Mean",
            "processing_resolution_percent": 50,
        },
    )

    assert len(results) == 1
    aoi = results[0]
    assert abs(aoi["center"][0] - 39.5) <= 2
    assert abs(aoi["center"][1] - 39.5) <= 2
    assert aoi["area"] == 784
    assert results.runtime_provenance["detector_controls_contract_version"] == 2
    assert results.runtime_provenance["effective_options"]["threshold"] == 2.5
    assert results.runtime_provenance["processing_resolution"] == {
        "requested_percent": 50,
        "source_width": 80,
        "source_height": 80,
        "processing_width": 40,
        "processing_height": 40,
        "scale_x": 0.5,
        "scale_y": 0.5,
        "pixel_area_scale": 0.25,
    }

    rounded_results = algorithms.run_adiat_algorithm(
        "ThermalAnomaly",
        str(image_path),
        source,
        work_dir=str(tmp_path),
        max_observations=10,
        algorithm_options={
            "segments": 1,
            "threshold": 3,
            "type": "Above or Below Mean",
            "processing_resolution_percent": 50,
        },
    )
    assert rounded_results == []


def test_ready_sizing_null_maximum_is_native_uncapped_sentinel():
    limits = algorithms.effective_area_limits_for_source(
        {
            "metadata": {
                "detection_sizing": {
                    "version": 1,
                    "status": "ready",
                    "min_area_pixels": 12,
                    "max_area_pixels": None,
                    "provenance": {"source": "DEM-derived GSD"},
                }
            }
        }
    )

    assert limits["min_area"] == 12.0
    assert limits["max_area"] == 0
    assert limits["runtime_provenance"]["max_area_pixels"] is None


@pytest.mark.parametrize(
    ("algorithm", "overrides", "message"),
    [
        ("ColorRange", None, "between 1 and 16"),
        (
            "ColorRange",
            {
                "color_ranges": [{"color_range": [[1, 0, 0], [2, 0, 0]]}],
                "tolerance_rgb": [50, 50, 50],
            },
            "unsupported option",
        ),
        (
            "ColorRange",
            {"color_ranges": [{"color_range": [[2, 0, 0], [1, 0, 0]]}]},
            "must not exceed",
        ),
        (
            "MatchedFilter",
            {
                "color_configs": [
                    {"selected_color": [255, 0, 0], "match_filter_threshold": 1.1}
                ]
            },
            r"in \[0, 1\]",
        ),
        (
            "MatchedFilter",
            {
                "color_configs": [
                    {"selected_color": [255, 0, 0], "threshold": 0.5}
                ]
            },
            "must contain selected_color",
        ),
        (
            "ColorRange",
            {
                "processing_resolution_percent": 5,
                "color_ranges": [{"color_range": [[0, 0, 0], [0, 0, 0]]}],
            },
            "processing_resolution_percent",
        ),
    ],
)
def test_color_algorithm_rejects_invalid_or_ignored_options(
    algorithm, overrides, message
):
    with pytest.raises(ValueError, match=message):
        effective_options_for_algorithm(algorithm, overrides)


def test_hsv_native_multi_sample_contract_remains_explicit():
    options = effective_options_for_algorithm(
        "HSVColorRange",
        {
            "hsv_configs": [
                {
                    "selected_color": [255, 0, 0],
                    "hsv_ranges": {
                        "h": 0.0,
                        "s": 1.0,
                        "v": 1.0,
                        "h_minus": 15 / 179,
                        "h_plus": 15 / 179,
                        "s_minus": 75 / 255,
                        "s_plus": 75 / 255,
                        "v_minus": 75 / 255,
                        "v_plus": 75 / 255,
                    },
                }
            ]
        },
    )

    assert set(options) == {"hsv_configs"}


@pytest.mark.parametrize(
    ("algorithm", "options"),
    [
        (
            "AIPersonDetector",
            {
                "person_detector_confidence": 50,
                "cpu_only": False,
                "processing_resolution_percent": 100,
            },
        ),
        (
            "MRMap",
            {
                "segments": 1,
                "threshold": 100,
                "window": 5,
                "colorspace": "LAB",
                "processing_resolution_percent": 100,
            },
        ),
        (
            "RXAnomaly",
            {"segments": 1, "sensitivity": 5, "processing_resolution_percent": 100},
        ),
        (
            "ThermalAnomaly",
            {
                "segments": 1,
                "threshold": 4,
                "type": "Above or Below Mean",
                "processing_resolution_percent": 100,
            },
        ),
        (
            "ThermalResidualAnomaly",
            {
                "sensitivity": 5,
                "type": "Both",
                "processing_resolution_percent": 100,
            },
        ),
        (
            "ThermalRange",
            {
                "minTemp": 30.0,
                "maxTemp": 45.0,
                "processing_resolution_percent": 100,
            },
        ),
    ],
)
def test_v2_native_detector_controls_are_consumed(algorithm, options):
    effective = effective_options_for_algorithm(algorithm, options)

    assert effective == options


def test_v2_thermal_anomaly_preserves_fractional_threshold():
    options = {
        "segments": 1,
        "threshold": 2.5,
        "type": "Above or Below Mean",
        "processing_resolution_percent": 100,
    }

    assert effective_options_for_algorithm("ThermalAnomaly", options) == options


@pytest.mark.parametrize(
    ("algorithm", "options", "message"),
    [
        (
            "AIPersonDetector",
            {
                "person_detector_confidence": 50,
                "cpu_only": False,
                "confidence_theshold": 50,
                "processing_resolution_percent": 100,
            },
            "unsupported option",
        ),
        (
            "MRMap",
            {
                "segments": 3,
                "threshold": 100,
                "window": 5,
                "colorspace": "LAB",
                "processing_resolution_percent": 100,
            },
            "segments must be one of",
        ),
        (
            "MRMap",
            {
                "segments": 1,
                "threshold": 100,
                "window": 11,
                "colorspace": "LAB",
                "processing_resolution_percent": 100,
            },
            "window must be an integer",
        ),
        (
            "ThermalAnomaly",
            {
                "segments": 1,
                "threshold": 4,
                "type": "Hot",
                "processing_resolution_percent": 100,
            },
            "type must be Above or Below Mean",
        ),
        (
            "ThermalAnomaly",
            {
                "segments": 1,
                "threshold": 7.1,
                "type": "Above or Below Mean",
                "processing_resolution_percent": 100,
            },
            r"threshold must be in \[0, 7\]",
        ),
        (
            "ThermalResidualAnomaly",
            {
                "sensitivity": 5,
                "type": "Above or Below Mean",
                "processing_resolution_percent": 100,
            },
            "type must be Hot, Cold, or Both",
        ),
        (
            "RXAnomaly",
            {"segments": 1, "sensitivity": 11, "processing_resolution_percent": 100},
            "sensitivity must be an integer",
        ),
    ],
)
def test_v2_native_detector_controls_reject_invalid_or_ignored_values(
    algorithm, options, message
):
    with pytest.raises(ValueError, match=message):
        effective_options_for_algorithm(algorithm, options)
