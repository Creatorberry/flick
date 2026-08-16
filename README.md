# Flick

Turn a source video or script into a reviewable short-form animation with an AI video director.

Flick is an open-source skill pack for Codex and Claude Code. It transcribes a supplied video when needed, asks the creative questions that shape the edit, writes a portable scene spec, builds a Remotion project, and opens Remotion Studio for review.

## The workflow

1. Give Flick a video/link, transcript, or script.
2. If needed, Flick uses `transcript-extractor` to create a timestamped transcript.
3. Flick asks for aspect ratio, brand assets, and your creative opinion.
4. Approve the scene plan, then build and preview it in Remotion Studio.
5. Recommend changes and save selected animations as reusable components.

## Examples

See the [Flick examples gallery](examples/) for six animations made with Flick, including [China OCR hook](examples/china-ocr-hook/), [Claude token waste](examples/claude-token-waste/), and [Gstack workflow](examples/workflow-start-to-finish/).

## Install

Install the `flick`, `transcript-extractor`, `scene-generator`, and `scene-builder` skills from this repository with your agent's skills installer. The repository exposes the canonical skills in `skills/`; `.agents/skills/` and `.claude/skills/` point to the same sources for Codex and Claude Code discovery.

## Use

Ask your agent:

```text
Use Flick to turn this video into a 9:16 animated short.
```

Or start with a script:

```text
Use Flick to animate this script. I have a logo and screenshots to use.
```

Flick creates a `flick-project/` workspace containing `brand-assets/`, `saved-animations/`, a timestamped `transcript.json`, `scene-spec.json`, and a runnable Remotion project.

## Requirements

- Node.js 20+
- FFmpeg on `PATH`
- Remotion (installed by the generated project)
- `yt-dlp` and Whisper for video-link transcription

## Privacy and source material

Use only video, images, fonts, and audio that you have the right to use. Brand assets stay inside your local Flick workspace and are not committed by default.

## Contributing

Flick welcomes showcase examples made with Flick. Creatorberry maintains the core skills, scripts, and workflow. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
