# Flick

Turn a source video or script into a reviewable short-form animation with an AI video director.

Flick is one open-source skill for Codex and Claude Code. It transcribes a supplied video when needed, asks the creative questions that shape the edit, builds a portable Remotion project, and opens Remotion Studio for review.

## The workflow

1. Give Flick a video/link, transcript, or script.
2. If needed, Flick uses `transcript-extractor` to create a timestamped transcript.
3. Flick asks for aspect ratio, brand assets, and your creative opinion.
4. Approve the scene plan, then build and preview it in Remotion Studio.
5. Recommend changes and save selected animations as reusable components.

## Examples

See the [Flick examples gallery](examples/) for six animations made with Flick, including [China OCR hook](examples/china-ocr-hook/), [Claude token waste](examples/claude-token-waste/), and [Gstack workflow](examples/workflow-start-to-finish/).

## Install

### Claude Code

```text
/plugin marketplace add Creatorberry/flick
/plugin install flick@flick
```

Then run `/flick`.

### Codex

```text
npx skills add Creatorberry/flick --skill flick --agent codex --global --yes
```

Then ask: `Use $flick to animate this.`

The installer copies Flick. On the first `/flick` run, Flick creates a local project and installs Remotion, a bundled FFmpeg binary, Whisper, and yt-dlp automatically. Node.js 20+, Python 3, and network access are required for that first run.

## Use

In Claude Code:

```text
/flick
```

In Codex:

```text
Use $flick to animate this script. I have a logo and screenshots to use.
```

Flick creates a timestamped workspace containing `brand-assets/`, `saved-animations/`, a timestamped `transcript.json` when needed, `scene-spec.json`, scene previews, and a runnable Remotion project.

## Requirements

- Node.js 20+
- Python 3
- Network access for the first-run dependency install

## Privacy and source material

Use only video, images, fonts, and audio that you have the right to use. Brand assets stay inside your local Flick workspace and are not committed by default.

## Contributing

Flick welcomes showcase examples made with Flick. Creatorberry maintains the core skills, scripts, and workflow. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
