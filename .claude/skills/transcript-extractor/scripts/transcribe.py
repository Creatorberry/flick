#!/usr/bin/env python3
"""Create Flick's portable timestamped transcript JSON from local media."""

import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path


def milliseconds(seconds):
    return round(float(seconds) * 1000)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("source", help="Local audio or video file")
    parser.add_argument("--output", default="transcript.json")
    parser.add_argument("--model", default="base")
    parser.add_argument("--language")
    parser.add_argument("--translate", action="store_true")
    parser.add_argument("--ffmpeg", default="ffmpeg")
    args = parser.parse_args()

    source = Path(args.source).resolve()
    if not source.is_file():
        raise SystemExit(f"Media file not found: {source}")
    ffmpeg = args.ffmpeg
    if not Path(ffmpeg).is_file() and not shutil.which(ffmpeg):
        raise SystemExit("FFmpeg was not found. Run Flick bootstrap first.")

    with tempfile.TemporaryDirectory(prefix="flick-transcribe-") as tmp:
        wav = Path(tmp) / "audio.wav"
        subprocess.run(
            [ffmpeg, "-y", "-i", str(source), "-vn", "-ac", "1", "-ar", "16000", "-c:a", "pcm_s16le", str(wav)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )

        try:
            import whisper
        except ImportError as error:
            raise SystemExit("Install openai-whisper before transcribing: pip install openai-whisper") from error

        model = whisper.load_model(args.model)
        result = model.transcribe(
            str(wav),
            language=args.language,
            task="translate" if args.translate else "transcribe",
            word_timestamps=True,
            verbose=False,
        )

    segments = [
        {"startMs": milliseconds(segment["start"]), "endMs": milliseconds(segment["end"]), "text": segment["text"].strip()}
        for segment in result["segments"]
    ]
    words = [
        {"startMs": milliseconds(word["start"]), "endMs": milliseconds(word["end"]), "text": word["word"].strip()}
        for segment in result["segments"]
        for word in segment.get("words", [])
        if word["word"].strip()
    ]
    payload = {
        "source": str(source),
        "language": result.get("language"),
        "text": result["text"].strip(),
        "segments": segments,
        "words": words,
    }
    Path(args.output).write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {args.output} ({len(segments)} segments, {len(words)} words)")


if __name__ == "__main__":
    main()
