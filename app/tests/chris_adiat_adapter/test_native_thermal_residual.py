"""Real decoded-raster detector regressions; no detector or codec is mocked."""

import tempfile
import unittest
from pathlib import Path

import numpy as np

from chris_adiat_adapter.algorithms import _run_thermal_algorithm


class NativeThermalResidualTests(unittest.TestCase):
    def detect(self, raster, options, limit=None):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "thermal.raw"
            np.asarray(raster, dtype="<f4").tofile(path)
            return _run_thermal_algorithm(
                "ThermalResidualAnomaly",
                str(path),
                {
                    "metadata": {
                        "image_width": raster.shape[1],
                        "image_height": raster.shape[0],
                    }
                },
                work_dir=directory,
                algorithm_options=options,
                max_observations=limit,
            )

    def test_hot_cold_direction_changes_actual_detections(self):
        raster = np.full((97, 97), 20.0, dtype=np.float32)
        raster[18:30, 18:30] = 40.0
        raster[66:78, 66:78] = 0.0
        raster[:3, :] = np.nan
        for direction, temperatures in [
            ("Hot", [40.0]),
            ("Cold", [0.0]),
            ("Both", [0.0, 40.0]),
        ]:
            with self.subTest(direction=direction):
                areas = self.detect(raster, {"sensitivity": 5, "type": direction})
                self.assertEqual(
                    sorted(area["temperature"] for area in areas), temperatures
                )
                self.assertEqual(
                    areas.runtime_provenance["implementation"], "native_service"
                )
                self.assertEqual(
                    areas.runtime_provenance["service_version"],
                    "upstream-00bf118f-thermal-residual-1",
                )
                self.assertNotIn(
                    "threshold", areas.runtime_provenance["effective_options"]
                )

    def test_sensitivity_changes_detection_of_four_degree_target(self):
        raster = np.full((97, 97), 20.0, dtype=np.float32)
        raster[40:52, 40:52] = 24.0
        conservative = self.detect(raster, {"sensitivity": 1, "type": "Hot"})
        sensitive = self.detect(raster, {"sensitivity": 10, "type": "Hot"})
        self.assertEqual(len(conservative), 0)
        self.assertEqual(len(sensitive), 1)
        self.assertEqual(sensitive[0]["temperature"], 24.0)

    def test_invalid_pixels_and_observation_limit(self):
        empty = self.detect(
            np.full((32, 32), np.nan), {"sensitivity": 5, "type": "Both"}
        )
        self.assertEqual(len(empty), 0)
        self.assertEqual(
            empty.runtime_provenance["service_version"],
            "upstream-00bf118f-thermal-residual-1",
        )
        raster = np.full((97, 97), 20.0, dtype=np.float32)
        raster[18:30, 18:30] = 40.0
        raster[66:78, 66:78] = 0.0
        limited = self.detect(raster, {"sensitivity": 5, "type": "Both"}, limit=1)
        self.assertEqual(len(limited), 1)
        self.assertLessEqual(len(limited[0]["contour"]), 64)

    def test_legacy_requests_keep_their_original_implementation(self):
        raster = np.full((32, 32), 20.0, dtype=np.float32)
        raster[12:20, 12:20] = 40.0
        legacy = self.detect(raster, {"segments": 16, "threshold": 2.0})
        self.assertEqual(
            legacy.runtime_provenance["implementation"], "adapter_residual"
        )
        self.assertEqual(
            legacy.runtime_provenance["service_version"], "adapter-thermal-residual-1"
        )


if __name__ == "__main__":
    unittest.main()
