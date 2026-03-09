"""
HueWheelRangeSelector - Circular range selector for HSV hue values.
"""

import math

from PySide6.QtCore import QPointF, QRectF, Qt, Signal
from PySide6.QtGui import QColor, QPainter, QPen
from PySide6.QtWidgets import QWidget


class HueWheelRangeSelector(QWidget):
    """Circular two-handle selector for hue ranges."""

    valuesChanged = Signal(float, float)

    HANDLE_RADIUS = 11.0
    RING_THICKNESS = 24.0
    SELECTION_THICKNESS = 34.0

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(220)
        self.setMinimumWidth(220)
        self.setMouseTracking(True)

        self._minimum = 0.0
        self._maximum = 360.0
        self._lower_value = 0.0
        self._upper_value = 360.0
        self._selection_wrap = False
        self._drag_target = None

    def set_range(self, minimum, maximum):
        """Set the full numeric range available on the selector."""
        self._minimum = float(minimum)
        self._maximum = max(float(minimum), float(maximum))
        self.set_values(self._lower_value, self._upper_value, emit_signal=False)

    def set_values(self, lower_value, upper_value, emit_signal=False):
        """Update the selected hue bounds."""
        lower_value = max(self._minimum, min(round(float(lower_value)), self._maximum))
        upper_value = max(self._minimum, min(round(float(upper_value)), self._maximum))
        if lower_value > upper_value:
            lower_value, upper_value = upper_value, lower_value

        changed = (
            abs(self._lower_value - lower_value) > 1e-6 or
            abs(self._upper_value - upper_value) > 1e-6
        )

        self._lower_value = lower_value
        self._upper_value = upper_value
        self.update()

        if emit_signal and changed:
            self.valuesChanged.emit(self._lower_value, self._upper_value)

    def values(self):
        """Return the selected lower and upper values."""
        return self._lower_value, self._upper_value

    def set_selection_wrap(self, selection_wrap):
        """Set whether the selected range wraps around 0 degrees."""
        self._selection_wrap = bool(selection_wrap)
        self.update()

    def selection_wrap(self):
        """Return whether the selected range wraps around 0 degrees."""
        return self._selection_wrap

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing, True)
        painter.fillRect(self.rect(), self.palette().window())

        ring_rect = self._ring_rect()
        self._draw_hue_wheel(painter, ring_rect)
        self._draw_unselected_overlay(painter, ring_rect)
        self._draw_selected_arc(painter, ring_rect)
        self._draw_boundary_marker(painter, self._lower_value, ring_rect)
        self._draw_boundary_marker(painter, self._upper_value, ring_rect)
        self._draw_handle(painter, self._lower_value, active=self._drag_target == 'lower', ring_rect=ring_rect)
        self._draw_handle(painter, self._upper_value, active=self._drag_target == 'upper', ring_rect=ring_rect)

    def mousePressEvent(self, event):
        if event.button() != Qt.LeftButton:
            return

        click_point = event.position()
        ring_rect = self._ring_rect()
        lower_center = self._handle_center(self._lower_value, ring_rect)
        upper_center = self._handle_center(self._upper_value, ring_rect)

        if self._distance(click_point, lower_center) <= self._distance(click_point, upper_center):
            self._drag_target = 'lower'
        else:
            self._drag_target = 'upper'

        self._update_from_position(click_point)

    def mouseMoveEvent(self, event):
        if self._drag_target:
            self._update_from_position(event.position())

    def mouseReleaseEvent(self, event):
        self._drag_target = None
        self.update()

    def _draw_hue_wheel(self, painter, ring_rect):
        """Draw the full hue spectrum ring."""
        painter.save()
        for degree in range(360):
            pen = QPen(QColor.fromHsv(degree, 255, 255), self.RING_THICKNESS)
            painter.setPen(pen)
            painter.drawArc(ring_rect, degree * 16, 2 * 16)
        painter.restore()

    def _draw_unselected_overlay(self, painter, ring_rect):
        """Dim the portion of the ring that is outside the active selection."""
        painter.save()
        pen = QPen(QColor(20, 24, 32, 185), self.RING_THICKNESS + 2)
        painter.setPen(pen)

        lower = self._normalized_value(self._lower_value)
        upper = self._normalized_value(self._upper_value)

        if self._selection_wrap:
            self._draw_arc_segment(painter, ring_rect, lower, upper)
        else:
            self._draw_arc_segment(painter, ring_rect, 0.0, lower)
            self._draw_arc_segment(painter, ring_rect, upper, 360.0)

        painter.restore()

    def _draw_selected_arc(self, painter, ring_rect):
        """Draw a clear selection backing and inner accent for the active hue range."""
        painter.save()

        backing_pen = QPen(QColor(210, 210, 210, 235), self.SELECTION_THICKNESS)
        painter.setPen(backing_pen)
        self._draw_selected_segments(painter, ring_rect)

        color_pen = QPen(Qt.transparent, self.RING_THICKNESS)
        painter.setPen(color_pen)
        for start_value, end_value in self._selected_segments():
            self._draw_hue_segment(painter, ring_rect, start_value, end_value)

        accent_pen = QPen(QColor(255, 255, 255, 235), 3)
        painter.setPen(accent_pen)
        self._draw_selected_segments(painter, self._inner_accent_rect(ring_rect))

        painter.restore()

    def _draw_boundary_marker(self, painter, value, ring_rect):
        """Draw a thin radial marker at a handle boundary."""
        center = ring_rect.center()
        angle_radians = math.radians(self._normalized_value(value))
        inner_radius = max(8.0, (ring_rect.width() / 2.0) - self.SELECTION_THICKNESS + 4.0)
        outer_radius = (ring_rect.width() / 2.0) + 6.0

        start = QPointF(
            center.x() + (inner_radius * math.cos(angle_radians)),
            center.y() - (inner_radius * math.sin(angle_radians))
        )
        end = QPointF(
            center.x() + (outer_radius * math.cos(angle_radians)),
            center.y() - (outer_radius * math.sin(angle_radians))
        )

        painter.save()
        painter.setPen(QPen(QColor(255, 255, 255), 3))
        painter.drawLine(start, end)
        painter.restore()

    def _draw_handle(self, painter, value, active, ring_rect):
        """Draw a draggable handle on the hue wheel."""
        center = self._handle_center(value, ring_rect)
        handle_rect = QRectF(
            center.x() - self.HANDLE_RADIUS,
            center.y() - self.HANDLE_RADIUS,
            self.HANDLE_RADIUS * 2.0,
            self.HANDLE_RADIUS * 2.0
        )

        shadow_rect = handle_rect.adjusted(1.0, 1.5, 1.0, 1.5)
        border = QColor(90, 150, 255) if active else QColor(82, 88, 98)
        fill = QColor(250, 252, 255) if active else QColor(238, 241, 246)
        painter.save()
        painter.setPen(Qt.NoPen)
        painter.setBrush(QColor(0, 0, 0, 65))
        painter.drawEllipse(shadow_rect)
        painter.setPen(QPen(border, 1.75))
        painter.setBrush(fill)
        painter.drawEllipse(handle_rect)
        painter.setPen(QPen(QColor(120, 130, 145), 1.2))
        painter.drawLine(
            QPointF(center.x() - 3.0, center.y()),
            QPointF(center.x() + 3.0, center.y())
        )
        painter.restore()

    def _draw_arc_segment(self, painter, ring_rect, start_value, end_value):
        """Draw a ring segment between two hue values."""
        start_value = max(0.0, min(360.0, float(start_value)))
        end_value = max(0.0, min(360.0, float(end_value)))
        span = max(0.0, end_value - start_value)
        if span <= 1e-6:
            return
        painter.drawArc(ring_rect, int(start_value * 16), int(span * 16))

    def _draw_hue_segment(self, painter, ring_rect, start_value, end_value):
        """Redraw the selected hue arc so it stays vivid over the selection backing."""
        start_degree = int(max(0.0, min(360.0, float(start_value))))
        end_degree = int(max(0.0, min(360.0, float(end_value))))
        if end_degree <= start_degree:
            return

        for degree in range(start_degree, end_degree):
            pen = QPen(QColor.fromHsv(degree % 360, 255, 255), self.RING_THICKNESS)
            painter.setPen(pen)
            painter.drawArc(ring_rect, degree * 16, 2 * 16)

    def _draw_selected_segments(self, painter, ring_rect):
        """Draw the currently selected arc segments."""
        for start_value, end_value in self._selected_segments():
            self._draw_arc_segment(painter, ring_rect, start_value, end_value)

    def _selected_segments(self):
        """Return the active hue segments for the current selection mode."""
        lower = self._normalized_value(self._lower_value)
        upper = self._normalized_value(self._upper_value)
        if self._selection_wrap:
            return [(0.0, lower), (upper, 360.0)]
        return [(lower, upper)]

    def _inner_accent_rect(self, ring_rect):
        """Return a slightly smaller ring rect for the inner selection accent."""
        inset = (self.SELECTION_THICKNESS - self.RING_THICKNESS) / 2.0
        return ring_rect.adjusted(inset, inset, -inset, -inset)

    def _ring_rect(self):
        margin = self.HANDLE_RADIUS + 14.0
        size = max(80.0, min(self.width(), self.height()) - (margin * 2.0))
        left = (self.width() - size) / 2.0
        top = (self.height() - size) / 2.0
        return QRectF(left, top, size, size)

    def _handle_center(self, value, ring_rect):
        angle_radians = math.radians(self._normalized_value(value))
        radius = ring_rect.width() / 2.0
        center = ring_rect.center()
        return QPointF(
            center.x() + (radius * math.cos(angle_radians)),
            center.y() - (radius * math.sin(angle_radians))
        )

    def _point_to_value(self, point):
        ring_rect = self._ring_rect()
        center = ring_rect.center()
        angle = math.degrees(math.atan2(center.y() - point.y(), point.x() - center.x()))
        value = self._minimum + (((angle % 360.0) / 360.0) * (self._maximum - self._minimum))
        return round(value)

    def _update_from_position(self, point):
        value = self._point_to_value(point)
        if self._drag_target == 'lower':
            self.set_values(value, self._upper_value, emit_signal=True)
        elif self._drag_target == 'upper':
            self.set_values(self._lower_value, value, emit_signal=True)

    def _normalized_value(self, value):
        span = max(1e-6, self._maximum - self._minimum)
        ratio = (float(value) - self._minimum) / span
        return max(0.0, min(360.0, ratio * 360.0))

    @staticmethod
    def _distance(point_a, point_b):
        delta_x = point_a.x() - point_b.x()
        delta_y = point_a.y() - point_b.y()
        return math.hypot(delta_x, delta_y)
