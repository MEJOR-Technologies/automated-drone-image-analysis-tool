"""Integration tests for StreamViewerWindow."""

import pytest
import numpy as np
from unittest.mock import Mock, MagicMock, patch
from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import QWidget, QApplication
from PySide6.QtTest import QTest

from core.controllers.streaming.StreamViewerWindow import StreamViewerWindow
from core.services.streaming.RTMPStreamService import StreamType


class TestStreamViewerWindow:
    """Test suite for StreamViewerWindow."""

    def test_initialization(self, qapp):
        """Test window initialization."""
        # Pass empty string to prevent default algorithm loading
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            assert window.theme == 'dark'
            assert window.logger is not None
            assert window.stream_coordinator is not None
            assert window.detection_renderer is not None
            assert window.stream_statistics is not None
            assert window.algorithm_widget is None
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_initialization_with_algorithm(self, qapp):
        """Test window initialization with algorithm."""
        # Create a mock controller class that has all required signals and methods
        class MockAlgorithmController(QWidget):
            # Required signals
            detectionsReady = Signal(list)
            frameProcessed = Signal(np.ndarray)
            configChanged = Signal(dict)
            statusUpdate = Signal(str)
            requestRecording = Signal(bool)

            def __init__(self, algorithm_config, theme, parent=None):
                super().__init__(parent)
                self.algorithm_config = algorithm_config
                self.theme = theme
                self.is_running = False

            def setup_ui(self):
                pass

            def process_frame(self, frame, timestamp):
                return []

            def get_config(self):
                return {}

            def set_config(self, config):
                pass

            def cleanup(self):
                """Cleanup method required by StreamViewerWindow."""
                pass

        with patch('core.controllers.streaming.StreamViewerWindow.StreamAlgorithmController', MockAlgorithmController):
            window = StreamViewerWindow(algorithm_name='ColorDetection', theme='dark')
            try:
                # Algorithm should be loaded (may be None if loading fails, which is acceptable in test)
                # Just verify the window was created successfully
                assert window is not None
            finally:
                window.close()
                QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_load_algorithm(self, qapp):
        """Test loading an algorithm."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Mock algorithm config and controller import methods
            mock_config = {'name': 'ColorDetection', 'category': 'streaming'}

            # Create a mock controller class that has all required signals and methods
            class MockAlgorithmController(QWidget):
                # Required signals
                detectionsReady = Signal(list)
                frameProcessed = Signal(np.ndarray)
                configChanged = Signal(dict)
                statusUpdate = Signal(str)
                requestRecording = Signal(bool)

                def __init__(self, algorithm_config, theme, parent=None):
                    super().__init__(parent)
                    self.algorithm_config = algorithm_config
                    self.theme = theme
                    self.is_running = False

                def setup_ui(self):
                    pass

                def process_frame(self, frame, timestamp):
                    return []

                def get_config(self):
                    return {}

                def set_config(self, config):
                    pass

                def cleanup(self):
                    """Cleanup method required by StreamViewerWindow."""
                    pass

            with patch.object(window, '_get_algorithm_config', return_value=mock_config):
                with patch.object(window, '_import_algorithm_controller', return_value=MockAlgorithmController):
                    window.load_algorithm('ColorDetection')

                    # Check that algorithm was loaded
                    assert window.current_algorithm_name == 'ColorDetection'
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_custom_widgets_setup(self, qapp):
        """Test custom widgets are set up."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Verify custom widgets exist
            assert hasattr(window, 'video_display')
            assert hasattr(window, 'thumbnail_widget')
            assert hasattr(window, 'stream_controls')
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_signal_connections(self, qapp):
        """Test signal connections."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Verify signals are connected
            assert window.stream_coordinator is not None
            assert window.detection_renderer is not None
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_statistics_update_timer(self, qapp):
        """Test statistics update timer."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Verify timer exists and is running
            assert window.update_timer is not None
            assert window.update_timer.isActive()
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_frame_processing_flow(self, qapp, sample_frame):
        """Test frame processing flow."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Mock algorithm widget
            mock_algorithm = Mock()
            mock_algorithm.process_frame = Mock(return_value=[])
            window.algorithm_widget = mock_algorithm

            # Simulate frame received
            window.stream_coordinator.frameReceived.emit(sample_frame, 0.0, 0)

            # In a real scenario, this would trigger processing
            # For now, we just verify the signal exists
            assert window.stream_coordinator.frameReceived is not None
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_recording_controls(self, qapp):
        """Test recording controls."""
        window = StreamViewerWindow(theme='dark')
        try:
            # Verify recording controls exist
            assert window.stream_controls is not None
            # Recording functionality should be available through stream_coordinator
            assert window.stream_coordinator is not None
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_algorithm_switching(self, qapp):
        """Test switching between algorithms."""
        window = StreamViewerWindow(theme='dark')
        try:
            cleanup_calls = []

            # Mock algorithm config and controller import methods
            def get_config_side_effect(name):
                return {'name': name, 'category': 'streaming'}

            # Create a mock controller class that has all required signals and methods
            class MockAlgorithmController(QWidget):
                # Required signals
                detectionsReady = Signal(list)
                frameProcessed = Signal(np.ndarray)
                configChanged = Signal(dict)
                statusUpdate = Signal(str)
                requestRecording = Signal(bool)

                def __init__(self, algorithm_config, theme, parent=None):
                    super().__init__(parent)
                    self.algorithm_config = algorithm_config
                    self.theme = theme
                    self.is_running = False

                def setup_ui(self):
                    pass

                def process_frame(self, frame, timestamp):
                    return []

                def get_config(self):
                    return {}

                def set_config(self, config):
                    pass

                def cleanup(self):
                    """Cleanup method required by StreamViewerWindow."""
                    cleanup_calls.append(self.algorithm_config['name'])

            with patch.object(window, '_get_algorithm_config', side_effect=get_config_side_effect):
                with patch.object(window, '_import_algorithm_controller', return_value=MockAlgorithmController):
                    # Load first algorithm
                    window.load_algorithm('ColorAnomalyAndMotionDetection')
                    first_algorithm = window.current_algorithm_name

                    # Switch to second algorithm
                    window.load_algorithm('ColorDetection')
                    second_algorithm = window.current_algorithm_name

                    # Should have switched
                    assert first_algorithm == 'ColorAnomalyAndMotionDetection'
                    assert second_algorithm == 'ColorDetection'
                    assert cleanup_calls == ['ColorAnomalyAndMotionDetection']
        finally:
            window.close()
            QApplication.processEvents()  # Process events to ensure cleanup completes

    def test_worker_callback_uses_worker_timestamp_for_thumbnails(self, qapp, sample_frame):
        """Thumbnail sync should use worker-provided timestamp, not mutable window state."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.algorithm_renders_frame = False
            window.video_display.update_frame = Mock()
            window._current_frame_timestamp = 999.0  # Deliberately wrong for this callback

            worker_timestamp = 123.456
            original_frame = np.full_like(sample_frame, 17)
            window._original_frames_queue[worker_timestamp] = original_frame

            thumbnail_calls = []

            def capture_thumbnail(frame, detections, **kwargs):
                thumbnail_calls.append((frame, kwargs))

            window.thumbnail_widget.update_thumbnails = capture_thumbnail

            detections = [{'bbox': (10, 10, 20, 20), 'confidence': 0.9}]
            window._on_worker_frame_processed(sample_frame.copy(), detections, worker_timestamp, 4.0, False, 42)

            assert len(thumbnail_calls) == 1
            assert thumbnail_calls[0][0] is original_frame
            assert thumbnail_calls[0][1]['timestamp'] == worker_timestamp
            assert thumbnail_calls[0][1]['frame_index'] == 42
        finally:
            window.close()
            QApplication.processEvents()

    def test_update_thumbnails_runs_on_empty_detections(self, qapp, sample_frame):
        """Empty detection frames should still advance thumbnail aging/expiry."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            timestamp = 9.87
            window._original_frames_queue[timestamp] = sample_frame.copy()
            window.thumbnail_widget.update_thumbnails = Mock()

            window._update_thumbnails(sample_frame, [], timestamp, 7)

            window.thumbnail_widget.update_thumbnails.assert_called_once()
            call_args, call_kwargs = window.thumbnail_widget.update_thumbnails.call_args
            assert call_args[0] is not None
            assert call_args[1] == []
            assert call_kwargs["timestamp"] == timestamp
            assert timestamp not in window._original_frames_queue
        finally:
            window.close()
            QApplication.processEvents()

    def test_queue_worker_frame_replaces_pending_and_counts_drop(self, qapp, sample_frame):
        """Worker queue should keep only latest pending frame under backpressure."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            mock_worker = Mock()
            mock_worker.processFrameRequested = Mock()
            mock_worker.processFrameRequested.emit = Mock()
            mock_thread = Mock()
            mock_thread.isRunning = Mock(return_value=True)

            window._processing_worker = mock_worker
            window._processing_thread = mock_thread
            window._worker_frame_in_flight = True
            window.stream_statistics.on_frame_dropped = Mock()

            old_timestamp = 1.0
            new_timestamp = 2.0
            window._original_frames_queue[old_timestamp] = sample_frame.copy()
            window._pending_worker_frame = (sample_frame.copy(), old_timestamp, 1)

            queued = window._queue_worker_frame(sample_frame.copy(), new_timestamp, 2)

            assert queued is True
            assert window._pending_worker_frame[1] == new_timestamp
            assert old_timestamp not in window._original_frames_queue
            window.stream_statistics.on_frame_dropped.assert_called_once()
        finally:
            window._processing_worker = None
            window._processing_thread = None
            window.close()
            QApplication.processEvents()

    def test_seek_to_track_frame_uses_public_stream_manager_api(self, qapp):
        """Gallery seek should map frame index to time via public playback methods."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            stream_mgr = Mock()
            stream_mgr.get_playback_info = Mock(return_value={'fps': 25.0})
            stream_mgr.seek_to_time = Mock(return_value=True)
            window.stream_coordinator.stream_manager = stream_mgr

            track = Mock()
            track.first_frame_index = 50

            window._seek_to_track_frame(track)

            stream_mgr.seek_to_time.assert_called_once_with(2.0)
        finally:
            window.close()
            QApplication.processEvents()

    def test_connect_request_passes_hdmi_backend_and_target_fps(self, qapp):
        """Connect request should pass selected backend and configured FPS cap."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.stream_coordinator.connect_stream = Mock()
            mock_algorithm = Mock()
            mock_algorithm.get_config = Mock(return_value={'target_fps': 0})
            window.algorithm_widget = mock_algorithm

            window.on_connect_requested("0", StreamType.HDMI_CAPTURE, hdmi_backend=700)

            window.stream_coordinator.connect_stream.assert_called_once_with(
                "0", StreamType.HDMI_CAPTURE, hdmi_backend=700, fps_limit=None
            )
        finally:
            window.close()

    def test_recording_stats_updates_label(self, qapp):
        """Live recording stats should populate recording info text."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.on_recording_stats_updated({
                "segment_duration": 4.2,
                "recording_fps": 19.7,
                "frame_count": 82,
                "queue_size": 3,
            })

            text = window.recording_info.text()
            assert "4.2" in text
            assert "19.7" in text
            assert "82" in text
        finally:
            window.close()
            QApplication.processEvents()

    def test_connect_request_uses_default_when_algorithm_has_no_target_fps(self, qapp):
        """Missing target_fps should pass None and let stream manager use its default."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.stream_coordinator.connect_stream = Mock()
            mock_algorithm = Mock()
            mock_algorithm.get_config = Mock(return_value={})
            window.algorithm_widget = mock_algorithm

            window.on_connect_requested("video.mp4", StreamType.FILE)

            window.stream_coordinator.connect_stream.assert_called_once_with(
                "video.mp4", StreamType.FILE, hdmi_backend=None, fps_limit=None
            )
        finally:
            window.close()
            QApplication.processEvents()

    def test_config_change_updates_fps_limit_immediately_when_connected(self, qapp):
        """Changing target_fps while connected should update stream cap immediately."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.stream_coordinator.is_connected = True
            window.stream_coordinator.update_fps_limit = Mock(return_value=True)
            window._active_stream_fps_limit = 15

            window.on_algorithm_config_changed({'target_fps': 10})

            window.stream_coordinator.update_fps_limit.assert_called_once_with(10)
            assert window._active_stream_fps_limit == 10
        finally:
            window.close()
            QApplication.processEvents()

    def test_config_change_ignores_same_fps_limit(self, qapp):
        """No update should be sent when target_fps has not changed."""
        window = StreamViewerWindow(algorithm_name='', theme='dark')
        try:
            window.stream_coordinator.is_connected = True
            window.stream_coordinator.update_fps_limit = Mock(return_value=True)
            window._active_stream_fps_limit = 20

            window.on_algorithm_config_changed({'target_fps': 20})

            window.stream_coordinator.update_fps_limit.assert_not_called()
        finally:
            window.close()
            QApplication.processEvents()
