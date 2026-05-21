"""WebRTC receive service for the Flight Viewer (per-tile).

Public surface mirrors :class:`~core.services.streaming.RTMPStreamService.\
RTMPStreamService` so existing display patterns reuse the
``frameReady(np.ndarray, ts, frame_n)`` contract. WebRTC-specific signals
add ICE state, DTLS fingerprint, SAS phrase, and DataChannel demux hooks.

The service owns one ``QThread`` and one ``asyncio`` event loop. Frames
arrive on a single asyncio task, convert to ``bgr24`` ndarrays, and emit
on the Qt thread via Qt's signal/slot bridging. DataChannel messages are
forwarded raw via :attr:`dataChannelMessage` so :class:`~core.services.\
streaming.DetectionFeedService.DetectionFeedService` can demux JSON +
JPEG pairs without coupling to aiortc.

The ``aiortc`` import is deliberately lazy: importing this module must
not fail when aiortc is absent. Construction raises a clear ImportError
only when :meth:`request_connect` is actually called and the dependency
is missing.
"""

from __future__ import annotations

import asyncio
import threading
import time
from dataclasses import dataclass
from typing import List, Optional

import numpy as np
from PySide6.QtCore import QObject, QThread, Signal

from core.services.LoggerService import LoggerService
from core.services.streaming.signaling import (
    CodeAlreadyAnswered,
    CodeNotFound,
    SignalingChannel,
    ViewerCapReached,
    pairing,
)


# Reasonable default timeouts; tunable per-call if needed.
DEFAULT_FETCH_OFFER_TIMEOUT = 30.0
DEFAULT_ICE_GATHER_TIMEOUT = 15.0
DEFAULT_DTLS_TIMEOUT = 10.0
# Grace window after ICE enters ``failed`` before we give up waiting for
# the publisher to send an iceRestart re-offer via the signaling WS.
DEFAULT_ICE_RESTART_GRACE_SECONDS = 60.0

# How long to wait, after the desktop has posted its answer, for the
# tablet operator to tap "accept" on the mobile-side SAS prompt. Mobile
# keeps its video track disabled until that tap, so ICE on the desktop
# can pair but media won't flow. If the operator never taps approve,
# we surface a clean error so the dialog has something to show.
DEFAULT_PEER_APPROVAL_TIMEOUT_SECONDS = 120.0

# Label of the DataChannel the desktop opens to ask the publisher for a
# full snapshot of currently-promoted tracks (plan §15 M3 / §6).
SNAPSHOT_REQUEST_CHANNEL = "detections.snapshot_request"


def _require_aiortc():
    """Import aiortc lazily and surface a friendly error if missing."""
    try:
        import aiortc  # type: ignore  # noqa: F401
        from aiortc import (  # type: ignore  # noqa: F401
            RTCPeerConnection,
            RTCSessionDescription,
            RTCIceCandidate,
        )
        from aiortc.contrib.signaling import object_from_string  # type: ignore  # noqa: F401
    except ImportError as exc:
        raise ImportError(
            "aiortc is required for the Flight Viewer. "
            "Run `pip install aiortc qasync` to enable WebRTC support."
        ) from exc
    return aiortc


@dataclass
class WebRTCStats:
    """Live counters surfaced via :pyattr:`WebRTCStreamService.streamStatsChanged`."""

    fps: float = 0.0
    bitrate_kbps: float = 0.0
    width: int = 0
    height: int = 0
    one_way_latency_ms: Optional[float] = None
    ice_state: str = "new"
    frames_received: int = 0
    bytes_received: int = 0


class WebRTCStreamService(QThread):
    """One peer connection per service instance.

    Lifecycle:

    * ``request_connect()``  — schedule a connect on the internal asyncio loop.
    * ``confirm_sas(True|False)`` — proceed or abort once SAS is rendered.
    * ``request_disconnect()`` — graceful shutdown; safe to call from any thread.
    * ``cleanup()`` / ``reset()`` — lifecycle hooks per CLAUDE.md §2.2.1.
    """

    frameReady = Signal(np.ndarray, float, int)  # frame, timestamp, frame_number
    connectionStatusChanged = Signal(bool, str)  # connected, status
    streamStatsChanged = Signal(dict)
    errorOccurred = Signal(str)

    iceStateChanged = Signal(str)
    peerFingerprintReceived = Signal(str)
    sasReady = Signal(list)

    dataChannelOpened = Signal(str)
    dataChannelMessage = Signal(str, bytes)

    capReached = Signal(int, int)  # current, limit

    # M3: snapshot request channel (per plan §15)
    snapshotRequested = Signal()

    def __init__(
        self,
        signaling: SignalingChannel,
        pairing_code: str,
        *,
        fetch_offer_timeout: float = DEFAULT_FETCH_OFFER_TIMEOUT,
        ice_gather_timeout: float = DEFAULT_ICE_GATHER_TIMEOUT,
        dtls_timeout: float = DEFAULT_DTLS_TIMEOUT,
        reconnect_attempts: int = 3,
        ice_restart_grace: float = DEFAULT_ICE_RESTART_GRACE_SECONDS,
        peer_approval_timeout: float = DEFAULT_PEER_APPROVAL_TIMEOUT_SECONDS,
    ):
        super().__init__()
        self.logger = LoggerService()
        self._signaling = signaling
        self._pairing_code = pairing_code
        self._fetch_offer_timeout = fetch_offer_timeout
        self._ice_gather_timeout = ice_gather_timeout
        self._dtls_timeout = dtls_timeout
        self._reconnect_attempts = max(0, int(reconnect_attempts))
        self._ice_restart_grace = float(ice_restart_grace)
        # Stored under a distinct name so it does not shadow the
        # `_peer_approval_timeout` coroutine method below — assigning a
        # float to `self._peer_approval_timeout` would clobber the
        # method on the instance and `self._peer_approval_timeout(pc)`
        # in `_negotiate_once` would raise "'float' object is not
        # callable".
        self._peer_approval_timeout_seconds = float(peer_approval_timeout)

        self._loop: Optional[asyncio.AbstractEventLoop] = None
        self._loop_ready = threading.Event()
        self._stop = threading.Event()

        self._pc = None
        self._frame_n = 0
        self._frame_t0: Optional[float] = None
        self._stats = WebRTCStats()
        self._sas_words: Optional[List[str]] = None
        self._sas_confirmation = asyncio.Event()  # bound to loop in run()
        self._sas_accepted = False
        self._connected = False
        self._reconnect_backoff = 1.0
        self._max_backoff = 30.0
        self._explicit_disconnect = False
        self._signaling_task: Optional[asyncio.Task] = None

        # ICE restart / snapshot bookkeeping. ``_remote_fp_initial`` is the
        # publisher's DTLS fingerprint captured on the initial offer; we
        # refuse re-offers whose fingerprint differs because that means
        # the publisher re-keyed and SAS no longer reflects the session.
        self._snapshot_channel = None
        self._was_disconnected = False
        self._failure_timer: Optional[asyncio.Task] = None
        self._remote_fp_initial: Optional[str] = None
        # Tracks the post-answer wait for the tablet operator's approval.
        # Cancelled the moment ICE first reaches ``connected``/``completed``;
        # if it fires, the session emits a clean ``errorOccurred`` so the
        # pairing dialog can render something actionable.
        self._peer_approval_task: Optional[asyncio.Task] = None

    # ------------------------------------------------------------------
    # public API (called from Qt thread)
    # ------------------------------------------------------------------

    def request_connect(self) -> None:
        """Start the QThread + asyncio loop and begin negotiation."""
        if not self.isRunning():
            self.start()

    def confirm_sas(self, accept: bool) -> None:
        """Accept or reject the rendered SAS phrase.

        Bridges across the Qt/asyncio boundary by scheduling ``_sas_event_set``
        on the loop. Safe to call before the loop is ready.
        """
        self._sas_accepted = bool(accept)

        def _resolve():
            self._sas_confirmation.set()

        loop = self._loop
        if loop is not None and loop.is_running():
            loop.call_soon_threadsafe(_resolve)
        else:
            # Loop not ready yet — defer; run() polls _sas_accepted after it
            # creates the event, so this code path is only hit on a race.
            pass

    def request_disconnect(self) -> None:
        """Schedule a graceful shutdown of the peer connection and loop."""
        self._explicit_disconnect = True
        loop = self._loop
        if loop is None or not loop.is_running():
            self._stop.set()
            return
        loop.call_soon_threadsafe(self._stop.set)
        loop.call_soon_threadsafe(lambda: asyncio.ensure_future(self._tear_down()))

    def reset(self) -> None:
        """Lifecycle hook (CLAUDE.md §2.2.1) — drop transient state."""
        self._frame_n = 0
        self._frame_t0 = None
        self._stats = WebRTCStats()
        self._sas_words = None
        self._sas_accepted = False
        self._explicit_disconnect = False
        self._was_disconnected = False
        self._failure_timer = None
        self._peer_approval_task = None
        self._snapshot_channel = None
        self._remote_fp_initial = None
        self._connected = False

    def cleanup(self, *, wait: bool = False) -> None:
        """Lifecycle hook (CLAUDE.md §2.2.1) — stop loop, release resources.

        ``wait=False`` (default): non-blocking. Schedules the asyncio
        teardown via :meth:`request_disconnect` and returns immediately.
        The QThread runs to completion in the background; resources are
        released asynchronously. This is the right choice for UI-triggered
        teardowns (tile close, pairing cancel) because the Qt main thread
        cannot afford to block for up to 3s while aiortc shuts down its
        SCTP / DTLS state.

        ``wait=True``: block the caller for up to 3s waiting for the
        thread to exit, falling back to ``QThread.terminate`` if it does
        not. Use this from app-exit paths where we *do* want the cleanup
        to complete before the process goes away.
        """
        self.request_disconnect()
        if not wait:
            return
        if self.isRunning():
            if not self.wait(3000):
                self.logger.warning(
                    "WebRTCStreamService did not stop within 3s; "
                    "forcing thread exit"
                )
                self.terminate()
                self.wait(500)

    # ------------------------------------------------------------------
    # QThread entry point
    # ------------------------------------------------------------------

    def run(self) -> None:
        try:
            _require_aiortc()
        except ImportError as exc:
            self.errorOccurred.emit(str(exc))
            return

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        self._loop = loop
        self._sas_confirmation = asyncio.Event()
        self._loop_ready.set()

        try:
            loop.run_until_complete(self._main())
        except Exception as exc:  # pragma: no cover - defensive
            self.logger.error(
                f"WebRTCStreamService crashed: code={self._pairing_code} err={exc}"
            )
            self.errorOccurred.emit(
                f"WebRTC session for code {self._pairing_code} failed: {exc}"
            )
        finally:
            try:
                loop.run_until_complete(self._tear_down())
            except Exception:  # pragma: no cover - defensive
                pass
            loop.close()
            self._loop = None
            self.connectionStatusChanged.emit(False, "Disconnected")

    # ------------------------------------------------------------------
    # asyncio main loop
    # ------------------------------------------------------------------

    async def _main(self) -> None:
        attempts_left = self._reconnect_attempts + 1
        while attempts_left > 0 and not self._stop.is_set():
            attempts_left -= 1
            try:
                await self._negotiate_once()
                # successful media phase exits when remote closes or stop fires
                if self._explicit_disconnect or self._stop.is_set():
                    break
            except (CodeNotFound, CodeAlreadyAnswered, ViewerCapReached) as exc:
                # These are terminal; never retried — the dialog must show
                # a distinct error per plan §9 *Trust model*.
                if isinstance(exc, ViewerCapReached):
                    self.capReached.emit(exc.current, exc.limit)
                self.errorOccurred.emit(str(exc))
                return
            except Exception as exc:
                self.errorOccurred.emit(
                    f"WebRTC negotiation error for code {self._pairing_code}: {exc}"
                )
                if attempts_left <= 0 or self._explicit_disconnect:
                    return
                self.connectionStatusChanged.emit(
                    False,
                    f"Reconnecting in {self._reconnect_backoff:.0f}s",
                )
                try:
                    await asyncio.sleep(self._reconnect_backoff)
                except asyncio.CancelledError:
                    return
                self._reconnect_backoff = min(
                    self._reconnect_backoff * 2, self._max_backoff
                )

    async def _negotiate_once(self) -> None:
        """Pair, hold the session, recover from blips, return when finally done.

        The flow is:

        1. Fetch the offer (one-shot; CodeNotFound is terminal).
        2. Build a :class:`RTCPeerConnection` with handlers wired for ICE,
           tracks, DataChannels (including the desktop-opened
           ``detections.snapshot_request`` channel).
        3. Set remote/local descriptions and post the answer.
        4. SAS gate.
        5. **Persistent session loop** — hold the coroutine alive while ICE
           is anything other than ``closed``. ``disconnected`` is tolerated;
           ``failed`` starts the ICE-restart grace timer. The WS subscription
           keeps running in the background and handles re-offers from the
           publisher (iceRestart) without tearing down.

        Returning from this method implies "the session is over for now" —
        either a hard failure or an explicit disconnect. ``delete_session``
        is *not* called here; that's deferred to :meth:`_tear_down` so the
        Worker Durable Object stays alive across brief reconnects and
        within-grace-window retries.
        """
        from aiortc import RTCPeerConnection, RTCSessionDescription  # type: ignore

        self.connectionStatusChanged.emit(False, "Looking up pairing code...")
        try:
            offer_sdp = await asyncio.wait_for(
                self._signaling.get_offer(self._pairing_code),
                timeout=self._fetch_offer_timeout,
            )
        except asyncio.TimeoutError as exc:
            raise CodeNotFound(
                f"offer fetch timed out for code {self._pairing_code}"
            ) from exc

        pc = RTCPeerConnection()
        self._pc = pc

        @pc.on("iceconnectionstatechange")
        def _on_ice_state():
            state = pc.iceConnectionState
            self._stats.ice_state = state
            self.iceStateChanged.emit(state)
            if state == "disconnected":
                # Brief blip — keep the session alive; many disconnects
                # recover on their own once connectivity re-pairs.
                if not self._was_disconnected:
                    self._was_disconnected = True
                    self.connectionStatusChanged.emit(
                        False, "Network disconnected; awaiting recovery"
                    )
            elif state in ("connected", "completed"):
                # First successful pairing — emit ``connected`` so the
                # pairing dialog can dismiss and the tile materializes.
                # Subsequent reconnects after a disconnect take the
                # ``Network recovered`` branch below.
                if not self._connected:
                    self._connected = True
                    self.connectionStatusChanged.emit(True, "connected")
                    self._reconnect_backoff = 1.0
                    # Tablet operator approved within the window — stop
                    # the approval timer.
                    if (
                        self._peer_approval_task is not None
                        and not self._peer_approval_task.done()
                    ):
                        self._peer_approval_task.cancel()
                    self._peer_approval_task = None
                elif self._was_disconnected:
                    self._was_disconnected = False
                    self.connectionStatusChanged.emit(True, "Network recovered")
                    # On recovery, ask the publisher for a snapshot so we
                    # catch up on any detection promotions that happened
                    # during the blackout (plan §6 / §15 M3).
                    self._send_snapshot_request()
                if self._failure_timer is not None and not self._failure_timer.done():
                    self._failure_timer.cancel()
                self._failure_timer = None
            elif state == "failed":
                # Don't tear down yet — give the publisher a grace window
                # to send a connectivity-restart re-offer over the
                # signaling WS.
                self._was_disconnected = True
                self.connectionStatusChanged.emit(
                    False, "Network failed; awaiting restart from peer"
                )
                if self._failure_timer is None or self._failure_timer.done():
                    self._failure_timer = asyncio.ensure_future(
                        self._ice_restart_timeout(pc)
                    )
            elif state == "closed":
                self.connectionStatusChanged.emit(False, "closed")

        @pc.on("track")
        def _on_track(track):
            if track.kind == "video":
                asyncio.ensure_future(self._consume_video(track))

        @pc.on("datachannel")
        def _on_datachannel(channel):
            label = channel.label
            self.dataChannelOpened.emit(label)

            @channel.on("message")
            def _on_msg(message):
                payload = message if isinstance(message, (bytes, bytearray)) else str(message).encode("utf-8")
                self.dataChannelMessage.emit(label, bytes(payload))

        await pc.setRemoteDescription(
            RTCSessionDescription(sdp=offer_sdp, type="offer")
        )

        # Open the desktop-side ``detections.snapshot_request`` channel
        # before our local description is finalized so SCTP includes it in
        # the negotiation. The publisher listens for this channel by label
        # and responds on the existing ``detections.snapshot`` channel.
        snapshot_channel = pc.createDataChannel(SNAPSHOT_REQUEST_CHANNEL)
        self._snapshot_channel = snapshot_channel

        @snapshot_channel.on("open")
        def _on_snapshot_open():
            self.logger.debug(
                f"WebRTCStreamService: snapshot request channel open "
                f"(code={self._pairing_code})"
            )

        # Open the signaling WS subscription before posting the answer so
        # the publisher's trickle ICE candidates (and any future iceRestart
        # re-offer) are not dropped on the floor.
        self._signaling_task = asyncio.ensure_future(self._consume_signaling(pc))

        answer = await pc.createAnswer()
        await pc.setLocalDescription(answer)

        # Post the answer so the publisher can derive its SAS and present
        # the tablet operator with the approval prompt. The publisher
        # keeps its video track ``setEnabled(false)`` until the operator
        # explicitly accepts on the tablet, so no media flows until then.
        await self._signaling.post_answer(
            self._pairing_code, pc.localDescription.sdp
        )

        # Capture the peer fingerprint for the ICE-restart re-offer guard
        # in :meth:`_handle_reoffer` and emit the 4-word SAS phrase so the
        # tile's status strip can display it.
        peer_fp = self._extract_remote_fingerprint(offer_sdp)
        local_fp = self._extract_local_fingerprint(pc.localDescription.sdp if pc.localDescription else "")
        self._remote_fp_initial = peer_fp
        if peer_fp:
            self.peerFingerprintReceived.emit(peer_fp)
        if peer_fp and local_fp:
            sas = pairing.derive_sas_words(peer_fp, local_fp, count=4)
            self._sas_words = sas
            self.sasReady.emit(list(sas))

        # We are NOT connected yet — only ICE pairing + the tablet
        # operator's approval can take us there. Surface a clear status
        # to the dialog so the operator knows to look at the tablet.
        self.connectionStatusChanged.emit(
            False, "Waiting for operator approval on tablet"
        )

        # Start a peer-approval timeout. If ICE never reaches
        # ``connected`` within :attr:`_peer_approval_timeout_seconds`,
        # surface a clean error so the dialog can show the operator
        # something more actionable than a frozen "waiting" spinner.
        # The handler in ``iceconnectionstatechange`` cancels this timer
        # when ICE first transitions to ``connected``/``completed``.
        self._peer_approval_task = asyncio.ensure_future(
            self._peer_approval_timeout(pc)
        )

        # Hold here for the session lifetime. Exit only on explicit stop
        # or ICE ``closed`` (terminal). ``disconnected`` / ``failed`` are
        # tolerated — the iceconnectionstatechange handler and the
        # failure timer decide when to actually give up.
        while not self._stop.is_set() and pc.iceConnectionState != "closed":
            await asyncio.sleep(0.25)

    async def _consume_video(self, track) -> None:
        """Pump frames from an aiortc track into Qt's frameReady signal."""
        self._frame_t0 = time.monotonic()
        bytes_window = 0
        window_start = time.monotonic()

        try:
            while not self._stop.is_set():
                try:
                    frame = await track.recv()
                except Exception as exc:
                    self.errorOccurred.emit(f"Video track error: {exc}")
                    return

                ndarray = frame.to_ndarray(format="bgr24")
                self._frame_n += 1
                ts = frame.time if hasattr(frame, "time") and frame.time else time.monotonic()
                self.frameReady.emit(ndarray, float(ts), self._frame_n)

                self._stats.frames_received = self._frame_n
                self._stats.height, self._stats.width = ndarray.shape[:2]
                bytes_window += ndarray.nbytes
                now = time.monotonic()
                if now - window_start >= 1.0:
                    elapsed = now - window_start
                    self._stats.fps = self._frame_n / max(0.001, now - (self._frame_t0 or now))
                    self._stats.bitrate_kbps = (bytes_window * 8 / 1000.0) / elapsed
                    self._stats.bytes_received += bytes_window
                    window_start = now
                    bytes_window = 0
                    self.streamStatsChanged.emit(self._stats.__dict__.copy())
        except asyncio.CancelledError:
            pass

    async def _consume_signaling(self, pc) -> None:
        """Forward WS messages from the signaling channel into ``pc``.

        Handles four message types from the Worker (plan §8 wire shape):

        * ``candidate`` — trickle ICE candidate from the publisher.
        * ``offer`` — publisher-initiated ``iceRestart=true`` re-offer.
          Processed via :meth:`_handle_reoffer`, which guards against
          DTLS fingerprint changes mid-session.
        * ``closed`` — publisher tore the session down; stop locally.
        * ``error`` — Worker-side or publisher-side error; stop locally.

        Runs concurrently with the rest of negotiation and is kept open
        for the lifetime of the peer connection so ICE restarts received
        after first pair complete are handled transparently.
        """
        try:
            async for message in self._signaling.subscribe(self._pairing_code, "desktop"):
                msg_type = (message or {}).get("type")
                # Plan §8 wire shape: the Worker emits `{type:"ice", candidate:{…}}`
                # for trickled candidates. ``"candidate"`` is the legacy/in-memory
                # shape; accept either so tests and any older Worker build keep
                # working.
                if msg_type in ("ice", "candidate"):
                    cand_dict = message.get("candidate") or {}
                    ice_cand = self._build_ice_candidate(cand_dict)
                    if ice_cand is None:
                        continue
                    try:
                        await pc.addIceCandidate(ice_cand)
                    except Exception as exc:  # noqa: BLE001 - never fatal
                        self.logger.warning(
                            f"WebRTCStreamService: failed to add ICE candidate "
                            f"for code={self._pairing_code}: {exc}"
                        )
                elif msg_type == "offer":
                    if not self._connected:
                        # Ignore re-offers before initial handshake completes.
                        # Mobile shouldn't be sending them anyway, and acting
                        # on one would race the SAS gate.
                        continue
                    # Plan §18 (W4): the WS broadcast carries the SDP under
                    # ``sdp`` (new) but real Worker builds may only populate
                    # ``offer_sdp`` (legacy). Accept either so an iceRestart
                    # broadcast isn't silently dropped.
                    offer_sdp = message.get("sdp") or message.get("offer_sdp")
                    if not isinstance(offer_sdp, str) or not offer_sdp:
                        continue
                    await self._handle_reoffer(pc, offer_sdp)
                elif msg_type == "closed":
                    self.connectionStatusChanged.emit(False, "remote-closed")
                    self._stop.set()
                    return
                elif msg_type == "error":
                    reason = message.get("reason", "signaling error")
                    self.errorOccurred.emit(f"signaling error: {reason}")
                    self._stop.set()
                    return
                # Other types (`answer`, `pong`, ...) are not relevant to
                # the desktop role; ignore.
        except asyncio.CancelledError:
            raise
        except Exception as exc:  # noqa: BLE001 - log + exit
            self.logger.debug(
                f"WebRTCStreamService._consume_signaling exited for "
                f"code={self._pairing_code}: {exc}"
            )

    async def _handle_reoffer(self, pc, new_offer_sdp: str) -> None:
        """Process an ``iceRestart=true`` re-offer from the publisher.

        The publisher reuses the same DTLS identity (plan §17 / mobile
        guidance), so the fingerprint in the new offer should match the
        one captured during the initial handshake. A mismatch means
        somebody re-keyed mid-session — possible MitM, possible publisher
        bug — and we close defensively because the previously-confirmed
        SAS no longer reflects the live keys.
        """
        new_fp = self._extract_remote_fingerprint(new_offer_sdp)
        if new_fp and self._remote_fp_initial and new_fp != self._remote_fp_initial:
            self.errorOccurred.emit(
                "Peer DTLS fingerprint changed mid-session — closing for safety."
            )
            self._stop.set()
            return

        # Only import aiortc once the fingerprint check has passed; this
        # also keeps the unit test of the fingerprint guard runnable in
        # environments without aiortc installed.
        from aiortc import RTCSessionDescription  # type: ignore

        self.connectionStatusChanged.emit(False, "reconnecting")
        try:
            await pc.setRemoteDescription(
                RTCSessionDescription(sdp=new_offer_sdp, type="offer")
            )
            answer = await pc.createAnswer()
            await pc.setLocalDescription(answer)
            await self._signaling.post_answer(
                self._pairing_code, pc.localDescription.sdp
            )
            self.logger.debug(
                f"WebRTCStreamService: processed iceRestart re-offer for "
                f"code={self._pairing_code}"
            )
        except Exception as exc:  # noqa: BLE001 - re-offer must not crash session
            self.errorOccurred.emit(f"Reconnect failed: {exc}")

    async def _peer_approval_timeout(self, pc) -> None:
        """Time out the wait for the tablet operator's approval.

        Cancelled by :func:`iceconnectionstatechange` when ICE first
        reaches ``connected``/``completed`` — which only happens after
        the publisher (mobile) calls ``setEnabled(true)`` on the track
        in response to its own operator tapping accept. If the timer
        runs out, the tablet operator likely didn't notice the prompt
        or is unavailable; surface a clean error so the pairing dialog
        can render something actionable.
        """
        try:
            await asyncio.sleep(self._peer_approval_timeout_seconds)
            if self._connected:
                return  # raced against the iceconnectionstatechange handler
            self.errorOccurred.emit(
                f"No response from the drone operator within "
                f"{int(self._peer_approval_timeout_seconds)}s. Ask them to look "
                "at the tablet and accept the pairing prompt, then "
                "retry."
            )
            self._stop.set()
        except asyncio.CancelledError:
            pass

    async def _ice_restart_timeout(self, pc) -> None:
        """Grace timer: if ICE stays ``failed`` past the window, give up.

        Started when ICE enters ``failed`` and cancelled when ICE recovers
        (via spontaneous re-pair or via a peer-initiated iceRestart
        re-offer that puts us back into ``connected``). If neither happens
        within :attr:`_ice_restart_grace` seconds, surface a clean error
        and let the outer reconnect loop decide what to do next.
        """
        try:
            await asyncio.sleep(self._ice_restart_grace)
            if pc.iceConnectionState == "failed":
                self.errorOccurred.emit(
                    f"Network failed; no reconnect received from peer within "
                    f"{int(self._ice_restart_grace)}s"
                )
                self._stop.set()
        except asyncio.CancelledError:
            pass

    def _send_snapshot_request(self) -> None:
        """Send ``{type: "request_snapshot"}`` on the desktop-opened channel.

        Called from the ICE-recovery handler (after a `disconnected ->
        connected` transition) so any detection promotions the publisher
        emitted during the blackout flow back via the existing
        ``detections.snapshot`` channel. No-op if the channel isn't open
        yet — the recovery path runs again on subsequent recoveries.
        """
        import json
        channel = self._snapshot_channel
        if channel is None:
            return
        if getattr(channel, "readyState", None) != "open":
            return
        try:
            channel.send(json.dumps({"type": "request_snapshot"}))
            self.snapshotRequested.emit()
            self.logger.debug(
                f"WebRTCStreamService: snapshot requested for "
                f"code={self._pairing_code}"
            )
        except Exception as exc:  # noqa: BLE001 - snapshot is best-effort
            self.logger.debug(
                f"WebRTCStreamService: snapshot request failed for "
                f"code={self._pairing_code}: {exc}"
            )

    @staticmethod
    def _build_ice_candidate(cand_dict: dict):
        """Convert a wire-format candidate dict into an :class:`RTCIceCandidate`.

        The wire format follows the JSEP shape ``{candidate, sdpMid,
        sdpMLineIndex}``. aiortc's parser lives in ``aiortc.sdp.candidate_from_sdp``.
        """
        if not isinstance(cand_dict, dict):
            return None
        sdp = cand_dict.get("candidate") or ""
        if not isinstance(sdp, str) or not sdp.strip():
            return None
        try:
            from aiortc.sdp import candidate_from_sdp  # type: ignore
        except ImportError:
            return None
        try:
            candidate = candidate_from_sdp(sdp)
        except Exception:  # noqa: BLE001 - parser sometimes raises ValueError
            return None
        if "sdpMid" in cand_dict:
            candidate.sdpMid = cand_dict.get("sdpMid")
        if "sdpMLineIndex" in cand_dict:
            try:
                candidate.sdpMLineIndex = int(cand_dict["sdpMLineIndex"])
            except (TypeError, ValueError):
                pass
        return candidate

    # ------------------------------------------------------------------
    # internals
    # ------------------------------------------------------------------

    # Direct port of ADIAT_Mobile's ``SdpFingerprintExtractor.SHA256_LINE``
    # — matches the SDP fingerprint line case-insensitively (libwebrtc
    # emits lowercase but SDP attribute names are case-insensitive per
    # RFC 4566) and captures only the colon-separated hex bytes.
    _FINGERPRINT_LINE = __import__("re").compile(
        r"^a=fingerprint:sha-256\s+([0-9A-Fa-f:]+)\s*$",
        __import__("re").IGNORECASE | __import__("re").MULTILINE,
    )

    @staticmethod
    def _extract_remote_fingerprint(sdp: str) -> Optional[str]:
        """Return the SHA-256 fingerprint from an SDP, hex+colon form, uppercase.

        Mirrors ADIAT_Mobile's ``SdpFingerprintExtractor.extractSha256`` —
        we keep the colon separators and uppercase form, but **drop the
        ``sha-256 `` algorithm prefix**. Mobile's
        :class:`SasDerivation` feeds this exact shape into its
        canonical-hash composition, and the desktop's
        :func:`pairing.derive_sas_words` must see the same input or the
        4-word phrase diverges between the two screens.
        """
        if not sdp:
            return None
        match = WebRTCStreamService._FINGERPRINT_LINE.search(sdp)
        if not match:
            return None
        return match.group(1).upper()

    @staticmethod
    def _extract_local_fingerprint(sdp: str) -> Optional[str]:
        # Same shape on local SDP.
        return WebRTCStreamService._extract_remote_fingerprint(sdp)

    async def _tear_down(self) -> None:
        """Final teardown — cancel tasks, delete the Worker session, close the PC.

        This is the *only* place :meth:`SignalingChannel.delete_session` is
        called. Deferring the delete until explicit teardown (rather than
        firing it right after the first answer is posted) lets multi-attempt
        pairing reuse the same code across transient signaling failures and
        lets ICE restart re-offers flow through the same Durable Object
        without forcing a fresh pairing code from the operator.

        The Worker's own 30s TTL alarm still evicts abandoned sessions if
        we somehow exit without running this teardown.
        """
        task = self._signaling_task
        self._signaling_task = None
        if task is not None and not task.done():
            task.cancel()
            try:
                await task
            except (asyncio.CancelledError, Exception):  # pragma: no cover - best effort
                pass

        timer = self._failure_timer
        self._failure_timer = None
        if timer is not None and not timer.done():
            timer.cancel()

        approval_task = self._peer_approval_task
        self._peer_approval_task = None
        if approval_task is not None and not approval_task.done():
            approval_task.cancel()

        # Best-effort: tell the Worker the session is over so the Durable
        # Object self-destructs immediately rather than waiting on its TTL.
        if self._pairing_code is not None:
            try:
                await self._signaling.delete_session(self._pairing_code)
            except Exception:  # pragma: no cover - best effort
                pass

        pc = self._pc
        self._pc = None
        if pc is not None:
            try:
                await pc.close()
            except Exception:  # pragma: no cover - best effort
                pass
        self._connected = False
