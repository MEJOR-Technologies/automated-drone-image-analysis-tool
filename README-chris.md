# CHRIS ADIAT GPL Worker

This repository can build a public GPL-compatible worker image for CHRIS batch ADIAT analysis.

The worker keeps the private CHRIS repository out of the ADIAT import path. CHRIS submits JSON payloads and object references through Dask; this image fetches sources, runs ADIAT algorithms, and returns normalized observation JSON.

## Build

```bash
docker build -f Dockerfile.chris -t chris-adiat-gpl-worker:local .
```

## Hosted Image

GitHub Actions publishes this worker to GitHub Container Registry:

```text
ghcr.io/mejor-technologies/chris-adiat-gpl-worker:<git-sha>
```

Use immutable digests for CHRIS deployments:

```text
ghcr.io/mejor-technologies/chris-adiat-gpl-worker@sha256:<digest>
```

The GHCR package is public, so AWS ECS can pull it without image-pull
credentials. Deploy only an immutable digest.

## Smoke Test

```bash
python -m chris_adiat_adapter.cli self-test
```

## Dask Worker

```bash
dask-worker tcp://dask-scheduler:8786 \
  --resources adiat_analysis=1 \
  --nworkers 1 \
  --nthreads 1 \
  --worker-port 8790 \
  --no-nanny \
  --no-dashboard
```

## One-Shot Analyze

```bash
python -m chris_adiat_adapter.cli analyze --payload /path/to/payload.json
```

## Live Progress

During Dask execution, the worker emits `algorithm_started` before each
detector begins, `algorithm_terminal` after it finishes, and `source_terminal`
after every selected algorithm reaches a terminal outcome for that photo. The
events include measured detector durations so CHRIS can estimate smooth motion
within the active detector stage. Two algorithms over 28 photos therefore
expose 56 detector markers while retaining 28 authoritative source-completion
units.

Events contain the fenced task/attempt identity, source identity and checksum,
expected, processed, and completed algorithms, cumulative detector and source
counts, and their totals. Deadline-skipped photos emit failed terminal events,
not completed events. Progress delivery is best effort and never changes the
final result. CHRIS validates and persists accepted checkpoints; the final
processed-source attestation remains authoritative.

The worker runs on Python 3.12 with Dask/Distributed 2025.11.0. The
`search_rescue` profile accepts projected RAW RGB sources using
`AIPersonDetector`, `MRMap`, and `RXAnomaly`, plus bounded thermal RAW sources
using the thermal algorithms. Video and live RTMP inputs are rejected.

Runtime limits are 100 sources per batch, 60,000,000 decoded pixels per source,
4,096 detected-pixel samples and 64 contour points per AOI, 1,000 retained
observations per detector per source photo, a 100,000-observation diagnostic
batch ceiling, a source-count-derived batch deadline, and one active task per
container. The Dask dispatcher gzip-compresses large inline results before
publishing them to Kafka.
Source objects require a valid SHA256 checksum and are fetched
read-only from S3 or MinIO. JPEG, DJI MPO-encoded JPEG, PNG, TIFF, and WebP are
supported.
