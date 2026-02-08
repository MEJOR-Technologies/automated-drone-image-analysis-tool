"""
ColorAnomalyAndMotionDetectionController.py - Color anomaly and motion detection algorithm controller

Combines motion detection, color quantization, fusion, and temporal smoothing
for comprehensive anomaly detection. Integrated into StreamViewerWindow following
the StreamAlgorithmController pattern.
"""

# Set environment variables
from algorithms.streaming.ColorAnomalyAndMotionDetection.views.ColorAnomalyAndMotionDetectionControlWidget import ColorAnomalyAndMotionDetectionControlWidget
from algorithms.streaming.ColorAnomalyAndMotionDetection.services import (
    ColorAnomalyAndMotionDetectionOrchestrator,
    ColorAnomalyAndMotionDetectionConfig,
    MotionAlgorithm,
    FusionMode,
    ColorSpace,
    ContourMethod,
    Detection
)
from core.services.LoggerService import LoggerService
from core.controllers.streaming.base import StreamAlgorithmController
from helpers.TranslationMixin import TranslationMixin
from PySide6.QtWidgets import (QWidget, QVBoxLayout, QTabWidget,
                               QLabel, QSpinBox, QDoubleSpinBox, QCheckBox,
                               QComboBox, QHBoxLayout, QGridLayout)
from PySide6.QtCore import Qt, Slot, Signal
from typing import Dict, List, Any
import numpy as np
import os
os.environ.setdefault('NUMPY_EXPERIMENTAL_DTYPE_API', '0')
os.environ.setdefault('NUMBA_DISABLE_INTEL_SVML', '1')
os.environ.setdefault('NPY_DISABLE_SVML', '1')


class ColorAnomalyAndMotionDetectionController(TranslationMixin, StreamAlgorithmController):
    """
    Color anomaly and motion detection algorithm controller.

    Provides comprehensive anomaly detection by combining:
    - Motion detection with multiple algorithms
    - Color quantization and anomaly detection
    - Multi-modal fusion
    - Temporal smoothing and tracking
    - False positive reduction
    """

    def __init__(self, algorithm_config: Dict[str, Any], theme: str, parent=None):
        """Initialize color anomaly and motion detection controller."""
        super().__init__(algorithm_config, theme, parent)

        self.logger = LoggerService()
        self.provides_custom_rendering = True

        # Initialize color anomaly and motion detector orchestrator
        self.integrated_detector = ColorAnomalyAndMotionDetectionOrchestrator()

        # State
        self.detection_count = 0

        # Connect detector signals
        self.integrated_detector.frameProcessed.connect(self._on_frame_processed)
        self.integrated_detector.performanceUpdate.connect(self._on_performance_update)

        # Apply initial config from widget to service (setup_ui was called in super().__init__)
        if hasattr(self, 'integrated_controls'):
            initial_config = self.integrated_controls.get_config()
            self._on_config_changed(initial_config)

        # self.logger.info("ColorAnomalyAndMotionDetectionController initialized")

    def setup_ui(self):
        """Setup the algorithm-specific UI."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(5, 5, 5, 5)
        layout.setSpacing(10)

        # Color Anomaly and Motion Detection Control Widget (algorithm-specific)
        self.integrated_controls = ColorAnomalyAndMotionDetectionControlWidget()
        self.integrated_controls.configChanged.connect(self._on_config_changed)
        layout.addWidget(self.integrated_controls)

        # Apply initial config from widget to service (if detector is initialized)
        if hasattr(self, 'integrated_detector'):
            initial_config = self.integrated_controls.get_config()
            self._on_config_changed(initial_config)

    def process_frame(self, frame: np.ndarray, timestamp: float) -> List[Dict]:
        """
        Process a frame for integrated detection.

        Args:
            frame: Input frame (BGR format)
            timestamp: Frame timestamp

        Returns:
            List of detection dictionaries
        """
        try:
            # Perform integrated detection - returns (annotated_frame, detections, timings)
            annotated_frame, detections, timings = self.integrated_detector.process_frame(frame, timestamp)

            # Convert to standard format
            detection_dicts = []
            for detection in detections:
                detection_dicts.append({
                    'bbox': detection.bbox,
                    'centroid': detection.centroid,
                    'area': detection.area,
                    'confidence': detection.confidence,
                    'class_name': detection.detection_type,
                    'detection_type': detection.detection_type,
                    'timestamp': detection.timestamp,
                    'metadata': detection.metadata
                })

            self.detection_count += len(detections)

            # Emit detections
            self.detectionsReady.emit(detection_dicts)

            # Emit annotated frame (already annotated by process_frame)
            self.frameProcessed.emit(annotated_frame)

            return detection_dicts

        except Exception as e:
            self.logger.error(f"Error processing frame: {e}")
            return []

    @Slot(np.ndarray, list, object)
    def _on_frame_processed(self, annotated_frame: np.ndarray, detections: List[Detection], metrics: object):
        """Handle frame processed signal from service.

        This signal is emitted during process_frame(). The controller already emits
        detections/frame once in process_frame(), so this handler intentionally avoids
        re-emitting to prevent duplicates.
        """
        _ = (annotated_frame, detections, metrics)

    @Slot(dict)
    def _on_performance_update(self, metrics: dict):
        """Handle performance metrics update."""
        fps = metrics.get('fps', 0)
        processing_time = metrics.get('avg_processing_time_ms', 0)
        self._emit_status(self.tr("FPS: {fps} | Processing: {time}ms").format(fps=f"{fps:.1f}", time=f"{processing_time:.1f}"))

    @Slot(dict)
    def _on_config_changed(self, config: dict):
        """Handle configuration change from controls."""
        integrated_config = self._convert_to_config(config)
        self.integrated_detector.update_config(integrated_config)
        self._emit_config_changed()

    def _convert_to_config(self, ui_config: dict) -> ColorAnomalyAndMotionDetectionConfig:
        """Convert UI config to ColorAnomalyAndMotionDetectionConfig object."""
        # Get existing config as base
        base_config = self.integrated_detector.config

        # Handle processing resolution - widget now returns processing_width/height directly
        processing_width = ui_config.get('processing_width', base_config.processing_width)
        processing_height = ui_config.get('processing_height', base_config.processing_height)

        # Handle "Original" resolution (99999 means no downsampling)
        try:
            processing_width = int(processing_width)
            processing_height = int(processing_height)
        except (TypeError, ValueError):
            processing_width = base_config.processing_width
            processing_height = base_config.processing_height

        if processing_width >= 99999 or processing_height >= 99999:
            # Keep sentinel values so the orchestrator can skip downsampling.
            processing_width = 99999
            processing_height = 99999

        # Map motion algorithm (widget returns enum)
        motion_algorithm = ui_config.get('motion_algorithm', base_config.motion_algorithm)
        if not isinstance(motion_algorithm, MotionAlgorithm):
            motion_algorithm_str = str(motion_algorithm).split('.')[-1].upper().replace(" ", "_")
            motion_algorithm = {
                "FRAME_DIFF": MotionAlgorithm.FRAME_DIFF,
                "MOG2": MotionAlgorithm.MOG2,
                "KNN": MotionAlgorithm.KNN,
            }.get(motion_algorithm_str, base_config.motion_algorithm)

        # Map fusion mode (widget returns enum)
        fusion_mode = ui_config.get('fusion_mode', base_config.fusion_mode)
        if not isinstance(fusion_mode, FusionMode):
            fusion_mode_str = str(fusion_mode).split('.')[-1].upper().replace(" ", "_")
            fusion_mode = {
                "UNION": FusionMode.UNION,
                "INTERSECTION": FusionMode.INTERSECTION,
                "COLOR_PRIORITY": FusionMode.COLOR_PRIORITY,
                "MOTION_PRIORITY": FusionMode.MOTION_PRIORITY,
            }.get(fusion_mode_str, base_config.fusion_mode)

        # Map color space (widget returns enum)
        color_space = ui_config.get('color_space', base_config.color_space)
        if not isinstance(color_space, ColorSpace):
            color_space_str = str(color_space).split('.')[-1].upper().replace(" ", "_")
            color_space = {
                "BGR": ColorSpace.BGR,
                "RGB": ColorSpace.BGR,  # UI label is RGB but service uses BGR enum.
                "HSV": ColorSpace.HSV,
                "LAB": ColorSpace.LAB,
            }.get(color_space_str, base_config.color_space)

        # Map contour method (widget returns enum)
        contour_method = ui_config.get('contour_method', base_config.contour_method)
        if not isinstance(contour_method, ContourMethod):
            contour_method_str = str(contour_method).split('.')[-1].upper().replace(" ", "_")
            contour_method = {
                "FIND_CONTOURS": ContourMethod.FIND_CONTOURS,
                "CONNECTED_COMPONENTS": ContourMethod.CONNECTED_COMPONENTS,
            }.get(contour_method_str, base_config.contour_method)

        return ColorAnomalyAndMotionDetectionConfig(
            processing_width=processing_width,
            processing_height=processing_height,
            target_fps=ui_config.get('target_fps', base_config.target_fps),
            enable_motion=ui_config.get('enable_motion', base_config.enable_motion),
            enable_color_quantization=ui_config.get('enable_color_quantization', base_config.enable_color_quantization),
            motion_algorithm=motion_algorithm,
            min_detection_area=ui_config.get('min_detection_area', base_config.min_detection_area),
            max_detection_area=ui_config.get('max_detection_area', base_config.max_detection_area),
            motion_threshold=ui_config.get('motion_threshold', base_config.motion_threshold),
            blur_kernel_size=ui_config.get('blur_kernel_size', base_config.blur_kernel_size),
            morphology_kernel_size=ui_config.get('morphology_kernel_size', base_config.morphology_kernel_size),
            enable_morphology=base_config.enable_morphology,  # Keep default (not in UI)
            bg_history=ui_config.get('bg_history', base_config.bg_history),
            bg_var_threshold=ui_config.get('bg_var_threshold', base_config.bg_var_threshold),
            bg_detect_shadows=ui_config.get('bg_detect_shadows', base_config.bg_detect_shadows),
            persistence_frames=ui_config.get('persistence_frames', base_config.persistence_frames),
            persistence_threshold=ui_config.get('persistence_threshold', base_config.persistence_threshold),
            pause_on_camera_movement=ui_config.get('pause_on_camera_movement', base_config.pause_on_camera_movement),
            camera_movement_threshold=ui_config.get('camera_movement_threshold', base_config.camera_movement_threshold),
            color_quantization_bits=ui_config.get('color_quantization_bits', base_config.color_quantization_bits),
            color_rarity_percentile=ui_config.get('color_rarity_percentile', base_config.color_rarity_percentile),
            color_min_detection_area=ui_config.get('color_min_detection_area', base_config.color_min_detection_area),
            color_max_detection_area=ui_config.get('color_max_detection_area', base_config.color_max_detection_area),
            contour_method=contour_method,
            color_space=color_space,
            hsv_min_saturation=ui_config.get('hsv_min_saturation', base_config.hsv_min_saturation),
            lab_min_chroma=ui_config.get('lab_min_chroma', base_config.lab_min_chroma),
            enable_hue_expansion=ui_config.get('enable_hue_expansion', base_config.enable_hue_expansion),
            hue_expansion_range=ui_config.get('hue_expansion_range', base_config.hue_expansion_range),
            enable_fusion=ui_config.get('enable_fusion', base_config.enable_fusion),
            fusion_mode=fusion_mode,
            enable_temporal_voting=ui_config.get('enable_temporal_voting', base_config.enable_temporal_voting),
            temporal_window_frames=ui_config.get('temporal_window_frames', base_config.temporal_window_frames),
            temporal_threshold_frames=ui_config.get('temporal_threshold_frames', base_config.temporal_threshold_frames),
            enable_aspect_ratio_filter=ui_config.get('enable_aspect_ratio_filter', base_config.enable_aspect_ratio_filter),
            min_aspect_ratio=ui_config.get('min_aspect_ratio', base_config.min_aspect_ratio),
            max_aspect_ratio=ui_config.get('max_aspect_ratio', base_config.max_aspect_ratio),
            enable_detection_clustering=ui_config.get('enable_detection_clustering', base_config.enable_detection_clustering),
            clustering_distance=ui_config.get('clustering_distance', base_config.clustering_distance),
            enable_color_exclusion=ui_config.get('enable_color_exclusion', base_config.enable_color_exclusion),
            excluded_hue_ranges=ui_config.get('excluded_hue_ranges', base_config.excluded_hue_ranges),
            show_detections=ui_config.get('show_detections', base_config.show_detections),
            max_detections_to_render=ui_config.get('max_detections_to_render', base_config.max_detections_to_render),
            render_shape=ui_config.get('render_shape', base_config.render_shape),
            render_text=ui_config.get('render_text', base_config.render_text),
            render_contours=ui_config.get('render_contours', base_config.render_contours),
            render_at_processing_res=ui_config.get('render_at_processing_res', base_config.render_at_processing_res),
            use_detection_color_for_rendering=ui_config.get('use_detection_color_for_rendering', base_config.use_detection_color_for_rendering),
            # Processing mask parameters (from shared FrameTab)
            mask_enabled=ui_config.get('mask_enabled', base_config.mask_enabled),
            frame_mask_enabled=ui_config.get('frame_mask_enabled', base_config.frame_mask_enabled),
            image_mask_enabled=ui_config.get('image_mask_enabled', base_config.image_mask_enabled),
            frame_buffer_pixels=ui_config.get('frame_buffer_pixels', base_config.frame_buffer_pixels),
            mask_image_path=ui_config.get('mask_image_path', base_config.mask_image_path),
            show_mask_overlay=ui_config.get('show_mask_overlay', base_config.show_mask_overlay)
        )

    # Required interface methods

    def get_config(self) -> Dict[str, Any]:
        """Get current algorithm configuration."""
        return self.integrated_controls.get_config()

    def set_config(self, config: Dict[str, Any]):
        """Apply algorithm configuration."""
        if not hasattr(self, 'integrated_controls'):
            self._on_config_changed(config)
            return

        controls = self.integrated_controls

        # Update processing resolution and frame-rate settings
        if ('processing_width' in config and 'processing_height' in config and
                hasattr(controls, 'input_processing_tab')):
            controls.input_processing_tab.set_processing_resolution(
                config['processing_width'],
                config['processing_height']
            )
        elif config.get('processing_resolution') is None and hasattr(controls, 'input_processing_tab'):
            # Backward compatibility for older configs that used None to mean "Original".
            controls.input_processing_tab.set_processing_resolution(99999, 99999)
        if hasattr(controls, 'input_processing_tab'):
            if 'target_fps' in config:
                controls.input_processing_tab.set_target_fps(int(config['target_fps']))
            if 'render_at_processing_res' in config:
                controls.input_processing_tab.render_at_processing_res.setChecked(
                    bool(config['render_at_processing_res'])
                )

        # Update shared Rendering and Frame tab configs
        if hasattr(controls, 'rendering_tab'):
            rendering_config = {}
            for key in [
                'render_shape', 'render_text', 'render_contours',
                'use_detection_color_for_rendering', 'max_detections_to_render',
                'enable_temporal_voting', 'temporal_window_frames', 'temporal_threshold_frames',
                'enable_aspect_ratio_filter', 'min_aspect_ratio', 'max_aspect_ratio',
                'enable_detection_clustering', 'clustering_distance'
            ]:
                if key in config:
                    rendering_config[key] = config[key]
            if rendering_config:
                controls.rendering_tab.set_config(rendering_config)

        if hasattr(controls, 'frame_tab'):
            frame_config = {}
            for key in ['mask_enabled', 'frame_mask_enabled', 'image_mask_enabled',
                        'frame_buffer_pixels', 'mask_image_path', 'show_mask_overlay']:
                if key in config:
                    frame_config[key] = config[key]
            if frame_config:
                controls.frame_tab.set_config(frame_config)

        # Update basic toggles
        checkbox_keys = [
            'enable_motion',
            'enable_color_quantization',
            'enable_fusion',
            'enable_hue_expansion',
            'enable_color_exclusion',
            'bg_detect_shadows',
            'pause_on_camera_movement',
        ]
        for key in checkbox_keys:
            if key in config and hasattr(controls, key):
                getattr(controls, key).setChecked(bool(config[key]))

        # Update numeric controls directly mapped by name.
        numeric_keys = [
            'motion_threshold',
            'min_detection_area',
            'max_detection_area',
            'color_min_detection_area',
            'color_max_detection_area',
            'blur_kernel_size',
            'morphology_kernel_size',
            'persistence_frames',
            'persistence_threshold',
            'bg_history',
            'bg_var_threshold',
            'color_quantization_bits',
            'hue_expansion_range',
            'hsv_min_saturation',
            'lab_min_chroma',
        ]
        for key in numeric_keys:
            if key in config and hasattr(controls, key):
                getattr(controls, key).setValue(config[key])

        # Compatibility mapping for legacy keys.
        if 'min_area' in config and 'min_detection_area' not in config and hasattr(controls, 'min_detection_area'):
            controls.min_detection_area.setValue(config['min_area'])
        if 'max_area' in config and 'max_detection_area' not in config and hasattr(controls, 'max_detection_area'):
            controls.max_detection_area.setValue(config['max_area'])

        # Mode/enum-based combo controls.
        if 'motion_algorithm' in config and hasattr(controls, 'motion_algorithm'):
            motion_algo = config['motion_algorithm']
            if isinstance(motion_algo, MotionAlgorithm):
                motion_text = motion_algo.name
            else:
                motion_text = str(motion_algo).split('.')[-1].upper().replace("MOG2 BACKGROUND", "MOG2")
            if motion_text in ["FRAME_DIFF", "MOG2", "KNN"]:
                controls.motion_algorithm.setCurrentText(motion_text)

        if 'fusion_mode' in config and hasattr(controls, 'fusion_mode'):
            fusion_mode = config['fusion_mode']
            fusion_text = fusion_mode.name if isinstance(fusion_mode, FusionMode) else str(fusion_mode).split('.')[-1].upper()
            if fusion_text in ["UNION", "INTERSECTION", "COLOR_PRIORITY", "MOTION_PRIORITY"]:
                controls.fusion_mode.setCurrentText(fusion_text)

        if 'color_space' in config and hasattr(controls, 'color_space'):
            color_space = config['color_space']
            if isinstance(color_space, ColorSpace):
                color_space_name = color_space.name
            else:
                color_space_name = str(color_space).split('.')[-1].upper().replace(" ", "_")
            color_space_text = {"BGR": "RGB", "RGB": "RGB", "HSV": "HSV", "LAB": "LAB"}.get(color_space_name)
            if color_space_text:
                controls.color_space.setCurrentText(color_space_text)

        if 'contour_method' in config and hasattr(controls, 'contour_method'):
            contour_method = config['contour_method']
            if isinstance(contour_method, ContourMethod):
                contour_name = contour_method.name
            else:
                contour_name = str(contour_method).split('.')[-1].upper().replace(" ", "_")
            contour_text = {
                "FIND_CONTOURS": "Find Contours",
                "CONNECTED_COMPONENTS": "Connected Components",
            }.get(contour_name)
            if contour_text:
                controls.contour_method.setCurrentText(contour_text)

        # Slider values with model-space conversions.
        if 'color_rarity_percentile' in config and hasattr(controls, 'color_rarity_percentile'):
            percentile = max(0, min(100, int(float(config['color_rarity_percentile']))))
            controls.color_rarity_percentile.setValue(percentile)
            if hasattr(controls, 'update_color_percentile_label'):
                controls.update_color_percentile_label()

        if 'camera_movement_threshold' in config and hasattr(controls, 'camera_movement_threshold'):
            cam_thresh = float(config['camera_movement_threshold'])
            cam_percent = int(round(cam_thresh * 100)) if cam_thresh <= 1.0 else int(round(cam_thresh))
            cam_percent = max(1, min(100, cam_percent))
            controls.camera_movement_threshold.setValue(cam_percent)
            if hasattr(controls, 'update_camera_movement_label'):
                controls.update_camera_movement_label()

        # Restore selected excluded hues into color wheel.
        if 'excluded_hue_ranges' in config and hasattr(controls, 'color_wheel'):
            selected_hues = []
            for hue_range in config.get('excluded_hue_ranges', []) or []:
                if not isinstance(hue_range, (list, tuple)) or len(hue_range) != 2:
                    continue
                h_min, h_max = float(hue_range[0]), float(hue_range[1])
                if h_min <= h_max:
                    center = (h_min + h_max) / 2.0
                else:
                    center = ((h_min + (h_max + 180.0)) / 2.0) % 180.0
                hue_360 = int(round(center * 2.0)) % 360
                if hasattr(controls.color_wheel, 'hue_colors'):
                    available = [entry[1] for entry in controls.color_wheel.hue_colors]
                    hue_360 = min(available, key=lambda h: abs(((h - hue_360 + 180) % 360) - 180))
                selected_hues.append(hue_360)
            controls.color_wheel.set_selected_hues(sorted(set(selected_hues)))

        # Get the updated config from the controls (includes all defaults)
        # This ensures we have a complete config with all fields, not just wizard fields
        updated_config = controls.get_config()

        # Apply the config to update the detector
        self._on_config_changed(updated_config)

    def get_stats(self) -> Dict[str, str]:
        """Get algorithm-specific statistics."""
        return {
            'Total Detections': str(self.detection_count)
        }

    def reset(self):
        """Reset algorithm state."""
        # Reset orchestrator metrics
        if hasattr(self.integrated_detector, 'reset_metrics'):
            self.integrated_detector.reset_metrics()
        self.detection_count = 0

    def cleanup(self):
        """Clean up algorithm resources for new video session.

        Resets all internal state including:
        - Background subtractor models (MOG2/KNN)
        - Temporal detection history
        - Performance metrics
        """
        if hasattr(self, 'integrated_detector') and self.integrated_detector:
            self.integrated_detector.reset_for_new_video()
        self.detection_count = 0
