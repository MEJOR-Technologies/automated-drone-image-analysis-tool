"""Wizard controller for streaming AI Person Detector."""

from typing import Dict, Any

from PySide6.QtCore import Signal
from PySide6.QtWidgets import QWidget, QVBoxLayout

from algorithms.streaming.AIPersonDetector.views import AIPersonDetectorControlWidget


class AIPersonDetectorWizardController(QWidget):
    """Wizard parameters UI for AIPersonDetector."""

    validation_changed = Signal()

    def __init__(self, config: Dict[str, Any], theme: str):
        super().__init__()
        self.config = config
        self.theme = theme

        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        self.control_widget = AIPersonDetectorControlWidget(self)
        layout.addWidget(self.control_widget)

        self.control_widget.configChanged.connect(self._on_config_changed)

    def _on_config_changed(self, _config: Dict[str, Any]):
        self.validation_changed.emit()

    def get_options(self) -> Dict[str, Any]:
        """Get wizard options for the algorithm."""
        return self.control_widget.get_config()

    def load_options(self, options: Dict[str, Any]):
        """Load previously saved wizard options."""
        if isinstance(options, dict):
            self.control_widget.set_config(options)

    def validate(self):
        """Always valid for this algorithm."""
        return None
