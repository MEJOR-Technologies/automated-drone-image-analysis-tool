"""Solar position lookup and EXIF-time-to-UTC resolution.

Thin wrapper over `pysolar` plus a UTC resolver that walks the standard
EXIF/GPS timestamp fields. Kept separate from the rest of the shadow
pipeline so the underlying solar library can be swapped (e.g. for an
in-tree NREL SPA implementation) by editing only this file.

pysolar 0.13 conventions:
    altitude: degrees, 0 = horizon, 90 = zenith
    azimuth:  degrees, 0 = north, clockwise (0..360)
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
from typing import Optional, Tuple

import piexif
from pysolar.solar import get_altitude, get_azimuth


class SolarTimeUnresolvable(ValueError):
    """Raised when the EXIF/GPS timestamp cannot be resolved to UTC."""


@dataclass
class SolarPositionResult:
    """Sun position at a given location/time."""
    elevation_deg: float
    azimuth_deg: float
    utc_used: datetime
    time_source: str  # 'gps' | 'exif_with_offset'


def get_solar_position(lat: float, lon: float, utc_dt: datetime) -> Tuple[float, float]:
    """Return (elevation_deg, azimuth_deg) for the sun at lat/lon/utc_dt.

    utc_dt must be a timezone-aware datetime; pysolar relies on tz info to
    compute the true UTC offset.
    """
    if utc_dt.tzinfo is None:
        raise ValueError("utc_dt must be timezone-aware")
    elev = float(get_altitude(lat, lon, utc_dt))
    az = float(get_azimuth(lat, lon, utc_dt)) % 360.0
    return elev, az


def resolve_capture_utc(exif_data: dict) -> Tuple[datetime, str]:
    """Resolve image capture time to a tz-aware UTC datetime.

    Resolution order (matches design §8.1):
        1. EXIF GPSDateStamp + GPSTimeStamp — already UTC, preferred.
        2. EXIF DateTimeOriginal + OffsetTimeOriginal — local with explicit offset.

    Without timezonefinder we deliberately do NOT fall back to "assume local";
    a bare DateTimeOriginal yields an unknown offset that can shift sun
    azimuth by ~15°/hour, which silently corrupts the height estimate.
    Reject loudly instead.

    Args:
        exif_data: piexif-format dict ({'0th': ..., 'Exif': ..., 'GPS': ...}).

    Returns:
        (utc_datetime, source_tag) where source_tag is 'gps' or
        'exif_with_offset'.

    Raises:
        SolarTimeUnresolvable: no resolvable timestamp present.
    """
    gps = exif_data.get('GPS') or {}
    gps_date = gps.get(piexif.GPSIFD.GPSDateStamp)
    gps_time = gps.get(piexif.GPSIFD.GPSTimeStamp)
    if gps_date and gps_time:
        try:
            return _from_gps(gps_date, gps_time), 'gps'
        except (ValueError, TypeError, ZeroDivisionError):
            pass

    exif = exif_data.get('Exif') or {}
    dt_orig = exif.get(piexif.ExifIFD.DateTimeOriginal)
    offset = exif.get(piexif.ExifIFD.OffsetTimeOriginal)
    if dt_orig and offset:
        try:
            return _from_local_with_offset(dt_orig, offset), 'exif_with_offset'
        except ValueError:
            pass

    raise SolarTimeUnresolvable(
        "Cannot resolve image capture time to UTC. Need either "
        "GPSDateStamp+GPSTimeStamp (preferred) or "
        "DateTimeOriginal+OffsetTimeOriginal."
    )


def _from_gps(gps_date, gps_time) -> datetime:
    """Build a UTC datetime from EXIF GPSDateStamp + GPSTimeStamp."""
    date_str = _to_str(gps_date)
    year, month, day = [int(part) for part in date_str.split(':')]
    hours = _rational_to_float(gps_time[0])
    minutes = _rational_to_float(gps_time[1])
    seconds = _rational_to_float(gps_time[2])
    h_int = int(hours)
    m_int = int(minutes)
    total_seconds = seconds + (hours - h_int) * 3600 + (minutes - m_int) * 60
    s_int = int(total_seconds)
    micro = int(round((total_seconds - s_int) * 1_000_000))
    if micro >= 1_000_000:
        s_int += 1
        micro -= 1_000_000
    return datetime(year, month, day, h_int, m_int, s_int, micro, tzinfo=timezone.utc)


def _from_local_with_offset(dt_orig, offset) -> datetime:
    """Build a UTC datetime from EXIF DateTimeOriginal + OffsetTimeOriginal."""
    dt_str = _to_str(dt_orig)
    off_str = _to_str(offset).strip()
    # EXIF format: 'YYYY:MM:DD HH:MM:SS'
    date_part, time_part = dt_str.split(' ')
    year, month, day = [int(p) for p in date_part.split(':')]
    hour, minute, second = [int(p) for p in time_part.split(':')]
    # Offset like '+05:30', '-07:00', 'Z'
    if off_str.upper() == 'Z':
        offset_minutes = 0
    else:
        sign = 1 if off_str[0] == '+' else -1
        oh, om = off_str[1:].split(':')
        offset_minutes = sign * (int(oh) * 60 + int(om))
    tz = timezone(timedelta(minutes=offset_minutes))
    local_dt = datetime(year, month, day, hour, minute, second, 0, tzinfo=tz)
    return local_dt.astimezone(timezone.utc)


def _to_str(value) -> str:
    """piexif returns most string fields as bytes; normalise."""
    if isinstance(value, bytes):
        return value.decode('ascii', errors='ignore').rstrip('\x00')
    return str(value)


def _rational_to_float(rational) -> float:
    """piexif rationals are (numerator, denominator) tuples."""
    if isinstance(rational, (tuple, list)) and len(rational) == 2:
        num, den = rational
        if den == 0:
            raise ZeroDivisionError("zero denominator in EXIF rational")
        return num / den
    return float(rational)
