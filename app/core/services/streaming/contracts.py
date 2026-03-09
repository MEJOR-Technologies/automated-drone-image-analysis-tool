"""Common data contracts for streaming analysis services."""

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional, Tuple

import numpy as np

from core.services.streaming.StreamingUtils import StageTimings


BBox = Tuple[int, int, int, int]


@dataclass(frozen=True)
class StreamAlgorithmCapabilities:
    """Declare which shared streaming controls an algorithm supports."""

    supports_mask_controls: bool = True
    supports_render_at_processing_resolution: bool = True
    supports_render_contours: bool = True
    supports_use_detection_color: bool = True
    supports_temporal_voting: bool = True
    supports_aspect_ratio_filter: bool = True
    supports_detection_clustering: bool = True


@dataclass
class StreamDetection:
    """Normalized detection payload used by all streaming algorithms."""

    bbox: BBox
    confidence: float
    class_name: str
    centroid: Optional[Tuple[int, int]] = None
    area: Optional[float] = None
    detection_type: str = "generic"
    timestamp: float = 0.0
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, Any]:
        """Convert detection to a viewer-friendly dictionary."""
        payload: Dict[str, Any] = {
            "bbox": self.bbox,
            "confidence": self.confidence,
            "class_name": self.class_name,
            "detection_type": self.detection_type,
            "timestamp": self.timestamp,
            "metadata": self.metadata,
        }
        if self.centroid is not None:
            payload["centroid"] = self.centroid
        if self.area is not None:
            payload["area"] = self.area
        return payload


@dataclass
class StreamProcessResult:
    """Normalized frame processing result used by streaming services."""

    detections: List[StreamDetection] = field(default_factory=list)
    timings: StageTimings = field(default_factory=StageTimings)
    rendered_frame: Optional[np.ndarray] = None
    error_message: Optional[str] = None

    @property
    def was_skipped(self) -> bool:
        """True when the frame was intentionally skipped."""
        return bool(getattr(self.timings, "was_skipped", False))

    def detection_dicts(self) -> List[Dict[str, Any]]:
        """Return detections in the application's dictionary shape."""
        return [det.to_dict() for det in self.detections]
