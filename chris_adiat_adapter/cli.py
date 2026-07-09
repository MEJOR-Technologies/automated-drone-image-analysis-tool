import argparse
import json
import sys

from chris_adiat_adapter.analysis import run_batch


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

    print(json.dumps(result, sort_keys=True))
    return 0 if result.get("status") in {"succeeded", "partial"} else 1


def _run_self_test():
    payload = {
        "task_id": "self-test",
        "request": {
            "profile": "broad_scan",
            "sources": [
                {
                    "media_id": "self-test-source",
                    "local_path": "/dev/null",
                    "sensor_type": "rgb",
                }
            ],
        },
    }

    return run_batch(
        payload,
        source_loader=lambda source, work_dir: source["local_path"],
        algorithm_runner=lambda algorithm_name, image_path, source, work_dir: [
            {"center": [0, 0], "radius": 1, "detected_pixels": [[0, 0]]}
        ],
    )


if __name__ == "__main__":
    sys.exit(main())
