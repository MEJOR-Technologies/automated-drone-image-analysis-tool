import pytest
import hashlib
import numpy as np
import tempfile
import os
from unittest.mock import patch, MagicMock
from algorithms.images.AIPersonDetector.services.AIPersonDetectorService import AIPersonDetectorService
from algorithms.AlgorithmService import AnalysisResult


@pytest.fixture
def ai_person_detector_service():
    """Fixture providing an AIPersonDetectorService instance."""
    options = {
        'person_detector_confidence': 50,
        'cpu_only': True
    }
    return AIPersonDetectorService(
        identifier=(255, 0, 0),
        min_area=100,
        max_area=10000,
        aoi_radius=10,
        combine_aois=True,
        options=options
    )


@pytest.fixture
def test_image():
    """Create a test image."""
    img = np.random.randint(0, 255, (640, 640, 3), dtype=np.uint8)
    return img


def test_ai_person_detector_service_initialization(ai_person_detector_service):
    """Test AIPersonDetectorService initialization."""
    assert ai_person_detector_service.name == 'AIPersonDetector'
    assert ai_person_detector_service.confidence == 0.5  # 50/100
    assert ai_person_detector_service.cpu_only is True
    assert ai_person_detector_service.slice_size == 1280
    assert ai_person_detector_service.model_img_size == 640


def test_ai_person_detector_service_gpu_mode():
    """Test AIPersonDetectorService with GPU mode."""
    options = {
        'person_detector_confidence': 50,
        'cpu_only': False
    }
    service = AIPersonDetectorService(
        identifier=(255, 0, 0),
        min_area=100,
        max_area=10000,
        aoi_radius=10,
        combine_aois=True,
        options=options
    )
    assert service.cpu_only is False
    assert service.slice_size == 2048
    assert service.model_img_size == 1024


def test_preprocess_whole_image(ai_person_detector_service, test_image):
    """Test image preprocessing."""
    result = ai_person_detector_service._preprocess_whole_image(test_image)

    assert result.shape == test_image.shape
    assert result.dtype == np.float32
    assert result.max() <= 1.0
    assert result.min() >= 0.0


def test_preprocess_slice(ai_person_detector_service):
    """Test slice preprocessing."""
    slice_img = np.random.rand(100, 100, 3).astype(np.float32)

    result = ai_person_detector_service._preprocess_slice(slice_img, out_size=640)

    assert result.shape == (1, 3, 640, 640)
    assert result.dtype == np.float32


def test_process_image_mock_onnx(ai_person_detector_service, test_image):
    """Test processing with mocked ONNX session."""
    # Mock ONNX session
    mock_session = MagicMock()
    mock_input = MagicMock()
    mock_input.name = 'input'
    mock_session.get_inputs.return_value = [mock_input]

    # Mock outputs (format: [boxes, scores, classes])
    mock_outputs = [
        np.array([[[0.1, 0.1, 0.2, 0.2, 0.9, 0]]], dtype=np.float32)  # Single detection
    ]
    mock_session.run.return_value = mock_outputs

    with patch.object(ai_person_detector_service, '_create_onnx_session', return_value=mock_session):
        with tempfile.TemporaryDirectory() as tmpdir:
            input_dir = tmpdir
            output_dir = os.path.join(tmpdir, "output")
            os.makedirs(output_dir, exist_ok=True)
            full_path = os.path.join(input_dir, "test.jpg")

            result = ai_person_detector_service.process_image(test_image, full_path, input_dir, output_dir)

            assert isinstance(result, AnalysisResult)
            assert result.input_path == full_path


def test_model_confidence_is_attached_to_each_aoi(ai_person_detector_service):
    areas = [
        {"center": (10, 10)},
        {"center": (90, 90)},
    ]
    merged_bboxes = [
        (0, 0, 20, 20, 0.81, 0),
        (80, 80, 100, 100, 0.37, 0),
    ]

    result = ai_person_detector_service._attach_model_confidences(areas, merged_bboxes)

    assert result[0]["confidence"] == 81.0
    assert result[0]["raw_score"] == 0.81
    assert result[0]["score_type"] == "model_confidence"
    assert result[0]["score_method"] == "AIPersonDetector"
    assert result[1]["confidence"] == 37.0


def test_overlapping_model_boxes_remain_separate_observations(ai_person_detector_service, test_image):
    ai_person_detector_service.combine_aois = False
    ai_person_detector_service.slice_size = 640
    mock_session = MagicMock()
    mock_input = MagicMock()
    mock_input.name = "input"
    mock_session.get_inputs.return_value = [mock_input]
    mock_session.run.return_value = [
        np.array(
            [[[64, 64, 128, 128, 0.9, 0], [96, 96, 160, 160, 0.8, 0]]],
            dtype=np.float32,
        )
    ]

    with patch.object(ai_person_detector_service, "_create_onnx_session", return_value=mock_session):
        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = os.path.join(tmpdir, "output")
            os.makedirs(output_dir, exist_ok=True)
            result = ai_person_detector_service.process_image(
                test_image,
                os.path.join(tmpdir, "test.jpg"),
                tmpdir,
                output_dir,
            )

    assert result.error_message is None
    assert len(result.areas_of_interest) == 2


def test_zero_threshold_excludes_model_padding_but_keeps_positive_detections(test_image):
    service = AIPersonDetectorService(
        identifier=(255, 0, 0),
        min_area=1,
        max_area=0,
        aoi_radius=10,
        combine_aois=False,
        options={"person_detector_confidence": 0, "cpu_only": True},
    )
    service.slice_size = 640
    mock_session = MagicMock()
    mock_input = MagicMock()
    mock_input.name = "input"
    mock_session.get_inputs.return_value = [mock_input]
    mock_session.run.return_value = [
        np.array(
            [[[0, 0, 0, 0, 0.0, 0], [64, 64, 128, 128, 0.01, 0]]],
            dtype=np.float32,
        )
    ]

    with patch.object(service, "_create_onnx_session", return_value=mock_session):
        with tempfile.TemporaryDirectory() as tmpdir:
            output_dir = os.path.join(tmpdir, "output")
            os.makedirs(output_dir, exist_ok=True)
            result = service.process_image(
                test_image,
                os.path.join(tmpdir, "test.jpg"),
                tmpdir,
                output_dir,
            )

    assert result.error_message is None
    assert len(result.areas_of_interest) == 1
    assert result.areas_of_interest[0]["raw_score"] > 0


def test_onnx_session_cache_reuses_same_model_provider_configuration(
    ai_person_detector_service,
):
    ai_person_detector_service._session_cache.clear()
    session = MagicMock()

    with patch.object(
        ai_person_detector_service,
        "_build_onnx_session",
        return_value=session,
    ) as build:
        first = ai_person_detector_service._create_onnx_session()
        second = ai_person_detector_service._create_onnx_session()

    assert first is session
    assert second is session
    build.assert_called_once_with(("CPUExecutionProvider",))


def test_onnx_session_cache_separates_provider_configurations(
    ai_person_detector_service,
):
    ai_person_detector_service._session_cache.clear()
    cpu_session = MagicMock()
    gpu_session = MagicMock()
    gpu_service = AIPersonDetectorService(
        identifier=(255, 0, 0),
        min_area=100,
        max_area=10000,
        aoi_radius=10,
        combine_aois=True,
        options={"person_detector_confidence": 50, "cpu_only": False},
    )

    with patch.object(
        ai_person_detector_service,
        "_build_onnx_session",
        return_value=cpu_session,
    ), patch.object(
        gpu_service,
        "_build_onnx_session",
        return_value=gpu_session,
    ):
        assert ai_person_detector_service._create_onnx_session() is cpu_session
        assert gpu_service._create_onnx_session() is gpu_session


def test_runtime_provenance_reports_model_checksum_and_actual_provider(
    ai_person_detector_service,
    tmp_path,
):
    model_path = tmp_path / "person.onnx"
    model_path.write_bytes(b"stable-model")
    ai_person_detector_service.model_path = str(model_path)
    ai_person_detector_service.actual_provider = "CPUExecutionProvider"
    ai_person_detector_service._model_sha256_cache.clear()

    provenance = ai_person_detector_service.runtime_provenance()

    assert provenance == {
        "service_version": "1",
        "ai_model_filename": "person.onnx",
        "ai_model_sha256": hashlib.sha256(b"stable-model").hexdigest(),
        "actual_provider": "CPUExecutionProvider",
    }
