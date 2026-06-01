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
from core.views.images.viewer.widgets.HueWheelRangeSelector import HueWheelRangeSelector
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


def test_thermal_histogram_chart_overlay_count_modes(app):
    """Overlay height should be configurable between full-bin and anomaly-count modes."""
    counts = np.array([10, 20, 30], dtype=np.int32)
    anomaly_counts = np.array([1, 4, 2], dtype=np.int32)

    assert ThermalHistogramChart._overlay_count_for_index(1, counts, anomaly_counts, 'full_bin') == 20.0
    assert ThermalHistogramChart._overlay_count_for_index(1, counts, anomaly_counts, 'anomaly_count') == 4.0


def test_thermal_histogram_chart_can_show_aoi_only(app):
    """Chart should track AOI-only display state."""
    chart = ThermalHistogramChart()
    assert not chart.show_aoi_only()

    chart.set_show_aoi_only(True)
    assert chart.show_aoi_only()


def test_thermal_range_slider_initialization(app):
    """Test ThermalRangeSlider initialization."""
    slider = ThermalRangeSlider()
    assert slider is not None


def test_thermal_range_slider_track_visual_updates(app):
    """Slider should support alternate track visuals for hue ranges."""
    slider = ThermalRangeSlider()
    assert slider.track_visual() == 'neutral'

    slider.set_track_visual('hue_wheel')
    assert slider.track_visual() == 'hue_wheel'


def test_thermal_range_slider_wrap_updates(app):
    """Slider should track wrap-mode state for hue selections."""
    slider = ThermalRangeSlider()
    assert not slider.selection_wrap()

    slider.set_selection_wrap(True)
    assert slider.selection_wrap()


def test_hue_wheel_range_selector_updates(app):
    """Hue wheel selector should store value and wrap state changes."""
    selector = HueWheelRangeSelector()
    selector.set_range(0.0, 360.0)
    selector.set_values(25.4, 140.2)
    selector.set_selection_wrap(True)

    assert selector.values() == (25, 140)
    assert selector.selection_wrap()
