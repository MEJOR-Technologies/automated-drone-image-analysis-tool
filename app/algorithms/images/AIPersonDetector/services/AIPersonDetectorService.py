import cv2
import hashlib
import numpy as np
import sys
import os
import threading
from os import path

# Optional import for onnxruntime - handle DLL load failures gracefully
try:
    import onnxruntime as ort
    ONNXRUNTIME_AVAILABLE = True
except (ImportError, OSError, Exception) as e:
    ONNXRUNTIME_AVAILABLE = False
    ort = None
    _onnxruntime_error = str(e)

from core.services.LoggerService import LoggerService
from algorithms.AlgorithmService import AlgorithmService, AnalysisResult
from helpers.SlidingWindowSlicer import SlidingWindowSlicer

OVERLAP = 0.2


class AIPersonDetectorService(AlgorithmService):
    """Service class for detecting people in images using an ONNX object detection model.

    Processes large images using a sliding window approach, aggregates detections,
    and identifies areas of interest. Supports both CPU and GPU inference.

    Attributes:
        confidence: Confidence threshold for detections (0.0 to 1.0).
        cpu_only: Whether to use CPU-only mode.
        slice_size: Size of image slices for processing.
        model_img_size: Input size for the ONNX model.
        model_path: Path to the ONNX model file.
    """

    def __init__(self, identifier, min_area, max_area, aoi_radius, combine_aois, options):
        """Initialize the AIPersonDetectorService.

        Args:
            identifier: Unique identifier for the analysis run.
            min_area: Minimum area for detected objects of interest.
            max_area: Maximum area for detected objects of interest.
            aoi_radius: Radius for defining areas of interest.
            combine_aois: Whether to combine overlapping AOIs.
            options: Algorithm-specific options, must include
                'person_detector_confidence' and 'cpu_only'.

        Raises:
            RuntimeError: If onnxruntime is not available or cannot be loaded.
        """
        self.logger = LoggerService()

        # Check if onnxruntime is available before proceeding
        if not ONNXRUNTIME_AVAILABLE or ort is None:
            error_msg = (
                "ONNX Runtime is not available. The AI Person Detector requires onnxruntime to function. "
                "Please ensure onnxruntime-directml is properly installed. "
                "If you continue to see this error, the DLL may have failed to load. "
                "Try reinstalling the application or installing the required Visual C++ Redistributables."
            )
            if '_onnxruntime_error' in globals():
                error_msg += f"\nOriginal error: {_onnxruntime_error}"
            self.logger.error(error_msg)
            raise RuntimeError(error_msg)

        super().__init__('AIPersonDetector', identifier, min_area, max_area, aoi_radius, combine_aois, options)
        self.confidence = options['person_detector_confidence'] / 100
        self.cpu_only = options['cpu_only']
        if self.cpu_only:
            self.slice_size = 1280
            self.model_img_size = 640
            if getattr(sys, 'frozen', False):
                # Frozen (PyInstaller)
                self.model_path = os.path.join(sys._MEIPASS, 'ai_models', 'ai_person_model_V2_640.onnx')
            else:
                # Not frozen (dev)
                self.model_path = path.abspath(path.join(path.dirname(__file__), 'ai_person_model_V2_640.onnx'))
        else:
            self.slice_size = 2048
            self.model_img_size = 1024
            if getattr(sys, 'frozen', False):
                # Frozen (PyInstaller)
                self.model_path = os.path.join(sys._MEIPASS, 'ai_models', 'ai_person_model_V2_1024.onnx')
            else:
                # Not frozen (dev)
                self.model_path = path.abspath(path.join(path.dirname(__file__), 'ai_person_model_V2_1024.onnx'))

    def process_image(self, img, full_path, input_dir, output_dir):
        """Process a single image to detect people, aggregate results, and identify areas of interest.

        Uses sliding window approach to process large images, runs ONNX model
        inference on each slice, aggregates detections, and applies NMS to
        remove duplicates.

        Args:
            img: Input image (BGR format) as numpy array.
            full_path: Full path to the input image.
            input_dir: Base input directory.
            output_dir: Base output directory.

        Returns:
            AnalysisResult object with details of the analysis including
            detected people as areas of interest.
        """
        session = self._create_onnx_session()
        providers = session.get_providers() if hasattr(session, "get_providers") else []
        self.actual_provider = str(providers[0]) if providers else None
        input_name = session.get_inputs()[0].name

        try:
            img_pre_processed = self._preprocess_whole_image(img)
            all_boxes = []
            all_scores = []
            all_classes = []
            slices = SlidingWindowSlicer.get_slices(img_pre_processed.shape, self.slice_size, OVERLAP)
            for s_idx, (x1, y1, x2, y2) in enumerate(slices):
                crop = img_pre_processed[y1:y2, x1:x2]
                crop_w = x2 - x1
                crop_h = y2 - y1
                input_tensor = self._preprocess_slice(crop, out_size=self.model_img_size)
                outputs = session.run(None, {input_name: input_tensor})
                bboxes = self._postprocess(outputs, (x1, y1), crop_w, crop_h)
                for bx in bboxes:
                    bx1, by1, bx2, by2, conf, cls = bx
                    all_boxes.append([bx1, by1, bx2, by2])
                    all_scores.append(conf)
                    all_classes.append(cls)
            merged_bboxes = SlidingWindowSlicer.merge_slice_detections(
                all_boxes, all_scores, all_classes, iou_threshold=0.5
            )

            # --- MASK LOGIC ---
            mask = np.zeros(img.shape[:2], dtype=np.uint8)
            qualified_bboxes = []

            for bbox in merged_bboxes:
                x_min, y_min, x_max, y_max, conf, cls = bbox
                # Zero confidence is the model's empty/padded output, not a
                # detection. Keep every positive result when the operator sets
                # the review threshold to zero, but never serialize sentinels.
                if conf > 0 and conf >= self.confidence:
                    qualified_bboxes.append(bbox)
                    # Fill the bounding box area with white (255)
                    mask[y_min:y_max, x_min:x_max] = 255

            if self.combine_aois:
                contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
            else:
                # Keep each model box as its own observation, even when boxes
                # overlap in the rendered mask.
                contours = [
                    np.array(
                        [
                            [[bbox[0], bbox[1]]],
                            [[bbox[2], bbox[1]]],
                            [[bbox[2], bbox[3]]],
                            [[bbox[0], bbox[3]]],
                        ],
                        dtype=np.int32,
                    )
                    for bbox in qualified_bboxes
                ]

            areas_of_interest, base_contour_count = self.identify_areas_of_interest(img.shape, contours)
            areas_of_interest = self._attach_model_confidences(areas_of_interest, merged_bboxes)
            output_path = self._construct_output_path(full_path, input_dir, output_dir)

            # Store mask instead of duplicating image
            mask_path = None
            if areas_of_interest:
                mask_path = self.store_mask(full_path, output_path, mask)

            return AnalysisResult(full_path, mask_path, output_dir, areas_of_interest, base_contour_count)

        except Exception as e:
            self.logger.error(f"Error processing image {full_path}: {e}")
            return AnalysisResult(full_path, error_message=str(e))

    @staticmethod
    def _attach_model_confidences(areas_of_interest, merged_bboxes):
        """Attach each retained AOI's model confidence to the serialized result.

        The contour stage intentionally keeps the geometry independent from the
        detector boxes. Match each contour center back to its box so the adapter
        can persist the confidence instead of returning a null score.
        """
        if not areas_of_interest or not merged_bboxes:
            return areas_of_interest

        valid_boxes = []
        for bbox in merged_bboxes:
            if len(bbox) < 5:
                continue
            try:
                x1, y1, x2, y2, confidence = (float(value) for value in bbox[:5])
            except (TypeError, ValueError):
                continue
            valid_boxes.append((x1, y1, x2, y2, confidence))

        if not valid_boxes:
            return areas_of_interest

        for area in areas_of_interest:
            center = area.get("center") if isinstance(area, dict) else None
            if not center or len(center) < 2:
                continue
            try:
                center_x, center_y = float(center[0]), float(center[1])
            except (TypeError, ValueError):
                continue

            matching_boxes = [
                box
                for box in valid_boxes
                if box[0] <= center_x <= box[2] and box[1] <= center_y <= box[3]
            ]
            if not matching_boxes:
                matching_boxes = [
                    min(
                        valid_boxes,
                        key=lambda box: (
                            ((box[0] + box[2]) / 2 - center_x) ** 2
                            + ((box[1] + box[3]) / 2 - center_y) ** 2
                        ),
                    )
                ]

            model_confidence = max(box[4] for box in matching_boxes)
            model_confidence = max(0.0, min(1.0, model_confidence))
            area["confidence"] = round(model_confidence * 100, 4)
            area["raw_score"] = model_confidence
            area["score_type"] = "model_confidence"
            area["score_method"] = "AIPersonDetector"

        return areas_of_interest

    def _preprocess_whole_image(self, img):
        """Convert BGR image to RGB and normalize to [0, 1] float32.

        Args:
            img: Input image in BGR format as numpy array.

        Returns:
            Normalized RGB image as float32 numpy array.
        """
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_norm = img_rgb.astype(np.float32) / 255.0
        return img_norm

    def _preprocess_slice(self, slice_img, out_size=640):
        """Resize and format image slice for ONNX model input.

        Args:
            slice_img: Image slice (float32, RGB) as numpy array.
            out_size: Size for model input. Defaults to 640.

        Returns:
            Model-ready input tensor (1, 3, out_size, out_size) as numpy array.
        """
        img_resized = cv2.resize(slice_img, (out_size, out_size))
        img_transposed = np.transpose(img_resized, (2, 0, 1))
        img_input = np.expand_dims(img_transposed, axis=0)
        return img_input

    def _postprocess(self, outputs, slice_rect, crop_w, crop_h):
        """Convert model outputs to bounding boxes in full image coordinates.

        Args:
            outputs: Raw model outputs from ONNX inference.
            slice_rect: Top-left (x, y) of the slice in original image.
            crop_w: Width of slice.
            crop_h: Height of slice.

        Returns:
            List of bounding boxes as (x1, y1, x2, y2, confidence, class) tuples.
        """
        preds = outputs[0][0]
        bboxes = []
        for pred in preds:
            if len(pred) < 6:
                continue
            x1, y1, x2, y2, conf, cls = pred[:6]
            if conf < self.confidence:
                continue
            x1 = int((x1 / self.model_img_size) * crop_w) + slice_rect[0]
            x2 = int((x2 / self.model_img_size) * crop_w) + slice_rect[0]
            y1 = int((y1 / self.model_img_size) * crop_h) + slice_rect[1]
            y2 = int((y2 / self.model_img_size) * crop_h) + slice_rect[1]
            bboxes.append((x1, y1, x2, y2, float(conf), int(cls)))
        return bboxes

    def _create_onnx_session(self):
        """Create an ONNX Runtime inference session.

        Tries to use DmlExecutionProvider (DirectML) first; falls back to
        CPUExecutionProvider if DirectML fails or if cpu_only is True.

        Returns:
            Loaded ONNX model session (onnxruntime.InferenceSession).
        """
        requested_providers = (
            ("CPUExecutionProvider",)
            if self.cpu_only
            else ("DmlExecutionProvider", "CPUExecutionProvider")
        )
        cache_key = (
            os.path.realpath(self.model_path),
            requested_providers,
            "ORT_SEQUENTIAL",
            "ORT_ENABLE_ALL",
            False,
            True,
            False,
            1,
        )
        with self._session_cache_lock:
            session = self._session_cache.get(cache_key)
            if session is None:
                session = self._build_onnx_session(requested_providers)
                self._session_cache[cache_key] = session
        return session

    def _build_onnx_session(self, requested_providers):
        so = ort.SessionOptions()
        so.execution_mode = ort.ExecutionMode.ORT_SEQUENTIAL
        so.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        so.enable_mem_pattern = False
        so.enable_mem_reuse = True
        so.enable_profiling = False
        so.intra_op_num_threads = 1

        if self.cpu_only:
            return ort.InferenceSession(
                self.model_path,
                sess_options=so,
                providers=list(requested_providers),
            )
        try:
            return ort.InferenceSession(
                self.model_path,
                sess_options=so,
                providers=list(requested_providers),
            )
        except Exception as e:
            self.logger.warning(f"DmlExecutionProvider failed: {e}")
            try:
                return ort.InferenceSession(
                    self.model_path,
                    sess_options=so,
                    providers=["CPUExecutionProvider"],
                )
            except Exception as cpu_e:
                self.logger.error(f"Failed to load model even with CPUExecutionProvider: {cpu_e}")
                raise RuntimeError("ONNX model could not be loaded with any provider.")

    def runtime_provenance(self):
        """Return the effective inference runtime used by the latest call."""
        model_path = os.path.realpath(self.model_path)
        with self._session_cache_lock:
            model_sha256 = self._model_sha256_cache.get(model_path)
            if model_sha256 is None:
                digest = hashlib.sha256()
                with open(model_path, "rb") as model_file:
                    for chunk in iter(lambda: model_file.read(1024 * 1024), b""):
                        digest.update(chunk)
                model_sha256 = digest.hexdigest()
                self._model_sha256_cache[model_path] = model_sha256
        return {
            "service_version": self.SERVICE_VERSION,
            "ai_model_filename": os.path.basename(model_path),
            "ai_model_sha256": model_sha256,
            "actual_provider": getattr(self, "actual_provider", None),
        }
    SERVICE_VERSION = "1"
    _session_cache = {}
    _model_sha256_cache = {}
    _session_cache_lock = threading.RLock()
