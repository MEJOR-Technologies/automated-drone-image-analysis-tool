"""Top-level controller for the Flight Viewer window.

Owns the shared :class:`SignalingChannel`, the list of active
:class:`FlightTileController` instances, the
:class:`MissionGalleryController`, and the layout save/restore wiring
described in plan §15 / M3.
"""

from __future__ import annotations

import threading
from typing import Dict, List, Optional

from PySide6.QtCore import QObject, QSettings, Qt, QByteArray

from core.services.LoggerService import LoggerService
from core.services.streaming.FingerprintStore import FingerprintStore, PeerRecord
from core.services.streaming.signaling import (
    DEFAULT_WORKER_URL,
    HttpSignalingChannel,
    InMemorySignalingChannel,
    SignalingChannel,
)
from core.controllers.flight.FlightTileController import FlightTileController
from core.controllers.flight.MissionGalleryController import MissionGalleryController
from core.views.flight.FlightViewerWindow import FlightViewerWindow


def _prewarm_webrtc_imports() -> None:
    """Force the heavy WebRTC native libraries to load on a worker thread.

    First-time import of ``aiortc`` pulls in PyAV (FFmpeg native bindings),
    ``cryptography`` (a Rust extension), ``aioice``, and ``pyee``. Each
    module's init runs with the GIL held, so loading them on demand inside
    :meth:`WebRTCStreamService.run` competes with the Qt main thread the
    moment the operator clicks Connect — visible as a ~1s UI freeze.
    Doing it ahead of time on a background thread amortises the cost
    while the operator is reading the pairing dialog.
    """
    try:
        import aiortc  # noqa: F401
        from aiortc.sdp import candidate_from_sdp  # noqa: F401
    except ImportError:
        # aiortc isn't installed in this environment — first Connect
        # will surface the same ImportError via the service's normal
        # ``_require_aiortc`` path. Don't crash the viewer window over
        # missing deps; just skip the warmup.
        return


# Plan §19.4.1: ``state`` / ``geometry`` under a versioned key. The ``v1``
# suffix lets future structural changes (additional docks, renamed
# objectNames) invalidate stored state cleanly instead of restoring a
# half-broken layout.
SETTINGS_LAYOUT_KEY = "state/v1"
SETTINGS_GEOMETRY_KEY = "geometry/v1"


class FlightViewerController(QObject):
    """Wires the window, services, and per-tile controllers together."""

    def __init__(
        self,
        *,
        signaling: Optional[SignalingChannel] = None,
        parent: Optional[QObject] = None,
    ):
        super().__init__(parent)
        self.logger = LoggerService()
        self._signaling = signaling or self._default_signaling_channel()

        self.window = FlightViewerWindow()
        self.window.addFeedRequested.connect(self.open_pairing_dialog)
        self.window.toggleGalleryRequested.connect(self._toggle_gallery)
        self.window.saveLayoutRequested.connect(self.save_layout)
        self.window.restoreLayoutRequested.connect(self.restore_layout)
        self.window.closeViewerRequested.connect(self.shutdown)

        self.gallery = MissionGalleryController(self.window.mission_gallery, parent=self)

        # feed_id -> controller mapping; feed_id is the pairing code in v1
        self._tile_controllers: Dict[str, FlightTileController] = {}
        # Keep dialogs alive while they're in flight
        self._dialogs: List[object] = []

        # Plan §15 M3 — Map dock auto-reveals on first geo-tagged detection;
        # clicking a row in the gallery centers the map on that detection.
        self.window.mission_gallery.detectionActivated.connect(
            self._on_gallery_row_activated
        )
        # Reverse direction: clicking a pin on the map highlights the
        # corresponding row in the Mission Gallery (plan §19.4.4).
        self.window.map_dock.pinClicked.connect(self._on_map_pin_clicked)

        self._settings = QSettings("ADIAT", "FlightViewer")
        # SQLite-backed TOFU store (plan §19.4.3). Lazy-instantiated so
        # tests that don't touch TOFU don't have to mock the filesystem.
        self._fingerprint_store: Optional[FingerprintStore] = None

        # Apply any persisted layout on construction (plan §15 M3).
        self.restore_layout()

        # Kick off the WebRTC import warmup on a daemon thread so the
        # first Connect click doesn't pay ~1s of native-library load
        # time. Daemon = won't keep the process alive on shutdown.
        threading.Thread(
            target=_prewarm_webrtc_imports,
            name="adiat-webrtc-prewarm",
            daemon=True,
        ).start()

    # ------------------------------------------------------------------
    # window lifecycle
    # ------------------------------------------------------------------

    def show(self) -> None:
        # Open maximized — the dock-based layout (feed tiles + Mission
        # Gallery + Map) is most useful with plenty of screen real estate,
        # and the operator can always restore down via the title bar.
        # ``showMaximized`` is preferred over ``showFullScreen`` so the
        # menu bar, toolbar, and OS chrome stay visible.
        self.window.showMaximized()
        self.window.raise_()
        self.window.activateWindow()

    def shutdown(self) -> None:
        """Tear down all active tiles + signaling, persist layout."""
        try:
            self.save_layout()
        except Exception:  # pragma: no cover - persistence shouldn't crash exit
            pass
        for code, controller in list(self._tile_controllers.items()):
            controller.tear_down()
        self._tile_controllers.clear()
        try:
            import asyncio
            loop = asyncio.new_event_loop()
            loop.run_until_complete(self._signaling.close())
            loop.close()
        except Exception:  # pragma: no cover - best effort
            pass

    # ------------------------------------------------------------------
    # pairing flow
    # ------------------------------------------------------------------

    def open_pairing_dialog(self) -> None:
        """Spawn a non-modal pairing dialog so multiple feeds can be added in parallel."""
        controller = FlightTileController(signaling=self._signaling, parent=self)
        controller.tileReady.connect(self._on_tile_ready)
        controller.tileClosed.connect(self._on_tile_closed)
        controller.detectionPromoted.connect(self.gallery.add_detection)
        controller.detectionPromoted.connect(self._on_detection_for_map)
        controller.detectionUpdated.connect(self.gallery.add_detection)
        controller.detectionUpdated.connect(self._on_detection_for_map)
        # Snapshot replay is fanned out per-detection through the existing
        # detectionPromoted path (plan §18 → *Desktop residual work* item 2),
        # so the gallery picks it up automatically. The bulk
        # ``detectionSnapshot`` signal is still emitted by the tile
        # controller for forward-compat but is intentionally not wired to
        # ``MissionGalleryController.replace_snapshot`` — that path would
        # wipe pre-snapshot detections rather than merging idempotently.

        dialog = controller.run_pairing_dialog(self.window)
        if dialog is None:
            return
        dialog.setAttribute(Qt.WA_DeleteOnClose, True)
        dialog.setModal(False)  # plan §4: multiple pairings in parallel
        self._dialogs.append((controller, dialog))
        dialog.show()

    # ------------------------------------------------------------------
    # tile callbacks
    # ------------------------------------------------------------------

    def _on_tile_ready(self, tile) -> None:
        controller = self._find_controller_for_tile(tile)
        if controller is None or controller.pairing_code is None:
            return
        code = controller.pairing_code
        self._tile_controllers[code] = controller
        self.gallery.register_feed(code, f"Tile-{code}")
        self.window.dock_tile(tile)
        tile.muteGalleryToggled.connect(self._on_mute_toggled)

    def _find_controller_for_tile(self, tile) -> Optional[FlightTileController]:
        for ctrl, _dlg in self._dialogs:
            if isinstance(ctrl, FlightTileController) and ctrl.tile is tile:
                return ctrl
        return None

    def _on_tile_closed(self, code: str) -> None:
        controller = self._tile_controllers.pop(code, None)
        if controller is not None and controller.tile is not None:
            self.window.remove_tile(controller.tile)
        self.gallery.deregister_feed(code)
        # Drop the dialog/controller pair reference once the tile is gone.
        self._dialogs = [
            (ctrl, dlg) for (ctrl, dlg) in self._dialogs if ctrl is not controller
        ]

    def _on_mute_toggled(self, tile, muted: bool) -> None:
        code = getattr(tile, "pairing_code", None)
        if code is not None:
            self.gallery.set_feed_muted(code, muted)

    # ------------------------------------------------------------------
    # gallery dock visibility
    # ------------------------------------------------------------------

    def _toggle_gallery(self, visible: bool) -> None:
        self.window.mission_gallery.setVisible(visible)

    # ------------------------------------------------------------------
    # map dock plumbing
    # ------------------------------------------------------------------

    def _on_detection_for_map(self, _feed_id: str, detection: dict) -> None:
        """Push every detection with GPS into :class:`MapDock`.

        Reveals the dock the first time we see a geo-tagged detection so
        the operator isn't faced with an empty map at session start.
        """
        loc = detection.get("location") if isinstance(detection, dict) else None
        if not isinstance(loc, dict):
            return
        lat = loc.get("lat")
        lon = loc.get("lon")
        if not isinstance(lat, (int, float)) or not isinstance(lon, (int, float)):
            return
        self.window.map_dock.add_detection(detection)
        if not self.window.map_dock.isVisible():
            self.window.map_dock.setVisible(True)

    def _on_gallery_row_activated(self, detection: dict) -> None:
        """Center the map dock on a detection when the operator clicks its row."""
        self.window.map_dock.focus_detection(detection)
        if not self.window.map_dock.isVisible():
            self.window.map_dock.setVisible(True)

    def _on_map_pin_clicked(self, track_key: str) -> None:
        """Highlight the matching Mission Gallery row when a pin is clicked.

        Implements the reverse direction of plan §19.4.4 — Leaflet pin
        clicks bubble up through :class:`MapDock`'s ``pinClicked`` signal
        and we ask the gallery to scroll/select the matching row.
        """
        if not track_key:
            return
        try:
            self.window.mission_gallery.highlight_track(track_key)
        except Exception:  # noqa: BLE001 - never let UI plumbing crash signals
            pass

    # ------------------------------------------------------------------
    # TOFU fingerprint persistence (plan §15 M3)
    # ------------------------------------------------------------------

    @property
    def fingerprint_store(self) -> FingerprintStore:
        """SQLite-backed TOFU store; created on first access (plan §19.4.3)."""
        if self._fingerprint_store is None:
            self._fingerprint_store = FingerprintStore()
        return self._fingerprint_store

    def remember_fingerprint(
        self,
        fingerprint: str,
        *,
        device_label: Optional[str] = None,
        notes: Optional[str] = None,
    ) -> None:
        """Persist a peer fingerprint after a successful SAS confirm.

        ``device_label`` is the operator-assigned name (M4E #3, Bravo's
        tablet, …). When omitted we mint a placeholder label from the
        fingerprint so the desktop still has a record, but the operator
        UI in :class:`FlightPairingDialog` is expected to surface a real
        label dialog before this path is taken.

        ``notes`` is the optional free-text annotation written into the
        store. Set this when the operator accepts a fingerprint *change*
        for an existing device (plan §19.4.3 mismatch warning), so a
        future audit can tell the swap apart from a clean first pair.
        """
        if not fingerprint:
            return
        label = device_label or f"unlabeled-{self._fingerprint_id(fingerprint)}"
        try:
            self.fingerprint_store.record_pairing(label, fingerprint, notes=notes)
        except Exception as exc:  # noqa: BLE001 - TOFU storage must not crash
            self.logger.warning(
                f"FlightViewerController: failed to persist fingerprint for "
                f"{label}: {exc}"
            )

    def known_fingerprint(self, device_label: str) -> Optional[str]:
        """Return the previously-trusted fingerprint for ``device_label``."""
        if not device_label:
            return None
        record = self.fingerprint_store.get(device_label)
        return record.sha256 if record else None

    def is_fingerprint_trusted(self, fingerprint: str) -> bool:
        """``True`` if any stored device's fingerprint matches ``fingerprint``."""
        if not fingerprint:
            return False
        match = self.fingerprint_store.find_by_fingerprint(fingerprint)
        return match is not None

    def lookup_device_by_fingerprint(self, fingerprint: str) -> Optional[PeerRecord]:
        """Return the matching :class:`PeerRecord` for ``fingerprint`` or ``None``."""
        if not fingerprint:
            return None
        return self.fingerprint_store.find_by_fingerprint(fingerprint)

    @staticmethod
    def _fingerprint_id(fingerprint: str) -> str:
        """Stable short key derived from a fingerprint (for placeholder labels)."""
        import hashlib

        normalized = (fingerprint or "").replace(":", "").replace(" ", "").lower()
        return hashlib.sha256(normalized.encode("ascii")).hexdigest()[:16]

    # ------------------------------------------------------------------
    # layout save/restore
    # ------------------------------------------------------------------

    def save_layout(self) -> None:
        self._settings.setValue(SETTINGS_LAYOUT_KEY, self.window.saveState())
        self._settings.setValue(SETTINGS_GEOMETRY_KEY, self.window.saveGeometry())
        self._settings.sync()

    def restore_layout(self) -> None:
        state = self._settings.value(SETTINGS_LAYOUT_KEY)
        geometry = self._settings.value(SETTINGS_GEOMETRY_KEY)
        if isinstance(state, QByteArray):
            self.window.restoreState(state)
        if isinstance(geometry, QByteArray):
            self.window.restoreGeometry(geometry)

    # ------------------------------------------------------------------
    # helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _default_signaling_channel() -> SignalingChannel:
        """Pick the signaling backend based on operator configuration.

        Production default is :class:`HttpSignalingChannel` pointed at the
        canonical ``signal.adiat.app`` Cloudflare Worker. Operators can
        override via ``config.toml``:

        .. code-block:: toml

            [signaling]
            base_url = "https://my-self-hosted-worker.example/"

        See plan §17 for the file location. If ``httpx`` is not installed
        (development environment without WebRTC deps), falls back to the
        :class:`InMemorySignalingChannel` so the UI still loads.
        """
        url = DEFAULT_WORKER_URL
        try:
            from helpers.AppConfig import get_section

            signaling_cfg = get_section("signaling")
            override = signaling_cfg.get("base_url")
            if isinstance(override, str) and override.strip():
                url = override.strip()
        except Exception:  # pragma: no cover - defensive
            pass

        try:
            return HttpSignalingChannel(base_url=url)
        except ImportError:
            # httpx not installed yet — fall back to the in-process channel
            # so the rest of the Flight Viewer still works in a dev environment.
            return InMemorySignalingChannel()
