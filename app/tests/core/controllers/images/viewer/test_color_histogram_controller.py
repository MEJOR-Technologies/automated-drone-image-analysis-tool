"""Tests for ColorHistogramController."""

from unittest.mock import MagicMock

import numpy as np

from core.controllers.images.viewer.ColorHistogramController import (
    ColorHistogramController,
)


def test_color_histogram_controller_refreshes_context_when_aois_change():
    """Same-image AOI updates should rebuild the histogram context."""
    parent = MagicMock()
    parent.is_thermal = False
    parent.current_image = 0
    parent.image_load_controller = MagicMock()

    controller = ColorHistogramController(parent)
    image_array = np.array(
        [
            [[255, 0, 0], [0, 255, 0]],
            [[0, 0, 255], [255, 255, 0]],
        ],
        dtype=np.uint8
    )

    controller.on_image_data_updated(
        image_array,
        [{'detected_pixels': [(0, 0)]}]
    )
    assert controller.current_context['histogram_data']['anomaly_pixels'] == 1

    controller.on_image_data_updated(
        image_array,
        [{'detected_pixels': [(0, 0), (1, 0), (0, 1)]}]
    )
    assert controller.current_context['histogram_data']['anomaly_pixels'] == 3
