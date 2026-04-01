"""
RTMPStreamService.py - Real-time RTMP stream processing service for ADIAT

Handles RTMP/HLS video stream input with optimized performance for real-time
color detection applications. Designed for <250ms latency processing.
"""

# Set environment variable to avoid numpy compatibility issues - MUST be first
from core.services.LoggerService import LoggerService
from helpers.VideoFileHelper import detect_thumbnail_track, remux_to_main_track, is_ffmpeg_available, _FFMPEG_USER_MSG
from PySide6.QtCore import QObject, QThread, Signal
from dataclasses import dataclass
from enum import Enum
from typing import Optional, Tuple, Callable, Dict, Any
from queue import Queue, Empty
import time
import threading
import numpy as np
import cv2
import os
os.environ.setdefault('NUMPY_EXPERIMENTAL_DTYPE_API', '0')
# Also set these for better compatibility
os.environ.setdefault('NUMBA_DISABLE_INTEL_SVML', '1')
os.environ.setdefault('NPY_DISABLE_SVML', '1')


class StreamType(Enum):
    RTMP = "rtmp"
    HLS = "hls"
    FILE = "file"
    HDMI_CAPTURE = "hdmi_capture"


DEFAULT_SAFETY_FPS_LIMIT = 30
MAX_REASONABLE_FPS_LIMIT = 60


@dataclass
class StreamConfig:
    """Configuration for stream connection."""
    url: str
    stream_type: StreamType = StreamType.RTMP
    reconnect_attempts: int = 5
    buffer_size: int = 1  # Minimize buffering for real-time
    fps_limit: Optional[int] = None
    resolution_limit: Optional[Tuple[int, int]] = None
    hdmi_backend: Optional[int] = None  # OpenCV backend for HDMI capture


@dataclass
class FrameData:
    """Container for frame and metadata."""
    frame: np.ndarray
    timestamp: float
    frame_number: int
    fps: float


class RTMPStreamService(QThread):
    """
    Real-time RTMP stream processing service optimized for low-latency applications.

    Features:
    - Sub-250ms latency processing pipeline
    - Automatic reconnection with exponential backoff
    - Frame rate adaptation and quality scaling
    - Thread-safe frame delivery
    - GPU acceleration when available
    """

    # Signals for Qt integration
    frameReady = Signal(np.ndarray, float, int)  # frame, timestamp, frame_number
    connectionStatusChanged = Signal(bool, str)  # connected, status_message
    streamStatsChanged = Signal(dict)  # fps, resolution, bitrate, etc.
    errorOccurred = Signal(str)  # error_message
    videoPositionChanged = Signal(float, float)  # current_time, total_time

    def __init__(self, config: StreamConfig):
        super().__init__()
        self.config = config
        self.config.fps_limit = self._normalize_fps_limit(config.fps_limit)
        self.config.resolution_limit = self._normalize_resolution_limit(config.resolution_limit)
        self.logger = LoggerService()

        # Stream state
        self._cap = None
        self._connected = False
        self._should_stop = False
        self._frame_number = 0
        self._last_frame_time = 0
        self._remuxed_temp_path = None

        # Performance tracking
        self._fps_counter = 0
        self._fps_start_time = time.time()
        self._current_fps = 0
        self._capture_dropped_frames = 0
        self._source_fps_hint = 0.0

        # Video file playback control
        self._is_file = (config.stream_type == StreamType.FILE)
        self._is_playing = True
        self._total_frames = 0
        self._current_frame_pos = 0
        self._video_fps = 30
        self._total_duration = 0
        self._playback_lock = threading.Lock()

        # Seek request mechanism for thread safety
        self._seek_requested = False
        self._seek_target_frame = 0

        # Frame processing
        self._frame_queue = Queue(maxsize=3)  # Small buffer for real-time
        self._processing_thread = None

        # Reconnection logic
        self._current_reconnect_delay = 1.0
        self._max_reconnect_delay = 30.0

    @staticmethod
    def _normalize_fps_limit(fps_limit: Optional[int]) -> Optional[int]:
        """Normalize FPS limits to a supported range or None for source cadence."""
        if fps_limit is None:
            return None
        if int(fps_limit) <= 0:
            return None
        return max(1, min(int(fps_limit), MAX_REASONABLE_FPS_LIMIT))

    @staticmethod
    def _normalize_resolution_limit(
        resolution_limit: Optional[Tuple[Optional[int], Optional[int]]]
    ) -> Optional[Tuple[int, int]]:
        """Normalize legacy native-resolution sentinels to None."""
        if resolution_limit is None:
            return None

        try:
            width, height = resolution_limit
        except (TypeError, ValueError):
            return None

        if width is None or height is None:
            return None

        try:
            width = int(width)
            height = int(height)
        except (TypeError, ValueError):
            return None

        if width <= 0 or height <= 0:
            return None
        if width >= 99999 or height >= 99999:
            return None

        return width, height

    def _get_live_source_fps_limit(self) -> int:
        """Return the live-source cadence capped to a reasonable processing rate."""
        source_fps = float(self._source_fps_hint or 0.0)
        if source_fps <= 0.0:
            source_fps = float(MAX_REASONABLE_FPS_LIMIT)
        return max(1, min(int(round(source_fps)), MAX_REASONABLE_FPS_LIMIT))

    def run(self):
        """Main thread loop for stream processing."""
        # self.logger.info(f"Starting RTMP stream service: {self.config.url}")

        reconnect_attempts = 0

        while not self._should_stop and reconnect_attempts < self.config.reconnect_attempts:
            try:
                if self._connect_to_stream():
                    self._connected = True
                    self.connectionStatusChanged.emit(True, "Connected")
                    reconnect_attempts = 0  # Reset on successful connection
                    self._current_reconnect_delay = 1.0

                    # Start processing loop
                    self._process_stream()

                else:
                    reconnect_attempts += 1
                    if reconnect_attempts < self.config.reconnect_attempts:
                        self.connectionStatusChanged.emit(False, f"Reconnecting... (attempt {reconnect_attempts})")
                        time.sleep(self._current_reconnect_delay)
                        self._current_reconnect_delay = min(self._current_reconnect_delay * 2, self._max_reconnect_delay)

            except Exception as e:
                self.logger.error(f"Stream processing error: {e}")
                self.errorOccurred.emit(str(e))
                break

        if reconnect_attempts >= self.config.reconnect_attempts:
            self.errorOccurred.emit("Maximum reconnection attempts exceeded")

        self._cleanup()
        self.connectionStatusChanged.emit(False, "Disconnected")

    def _connect_to_stream(self) -> bool:
        """Establish connection to the video stream."""
        try:
            # self.logger.info(f"Connecting to stream: {self.config.url}")

            # Configure OpenCV for different stream types
            if self.config.stream_type == StreamType.HDMI_CAPTURE:
                # Handle HDMI capture device
                try:
                    device_index = int(self.config.url)
                    # self.logger.info(f"Connecting to HDMI capture device {device_index}")

                    # Try the specified backend first, then fall back to others
                    backends_to_try = []
                    if self.config.hdmi_backend is not None:
                        backends_to_try.append((self.config.hdmi_backend, "Specified"))
                    # Add fallback backends
                    if hasattr(cv2, 'CAP_MSMF'):
                        backends_to_try.append((cv2.CAP_MSMF, "MSMF"))
                    if hasattr(cv2, 'CAP_DSHOW'):
                        backends_to_try.append((cv2.CAP_DSHOW, "DirectShow"))
                    backends_to_try.append((cv2.CAP_ANY, "Auto"))

                    # Try each backend until one works
                    for backend_id, backend_name in backends_to_try:
                        self._cap = cv2.VideoCapture(device_index, backend_id)
                        if self._cap is not None and self._cap.isOpened():
                            # self.logger.info(f"HDMI: Connected using {backend_name} backend")
                            break
                        if self._cap is not None:
                            self._cap.release()
                            self._cap = None

                    if self._cap is None or not self._cap.isOpened():
                        self.logger.error(f"Failed to open HDMI device {device_index} with any backend")
                        return False

                except ValueError:
                    self.logger.error(f"Invalid device index: {self.config.url}")
                    return False
            elif self.config.stream_type == StreamType.RTMP:
                # Handle RTMP streams with FFMPEG backend for better compatibility
                # self.logger.info(f"Connecting to RTMP stream: {self.config.url}")
                self._cap = cv2.VideoCapture(self.config.url, cv2.CAP_FFMPEG)
                # Set buffer size for low latency
                self._cap.set(cv2.CAP_PROP_BUFFERSIZE, 2)
            else:
                # Handle HLS streams and files
                self._cap = cv2.VideoCapture(self.config.url)

            if not self._cap.isOpened():
                self.logger.error("Failed to open stream")
                return False

            # Optimize for real-time processing
            self._cap.set(cv2.CAP_PROP_BUFFERSIZE, self.config.buffer_size)
            if self.config.fps_limit is not None and self.config.fps_limit > 0:
                self._cap.set(cv2.CAP_PROP_FPS, self.config.fps_limit)

            # Additional settings for HDMI/USB capture devices
            if self.config.stream_type == StreamType.HDMI_CAPTURE:
                # Minimize buffer for low latency
                self._cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

                # Try to set preferred resolution, but accept device defaults if it fails
                # Some devices don't support resolution changes
                target_width, target_height = 1280, 720
                self._cap.set(cv2.CAP_PROP_FRAME_WIDTH, target_width)
                self._cap.set(cv2.CAP_PROP_FRAME_HEIGHT, target_height)

                # Check what resolution we actually got
                actual_width = int(self._cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                actual_height = int(self._cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                if actual_width != target_width or actual_height != target_height:
                    self.logger.info(f"Capture device using native resolution: {actual_width}x{actual_height}")

                # self.logger.info(f"Capture device configured: {actual_width}x{actual_height}")

            # Test frame read
            ret, frame = self._cap.read()
            if not ret or frame is None:
                self.logger.error("Failed to read initial frame")
                return False

            # Detect and fix MP4s where OpenCV grabbed a thumbnail track
            # (e.g. Skydio X10 embeds MJPEG cover art as stream 0)
            if self._is_file and detect_thumbnail_track(self._cap):
                self.logger.info("Detected thumbnail track in video file, remuxing to select main video track")
                temp_path = remux_to_main_track(self.config.url, self.logger)
                if temp_path:
                    self._cap.release()
                    self._remuxed_temp_path = temp_path
                    self._cap = cv2.VideoCapture(temp_path)
                    if not self._cap.isOpened():
                        self.logger.error("Failed to open remuxed video")
                        os.unlink(temp_path)
                        self._remuxed_temp_path = None
                        return False
                    ret, frame = self._cap.read()
                    if not ret or frame is None:
                        self.logger.error("Failed to read frame from remuxed video")
                        return False
                else:
                    if not is_ffmpeg_available():
                        self.logger.error(_FFMPEG_USER_MSG)
                        self.errorOccurred.emit(_FFMPEG_USER_MSG)
                    else:
                        self.logger.error("Failed to remux video to select main track")
                    return False

            # Log stream properties
            fps = self._cap.get(cv2.CAP_PROP_FPS)
            width = int(self._cap.get(cv2.CAP_PROP_FRAME_WIDTH))
            height = int(self._cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            self._source_fps_hint = float(fps) if fps and fps > 0 else 0.0

            # Get file-specific properties if this is a video file
            if self._is_file:
                self._total_frames = int(self._cap.get(cv2.CAP_PROP_FRAME_COUNT))
                self._video_fps = fps if fps > 0 else 30
                self._total_duration = self._total_frames / self._video_fps if self._video_fps > 0 else 0
                # self.logger.info(f"Video file connected: {width}x{height} @ {fps}fps, "f"{self._total_frames} frames, {self._total_duration:.1f}s duration")
            else:
                # self.logger.info(f"Stream connected: {width}x{height} @ {fps}fps")
                pass

            # Emit initial stats
            stats = {
                'fps': fps,
                'resolution': (width, height),
                'connected_time': time.time(),
                'capture_dropped_frames': self._capture_dropped_frames,
            }

            # Add file-specific stats
            if self._is_file:
                stats.update({
                    'is_file': True,
                    'total_frames': self._total_frames,
                    'total_duration': self._total_duration,
                    'current_position': 0
                })
                # Emit initial position
                self.videoPositionChanged.emit(0, self._total_duration)

            self.streamStatsChanged.emit(stats)

            return True

        except Exception as e:
            self.logger.error(f"Connection error: {e}")
            if self._cap:
                self._cap.release()
                self._cap = None
            return False

    def _process_stream(self):
        """Main stream processing loop optimized for low latency."""
        last_process_time = 0
        consecutive_errors = 0
        max_consecutive_errors = 5

        while not self._should_stop and self._connected and self._cap and self._cap.isOpened():
            try:
                current_time = time.time()
                # Re-read current FPS limit each iteration so runtime updates apply immediately.
                fps_limit = self._normalize_fps_limit(self.config.fps_limit)
                live_fps_limit = fps_limit if fps_limit is not None else self._get_live_source_fps_limit()
                frame_interval = (1.0 / live_fps_limit) if live_fps_limit > 0 else 0.0

                # Handle pause state and seek requests for video files
                if self._is_file:
                    seek_just_completed = False
                    with self._playback_lock:
                        # Handle seek requests first (thread-safe)
                        if self._seek_requested and self._cap:
                            try:
                                self._cap.set(cv2.CAP_PROP_POS_FRAMES, self._seek_target_frame)
                                self._current_frame_pos = self._seek_target_frame
                                self._seek_requested = False
                                seek_just_completed = True  # Flag to read one frame even if paused
                                # self.logger.info(f"Seek completed to frame {self._seek_target_frame}")
                            except Exception as e:
                                self.logger.error(f"Seek execution error: {e}")
                                self._seek_requested = False

                        # Handle pause state - but allow one frame after seek
                        if not self._is_playing and not seek_just_completed:
                            time.sleep(0.1)  # Sleep while paused
                            continue

                # Frame rate limiting for non-live sources
                if self.config.stream_type not in (StreamType.HDMI_CAPTURE, StreamType.RTMP):
                    target_interval = 0.0
                    if self._is_file and self._video_fps > 0:
                        # Source-FPS mode follows the source file rate.
                        # Explicit limits cap that source rate.
                        effective_fps = self._video_fps if fps_limit is None else min(self._video_fps, fps_limit)
                        target_interval = (1.0 / effective_fps) if effective_fps > 0 else 0.0
                    elif fps_limit is not None and fps_limit > 0:
                        target_interval = frame_interval

                    if target_interval > 0 and current_time - last_process_time < target_interval:
                        time.sleep(0.001)  # Small sleep to prevent excessive CPU usage
                        continue

                # For live sources (HDMI/RTMP), apply frame rate limiting to prevent queue backup
                # Process at target FPS, dropping frames that arrive faster
                if self.config.stream_type in (StreamType.HDMI_CAPTURE, StreamType.RTMP) and frame_interval > 0:
                    if current_time - last_process_time < frame_interval:
                        # Drain the buffer by reading and discarding frames
                        # This keeps us synced with the live feed
                        if self._cap.grab():  # Fast grab without decode
                            self._capture_dropped_frames += 1
                        # Try a couple extra grabs to collapse buffered backlog quickly.
                        self._drop_stale_live_frames(max_grabs=2)
                        continue

                # Read frame with timeout handling - TIME THIS (critical for high-res video profiling)
                # read_start = time.perf_counter()
                ret, frame = self._cap.read()
                # read_time_ms = (time.perf_counter() - read_start) * 1000

                if not ret or frame is None:
                    consecutive_errors += 1
                    if consecutive_errors >= max_consecutive_errors:
                        if self._is_file:
                            # End of video file - pause at end instead of disconnecting
                            with self._playback_lock:
                                self._is_playing = False
                                last_frame = max(0, self._total_frames - 1)
                                self._cap.set(cv2.CAP_PROP_POS_FRAMES, last_frame)
                                self._current_frame_pos = last_frame
                            self.videoPositionChanged.emit(self._total_duration, self._total_duration)
                            self.streamStatsChanged.emit({'is_playing': False})
                            consecutive_errors = 0
                            continue
                        else:
                            self.logger.error(f"Failed to read {consecutive_errors} consecutive frames, stopping")
                            break
                    else:
                        self.logger.warning(f"Failed to read frame ({consecutive_errors}/{max_consecutive_errors})")
                        time.sleep(0.1)  # Small delay before retry
                        continue

                # Reset error counter on successful frame read
                consecutive_errors = 0

                # Validate frame
                if frame.size == 0:
                    self.logger.warning("Received empty frame")
                    continue

                # Ensure frame is in BGR format (3 channels) for processing
                # Some capture devices return grayscale, YUV, or BGRA
                if len(frame.shape) == 2:
                    # Grayscale (1 channel) - convert to BGR
                    frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)
                elif len(frame.shape) == 3:
                    channels = frame.shape[2]
                    if channels == 4:
                        # BGRA (4 channels) - convert to BGR
                        frame = cv2.cvtColor(frame, cv2.COLOR_BGRA2BGR)
                    elif channels == 1:
                        # Single channel in 3D array - convert to BGR
                        frame = cv2.cvtColor(frame, cv2.COLOR_GRAY2BGR)
                    # channels == 3 is already BGR, no conversion needed

                # Performance optimization: resize if needed
                # resize_start = time.perf_counter()
                try:
                    height, width = frame.shape[:2]
                    # Skip invalid frames (0 dimensions from capture devices without signal)
                    if width <= 0 or height <= 0:
                        continue
                    if (
                        self.config.resolution_limit is not None and
                        (width > self.config.resolution_limit[0] or height > self.config.resolution_limit[1])
                    ):
                        scale_factor = min(
                            self.config.resolution_limit[0] / width,
                            self.config.resolution_limit[1] / height
                        )
                        new_width = int(width * scale_factor)
                        new_height = int(height * scale_factor)
                        # Ensure valid dimensions for resize
                        if new_width > 0 and new_height > 0:
                            frame = cv2.resize(frame, (new_width, new_height), interpolation=cv2.INTER_LINEAR)
                except Exception as e:
                    self.logger.error(f"Error resizing frame: {e}")
                    continue
                # resize_time_ms = (time.perf_counter() - resize_start) * 1000

                # Update performance metrics
                self._update_fps_counter()

                # Update video position for files
                if self._is_file:
                    self._current_frame_pos = int(self._cap.get(cv2.CAP_PROP_POS_FRAMES))
                    current_time_in_video = self._current_frame_pos / self._video_fps if self._video_fps > 0 else 0
                    self.videoPositionChanged.emit(current_time_in_video, self._total_duration)

                # Make a copy of the frame to prevent memory issues
                # copy_start = time.perf_counter()
                try:
                    frame_copy = frame.copy()
                    # copy_time_ms = (time.perf_counter() - copy_start) * 1000

                    # Use perf_counter for consistent timing (not time.time())
                    emit_timestamp = time.perf_counter()

                    # Emit frame for processing with timing metadata attached
                    # For video files, emit actual video position; for live streams, emit cumulative count
                    video_frame_pos = self._current_frame_pos if self._is_file else self._frame_number
                    self.frameReady.emit(frame_copy, emit_timestamp, video_frame_pos)
                    self._frame_number += 1
                    last_process_time = current_time

                except Exception as e:
                    self.logger.error(f"Error emitting frame: {e}")
                    continue

            except Exception as e:
                self.logger.error(f"Frame processing error: {e}")
                consecutive_errors += 1
                if consecutive_errors >= max_consecutive_errors:
                    self.logger.error("Too many consecutive errors, stopping stream")
                    break
                time.sleep(0.1)  # Small delay before retry

    def set_fps_limit(self, fps_limit: Optional[int]) -> Optional[int]:
        """
        Update FPS limit while stream is running.

        Returns:
            The normalized FPS limit that was applied.
        """
        normalized = self._normalize_fps_limit(fps_limit)
        self.config.fps_limit = normalized

        # Best effort: apply to capture backend immediately where supported.
        if self._cap and self._cap.isOpened() and normalized is not None:
            try:
                self._cap.set(cv2.CAP_PROP_FPS, normalized)
            except Exception:
                pass

        return normalized

    def _update_fps_counter(self):
        """Update FPS tracking."""
        self._fps_counter += 1
        current_time = time.time()

        if current_time - self._fps_start_time >= 1.0:
            self._current_fps = self._fps_counter / (current_time - self._fps_start_time)
            self._fps_counter = 0
            self._fps_start_time = current_time

            # Emit updated stats
            if self._cap:
                width = int(self._cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                height = int(self._cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

                self.streamStatsChanged.emit({
                    'fps': self._current_fps,
                    'resolution': (width, height),
                    'frame_number': self._frame_number,
                    'timestamp': current_time,
                    'is_playing': self._is_playing,
                    'capture_dropped_frames': self._capture_dropped_frames,
                })

    def _drop_stale_live_frames(self, max_grabs: int = 2):
        """Drop stale frames from live capture buffers to reduce display lag."""
        if not self._cap or max_grabs <= 0:
            return
        for _ in range(max_grabs):
            try:
                if self._cap.grab():
                    self._capture_dropped_frames += 1
                else:
                    break
            except Exception:
                break

    def stop(self):
        """Stop the stream processing."""
        # self.logger.info("Stopping RTMP stream service")
        self._should_stop = True
        self._connected = False  # Immediately mark as disconnected to break loops

    def play_pause(self):
        """Toggle play/pause state for video files."""
        if not self._is_file:
            return False

        with self._playback_lock:
            self._is_playing = not self._is_playing
            # self.logger.info(f"Video {'playing' if self._is_playing else 'paused'}")
            # Emit immediate update so UI can reflect new play state
            self.streamStatsChanged.emit({'is_playing': self._is_playing})
            return self._is_playing

    def seek_to_time(self, time_seconds: float):
        """Seek to specific time in video file."""
        if not self._is_file or not self._cap:
            return False

        try:
            with self._playback_lock:
                # Calculate frame position
                target_frame = int(time_seconds * self._video_fps)
                target_frame = max(0, min(target_frame, self._total_frames - 1))

                # Set seek request flag - the capture thread will handle it safely
                self._seek_requested = True
                self._seek_target_frame = target_frame

                # Update position immediately for UI feedback
                actual_time = target_frame / self._video_fps if self._video_fps > 0 else 0
                self.videoPositionChanged.emit(actual_time, self._total_duration)

                # self.logger.info(f"Seek requested to {actual_time:.1f}s (frame {target_frame})")
                return True

        except Exception as e:
            self.logger.error(f"Seek error: {e}")
            return False

    def seek_relative(self, seconds_delta: float):
        """Seek relative to current position."""
        if not self._is_file:
            return False

        current_time = self._current_frame_pos / self._video_fps if self._video_fps > 0 else 0
        new_time = current_time + seconds_delta
        return self.seek_to_time(new_time)

    def seek_to_beginning(self):
        """Seek to beginning of video."""
        return self.seek_to_time(0)

    def seek_to_end(self):
        """Seek to end of video."""
        if not self._is_file:
            return False
        return self.seek_to_time(self._total_duration - 1)

    def is_file_playback(self) -> bool:
        """Check if this is file playback (not live stream)."""
        return self._is_file

    def is_playing(self) -> bool:
        """Check if video is currently playing."""
        return self._is_playing

    def get_playback_info(self) -> dict:
        """Get current playback information for files."""
        if not self._is_file:
            return {}

        current_time = self._current_frame_pos / self._video_fps if self._video_fps > 0 else 0
        return {
            'is_file': True,
            'is_playing': self._is_playing,
            'current_time': current_time,
            'total_duration': self._total_duration,
            'current_frame': self._current_frame_pos,
            'total_frames': self._total_frames,
            'fps': self._video_fps
        }

    def _cleanup(self):
        """Clean up resources and ensure capture device is fully released."""
        try:
            # Clear any pending seek requests
            self._seek_requested = False

            if self._cap:
                # Stop any ongoing grab operations
                try:
                    self._cap.grab()  # Clear buffer
                except Exception:
                    pass

                # Release the capture device
                self._cap.release()
                self._cap = None

                # Give the OS time to fully release the device
                # This is important for HDMI capture devices that may be slow to release
                import time
                time.sleep(0.2)

        except Exception as e:
            self.logger.error(f"Error releasing video capture: {e}")
        finally:
            self._connected = False
            self._cap = None  # Ensure cap is cleared even if release failed

            # Clean up remuxed temp file
            if self._remuxed_temp_path:
                try:
                    os.unlink(self._remuxed_temp_path)
                    self.logger.info(f"Cleaned up temp file: {self._remuxed_temp_path}")
                except OSError:
                    pass
                self._remuxed_temp_path = None

    def is_connected(self) -> bool:
        """Check if stream is currently connected."""
        return self._connected and self._cap and self._cap.isOpened()

    def get_stream_info(self) -> Dict[str, Any]:
        """Get current stream information."""
        if not self._cap:
            return {}

        return {
            'url': self.config.url,
            'type': self.config.stream_type.value,
            'fps': self._current_fps,
            'source_fps': self._video_fps if self._is_file else self._source_fps_hint,
            'resolution': (
                int(self._cap.get(cv2.CAP_PROP_FRAME_WIDTH)),
                int(self._cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
            ),
            'frame_count': self._frame_number,
            'connected': self._connected,
            'is_playing': self._is_playing
        }


class StreamManager(QObject):
    """
    High-level manager for RTMP stream operations.
    Provides simplified interface for ADIAT integration.
    """

    frameReceived = Signal(np.ndarray, float, int)  # frame, timestamp, video_frame_pos
    connectionChanged = Signal(bool, str)  # connected, message
    statsUpdated = Signal(dict)  # stream statistics
    videoPositionChanged = Signal(float, float)  # current_time, total_time

    def __init__(self):
        super().__init__()
        self.logger = LoggerService()
        self._service = None
        self._current_config = None

    @staticmethod
    def _normalize_fps_limit(fps_limit: Optional[int]) -> Optional[int]:
        """Normalize FPS limits to a supported range or None for source cadence."""
        if fps_limit is None:
            return None
        if int(fps_limit) <= 0:
            return None
        return max(1, min(int(fps_limit), MAX_REASONABLE_FPS_LIMIT))

    def connect_to_stream(self, url: str, stream_type: StreamType = StreamType.RTMP,
                          hdmi_backend: Optional[int] = None,
                          fps_limit: Optional[int] = None) -> bool:
        """
        Connect to a video stream.

        Args:
            url: Stream URL (RTMP, HLS, or file path)
            stream_type: Type of stream
            hdmi_backend: Optional OpenCV backend ID for HDMI capture
            fps_limit: Optional target FPS limit.
                - `None`: follow source cadence
                - `0` or less: follow source cadence
                - `> 0`: explicit cap

        Returns:
            bool: True if connection initiated successfully
        """
        try:
            # Stop existing service
            self.disconnect_stream()

            # Determine FPS limit
            effective_fps_limit = self._normalize_fps_limit(fps_limit)

            self._current_config = StreamConfig(
                url=url,
                stream_type=stream_type,
                reconnect_attempts=5,
                buffer_size=1,  # Minimal buffering
                fps_limit=effective_fps_limit,  # This is the TARGET processing FPS, not video FPS
                resolution_limit=None,
                hdmi_backend=hdmi_backend
            )

            # Create and start service
            self._service = RTMPStreamService(self._current_config)

            # Connect signals
            self._service.frameReady.connect(self._on_frame_ready)
            self._service.connectionStatusChanged.connect(self.connectionChanged)
            self._service.streamStatsChanged.connect(self.statsUpdated)
            self._service.videoPositionChanged.connect(self.videoPositionChanged)
            self._service.errorOccurred.connect(self._on_error)

            # Start service
            self._service.start()

            # self.logger.info(f"Stream connection initiated: {url}")
            return True

        except Exception as e:
            self.logger.error(f"Failed to connect to stream: {e}")
            return False

    def set_fps_limit(self, fps_limit: Optional[int]) -> bool:
        """Update stream FPS limit while connected."""
        if not self._service:
            return False
        try:
            effective_fps_limit = self._normalize_fps_limit(fps_limit)
            self._service.set_fps_limit(effective_fps_limit)
            if self._current_config:
                self._current_config.fps_limit = effective_fps_limit
            return True
        except Exception as e:
            self.logger.error(f"Failed to update FPS limit: {e}")
            return False

    def disconnect_stream(self):
        """Disconnect from current stream and ensure capture device is released."""
        if self._service:
            # Stop the service first - this triggers cleanup
            self._service.stop()

            # Immediately quit the thread's event loop
            self._service.quit()

            # Give the thread time to finish - increased timeout for HDMI devices
            service_stopped = self._service.wait(5000)  # Wait up to 5 seconds
            if not service_stopped:
                self.logger.warning("Stream service did not stop within 5s, retrying graceful shutdown")
                self._service.quit()
                service_stopped = self._service.wait(5000)
                if not service_stopped:
                    self.logger.error("Stream service still running after graceful shutdown timeout")

            # Now disconnect signals after the thread has stopped
            try:
                # Disconnect signals after stopping to ensure we get final status updates
                try:
                    self._service.frameReady.disconnect()
                except TypeError:
                    pass  # Already disconnected
                try:
                    self._service.connectionStatusChanged.disconnect()
                except TypeError:
                    pass
                try:
                    self._service.streamStatsChanged.disconnect()
                except TypeError:
                    pass
                try:
                    self._service.videoPositionChanged.disconnect()
                except TypeError:
                    pass
                try:
                    self._service.errorOccurred.disconnect()
                except TypeError:
                    pass
            except Exception:
                # self.logger.debug(f"Error disconnecting signals: {e}")
                pass

            # Delete the service to ensure proper cleanup.
            # If still running, defer deletion until thread exits.
            if service_stopped:
                self._service.deleteLater()
            else:
                self._service.finished.connect(self._service.deleteLater)
            self._service = None

            # Additional delay to ensure capture device is fully released by OS
            # This helps with HDMI capture devices that may hold resources
            time.sleep(0.3)

        # Always emit disconnection status to ensure UI updates
        self.connectionChanged.emit(False, "Disconnected")

    def is_connected(self) -> bool:
        """Check if currently connected to a stream."""
        return self._service and self._service.is_connected()

    def get_stream_info(self) -> Dict[str, Any]:
        """Get current stream information."""
        if self._service:
            return self._service.get_stream_info()
        return {}

    def _on_frame_ready(self, frame: np.ndarray, timestamp: float, video_frame_pos: int):
        """Handle incoming frame from service."""
        self.frameReceived.emit(frame, timestamp, video_frame_pos)

    def _on_error(self, error_message: str):
        """Handle service errors."""
        self.logger.error(f"Stream error: {error_message}")
        self.connectionChanged.emit(False, f"Error: {error_message}")

    # Video playback control methods
    def play_pause(self):
        """Toggle play/pause for video files."""
        if self._service:
            return self._service.play_pause()
        return False

    def seek_to_time(self, time_seconds: float):
        """Seek to specific time in video."""
        if self._service:
            return self._service.seek_to_time(time_seconds)
        return False

    def seek_relative(self, seconds_delta: float):
        """Seek relative to current position."""
        if self._service:
            return self._service.seek_relative(seconds_delta)
        return False

    def seek_to_beginning(self):
        """Seek to beginning of video."""
        if self._service:
            return self._service.seek_to_beginning()
        return False

    def seek_to_end(self):
        """Seek to end of video."""
        if self._service:
            return self._service.seek_to_end()
        return False

    def is_file_playback(self) -> bool:
        """Check if current stream is a file."""
        if self._service:
            return self._service.is_file_playback()
        return False

    def is_playing(self) -> bool:
        """Check if video is playing."""
        if self._service:
            return self._service.is_playing()
        return True

    def get_playback_info(self) -> dict:
        """Get playback information."""
        if self._service:
            return self._service.get_playback_info()
        return {}
