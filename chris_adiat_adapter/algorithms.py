import os
import sys
from pathlib import Path

import cv2

cv2.setNumThreads(1)

DEFAULT_MAX_DETECTED_PIXEL_SAMPLES = 4096
DEFAULT_MAX_CONTOUR_POINTS = 64
DEFAULT_MAX_OBSERVATIONS = 1000
AOI_RESULT_FIELDS = (
    "center",
    "radius",
    "area",
    "contour",
    "confidence",
    "score_type",
    "raw_score",
    "score_method",
)


class AlgorithmNotConfigured(RuntimeError):
    """Raised when CHRIS requests an algorithm outside the supported M1 set."""


class BoundedAois(list):
    def __init__(self, values, *, available_count):
        super().__init__(values)
        self.available_count = available_count


DEFAULT_SERVICE_KWARGS = {
    "identifier": (255, 0, 0),
    "min_area": 1,
    "max_area": 0,
    "aoi_radius": 25,
    "combine_aois": True,
}

DEFAULT_OPTIONS = {
    "MRMap": {
        "segments": 16,
        "threshold": 150,
        "window": 30,
        "colorspace": "LAB",
    },
    "RXAnomaly": {
        "segments": 16,
        "sensitivity": 3,
    },
}


def default_options_for_algorithm(algorithm_name):
    if algorithm_name not in DEFAULT_OPTIONS:
        raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")
    return dict(DEFAULT_OPTIONS[algorithm_name])


def run_adiat_algorithm(
    algorithm_name,
    image_path,
    source,
    work_dir,
    max_observations=None,
):
    service_class = _service_class_for_algorithm(algorithm_name)
    img = cv2.imread(image_path)
    if img is None:
        raise RuntimeError(f"OpenCV could not read source image: {image_path}")

    service = service_class(
        DEFAULT_SERVICE_KWARGS["identifier"],
        DEFAULT_SERVICE_KWARGS["min_area"],
        DEFAULT_SERVICE_KWARGS["max_area"],
        DEFAULT_SERVICE_KWARGS["aoi_radius"],
        DEFAULT_SERVICE_KWARGS["combine_aois"],
        default_options_for_algorithm(algorithm_name),
    )
    service.max_detected_pixels = _max_detected_pixel_samples()
    service.max_areas_of_interest = max(_observation_limit(max_observations), 1)
    service.max_contour_points = _max_contour_points()
    result = service.process_image(
        img,
        image_path,
        os.path.dirname(image_path) or ".",
        work_dir,
    )
    if getattr(result, "error_message", None):
        raise RuntimeError(result.error_message)
    areas_of_interest = result.areas_of_interest
    if areas_of_interest is None:
        areas_of_interest = []
    return _compact_areas_of_interest(
        areas_of_interest,
        max_observations=max_observations,
    )


def _compact_areas_of_interest(areas_of_interest, max_observations=None):
    max_observations = _observation_limit(max_observations)
    retained = []
    available_count = getattr(areas_of_interest, "available_count", None)
    generated_count = 0
    for index, area in enumerate(areas_of_interest):
        generated_count += 1
        if not isinstance(area, dict):
            continue
        compact = {key: area.get(key) for key in AOI_RESULT_FIELDS if key in area}
        area.pop("detected_pixels", None)
        if index < max_observations:
            retained.append(compact)
    if hasattr(areas_of_interest, "clear"):
        areas_of_interest.clear()
    if available_count is None:
        available_count = generated_count
    return BoundedAois(retained, available_count=available_count)


def _max_detected_pixel_samples():
    raw_value = os.getenv(
        "ADIAT_MAX_DETECTED_PIXEL_SAMPLES",
        str(DEFAULT_MAX_DETECTED_PIXEL_SAMPLES),
    )
    try:
        value = int(raw_value)
    except (TypeError, ValueError):
        return DEFAULT_MAX_DETECTED_PIXEL_SAMPLES
    return min(max(value, 1), 16384)


def _max_contour_points():
    raw_value = os.getenv(
        "ADIAT_MAX_CONTOUR_POINTS",
        str(DEFAULT_MAX_CONTOUR_POINTS),
    )
    try:
        value = int(raw_value)
    except (TypeError, ValueError):
        return DEFAULT_MAX_CONTOUR_POINTS
    return min(max(value, 1), 16384)


def _observation_limit(max_observations):
    if max_observations is None:
        return DEFAULT_MAX_OBSERVATIONS
    return max(int(max_observations), 0)


def _service_class_for_algorithm(algorithm_name):
    _ensure_app_on_path()
    if algorithm_name == "MRMap":
        from algorithms.images.MRMap.services.MRMapService import MRMapService

        return MRMapService
    if algorithm_name == "RXAnomaly":
        from algorithms.images.RXAnomaly.services.RXAnomalyService import (
            RXAnomalyService,
        )

        return RXAnomalyService
    raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")


def _ensure_app_on_path():
    app_path = str(Path(__file__).resolve().parents[1] / "app")
    if app_path not in sys.path:
        sys.path.insert(0, app_path)
