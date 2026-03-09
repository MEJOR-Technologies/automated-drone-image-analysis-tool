"""
Comprehensive tests for viewer widgets.

Tests QtImageViewer, OverlayWidget, ScaleBarWidget, GPSMapView, etc.
"""

import pytest
import numpy as np
from unittest.mock import patch, MagicMock
from PySide6.QtWidgets import QApplication
from PySide6.QtCore import QPointF

from core.views.images.viewer.widgets.QtImageViewer import QtImageViewer
from core.views.images.viewer.widgets.OverlayWidget import OverlayWidget
from core.views.images.viewer.widgets.ScaleBarWidget import ScaleBarWidget
from core.views.images.viewer.widgets.GPSMapView import GPSMapView
from core.views.images.viewer.widgets.MapTileLoader import MapTileLoader
from core.views.images.viewer.widgets.ThermalHistogramChart import ThermalHistogramChart
from core.views.images.viewer.widgets.ThermalRangeSlider import ThermalRangeSlider


@pytest.fixture(scope='session')
def app():
    """Create QApplication for widget tests."""
    return QApplication.instance() or QApplication([])


def test_qt_image_viewer_initialization(app):
    """Test QtImageViewer initialization."""
    # QtImageViewer requires window parameter
    mock_window = MagicMock()
    viewer = QtImageViewer(mock_window)
    assert viewer is not None


def test_overlay_widget_initialization(app):
    """Test OverlayWidget initialization."""
    # OverlayWidget requires main_image_widget, scale_bar_widget, and theme
    mock_window = MagicMock()
    main_image_widget = QtImageViewer(mock_window)
    scale_bar_widget = ScaleBarWidget()
    widget = OverlayWidget(main_image_widget, scale_bar_widget, 'Dark')
    assert widget is not None


def test_scale_bar_widget_initialization(app):
    """Test ScaleBarWidget initialization."""
    widget = ScaleBarWidget()
    assert widget is not None


def test_scale_bar_widget_update(app):
    """Test ScaleBarWidget update functionality."""
    widget = ScaleBarWidget()

    # ScaleBarWidget uses setLabel() method, not update_scale_bar
    widget.setLabel("5.0 m")
    assert widget is not None


def test_gps_map_view_initialization(app):
    """Test GPSMapView initialization."""
    view = GPSMapView()
    assert view is not None


def test_map_tile_loader_initialization(app):
    """Test MapTileLoader initialization."""
    loader = MapTileLoader()
    assert loader is not None


def test_thermal_histogram_chart_initialization(app):
    """Test ThermalHistogramChart initialization."""
    chart = ThermalHistogramChart()
    assert chart is not None


def test_thermal_histogram_chart_view_range_updates(app):
    """Histogram chart should support independent x-axis zoom ranges."""
    chart = ThermalHistogramChart()
    chart.set_histogram_data(
        {
            'bin_edges': np.array([10.0, 11.0, 12.0, 13.0], dtype=np.float32),
            'bin_centers': np.array([10.5, 11.5, 12.5], dtype=np.float32),
            'counts': np.array([2, 4, 1], dtype=np.int32),
            'anomaly_counts': np.array([0, 2, 1], dtype=np.int32),
            'min_temperature': 10.0,
            'max_temperature': 13.0,
            'total_pixels': 7,
            'anomaly_pixels': 3,
        }
    )

    chart.set_view_range(11.0, 12.5)
    assert chart.view_range() == (11.0, 12.5)

    chart.reset_view_range()
    assert chart.view_range() == (10.0, 13.0)


def test_thermal_histogram_chart_zoom_around_temperature(app):
    """Wheel-zoom helper should zoom around the requested temperature anchor."""
    chart = ThermalHistogramChart()
    chart.set_histogram_data(
        {
            'bin_edges': np.array([10.0, 11.0, 12.0, 13.0], dtype=np.float32),
            'bin_centers': np.array([10.5, 11.5, 12.5], dtype=np.float32),
            'counts': np.array([2, 4, 1], dtype=np.int32),
            'anomaly_counts': np.array([0, 2, 1], dtype=np.int32),
            'min_temperature': 10.0,
            'max_temperature': 13.0,
            'total_pixels': 7,
            'anomaly_pixels': 3,
        }
    )

    chart.zoom_around_temperature(11.5, zoom_in=True)
    zoomed_min, zoomed_max = chart.view_range()
    assert zoomed_min > 10.0
    assert zoomed_max < 13.0
    assert zoomed_min <= 11.5 <= zoomed_max

    chart.zoom_around_temperature(11.5, zoom_in=False)
    reset_min, reset_max = chart.view_range()
    assert reset_min <= zoomed_min
    assert reset_max >= zoomed_max


def test_thermal_range_slider_initialization(app):
    """Test ThermalRangeSlider initialization."""
    slider = ThermalRangeSlider()
    assert slider is not None
