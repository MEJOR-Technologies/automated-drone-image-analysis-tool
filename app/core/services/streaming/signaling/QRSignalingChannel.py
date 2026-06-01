"""Paste-blob :class:`SignalingChannel` for fully-offline pairing (plan §8).

Per plan §8 *QR / paste fallback*, this channel exists for the case where
neither side has internet access (cellular dead zone, isolated comms
network) but the operator still wants to pair a feed. Both peers gather
ICE candidates locally, package their SDP + candidates + fingerprint
into a compact base64-encoded JSON blob, and physically transfer the
blob between machines — typed by hand, scanned via QR, or pasted
through whatever side channel is available (SMS, in-app chat, USB
sneakernet).

There is no Worker in this flow. The desktop:

1. Receives the publisher's blob from the operator (typed/pasted into
   :class:`FlightPairingDialog`'s paste tab).
2. Returns the contained SDP via :meth:`get_offer`.
3. Generates its own answer blob via :meth:`post_answer` — the answer is
   exposed via the :attr:`answer_blob` property so the dialog can render
   it for the operator to relay back to mobile.
4. Trickle ICE and WebSocket subscribe are no-ops; all candidates must
   be baked into the blob's SDP before exchange.

The blob format is intentionally simple — base64-encoded JSON with three
optional keys (``sdp``, ``candidates``, ``code``). Future M3+ work may
add a binary container (CBOR + ECC) and proper QR encoding, but the
JSON form is human-debuggable and unambiguously round-trips through
copy/paste.
"""

from __future__ import annotations

import base64
import json
from typing import AsyncIterator, List, Optional

from core.services.LoggerService import LoggerService

from .SignalingChannel import CodeNotFound, SignalingChannel


# Plan §19.4.7 blob schema:
#
#     {"v": 1, "role": "offer" | "answer", "sdp": "v=0...",
#      "ice": [{"candidate":"...","sdpMid":"0","sdpMLineIndex":0}, ...],
#      "fingerprint": "sha-256 AB:CD:..."}
#
# Versioned so future format breaks can be detected; ``role`` lets a
# receiver immediately know whether to treat the blob as an offer to
# answer or an answer to apply.
PASTE_BLOB_VERSION = 1


def encode_blob(
    sdp: str,
    *,
    candidates: Optional[List[dict]] = None,
    code: Optional[str] = None,
    role: str = "offer",
    fingerprint: Optional[str] = None,
) -> str:
    """Serialize an SDP + ICE + fingerprint bundle into a paste-friendly blob.

    The result is URL-safe base64 with no internal padding constraints, so
    it can be transcribed by hand or sent through chat clients that strip
    whitespace. The decoded payload follows the schema in plan §19.4.7.

    Args:
        sdp: The SDP string (offer or answer).
        candidates: Optional pre-gathered ICE candidates in JSEP shape
            (``{candidate, sdpMid, sdpMLineIndex}``).
        code: Optional pairing-code echo so both peers can correlate
            without a side channel.
        role: ``"offer"`` (publisher → viewer) or ``"answer"`` (viewer
            → publisher). Defaults to ``"offer"`` to match the publisher-
            initiates-pairing convention; pass ``"answer"`` when called
            from :meth:`QRSignalingChannel.post_answer`.
        fingerprint: Optional DTLS certificate fingerprint string
            (``"sha-256 AB:CD:..."``). Carried alongside the SDP for
            paste-flow SAS derivation; the desktop's existing
            :func:`_extract_remote_fingerprint` recovers it from the SDP
            body too, but exposing it here keeps the schema explicit.
    """
    payload: dict = {
        "v": PASTE_BLOB_VERSION,
        "role": "answer" if role == "answer" else "offer",
        "sdp": str(sdp),
    }
    if candidates:
        payload["ice"] = [dict(c) for c in candidates]
    if fingerprint:
        payload["fingerprint"] = str(fingerprint)
    if code:
        payload["code"] = str(code)
    raw = json.dumps(payload, separators=(",", ":")).encode("utf-8")
    return base64.urlsafe_b64encode(raw).decode("ascii")


def decode_blob(blob: str) -> dict:
    """Parse a paste blob produced by :func:`encode_blob`.

    Returns the raw decoded payload dict. Callers should consult the
    ``v`` field if present (plan §19.4.7) — currently we only emit and
    accept ``v=1``. Older un-versioned blobs (no ``v``, ``candidates``
    instead of ``ice``) are still accepted for backward compatibility
    with anything captured during early M3 prototyping.

    Raises:
        ValueError: When the blob is empty, not valid base64, or whose
            decoded payload is not a JSON object.
    """
    if not blob or not isinstance(blob, str):
        raise ValueError("paste blob is empty")
    cleaned = "".join(blob.split())  # tolerate whitespace from copy/paste
    try:
        raw = base64.urlsafe_b64decode(cleaned.encode("ascii"))
    except (ValueError, base64.binascii.Error) as exc:
        raise ValueError(f"paste blob is not valid base64: {exc}") from exc
    try:
        payload = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError) as exc:
        raise ValueError(f"paste blob is not valid JSON: {exc}") from exc
    if not isinstance(payload, dict):
        raise ValueError("paste blob payload must be a JSON object")
    # Normalize legacy shape — early prototypes used ``candidates`` and
    # had no ``v``/``role`` fields. Translate so callers always see the
    # current spec keys without branching.
    if "ice" not in payload and "candidates" in payload:
        payload["ice"] = payload.pop("candidates")
    payload.setdefault("v", 1)
    payload.setdefault("role", "offer")
    return payload


class QRSignalingChannel(SignalingChannel):
    """In-process paste-blob signaling for fully-offline pairing.

    Construct with the mobile's offer blob (read from the operator's
    typed/pasted input). Call :meth:`get_offer` to extract the SDP; after
    the local pair completes and :meth:`post_answer` runs, read
    :attr:`answer_blob` and relay it back to the mobile side.
    """

    def __init__(self, *, paste_blob: Optional[str] = None):
        self.logger = LoggerService()
        self._offer_blob = paste_blob
        self._answer_blob: Optional[str] = None
        self._code_hint: Optional[str] = None

    # ------------------------------------------------------------------
    # SignalingChannel surface
    # ------------------------------------------------------------------

    async def get_offer(self, code: str) -> str:
        if not self._offer_blob:
            raise CodeNotFound(
                "QRSignalingChannel: no paste blob configured. "
                "Pass the publisher's blob via the channel constructor."
            )
        try:
            payload = decode_blob(self._offer_blob)
        except ValueError as exc:
            raise CodeNotFound(f"malformed paste blob: {exc}") from exc

        # Stash the blob's code (if any) so the answer can echo it back —
        # useful for the operator to confirm both sides are on the same
        # session. The ``code`` argument supplied by the controller wins
        # if both are present.
        self._code_hint = payload.get("code") or code

        sdp = payload.get("sdp")
        if not isinstance(sdp, str) or not sdp.strip():
            raise CodeNotFound("paste blob did not carry an SDP")
        return sdp

    async def post_answer(self, code: str, sdp: str) -> None:
        # No Worker to POST to — we just compose the reverse blob for the
        # operator to relay back to mobile. The answer blob includes the
        # code so mobile can correlate without a separate side channel.
        # Per plan §19.4.7, ``role="answer"`` makes the direction explicit
        # in the encoded payload.
        self._answer_blob = encode_blob(
            sdp,
            code=(code or self._code_hint),
            role="answer",
        )
        self.logger.info(
            f"QRSignalingChannel: answer blob ready ({len(self._answer_blob)} chars)"
        )

    async def post_ice(self, code: str, role: str, candidate: dict) -> None:
        # Trickle ICE has no mailbox in the paste flow. Candidates must be
        # baked into the SDP via full ICE gathering before the offer blob
        # is generated.
        return None

    async def subscribe(self, code: str, role: str) -> AsyncIterator[dict]:  # type: ignore[override]
        # No live signaling stream. Return an empty async iterator so the
        # consumer's ``async for`` exits immediately.
        return
        # The dead ``yield`` keeps this a generator function.
        if False:  # pragma: no cover
            yield {}

    async def delete_session(self, code: str) -> None:
        # No DO to delete; just drop our local state.
        self._offer_blob = None
        self._answer_blob = None
        self._code_hint = None

    async def close(self) -> None:
        return None

    # ------------------------------------------------------------------
    # paste-flow accessors used by the pairing dialog
    # ------------------------------------------------------------------

    @property
    def offer_blob(self) -> Optional[str]:
        """The publisher-side blob this channel was constructed with."""
        return self._offer_blob

    @property
    def answer_blob(self) -> Optional[str]:
        """The viewer-side answer blob, populated by :meth:`post_answer`."""
        return self._answer_blob

    @property
    def code_hint(self) -> Optional[str]:
        """The code extracted from the offer blob (if any)."""
        return self._code_hint
