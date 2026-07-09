import os
import sys
from pathlib import Path

import cv2


class AlgorithmNotConfigured(RuntimeError):
    """Raised when CHRIS requests an algorithm outside the supported M1 set."""


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


def run_adiat_algorithm(algorithm_name, image_path, source, work_dir):
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
    result = service.process_image(
        img,
        image_path,
        os.path.dirname(image_path) or ".",
        work_dir,
    )
    if getattr(result, "error_message", None):
        raise RuntimeError(result.error_message)
    return result.areas_of_interest or []


def _service_class_for_algorithm(algorithm_name):
    _ensure_app_on_path()
    if algorithm_name == "MRMap":
        from algorithms.images.MRMap.services.MRMapService import MRMapService

        return MRMapService
    if algorithm_name == "RXAnomaly":
        from algorithms.images.RXAnomaly.services.RXAnomalyService import RXAnomalyService

        return RXAnomalyService
    raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")


def _ensure_app_on_path():
    app_path = str(Path(__file__).resolve().parents[1] / "app")
    if app_path not in sys.path:
        sys.path.insert(0, app_path)
