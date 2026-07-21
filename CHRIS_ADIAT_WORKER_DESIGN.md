# CHRIS ADIAT Worker Design

Status: implemented design-of-record for DEV-1056.

Repository: `MEJOR-Technologies/automated-drone-image-analysis-tool`

Purpose: keep this fork close to upstream ADIAT while adding a thin CHRIS integration layer for batch image analysis and future live stream analysis.

Branch policy:

- Base CHRIS integration work on the fork's `main` branch.
- Treat upstream `dev` as an input branch to merge deliberately, not as the default feature base.
- Keep CHRIS-specific code in top-level adapter/package files so upstream ADIAT changes remain easier to merge.

M1 implementation status:

- `chris_adiat_adapter/` provides payload validation, source loading, profile mapping, ADIAT algorithm execution, result normalization, CLI smoke testing, Dask callable entrypoint, and child-process hard timeout.
- `Dockerfile.chris` builds the GPL worker image from this public repository.
- `requirements-chris.txt` keeps worker runtime dependencies separate from desktop GUI packaging.
- Initial supported profiles: `broad_scan` and `search_rescue`.
- Supported RGB algorithms: `AIPersonDetector`, `MRMap`, and `RXAnomaly`.
- Thermal RAW inputs use the thermal algorithms; AI-person detection runs
  CPU-only against the bundled ONNX model.

Production contract verified on 2026-07-10:

- Runtime matches the CHRIS Dask cluster on Python 3.12 and
  Dask/Distributed 2025.11.0.
- Each container advertises `adiat_analysis=1`, runs one Dask process with one
  thread, and uses no fixed worker name, so replicas register independently.
- The private dispatcher skips its CHRIS-only trace wrapper for this external
  worker callable; no private CHRIS package is installed in the public image.
- Only projected RAW RGB photos and bounded thermal RAW rasters with valid
  SHA256 checksums are admitted.
- The worker accepts at most 100 sources and 60,000,000 decoded pixels per
  source. It retains up to 100,000 observations per batch; the default deadline
  scales with source count (`source_count * source_timeout + 900 seconds`).
- Source algorithms run in killable child processes with a memory limit and
  per-source timeout. Input files are immutable and separate from outputs.
- JPEG, DJI MPO-encoded JPEG, PNG, TIFF, and WebP inputs are accepted after
  content-type, checksum, byte-size, decoded-image, and pixel-count validation.
- Permanent result decode/schema/validation failures go to a bounded-evidence
  Kafka DLQ before offset commit. Transient persistence or DLQ publication
  failures remain uncommitted for retry.
- The GHCR package is public. Releases publish an SBOM, provenance attestation,
  immutable SHA tags, and a digest suitable for CHRIS deployment.

Later sections retain the original sidecar investigation and migration context.
Where historical wording conflicts with this production contract, this section
is authoritative.

## Goals

- Keep upstream ADIAT code easy to merge.
- Avoid large changes inside `app/`.
- Keep GPL/AGPL-covered ADIAT code out of the private CHRIS monorepo images.
- Build a public GPL-compatible worker image that CHRIS can deploy locally and in AWS.
- Move batch ADIAT execution behind Dask so existing CHRIS queue, dispatcher, and scaling structure can manage work.
- Preserve current CHRIS result schema as much as possible.
- Leave room for RTMP/live stream support without forcing it into the batch path.

## Non-Goals

- Do not rewrite ADIAT internals.
- Do not vendor this repo as a Git submodule inside CHRIS.
- Do not import ADIAT code from private CHRIS packages.
- Do not give ADIAT workers CHRIS database access unless later proven necessary.
- Do not use Dask as the durable lifecycle manager for long-running RTMP streams unless we intentionally choose that tradeoff later.

## Historical CHRIS Sidecar Integration

Path before DEV-1056:

```text
orchestrator
  -> Kafka/task ledger
  -> dask-dispatcher
  -> Dask scheduler
  -> normal CHRIS Dask worker callable
  -> HTTP POST /analyze to adiat-sidecar
  -> ADIAT still-image algorithms
  -> result JSON
  -> CHRIS DB observations/detections
```

Important baseline facts:

- CHRIS already has a Dask dispatcher and Dask scheduler.
- The ADIAT task already travels through the dispatcher path.
- The dispatcher already requests Dask resource `adiat_analysis=1`.
- The Dask callable was a private CHRIS wrapper that called the HTTP sidecar.
- The sidecar imported ADIAT and ran analysis inline in a FastAPI/uvicorn process.
- The sidecar was the GPL boundary.

Current weakness:

- Sidecar accepts concurrent `/analyze` calls through the Starlette/AnyIO sync threadpool.
- There is no explicit app-level semaphore.
- There is no queue/backpressure policy inside sidecar.
- CHRIS client timeout does not cancel the server-side ADIAT work.
- ADIAT/native/ONNX/OpenCV work can keep running after the caller has failed.
- A stuck analysis can starve health checks and make the whole sidecar unhealthy.

Observed failure mode:

- Multiple ADIAT jobs entered sidecar around the same time.
- Caller timed out after `ADIAT_ANALYSIS_TIMEOUT_SECONDS=300`.
- Sidecar request temp directories remained, proving request scopes never exited.
- One uvicorn thread stayed CPU-bound for days.
- `/healthz` timed out.
- Socket backlog/CLOSE_WAIT grew.
- Container became unhealthy.

## Target Batch Design

Move real batch analysis into dedicated GPL Dask worker containers.

Target flow:

```text
orchestrator
  -> Kafka/task ledger
  -> dask-dispatcher
  -> Dask scheduler
  -> dedicated adiat-gpl-batch-worker containers
  -> S3/MinIO source images
  -> ADIAT still-image algorithms
  -> result JSON
  -> CHRIS result listener / DB persistence
```

Key point: CHRIS private code schedules work and persists results. This public worker image executes ADIAT.

## Why Dask for Batch

Batch ADIAT work is finite and queueable:

- one mission/job has bounded source media
- worker returns one JSON result
- failures/retries fit the existing task ledger model
- capacity scales by adding worker containers
- existing Dask scheduler can route by resource key

Dask worker command shape:

```bash
dask-worker tcp://dask-scheduler:8786 \
  --resources adiat_analysis=1 \
  --nworkers 1 \
  --nthreads 1 \
  --worker-port 8790 \
  --no-nanny \
  --no-dashboard
```

Concurrency model:

- one Dask worker process = one ADIAT analysis slot
- `--nthreads 1` avoids concurrent ADIAT calls in one process
- scale by running more containers/processes
- Dask queue absorbs excess tasks
- CHRIS dispatcher can observe/backoff through its existing mechanisms

## GPL Boundary

Public GPL worker repo/image contains:

- ADIAT source/fork
- CHRIS ADIAT adapter code
- Dockerfile for the GPL worker image
- Dask callable
- optional HTTP compatibility service
- S3/MinIO fetch code
- ADIAT algorithm adapters
- result normalization

Private CHRIS repo contains only:

- task schema/payload contract
- dispatcher config
- image tag/digest reference
- deployment definitions
- result persistence logic
- UI/API logic

Communication boundary:

- JSON payloads
- S3/MinIO object references or presigned URLs
- JSON result objects

CHRIS private images must not install/import ADIAT modules.

## Repository Strategy

Do not add this repo as a submodule to CHRIS.

Use sibling checkouts for development:

```text
/home/joris/dev/chris
/home/joris/dev/adiat

/Users/joriskohlvanwijngaarden/dev/chris
/Users/joriskohlvanwijngaarden/dev/adiat
```

Default production path:

- build public worker image from this repo
- push image to registry
- CHRIS deployment references pinned image tag/digest

Optional local CHRIS compose override may build from sibling path:

```yaml
services:
  adiat-gpl-workers:
    build:
      context: ../adiat
      dockerfile: Dockerfile.chris
```

Keep that as local/dev convenience, not a private source dependency.

## Proposed Repo Additions

Keep upstream ADIAT tree mostly unchanged.

Add a CHRIS adapter layer at top level:

```text
chris_adiat_adapter/
  __init__.py
  analysis.py          # shared analyze(payload) implementation
  algorithms.py        # maps CHRIS profiles/options to ADIAT services
  batch_worker.py      # Dask callable run(payload) -> dict
  http_service.py      # optional FastAPI /healthz and /analyze compatibility
  s3_sources.py        # S3/MinIO fetch helpers
  schemas.py           # payload/result typing and validation
  timeouts.py          # subprocess/hard-timeout helpers if needed
  logging.py           # structured logging helpers
Dockerfile.chris
requirements-chris.txt
README-chris.md
```

Preferred executable modes:

```bash
python -m chris_adiat_adapter.http_service
python -m chris_adiat_adapter.batch_worker --self-test
```

or console script:

```bash
chris-adiat http
chris-adiat dask-worker
chris-adiat self-test
```

## Batch Payload Contract

Input should stay close to current CHRIS ADIAT task payload.

Example:

```json
{
  "task_id": "uuid",
  "job_id": "uuid",
  "request": {
    "profile": "search_rescue",
    "scope": {
      "mission_id": "uuid",
      "flight_id": "uuid"
    },
    "algorithms": [],
    "sources": [
      {
        "media_id": "uuid",
        "bucket": "account-...",
        "object_key": "processed/missions/.../RGB/RAW/image.jpg",
        "sensor_type": "rgb",
        "media_type": "raw",
        "content_type": "image/jpeg",
        "checksum": "...",
        "metadata": {
          "image_width": 4000,
          "image_height": 3000,
          "captured_at": "2026-06-09T01:05:58Z",
          "longitude": -16.9,
          "latitude": 32.6
        }
      }
    ]
  },
  "metadata": {
    "account_id": "uuid",
    "mission_name": "..."
  }
}
```

Recommended source access options:

1. Bucket/object key + S3 credentials in worker environment.
2. Presigned GET URLs generated by CHRIS.
3. Raw image bytes should be avoided for normal operation.

Initial implementation can use bucket/object key because current sidecar already does this.

## Batch Result Contract

Return shape should match current CHRIS worker adapter output as much as possible:

```json
{
  "status": "succeeded",
  "reason": null,
  "result": {
    "service_version": "chris-adiat-gpl-worker-0.1.0",
    "observations": [
      {
        "source_media_id": "uuid",
        "source_checksum": "...",
        "algorithm": "MRMap",
        "algorithm_version": "...",
        "algorithm_options": {},
        "detection_class": "adiat_detection",
        "source_pixel_polygon": [[120, 80], [160, 80], [160, 130], [120, 130]],
        "source_pixel_bbox": [120, 80, 40, 50],
        "source_center_pixel": [140, 105],
        "source_image_width": 4000,
        "source_image_height": 3000,
        "map_geometry": null,
        "geometry_quality": "image_only",
        "score": 0.82,
        "properties": {}
      }
    ]
  },
  "details": {
    "raw_observation_count": 1,
    "normalized_observation_count": 1
  },
  "metadata": {
    "source_count": 1
  },
  "error": null
}
```

Allowed statuses:

- `succeeded`
- `partial`
- `failed`
- `cancelled`

Common failure reasons:

- `not_configured`
- `invalid_payload`
- `source_fetch_failed`
- `algorithm_failed`
- `timeout`
- `no_sources`

## Algorithm Mapping

Current still-image profiles:

- `broad_scan`
- `search_rescue`
- future `wildfire`

Known current mappings from CHRIS sidecar:

RGB sources:

- `MRMap`
- `RXAnomaly`
- `AIPersonDetector`

Thermal sources:

- `ThermalAnomaly`
- `ThermalRange`

Known options from current sidecar:

- MRMap: segments `16`, threshold `150`, window `30`, LAB color space
- RXAnomaly: segments `16`, sensitivity `3`
- AIPersonDetector: confidence `50`, CPU-only default; requires `onnxruntime`

Known issue:

- Thermal SDK path in current image points at a Windows release path for `libdirp.so`; Linux runtime can fail thermal parsing.
- Treat thermal algorithm support as separate hardening work.

## Timeout and Isolation

Dask queueing alone does not kill native hangs.

Preferred initial batch worker safety:

- `--nthreads 1`
- one worker process per container or small `--nworkers N`
- hard timeout shorter than CHRIS task timeout
- optional child-process isolation per full analysis or per source/algorithm

Environment:

```env
ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS=270
ADIAT_SOURCE_TIMEOUT_SECONDS=120
ADIAT_ALGORITHM_TIMEOUT_SECONDS=90
```

If using subprocess isolation:

- parent process receives Dask task
- parent starts child process for ADIAT execution
- child writes result JSON to queue/temp file
- parent kills child on timeout
- parent returns clean `failed` result

This prevents a stuck native call from keeping a Dask worker process busy forever.

## HTTP Compatibility Mode

Keep optional HTTP mode for local compatibility and phased migration.

Endpoint:

```text
GET /healthz
POST /analyze
```

HTTP mode should call the same shared `analysis.run_batch(payload)` function as Dask mode.

If HTTP mode remains available, it needs explicit concurrency policy:

```env
ADIAT_MAX_CONCURRENT_ANALYSES=1
ADIAT_QUEUE_WAIT_SECONDS=2
ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS=270
```

Behavior:

- if busy, return `429` with `Retry-After`
- no unbounded concurrent `/analyze`
- health remains cheap and responsive
- `/healthz` reports busy/capacity, not S3/algorithm checks

Example health:

```json
{
  "status": "ok",
  "mode": "http",
  "busy": false,
  "max_concurrent_analyses": 1
}
```

## Docker Image

Image name examples:

```text
ghcr.io/mejor-technologies/chris-adiat-gpl-worker:<tag>
harbor.mejorlabs.com/chris/adiat-gpl-worker:<tag>
```

Do not use floating `latest` in AWS deployment.

Preferred tags:

- git SHA
- release-like build tag
- optional semantic adapter version

`Dockerfile.chris` should:

- start from Linux amd64 Python image
- install system deps needed by OpenCV/Qt/headless ADIAT
- install ADIAT requirements
- install `dask[distributed]`
- install `boto3` or S3 client deps
- install adapter package
- set `ADIAT_APP_DIR=/opt/adiat/app` or equivalent
- provide default command suitable for worker mode

Potential commands:

```bash
# Dask batch worker
chris-adiat dask-worker tcp://dask-scheduler:8786

# HTTP compatibility
chris-adiat http --host 0.0.0.0 --port 8092

# One-shot local test
chris-adiat analyze --payload /tmp/payload.json
```

## Local CHRIS Compose Target

New local service in CHRIS compose override:

```yaml
services:
  adiat-gpl-workers:
    image: ${ADIAT_GPL_WORKER_IMAGE:-chris-adiat-gpl-worker:local}
    build:
      context: ../adiat
      dockerfile: Dockerfile.chris
    environment:
      DASK_SCHEDULER_ADDRESS: ${DASK_SCHEDULER_ADDRESS:-tcp://dask-scheduler:8786}
      MEJOR_MINIO_ENDPOINT: ${MEJOR_MINIO_ENDPOINT:-http://minio:9000}
      MEJOR_MINIO_ACCESS_KEY: ${MEJOR_MINIO_ACCESS_KEY:-${MEJOR_MINIO_ROOT_USER:-miniadmin}}
      MEJOR_MINIO_SECRET_KEY: ${MEJOR_MINIO_SECRET_KEY:-${MEJOR_MINIO_ROOT_PASSWORD:-minioadmin}}
      MEJOR_MINIO_SECURE: ${MEJOR_MINIO_SECURE:-false}
      ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS: ${ADIAT_ANALYSIS_HARD_TIMEOUT_SECONDS:-270}
    command:
      - dask-worker
      - ${DASK_SCHEDULER_ADDRESS:-tcp://dask-scheduler:8786}
      - --name
      - ${ADIAT_GPL_WORKER_NAME:-adiat-gpl-worker}
      - --resources
      - adiat_analysis=${ADIAT_ANALYSIS_RESOURCE_UNITS:-1}
      - --nworkers
      - ${ADIAT_GPL_WORKER_COUNT:-1}
      - --nthreads
      - ${ADIAT_GPL_WORKER_THREADS:-1}
      - --memory-limit
      - ${ADIAT_GPL_WORKER_MEMORY_LIMIT:-0}
    depends_on:
      dask-scheduler:
        condition: service_healthy
      minio:
        condition: service_healthy
```

CHRIS private worker target must point at this public adapter callable, e.g.:

```env
ADIAT_DASK_WORKER_TARGET=chris_adiat_adapter.batch_worker:run
```

or dispatcher config can select it by environment.

## AWS Deployment Shape

AWS target:

- ECS service/task for `adiat-gpl-worker`
- same network path to Dask scheduler as existing CHRIS Dask workers
- no inbound public port required for Dask mode
- S3 read access to mission media only
- no CHRIS DB credentials unless needed later
- CloudWatch logs enabled
- desired count controls capacity

Example deployment config:

```env
ADIAT_GPL_WORKER_IMAGE=ghcr.io/mejor-technologies/chris-adiat-gpl-worker:<sha>
ADIAT_GPL_WORKER_DESIRED_COUNT=1
ADIAT_ANALYSIS_RESOURCE_UNITS=1
ADIAT_GPL_WORKER_THREADS=1
ADIAT_GPL_WORKER_MEMORY_LIMIT=0
```

Scaling model:

- one worker process/container = one analysis slot
- queue grows -> increase ECS desired count
- each worker advertises `adiat_analysis=1`
- Dask scheduler distributes tasks

## RTMP / Live Stream Support

ADIAT upstream has live/streaming support:

- `demo_rtmp_usage.py`
- `app/algorithms/streaming/ColorDetection`
- `app/algorithms/streaming/MotionDetection`
- RTMP and HTTP video source examples
- Flight Viewer / live WebRTC work exists on `dev`

Current CHRIS integration does not use this.

Current CHRIS ADIAT sidecar is batch still-image only:

```text
S3 image objects -> ADIAT still-image algorithms -> observations
```

Live stream target is a different product path:

```text
RTMP/WebRTC/HLS/video source
  -> frame sampling
  -> ADIAT streaming detector
  -> live detections
  -> Kafka/websocket/DB/event log
  -> CHRIS UI overlay/list/status
```

New live-stream pieces required:

- stream session model
- start/stop/status API
- stream source URL/secrets handling
- worker lifecycle and reconnect policy
- frame sampling config
- detection throttling/deduplication
- result transport
- persistence policy
- live UI status and detections
- georeferencing strategy if detections must appear on map

## Should RTMP Use Dask?

RTMP can use Dask, but it is not the best durable design.

Why normal Dask task is a bad fit:

- stream may run minutes/hours
- task may not return until stopped
- results are continuous, not one final return value
- cancellation/reconnect is lifecycle management, not simple retry
- scheduler can become a session manager accidentally

Possible Dask stream prototype:

```text
orchestrator start stream
  -> dask-dispatcher submits long-running Dask task
  -> task reads RTMP
  -> task emits detections to Kafka/HTTP callback
  -> stop stream cancels future/control message
```

If using Dask for streams:

- use separate resource `adiat_stream=1`
- one stream per worker process
- emit results externally; do not rely on Dask return value
- stop via explicit control channel plus future cancellation
- expect more brittle recovery semantics

Recommended durable live design:

```text
orchestrator
  -> stream session DB/API
  -> Kafka topic: adiat-stream-control
  -> adiat-gpl-stream-worker service
  -> RTMP source
  -> Kafka topic: adiat-stream-detections
  -> CHRIS websocket/UI + optional persistence
```

Use same public GPL image, different command:

```bash
chris-adiat batch-worker
chris-adiat stream-worker
```

## Two-Lane Architecture

Recommended final shape:

```text
Batch lane:
  orchestrator
    -> Kafka/task ledger
    -> dask-dispatcher
    -> Dask scheduler
    -> adiat-gpl-batch-worker
    -> S3 images
    -> result JSON

Live lane:
  orchestrator
    -> stream control API/Kafka
    -> adiat-gpl-stream-worker
    -> RTMP/WebRTC source
    -> live detections Kafka/websocket
```

One public repo/image can support both lanes.

## Observability

Batch logs should include:

- `task_id`
- `job_id`
- `profile`
- `source_count`
- `media_id`
- `sensor_type`
- `algorithm`
- start/end timestamps
- duration_ms
- timeout/failure reason

Recommended log events:

- `adiat.batch.accepted`
- `adiat.source.fetch_started`
- `adiat.source.fetch_completed`
- `adiat.algorithm.started`
- `adiat.algorithm.completed`
- `adiat.algorithm.failed`
- `adiat.batch.timeout`
- `adiat.batch.completed`

Live stream logs should include:

- `stream_id`
- `mission_id`
- source type/url host only, not secret-bearing full URL
- connect/disconnect/reconnect events
- frame rate/sample rate
- detection counts
- status heartbeats

## Security / Secrets

Worker should receive minimal secrets:

- S3 read access for relevant media buckets/prefixes
- optional S3 write access only if artifacts are written
- Kafka access only for stream worker if needed
- no CHRIS DB credentials by default
- no broad application secrets

Avoid logging:

- presigned URLs
- access keys
- RTMP credentials
- full secret-bearing stream URLs

## Testing Plan

Adapter unit tests:

- payload validation
- source normalization
- result normalization
- algorithm selection by profile/sensor type
- S3 source path parsing
- timeout failure shape

Integration tests:

- one local JPEG source -> result JSON
- missing source -> failed/partial result
- bad payload -> failed `invalid_payload`
- busy HTTP mode -> `429`
- Dask callable import smoke test

CHRIS-side tests:

- dispatcher submits ADIAT task with `adiat_analysis=1`
- result listener persists observations/detections
- fixture mode remains deterministic for release verifier
- no ADIAT import in private CHRIS packages

Live stream later:

- synthetic RTMP/video file source
- start/stop session
- reconnect failure
- detection event emission
- throttling/dedup behavior

## Migration Plan

Phase 1: Public batch worker skeleton

- create `chris_adiat_adapter`
- copy current sidecar analysis logic into shared `analysis.py`
- keep HTTP compatibility mode
- add Dask callable
- build local image
- run one payload against local MinIO media

Phase 2: CHRIS local Dask integration

- add local compose service for `adiat-gpl-workers`
- configure CHRIS dispatcher target to public callable
- disable real HTTP sidecar in main path
- keep fixture mode for deterministic local/dev verifier
- verify S&R repro mission completes

Phase 3: Hardening

- add subprocess/hard-timeout isolation
- structured logs
- concurrency/resource settings
- thermal SDK fix or explicit thermal disable/failure reason
- test contracts

Phase 4: AWS deployment

- publish image to registry
- add ECS service/task definition
- wire S3 permissions
- configure worker desired count
- verify Dask scheduler sees `adiat_analysis` resources

Phase 5: Live stream lane

- add `stream-worker` mode in same public image
- add CHRIS stream session/control API
- emit live detections to Kafka/websocket
- define persistence/georef policy

## Open Questions

- Registry: GHCR, Harbor, ECR, or multiple?
- Should production use bucket/object credentials or presigned URLs?
- Do we need to patch upstream ADIAT for Linux thermal SDK handling?
- Which ADIAT `dev` features are required for CHRIS batch path?
- Should `main` HDMI streaming fix be merged into `dev` before adapter work?
- What exact profile mapping should Search & Rescue use versus broad scan?
- Do live RTMP detections need map coordinates immediately, or is image/video-space detection enough for first version?

## Initial Recommendation

Start with batch Dask worker.

Do not start with RTMP.

Reason:

- fixes current unhealthy sidecar/concurrency failure
- uses existing CHRIS Dask structure
- creates public GPL image/source boundary
- gives AWS deployment shape
- keeps live stream path available as second command later

First implementation target:

```text
chris_adiat_adapter.analysis.run_batch(payload) -> dict
chris_adiat_adapter.batch_worker.run(payload) -> dict
chris_adiat_adapter.http_service /healthz /analyze
Dockerfile.chris
requirements-chris.txt
README-chris.md
```
