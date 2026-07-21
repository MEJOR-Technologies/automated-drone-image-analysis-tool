import numpy as np
import cv2

from algorithms.AlgorithmService import AlgorithmService


def _service():
    service = AlgorithmService.__new__(AlgorithmService)
    service.max_detected_pixels = None
    service.max_areas_of_interest = None
    service.max_contour_points = None
    service.min_area = 1
    service.max_area = 0
    service.aoi_radius = 0
    service.combine_aois = False
    return service


def test_bounded_sampling_preserves_full_pixel_area():
    mask = np.ones((20, 30), dtype=np.uint8)
    service = _service()
    service.max_detected_pixels = 25

    pixels, area = service.detected_pixels_for_aoi(mask)

    assert area == 600
    assert len(pixels) <= 25
    assert all(0 <= x < 30 and 0 <= y < 20 for x, y in pixels)


def test_bounded_sampling_selects_representative_sparse_mask_hits(monkeypatch):
    mask = np.zeros((101, 103), dtype=np.uint8)
    hits = [(1, 2), (17, 31), (52, 7), (76, 99), (100, 55)]
    for y, x in hits:
        mask[y, x] = 255
    service = _service()
    service.max_detected_pixels = 3
    monkeypatch.setattr(
        np,
        "argwhere",
        lambda *args, **kwargs: (_ for _ in ()).throw(
            AssertionError("bounded sampling materialized every coordinate")
        ),
    )

    pixels, area = service.detected_pixels_for_aoi(mask)

    assert area == len(hits)
    assert len(pixels) == 3
    assert all(mask[y, x] for x, y in pixels)
    assert pixels[0] == [2, 1]
    assert pixels[-1] == [55, 100]


def test_desktop_default_keeps_full_pixel_sampling():
    mask = np.ones((4, 5), dtype=np.uint8)
    service = _service()

    pixels, area = service.detected_pixels_for_aoi(mask)

    assert area == 20
    assert len(pixels) == area


def test_worker_caps_aois_and_contours_during_generation():
    contours = [
        cv2.ellipse2Poly((10 + index * 20, 10), (6, 6), 0, 0, 360, 10).reshape(-1, 1, 2)
        for index in range(4)
    ]
    service = _service()
    service.combine_aois = True
    service.max_areas_of_interest = 2
    service.max_contour_points = 3
    detected_pixel_calls = 0
    detected_pixels_for_aoi = service.detected_pixels_for_aoi

    def count_detected_pixel_call(mask):
        nonlocal detected_pixel_calls
        detected_pixel_calls += 1
        return detected_pixels_for_aoi(mask)

    service.detected_pixels_for_aoi = count_detected_pixel_call

    areas, base_contour_count = service.identify_areas_of_interest((30, 100), contours)

    assert base_contour_count == 4
    assert areas.available_count == 4
    assert len(areas) == 2
    assert all(len(area["contour"]) == 3 for area in areas)
    assert detected_pixel_calls == 2


def test_desktop_default_keeps_all_aois_and_contour_points():
    contour = cv2.ellipse2Poly((20, 20), (10, 10), 0, 0, 360, 10).reshape(-1, 1, 2)
    service = _service()

    areas, base_contour_count = service.identify_areas_of_interest((50, 50), [contour])

    assert base_contour_count == 1
    assert len(areas) == 1
    assert areas[0]["contour"] == contour.reshape(-1, 2).tolist()
