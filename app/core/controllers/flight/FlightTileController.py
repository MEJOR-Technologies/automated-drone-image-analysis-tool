"""Per-tile lifecycle controller for the Flight Viewer.

Owns one :class:`~core.services.streaming.WebRTCStreamService.\
WebRTCStreamService`, one :class:`~core.services.streaming.\
DetectionFeedService.DetectionFeedService`, and the
:class:`~core.views.flight.FlightTile.FlightTile` view widget. Wires Qt
signals so frames render, detections route into the per-tile list and the
aggregate gallery, and lifecycle hooks tear everything down cleanly.

Per CLAUDE.md §10 *Integration*: the tile does **not** route frames
through ``StreamAnalyzeService`` because overlays are already burned in
by the mobile publisher. A forward pointer to the future clean-feed
variant lives in this module docstring per CLAUDE.md §2.2.1.
"""

from __future__ import annotations

from typing import Optional

from PySide6.QtCore import QObject, Signal

from core.controllers.flight.DetectionThumbCropper import DetectionThumbCropper
from core.services.LoggerService import LoggerService
from core.services.streaming.DetectionFeedService import DetectionFeedService
from core.services.streaming.WebRTCStreamService import WebRTCStreamService
from core.services.streaming.signaling import SignalingChannel
from core.services.streaming.TelemetryFeedService import TelemetryFeedService
from core.views.flight.FlightTile import FlightTile
from core.views.flight.FlightPairingDialog import FlightPairingDialog


class FlightTileController(QObject):
    """Orchestrates a single drone feed.

    Lifecycle phases:

    1. ``run_pairing_dialog()`` opens the pairing dialog on the calling
       thread. The dialog drives the user through code entry → SAS confirm.
    2. On accept, the controller constructs a :class:`FlightTile`, starts
       the :class:`WebRTCStreamService`, and connects all signal/slot wires.
    3. On close, ``tear_down()`` cancels the service and emits ``closed``.
    """

    tileReady = Signal(object)  # FlightTile instance
    detectionPromoted = Signal(str, dict)  # feed_id, detection envelope
    detectionUpdated = Signal(str, dict)
    detectionSnapshot = Signal(str, list)
    tileClosed = Signal(str)
    thumbReady = Signal(str, str, bytes)  # feed_id, track_key, jpeg_bytes

    def __init__(
        self,
        *,
        signaling: SignalingChannel,
        parent: Optional[QObject] = None,
    ):
        super().__init__(parent)
        self.logger = LoggerService()
        self._signaling = signaling
        self._service: Optional[WebRTCStreamService] = None
        self._feed_service: Optional[DetectionFeedService] = None
        self._telemetry_service: Optional[TelemetryFeedService] = None
        self._tile: Optional[FlightTile] = None
        self._pairing_code: Optional[str] = None
        self._dialog: Optional[FlightPairingDialog] = None
        # Track keys we've already surfaced to the tile + gallery, so a
        # snapshot replay after an ICE-restart can fill in missing tracks
        # without duplicating ones we've already shown (plan §18 → *Desktop
        # residual work* item 2).
        self._known_track_keys: set[str] = set()
        # DTLS fingerprint captured from the publisher's offer SDP — fed
        # to :meth:`FlightViewerController.remember_fingerprint` once the
        # operator accepts the SAS (plan §9 step 3 — M3 TOFU).
        self._peer_fingerprint: Optional[str] = None
        # Re-entry guard for ``tear_down``. Close can come from either
        # direction (user X-button → QMdiSubWindow → tile.closeRequested
        # → here; or controller-initiated tear_down → emit ``tileClosed``
        # → viewer.remove_tile → subwindow.close → loop). Tearing down
        # twice double-disconnects signals + double-deletes services.
        self._teardown_started: bool = False
        # Desktop-side thumbnail cropper (plan §19.4.1). Created in
        # ``_materialize_tile`` once the FlightTile (and its overlay,
        # which owns the frame ring) exists.
        self._thumb_cropper: Optional[DetectionThumbCropper] = None

    # ------------------------------------------------------------------
    # pairing UX
    # ------------------------------------------------------------------

    def run_pairing_dialog(self, parent_widget=None) -> Optional[FlightPairingDialog]:
        """Show the pairing dialog. Returns the dialog so callers can ``exec()``.

        Callers (typically the :class:`FlightViewerController`) own the
        ``QDialog.exec()`` lifecycle so multiple pairings can be in flight
        in parallel (plan §4 *Adding a feed*).
        """
        self._dialog = FlightPairingDialog(parent_widget)
        self._dialog.codeSubmitted.connect(self._on_code_submitted)
        self._dialog.cancelled.connect(self._on_dialog_cancelled)
        self._dialog.finished.connect(self._on_dialog_finished)
        return self._dialog

    @property
    def pairing_code(self) -> Optional[str]:
        return self._pairing_code

    @property
    def tile(self) -> Optional[FlightTile]:
        return self._tile

    # ------------------------------------------------------------------
    # pairing dialog signal handlers
    # ------------------------------------------------------------------

    def _on_code_submitted(self, code: str) -> None:
        self._pairing_code = code
        if self._dialog is not None:
            self._dialog.show_negotiating(
                self.tr(
                    "Looking up code {code} and connecting to the drone."
                ).format(code=code)
            )

        # Construct the service. The desktop no longer blocks on operator
        # SAS confirmation — the pairing dialog dismisses itself once the
        # network connection establishes (publisher still gates media on
        # its own SAS step).
        self._service = WebRTCStreamService(
            signaling=self._signaling, pairing_code=code
        )
        self._service.errorOccurred.connect(self._on_service_error)
        self._service.capReached.connect(self._on_cap_reached)
        self._service.peerFingerprintReceived.connect(self._on_peer_fingerprint)
        self._service.connectionStatusChanged.connect(self._on_connection_status)
        self._service.iceStateChanged.connect(self._on_ice_state)
        self._service.request_connect()

    def _on_dialog_cancelled(self) -> None:
        # If a service was already created, abort it.
        if self._service is not None:
            try:
                self._service.cleanup()
            except Exception:  # pragma: no cover - defensive
                self.logger.warning(
                    "FlightTileController: cleanup raised during cancel"
                )
            self._service = None

    def _on_peer_fingerprint(self, fingerprint: str) -> None:
        """Capture the publisher's DTLS fingerprint for TOFU + status hints."""
        self._peer_fingerprint = fingerprint or None

    def _resolve_device_label(
        self,
        viewer,
        fingerprint: str,
    ) -> Optional[tuple[Optional[str], Optional[str]]]:
        """Resolve the TOFU label + note for ``fingerprint``.

        Returns one of:

        * ``(label, note)`` — store the fingerprint under ``label`` with
          an optional free-text note (used to flag accepted-but-changed
          fingerprints).
        * ``(None, None)`` — store under a placeholder label (operator
          dismissed the name prompt; no security issue).
        * ``None`` — operator rejected a fingerprint mismatch via the
          warning modal; caller must tear down the session.

        Mismatch flow (plan §19.4.3): if the operator types a label that
        already has a stored fingerprint **and** the incoming fingerprint
        differs, surface a :class:`QMessageBox` warning. *Reject* closes
        the session; *Accept* overwrites the stored fingerprint with a
        timestamped "fingerprint changed on …" note.
        """
        from PySide6.QtWidgets import QInputDialog, QMessageBox
        import time

        existing = viewer.lookup_device_by_fingerprint(fingerprint)
        if existing is not None:
            # Same fingerprint we've already trusted — silent reuse.
            return (existing.device_label, None)

        default_label = f"M4E ({self._pairing_code})" if self._pairing_code else "M4E"
        try:
            label, ok = QInputDialog.getText(
                self._dialog,
                self.tr("Name this device"),
                self.tr(
                    "Give this publisher a name so you can recognise it "
                    "next time (e.g. 'Operator A's M4E')."
                ),
                text=default_label,
            )
        except Exception:  # noqa: BLE001 - never block SAS on a dialog hiccup
            return (None, None)
        if not ok:
            return (None, None)
        label = (label or "").strip()
        if not label:
            return (None, None)

        # Mismatch check: does the typed label already exist with a
        # different fingerprint? If yes, ask the operator to confirm.
        previous = viewer.known_fingerprint(label)
        if previous and not self._fingerprints_match(previous, fingerprint):
            warning_text = self.tr(
                "Device '{label}' presented a different DTLS fingerprint "
                "than the last time you paired with it. This could mean "
                "the tablet was reset, a different tablet is using the "
                "label, or somebody is impersonating it.\n\n"
                "Reject if you weren't expecting this."
            ).format(label=label)
            result = QMessageBox.warning(
                self._dialog,
                self.tr("Fingerprint mismatch — '{label}'").format(label=label),
                warning_text,
                QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No,
                QMessageBox.StandardButton.No,
            )
            if result != QMessageBox.StandardButton.Yes:
                return None  # operator rejected — caller tears down
            timestamp = time.strftime("%Y-%m-%dT%H:%M:%S")
            note = self.tr(
                "Fingerprint changed on {ts}; previous identity was "
                "overwritten after operator review."
            ).format(ts=timestamp)
            return (label, note)

        return (label, None)

    @staticmethod
    def _fingerprints_match(a: str, b: str) -> bool:
        """Compare DTLS fingerprints ignoring colons / whitespace / case."""
        def _norm(fp: str) -> str:
            return (fp or "").replace(":", "").replace(" ", "").strip().lower()
        return bool(a) and bool(b) and _norm(a) == _norm(b)

    def _viewer_controller(self):
        """Return the parent ``FlightViewerController``, if reachable.

        ``parent()`` of a ``FlightTileController`` is set to the viewer
        controller in :meth:`FlightViewerController.open_pairing_dialog`,
        so this is the natural conduit for TOFU storage.
        """
        try:
            return self.parent()
        except Exception:  # pragma: no cover - defensive
            return None

    def _on_dialog_finished(self, result_code: int) -> None:
        # If accepted, build the tile; cancellation is handled earlier.
        from PySide6.QtWidgets import QDialog
        if result_code == QDialog.Accepted and self._service is not None and self._pairing_code:
            self._materialize_tile(self._pairing_code)

    def _persist_tofu_record(self) -> None:
        """Best-effort TOFU storage on successful connect.

        Runs once per pairing the first time the service reports
        ``connectionStatusChanged(True, …)``. The user-facing flow no
        longer asks the operator to verify SAS (the publisher gates its
        own media on its own SAS step), but we still want the desktop's
        fingerprint store populated so future connects can show
        "known device" hints and detect cert swaps.
        """
        viewer = self._viewer_controller()
        if viewer is None or not self._peer_fingerprint:
            return
        try:
            existing = viewer.lookup_device_by_fingerprint(self._peer_fingerprint)
            label = existing.device_label if existing is not None else None
            viewer.remember_fingerprint(
                self._peer_fingerprint,
                device_label=label,
            )
        except Exception:  # noqa: BLE001 - never let TOFU crash the connect path
            self.logger.warning(
                f"FlightTileController({self._pairing_code}): "
                "TOFU persistence failed silently"
            )

    # ------------------------------------------------------------------
    # service signal handlers
    # ------------------------------------------------------------------

    def _on_service_error(self, message: str) -> None:
        self.logger.warning(
            f"FlightTileController({self._pairing_code}): service error: {message}"
        )
        if self._dialog is not None and self._dialog.isVisible():
            self._dialog.show_failed(message)

    def _on_cap_reached(self, current: int, limit: int) -> None:
        if self._dialog is not None and self._dialog.isVisible():
            self._dialog.show_failed(
                self.tr(
                    "This drone already has {current} viewers connected "
                    "(maximum {limit}). Ask one to disconnect, or try "
                    "again later."
                ).format(current=current, limit=limit)
            )

    def _on_connection_status(self, connected: bool, status: str) -> None:
        # First successful connect: dismiss the pairing dialog and
        # materialize the tile. The dialog's ``finished(QDialog.Accepted)``
        # signal handler does the tile construction; we just have to
        # ``accept()`` to fire it. Subsequent status changes (network
        # recovery / restart) flow through normally to update the tile.
        from core.views.flight.FlightPairingDialog import PAGE_FAILED

        if connected and self._tile is None and self._dialog is not None:
            if self._dialog.isVisible():
                self._dialog.accept()
            # Defer the SQLite TOFU write off the immediate paint path
            # via ``QTimer.singleShot(0)`` so the dialog dismissal and
            # tile materialization redraw the UI before we sit on the
            # main thread to read/write the fingerprint store.
            from PySide6.QtCore import QTimer
            QTimer.singleShot(0, self._persist_tofu_record)
        elif (
            not connected
            and self._tile is None
            and self._dialog is not None
            and self._safe_is_visible(self._dialog)
            and status
        ):
            try:
                current_page = self._dialog.stateStack.currentIndex()
            except RuntimeError:
                current_page = None

            if current_page == PAGE_FAILED:
                # An earlier ``errorOccurred`` has already painted a
                # specific failure message — don't downgrade back to the
                # spinner. Subsequent terminal status updates ("Disconnected"
                # from the run() finally block) are redundant and would
                # otherwise hide the actionable message.
                pass
            elif status == "Disconnected":
                # The QThread's ``run()`` finally-block emits this when
                # the session is genuinely over. If we reach it without a
                # tile, the pair never completed; surface a clear failure
                # so the dialog stops showing the indeterminate spinner.
                self._dialog.show_failed(
                    self.tr(
                        "Pairing ended before video could start. "
                        "Ask the operator to generate a new code and try again."
                    )
                )
            else:
                # Pre-connect status update (e.g. "Waiting for operator
                # approval on tablet") — refresh the dialog's negotiating
                # detail text so the operator knows what to do next.
                self._dialog.show_negotiating(status)
        if self._tile is not None:
            self._tile.set_ice_state(
                status if status else ("connected" if connected else "disconnected")
            )

    @staticmethod
    def _safe_is_visible(widget) -> bool:
        """``isVisible()`` that tolerates the underlying C++ object being gone."""
        try:
            return bool(widget.isVisible())
        except RuntimeError:
            return False

    def _on_ice_state(self, state: str) -> None:
        if self._tile is not None:
            self._tile.set_ice_state(state)

    # ------------------------------------------------------------------
    # tile materialization
    # ------------------------------------------------------------------

    def _materialize_tile(self, code: str) -> None:
        tile = FlightTile(pairing_code=code)
        tile.closeRequested.connect(self._on_tile_close)
        tile.reconnectRequested.connect(self._on_tile_reconnect)
        tile.fullscreenRequested.connect(lambda _t=tile: _t.toggle_fullscreen())
        self._tile = tile

        feed_service = DetectionFeedService(parent=self)
        feed_service.detectionPromoted.connect(self._on_detection_promoted)
        feed_service.detectionUpdated.connect(self._on_detection_updated)
        feed_service.detectionSnapshot.connect(self._on_detection_snapshot)
        # Detection bbox overlay (plan §19.4) — subscribes to the RAW
        # envelopes (no decoration needed; the overlay only reads
        # ``track_key``, ``bbox_norm``, ``frame_ts_ns``, ``detector_id``,
        # ``class_name``, and ``confidence``). Live ``promote``/``update``
        # take precedence over snapshot replays for any given track.
        feed_service.detectionPromoted.connect(tile.detection_overlay.on_track_event)
        feed_service.detectionUpdated.connect(tile.detection_overlay.on_track_event)
        feed_service.detectionSnapshot.connect(tile.detection_overlay.on_snapshot)
        # Desktop-side per-detection thumbnail cropping (plan §19.4.1).
        # Shares ``tile.detection_overlay``'s frame ring + publisher↔RTP
        # offset, so each crop pixel-locks to the same source frame the
        # box renders on. Emits ``thumbReady(track_key, jpeg_bytes)``
        # which the viewer controller bridges to the Mission Gallery's
        # ``upsert_thumb`` so the row's image refreshes in place.
        cropper = DetectionThumbCropper(
            overlay=tile.detection_overlay, parent=self
        )
        feed_service.detectionPromoted.connect(cropper.on_track_event)
        feed_service.detectionUpdated.connect(cropper.on_track_event)
        cropper.thumbReady.connect(self._on_thumb_cropped)
        self._feed_service = feed_service
        self._thumb_cropper = cropper

        # Telemetry feed (plan §19.3). The same ``dataChannelMessage``
        # signal feeds both services — each filters by label.
        telemetry_service = TelemetryFeedService(parent=self)
        telemetry_service.telemetryReceived.connect(tile.apply_telemetry)
        self._telemetry_service = telemetry_service

        svc = self._service
        if svc is None:
            return
        svc.frameReady.connect(tile.on_frame)
        svc.streamStatsChanged.connect(tile.update_stats)
        svc.dataChannelMessage.connect(feed_service.handle_message)
        svc.dataChannelMessage.connect(telemetry_service.handle_message)

        self.tileReady.emit(tile)

    # ------------------------------------------------------------------
    # detection routing
    # ------------------------------------------------------------------

    def _decorate(self, detection: dict) -> dict:
        merged = dict(detection)
        if self._pairing_code:
            merged.setdefault("feed_id", self._pairing_code)
            merged.setdefault("feed_label", f"Tile-{self._pairing_code}")
        return merged

    def _on_detection_promoted(self, detection: dict) -> None:
        merged = self._decorate(detection)
        track_key = merged.get("track_key")
        if isinstance(track_key, str) and track_key:
            self._known_track_keys.add(track_key)
        # Attach a JPEG-encoded snapshot of the latest video frame so
        # the gallery's detection popout can show the full-frame context
        # (with the bbox drawn on top) rather than just the small cropped
        # thumb. Encoded once per promotion — the JPEG bytes live in the
        # gallery's detection dict for the rest of the session.
        self._attach_context_frame(merged)
        # Detections render in the shared Mission Gallery dock; per-tile
        # detection panels are gone (collapsed into the gallery to avoid
        # duplicate rows showing the same event in two places).
        if self._pairing_code:
            self.detectionPromoted.emit(self._pairing_code, merged)

    def _attach_context_frame(self, envelope: dict) -> None:
        """Snapshot the tile's latest video frame and embed it as JPEG.

        Best-effort — falls through silently if no frame is available
        yet or the encode fails. Downscales to 1280-wide max so the
        bytes stay small for long sessions (typical encoded size is
        80–150 KB per detection).
        """
        if envelope.get("context_frame_jpeg"):
            return
        tile = self._tile
        if tile is None:
            return
        frame = getattr(tile, "_latest_frame_bgr", None)
        if frame is None:
            return
        try:
            import cv2
            h, w = frame.shape[:2]
            if w > 1280:
                scale = 1280.0 / float(w)
                new_w = 1280
                new_h = int(round(h * scale))
                frame = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)
                h, w = new_h, new_w
            ok, buf = cv2.imencode(
                ".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 80]
            )
            if ok:
                envelope["context_frame_jpeg"] = bytes(buf)
                envelope["context_frame_width"] = int(w)
                envelope["context_frame_height"] = int(h)
        except Exception:  # noqa: BLE001 - context image is best-effort
            return

    def _on_detection_updated(self, detection: dict) -> None:
        merged = self._decorate(detection)
        if self._pairing_code:
            self.detectionUpdated.emit(self._pairing_code, merged)

    def _on_thumb_cropped(self, track_key: str, jpeg_bytes: bytes) -> None:
        """Forward a freshly-cropped thumbnail up to the viewer controller.

        Bridges :class:`DetectionThumbCropper` (per-tile, lives next to
        the FlightTile's overlay) to :class:`FlightViewerController`,
        which in turn upserts the row image into the shared Mission
        Gallery. Plan §19.4.1 wiring.
        """
        if self._pairing_code:
            self.thumbReady.emit(self._pairing_code, track_key, jpeg_bytes)

    def _on_detection_snapshot(self, detections: list) -> None:
        """Treat each snapshot entry as a thumb-less promotion (plan §18).

        Per plan §18 → *Desktop residual work* item 2, snapshot entries
        should flow through the same per-tile + gallery path as a normal
        ``detectionPromoted`` event, with ``thumb_bytes`` set to ``None``
        because the mobile-side snapshot reply omits thumb payloads (too
        bulky). Dedupe by ``track_key`` so a snapshot fired after a brief
        blip doesn't re-render detections that were already on screen.
        """
        for detection in detections:
            if not isinstance(detection, dict):
                continue
            track_key = detection.get("track_key")
            if (
                isinstance(track_key, str)
                and track_key
                and track_key in self._known_track_keys
            ):
                continue
            normalized = dict(detection)
            normalized["thumb_bytes"] = None
            # Route through the same path as a fresh promotion. This adds
            # the row to the per-tile list AND flows it to the aggregate
            # MissionGallery via the existing detectionPromoted signal.
            self._on_detection_promoted(normalized)

        # Also surface the raw list for any callers that want the bulk
        # event (currently a no-op past M2; kept for forward-compat).
        if self._pairing_code:
            decorated = [self._decorate(d) for d in detections if isinstance(d, dict)]
            self.detectionSnapshot.emit(self._pairing_code, decorated)

    # ------------------------------------------------------------------
    # tile commands
    # ------------------------------------------------------------------

    def _on_tile_close(self, _tile) -> None:
        self.tear_down()

    def _on_tile_reconnect(self, _tile) -> None:
        """Re-run the pairing flow with the same code.

        With the WebRTC service's persistent session loop, brief network
        blips and ICE-restart-eligible failures are now recovered
        automatically — the user shouldn't need this button for those.
        Reconnect remains useful when the publisher has explicitly torn
        down the session and the operator has just issued a fresh
        announcement; tear down our local service and walk back through
        the pairing dialog (which the parent controller will open after
        we emit ``tileClosed``).
        """
        if self._service is not None:
            self._service.cleanup()
            self._service = None
        if self._pairing_code is None:
            return
        dialog = self.run_pairing_dialog()
        if dialog is None:
            return
        # Pre-populate the previous code so the operator doesn't have to
        # retype it; they still confirm SAS to defend against MitM since
        # the new offer's fingerprint may differ from the old one.
        dialog.codeEdit.setText(self._pairing_code)
        dialog.show()

    def tear_down(self) -> None:
        """Stop the service, drop references, emit ``tileClosed``.

        Idempotent: re-entry from either the user-driven close path
        (subwindow X → ``tile.closeRequested`` → ``_on_tile_close``)
        or the controller-driven close path (explicit tear_down call)
        short-circuits on the second call so we don't double-cleanup.
        """
        if self._teardown_started:
            return
        self._teardown_started = True
        if self._service is not None:
            try:
                self._service.cleanup()
            except Exception:  # pragma: no cover - defensive
                self.logger.warning(
                    f"FlightTileController({self._pairing_code}): "
                    "cleanup raised during teardown"
                )
            self._service = None
        if self._feed_service is not None:
            self._feed_service.deleteLater()
            self._feed_service = None
        if self._telemetry_service is not None:
            self._telemetry_service.deleteLater()
            self._telemetry_service = None
        if self._thumb_cropper is not None:
            self._thumb_cropper.deleteLater()
            self._thumb_cropper = None
        # Detach tile signals before we emit `tileClosed` — otherwise
        # `removeDockWidget` in the view can re-emit `closeRequested`,
        # which would re-enter this method via `_on_tile_close`.
        tile = self._tile
        if tile is not None:
            try:
                tile.closeRequested.disconnect(self._on_tile_close)
            except (RuntimeError, TypeError):
                pass
            try:
                tile.reconnectRequested.disconnect(self._on_tile_reconnect)
            except (RuntimeError, TypeError):
                pass
        if self._pairing_code is not None:
            self.tileClosed.emit(self._pairing_code)
        self._tile = None
        self._known_track_keys.clear()

    # ------------------------------------------------------------------
    # translation helper (no QWidget parent for tr() to bind to)
    # ------------------------------------------------------------------

    def tr(self, text: str) -> str:  # noqa: A003 - mirrors Qt's tr()
        from PySide6.QtCore import QCoreApplication
        return QCoreApplication.translate("FlightTileController", text)
