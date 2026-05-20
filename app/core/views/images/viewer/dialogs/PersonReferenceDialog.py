"""PersonReferenceDialog - draggable person-sized silhouette overlay for size reference.

The dialog lets the user pick a reference person (size class + position) and drag
a top-down silhouette around the image. The silhouette is drawn at real-world
scale using the image's GSD so it shows the user how large a person of that
size would appear at that location in the image.
"""

from PySide6.QtCore import Qt, QRectF
from PySide6.QtGui import QPen, QColor, QBrush, QPainterPath, QTransform
from PySide6.QtWidgets import (
    QDialog, QVBoxLayout, QHBoxLayout, QLabel, QPushButton, QWidget,
    QGroupBox, QComboBox, QFormLayout, QGraphicsPathItem,
    QGraphicsItem, QColorDialog,
)

from helpers.TranslationMixin import TranslationMixin
from core.services.SettingsService import SettingsService

# Persisted setting key for the user's preferred overlay color.
SETTING_OVERLAY_COLOR = 'PersonReferenceOverlayColor'
DEFAULT_OVERLAY_COLOR = '#00ff00'  # bright green


# Reference size classes. Heights/weights match the table the user provided.
# height_in is standing height in inches (used to scale all proportions),
# weight_lb is shown to the user only.
SIZE_CLASSES = [
    ("large_adult", "Large adult",         6 * 12 + 2,  220),
    ("average_adult", "Average adult",     5 * 12 + 7,  185),
    ("small_adult", "Small adult",         5 * 12 + 2,  120),
    ("child", "Child",                     4 * 12 + 0,  50),
    ("small_child", "Small child / toddler", 3 * 12 + 0, 30),
    ("infant", "Infant",                   2 * 12 + 4,  20),
]

POSITIONS = [
    ("standing", "Standing"),
    ("sitting", "Sitting"),
    ("recumbent", "Recumbent"),
]

CM_PER_INCH = 2.54


def _build_recumbent_path(height_cm):
    """Top-down silhouette of a person lying flat.

    Built by drawing the head, body, arms, and legs as separate closed paths
    and merging them with QPainterPath.united() into a single outer outline.
    The result is one clean silhouette — no internal stroke lines.
    """
    h = height_cm
    cx = 0.0

    head_diam = 0.135 * h
    head_r = head_diam / 2.0

    # Body (rectangular torso, including a small neck on top so the head
    # connects naturally to the shoulders after union).
    body_half_w = 0.118 * h
    body_top_y = 0.115 * h   # tucks slightly under the head ellipse
    body_bot_y = 0.555 * h
    neck_half_w = 0.045 * h
    neck_top_y = head_diam * 0.85

    # Arms hanging straight at the sides.
    arm_cx_offset = 0.108 * h
    arm_half_w = 0.038 * h
    arm_top_y = body_top_y + 0.010 * h
    arm_bot_y = body_bot_y + 0.005 * h   # hand bottom (level with body bottom)

    # Legs (separate, tapered shapes with foot toes)
    leg_cx_offset = 0.058 * h
    thigh_half_w = 0.052 * h
    knee_half_w = 0.044 * h
    ankle_half_w = 0.034 * h
    foot_outer = 0.066 * h    # outside of toe (distance from leg center)
    foot_inner = 0.005 * h
    hip_y = body_bot_y - 0.025 * h
    knee_y = 0.730 * h
    ankle_y = 0.955 * h
    foot_tip_y = 1.000 * h

    total_len = foot_tip_y
    y0 = -total_len / 2.0

    # Head
    head = QPainterPath()
    head.addEllipse(QRectF(cx - head_r, y0, head_diam, head_diam))

    # Body: a rounded rectangle with a narrower neck on top so it merges
    # cleanly with the head after union.
    body = QPainterPath()
    body.moveTo(cx + neck_half_w, y0 + neck_top_y)
    body.cubicTo(
        cx + neck_half_w + 0.020 * h, y0 + body_top_y - 0.005 * h,
        cx + body_half_w - 0.020 * h, y0 + body_top_y,
        cx + body_half_w, y0 + body_top_y + 0.015 * h,
    )
    body.lineTo(cx + body_half_w, y0 + body_bot_y - 0.020 * h)
    body.cubicTo(
        cx + body_half_w, y0 + body_bot_y,
        cx - body_half_w, y0 + body_bot_y,
        cx - body_half_w, y0 + body_bot_y - 0.020 * h,
    )
    body.lineTo(cx - body_half_w, y0 + body_top_y + 0.015 * h)
    body.cubicTo(
        cx - body_half_w + 0.020 * h, y0 + body_top_y,
        cx - neck_half_w - 0.020 * h, y0 + body_top_y - 0.005 * h,
        cx - neck_half_w, y0 + neck_top_y,
    )
    body.closeSubpath()

    # Arms (rounded capsules)
    arms = []
    for sign in (1, -1):
        ax = sign * arm_cx_offset
        arm = QPainterPath()
        arm.addRoundedRect(
            QRectF(ax - arm_half_w, y0 + arm_top_y,
                   arm_half_w * 2.0, arm_bot_y - arm_top_y),
            arm_half_w, arm_half_w,
        )
        arms.append(arm)

    # Legs (tapered shapes)
    legs = []
    for sign in (1, -1):
        lx = sign * leg_cx_offset
        leg = QPainterPath()
        # Outer edge: hip -> knee -> ankle
        leg.moveTo(lx + sign * thigh_half_w, y0 + hip_y)
        leg.cubicTo(
            lx + sign * thigh_half_w, y0 + hip_y + 0.080 * h,
            lx + sign * knee_half_w * 1.06, y0 + knee_y - 0.040 * h,
            lx + sign * knee_half_w, y0 + knee_y,
        )
        leg.cubicTo(
            lx + sign * knee_half_w, y0 + knee_y + 0.060 * h,
            lx + sign * ankle_half_w, y0 + ankle_y - 0.060 * h,
            lx + sign * ankle_half_w, y0 + ankle_y,
        )
        # Foot toe (splayed outward slightly)
        leg.lineTo(lx + sign * foot_outer, y0 + foot_tip_y)
        leg.lineTo(lx + sign * foot_inner, y0 + foot_tip_y)
        leg.lineTo(lx - sign * ankle_half_w * 0.85, y0 + ankle_y)
        # Inner edge back up to hip
        leg.cubicTo(
            lx - sign * ankle_half_w * 0.85, y0 + ankle_y - 0.060 * h,
            lx - sign * knee_half_w * 0.85, y0 + knee_y + 0.060 * h,
            lx - sign * knee_half_w * 0.85, y0 + knee_y,
        )
        leg.cubicTo(
            lx - sign * knee_half_w * 0.95, y0 + knee_y - 0.040 * h,
            lx - sign * thigh_half_w * 0.70, y0 + hip_y + 0.080 * h,
            lx - sign * thigh_half_w * 0.70, y0 + hip_y,
        )
        leg.closeSubpath()
        legs.append(leg)

    # Merge into a single outer silhouette. united() collapses internal
    # boundaries so the stroke draws only the outer outline.
    result = head.united(body)
    for arm in arms:
        result = result.united(arm)
    for leg in legs:
        result = result.united(leg)

    return result, total_len


def _build_sitting_path(height_cm):
    """Top-down silhouette of a person sitting cross-legged.

    Same construction strategy as recumbent: separate closed paths for head,
    body, arms, and a crossed-legs "lap" shape, merged with
    QPainterPath.united() into a single clean outer outline (no internal
    stroke lines).
    """
    h = height_cm
    cx = 0.0

    head_diam = 0.135 * h
    head_r = head_diam / 2.0

    # Body: shorter rectangular torso.
    body_half_w = 0.118 * h
    body_top_y = 0.115 * h
    body_bot_y = 0.410 * h
    neck_half_w = 0.045 * h
    neck_top_y = head_diam * 0.85

    # Arms bowing outward at elbow then in to lap (hands at lap level).
    arm_cx_offset = 0.108 * h
    arm_half_w = 0.040 * h
    arm_top_y = body_top_y + 0.010 * h
    elbow_y = 0.275 * h
    elbow_bulge = 0.040 * h
    hand_bot_y = 0.430 * h

    # Crossed-legs "skirt" (teardrop) below the body.
    lap_half_w_top = 0.135 * h     # at hip (widens beyond body)
    lap_half_w_mid = 0.155 * h     # widest (knees splayed)
    lap_half_w_bot = 0.075 * h     # narrows to front
    lap_top_y = 0.385 * h
    lap_widest_y = 0.475 * h
    lap_front_y = 0.580 * h

    foot_half_w = 0.045 * h
    foot_proj = 0.045 * h
    foot_tip_y = lap_front_y + foot_proj

    total_len = foot_tip_y
    y0 = -total_len / 2.0

    # Head
    head = QPainterPath()
    head.addEllipse(QRectF(cx - head_r, y0, head_diam, head_diam))

    # Body (rectangular, with narrow neck on top)
    body = QPainterPath()
    body.moveTo(cx + neck_half_w, y0 + neck_top_y)
    body.cubicTo(
        cx + neck_half_w + 0.020 * h, y0 + body_top_y - 0.005 * h,
        cx + body_half_w - 0.020 * h, y0 + body_top_y,
        cx + body_half_w, y0 + body_top_y + 0.015 * h,
    )
    body.lineTo(cx + body_half_w, y0 + body_bot_y - 0.020 * h)
    body.cubicTo(
        cx + body_half_w, y0 + body_bot_y,
        cx - body_half_w, y0 + body_bot_y,
        cx - body_half_w, y0 + body_bot_y - 0.020 * h,
    )
    body.lineTo(cx - body_half_w, y0 + body_top_y + 0.015 * h)
    body.cubicTo(
        cx - body_half_w + 0.020 * h, y0 + body_top_y,
        cx - neck_half_w - 0.020 * h, y0 + body_top_y - 0.005 * h,
        cx - neck_half_w, y0 + neck_top_y,
    )
    body.closeSubpath()

    # Arms (with outward elbow bulge)
    arms = []
    for sign in (1, -1):
        ax = sign * arm_cx_offset
        arm = QPainterPath()
        # Shoulder cap on top
        arm.moveTo(ax + arm_half_w, y0 + arm_top_y + arm_half_w * 0.5)
        arm.cubicTo(
            ax + arm_half_w, y0 + arm_top_y,
            ax - arm_half_w, y0 + arm_top_y,
            ax - arm_half_w, y0 + arm_top_y + arm_half_w * 0.5,
        )
        # Inner edge down (toward body) — straight
        arm.lineTo(ax - arm_half_w, y0 + hand_bot_y - arm_half_w * 0.5)
        # Bottom of hand (rounded)
        arm.cubicTo(
            ax - arm_half_w, y0 + hand_bot_y,
            ax + arm_half_w, y0 + hand_bot_y,
            ax + arm_half_w, y0 + hand_bot_y - arm_half_w * 0.5,
        )
        # Outer edge back up, bowing OUT at the elbow
        arm.cubicTo(
            ax + arm_half_w + sign * elbow_bulge, y0 + elbow_y + 0.040 * h,
            ax + arm_half_w + sign * elbow_bulge, y0 + elbow_y - 0.040 * h,
            ax + arm_half_w, y0 + arm_top_y + arm_half_w * 0.5,
        )
        arm.closeSubpath()
        arms.append(arm)

    # Lap (crossed-legs teardrop with foot bump at front-center)
    lap = QPainterPath()
    lap.moveTo(cx + lap_half_w_top, y0 + lap_top_y)
    lap.cubicTo(
        cx + lap_half_w_top + 0.010 * h, y0 + lap_top_y + 0.030 * h,
        cx + lap_half_w_mid, y0 + lap_widest_y - 0.030 * h,
        cx + lap_half_w_mid, y0 + lap_widest_y,
    )
    lap.cubicTo(
        cx + lap_half_w_mid, y0 + lap_widest_y + 0.045 * h,
        cx + lap_half_w_mid * 0.80, y0 + lap_front_y - 0.030 * h,
        cx + lap_half_w_bot, y0 + lap_front_y,
    )
    # Front edge to foot bump
    lap.lineTo(cx + foot_half_w, y0 + lap_front_y)
    lap.cubicTo(
        cx + foot_half_w, y0 + lap_front_y + foot_proj * 0.50,
        cx + foot_half_w * 0.55, y0 + foot_tip_y,
        cx, y0 + foot_tip_y,
    )
    lap.cubicTo(
        cx - foot_half_w * 0.55, y0 + foot_tip_y,
        cx - foot_half_w, y0 + lap_front_y + foot_proj * 0.50,
        cx - foot_half_w, y0 + lap_front_y,
    )
    lap.lineTo(cx - lap_half_w_bot, y0 + lap_front_y)
    lap.cubicTo(
        cx - lap_half_w_mid * 0.80, y0 + lap_front_y - 0.030 * h,
        cx - lap_half_w_mid, y0 + lap_widest_y + 0.045 * h,
        cx - lap_half_w_mid, y0 + lap_widest_y,
    )
    lap.cubicTo(
        cx - lap_half_w_mid, y0 + lap_widest_y - 0.030 * h,
        cx - lap_half_w_top - 0.010 * h, y0 + lap_top_y + 0.030 * h,
        cx - lap_half_w_top, y0 + lap_top_y,
    )
    lap.closeSubpath()

    # Union into a single clean outer silhouette.
    result = head.united(body)
    for arm in arms:
        result = result.united(arm)
    result = result.united(lap)

    return result, total_len


def _build_standing_path(height_cm):
    """Top-down silhouette of a person standing upright.

    From overhead, a standing person is mostly head + shoulders + a sliver of
    feet. We draw a head circle inside an outer shoulder/arm ellipse: this
    gives a recognizable "head + body" outline with the small footprint that's
    realistic for an upright person seen from above.
    """
    head_diam = 0.135 * height_cm
    shoulder_w = 0.260 * height_cm    # outer width including upper arms at sides
    chest_depth = 0.190 * height_cm   # front-to-back depth visible from above
    foot_proj = 0.040 * height_cm     # toes peeking past shoulders

    total_len = chest_depth + foot_proj * 0.3
    # Center the bounding box on (0,0). Put head at top.
    y0 = -total_len / 2.0
    cx = 0.0

    p = QPainterPath()
    # Outer shoulder/upper-body ellipse
    outer = QRectF(
        cx - shoulder_w / 2.0,
        y0 + (total_len - chest_depth) / 2.0,
        shoulder_w,
        chest_depth,
    )
    p.addEllipse(outer)

    # Head as a separate sub-path so it's visible inside the outer ellipse.
    head = QPainterPath()
    head.addEllipse(QRectF(
        cx - head_diam / 2.0,
        y0 + (total_len - head_diam) / 2.0,
        head_diam,
        head_diam,
    ))
    p.addPath(head)

    # Two tiny toes peeking out the "front" (top) of the silhouette.
    toe_w = 0.055 * height_cm
    toe_h = foot_proj
    p.addEllipse(QRectF(
        cx - shoulder_w * 0.18 - toe_w / 2.0,
        y0 - toe_h * 0.5,
        toe_w, toe_h,
    ))
    p.addEllipse(QRectF(
        cx + shoulder_w * 0.18 - toe_w / 2.0,
        y0 - toe_h * 0.5,
        toe_w, toe_h,
    ))
    return p, total_len


def build_person_path(height_cm, position_key):
    """Return (QPainterPath, length_cm) for a person of given height and pose."""
    if position_key == "recumbent":
        return _build_recumbent_path(height_cm)
    if position_key == "sitting":
        return _build_sitting_path(height_cm)
    return _build_standing_path(height_cm)


class _PersonOverlayItem(QGraphicsPathItem):
    """Draggable graphics item that holds the person silhouette path."""

    def __init__(self, dialog):
        super().__init__()
        self._dialog = dialog
        self.setFlag(QGraphicsItem.ItemIsMovable, True)
        self.setFlag(QGraphicsItem.ItemIsSelectable, True)
        self.setFlag(QGraphicsItem.ItemSendsGeometryChanges, True)
        self.setAcceptHoverEvents(True)
        # Above the image, below dialogs.
        self.setZValue(1000)
        self.setCursor(Qt.OpenHandCursor)

    def mousePressEvent(self, ev):
        if ev.button() == Qt.LeftButton:
            self.setCursor(Qt.ClosedHandCursor)
        super().mousePressEvent(ev)

    def mouseReleaseEvent(self, ev):
        self.setCursor(Qt.OpenHandCursor)
        super().mouseReleaseEvent(ev)

    def itemChange(self, change, value):
        if change == QGraphicsItem.ItemPositionHasChanged and self._dialog is not None:
            self._dialog._on_overlay_moved()
        return super().itemChange(change, value)


class PersonReferenceDialog(TranslationMixin, QDialog):
    """Dialog for placing a person-sized silhouette overlay on the image.

    Requires a valid GSD (cm/px). The caller is responsible for not opening
    the dialog when GSD is unavailable; the dialog itself will refuse to
    construct if `current_gsd` is falsy.
    """

    def __init__(self, parent, image_viewer, current_gsd, distance_unit,
                 gsd_at_pixel=None):
        """Initialize the dialog.

        Args:
            parent: Parent widget (Viewer).
            image_viewer: QtImageViewer instance.
            current_gsd: Image-average GSD in cm/px (used as fallback). Must be > 0.
            distance_unit: 'ft' for imperial display, anything else for metric.
            gsd_at_pixel: Optional callable(col, row) -> GSD cm/px for
                per-pixel GSD lookups. When provided, the overlay's size is
                recomputed at the local GSD at its center — this accounts for
                camera tilt AND (when the terrain service is enabled) terrain
                elevation variation across the frame.
        """
        super().__init__(parent)
        self._parent_viewer = parent  # Keep an explicit ref for showEvent positioning.
        self.image_viewer = image_viewer
        self.current_gsd = float(current_gsd) if current_gsd else None
        self.distance_unit = distance_unit
        self.gsd_at_pixel = gsd_at_pixel

        # Cached cm-space path (unscaled). Rebuilt only when size/position changes.
        self._cm_path = None
        self._cm_total_len = 0.0
        self._cm_width = 0.0

        self.size_key = SIZE_CLASSES[1][0]  # default: Average adult
        self.position_key = POSITIONS[2][0]  # default: Recumbent (most useful from drone)

        # Overlay color (persisted across sessions so the user only sets it once).
        self._settings_service = SettingsService()
        saved_color = self._settings_service.get_setting(SETTING_OVERLAY_COLOR)
        color = QColor(saved_color) if saved_color else QColor(DEFAULT_OVERLAY_COLOR)
        if not color.isValid():
            color = QColor(DEFAULT_OVERLAY_COLOR)
        self.overlay_color = color

        # Graphics items
        self.overlay_item = None

        # Track viewer settings we override so we can restore on close.
        self._orig_can_zoom = self.image_viewer.canZoom
        self._orig_can_pan = self.image_viewer.canPan
        self._orig_region_zoom = self.image_viewer.regionZoomButton

        self._setup_ui()
        self._connect_signals()
        self._apply_translations()

        # Place the silhouette once at startup so the user immediately sees it.
        self._rebuild_overlay(initial=True)

    # ---------------- UI ----------------
    def _setup_ui(self):
        self.setWindowTitle(self.tr("Person Size Reference"))
        self.setModal(False)
        self.setWindowFlags(self.windowFlags() | Qt.WindowStaysOnTopHint)
        self.setMinimumWidth(320)

        layout = QVBoxLayout(self)

        params_group = QGroupBox(self.tr("Reference Person"))
        form = QFormLayout()

        self.size_combo = QComboBox()
        for key, label, height_in, weight_lb in SIZE_CLASSES:
            ft = height_in // 12
            inch = height_in % 12
            if self.distance_unit == 'ft':
                size_label = f"{self.tr(label)}  ({ft}'{inch}\", {weight_lb} lb)"
            else:
                h_cm = round(height_in * CM_PER_INCH)
                w_kg = round(weight_lb * 0.4536, 1)
                size_label = f"{self.tr(label)}  ({h_cm} cm, {w_kg} kg)"
            self.size_combo.addItem(size_label, key)
        # default selection
        self.size_combo.setCurrentIndex(1)

        self.position_combo = QComboBox()
        for key, label in POSITIONS:
            self.position_combo.addItem(self.tr(label), key)
        self.position_combo.setCurrentIndex(2)  # Recumbent

        # Color swatch button — click to pick a different overlay color
        self.color_button = QPushButton()
        self.color_button.setFixedWidth(60)
        self.color_button.setToolTip(self.tr("Click to choose overlay color"))
        self._apply_color_button_style()

        color_row = QHBoxLayout()
        color_row.addWidget(self.color_button)
        color_row.addStretch()
        color_row_widget = QWidget()
        color_row_widget.setLayout(color_row)

        form.addRow(self.tr("Size:"), self.size_combo)
        form.addRow(self.tr("Position:"), self.position_combo)
        form.addRow(self.tr("Color:"), color_row_widget)
        params_group.setLayout(form)

        # Dimensions readout
        dims_group = QGroupBox(self.tr("On-image Footprint"))
        dims_layout = QFormLayout()
        self.length_label = QLabel("--")
        self.width_label = QLabel("--")
        self.gsd_label = QLabel("--")
        font = self.length_label.font()
        font.setBold(True)
        self.length_label.setFont(font)
        self.width_label.setFont(font)
        dims_layout.addRow(self.tr("Length:"), self.length_label)
        dims_layout.addRow(self.tr("Width:"), self.width_label)
        dims_layout.addRow(self.tr("GSD:"), self.gsd_label)
        dims_group.setLayout(dims_layout)

        instructions = QLabel(self.tr(
            "Click and drag the silhouette on the image to move it.\n"
            "Sizes are drawn to scale using the image's Ground Sample Distance."
        ))
        instructions.setWordWrap(True)
        instructions.setStyleSheet("QLabel { color: gray; }")

        # Buttons
        button_row = QHBoxLayout()
        self.recenter_button = QPushButton(self.tr("Recenter"))
        self.close_button = QPushButton(self.tr("Close"))
        button_row.addWidget(self.recenter_button)
        button_row.addStretch()
        button_row.addWidget(self.close_button)

        layout.addWidget(params_group)
        layout.addWidget(dims_group)
        layout.addWidget(instructions)
        layout.addLayout(button_row)
        layout.addStretch()

    def showEvent(self, event):
        """Nudge the dialog slightly to the side so it doesn't open directly
        on top of the centered overlay. Only adjusts position the first time
        the dialog is shown."""
        super().showEvent(event)
        self.activateWindow()
        self.raise_()

        if not getattr(self, '_position_adjusted', False):
            try:
                current = self.pos()
                self.move(current.x() + 100, current.y())
            except Exception:
                pass
            self._position_adjusted = True

    def _connect_signals(self):
        self.size_combo.currentIndexChanged.connect(self._on_params_changed)
        self.position_combo.currentIndexChanged.connect(self._on_params_changed)
        self.color_button.clicked.connect(self._on_color_button_clicked)
        self.recenter_button.clicked.connect(self._recenter)
        self.close_button.clicked.connect(self.close)
        self.image_viewer.zoomChanged.connect(self._on_zoom_changed)

    def _apply_color_button_style(self):
        """Render the color button as a swatch of the current overlay color."""
        c = self.overlay_color
        # Pick a contrasting border so the swatch is visible on dark themes.
        border = '#ffffff' if c.lightness() < 128 else '#222222'
        self.color_button.setStyleSheet(
            f"QPushButton {{ background-color: {c.name()}; "
            f"border: 1px solid {border}; min-height: 22px; }}"
        )

    def _on_color_button_clicked(self):
        chosen = QColorDialog.getColor(
            self.overlay_color, self, self.tr("Choose Overlay Color")
        )
        if not chosen.isValid():
            return
        self.overlay_color = chosen
        self._settings_service.set_setting(SETTING_OVERLAY_COLOR, chosen.name())
        self._apply_color_button_style()
        self._apply_color_to_items()

    # ---------------- helpers ----------------
    def _selected_height_cm(self):
        idx = self.size_combo.currentIndex()
        if idx < 0:
            idx = 0
        _, _, height_in, _ = SIZE_CLASSES[idx]
        return height_in * CM_PER_INCH

    def _format_distance(self, cm):
        """Format a centimeter distance in the user's preferred units.

        Imperial output uses feet + inches (e.g. 5'7") instead of decimal
        feet so a 5'7" person doesn't read as "5.58 ft".
        """
        if cm is None:
            return "--"
        if self.distance_unit == 'ft':
            total_inches = cm / CM_PER_INCH
            if total_inches < 12:
                return f"{total_inches:.1f} in"
            feet = int(total_inches // 12)
            inches = total_inches - feet * 12
            # Handle rounding: 11.95" rounds up to 12 -> bump to next foot.
            if inches >= 11.95:
                feet += 1
                inches = 0.0
            if inches < 0.05:
                return f"{feet}'"
            return f"{feet}'{inches:.1f}\""
        if cm >= 100:
            return f"{cm / 100:.2f} m"
        return f"{cm:.0f} cm"

    def _viewport_center_scene(self):
        """Return the scene-coordinate point at the center of the viewport."""
        try:
            view_rect = self.image_viewer.viewport().rect()
            return self.image_viewer.mapToScene(view_rect.center())
        except Exception:
            sr = self.image_viewer.sceneRect()
            return sr.center()

    # ---------------- overlay management ----------------
    def _rebuild_overlay(self, initial=False):
        """Recreate the silhouette item. Path is stored in cm-space; size on
        screen is driven by a transform set in _apply_local_scale().

        Preserves the on-image position when possible.
        """
        if not self.current_gsd or self.current_gsd <= 0:
            self.length_label.setText(self.tr("GSD unavailable"))
            self.width_label.setText("--")
            self.gsd_label.setText("--")
            return

        height_cm = self._selected_height_cm()
        path, total_len_cm = build_person_path(height_cm, self.position_key)
        self._cm_path = path
        bbox_cm = path.boundingRect()
        self._cm_total_len = bbox_cm.height()
        self._cm_width = bbox_cm.width()

        # Preserve current position if we already have an overlay
        prev_pos = None
        if self.overlay_item is not None:
            prev_pos = self.overlay_item.pos()
            try:
                self.image_viewer.scene.removeItem(self.overlay_item)
            except Exception:
                pass
            self.overlay_item = None

        item = _PersonOverlayItem(self)
        item.setPath(self._cm_path)
        self._apply_color_to_path_item(item)

        self.image_viewer.scene.addItem(item)
        self.overlay_item = item

        # Place at saved location, or at viewport center if first time.
        if prev_pos is not None and not initial:
            item.setPos(prev_pos)
        else:
            item.setPos(self._viewport_center_scene())

        # Scale to local GSD at the overlay center and clamp into the image.
        self._apply_local_scale()
        self._clamp_to_scene()

    def _gsd_at_scene_point(self, scene_pos):
        """Return GSD (cm/px) at the given scene point, falling back to the
        image-average GSD when the per-pixel provider is unavailable or fails."""
        if self.gsd_at_pixel is not None:
            try:
                # Clamp inside scene bounds so the lookup has valid pixels.
                scene_rect = self.image_viewer.sceneRect()
                col = max(scene_rect.left(),
                          min(scene_rect.right() - 1, scene_pos.x()))
                row = max(scene_rect.top(),
                          min(scene_rect.bottom() - 1, scene_pos.y()))
                local = self.gsd_at_pixel(col, row)
                if local is not None and local > 0:
                    return float(local)
            except Exception:
                pass
        return self.current_gsd

    def _apply_local_scale(self):
        """Resize the overlay using GSD at its current center, and refresh
        the dialog's length/width/GSD readouts."""
        if self.overlay_item is None or self._cm_path is None:
            return
        center = self.overlay_item.pos()
        local_gsd_cm_per_px = self._gsd_at_scene_point(center)
        if not local_gsd_cm_per_px or local_gsd_cm_per_px <= 0:
            return

        scale = 1.0 / local_gsd_cm_per_px  # cm * (px/cm) -> px
        self.overlay_item.setTransform(QTransform().scale(scale, scale))

        # Update dialog readouts based on the local GSD.
        self.length_label.setText(self._format_distance(self._cm_total_len))
        self.width_label.setText(self._format_distance(self._cm_width))
        if self.distance_unit == 'ft':
            self.gsd_label.setText(
                f"{local_gsd_cm_per_px:.2f} cm/px  "
                f"({local_gsd_cm_per_px / CM_PER_INCH:.2f} in/px)"
            )
        else:
            self.gsd_label.setText(f"{local_gsd_cm_per_px:.2f} cm/px")

    def _apply_color_to_path_item(self, item):
        """Apply the current overlay color to a graphics path item."""
        pen = QPen(QColor(self.overlay_color))
        pen.setCosmetic(True)  # stroke width stays constant in screen pixels
        pen.setWidth(2)
        item.setPen(pen)
        fill = QColor(self.overlay_color)
        fill.setAlpha(60)
        item.setBrush(QBrush(fill))

    def _apply_color_to_items(self):
        """Push the current overlay color onto the live graphics items."""
        if self.overlay_item is not None:
            self._apply_color_to_path_item(self.overlay_item)

    def _clamp_to_scene(self):
        if self.overlay_item is None:
            return
        scene_rect = self.image_viewer.sceneRect()
        item_rect = self.overlay_item.mapToScene(self.overlay_item.boundingRect()).boundingRect()
        dx = 0.0
        dy = 0.0
        if item_rect.left() < scene_rect.left():
            dx = scene_rect.left() - item_rect.left()
        elif item_rect.right() > scene_rect.right():
            dx = scene_rect.right() - item_rect.right()
        if item_rect.top() < scene_rect.top():
            dy = scene_rect.top() - item_rect.top()
        elif item_rect.bottom() > scene_rect.bottom():
            dy = scene_rect.bottom() - item_rect.bottom()
        if dx != 0.0 or dy != 0.0:
            self.overlay_item.moveBy(dx, dy)

    def _recenter(self):
        if self.overlay_item is None:
            return
        center = self._viewport_center_scene()
        self.overlay_item.setPos(center)
        self._clamp_to_scene()

    # ---------------- event handlers ----------------
    def _on_params_changed(self, _idx):
        self.size_key = self.size_combo.currentData()
        self.position_key = self.position_combo.currentData()
        self._rebuild_overlay()

    def _on_zoom_changed(self, _zoom):
        # Stroke uses a cosmetic pen so width stays stable in screen pixels.
        pass

    def _on_overlay_moved(self):
        # Local GSD depends on where the silhouette sits in the frame; rescale
        # whenever the user drags it.
        self._apply_local_scale()

    # ---------------- update GSD externally ----------------
    def update_gsd(self, new_gsd, gsd_at_pixel=None):
        """Caller (Viewer) tells us when the active image's GSD changes."""
        if not new_gsd or new_gsd <= 0:
            self.current_gsd = None
            self.gsd_at_pixel = None
            self._clear_overlay()
            self.length_label.setText(self.tr("GSD unavailable"))
            self.width_label.setText("--")
            self.gsd_label.setText("--")
            return
        self.current_gsd = float(new_gsd)
        # Replace the provider (or set None to fall back to the average).
        self.gsd_at_pixel = gsd_at_pixel
        if self.overlay_item is None:
            self._rebuild_overlay()
        else:
            # Just rescale; size/position picker hasn't changed.
            self._apply_local_scale()
            self._clamp_to_scene()

    def _clear_overlay(self):
        item = getattr(self, "overlay_item", None)
        if item is not None:
            try:
                self.image_viewer.scene.removeItem(item)
            except Exception:
                pass
            self.overlay_item = None

    # ---------------- close ----------------
    def closeEvent(self, event):
        try:
            self.image_viewer.zoomChanged.disconnect(self._on_zoom_changed)
        except Exception:
            pass
        self._clear_overlay()
        # Restore zoom/pan settings (we don't actually change them here, but
        # leave the hooks in for future read-only modes).
        self.image_viewer.canZoom = self._orig_can_zoom
        self.image_viewer.canPan = self._orig_can_pan
        self.image_viewer.regionZoomButton = self._orig_region_zoom
        super().closeEvent(event)
