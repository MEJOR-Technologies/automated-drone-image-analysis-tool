"""Single-detection row used by both per-tile and aggregate gallery panels.

Per plan §7 the same widget is reused — scoped to one tile in the tile's
``QListWidget`` and aggregated across tiles in the Mission Gallery dock.
The widget itself is dumb: it accepts a fully-formed detection dict (the
shape produced by :class:`~core.services.streaming.DetectionFeedService.\
DetectionFeedService` — the channel envelope merged with ``thumb_bytes``)
and renders it.
"""

from __future__ import annotations

import time
from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtGui import QPixmap, QImage
from PySide6.QtWidgets import QApplication, QDialog, QLabel, QVBoxLayout, QWidget

from core.services.SettingsService import SettingsService
from core.views.flight.detection_row_ui import Ui_DetectionRowWidget
from helpers.TranslationMixin import TranslationMixin


class DetectionRowWidget(TranslationMixin, QWidget, Ui_DetectionRowWidget):
    """Render a single detection envelope + thumbnail.

    Args:
        detection: Envelope produced by :class:`DetectionFeedService`. Keys
            consulted: ``class_name``, ``confidence``, ``location``,
            ``captured_at_ms``, ``thumb_bytes``, ``feed_label``.
        parent: Qt parent.
    """

    viewRequested = Signal(dict)
    coordinatesCopied = Signal(str)

    def __init__(self, detection: dict, parent: Optional[QWidget] = None):
        super().__init__(parent)
        self.setupUi(self)
        self._detection = dict(detection)
        self._settings = SettingsService()

        self.viewButton.clicked.connect(self._on_view_clicked)
        self.copyCoordsButton.clicked.connect(self._on_copy_clicked)
        self.update_detection(detection)

    # ------------------------------------------------------------------
    # public API
    # ------------------------------------------------------------------

    def update_detection(self, detection: dict) -> None:
        """Repaint with a (possibly updated) detection envelope."""
        self._detection = dict(detection)
        cls = str(detection.get("class_name") or detection.get("detector_id") or "OBJECT")
        self.classLabel.setText(cls.upper())

        confidence = detection.get("confidence")
        if isinstance(confidence, (int, float)):
            self.confidenceLabel.setText(f"{float(confidence) * 100:.0f}%")
        else:
            self.confidenceLabel.setText("--%")

        loc = detection.get("location") or {}
        lat = loc.get("lat") if isinstance(loc, dict) else None
        lon = loc.get("lon") if isinstance(loc, dict) else None
        if lat is not None and lon is not None:
            self.locationLabel.setText(self._format_coords(lat, lon))
        else:
            self.locationLabel.setText("--, --")

        ts_ms = detection.get("captured_at_ms")
        if ts_ms is not None:
            try:
                ts = float(ts_ms) / 1000.0
                lt = time.localtime(ts)
                self.timestampLabel.setText(time.strftime("%H:%M:%S", lt))
            except (TypeError, ValueError):
                self.timestampLabel.setText("--:--:--")
        else:
            self.timestampLabel.setText("--:--:--")

        feed_label = detection.get("feed_label")
        if feed_label:
            self.feedLabel.setText(self.tr("Feed: {feed}").format(feed=feed_label))
        else:
            self.feedLabel.setText("")

        self._apply_thumbnail(detection.get("thumb_bytes"))

    @property
    def detection(self) -> dict:
        return dict(self._detection)

    # ------------------------------------------------------------------
    # helpers
    # ------------------------------------------------------------------

    def _apply_thumbnail(self, blob: Optional[bytes]) -> None:
        if not blob:
            self.thumbnailLabel.setPixmap(QPixmap())
            self.thumbnailLabel.setText(self.tr("no\nthumb"))
            self.thumbnailLabel.setAlignment(Qt.AlignCenter)
            return
        image = QImage()
        if not image.loadFromData(blob):
            self.thumbnailLabel.setPixmap(QPixmap())
            self.thumbnailLabel.setText(self.tr("bad\nthumb"))
            return
        pixmap = QPixmap.fromImage(image).scaled(
            self.thumbnailLabel.maximumWidth(),
            self.thumbnailLabel.maximumHeight(),
            Qt.KeepAspectRatio,
            Qt.SmoothTransformation,
        )
        self.thumbnailLabel.setPixmap(pixmap)
        self.thumbnailLabel.setText("")

    def _format_coords(self, lat: float, lon: float) -> str:
        """Format coordinates per operator preference (DD/DM/MGRS).

        DD is the M1 default; DM is implemented inline; MGRS is delegated
        to ``pygeodesy`` if it is available (best-effort).
        """
        fmt = (self._settings.get_setting("PositionFormat", "Lat/Long - Decimal Degrees") or "")
        fmt_lower = str(fmt).lower()
        try:
            if "decimal" in fmt_lower or "dd" in fmt_lower:
                return f"{lat:.6f}, {lon:.6f}"
            if "minute" in fmt_lower or "dm" in fmt_lower:
                return f"{self._dd_to_dm(lat, is_lat=True)}, {self._dd_to_dm(lon, is_lat=False)}"
            if "mgrs" in fmt_lower:
                mgrs = self._dd_to_mgrs(lat, lon)
                if mgrs:
                    return mgrs
        except Exception:  # noqa: BLE001 - formatter must not crash UI
            pass
        return f"{lat:.6f}, {lon:.6f}"

    @staticmethod
    def _dd_to_dm(value: float, *, is_lat: bool) -> str:
        hemi_pos, hemi_neg = ("N", "S") if is_lat else ("E", "W")
        hemi = hemi_pos if value >= 0 else hemi_neg
        value = abs(value)
        deg = int(value)
        minutes = (value - deg) * 60.0
        return f"{deg}° {minutes:.4f}' {hemi}"

    @staticmethod
    def _dd_to_mgrs(lat: float, lon: float) -> str:
        try:
            from pygeodesy.mgrs import toMgrs  # type: ignore
        except Exception:
            return ""
        try:
            return str(toMgrs(lat, lon))
        except Exception:
            return ""

    # ------------------------------------------------------------------
    # signals
    # ------------------------------------------------------------------

    def _on_view_clicked(self) -> None:
        self.viewRequested.emit(self._detection)
        self._show_full_view()

    def _show_full_view(self) -> None:
        """Default behavior: open a modal QDialog with the full-size thumb + JSON dump."""
        dialog = QDialog(self)
        dialog.setWindowTitle(self.tr("Detection"))
        dialog.resize(640, 520)
        layout = QVBoxLayout(dialog)

        thumb_label = QLabel(dialog)
        thumb_bytes = self._detection.get("thumb_bytes")
        if thumb_bytes:
            image = QImage()
            if image.loadFromData(thumb_bytes):
                thumb_label.setPixmap(QPixmap.fromImage(image))
                thumb_label.setAlignment(Qt.AlignCenter)
            else:
                thumb_label.setText(self.tr("Thumbnail could not be decoded."))
        else:
            thumb_label.setText(self.tr("No thumbnail available."))
        layout.addWidget(thumb_label, stretch=1)

        meta_lines = []
        for key in ("class_name", "confidence", "captured_at_ms", "track_key", "feed_label"):
            if key in self._detection and self._detection.get(key) is not None:
                meta_lines.append(f"{key}: {self._detection[key]}")
        loc = self._detection.get("location") or {}
        if isinstance(loc, dict) and loc:
            meta_lines.append(f"location: {loc}")
        meta_label = QLabel("\n".join(meta_lines), dialog)
        meta_label.setTextInteractionFlags(Qt.TextSelectableByMouse)
        layout.addWidget(meta_label)

        dialog.exec()

    def _on_copy_clicked(self) -> None:
        loc = self._detection.get("location") or {}
        lat = loc.get("lat") if isinstance(loc, dict) else None
        lon = loc.get("lon") if isinstance(loc, dict) else None
        if lat is None or lon is None:
            return
        formatted = self._format_coords(lat, lon)
        QApplication.clipboard().setText(formatted)
        self.coordinatesCopied.emit(formatted)
