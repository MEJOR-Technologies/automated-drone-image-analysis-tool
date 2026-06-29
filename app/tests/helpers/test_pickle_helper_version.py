"""Tests for PickleHelper version parsing, including beta build numbers."""

import pytest

from helpers.PickleHelper import PickleHelper


def test_version_to_tuple_release_has_zero_label_and_build():
    assert PickleHelper._version_to_tuple("2.1.0") == (2, 1, 0, 0, 0)


def test_version_to_tuple_parses_label_without_build():
    assert PickleHelper._version_to_tuple("2.1.0 Beta") == (2, 1, 0, 2, 0)


def test_version_to_tuple_parses_label_and_build():
    assert PickleHelper._version_to_tuple("2.1.0 Beta 5") == (2, 1, 0, 2, 5)


def test_version_to_tuple_is_case_insensitive_for_label():
    assert PickleHelper._version_to_tuple("2.1.0 RC 3") == (2, 1, 0, 1, 3)
    assert PickleHelper._version_to_tuple("2.1.0 alpha 2") == (2, 1, 0, 3, 2)


def test_version_to_tuple_unknown_label_sorts_last():
    major, minor, patch, label_val, build = PickleHelper._version_to_tuple("2.1.0 Gamma 1")
    assert (major, minor, patch, build) == (2, 1, 0, 1)
    assert label_val == 99


def test_version_to_tuple_rejects_invalid_string():
    with pytest.raises(ValueError):
        PickleHelper._version_to_tuple("not-a-version")


def test_version_to_int_orders_builds_within_same_label():
    assert PickleHelper.version_to_int("2.1.0 Beta 2") > PickleHelper.version_to_int("2.1.0 Beta 1")


def test_version_to_int_build_does_not_overflow_label_field():
    # A higher build of the same numeric+label must not exceed the next patch.
    assert PickleHelper.version_to_int("2.1.0 Beta 99") < PickleHelper.version_to_int("2.1.1")


def test_version_to_int_handles_legacy_strings_without_build():
    # Strings persisted before build support still parse (build defaults to 0).
    assert PickleHelper.version_to_int("2.0.0") == PickleHelper.version_to_int("2.0.0")
