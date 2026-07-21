from pathlib import Path
from unittest.mock import MagicMock, patch

from core.services.LoggerService import LoggerService


ROOT = Path(__file__).resolve().parents[3]


def test_linux_logger_uses_defined_per_user_path():
    logger = MagicMock()
    logger.handlers = []
    with (
        patch("platform.system", return_value="Linux"),
        patch("core.services.LoggerService.sys.platform", "linux"),
        patch("os.makedirs") as makedirs,
        patch("logging.getLogger", return_value=logger),
        patch("logging.FileHandler") as file_handler,
        patch("logging.StreamHandler"),
    ):
        LoggerService()

    expected_dir = str(Path.home() / ".adiat") + "/"
    makedirs.assert_called_once_with(expected_dir, exist_ok=True)
    file_handler.assert_called_once_with(expected_dir + "adiat_logs.txt")


def test_worker_image_is_non_root_single_slot_and_non_daemonic():
    dockerfile = (ROOT / "Dockerfile.chris").read_text()

    assert "DASK_DISTRIBUTED__WORKER__DAEMON=false" in dockerfile
    assert "USER adiat:adiat" in dockerfile
    assert "PySide6" not in (ROOT / "requirements-chris.in").read_text()
    assert "qimage2ndarray" not in (ROOT / "requirements-chris.in").read_text()
    assert 'CMD ["dask-worker"' in dockerfile
    assert '"--nworkers", "1", "--nthreads", "1"' in dockerfile
    assert '"--resources", "adiat_analysis=1"' in dockerfile
    assert '"--worker-port", "8790", "--no-nanny"' in dockerfile
    assert '"--name"' not in dockerfile
    locked_requirements = (ROOT / "requirements-chris.txt").read_text()
    assert "dask==2025.11.0" in locked_requirements
    assert "distributed==2025.11.0" in locked_requirements
    assert "--hash=sha256:" in locked_requirements
    assert "@sha256:" in dockerfile.splitlines()[0]
    assert "COPY LICENSE /licenses/GPL-3.0.txt" in dockerfile


def test_workflow_gates_build_on_tests_and_emits_supply_chain_metadata():
    workflow = (ROOT / ".github/workflows/chris-adiat-worker-image.yml").read_text()

    assert "needs: adapter-tests" in workflow
    assert "app/tests/chris_adiat_adapter" in workflow
    assert "type=sha,prefix=sha-,format=long" in workflow
    assert "type=sha,prefix={{branch}}-,format=long" in workflow
    assert "provenance: mode=max" in workflow
    assert "sbom: true" in workflow
    assert "branches:\n      - main" in workflow
    assert "actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0" in workflow
    assert "requirements-chris-test.txt" in workflow
    assert (
        "attest-build-provenance@977bb373ede98d70efdf65b84cb5f73e068dcc2a" in workflow
    )


def test_package_metadata_matches_root_gpl_license():
    assert "license='GPL-3.0-only'" in (ROOT / "setup.py").read_text()
