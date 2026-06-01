"""Unit tests for StreamManager FPS-limit behavior."""

from unittest.mock import Mock, patch

from core.services.streaming.RTMPStreamService import StreamManager, StreamType


def _build_mock_service():
    service = Mock()
    for signal_name in [
        "frameReady",
        "connectionStatusChanged",
        "streamStatsChanged",
        "videoPositionChanged",
        "errorOccurred",
    ]:
        signal = Mock()
        signal.connect = Mock()
        setattr(service, signal_name, signal)
    service.start = Mock()
    return service


class TestStreamManagerFpsLimit:
    """Test FPS-limit mapping from UI/controller into stream config."""

    def test_connect_with_none_preserves_source_fps_mode(self):
        manager = StreamManager()
        mock_service = _build_mock_service()

        with patch("core.services.streaming.RTMPStreamService.RTMPStreamService", return_value=mock_service) as ctor:
            assert manager.connect_to_stream("video.mp4", StreamType.FILE, fps_limit=None) is True
            stream_config = ctor.call_args.args[0]
            assert stream_config.fps_limit is None

    def test_connect_with_zero_normalizes_to_source_fps_mode(self):
        manager = StreamManager()
        mock_service = _build_mock_service()

        with patch("core.services.streaming.RTMPStreamService.RTMPStreamService", return_value=mock_service) as ctor:
            assert manager.connect_to_stream("video.mp4", StreamType.FILE, fps_limit=0) is True
            stream_config = ctor.call_args.args[0]
            assert stream_config.fps_limit is None

    def test_connect_with_positive_value_uses_explicit_cap(self):
        manager = StreamManager()
        mock_service = _build_mock_service()

        with patch("core.services.streaming.RTMPStreamService.RTMPStreamService", return_value=mock_service) as ctor:
            assert manager.connect_to_stream("video.mp4", StreamType.FILE, fps_limit=15) is True
            stream_config = ctor.call_args.args[0]
            assert stream_config.fps_limit == 15

    def test_connect_with_high_fps_is_clamped(self):
        manager = StreamManager()
        mock_service = _build_mock_service()

        with patch("core.services.streaming.RTMPStreamService.RTMPStreamService", return_value=mock_service) as ctor:
            assert manager.connect_to_stream("video.mp4", StreamType.FILE, fps_limit=240) is True
            stream_config = ctor.call_args.args[0]
            assert stream_config.fps_limit == 60
