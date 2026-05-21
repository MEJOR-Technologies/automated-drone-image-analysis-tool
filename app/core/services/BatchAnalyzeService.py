"""
BatchAnalyzeService.py -- orchestrates folder-by-folder ("batch") image analysis.

An ADIAT analysis is normally a single run over one input directory. For large
search areas (thousands of images) it is more practical to split the imagery
into folders and analyze each folder on its own. This service walks a parent
directory, treats every folder that directly contains images as a separate
batch, and runs a standard AnalyzeService pass on each one. A failure in any
single folder is isolated so the remaining folders still complete.
"""

import os
import time
import traceback
from datetime import datetime

from PySide6.QtCore import QObject, Signal, Slot, Qt

from core.services.AnalyzeService import AnalyzeService
from core.services.LoggerService import LoggerService
from core.services.coordinator.SearchProjectService import SearchProjectService


# File extensions used to decide whether a folder counts as a batch. The actual
# per-image validation is still performed by AnalyzeService.
IMAGE_EXTENSIONS = ('.jpg', '.jpeg', '.png', '.tif', '.tiff', '.bmp', '.gif')


class BatchAnalyzeService(QObject):
    """Service that runs image analysis one folder at a time.

    Each folder under the parent input directory that directly contains image
    files is analyzed as an independent batch with its own ADIAT_Results
    output. Batches run sequentially; an exception in one batch is caught and
    recorded so the remaining batches still run.

    Attributes:
        sig_msg: Signal emitted with status/log messages (str).
        sig_batch_progress: Signal emitted when a batch starts, carrying
            (current_index, total_batches, folder_name).
        sig_done: Signal emitted when every batch has finished, carrying
            (succeeded_count, failed_count, search_project_path).
    """

    # Signals to send info back to the GUI / CLI
    sig_msg = Signal(str)
    sig_batch_progress = Signal(int, int, str)
    sig_done = Signal(int, int, str)

    def __init__(self, input_dir, output_dir, analysis_config,
                 create_search_project=True, project_name=None, coordinator_name=''):
        """Initialize the BatchAnalyzeService.

        Args:
            input_dir: Parent directory whose subfolders are analyzed as batches.
            output_dir: Output root. Each batch writes results to a subfolder
                here that mirrors its location under input_dir.
            analysis_config: Dictionary of analysis settings shared by every
                batch. Required keys: 'algorithm', 'identifier_color',
                'min_area', 'max_area', 'num_processes', 'max_aois',
                'aoi_radius', 'hist_ref_path', 'kmeans_clusters', 'options'.
                Optional key: 'processing_resolution' (defaults to 1.0).
            create_search_project: When True, a Search Coordinator project
                linking every successful batch is written to the output root.
            project_name: Name for the search project. Defaults to the input
                directory name.
            coordinator_name: Optional name stored as the project creator.
        """
        super().__init__()
        self.logger = LoggerService()
        self.input_dir = input_dir
        self.output_dir = output_dir
        self.config = analysis_config
        self.create_search_project = create_search_project
        self.project_name = project_name or os.path.basename(os.path.normpath(input_dir))
        self.coordinator_name = coordinator_name

        self.cancelled = False
        self.results = []            # one result dict per batch (see _process_single_batch)
        self.search_project_path = ''
        # The AnalyzeService for the batch currently running, so it can be
        # cancelled. None whenever no batch is in progress.
        self._current_service = None

    def discover_batch_folders(self):
        """Find every folder under the input directory that is its own batch.

        A batch folder is any directory that directly contains at least one
        image file. ADIAT-generated output folders are skipped so results are
        never picked up and re-analyzed.

        Returns:
            list: Absolute folder paths, sorted, each analyzed as one batch.
        """
        output_root = os.path.abspath(self.output_dir)
        batch_folders = []
        for subdir, dirs, files in os.walk(self.input_dir):
            abs_subdir = os.path.abspath(subdir)
            # Never descend into the output tree -- generated results would
            # otherwise be discovered as input on a re-run.
            if abs_subdir == output_root or abs_subdir.startswith(output_root + os.sep):
                dirs[:] = []
                continue
            # Skip ADIAT-generated folders from any previous run.
            dirs[:] = [d for d in dirs if d not in ('ADIAT_Results', '.thumbnails')]
            has_image = any(
                os.path.splitext(f)[1].lower() in IMAGE_EXTENSIONS for f in files
            )
            if has_image:
                batch_folders.append(abs_subdir)
        return sorted(batch_folders)

    def _batch_output_dir(self, batch_folder):
        """Compute the output directory for a single batch folder.

        The batch's location relative to the input directory is mirrored under
        the output root so nested folders keep unique, predictable paths.

        Args:
            batch_folder: Absolute path to the batch's input folder.

        Returns:
            str: Output directory for this batch (AnalyzeService appends an
                'ADIAT_Results' folder inside it).
        """
        rel = os.path.relpath(batch_folder, self.input_dir)
        if rel == '.':
            # Loose images directly in the input root -- name the batch after
            # the input folder itself.
            rel = os.path.basename(os.path.normpath(self.input_dir)) or 'Batch'
        return os.path.join(self.output_dir, rel)

    @Slot()
    def process_batches(self):
        """Analyze every batch folder sequentially.

        Discovers batch folders, runs an AnalyzeService pass on each, isolates
        per-folder failures, optionally builds a Search Coordinator project,
        writes a summary report, and emits sig_done.
        """
        try:
            start_time = time.time()

            if not os.path.isdir(self.input_dir):
                self.sig_msg.emit(f"Batch input folder does not exist: {self.input_dir}")
                self.sig_done.emit(0, 0, '')
                return

            batch_folders = self.discover_batch_folders()
            if not batch_folders:
                self.sig_msg.emit("No folders containing images were found to process.")
                self.sig_done.emit(0, 0, '')
                return

            total = len(batch_folders)
            self.sig_msg.emit(f"Batch processing started: {total} folder(s) to analyze")

            for index, batch_folder in enumerate(batch_folders, start=1):
                if self.cancelled:
                    self.sig_msg.emit("--- Batch processing cancelled ---")
                    break

                folder_name = os.path.relpath(batch_folder, self.input_dir)
                self.sig_batch_progress.emit(index, total, folder_name)
                self.sig_msg.emit(f"--- Batch {index}/{total}: {folder_name} ---")

                result = self._process_single_batch(batch_folder)
                self.results.append(result)

                if result['status'] == 'Completed':
                    self.sig_msg.emit(
                        f"Batch {index}/{total} complete: "
                        f"{result['images_with_aois']} image(s) with areas of interest"
                    )
                else:
                    self.sig_msg.emit(f"Batch {index}/{total} FAILED: {result['error']}")

            succeeded = sum(1 for r in self.results if r['status'] == 'Completed')
            failed = sum(1 for r in self.results if r['status'] == 'Failed')

            # Link every successful batch into one Search Coordinator project.
            if self.create_search_project and not self.cancelled:
                self._create_search_project()

            self._write_summary(round(time.time() - start_time, 2))

            self.sig_msg.emit(
                f"--- Batch processing finished: {succeeded} succeeded, {failed} failed ---"
            )
            self.sig_done.emit(succeeded, failed, self.search_project_path)

        except Exception as e:
            # The orchestrator itself must never crash the whole run.
            self.logger.error(traceback.format_exc())
            self.sig_msg.emit(f"Batch processing error: {e}")
            succeeded = sum(1 for r in self.results if r['status'] == 'Completed')
            failed = sum(1 for r in self.results if r['status'] == 'Failed')
            self.sig_done.emit(succeeded, failed, self.search_project_path)

    def _process_single_batch(self, batch_folder):
        """Run one AnalyzeService pass for a single batch folder.

        Any exception is caught and recorded so the overall run continues with
        the remaining folders.

        Args:
            batch_folder: Absolute path to the batch's input folder.

        Returns:
            dict: Batch result with keys 'folder', 'status', 'images_with_aois',
                'xml_path', and 'error'. 'status' is 'Completed' or 'Failed'.
        """
        result = {
            'folder': batch_folder,
            'status': 'Failed',
            'images_with_aois': 0,
            'xml_path': '',
            'error': ''
        }
        service = None
        try:
            batch_output = self._batch_output_dir(batch_folder)
            # Populated by the AnalyzeService.sig_done handler below; its
            # presence is how we know the pass actually completed.
            completion = {}

            service = AnalyzeService(
                1,
                self.config['algorithm'],
                batch_folder,
                batch_output,
                self.config['identifier_color'],
                self.config['min_area'],
                self.config['num_processes'],
                self.config['max_aois'],
                self.config['aoi_radius'],
                self.config['hist_ref_path'],
                self.config['kmeans_clusters'],
                self.config['options'],
                self.config['max_area'],
                self.config.get('processing_resolution', 1.0),
                recursive=False
            )
            self._current_service = service

            # Forward per-image log lines straight through. A direct connection
            # re-emits immediately on the pool's callback thread so messages are
            # not held up behind the blocking process_files() call.
            service.sig_msg.connect(self.sig_msg, Qt.DirectConnection)
            service.sig_done.connect(
                lambda _id, count, path: completion.update(done=True, count=count, path=path),
                Qt.DirectConnection
            )

            # Runs synchronously: AnalyzeService manages its own process pool.
            service.process_files()

            if completion.get('done'):
                result['status'] = 'Completed'
                result['images_with_aois'] = completion.get('count', 0)
                result['xml_path'] = completion.get('path', '')
            else:
                # process_files() returned without emitting sig_done, meaning it
                # hit its own internal error handler.
                result['error'] = 'Analysis did not complete (see log for details).'

        except Exception as e:
            self.logger.error(traceback.format_exc())
            result['error'] = str(e)
        finally:
            self._current_service = None
            if service is not None:
                # close()/join() inside process_files() already ended the
                # workers; terminate() is a no-op there but cleans up if the
                # pass was cancelled or raised partway through.
                try:
                    service.pool.terminate()
                except Exception:
                    pass

        return result

    def _create_search_project(self):
        """Write a Search Coordinator project linking every successful batch.

        The project file is saved in the output root and its path is stored on
        self.search_project_path.
        """
        xml_paths = [
            r['xml_path'] for r in self.results
            if r['status'] == 'Completed' and r['xml_path'] and os.path.exists(r['xml_path'])
        ]
        if not xml_paths:
            return
        try:
            project = SearchProjectService()
            if not project.create_new_project(self.project_name, xml_paths, self.coordinator_name):
                self.sig_msg.emit("Could not build the Search Coordinator project.")
                return
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            safe_name = self._safe_filename(self.project_name)
            project_path = os.path.join(
                self.output_dir, f"ADIAT_Search_{safe_name}_{timestamp}.xml"
            )
            if project.save_project(project_path):
                self.search_project_path = project_path
                self.sig_msg.emit(f"Search Coordinator project saved: {project_path}")
            else:
                self.sig_msg.emit("Could not save the Search Coordinator project.")
        except Exception as e:
            self.logger.error(traceback.format_exc())
            self.sig_msg.emit(f"Error creating Search Coordinator project: {e}")

    def _write_summary(self, elapsed_seconds):
        """Write a human-readable batch_summary.txt to the output root.

        Args:
            elapsed_seconds: Total wall-clock time for the batch run.
        """
        try:
            os.makedirs(self.output_dir, exist_ok=True)
            summary_path = os.path.join(self.output_dir, 'batch_summary.txt')
            succeeded = sum(1 for r in self.results if r['status'] == 'Completed')
            failed = sum(1 for r in self.results if r['status'] == 'Failed')
            algorithm = self.config.get('algorithm') or {}

            lines = [
                'ADIAT Batch Processing Summary',
                '=' * 40,
                f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
                f"Input folder: {self.input_dir}",
                f"Output folder: {self.output_dir}",
                f"Algorithm: {algorithm.get('name', 'Unknown')}",
                f"Batches: {len(self.results)} ({succeeded} succeeded, {failed} failed)",
                f"Total time: {elapsed_seconds} seconds",
            ]
            if self.search_project_path:
                lines.append(f"Search project: {self.search_project_path}")
            lines.append('')
            lines.append('Per-folder results:')
            lines.append('-' * 40)
            for r in self.results:
                folder = os.path.relpath(r['folder'], self.input_dir)
                line = f"[{r['status']}] {folder}"
                if r['status'] == 'Completed':
                    line += f" -- {r['images_with_aois']} image(s) with AOIs"
                elif r['error']:
                    line += f" -- {r['error']}"
                lines.append(line)

            with open(summary_path, 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines) + '\n')
            self.sig_msg.emit(f"Batch summary written: {summary_path}")
        except Exception as e:
            self.logger.error(f"Error writing batch summary: {e}")

    @staticmethod
    def _safe_filename(name):
        """Return a filesystem-safe version of a name for use in a file name.

        Args:
            name: The raw name to sanitize.

        Returns:
            str: A name containing only letters, digits, hyphens and
                underscores, never empty.
        """
        keep = []
        for ch in name:
            if ch.isalnum() or ch in ('-', '_'):
                keep.append(ch)
            elif ch == ' ':
                keep.append('_')
        return ''.join(keep) or 'Batch'

    @Slot()
    def process_cancel(self):
        """Request cancellation of the batch run.

        The folder currently being analyzed is terminated and no further
        folders are started.
        """
        self.cancelled = True
        self.sig_msg.emit("--- Cancelling batch processing ---")
        service = self._current_service
        if service is not None:
            service.process_cancel()
