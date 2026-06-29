"""Tests for Viewer._tighten_header.

Regression coverage for two coupled header bugs on 1080p displays:

* The dense toolbar's minimum width exceeded the screen, so Qt logged
  "QWindowsWindow::setGeometry: Unable to set geometry ..." and could not size
  the window to the monitor. The fix tightens header spacing and lets the index
  label shrink instead of pinning its full text width as the minimum.
* The 16pt file-name label was clipped at the bottom. The header is now sized
  to fit the toggles (see HEADER_HEIGHT) and the layout's top/bottom margins are
  removed so the glyphs get the full header height.

The test drives the *real* generated UI so the assertions track the actual
header the user sees.
"""

from PySide6.QtWidgets import QMainWindow, QSizePolicy

from core.controllers.images.viewer.Viewer import Viewer
from core.views.images.viewer.ui.Viewer_ui import Ui_Viewer

# Mirrors the header_height set in Viewer._setup_splitter_layout.
HEADER_HEIGHT = 46


def _build_header(qtbot):
    """Build the real viewer UI and constrain the header like the live app."""
    win = QMainWindow()
    qtbot.addWidget(win)
    ui = Ui_Viewer()
    ui.setupUi(win)
    ui.mainHeaderWidget.setMinimumHeight(HEADER_HEIGHT)
    ui.mainHeaderWidget.setMaximumHeight(HEADER_HEIGHT)
    return win, ui


def test_tighten_header_reduces_minimum_width(qtbot):
    """The header's minimum width must drop after tightening."""
    win, ui = _build_header(qtbot)
    before = ui.mainHeaderWidget.layout().minimumSize().width()

    Viewer._tighten_header(ui.horizontalLayout_5, ui.indexLabel)

    after = ui.mainHeaderWidget.layout().minimumSize().width()
    assert after < before


def test_tighten_header_frees_vertical_space(qtbot):
    """Top/bottom margins are removed so the file-name text isn't clipped."""
    win, ui = _build_header(qtbot)

    Viewer._tighten_header(ui.horizontalLayout_5, ui.indexLabel)

    margins = ui.horizontalLayout_5.contentsMargins()
    assert margins.top() == 0
    assert margins.bottom() == 0

    # With margins removed, the full header height is available, which must
    # exceed the label's required height at its 16pt font.
    ui.fileNameLabel.setText("DJI 20250509162825 0046 V map-plan-681e72dc08bf0d0a")
    assert ui.fileNameLabel.sizeHint().height() <= HEADER_HEIGHT


def test_tighten_header_spacing_and_index_policy(qtbot):
    """Spacing is tightened and the index label is made shrinkable."""
    win, ui = _build_header(qtbot)

    Viewer._tighten_header(ui.horizontalLayout_5, ui.indexLabel)

    assert ui.horizontalLayout_5.spacing() == 2
    # Index label must be allowed to shrink (small min width, shrinkable policy).
    assert ui.indexLabel.minimumWidth() == 10
    assert ui.indexLabel.sizePolicy().horizontalPolicy() == QSizePolicy.Policy.Maximum


def test_tighten_header_leaves_fonts_untouched(qtbot):
    """The readable .ui fonts are preserved (the header is tall enough now)."""
    win, ui = _build_header(qtbot)
    name_pt = ui.fileNameLabel.font().pointSize()
    index_pt = ui.indexLabel.font().pointSize()
    skip_pt = ui.skipHidden.font().pointSize()

    Viewer._tighten_header(ui.horizontalLayout_5, ui.indexLabel)

    assert ui.fileNameLabel.font().pointSize() == name_pt
    assert ui.indexLabel.font().pointSize() == index_pt
    assert ui.skipHidden.font().pointSize() == skip_pt


def test_index_label_no_longer_pins_window_minimum(qtbot):
    """A long index string must not force the header minimum width up.

    Before the fix the index label reported its full text width as its minimum,
    which (with the file-name label) pushed the window minimum past the screen.
    """
    win, ui = _build_header(qtbot)
    Viewer._tighten_header(ui.horizontalLayout_5, ui.indexLabel)

    ui.mainHeaderWidget.layout().invalidate()
    baseline = ui.mainHeaderWidget.layout().minimumSize().width()

    ui.indexLabel.setText("(Image 1000 of 1000) — a very long status string")
    ui.mainHeaderWidget.layout().invalidate()
    grown = ui.mainHeaderWidget.layout().minimumSize().width()

    # The long text must not widen the header minimum (label is capped at 10px).
    assert grown <= baseline
