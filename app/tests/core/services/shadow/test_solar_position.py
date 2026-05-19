"""Tests for SolarPosition wrapper + EXIF UTC resolution."""

from datetime import datetime, timezone

import piexif
import pytest

from core.services.shadow.SolarPosition import (
    get_solar_position,
    resolve_capture_utc,
    SolarTimeUnresolvable,
)


def _make_gps_exif(date_bytes, time_rationals):
    return {
        '0th': {},
        'Exif': {},
        'GPS': {
            piexif.GPSIFD.GPSDateStamp: date_bytes,
            piexif.GPSIFD.GPSTimeStamp: time_rationals,
        },
    }


def _make_offset_exif(dt_bytes, offset_bytes):
    return {
        '0th': {},
        'GPS': {},
        'Exif': {
            piexif.ExifIFD.DateTimeOriginal: dt_bytes,
            piexif.ExifIFD.OffsetTimeOriginal: offset_bytes,
        },
    }


def test_resolve_utc_from_gps_stamps():
    exif = _make_gps_exif(b'2025:06:15', ((19, 1), (30, 1), (0, 1)))
    utc, source = resolve_capture_utc(exif)
    assert source == 'gps'
    assert utc == datetime(2025, 6, 15, 19, 30, 0, tzinfo=timezone.utc)


def test_resolve_utc_from_gps_with_fractional_seconds():
    # 19h, 30m, 15.5s
    exif = _make_gps_exif(b'2025:06:15', ((19, 1), (30, 1), (155, 10)))
    utc, _ = resolve_capture_utc(exif)
    assert utc.second == 15
    assert utc.microsecond == 500_000


def test_resolve_utc_from_datetime_with_offset_west():
    exif = _make_offset_exif(b'2025:06:15 12:30:00', b'-07:00')
    utc, source = resolve_capture_utc(exif)
    assert source == 'exif_with_offset'
    assert utc == datetime(2025, 6, 15, 19, 30, 0, tzinfo=timezone.utc)


def test_resolve_utc_from_datetime_with_offset_east():
    exif = _make_offset_exif(b'2025:06:15 12:30:00', b'+05:30')
    utc, _ = resolve_capture_utc(exif)
    assert utc == datetime(2025, 6, 15, 7, 0, 0, tzinfo=timezone.utc)


def test_resolve_utc_prefers_gps_over_offset():
    exif = {
        '0th': {},
        'GPS': {
            piexif.GPSIFD.GPSDateStamp: b'2025:06:15',
            piexif.GPSIFD.GPSTimeStamp: ((19, 1), (0, 1), (0, 1)),
        },
        'Exif': {
            piexif.ExifIFD.DateTimeOriginal: b'2025:06:15 12:30:00',
            piexif.ExifIFD.OffsetTimeOriginal: b'-07:00',
        },
    }
    _, source = resolve_capture_utc(exif)
    assert source == 'gps'


def test_resolve_utc_rejects_when_only_naive_datetime():
    exif = {
        '0th': {},
        'GPS': {},
        'Exif': {
            piexif.ExifIFD.DateTimeOriginal: b'2025:06:15 12:30:00',
        },
    }
    with pytest.raises(SolarTimeUnresolvable):
        resolve_capture_utc(exif)


def test_resolve_utc_rejects_when_nothing_present():
    with pytest.raises(SolarTimeUnresolvable):
        resolve_capture_utc({'0th': {}, 'GPS': {}, 'Exif': {}})


def test_get_solar_position_requires_aware_datetime():
    with pytest.raises(ValueError):
        get_solar_position(38.685, -121.082, datetime(2025, 6, 15, 19, 30))


def test_get_solar_position_returns_sane_values():
    # El Dorado Hills, CA, summer afternoon — sun should be high and SE-ish.
    dt = datetime(2025, 6, 15, 19, 30, 0, tzinfo=timezone.utc)
    elev, az = get_solar_position(38.685, -121.082, dt)
    assert 60.0 < elev < 80.0
    assert 120.0 < az < 200.0


def test_get_solar_position_below_horizon_at_night():
    # Same spot, ~06:00 UTC = ~11pm PDT prior day — sun should be below horizon.
    dt = datetime(2025, 6, 15, 6, 0, 0, tzinfo=timezone.utc)
    elev, _ = get_solar_position(38.685, -121.082, dt)
    assert elev < 0.0
