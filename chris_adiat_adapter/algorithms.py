import math
import os
import sys
from pathlib import Path

import cv2
import numpy as np

from chris_adiat_adapter import __version__
from chris_adiat_adapter.schemas import DETECTOR_CONTROLS_CONTRACT_VERSION

cv2.setNumThreads(1)

DEFAULT_MAX_DETECTED_PIXEL_SAMPLES = 4096
DEFAULT_MAX_CONTOUR_POINTS = 64
DEFAULT_MAX_OBSERVATIONS = 1000
NATIVE_THERMAL_RESIDUAL_SERVICE_VERSION = "upstream-00bf118f-thermal-residual-1"
MAX_COLOR_SAMPLES = 16
MIN_PROCESSING_RESOLUTION_PERCENT = 10
SUPPORTED_SEGMENT_COUNTS = frozenset({1, 2, 4, 6, 9, 16, 25, 36})
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

DETECTION_SIZING_VERSION = 1

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
    "ColorRange": {"color_ranges": []},
    "MatchedFilter": {"color_configs": []},
}


def default_options_for_algorithm(algorithm_name):
    if algorithm_name not in DEFAULT_OPTIONS:
        raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")
    return dict(DEFAULT_OPTIONS[algorithm_name])


def effective_options_for_algorithm(algorithm_name, overrides=None):
    overrides = dict(overrides or {})
    if "processing_resolution_percent" in overrides:
        _validate_v2_detector_options(algorithm_name, overrides)

    if algorithm_name == "ThermalResidualAnomaly" and "sensitivity" in overrides:
        # The wizard's sensitivity is a different, versioned algorithm contract.
        # Do not inject the legacy std-dev threshold into its delta-T settings.
        return {"sensitivity": 5, "type": "Both", **overrides}
    options = default_options_for_algorithm(algorithm_name)
    if overrides:
        if algorithm_name == "HSVColorRange" and "hsv_configs" in overrides:
            legacy_fields = {
                "selected_color",
                "hue_threshold",
                "saturation_threshold",
                "value_threshold",
                "hsv_ranges",
                "hsv_window",
            }
            if legacy_fields.intersection(overrides):
                raise ValueError(
                    "HSVColorRange must use either hsv_configs or legacy options"
                )
            options = {}
        options.update(overrides)
    if algorithm_name in {"ColorRange", "MatchedFilter", "HSVColorRange"}:
        _validate_color_algorithm_options(algorithm_name, options)
    return options


def _validate_v2_detector_options(algorithm_name, options):
    """Validate the explicit v2 control contract before native services run."""
    schemas = {
        "AIPersonDetector": (
            {"person_detector_confidence", "cpu_only"},
            {"person_detector_confidence", "cpu_only"},
        ),
        "MRMap": (
            {"segments", "threshold", "window", "colorspace"},
            {"segments", "threshold", "window", "colorspace"},
        ),
        "RXAnomaly": (
            {"segments", "sensitivity"},
            {"segments", "sensitivity"},
        ),
        "ThermalAnomaly": (
            {"segments", "threshold", "type"},
            {"segments", "threshold", "type"},
        ),
        "ThermalResidualAnomaly": (
            {"sensitivity", "type"},
            {"sensitivity", "type"},
        ),
        "ThermalRange": (
            {"minTemp", "maxTemp"},
            {"minTemp", "maxTemp"},
        ),
        "HSVColorRange": ({"hsv_configs"}, {"hsv_configs"}),
        "ColorRange": ({"color_ranges"}, {"color_ranges"}),
        "MatchedFilter": ({"color_configs"}, {"color_configs"}),
    }
    if algorithm_name not in schemas:
        raise AlgorithmNotConfigured(
            f"Unsupported ADIAT algorithm: {algorithm_name}"
        )

    required, allowed = schemas[algorithm_name]
    allowed = set(allowed) | {"processing_resolution_percent"}
    unknown = sorted(set(options) - allowed)
    if unknown:
        raise ValueError(
            f"{algorithm_name} v2 has unsupported option(s): {', '.join(unknown)}"
        )
    missing = sorted(required - set(options))
    if missing:
        raise ValueError(
            f"{algorithm_name} v2 is missing required option(s): {', '.join(missing)}"
        )
    _processing_resolution_percent(options)

    if algorithm_name == "AIPersonDetector":
        confidence = options["person_detector_confidence"]
        if (
            isinstance(confidence, bool)
            or not isinstance(confidence, (int, float))
            or not math.isfinite(float(confidence))
            or not 0 <= confidence <= 100
        ):
            raise ValueError("AIPersonDetector person_detector_confidence must be in [0, 100]")
        if not isinstance(options["cpu_only"], bool):
            raise ValueError("AIPersonDetector cpu_only must be a boolean")
    elif algorithm_name in {"MRMap", "RXAnomaly", "ThermalAnomaly"}:
        _validate_segment_count(options["segments"], algorithm_name)
        if algorithm_name == "MRMap":
            _validate_integer_option(options["threshold"], "MRMap threshold", 1, 200)
            _validate_integer_option(options["window"], "MRMap window", 1, 10)
            if options["colorspace"] not in {"LAB", "RGB", "HSV"}:
                raise ValueError("MRMap colorspace must be LAB, RGB, or HSV")
        elif algorithm_name == "RXAnomaly":
            _validate_integer_option(options["sensitivity"], "RXAnomaly sensitivity", 1, 10)
        else:
            threshold = _validate_finite_number(
                options["threshold"], "ThermalAnomaly threshold"
            )
            if not 0 <= threshold <= 7:
                raise ValueError("ThermalAnomaly threshold must be in [0, 7]")
            if options["type"] not in {
                "Above or Below Mean",
                "Above Mean",
                "Below Mean",
            }:
                raise ValueError(
                    "ThermalAnomaly type must be Above or Below Mean, Above Mean, or Below Mean"
                )
    elif algorithm_name == "ThermalResidualAnomaly":
        _validate_integer_option(
            options["sensitivity"], "ThermalResidualAnomaly sensitivity", 1, 10
        )
        if options["type"] not in {"Hot", "Cold", "Both"}:
            raise ValueError("ThermalResidualAnomaly type must be Hot, Cold, or Both")
    elif algorithm_name == "ThermalRange":
        minimum = _validate_finite_number(options["minTemp"], "ThermalRange minTemp")
        maximum = _validate_finite_number(options["maxTemp"], "ThermalRange maxTemp")
        if minimum > maximum:
            raise ValueError("ThermalRange minTemp must not exceed maxTemp")


def _validate_segment_count(value, algorithm_name):
    if (
        isinstance(value, bool)
        or not isinstance(value, int)
        or value not in SUPPORTED_SEGMENT_COUNTS
    ):
        choices = ", ".join(str(value) for value in sorted(SUPPORTED_SEGMENT_COUNTS))
        raise ValueError(f"{algorithm_name} segments must be one of: {choices}")


def _validate_integer_option(value, label, minimum, maximum):
    if isinstance(value, bool) or not isinstance(value, int) or not minimum <= value <= maximum:
        raise ValueError(f"{label} must be an integer in [{minimum}, {maximum}]")


def _validate_finite_number(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"{label} must be a finite number")
    try:
        parsed = float(value)
    except (OverflowError, TypeError, ValueError):
        raise ValueError(f"{label} must be a finite number") from None
    if not math.isfinite(parsed):
        raise ValueError(f"{label} must be a finite number")
    return parsed


def _validate_color_algorithm_options(algorithm_name, options):
    """Reject malformed native color-service options before ADIAT can fallback."""
    allowed_by_algorithm = {
        "ColorRange": {"color_ranges", "processing_resolution_percent"},
        "MatchedFilter": {"color_configs", "processing_resolution_percent"},
        "HSVColorRange": {
            "selected_color",
            "hue_threshold",
            "saturation_threshold",
            "value_threshold",
            "hsv_configs",
            "hsv_ranges",
            "hsv_window",
            "processing_resolution_percent",
        },
    }
    unknown = sorted(set(options) - allowed_by_algorithm[algorithm_name])
    if unknown:
        raise ValueError(
            f"{algorithm_name} has unsupported option(s): {', '.join(unknown)}"
        )
    if "processing_resolution_percent" in options:
        _processing_resolution_percent(options)

    if algorithm_name == "ColorRange":
        ranges = options.get("color_ranges")
        _validate_sample_list(ranges, "ColorRange color_ranges")
        for index, config in enumerate(ranges):
            if not isinstance(config, dict) or set(config) != {"color_range"}:
                raise ValueError(
                    f"ColorRange color_ranges[{index}] must contain only color_range"
                )
            bounds = config["color_range"]
            if not isinstance(bounds, (list, tuple)) or len(bounds) != 2:
                raise ValueError(
                    f"ColorRange color_ranges[{index}].color_range must have RGB minimum and maximum"
                )
            minimum = _validate_rgb(bounds[0], f"ColorRange color_ranges[{index}] minimum")
            maximum = _validate_rgb(bounds[1], f"ColorRange color_ranges[{index}] maximum")
            if any(low > high for low, high in zip(minimum, maximum)):
                raise ValueError(
                    f"ColorRange color_ranges[{index}] minimum must not exceed maximum"
                )
        return

    if algorithm_name == "MatchedFilter":
        configs = options.get("color_configs")
        _validate_sample_list(configs, "MatchedFilter color_configs")
        for index, config in enumerate(configs):
            if not isinstance(config, dict) or set(config) != {
                "selected_color",
                "match_filter_threshold",
            }:
                raise ValueError(
                    f"MatchedFilter color_configs[{index}] must contain selected_color and match_filter_threshold only"
                )
            _validate_rgb(
                config["selected_color"],
                f"MatchedFilter color_configs[{index}].selected_color",
            )
            _validate_unit_interval(
                config["match_filter_threshold"],
                f"MatchedFilter color_configs[{index}].match_filter_threshold",
            )
        return

    if "hsv_configs" in options:
        if any(
            key in options
            for key in (
                "selected_color",
                "hue_threshold",
                "saturation_threshold",
                "value_threshold",
                "hsv_ranges",
                "hsv_window",
            )
        ):
            raise ValueError("HSVColorRange must use either hsv_configs or legacy options")
        configs = options["hsv_configs"]
        _validate_sample_list(configs, "HSVColorRange hsv_configs")
        expected_range_keys = {
            "h",
            "s",
            "v",
            "h_minus",
            "h_plus",
            "s_minus",
            "s_plus",
            "v_minus",
            "v_plus",
        }
        for index, config in enumerate(configs):
            if not isinstance(config, dict) or set(config) != {
                "selected_color",
                "hsv_ranges",
            }:
                raise ValueError(
                    f"HSVColorRange hsv_configs[{index}] must contain selected_color and hsv_ranges only"
                )
            _validate_rgb(
                config["selected_color"],
                f"HSVColorRange hsv_configs[{index}].selected_color",
            )
            hsv_ranges = config["hsv_ranges"]
            if not isinstance(hsv_ranges, dict) or set(hsv_ranges) != expected_range_keys:
                raise ValueError(
                    f"HSVColorRange hsv_configs[{index}].hsv_ranges has invalid fields"
                )
            for key, value in hsv_ranges.items():
                _validate_unit_interval(
                    value, f"HSVColorRange hsv_configs[{index}].hsv_ranges.{key}"
                )
        return

    if "hsv_configs" in options:
        raise ValueError("HSVColorRange hsv_configs must be explicitly configured")
    _validate_rgb(options.get("selected_color"), "HSVColorRange selected_color")
    for key, maximum in (
        ("hue_threshold", 179),
        ("saturation_threshold", 255),
        ("value_threshold", 255),
    ):
        value = options.get(key)
        if isinstance(value, bool) or not isinstance(value, int) or not 0 <= value <= maximum:
            raise ValueError(f"HSVColorRange {key} must be an integer in [0, {maximum}]")
    if "hsv_ranges" in options and not isinstance(options["hsv_ranges"], dict):
        raise ValueError("HSVColorRange hsv_ranges must be an object")
    if "hsv_window" in options and not isinstance(options["hsv_window"], dict):
        raise ValueError("HSVColorRange hsv_window must be an object")


def _validate_sample_list(value, label):
    if not isinstance(value, list) or not 1 <= len(value) <= MAX_COLOR_SAMPLES:
        raise ValueError(f"{label} must contain between 1 and {MAX_COLOR_SAMPLES} entries")


def _validate_rgb(value, label):
    if not isinstance(value, (list, tuple)) or len(value) != 3:
        raise ValueError(f"{label} must be an RGB triple")
    parsed = []
    for channel in value:
        if isinstance(channel, bool) or not isinstance(channel, int) or not 0 <= channel <= 255:
            raise ValueError(f"{label} channels must be uint8 integers")
        parsed.append(channel)
    return parsed


def _validate_unit_interval(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"{label} must be a number in [0, 1]")
    try:
        parsed = float(value)
    except (OverflowError, TypeError, ValueError):
        raise ValueError(f"{label} must be a finite number in [0, 1]") from None
    if not math.isfinite(parsed) or not 0 <= parsed <= 1:
        raise ValueError(f"{label} must be a finite number in [0, 1]")


def _processing_resolution_percent(options):
    return _validate_processing_resolution_value(
        options.get("processing_resolution_percent", 100)
    )


def _validate_processing_resolution_value(value):
    if (
        isinstance(value, bool)
        or not isinstance(value, int)
        or not MIN_PROCESSING_RESOLUTION_PERCENT <= value <= 100
    ):
        raise ValueError(
            f"processing_resolution_percent must be an integer in [{MIN_PROCESSING_RESOLUTION_PERCENT}, 100]"
        )
    return value


def effective_area_limits_for_source(source):
    """Resolve validated per-photo pixel-area limits and their audit record."""
    metadata = source.get("metadata") or {}
    if not isinstance(metadata, dict):
        raise ValueError("source metadata must be an object")
    sizing = metadata.get("detection_sizing")
    defaults = {
        "min_area": DEFAULT_SERVICE_KWARGS["min_area"],
        "max_area": DEFAULT_SERVICE_KWARGS["max_area"],
    }
    if sizing is None and "detection_sizing" not in metadata:
        return {
            **defaults,
            "runtime_provenance": {
                "version": None,
                "status": "absent",
                "applied": False,
                "min_area_pixels": defaults["min_area"],
                "max_area_pixels": defaults["max_area"],
                "provenance": {},
            },
        }
    if not isinstance(sizing, dict):
        raise ValueError("source detection_sizing must be an object")

    version = sizing.get("version")
    status = sizing.get("status")
    if (
        isinstance(version, bool)
        or not isinstance(version, int)
        or version != DETECTION_SIZING_VERSION
    ):
        raise ValueError(f"unsupported source detection_sizing version: {version!r}")
    provenance = sizing.get("provenance", {})
    if not isinstance(provenance, dict):
        raise ValueError("source detection_sizing provenance must be an object")

    if status == "unavailable":
        min_area = defaults["min_area"]
        max_area = defaults["max_area"]
        provenance_max_area = defaults["max_area"]
        applied = False
    elif status == "ready":
        min_area = _positive_area_limit(sizing.get("min_area_pixels"), "minimum")
        if "max_area_pixels" not in sizing:
            raise ValueError(
                "source detection_sizing maximum area must be a positive number or null"
            )
        if sizing["max_area_pixels"] is None:
            # ADIAT's native services use zero as the no-maximum sentinel.
            max_area = 0
            provenance_max_area = None
        else:
            max_area = _positive_area_limit(sizing["max_area_pixels"], "maximum")
            provenance_max_area = max_area
            if min_area > max_area:
                raise ValueError(
                    "source detection_sizing minimum area exceeds maximum area"
                )
        applied = True
    else:
        raise ValueError(f"unsupported source detection_sizing status: {status!r}")

    return {
        "min_area": min_area,
        "max_area": max_area,
        "runtime_provenance": {
            "version": version,
            "status": status,
            "applied": applied,
            "min_area_pixels": min_area,
            "max_area_pixels": provenance_max_area,
            "provenance": dict(provenance),
        },
    }


def _positive_area_limit(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(
            f"source detection_sizing {label} area must be a positive number"
        )
    try:
        parsed = float(value)
    except OverflowError as exc:
        raise ValueError(
            f"source detection_sizing {label} area must be finite"
        ) from exc
    if not math.isfinite(parsed) or parsed <= 0:
        raise ValueError(
            f"source detection_sizing {label} area must be a positive finite number"
        )
    return parsed


def _resize_dimensions(width, height, percent):
    scale = percent / 100.0
    return max(1, int(round(width * scale))), max(1, int(round(height * scale)))


def _resize_for_processing(image, percent):
    height, width = image.shape[:2]
    target_width, target_height = _resize_dimensions(width, height, percent)
    if (target_width, target_height) == (width, height):
        return image, 1.0, 1.0
    resized = cv2.resize(
        image,
        (target_width, target_height),
        interpolation=cv2.INTER_AREA,
    )
    return resized, target_width / width, target_height / height


def _resize_thermal_for_processing(temperatures, percent):
    height, width = temperatures.shape[:2]
    target_width, target_height = _resize_dimensions(width, height, percent)
    if (target_width, target_height) == (width, height):
        return temperatures, 1.0, 1.0

    valid = np.isfinite(temperatures)
    weights = cv2.resize(
        valid.astype(np.float32),
        (target_width, target_height),
        interpolation=cv2.INTER_AREA,
    )
    weighted_values = cv2.resize(
        np.where(valid, temperatures, 0.0).astype(np.float32),
        (target_width, target_height),
        interpolation=cv2.INTER_AREA,
    )
    resized = np.full((target_height, target_width), np.nan, dtype=np.float32)
    np.divide(weighted_values, weights, out=resized, where=weights > 0)
    return resized, target_width / width, target_height / height


def _scale_area_limits_for_processing(area_limits, scale_x, scale_y):
    pixel_area_scale = float(scale_x * scale_y)
    source_min_area = float(area_limits["min_area"])
    source_max_area = area_limits["max_area"]
    unbounded_maximum = (
        area_limits["runtime_provenance"].get("status") == "ready"
        and area_limits["runtime_provenance"].get("max_area_pixels") is None
    )
    processing_min_area = source_min_area * pixel_area_scale
    processing_max_area = (
        0
        if source_max_area in (0, None)
        else float(source_max_area) * pixel_area_scale
    )
    runtime_provenance = dict(area_limits["runtime_provenance"])
    runtime_provenance.update(
        {
            "processing_min_area_pixels": processing_min_area,
            "processing_max_area_pixels": (
                None if unbounded_maximum else processing_max_area
            ),
            "processing_pixel_area_scale": pixel_area_scale,
        }
    )
    return {
        "min_area": processing_min_area,
        "max_area": processing_max_area,
        "runtime_provenance": runtime_provenance,
    }


def _processing_resolution_provenance(
    percent,
    source_width,
    source_height,
    processing_width,
    processing_height,
    scale_x,
    scale_y,
):
    return {
        "requested_percent": percent,
        "source_width": int(source_width),
        "source_height": int(source_height),
        "processing_width": int(processing_width),
        "processing_height": int(processing_height),
        "scale_x": float(scale_x),
        "scale_y": float(scale_y),
        "pixel_area_scale": float(scale_x * scale_y),
    }


def _scale_aoi_radius(radius, scale_x, scale_y):
    if scale_x == 1.0 and scale_y == 1.0:
        return radius
    return max(0, int(round(radius * min(scale_x, scale_y))))


def _source_coordinate(value, scale, upper_bound):
    mapped = int(round((float(value) + 0.5) / scale - 0.5))
    return min(max(mapped, 0), max(upper_bound - 1, 0))


def _transform_aois_to_source_resolution(
    areas_of_interest, source_width, source_height, scale_x, scale_y
):
    if scale_x == 1.0 and scale_y == 1.0:
        return areas_of_interest
    if isinstance(areas_of_interest, CompactAoiIterator):
        values = areas_of_interest.areas_of_interest
    else:
        values = areas_of_interest
    for aoi in values or []:
        center = aoi.get("center")
        if center and len(center) >= 2:
            aoi["center"] = (
                _source_coordinate(center[0], scale_x, source_width),
                _source_coordinate(center[1], scale_y, source_height),
            )
        if "radius" in aoi:
            aoi["radius"] = int(
                round(float(aoi["radius"]) * max(1.0 / scale_x, 1.0 / scale_y))
            )
        contour = aoi.get("contour")
        if contour:
            aoi["contour"] = [
                [
                    _source_coordinate(point[0], scale_x, source_width),
                    _source_coordinate(point[1], scale_y, source_height),
                ]
                for point in contour
            ]
        detected_pixels = aoi.get("detected_pixels")
        if detected_pixels:
            aoi["detected_pixels"] = [
                [
                    _source_coordinate(point[0], scale_x, source_width),
                    _source_coordinate(point[1], scale_y, source_height),
                ]
                for point in detected_pixels
            ]
        if "area" in aoi:
            aoi["area"] = max(
                1, int(round(float(aoi["area"]) / (scale_x * scale_y)))
            )
    return areas_of_interest


def _transform_result_aois(result, source_width, source_height, scale_x, scale_y):
    areas_of_interest = getattr(result, "areas_of_interest", result)
    _transform_aois_to_source_resolution(
        areas_of_interest, source_width, source_height, scale_x, scale_y
    )
    if hasattr(result, "areas_of_interest"):
        result.areas_of_interest = areas_of_interest
    return result


def _attach_processing_provenance(
    result,
    area_limits,
    effective_options,
    processing_resolution_percent,
    source_width,
    source_height,
    processing_width,
    processing_height,
    scale_x,
    scale_y,
):
    runtime_provenance = dict(getattr(result, "runtime_provenance", None) or {})
    runtime_provenance.update(
        {
            "effective_options": dict(effective_options),
            "detection_sizing": area_limits["runtime_provenance"],
            "processing_resolution": _processing_resolution_provenance(
                processing_resolution_percent,
                source_width,
                source_height,
                processing_width,
                processing_height,
                scale_x,
                scale_y,
            ),
        }
    )
    result.runtime_provenance = runtime_provenance
    return result


def run_adiat_algorithm(
    algorithm_name,
    image_path,
    source,
    work_dir=".",
    max_observations=None,
    algorithm_options=None,
):
    options = effective_options_for_algorithm(algorithm_name, algorithm_options)
    area_limits = effective_area_limits_for_source(source)
    processing_resolution_percent = _processing_resolution_percent(options)
    native_options = dict(options)
    native_options.pop("processing_resolution_percent", None)
    if str(source.get("sensor_type") or "").strip().lower() == "thermal":
        return _run_thermal_algorithm(
            algorithm_name,
            image_path,
            source,
            work_dir=work_dir,
            max_observations=max_observations,
            algorithm_options=native_options,
            area_limits=area_limits,
            processing_resolution_percent=processing_resolution_percent,
            effective_options=options,
        )

    service_class = _service_class_for_algorithm(algorithm_name)
    img = cv2.imread(image_path)
    if img is None:
        raise RuntimeError(f"OpenCV could not read source image: {image_path}")
    source_height, source_width = img.shape[:2]
    processing_img, scale_x, scale_y = _resize_for_processing(
        img, processing_resolution_percent
    )
    processing_area_limits = _scale_area_limits_for_processing(
        area_limits, scale_x, scale_y
    )

    service_kwargs = SERVICE_KWARGS_BY_ALGORITHM.get(
        algorithm_name, DEFAULT_SERVICE_KWARGS
    )
    service = service_class(
        service_kwargs["identifier"],
        processing_area_limits["min_area"],
        processing_area_limits["max_area"],
        _scale_aoi_radius(service_kwargs["aoi_radius"], scale_x, scale_y),
        service_kwargs["combine_aois"],
        native_options,
    )
    service.max_detected_pixels = _max_detected_pixel_samples()
    service.max_areas_of_interest = max(_observation_limit(max_observations), 1)
    service.max_contour_points = _max_contour_points()
    result = service.process_image(
        processing_img,
        image_path,
        os.path.dirname(image_path) or ".",
        work_dir,
    )
    if getattr(result, "error_message", None):
        raise RuntimeError(result.error_message)
    areas_of_interest = result.areas_of_interest
    if areas_of_interest is None:
        areas_of_interest = []
    areas_of_interest = _transform_aois_to_source_resolution(
        areas_of_interest,
        source_width,
        source_height,
        scale_x,
        scale_y,
    )
    runtime_provenance = {
        "detector_controls_contract_version": DETECTOR_CONTROLS_CONTRACT_VERSION,
        "effective_options": options,
        "processing_resolution": _processing_resolution_provenance(
            processing_resolution_percent,
            source_width,
            source_height,
            processing_img.shape[1],
            processing_img.shape[0],
            scale_x,
            scale_y,
        ),
        "detection_sizing": processing_area_limits["runtime_provenance"],
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
    area_limits=None,
    processing_resolution_percent=None,
    effective_options=None,
):
    options = effective_options or effective_options_for_algorithm(
        algorithm_name, algorithm_options
    )
    processing_resolution_percent = (
        _processing_resolution_percent(options)
        if processing_resolution_percent is None
        else _validate_processing_resolution_value(processing_resolution_percent)
    )
    native_options = dict(options)
    native_options.pop("processing_resolution_percent", None)
    area_limits = area_limits or effective_area_limits_for_source(source)
    temperatures = _load_thermal_raster(image_path, source)
    source_height, source_width = temperatures.shape[:2]
    temperatures, scale_x, scale_y = _resize_thermal_for_processing(
        temperatures, processing_resolution_percent
    )
    processing_area_limits = _scale_area_limits_for_processing(
        area_limits, scale_x, scale_y
    )
    valid_pixels = np.isfinite(temperatures)
    if not valid_pixels.any():
        return _attach_processing_provenance(
            BoundedAois(
                [],
                available_count=0,
                runtime_provenance=_thermal_runtime_provenance(
                    algorithm_name,
                    options,
                    area_limits=processing_area_limits,
                ),
            ),
            processing_area_limits,
            options,
            processing_resolution_percent,
            source_width,
            source_height,
            temperatures.shape[1],
            temperatures.shape[0],
            scale_x,
            scale_y,
        )
    if algorithm_name == "ThermalResidualAnomaly":
        if "sensitivity" in native_options:
            result = _run_native_thermal_algorithm(
                algorithm_name,
                temperatures,
                image_path,
                work_dir,
                native_options,
                max_observations=max_observations,
                area_limits=processing_area_limits,
                scale_x=scale_x,
                scale_y=scale_y,
            )
            return _attach_processing_provenance(
                _transform_result_aois(
                    result, source_width, source_height, scale_x, scale_y
                ),
                processing_area_limits,
                options,
                processing_resolution_percent,
                source_width,
                source_height,
                temperatures.shape[1],
                temperatures.shape[0],
                scale_x,
                scale_y,
            )
        filled_temperatures = np.where(
            valid_pixels,
            temperatures,
            float(np.nanmedian(temperatures)),
        )
        background = cv2.GaussianBlur(filled_temperatures, (31, 31), 0)
        residual = np.abs(filled_temperatures - background)
        threshold = max(
            float(np.std(residual[valid_pixels]))
            * float(native_options.get("threshold", 2.0)),
            0.5,
        )
        mask = valid_pixels & (residual >= threshold)
        scores = residual
    elif algorithm_name in {"ThermalAnomaly", "ThermalRange"}:
        result = _run_native_thermal_algorithm(
            algorithm_name,
            temperatures,
            image_path,
            work_dir,
            native_options,
            max_observations=max_observations,
            area_limits=processing_area_limits,
            scale_x=scale_x,
            scale_y=scale_y,
        )
        return _attach_processing_provenance(
            _transform_result_aois(
                result, source_width, source_height, scale_x, scale_y
            ),
            processing_area_limits,
            options,
            processing_resolution_percent,
            source_width,
            source_height,
            temperatures.shape[1],
            temperatures.shape[0],
            scale_x,
            scale_y,
        )
    else:
        raise AlgorithmNotConfigured(f"Unsupported thermal algorithm: {algorithm_name}")

    areas_of_interest = _thermal_areas_of_interest(
        temperatures,
        mask,
        scores,
        max_observations=max_observations,
        min_area=processing_area_limits["min_area"],
        max_area=processing_area_limits["max_area"],
    )
    areas_of_interest = _transform_aois_to_source_resolution(
        areas_of_interest, source_width, source_height, scale_x, scale_y
    )
    runtime_provenance = _thermal_runtime_provenance(
        algorithm_name, options, area_limits=processing_area_limits
    )
    runtime_provenance["processing_resolution"] = _processing_resolution_provenance(
        processing_resolution_percent,
        source_width,
        source_height,
        temperatures.shape[1],
        temperatures.shape[0],
        scale_x,
        scale_y,
    )
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
    area_limits=None,
    scale_x=1.0,
    scale_y=1.0,
):
    _ensure_app_on_path()
    if algorithm_name == "ThermalAnomaly":
        from algorithms.images.ThermalAnomaly.services.ThermalAnomalyService import (
            ThermalAnomalyService,
        )

        service_class = ThermalAnomalyService
    elif algorithm_name == "ThermalResidualAnomaly":
        from chris_adiat_adapter.native_thermal_residual import (
            ThermalResidualAnomalyService,
        )

        service_class = ThermalResidualAnomalyService
    else:
        from algorithms.images.ThermalRange.services.ThermalRangeService import (
            ThermalRangeService,
        )

        service_class = ThermalRangeService
    service = service_class(
        DEFAULT_SERVICE_KWARGS["identifier"],
        area_limits["min_area"],
        area_limits["max_area"],
        _scale_aoi_radius(DEFAULT_SERVICE_KWARGS["aoi_radius"], scale_x, scale_y),
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
        area_limits=area_limits,
    )
    if _unbounded_iterator_requested(max_observations):
        return CompactAoiIterator(areas_of_interest, runtime_provenance)
    return _compact_areas_of_interest(
        areas_of_interest,
        max_observations=max_observations,
        runtime_provenance=runtime_provenance,
    )


def _thermal_runtime_provenance(
    algorithm_name, options, service_version=None, area_limits=None
):
    native = algorithm_name in {"ThermalAnomaly", "ThermalRange"} or (
        algorithm_name == "ThermalResidualAnomaly" and "sensitivity" in options
    )
    provenance = {
        "detector_controls_contract_version": DETECTOR_CONTROLS_CONTRACT_VERSION,
        "effective_options": dict(options),
        "adapter_version": __version__,
        "service_version": service_version
        or (
            NATIVE_THERMAL_RESIDUAL_SERVICE_VERSION
            if native and algorithm_name == "ThermalResidualAnomaly"
            else "1"
            if native
            else "adapter-thermal-residual-1"
        ),
        "implementation": "native_service" if native else "adapter_residual",
        "ai_model_filename": None,
        "ai_model_sha256": None,
        "actual_provider": None,
    }
    if area_limits is not None:
        provenance["detection_sizing"] = area_limits["runtime_provenance"]
    return provenance


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


def _thermal_areas_of_interest(
    temperatures,
    mask,
    scores,
    *,
    max_observations=None,
    min_area=DEFAULT_SERVICE_KWARGS["min_area"],
    max_area=DEFAULT_SERVICE_KWARGS["max_area"],
):
    mask_u8 = np.asarray(mask, dtype=np.uint8) * 255
    contours, _ = cv2.findContours(mask_u8, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    areas = []
    max_contour_points = _max_contour_points()
    for contour in contours:
        area = float(cv2.contourArea(contour))
        pixel_area = _filled_contour_pixel_area(contour)
        if pixel_area < min_area or (max_area > 0 and pixel_area > max_area):
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
                "center": (round(cx), round(cy)),
                "radius": round(radius),
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
    areas.sort(
        key=lambda item: (-(item.get("raw_score") or 0.0), -(item.get("area") or 0.0))
    )
    return BoundedAois(
        areas[: _observation_limit(max_observations)],
        available_count=len(areas),
    )


def _filled_contour_pixel_area(contour):
    x, y, width, height = cv2.boundingRect(contour)
    local_contour = contour - np.array([[[x, y]]], dtype=contour.dtype)
    mask = np.zeros((height, width), dtype=np.uint8)
    cv2.drawContours(mask, [local_contour], -1, 255, thickness=cv2.FILLED)
    return cv2.countNonZero(mask)


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
                    key: area.get(key) for key in AOI_RESULT_FIELDS if key in area
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
    if algorithm_name == "ColorRange":
        from algorithms.images.ColorRange.services.ColorRangeService import (
            ColorRangeService,
        )

        return ColorRangeService
    if algorithm_name == "MatchedFilter":
        from algorithms.images.MatchedFilter.services.MatchedFilterService import (
            MatchedFilterService,
        )

        return MatchedFilterService
    raise AlgorithmNotConfigured(f"Unsupported ADIAT algorithm: {algorithm_name}")


def _ensure_app_on_path():
    app_path = str(Path(__file__).resolve().parents[1] / "app")
    if app_path not in sys.path:
        sys.path.insert(0, app_path)
