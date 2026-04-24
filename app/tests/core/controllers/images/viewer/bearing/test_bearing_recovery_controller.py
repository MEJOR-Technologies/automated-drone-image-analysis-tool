"""Unit tests for BearingRecoveryController."""

import pytest
from unittest.mock import MagicMock, patch
from PySide6.QtWidgets import QDialog

from core.controllers.images.viewer.bearing.BearingRecoveryController import (
    BearingRecoveryController,
)


@pytest.fixture
def controller():
    return BearingRecoveryController(MagicMock())


def test_xml_bearings_exist_returns_zero(controller):
    images = [
        {"path": "img1.jpg", "bearing": 90.0},
        {"path": "img2.jpg", "bearing": None},
    ]
    assert controller.check_and_recover_bearings(images, MagicMock(), "/x.xml") == 0


def test_exif_gimbal_bearing_returns_zero(controller):
    images = [{"path": "img1.jpg", "bearing": None}]

    with patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.ImageService"
    ) as MockService:
        MockService.return_value.get_camera_yaw.return_value = 90.0
        result = controller.check_and_recover_bearings(images, MagicMock(), "/x.xml")

    assert result == 0


def test_exif_check_raises_exception_continues_to_dialog(controller):
    images = [{"path": "img1.jpg", "bearing": None}]

    with patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.ImageService"
    ) as MockService, patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.BearingRecoveryDialog"
    ) as MockDialog:
        MockService.side_effect = RuntimeError("EXIF error")
        MockDialog.return_value.exec.return_value = QDialog.Rejected

        result = controller.check_and_recover_bearings(images, MagicMock(), "/x.xml")

    # Dialog was shown (EXIF check failed but recovery path continued)
    assert result == 0
    MockDialog.assert_called_once()


def test_dialog_accepted_saves_bearings(controller):
    images = [
        {"path": "img1.jpg", "bearing": None},
        {"path": "img2.jpg", "bearing": None},
    ]
    xml_service = MagicMock()
    xml_service.set_multiple_bearings.return_value = 2

    with patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.ImageService"
    ) as MockService, patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.BearingRecoveryDialog"
    ) as MockDialog:
        MockService.return_value.get_camera_yaw.return_value = None
        MockDialog.return_value.exec.return_value = QDialog.Accepted
        MockDialog.return_value.get_results.return_value = {"img1.jpg": 90.0, "img2.jpg": 180.0}

        result = controller.check_and_recover_bearings(images, xml_service, "/x.xml")

    assert result == 2
    xml_service.set_multiple_bearings.assert_called_once()
    xml_service.save_xml_file.assert_called_once_with("/x.xml")


def test_dialog_rejected_returns_zero(controller):
    images = [{"path": "img1.jpg", "bearing": None}]

    with patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.ImageService"
    ) as MockService, patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.BearingRecoveryDialog"
    ) as MockDialog:
        MockService.return_value.get_camera_yaw.return_value = None
        MockDialog.return_value.exec.return_value = QDialog.Rejected

        result = controller.check_and_recover_bearings(images, MagicMock(), "/x.xml")

    assert result == 0


def test_empty_image_list_returns_zero(controller):
    assert controller.check_and_recover_bearings([], MagicMock(), "/x.xml") == 0


def test_dialog_accepted_with_empty_results(controller):
    images = [{"path": "img1.jpg", "bearing": None}]
    xml_service = MagicMock()

    with patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.ImageService"
    ) as MockService, patch(
        "core.controllers.images.viewer.bearing.BearingRecoveryController.BearingRecoveryDialog"
    ) as MockDialog:
        MockService.return_value.get_camera_yaw.return_value = None
        MockDialog.return_value.exec.return_value = QDialog.Accepted
        MockDialog.return_value.get_results.return_value = {}

        result = controller.check_and_recover_bearings(images, xml_service, "/x.xml")

    assert result == 0
    xml_service.set_multiple_bearings.assert_not_called()
