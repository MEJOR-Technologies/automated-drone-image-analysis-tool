import argparse
import json
import sys
from pathlib import Path

from PIL import Image

from chris_adiat_adapter.analysis import run_batch
from chris_adiat_adapter.algorithms import _service_class_for_algorithm


def main(argv=None):
    parser = argparse.ArgumentParser(prog="chris-adiat")
    subparsers = parser.add_subparsers(dest="command", required=True)

    analyze_parser = subparsers.add_parser("analyze")
    analyze_parser.add_argument("--payload", required=True)

    subparsers.add_parser("self-test")

    args = parser.parse_args(argv)
    if args.command == "self-test":
        result = _run_self_test()
    else:
        with open(args.payload, "r", encoding="utf-8") as payload_file:
            payload = json.load(payload_file)
        result = run_batch(payload)

    print(json.dumps(result, sort_keys=True, separators=(",", ":")))
    return 0 if result.get("status") in {"succeeded", "partial"} else 1


def _run_self_test():
    for algorithm_name in ("MRMap", "RXAnomaly"):
        _service_class_for_algorithm(algorithm_name)

    payload = {
        "task_id": "self-test",
        "request": {
            "profile": "search_rescue",
            "sources": [
                {
                    "media_id": "self-test-source",
                    "bucket": "self-test",
                    "object_key": "source.jpg",
                    "sensor_type": "rgb",
                    "media_type": "raw",
                    "content_type": "image/jpeg",
                    "checksum_sha256": "0" * 64,
                    "projection_footprint": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [4.0, 52.0],
                                [4.1, 52.0],
                                [4.1, 52.1],
                                [4.0, 52.1],
                                [4.0, 52.0],
                            ]
                        ],
                    },
                }
            ],
        },
    }

    return run_batch(
        payload,
        source_loader=_self_test_source_loader,
        source_timeout_seconds=60,
        batch_timeout_seconds=120,
    )


def _self_test_source_loader(source, work_dir):
    image_path = Path(work_dir) / "self-test.jpg"
    image = Image.new("RGB", (64, 64))
    image.putdata(
        [
            ((x * 4) % 256, (y * 4) % 256, ((x + y) * 2) % 256)
            for y in range(64)
            for x in range(64)
        ]
    )
    image.save(image_path, format="JPEG")
    return str(image_path)


if __name__ == "__main__":
    sys.exit(main())
