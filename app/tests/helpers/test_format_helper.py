"""Tests for FormatHelper."""

from helpers.FormatHelper import FormatHelper


def test_format_duration_seconds():
    """Durations under a minute show only seconds."""
    assert FormatHelper.format_duration(0) == '0s'
    assert FormatHelper.format_duration(45) == '45s'
    assert FormatHelper.format_duration(59.4) == '59s'


def test_format_duration_minutes():
    """Durations under an hour show minutes and seconds."""
    assert FormatHelper.format_duration(60) == '1m 0s'
    assert FormatHelper.format_duration(312) == '5m 12s'


def test_format_duration_hours():
    """Durations of an hour or more show hours, minutes and seconds."""
    assert FormatHelper.format_duration(3600) == '1h 0m 0s'
    assert FormatHelper.format_duration(5025) == '1h 23m 45s'


def test_format_duration_negative_is_zero():
    """Negative durations are clamped to zero."""
    assert FormatHelper.format_duration(-10) == '0s'
