import os
import sys
from pathlib import Path

import cv2
import numpy as np

from chris_adiat_adapter import __version__

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
    "temperature",
    "minimum_c",
    "maximum_c",
    "mean_c",
)


class AlgorithmNotConfigured(RuntimeError):
    """Raised when CHRIS requests an algorithm outside the supported M1 set."""


class BoundedAois(list):
    def __init__(self, values, *, available_count, runtime_provenance=None):
        super().__init__(values)
        self.available_count = available_count
        self.runtime_provenance = runtime_provenance


class CompactAoiIterator:
    def __init__(self, areas_of_interest, runtime_provenance=None):
        self.areas_of_interest = areas_of_interest
        self.runtime_provenance = runtime_provenance

    def __iter__(self):
        return _iter_compact_areas_of_interest(self.areas_of_interest)


DEFAULT_SERVICE_KWARGS = {
    "identifier": (255, 0, 0),
    "min_area": 1,
    "max_area": 0,
    "aoi_radius": 25,
    "combine_aois": True,
}

# Person detections are individual findings. Keep the service from combining
# nearby AOIs so each model box remains reviewable as its own observation.
SERVICE_KWARGS_BY_ALGORITHM = {
    "AIPersonDetector": {
        **DEFAULT_SERVICE_KWARGS,
        "combine_aois": False,
    },
}

DEFAULT_OPTIONS = {
    "AIPersonDetector": {
        "person_detector_confidence": 50.0,
        "cpu_only": True,
    },
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
    "ThermalResidualAnomaly": {
        "segments": 16,
        "threshold": 2.0,
    },
    "ThermalAnomaly": {
        "segments": 16,
        "threshold": 2.0,
        "type": "Above or Below Mean",
    },
    "ThermalRange": {
        "minTemp": 30.0,
        "maxTemp": 45.0,
    },
    "HSVColorRange": {
        "selected_color": [255, 0, 0],
        "hue_threshold": 10,
        "saturation_threshold": 30,
        "value_threshold": 30,
    },
}


def default_options_for_algorithm(algorithm_name):
    if algorithm_name not in DEFAULT_OPTIONS:
        raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")
    return dict(DEFAULT_OPTIONS[algorithm_name])


def effective_options_for_algorithm(algorithm_name, overrides=None):
    options = default_options_for_algorithm(algorithm_name)
    if overrides:
        options.update(dict(overrides))
    return options


def run_adiat_algorithm(
    algorithm_name,
    image_path,
    source,
    work_dir=".",
    max_observations=None,
    algorithm_options=None,
):
    options = effective_options_for_algorithm(algorithm_name, algorithm_options)
    if str(source.get("sensor_type") or "").strip().lower() == "thermal":
        return _run_thermal_algorithm(
            algorithm_name,
            image_path,
            source,
            work_dir=work_dir,
            max_observations=max_observations,
            algorithm_options=options,
        )

    service_class = _service_class_for_algorithm(algorithm_name)
    img = cv2.imread(image_path)
    if img is None:
        raise RuntimeError(f"OpenCV could not read source image: {image_path}")

    service_kwargs = SERVICE_KWARGS_BY_ALGORITHM.get(algorithm_name, DEFAULT_SERVICE_KWARGS)
    service = service_class(
        service_kwargs["identifier"],
        service_kwargs["min_area"],
        service_kwargs["max_area"],
        service_kwargs["aoi_radius"],
        service_kwargs["combine_aois"],
        options,
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
    runtime_provenance = {
        "effective_options": options,
        "adapter_version": __version__,
        **(
            service.runtime_provenance()
            if hasattr(service, "runtime_provenance")
            else {"service_version": None}
        ),
    }
    if _unbounded_iterator_requested(max_observations):
        return CompactAoiIterator(areas_of_interest, runtime_provenance)
    return _compact_areas_of_interest(
        areas_of_interest,
        max_observations=max_observations,
        runtime_provenance=runtime_provenance,
    )


def _run_thermal_algorithm(
    algorithm_name,
    image_path,
    source,
    *,
    work_dir=".",
    max_observations=None,
    algorithm_options=None,
):
    options = effective_options_for_algorithm(algorithm_name, algorithm_options)
    temperatures = _load_thermal_raster(image_path, source)
    valid_pixels = np.isfinite(temperatures)
    if not valid_pixels.any():
        return BoundedAois(
            [],
            available_count=0,
            runtime_provenance=_thermal_runtime_provenance(
                algorithm_name, options
            ),
        )
    if algorithm_name == "ThermalResidualAnomaly":
        filled_temperatures = np.where(
            valid_pixels,
            temperatures,
            float(np.nanmedian(temperatures)),
        )
        background = cv2.GaussianBlur(filled_temperatures, (31, 31), 0)
        residual = np.abs(filled_temperatures - background)
        threshold = max(
            float(np.std(residual[valid_pixels]))
            * float(options.get("threshold", 2.0)),
            0.5,
        )
        mask = valid_pixels & (residual >= threshold)
        scores = residual
    elif algorithm_name in {"ThermalAnomaly", "ThermalRange"}:
        return _run_native_thermal_algorithm(
            algorithm_name,
            temperatures,
            image_path,
            work_dir,
            options,
            max_observations=max_observations,
        )
    else:
        raise AlgorithmNotConfigured(f"Unsupported thermal algorithm: {algorithm_name}")

    areas_of_interest = _thermal_areas_of_interest(
        temperatures,
        mask,
        scores,
        max_observations=max_observations,
    )
    runtime_provenance = _thermal_runtime_provenance(algorithm_name, options)
    if _unbounded_iterator_requested(max_observations):
        return CompactAoiIterator(areas_of_interest, runtime_provenance)
    areas_of_interest.runtime_provenance = runtime_provenance
    return areas_of_interest


def _run_native_thermal_algorithm(
    algorithm_name,
    temperatures,
    image_path,
    work_dir,
    options,
    *,
    max_observations=None,
):
    _ensure_app_on_path()
    if algorithm_name == "ThermalAnomaly":
        from algorithms.images.ThermalAnomaly.services.ThermalAnomalyService import (
            ThermalAnomalyService,
        )

        service_class = ThermalAnomalyService
    else:
        from algorithms.images.ThermalRange.services.ThermalRangeService import (
            ThermalRangeService,
        )

        service_class = ThermalRangeService
    service = service_class(
        DEFAULT_SERVICE_KWARGS["identifier"],
        DEFAULT_SERVICE_KWARGS["min_area"],
        DEFAULT_SERVICE_KWARGS["max_area"],
        DEFAULT_SERVICE_KWARGS["aoi_radius"],
        DEFAULT_SERVICE_KWARGS["combine_aois"],
        options,
    )
    service.max_detected_pixels = _max_detected_pixel_samples()
    service.max_areas_of_interest = max(_observation_limit(max_observations), 1)
    service.max_contour_points = _max_contour_points()
    result = service.process_temperature_raster(
        temperatures,
        full_path=image_path,
        input_dir=os.path.dirname(image_path) or ".",
        output_dir=work_dir,
        persist_mask=False,
    )
    if getattr(result, "error_message", None):
        raise RuntimeError(result.error_message)
    areas_of_interest = result.areas_of_interest or []
    runtime_provenance = _thermal_runtime_provenance(
        algorithm_name,
        options,
        service_version=service.SERVICE_VERSION,
    )
    if _unbounded_iterator_requested(max_observations):
        return CompactAoiIterator(areas_of_interest, runtime_provenance)
    return _compact_areas_of_interest(
        areas_of_interest,
        max_observations=max_observations,
        runtime_provenance=runtime_provenance,
    )


def _thermal_runtime_provenance(algorithm_name, options, service_version=None):
    native = algorithm_name in {"ThermalAnomaly", "ThermalRange"}
    return {
        "effective_options": dict(options),
        "adapter_version": __version__,
        "service_version": service_version or (
            "1" if native else "adapter-thermal-residual-1"
        ),
        "implementation": "native_service" if native else "adapter_residual",
        "ai_model_filename": None,
        "ai_model_sha256": None,
        "actual_provider": None,
    }


def _load_thermal_raster(image_path, source):
    metadata = source.get("metadata") or {}
    width = int(metadata.get("image_width") or 0)
    height = int(metadata.get("image_height") or 0)
    if width <= 0 or height <= 0:
        raise RuntimeError("thermal source is missing image dimensions")
    expected_samples = width * height
    size = os.path.getsize(image_path)
    nodata_mask = None
    if size == expected_samples * 2:
        # CHRIS IRP `.raw` derivatives store signed int16 temperatures in
        # deci-degrees Celsius. Convert before detector thresholds and
        # persisted thermal statistics are calculated.
        raw_values = np.fromfile(image_path, dtype="<i2")
        nodata_mask = raw_values == np.iinfo(np.int16).min
        values = raw_values.astype(np.float32) / 10.0
    elif size == expected_samples * 4:
        values = np.fromfile(image_path, dtype="<f4")
    else:
        raise RuntimeError(
            f"thermal raw raster size {size} does not match {width}x{height} temperature samples"
        )
    if values.size != expected_samples:
        raise RuntimeError("thermal raw raster contains an incomplete frame")
    temperatures = values.reshape((height, width)).astype(np.float32, copy=False)
    if nodata_mask is not None:
        temperatures[nodata_mask.reshape((height, width))] = np.nan
    temperatures[~np.isfinite(temperatures)] = np.nan
    return temperatures


def _thermal_areas_of_interest(temperatures, mask, scores, *, max_observations=None):
    mask_u8 = np.asarray(mask, dtype=np.uint8) * 255
    contours, _ = cv2.findContours(mask_u8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    areas = []
    max_contour_points = _max_contour_points()
    for contour in contours:
        area = float(cv2.contourArea(contour))
        if area < 1.0:
            continue
        points = contour.reshape(-1, 2).tolist()
        if len(points) > max_contour_points:
            indices = np.linspace(0, len(points) - 1, max_contour_points, dtype=int)
            points = [points[index] for index in indices]
        (cx, cy), radius = cv2.minEnclosingCircle(contour)
        component_mask = np.zeros(mask_u8.shape, dtype=np.uint8)
        cv2.drawContours(component_mask, [contour], -1, 1, -1)
        component_pixels = (
            component_mask.astype(bool)
            & np.asarray(mask, dtype=bool)
            & np.isfinite(temperatures)
        )
        component_scores = scores[component_pixels]
        component_temps = temperatures[component_pixels]
        raw_score = float(np.nanmax(component_scores)) if component_scores.size else 0.0
        minimum_c = float(np.nanmin(component_temps)) if component_temps.size else None
        maximum_c = float(np.nanmax(component_temps)) if component_temps.size else None
        mean_c = float(np.nanmean(component_temps)) if component_temps.size else None
        areas.append(
            {
                "center": (int(round(cx)), int(round(cy))),
                "radius": int(round(radius)),
                "area": area,
                "contour": points,
                "confidence": min(100.0, raw_score),
                "score_type": "thermal anomaly",
                "raw_score": raw_score,
                "score_method": "temperature residual",
                "temperature": mean_c,
                "minimum_c": minimum_c,
                "maximum_c": maximum_c,
                "mean_c": mean_c,
            }
        )
    areas.sort(key=lambda item: (-(item.get("raw_score") or 0.0), -(item.get("area") or 0.0)))
    return BoundedAois(
        areas[: _observation_limit(max_observations)],
        available_count=len(areas),
    )


def _compact_areas_of_interest(
    areas_of_interest,
    max_observations=None,
    runtime_provenance=None,
):
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
    return BoundedAois(
        retained,
        available_count=available_count,
        runtime_provenance=runtime_provenance,
    )


def _iter_compact_areas_of_interest(areas_of_interest):
    """Yield compact AOIs while releasing each materialized detector result."""
    try:
        for index, area in enumerate(areas_of_interest):
            compact = None
            if isinstance(area, dict):
                compact = {
                    key: area.get(key)
                    for key in AOI_RESULT_FIELDS
                    if key in area
                }
                area.pop("detected_pixels", None)
            if hasattr(areas_of_interest, "__setitem__"):
                areas_of_interest[index] = None
            if compact is not None:
                yield compact
    finally:
        if hasattr(areas_of_interest, "clear"):
            areas_of_interest.clear()


def _unbounded_iterator_requested(max_observations):
    return max_observations is not None and int(max_observations) < 0


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
    if int(max_observations) < 0:
        # Parquet fan-out persists one source-detector result incrementally, so
        # it does not need the legacy inline-response observation ceiling.
        return sys.maxsize
    return max(int(max_observations), 0)


def _service_class_for_algorithm(algorithm_name):
    _ensure_app_on_path()
    if algorithm_name == "AIPersonDetector":
        from algorithms.images.AIPersonDetector.services.AIPersonDetectorService import (
            AIPersonDetectorService,
        )

        return AIPersonDetectorService
    if algorithm_name == "MRMap":
        from algorithms.images.MRMap.services.MRMapService import MRMapService

        return MRMapService
    if algorithm_name == "RXAnomaly":
        from algorithms.images.RXAnomaly.services.RXAnomalyService import (
            RXAnomalyService,
        )

        return RXAnomalyService
    if algorithm_name == "HSVColorRange":
        from algorithms.images.HSVColorRange.services.HSVColorRangeService import (
            HSVColorRangeService,
        )

        return HSVColorRangeService
    raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")


def _ensure_app_on_path():
    app_path = str(Path(__file__).resolve().parents[1] / "app")
    if app_path not in sys.path:
        sys.path.insert(0, app_path)
