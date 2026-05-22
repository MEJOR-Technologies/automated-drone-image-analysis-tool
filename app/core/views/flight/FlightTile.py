"""``QFrame`` widget representing one paired drone feed.

Each tile owns a video pane (``QLabel`` with ``setPixmap`` of the latest
frame), a transparent detection overlay, a telemetry HUD, and a status
strip. Plan §4 *FlightTile* describes the layout — this class is just
the view; the lifecycle of the underlying :class:`WebRTCStreamService`
lives in :class:`~core.controllers.flight.FlightTileController.\
FlightTileController`.

A ``FlightTile`` is **embedded** inside the
:class:`~core.views.flight.FlightViewerWindow.FlightViewerWindow`'s
``QMdiArea`` via a ``QMdiSubWindow`` wrapper. That makes it a true
child widget of the viewer: it cannot escape the parent frame, follows
the parent on resize, and inherits min/max/close window chrome from
Qt's MDI machinery — no floating-window hacks required.
"""

from __future__ import annotations

from typing import Optional

import numpy as np
from PySide6.QtCore import Qt, Signal
from PySide6.QtGui import QAction, QImage, QPixmap
from PySide6.QtWidgets import (
    QApplication,
    QFrame,
    QMdiSubWindow,
    QMenu,
    QVBoxLayout,
    QWidget,
)

from core.views.flight.DetectionOverlayWidget import DetectionOverlayWidget
from core.views.flight.flight_tile_ui import Ui_FlightTileContents
from core.views.flight.TelemetryHud import TelemetryHud
from helpers.TranslationMixin import TranslationMixin


class FlightTile(TranslationMixin, QFrame):
    """Single feed tile embedded as a sub-window in the Flight Viewer.

    The video pane is a ``QLabel`` updated from a Qt slot — frames arrive
    via ``WebRTCStreamService.frameReady(np.ndarray, ts, n)`` on the Qt
    thread. The detection overlay + telemetry HUD layer on top of that
    label; the status strip pinned to the bottom shows stream stats.
    """

    closeRequested = Signal(object)
    reconnectRequested = Signal(object)
    fullscreenRequested = Signal(object)
    muteGalleryToggled = Signal(object, bool)

    def __init__(
        self,
        *,
        pairing_code: str,
        title: Optional[str] = None,
        parent: Optional[QWidget] = None,
    ):
        super().__init__(parent)
        self.pairing_code = pairing_code
        # Display title — surfaces on the QMdiSubWindow wrapper's title bar
        # (the viewer's ``dock_tile`` reads ``windowTitle()`` from us).
        display_title = title or self.tr("Feed {code}").format(code=pairing_code)
        self.setWindowTitle(display_title)
        # Unique objectName lets QMdiArea's own state save / restore round-trip.
        self.setObjectName(f"flightTile-{pairing_code}")

        # Embed the generated tile contents (video pane + status strip) as
        # the single child of this frame; tight margins so the embedded
        # widget visually IS the tile.
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(0)
        contents = QWidget(self)
        self.ui = Ui_FlightTileContents()
        self.ui.setupUi(contents)
        layout.addWidget(contents)

        self._frame_count = 0
        self._gallery_muted = False
        # Per-tile recording state (created on demand from the context menu).
        self._recorder = None
        self._recording_path: Optional[str] = None
        # Most-recent decoded source frame (BGR ndarray). Held by
        # reference, not copied — ``WebRTCStreamService`` produces one
        # ndarray per frame and the prior reference goes out of scope
        # on the next emit. Snapshotting at promotion time gives the
        # detection popout a full-resolution context image (not just
        # the small cropped thumb that ships over the data channel).
        self._latest_frame_bgr: Optional[np.ndarray] = None

        # Detection bbox overlay (plan §19.4) — transparent full-pane
        # child that draws per-track rectangles aligned to the exact
        # frame each box was computed from. Created BEFORE the HUD so
        # the HUD's bottom strip ends up on top (the strip is opaque;
        # boxes that would land under it are hidden by the HUD anyway).
        self.detection_overlay = DetectionOverlayWidget(self.ui.videoLabel)
        self.detection_overlay.move(0, 0)
        self.detection_overlay.resize(self.ui.videoLabel.size())

        # Telemetry HUD (plan §19.3) — overlay anchored to the bottom of
        # the video pane. ``TelemetryHud`` reads ``DistanceUnit`` from
        # Settings on each envelope so unit-toggle in Preferences applies
        # without a restart.
        self.telemetry_hud = TelemetryHud(self.ui.videoLabel)
        self.telemetry_hud.move(0, 0)
        self.telemetry_hud.setVisible(False)  # show on first envelope
        self.ui.videoLabel.installEventFilter(self)

        self._build_context_menu()

    # ------------------------------------------------------------------
    # telemetry HUD
    # ------------------------------------------------------------------

    def apply_telemetry(self, envelope: dict) -> None:
        """Push a parsed telemetry envelope into the bottom-of-video HUD."""
        self.telemetry_hud.apply_envelope(envelope)
        if not self.telemetry_hud.isVisible():
            self.telemetry_hud.setVisible(True)
        self._reposition_hud()

    def _reposition_hud(self) -> None:
        """Anchor the HUD to the bottom of the video pane."""
        if not self.telemetry_hud.isVisible():
            return
        video_rect = self.ui.videoLabel.rect()
        hud_height = self.telemetry_hud.sizeHint().height()
        # Compress to fit narrow tiles; expand to full width otherwise.
        self.telemetry_hud.setGeometry(
            0,
            max(0, video_rect.height() - hud_height),
            max(120, video_rect.width()),
            hud_height,
        )

    def eventFilter(self, watched, event):  # noqa: N802 - Qt name
        from PySide6.QtCore import QEvent

        if watched is self.ui.videoLabel and event.type() == QEvent.Resize:
            self._reposition_hud()
            # Detection overlay tracks the full video pane so bbox coords
            # always map against the same rect that ``on_frame`` scales
            # the pixmap into.
            self.detection_overlay.resize(self.ui.videoLabel.size())
        return super().eventFilter(watched, event)

    # ------------------------------------------------------------------
    # sub-window helpers (the wrapping ``QMdiSubWindow`` owns close /
    # maximize / minimize natively; we just expose convenience helpers
    # for the context menu)
    # ------------------------------------------------------------------

    def _subwindow(self) -> Optional[QMdiSubWindow]:
        """Return the ``QMdiSubWindow`` wrapping this tile, if any.

        ``FlightViewerWindow.dock_tile`` stashes the wrapper as a
        Qt dynamic property on the tile so we can find it later without
        a viewer back-reference. Returns ``None`` for un-embedded tiles
        (e.g. raw tile instances in tests).
        """
        sw = self.property("_mdi_subwindow")
        return sw if isinstance(sw, QMdiSubWindow) else None

    def maximize_within_viewer(self) -> None:
        """Maximize the wrapping sub-window to fill the MDI area."""
        sw = self._subwindow()
        if sw is not None:
            sw.showMaximized()

    def restore_subwindow(self) -> None:
        """Restore the wrapping sub-window to its normal size."""
        sw = self._subwindow()
        if sw is not None:
            sw.showNormal()

    # ------------------------------------------------------------------
    # video
    # ------------------------------------------------------------------

    def on_frame(self, frame_bgr: np.ndarray, ts: float, _frame_n: int) -> None:
        """Render an incoming BGR frame on the video pane.

        Scales the source frame to fit ``videoLabel.size()`` with
        ``KeepAspectRatio`` — the displayed video follows the tile size,
        with letterbox/pillarbox black bars on the unfilled axis.

        ``videoLabel`` has ``sizePolicy = Ignored/Ignored`` so the pixmap
        size cannot feed back into the layout's ``sizeHint`` (that loop
        was responsible for the tile slowly growing each frame when the
        dock honored the contents widget's hint).
        """
        if frame_bgr is None or frame_bgr.size == 0:
            return
        # Stash the latest source-resolution frame for the detection
        # popout's context image. Keep a *reference* — the publisher
        # produces one ndarray per frame and the prior one releases
        # naturally; no per-frame copy cost.
        self._latest_frame_bgr = frame_bgr
        try:
            h, w = frame_bgr.shape[:2]
            # `bgr24` ndarray -> QImage via Format_BGR888 (no copy).
            qimg = QImage(frame_bgr.data, w, h, frame_bgr.strides[0], QImage.Format_BGR888)
            pixmap = QPixmap.fromImage(qimg)
            scaled = pixmap.scaled(
                self.ui.videoLabel.size(),
                Qt.KeepAspectRatio,
                Qt.SmoothTransformation,
            )
            self.ui.videoLabel.setPixmap(scaled)
            self._frame_count += 1
            # Drive the detection overlay AFTER the pixmap update so its
            # ``paintEvent`` repaints on the same frame the operator sees.
            # ``ts`` is aiortc's RTP-derived seconds (the same value the
            # plan §19.4 calibration expects). Also hand over the raw
            # BGR ndarray so the overlay's ``recent_frames`` ring fills
            # for the desktop-side thumb cropper (plan §19.4.1).
            self.detection_overlay.on_video_frame(ts, w, h, frame_bgr)
        except Exception:  # noqa: BLE001 - never crash the UI thread
            pass

        # Feed the frame to the recorder if one is active. Done AFTER
        # rendering so a slow disk doesn't stall the display path.
        recorder = self._recorder
        if recorder is not None:
            try:
                recorder.add_frame(frame_bgr, ts)
            except Exception:  # noqa: BLE001 - recording is best-effort
                pass

    # ------------------------------------------------------------------
    # per-tile recording (plan §15 M3)
    # ------------------------------------------------------------------

    @property
    def is_recording(self) -> bool:
        return self._recorder is not None

    def _start_recording_from_menu(self) -> None:
        from PySide6.QtWidgets import QFileDialog
        # Default to ~/Videos/ADIAT to keep recordings out of the user's
        # home directory root. The directory is created on demand by the
        # VideoRecorder service if it doesn't exist yet.
        import os as _os
        default_dir = _os.path.join(_os.path.expanduser("~"), "Videos", "ADIAT")
        chosen = QFileDialog.getExistingDirectory(
            self, self.tr("Choose recording directory"), default_dir
        )
        if not chosen:
            return
        self._start_recording(chosen)

    def _start_recording(self, output_dir: str) -> None:
        # Determine the source resolution from the current video pane
        # pixmap. Falls back to a sane default if no frame has arrived yet.
        from core.services.streaming.VideoRecordingService import (
            RecordingConfig,
            VideoRecorder,
        )
        pixmap = self.ui.videoLabel.pixmap()
        if pixmap is not None and not pixmap.isNull():
            resolution = (max(640, pixmap.width()), max(360, pixmap.height()))
        else:
            resolution = (1280, 720)

        config = RecordingConfig(
            output_dir=output_dir,
            filename_prefix=f"flight_{self.pairing_code}",
            fps=30,
        )
        recorder = VideoRecorder(config)

        # Surface the recorder's output path on the status strip while
        # recording is active.
        def _on_recording_started(path: str) -> None:
            self._recording_path = path
            self.ui.statusBadgeLabel.setText(self.tr("REC ● {filename}").format(
                filename=__import__("os").path.basename(path)
            ))

        def _on_recording_error(msg: str) -> None:
            self.ui.statusBadgeLabel.setText(self.tr("REC error: {msg}").format(msg=msg))

        recorder.recordingStarted.connect(_on_recording_started)
        recorder.errorOccurred.connect(_on_recording_error)

        if not recorder.start_recording(resolution):
            # Service already logged the failure; surface to the user via
            # the status strip so they're not left guessing.
            self.ui.statusBadgeLabel.setText(self.tr("REC failed to start"))
            return
        self._recorder = recorder

    def _stop_recording(self) -> None:
        recorder = self._recorder
        self._recorder = None
        if recorder is None:
            return
        try:
            recorder.stop_recording()
        except Exception:  # noqa: BLE001 - cleanup must not crash UI
            pass
        if self._recording_path:
            self.ui.statusBadgeLabel.setText(self.tr("Recording saved"))
            self._recording_path = None

    # ------------------------------------------------------------------
    # status strip
    # ------------------------------------------------------------------

    def update_stats(self, stats: dict) -> None:
        self.ui.iceStateLabel.setText(self.tr("Network: {state}").format(state=stats.get("ice_state", "--")))
        width = stats.get("width") or 0
        height = stats.get("height") or 0
        self.ui.resolutionLabel.setText(f"{width}x{height}")
        fps = stats.get("fps")
        self.ui.fpsLabel.setText(f"{fps:.1f} fps" if isinstance(fps, (int, float)) else "0 fps")
        kbps = stats.get("bitrate_kbps")
        self.ui.bitrateLabel.setText(f"{kbps:.0f} kbps" if isinstance(kbps, (int, float)) else "0 kbps")
        latency = stats.get("one_way_latency_ms")
        if isinstance(latency, (int, float)):
            self.ui.latencyLabel.setText(self.tr("latency: {ms:.0f}ms").format(ms=latency))
        else:
            self.ui.latencyLabel.setText(self.tr("latency: --"))

    def set_ice_state(self, state: str) -> None:
        self.ui.iceStateLabel.setText(self.tr("Network: {state}").format(state=state))

    # ------------------------------------------------------------------
    # context menu (right-click on dock title; plan §4)
    # ------------------------------------------------------------------

    def _build_context_menu(self) -> None:
        self.setContextMenuPolicy(Qt.CustomContextMenu)
        self.customContextMenuRequested.connect(self._on_context_menu)

    def _on_context_menu(self, pos) -> None:
        menu = QMenu(self)

        full_screen = QAction(self.tr("Full Screen"), menu)
        full_screen.triggered.connect(lambda: self.fullscreenRequested.emit(self))
        menu.addAction(full_screen)

        # "Maximize" defers to the wrapping QMdiSubWindow's native
        # maximize, which fills the MDI area (i.e. stays inside the
        # viewer). The OS-native maximize button on the subwindow's
        # title bar does the same thing.
        sw = self._subwindow()
        if sw is not None:
            if sw.isMaximized():
                restore = QAction(self.tr("Restore"), menu)
                restore.triggered.connect(self.restore_subwindow)
                menu.addAction(restore)
            else:
                maximize = QAction(self.tr("Maximize"), menu)
                maximize.triggered.connect(self.maximize_within_viewer)
                menu.addAction(maximize)

        menu.addSeparator()

        mute = QAction(self.tr("Mute Detections in Gallery"), menu)
        mute.setCheckable(True)
        mute.setChecked(self._gallery_muted)

        def _toggle_mute():
            self._gallery_muted = not self._gallery_muted
            self.muteGalleryToggled.emit(self, self._gallery_muted)

        mute.triggered.connect(_toggle_mute)
        menu.addAction(mute)

        # Recording toggle. Reuses the existing :class:`VideoRecorder`
        # service so the output format matches RTMP/HDMI recordings the
        # rest of the app produces (plan §15 M3 — Recording via existing
        # VideoRecordingService).
        if self.is_recording:
            stop_rec = QAction(self.tr("Stop Recording"), menu)
            stop_rec.triggered.connect(self._stop_recording)
            menu.addAction(stop_rec)
        else:
            start_rec = QAction(self.tr("Start Recording…"), menu)
            start_rec.triggered.connect(self._start_recording_from_menu)
            menu.addAction(start_rec)

        reconnect = QAction(self.tr("Reconnect"), menu)
        reconnect.triggered.connect(lambda: self.reconnectRequested.emit(self))
        menu.addAction(reconnect)

        menu.addSeparator()

        close_act = QAction(self.tr("Close"), menu)
        close_act.triggered.connect(lambda: self.closeRequested.emit(self))
        menu.addAction(close_act)

        menu.exec(self.mapToGlobal(pos))

    # ------------------------------------------------------------------
    # full-screen toggle (delegates to the wrapping QMdiSubWindow)
    # ------------------------------------------------------------------

    def toggle_fullscreen(self) -> None:
        """Toggle the wrapping sub-window between maximized and normal.

        We delegate "full-screen" to the MDI sub-window's maximize state
        — true OS full-screen would yank the tile out of the viewer's
        widget hierarchy, breaking the contain-to-parent contract. The
        operator can resize the *viewer* to fill the desktop for an
        effectively-fullscreen feed.
        """
        sw = self._subwindow()
        if sw is None:
            return
        if sw.isMaximized():
            sw.showNormal()
        else:
            sw.showMaximized()

    def keyPressEvent(self, event) -> None:  # noqa: N802 - Qt name
        # F11 / Esc both behave like a maximize-toggle now that there's
        # no separate full-screen window state to escape.
        if event.key() == Qt.Key_F11:
            self.toggle_fullscreen()
            return
        if event.key() == Qt.Key_Escape:
            sw = self._subwindow()
            if sw is not None and sw.isMaximized():
                sw.showNormal()
                return
        super().keyPressEvent(event)

    # ------------------------------------------------------------------
    # gallery muting accessor
    # ------------------------------------------------------------------

    @property
    def is_gallery_muted(self) -> bool:
        return self._gallery_muted
