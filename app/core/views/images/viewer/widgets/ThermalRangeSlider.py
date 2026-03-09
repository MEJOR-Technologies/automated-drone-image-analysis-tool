"""
ThermalRangeSlider - Two-handled range slider for temperature selection.
"""

from PySide6.QtCore import QPointF, QRectF, Qt, Signal
from PySide6.QtGui import QColor, QPainter, QPen
from PySide6.QtWidgets import QWidget


class ThermalRangeSlider(QWidget):
    """Horizontal two-handled slider for selecting a temperature band."""

    valuesChanged = Signal(float, float)

    HANDLE_WIDTH = 16
    HANDLE_HEIGHT = 24
    TRACK_HEIGHT = 8

    def __init__(self, parent=None):
        super().__init__(parent)
        self.setMinimumHeight(40)
        self.setMouseTracking(True)

        self._minimum = 0.0
        self._maximum = 1.0
        self._lower_value = 0.0
        self._upper_value = 1.0
        self._drag_target = None

    def set_range(self, minimum, maximum):
        """Set the full numeric range available on the slider."""
        self._minimum = float(minimum)
        self._maximum = max(float(minimum), float(maximum))
        self.set_values(self._lower_value, self._upper_value, emit_signal=False)

    def set_values(self, lower_value, upper_value, emit_signal=False):
        """Update the selected slider values."""
        lower_value = max(self._minimum, min(float(lower_value), self._maximum))
        upper_value = max(self._minimum, min(float(upper_value), self._maximum))
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

    def paintEvent(self, event):
        painter = QPainter(self)
        painter.setRenderHint(QPainter.Antialiasing, True)
        painter.fillRect(self.rect(), self.palette().window())

        track_rect = self._track_rect()

        painter.setPen(Qt.NoPen)
        painter.setBrush(QColor(80, 86, 95))
        painter.drawRoundedRect(track_rect, 3, 3)

        lower_x = self._value_to_x(self._lower_value)
        upper_x = self._value_to_x(self._upper_value)
        selected_rect = QRectF(lower_x, track_rect.top(), max(2.0, upper_x - lower_x), track_rect.height())
        painter.setBrush(QColor(90, 190, 255))
        painter.drawRoundedRect(selected_rect, 3, 3)

        self._draw_handle(painter, lower_x, active=self._drag_target == 'lower')
        self._draw_handle(painter, upper_x, active=self._drag_target == 'upper')

    def mousePressEvent(self, event):
        lower_x = self._value_to_x(self._lower_value)
        upper_x = self._value_to_x(self._upper_value)
        click_x = event.position().x()

        if abs(click_x - lower_x) <= abs(click_x - upper_x):
            self._drag_target = 'lower'
        else:
            self._drag_target = 'upper'

        self._update_from_position(click_x)

    def mouseMoveEvent(self, event):
        if self._drag_target:
            self._update_from_position(event.position().x())

    def mouseReleaseEvent(self, event):
        self._drag_target = None

    def _draw_handle(self, painter, x_position, active=False):
        center_y = self.height() / 2.0
        handle_rect = QRectF(
            x_position - (self.HANDLE_WIDTH / 2.0),
            center_y - (self.HANDLE_HEIGHT / 2.0),
            self.HANDLE_WIDTH,
            self.HANDLE_HEIGHT
        )

        border = QColor(100, 170, 255) if active else QColor(225, 230, 238)
        fill = QColor(245, 248, 252) if active else QColor(232, 237, 244)
        painter.setPen(QPen(border, 1.5))
        painter.setBrush(fill)
        painter.drawRoundedRect(handle_rect, 5, 5)

        painter.setPen(QPen(QColor(120, 130, 145), 1))
        grip_top = handle_rect.top() + 6
        grip_bottom = handle_rect.bottom() - 6
        painter.drawLine(QPointF(x_position - 2, grip_top), QPointF(x_position - 2, grip_bottom))
        painter.drawLine(QPointF(x_position + 2, grip_top), QPointF(x_position + 2, grip_bottom))

    def _track_rect(self):
        margin = self.HANDLE_WIDTH / 2.0
        return QRectF(
            margin,
            (self.height() - self.TRACK_HEIGHT) / 2.0,
            max(20.0, self.width() - (margin * 2)),
            self.TRACK_HEIGHT
        )

    def _value_to_x(self, value):
        track_rect = self._track_rect()
        span = max(1e-6, self._maximum - self._minimum)
        ratio = (float(value) - self._minimum) / span
        return track_rect.left() + (ratio * track_rect.width())

    def _position_to_value(self, x_position):
        track_rect = self._track_rect()
        ratio = (x_position - track_rect.left()) / max(1.0, track_rect.width())
        ratio = max(0.0, min(1.0, ratio))
        return self._minimum + (ratio * (self._maximum - self._minimum))

    def _update_from_position(self, x_position):
        value = self._position_to_value(x_position)
        if self._drag_target == 'lower':
            self.set_values(value, self._upper_value, emit_signal=True)
        elif self._drag_target == 'upper':
            self.set_values(self._lower_value, value, emit_signal=True)
