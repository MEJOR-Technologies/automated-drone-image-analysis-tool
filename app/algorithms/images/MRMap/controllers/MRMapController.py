import sys

from algorithms.AlgorithmController import AlgorithmController
from algorithms.images.MRMap.views.MRMap_ui import Ui_MRMap

from PySide6.QtWidgets import QComboBox, QListView, QWidget


class MRMapController(QWidget, Ui_MRMap, AlgorithmController):
    """Controller for the RX Anomaly algorithm widget."""

    def __init__(self, config, theme):
        """
        Initializes the MRMapController widget and sets up the UI.

        Connects the threshold slider to the updatethreshold handler.

        Args:
            config (dict): Algorithm config information.
            theme (str): Name of the active theme used to resolve icon paths.
        """
        QWidget.__init__(self)
        AlgorithmController.__init__(self, config)
        self.setupUi(self)
        self._init_combo_data()
        self._fixComboBoxForMacOS(self.colorspaceComboBox)
        self._fixComboBoxForMacOS(self.segmentsComboBox)
        self.thresholdSlider.valueChanged.connect(self.updatethreshold)

    def _fixComboBoxForMacOS(self, combo):
        """Force non-native dropdown rendering on macOS to fix popup positioning and padding."""
        combo.setSizeAdjustPolicy(QComboBox.SizeAdjustPolicy.AdjustToContents)
        if sys.platform == 'darwin':
            combo.setView(QListView())

    def _init_combo_data(self):
        """Attach stable option keys so translated labels do not affect config values."""
        for index in range(self.segmentsComboBox.count()):
            text = self.segmentsComboBox.itemText(index)
            try:
                self.segmentsComboBox.setItemData(index, int(text))
            except ValueError:
                continue

        for index in range(self.colorspaceComboBox.count()):
            self.colorspaceComboBox.setItemData(index, self.colorspaceComboBox.itemText(index))

    def get_options(self):
        """
        Populates options based on user-selected values.

        Returns:
            dict: A dictionary containing the selected option values, including 'threshold', 'segments', 'window', and 'colorspace'.
        """
        options = dict()
        options['threshold'] = int(self.thresholdValueLabel.text())
        options['segments'] = int(self.segmentsComboBox.currentData())
        options['window'] = self.windowSpinBox.value()
        options['colorspace'] = str(self.colorspaceComboBox.currentData())
        return options

    def updatethreshold(self):
        """
        Handles changes to the threshold slider.

        Updates the threshold value label based on the current slider position.
        """
        self.thresholdValueLabel.setText(str(self.thresholdSlider.value()))

    def validate(self):
        """
        Validates that the required values have been provided.

        Returns:
            str: An error message if validation fails, otherwise None.
        """
        return None

    def load_options(self, options):
        """
        Sets UI elements based on the provided options.

        Args:
            options (dict): The options to use to set UI attributes, including 'threshold', 'segments', 'window', and 'colorspace'.
        """
        if 'threshold' in options:
            self.thresholdValueLabel.setText(str(options['threshold']))
            self.thresholdSlider.setProperty("value", int(options['threshold']))
        if 'segments' in options:
            index = self.segmentsComboBox.findData(int(options['segments']))
            if index >= 0:
                self.segmentsComboBox.setCurrentIndex(index)
            else:
                self.segmentsComboBox.setCurrentText(str(options['segments']))
        if 'window' in options:
            self.windowSpinBox.setValue(int(options['window']))
        if 'colorspace' in options:
            index = self.colorspaceComboBox.findData(str(options['colorspace']))
            if index >= 0:
                self.colorspaceComboBox.setCurrentIndex(index)
            else:
                self.colorspaceComboBox.setCurrentText(str(options['colorspace']))
