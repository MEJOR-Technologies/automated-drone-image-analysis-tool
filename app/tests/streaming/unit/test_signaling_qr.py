"""Unit tests for :class:`QRSignalingChannel` (plan §8 paste fallback)."""

from __future__ import annotations

import asyncio
import os
import sys

import pytest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from core.services.streaming.signaling import (  # noqa: E402
    CodeNotFound,
    QRSignalingChannel,
)
from core.services.streaming.signaling.QRSignalingChannel import (  # noqa: E402
    decode_blob,
    encode_blob,
)


def run(coro):
    return asyncio.run(coro)


def test_encode_decode_blob_round_trip() -> None:
    """Plan §19.4.7 blob shape: v + role + sdp + ice + fingerprint + code."""
    sdp = "v=0\r\na=fingerprint:sha-256 AB:CD:EF\r\n..."
    candidates = [{"candidate": "candidate:1 1 udp 2122194687 192.168.1.5 51234 typ host"}]
    blob = encode_blob(
        sdp,
        candidates=candidates,
        code="ABC234",
        fingerprint="sha-256 AB:CD:EF",
    )
    decoded = decode_blob(blob)
    assert decoded["v"] == 1
    assert decoded["role"] == "offer"
    assert decoded["sdp"] == sdp
    assert decoded["ice"] == candidates
    assert decoded["fingerprint"] == "sha-256 AB:CD:EF"
    assert decoded["code"] == "ABC234"


def test_decode_blob_translates_legacy_candidates_key() -> None:
    """Old blobs that used ``candidates`` instead of ``ice`` still decode."""
    import base64
    import json as _json

    legacy_payload = {
        "sdp": "v=0\r\noffer",
        "candidates": [{"candidate": "x"}],
        "code": "ABC234",
    }
    legacy_blob = base64.urlsafe_b64encode(
        _json.dumps(legacy_payload).encode("utf-8")
    ).decode("ascii")
    decoded = decode_blob(legacy_blob)
    assert decoded["ice"] == [{"candidate": "x"}]
    assert decoded.get("v") == 1
    assert decoded.get("role") == "offer"


def test_post_answer_uses_role_answer() -> None:
    """Plan §19.4.7: answer blobs MUST mark ``role`` so mobile knows direction."""
    channel = QRSignalingChannel(paste_blob=encode_blob("v=0\r\noffer", code="ABC234"))
    run(channel.get_offer("ABC234"))
    run(channel.post_answer("ABC234", "v=0\r\nanswer-payload"))
    decoded = decode_blob(channel.answer_blob)
    assert decoded["role"] == "answer"
    assert "answer-payload" in decoded["sdp"]


def test_decode_blob_tolerates_whitespace() -> None:
    """Blob copy-pasted with linebreaks/spaces must still parse cleanly."""
    blob = encode_blob("v=0\r\nm=video 9 UDP/TLS/RTP/SAVPF 102")
    chunked = "\n".join(blob[i:i + 30] for i in range(0, len(blob), 30))
    decoded = decode_blob("  " + chunked + "  ")
    assert decoded["sdp"].startswith("v=0")


def test_decode_blob_rejects_garbage() -> None:
    for bad in ("", "this-is-not-base64-or-json", "%%%"):
        with pytest.raises(ValueError):
            decode_blob(bad)


def test_get_offer_returns_sdp_from_paste() -> None:
    blob = encode_blob("v=0\r\noffer-payload", code="ABC234")
    channel = QRSignalingChannel(paste_blob=blob)
    sdp = run(channel.get_offer("ABC234"))
    assert "offer-payload" in sdp
    assert channel.code_hint == "ABC234"


def test_get_offer_raises_when_no_blob() -> None:
    channel = QRSignalingChannel()
    with pytest.raises(CodeNotFound):
        run(channel.get_offer("ABC234"))


def test_post_answer_produces_answer_blob() -> None:
    channel = QRSignalingChannel(paste_blob=encode_blob("v=0\r\noffer", code="ABC234"))
    run(channel.get_offer("ABC234"))  # populate code_hint
    run(channel.post_answer("ABC234", "v=0\r\nanswer-payload"))
    assert channel.answer_blob is not None
    decoded = decode_blob(channel.answer_blob)
    assert "answer-payload" in decoded["sdp"]
    assert decoded["code"] == "ABC234"


def test_post_ice_and_subscribe_are_noops() -> None:
    channel = QRSignalingChannel(paste_blob=encode_blob("v=0"))
    # post_ice swallows silently
    run(channel.post_ice("ABC234", "desktop", {"candidate": "x"}))

    async def consume():
        async for _msg in channel.subscribe("ABC234", "desktop"):
            raise AssertionError("subscribe should yield nothing in paste mode")

    run(consume())


def test_delete_session_clears_state() -> None:
    channel = QRSignalingChannel(paste_blob=encode_blob("v=0"))
    run(channel.delete_session("ABC234"))
    assert channel.offer_blob is None
    assert channel.answer_blob is None
