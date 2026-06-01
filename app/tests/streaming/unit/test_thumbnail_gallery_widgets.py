"""Unit tests for thumbnail/gallery resource behavior."""

from types import SimpleNamespace

import numpy as np
from PySide6.QtCore import Qt

from core.controllers.streaming.shared_widgets import DetectionThumbnailWidget, Track
from core.views.streaming.components.TrackGalleryWidget import TrackGalleryWidget


def _make_track(track_id: int) -> Track:
    thumbnail = np.full((24, 24, 3), 127, dtype=np.uint8)
    return Track(
        track_id=track_id,
        bbox=(1, 1, 10, 10),
        centroid=(6, 6),
        thumbnail=thumbnail,
        first_frame_index=track_id,
        first_timestamp=float(track_id),
        frame_resolution=(24, 24),
    )


def test_gallery_is_bounded(qapp):
    """Gallery should drop oldest items past the configured cap."""
    widget = TrackGalleryWidget()
    widget.max_items = 2
    try:
        widget.add_track(_make_track(1))
        widget.add_track(_make_track(2))
        widget.add_track(_make_track(3))

        assert widget.gallery_list.count() == 2
        # Newest item is inserted first.
        first_item_track = widget.gallery_list.item(0).data(Qt.UserRole)
        assert first_item_track.track_id == 3
    finally:
        widget.close()


def test_thumbnail_updates_tracks_only_for_visible_slots(qapp):
    """Track updates should run only for detections currently assigned to thumbnail slots."""
    widget = DetectionThumbnailWidget()
    widget.resize(600, 150)
    widget._adjust_thumbnail_count()

    frame = np.zeros((120, 160, 3), dtype=np.uint8)
    det_visible = SimpleNamespace(
        centroid=(30, 30),
        bbox=(20, 20, 20, 20),
        metadata={"track_id": 10},
    )
    det_hidden = SimpleNamespace(
        centroid=(90, 90),
        bbox=(80, 80, 20, 20),
        metadata={"track_id": 20},
    )

    widget.tracker.update = lambda _detections: {0: det_visible}
    calls = []
    widget.tracker.update_track = lambda track_id, detection, _frame, _frame_index, _timestamp: calls.append(track_id)

    try:
        widget.update_thumbnails(frame, [det_visible, det_hidden], frame_index=5, timestamp=2.0)
        assert calls == [10]
    finally:
        widget.close()


def test_live_thumbnail_crop_is_square_for_wide_detection(qapp):
    """Live thumbnail strip should use a square crop for consistent slot fill."""
    widget = DetectionThumbnailWidget()
    try:
        x1, y1, x2, y2 = widget._compute_live_thumbnail_crop(
            frame_shape=(480, 640, 3),
            centroid=(200, 150),
            bbox=(150, 130, 160, 40),
            zoom=3.0,
        )

        assert (x2 - x1) == (y2 - y1)
        assert (x2 - x1) >= 60
    finally:
        widget.close()


def test_live_thumbnail_crop_stays_in_bounds_near_edges(qapp):
    """Square live thumbnail crops should clamp to the frame without going negative."""
    widget = DetectionThumbnailWidget()
    try:
        x1, y1, x2, y2 = widget._compute_live_thumbnail_crop(
            frame_shape=(120, 160, 3),
            centroid=(8, 10),
            bbox=(0, 0, 80, 20),
            zoom=3.0,
        )

        assert x1 >= 0
        assert y1 >= 0
        assert x2 <= 160
        assert y2 <= 120
        assert (x2 - x1) == (y2 - y1)
    finally:
        widget.close()
