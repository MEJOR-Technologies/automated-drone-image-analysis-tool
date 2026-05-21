"""Main window for the Flight Viewer.

Per plan §4 *Container*, this is a ``QMainWindow`` whose central widget
hosts a ``QMdiArea`` for the per-feed tiles. Each :class:`FlightTile`
is embedded in a :class:`_TileSubWindow` inside that area so it's a
true child widget of the viewer — it cannot escape the parent frame,
follows the parent on resize, and gets native min / max / close
chrome. The Mission Gallery and Map continue to live as right-side
``QDockWidget`` siblings.

The window is a pure view: it carries the toolbar/menu structure and
forwards user actions to its controller via Qt signals.
"""

from __future__ import annotations

from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QMainWindow,
    QMdiArea,
    QMdiSubWindow,
    QSizePolicy,
    QStackedWidget,
)

from core.views.flight.flight_viewer_ui import Ui_FlightViewerWindow
from core.views.flight.MapDock import MapDock
from core.views.flight.MissionGalleryDock import MissionGalleryDock
from helpers.TranslationMixin import TranslationMixin


class _TileSubWindow(QMdiSubWindow):
    """``QMdiSubWindow`` that forwards its close to the embedded
    :class:`~core.views.flight.FlightTile.FlightTile`.

    A bare ``QMdiSubWindow.closeEvent`` would destroy the subwindow
    (and, via ``WA_DeleteOnClose``, its embedded widget) without ever
    invoking the child's ``closeEvent``. That would leak the per-tile
    ``FlightTileController`` lifecycle — its ``closeRequested`` slot
    wouldn't fire and the underlying ``WebRTCStreamService`` wouldn't
    stop. Forwarding the close lets the controller tear down cleanly
    before the subwindow goes away.
    """

    def closeEvent(self, event):  # noqa: N802 - Qt name
        widget = self.widget()
        if widget is not None:
            # Stop any in-flight recording so the MP4 segment is finalized
            # before the embedded tile is destroyed.
            if getattr(widget, "is_recording", False):
                try:
                    widget._stop_recording()
                except Exception:  # pragma: no cover - never block teardown
                    pass
            # Forward the close to the embedded tile's signal chain so
            # the controller's ``_on_tile_close`` → ``tear_down`` path
            # runs before the subwindow disappears.
            if hasattr(widget, "closeRequested"):
                try:
                    widget.closeRequested.emit(widget)
                except Exception:  # pragma: no cover - never block teardown
                    pass
        super().closeEvent(event)


class FlightViewerWindow(TranslationMixin, QMainWindow, Ui_FlightViewerWindow):
    """Top-level Flight Viewer window."""

    addFeedRequested = Signal()
    toggleGalleryRequested = Signal(bool)
    saveLayoutRequested = Signal()
    restoreLayoutRequested = Signal()
    closeViewerRequested = Signal()

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setupUi(self)

        # Tile widgets — kept as a set so look-ups by identity stay O(1).
        # The QMdiArea is the authoritative parent; this set just gives
        # the controller a quick "do we still have any?" check.
        self._tiles: set = set()

        # The main toolbar (Add Feed / Toggle Gallery / Save / Restore) is
        # part of the window chrome — only the per-feed dock tiles should
        # be draggable. Locking it down avoids accidental drags during
        # operator handoff.
        self.mainToolBar.setMovable(False)
        self.mainToolBar.setFloatable(False)

        # Tile workspace: a ``QMdiArea`` replaces the placeholderLabel
        # central widget. Each feed becomes a ``QMdiSubWindow`` inside
        # the area so it's a *true child* of the viewer — it cannot
        # escape the parent's frame, it follows the parent on resize,
        # and it gets free min / max / close chrome courtesy of Qt's
        # built-in MDI sub-window machinery. The previous "floating
        # QDockWidget" pattern made the tile a top-level OS window
        # which doesn't honor parent-child containment.
        self._mdi_area = QMdiArea(self)
        self._mdi_area.setViewMode(QMdiArea.SubWindowView)
        self._mdi_area.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self._mdi_area.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        # A two-page stack toggles between the "no feeds yet" placeholder
        # text and the MDI workspace. Cleaner than overlaying widgets
        # on the MDI viewport.
        self._central_stack = QStackedWidget(self.centralwidget)
        # Force the stack to grab all available vertical + horizontal
        # space so the MDI area inside it can host full-size sub-windows.
        # ``QStackedWidget`` defaults to Expanding/Expanding but stating
        # it explicitly insulates us from cross-Qt-version surprises.
        self._central_stack.setSizePolicy(
            QSizePolicy.Expanding, QSizePolicy.Expanding
        )
        self.centralLayout.setContentsMargins(0, 0, 0, 0)
        self.centralLayout.removeWidget(self.placeholderLabel)
        self._central_stack.addWidget(self.placeholderLabel)  # index 0
        self._central_stack.addWidget(self._mdi_area)         # index 1
        self._central_stack.setCurrentIndex(0)
        self.centralLayout.addWidget(self._central_stack)

        self.setDockOptions(
            QMainWindow.AnimatedDocks
            | QMainWindow.AllowNestedDocks
            | QMainWindow.AllowTabbedDocks
            | QMainWindow.GroupedDragging
        )

        self.mission_gallery = MissionGalleryDock(self)
        self.addDockWidget(Qt.RightDockWidgetArea, self.mission_gallery)
        self.mission_gallery.setVisible(True)

        # Map dock sits underneath the Mission Gallery on the right side
        # by default (plan §15 M3 — single dock; clicking a gallery row
        # centers the map). Hidden until the first detection arrives so
        # the operator isn't faced with an empty map at startup.
        self.map_dock = MapDock(self)
        self.addDockWidget(Qt.RightDockWidgetArea, self.map_dock)
        self.splitDockWidget(self.mission_gallery, self.map_dock, Qt.Vertical)
        self.map_dock.setVisible(False)

        self.actionAddFeed.triggered.connect(self.addFeedRequested.emit)
        self.actionToggleGallery.toggled.connect(self.toggleGalleryRequested.emit)
        self.actionSaveLayout.triggered.connect(self.saveLayoutRequested.emit)
        self.actionRestoreLayout.triggered.connect(self.restoreLayoutRequested.emit)
        self.actionClose.triggered.connect(self.closeViewerRequested.emit)
        self.actionClose.triggered.connect(self.close)

        # Keep the toolbar checkbox in sync if the user closes the dock.
        self.mission_gallery.visibilityChanged.connect(self._on_gallery_visibility)

    # ------------------------------------------------------------------
    # gallery sync helpers
    # ------------------------------------------------------------------

    def _on_gallery_visibility(self, visible: bool) -> None:
        if self.actionToggleGallery.isChecked() != visible:
            self.actionToggleGallery.blockSignals(True)
            self.actionToggleGallery.setChecked(visible)
            self.actionToggleGallery.blockSignals(False)

    # ------------------------------------------------------------------
    # docking convenience
    # ------------------------------------------------------------------

    def dock_tile(self, tile) -> None:
        """Embed a :class:`FlightTile` as a sub-window of the MDI area.

        The tile becomes a true child widget of the viewer — it cannot
        leave the MDI area, the system min/max/close buttons in its
        title bar work natively, and resizing/moving the parent viewer
        clips children correctly without any manual clamping logic.
        """
        self._central_stack.setCurrentWidget(self._mdi_area)
        subwindow = _TileSubWindow(self._mdi_area)
        # Inherit the tile's translated title (set in ``FlightTile.__init__``)
        # and let the subwindow own destruction of its child widget.
        subwindow.setAttribute(Qt.WA_DeleteOnClose, True)
        subwindow.setWindowTitle(tile.windowTitle())
        subwindow.setWidget(tile)
        # Remember the wrapper so ``remove_tile`` can find it from the
        # bare ``FlightTile`` reference the controller hands us.
        tile.setProperty("_mdi_subwindow", subwindow)
        # Default to a reasonable visible size; user can resize / maximize.
        subwindow.resize(800, 540)
        self._mdi_area.addSubWindow(subwindow)
        subwindow.show()
        self._tiles.add(tile)

    def remove_tile(self, tile) -> None:
        """Close the sub-window wrapping ``tile`` and dispose it.

        ``QMdiSubWindow.close()`` honors ``WA_DeleteOnClose`` (set in
        :meth:`dock_tile`), which deletes both the wrapper and the
        embedded tile in one shot. We pop the tile from our tracking
        set first so the placeholder shows promptly.
        """
        self._tiles.discard(tile)
        subwindow = tile.property("_mdi_subwindow")
        try:
            if isinstance(subwindow, QMdiSubWindow):
                subwindow.close()
            else:
                tile.deleteLater()
        except RuntimeError:
            # Widget already deleted by Qt — fine.
            pass
        if not self._tiles:
            self._central_stack.setCurrentWidget(self.placeholderLabel)

    # ------------------------------------------------------------------
    # close handling — auto-save layout
    # ------------------------------------------------------------------

    def closeEvent(self, event):  # noqa: N802 - Qt name
        """Emit ``closeViewerRequested`` on any close path.

        The toolbar/menu Close action also fires this signal explicitly,
        but the user clicking the window's X button only triggers a
        ``QCloseEvent`` — without this override the layout/geometry save
        wired in :class:`FlightViewerController.shutdown` would be skipped
        on the most common exit path.
        """
        try:
            self.closeViewerRequested.emit()
        finally:
            super().closeEvent(event)
