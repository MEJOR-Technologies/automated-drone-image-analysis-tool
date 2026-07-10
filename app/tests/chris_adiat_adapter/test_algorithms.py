from types import SimpleNamespace

import numpy as np

from algorithms.AlgorithmService import BoundedAreasOfInterest
from chris_adiat_adapter import algorithms
from chris_adiat_adapter.algorithms import _compact_areas_of_interest


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
