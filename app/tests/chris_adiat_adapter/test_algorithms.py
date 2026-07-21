from types import SimpleNamespace

import numpy as np

from algorithms.AlgorithmService import BoundedAreasOfInterest
from algorithms.images.ThermalAnomaly.services.ThermalAnomalyService import (
    ThermalAnomalyService,
)
from algorithms.images.ThermalRange.services.ThermalRangeService import (
    ThermalRangeService,
)
from chris_adiat_adapter import algorithms
from chris_adiat_adapter.algorithms import _compact_areas_of_interest
from chris_adiat_adapter.algorithms import default_options_for_algorithm


def test_ai_person_detector_uses_cpu_safe_defaults():
    assert default_options_for_algorithm("AIPersonDetector") == {
        "person_detector_confidence": 50.0,
        "cpu_only": True,
    }


def test_ai_person_detector_keeps_each_model_box_as_an_observation():
    assert (
        algorithms.SERVICE_KWARGS_BY_ALGORITHM["AIPersonDetector"]["combine_aois"]
        is False
    )
    assert algorithms.DEFAULT_SERVICE_KWARGS["combine_aois"] is True


def test_hsv_color_range_has_safe_rgb_defaults():
    assert default_options_for_algorithm("HSVColorRange") == {
        "selected_color": [255, 0, 0],
        "hue_threshold": 10,
        "saturation_threshold": 30,
        "value_threshold": 30,
    }


def test_run_passes_supplied_options_to_rgb_service(tmp_path, monkeypatch):
    source_path = tmp_path / "source.png"
    source_path.touch()
    captured = {}

    class FakeService:
        def __init__(self, identifier, min_area, max_area, radius, combine, options):
            captured.update(options)

        def process_image(self, *args):
            return SimpleNamespace(error_message=None, areas_of_interest=[])

    monkeypatch.setattr(
        algorithms, "_service_class_for_algorithm", lambda name: FakeService
    )
    monkeypatch.setattr(algorithms.cv2, "imread", lambda path: np.zeros((1, 1, 3)))

    algorithms.run_adiat_algorithm(
        "AIPersonDetector",
        str(source_path),
        {},
        str(tmp_path),
        algorithm_options={"person_detector_confidence": 0.0},
    )

    assert captured == {
        "person_detector_confidence": 0.0,
        "cpu_only": True,
    }


def test_thermal_range_honors_supplied_temperature_options(tmp_path):
    source_path = tmp_path / "thermal.raw"
    temperatures = np.array(
        [
            [0.0, 0.0, 0.0, 0.0],
            [0.0, 20.0, 20.0, 0.0],
            [0.0, 20.0, 20.0, 0.0],
            [0.0, 0.0, 0.0, 0.0],
        ],
        dtype="<f4",
    )
    temperatures.tofile(source_path)
    source = {"metadata": {"image_width": 4, "image_height": 4}}

    default_areas = algorithms._run_thermal_algorithm(
        "ThermalRange", str(source_path), source
    )
    configured_areas = algorithms._run_thermal_algorithm(
        "ThermalRange",
        str(source_path),
        source,
        algorithm_options={"minTemp": 19.0, "maxTemp": 21.0},
    )

    assert default_areas == []
    assert len(configured_areas) == 1


def test_adapter_thermal_range_matches_native_raster_service(tmp_path):
    temperatures = np.full((16, 16), 10.0, dtype="<f4")
    temperatures[4:10, 5:11] = 35.0
    source_path = tmp_path / "range.raw"
    temperatures.tofile(source_path)
    options = {"minTemp": 30.0, "maxTemp": 40.0}
    source = {"metadata": {"image_width": 16, "image_height": 16}}
    service = ThermalRangeService((255, 0, 0), 1, 0, 25, True, options)
    service.max_detected_pixels = algorithms._max_detected_pixel_samples()
    service.max_areas_of_interest = algorithms._observation_limit(None)
    service.max_contour_points = algorithms._max_contour_points()

    native = service.process_temperature_raster(temperatures).areas_of_interest
    expected = _compact_areas_of_interest(native)
    actual = algorithms._run_thermal_algorithm(
        "ThermalRange",
        str(source_path),
        source,
        work_dir=str(tmp_path),
        algorithm_options=options,
    )

    assert actual == expected
    assert actual.runtime_provenance["implementation"] == "native_service"


def test_adapter_thermal_anomaly_matches_native_raster_service(tmp_path):
    temperatures = np.full((32, 32), 20.0, dtype="<f4")
    temperatures[12:20, 12:20] = 40.0
    source_path = tmp_path / "anomaly.raw"
    temperatures.tofile(source_path)
    options = {"segments": 1, "threshold": 1.0, "type": "Above Mean"}
    source = {"metadata": {"image_width": 32, "image_height": 32}}
    service = ThermalAnomalyService((255, 0, 0), 1, 0, 25, True, options)
    service.max_detected_pixels = algorithms._max_detected_pixel_samples()
    service.max_areas_of_interest = algorithms._observation_limit(None)
    service.max_contour_points = algorithms._max_contour_points()

    native = service.process_temperature_raster(temperatures).areas_of_interest
    expected = _compact_areas_of_interest(native)
    actual = algorithms._run_thermal_algorithm(
        "ThermalAnomaly",
        str(source_path),
        source,
        work_dir=str(tmp_path),
        algorithm_options=options,
    )

    assert actual == expected
    assert actual.runtime_provenance["implementation"] == "native_service"


def test_thermal_residual_provenance_labels_adapter_implementation(tmp_path):
    source_path = tmp_path / "residual.raw"
    np.full((32, 32), 20.0, dtype="<f4").tofile(source_path)

    result = algorithms._run_thermal_algorithm(
        "ThermalResidualAnomaly",
        str(source_path),
        {"metadata": {"image_width": 32, "image_height": 32}},
    )

    assert result.runtime_provenance["implementation"] == "adapter_residual"
    assert result.runtime_provenance["service_version"] == (
        "adapter-thermal-residual-1"
    )


def test_compact_areas_caps_output_and_strips_detected_pixels():
    areas = [
        {"center": [index, index], "radius": 1, "detected_pixels": [[index, index]]}
        for index in range(3)
    ]

    compact = _compact_areas_of_interest(areas, max_observations=2)

    assert len(compact) == 2
    assert compact.available_count == 3
    assert all("detected_pixels" not in area for area in compact)
    assert all("detected_pixels" not in area for area in areas)


def test_compact_areas_preserves_generation_available_count():
    areas = BoundedAreasOfInterest()
    areas.extend(
        {"center": [index, index], "detected_pixels": [[index, index]]}
        for index in range(2)
    )
    areas.available_count = 7

    compact = _compact_areas_of_interest(areas, max_observations=2)

    assert len(compact) == 2
    assert compact.available_count == 7


def test_thermal_areas_preserve_component_temperature_statistics():
    temperatures = np.array(
        [
            [10.0, 10.0, 10.0, 10.0],
            [10.0, 31.0, 34.0, 10.0],
            [10.0, 37.0, 42.0, 10.0],
            [10.0, 10.0, 10.0, 10.0],
        ],
        dtype=np.float32,
    )
    mask = temperatures > 30.0

    areas = algorithms._thermal_areas_of_interest(
        temperatures,
        mask,
        temperatures,
    )

    assert len(areas) == 1
    assert areas[0]["minimum_c"] == 31.0
    assert areas[0]["maximum_c"] == 42.0
    assert areas[0]["mean_c"] == 36.0
    assert areas[0]["temperature"] == 36.0

    compact = _compact_areas_of_interest(areas)
    assert compact[0]["minimum_c"] == 31.0
    assert compact[0]["maximum_c"] == 42.0
    assert compact[0]["mean_c"] == 36.0


def test_thermal_loader_reads_signed_celsius_and_excludes_nodata(tmp_path):
    source_path = tmp_path / "thermal.raw"
    np.array(
        [[-32768, -120], [0, 350]],
        dtype="<i2",
    ).tofile(source_path)

    temperatures = algorithms._load_thermal_raster(
        str(source_path),
        {"metadata": {"image_width": 2, "image_height": 2}},
    )

    assert np.isnan(temperatures[0, 0])
    assert temperatures[0, 1] == -12.0
    assert temperatures[1, 0] == 0.0
    assert temperatures[1, 1] == 35.0


def test_thermal_loader_preserves_float32_and_excludes_nonfinite(tmp_path):
    source_path = tmp_path / "thermal-float.raw"
    np.array(
        [[12.5, np.nan], [np.inf, 35.25]],
        dtype="<f4",
    ).tofile(source_path)

    temperatures = algorithms._load_thermal_raster(
        str(source_path),
        {"metadata": {"image_width": 2, "image_height": 2}},
    )

    assert temperatures[0, 0] == 12.5
    assert np.isnan(temperatures[0, 1])
    assert np.isnan(temperatures[1, 0])
    assert temperatures[1, 1] == 35.25


def test_thermal_detectors_do_not_create_nodata_anomalies(tmp_path):
    source_path = tmp_path / "thermal.raw"
    temperatures = np.full((32, 32), 20, dtype="<i2")
    temperatures[12:20, 12:20] = -32768
    temperatures.tofile(source_path)
    source = {"metadata": {"image_width": 32, "image_height": 32}}

    for algorithm_name in (
        "ThermalResidualAnomaly",
        "ThermalAnomaly",
        "ThermalRange",
    ):
        areas = algorithms._run_thermal_algorithm(
            algorithm_name,
            str(source_path),
            source,
        )
        assert areas == []


def test_run_configures_worker_generation_caps_before_processing(tmp_path, monkeypatch):
    source_path = tmp_path / "source.png"
    source_path.touch()

    class FakeService:
        def __init__(self, *args):
            pass

        def process_image(self, *args):
            assert self.max_detected_pixels == 7
            assert self.max_areas_of_interest == 2
            assert self.max_contour_points == 5
            return SimpleNamespace(error_message=None, areas_of_interest=[])

    monkeypatch.setattr(
        algorithms, "_service_class_for_algorithm", lambda name: FakeService
    )
    monkeypatch.setattr(algorithms.cv2, "imread", lambda path: np.zeros((1, 1, 3)))
    monkeypatch.setenv("ADIAT_MAX_DETECTED_PIXEL_SAMPLES", "7")
    monkeypatch.setenv("ADIAT_MAX_CONTOUR_POINTS", "5")

    result = algorithms.run_adiat_algorithm(
        "MRMap",
        str(source_path),
        {},
        str(tmp_path),
        max_observations=2,
    )

    assert result.available_count == 0


def test_unbounded_artifact_mode_releases_materialized_aois_as_consumed(
    tmp_path,
    monkeypatch,
):
    source_path = tmp_path / "source.png"
    source_path.touch()
    materialized = [
        {
            "center": [index, index],
            "radius": 1,
            "detected_pixels": [[index, index]],
        }
        for index in range(10_000)
    ]

    class FakeService:
        def __init__(self, *args):
            pass

        def process_image(self, *args):
            return SimpleNamespace(error_message=None, areas_of_interest=materialized)

    monkeypatch.setattr(
        algorithms,
        "_service_class_for_algorithm",
        lambda name: FakeService,
    )
    monkeypatch.setattr(
        algorithms.cv2,
        "imread",
        lambda path: np.zeros((1, 1, 3)),
    )

    result = algorithms.run_adiat_algorithm(
        "MRMap",
        str(source_path),
        {},
        str(tmp_path),
        max_observations=-1,
    )

    iterator = iter(result)
    assert next(iterator)["center"] == [0, 0]
    assert materialized[0] is None
    assert next(iterator)["center"] == [1, 1]
    assert materialized[1] is None
    assert sum(1 for _ in iterator) == 9_998
    assert materialized == []
