"""
Comprehensive tests for AnalyzeService.

Tests the core image analysis orchestration service.
"""

import pytest
import tempfile
import os
from unittest.mock import patch, MagicMock
from PySide6.QtCore import QObject
from core.services.AnalyzeService import AnalyzeService


@pytest.fixture
def analyze_service():
    """Fixture providing an AnalyzeService instance."""
    algorithm = {
        'name': 'ColorRange',
        'type': 'RGB',
        'service': 'ColorRangeService'
    }
    options = {
        'color_ranges': [
            {'color_range': [(100, 150, 200), (120, 170, 220)]}
        ]
    }

    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = os.path.join(tmpdir, 'input')
        output_dir = os.path.join(tmpdir, 'output')
        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        service = AnalyzeService(
            id=1,
            algorithm=algorithm,
            input=input_dir,
            output=output_dir,
            identifier_color=(100, 150, 200),
            min_area=10,
            num_processes=1,
            max_aois=100,
            aoi_radius=5,
            histogram_reference_path=None,
            kmeans_clusters=None,
            options=options,
            max_area=1000,
            processing_resolution=1.0
        )
        yield service


def test_analyze_service_initialization(analyze_service):
    """Test AnalyzeService initialization."""
    assert analyze_service.algorithm is not None
    assert analyze_service.min_area == 10
    assert analyze_service.max_area == 1000
    assert analyze_service.num_processes == 1
    assert analyze_service.processing_resolution == 1.0


def test_analyze_service_thermal_detection():
    """Test that thermal algorithms are properly detected."""
    algorithm = {
        'name': 'ThermalRange',
        'type': 'Thermal',
        'service': 'ThermalRangeService'
    }

    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = os.path.join(tmpdir, 'input')
        output_dir = os.path.join(tmpdir, 'output')
        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        service = AnalyzeService(
            id=1,
            algorithm=algorithm,
            input=input_dir,
            output=output_dir,
            identifier_color=(255, 0, 0),
            min_area=10,
            num_processes=1,
            max_aois=100,
            aoi_radius=5,
            histogram_reference_path=None,
            kmeans_clusters=None,
            options={'minTemp': 20.0, 'maxTemp': 30.0},
            max_area=1000,
            processing_resolution=1.0
        )

        assert service.is_thermal is True


def test_analyze_service_processing_resolution():
    """Test processing resolution scaling."""
    algorithm = {
        'name': 'ColorRange',
        'type': 'RGB',
        'service': 'ColorRangeService'
    }

    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = os.path.join(tmpdir, 'input')
        output_dir = os.path.join(tmpdir, 'output')
        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        service = AnalyzeService(
            id=1,
            algorithm=algorithm,
            input=input_dir,
            output=output_dir,
            identifier_color=(100, 150, 200),
            min_area=10,
            num_processes=1,
            max_aois=100,
            aoi_radius=5,
            histogram_reference_path=None,
            kmeans_clusters=None,
            options={},
            max_area=1000,
            processing_resolution=0.5  # 50% resolution
        )

        assert service.processing_resolution == 0.5


def test_analyze_service_signals(analyze_service):
    """Test that signals are properly defined."""
    assert hasattr(analyze_service, 'sig_msg')
    assert hasattr(analyze_service, 'sig_aois')
    assert hasattr(analyze_service, 'sig_done')


def test_analyze_service_cancellation(analyze_service):
    """Test cancellation functionality."""
    assert analyze_service.cancelled is False
    analyze_service.cancelled = True
    assert analyze_service.cancelled is True


def test_analyze_service_recursive_default(analyze_service):
    """Recursive image collection is enabled by default."""
    assert analyze_service.recursive is True


def test_analyze_service_non_recursive():
    """recursive=False scopes image collection to the input directory only."""
    algorithm = {
        'name': 'ColorRange',
        'type': 'RGB',
        'service': 'ColorRangeService'
    }

    with tempfile.TemporaryDirectory() as tmpdir:
        input_dir = os.path.join(tmpdir, 'input')
        output_dir = os.path.join(tmpdir, 'output')
        os.makedirs(input_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)

        service = AnalyzeService(
            id=1,
            algorithm=algorithm,
            input=input_dir,
            output=output_dir,
            identifier_color=(100, 150, 200),
            min_area=10,
            num_processes=1,
            max_aois=100,
            aoi_radius=5,
            histogram_reference_path=None,
            kmeans_clusters=None,
            options={},
            max_area=1000,
            processing_resolution=1.0,
            recursive=False
        )

        assert service.recursive is False


def test_process_complete_handles_none_result(analyze_service):
    """A None result must not raise.

    process_file returns None on a caught error; a None reaching
    _process_complete used to raise an AttributeError that hung the run.
    """
    analyze_service._completed_images = 0
    # Must simply return without raising.
    analyze_service._process_complete(None)
    assert analyze_service._completed_images == 0


def test_handle_failed_image_counts_toward_progress(analyze_service):
    """A failed image still advances the completion counter so progress stays accurate."""
    analyze_service.ttl_images = 4
    analyze_service._completed_images = 0
    analyze_service._handle_failed_image(os.path.join('imgs', 'bad.jpg'), 'Timed out')
    assert analyze_service._completed_images == 1


def test_emit_progress_emits_signal(analyze_service):
    """_emit_progress emits sig_progress carrying the completed and total counts."""
    analyze_service.ttl_images = 10
    analyze_service._completed_images = 4
    received = []
    analyze_service.sig_progress.connect(lambda c, t, e: received.append((c, t, e)))
    analyze_service._emit_progress()
    assert received
    assert received[0][0] == 4
    assert received[0][1] == 10
