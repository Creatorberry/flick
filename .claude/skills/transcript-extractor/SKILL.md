---
name: transcript-extractor
description: Extract a timestamped transcript from a local video/audio file or a public video URL for Flick and other video workflows. Use whenever a user supplies video or audio and needs a transcript, captions, dialogue, or timing data for animation.
---

# Transcript Extractor

Create a portable `transcript.json` with `text`, `language`, and timestamped `segments` and `words`. Do not emit only plain text.

## Source selection

1. Prefer a local video/audio file when supplied.
2. For a public URL, download audio with `yt-dlp`.
3. If download fails because authentication is required, ask the user to upload the video or provide an accessible local file. Do not bypass access controls.

## Transcribe

Use FFmpeg to create a 16 kHz mono WAV when the input is video. Use Whisper with a model appropriate to the audio quality. Preserve original-language speech unless the user asks for translation.

Return timestamped JSON in this shape:

```json
{
  "source": "input filename or URL",
  "language": "en",
  "text": "Full transcript.",
  "segments": [{"startMs": 0, "endMs": 1200, "text": "First line."}],
  "words": [{"startMs": 0, "endMs": 220, "text": "First"}]
}
```

Flag uncertain audio rather than inventing words. Ask the user to correct any uncertain opening or proper names before the transcript is used for scene timing.
