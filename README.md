# Flick

![Flick — Your script, in motion](https://raw.githubusercontent.com/Creatorberry/flick/6f607b47f6f2e2a0504417607d58c946da58dadc/assets/flick-hero.gif)

Turn a video, link, or transcript into original short-form scene animations with an AI motion director.

An open-source project from [Creatorberry](https://www.creatorberry.com/?utm_source=github&utm_medium=opensource&utm_campaign=flick).

## What Flick does

```text
video or link → timestamped transcript
transcript → aspect ratio + brand assets + your opinion
approved scene plan → named Remotion scene animations
Studio preview → feedback → reusable scene animations
```

Flick creates a timestamped transcript from a video or public link. If you paste a transcript, that becomes the script Flick animates. It then asks only for your aspect ratio, selected brand assets, and creative opinion before it plans the scenes.

There is no background music. Flick uses bundled sound effects only when they match an on-screen action.

## Install

### Claude Code

```text
/plugin marketplace add Creatorberry/flick
/plugin install flick@flick
```

Then run `/flick`.

### Updates

To receive Flick updates automatically, open `/plugin`, choose **Marketplaces**, select **flick**, and enable auto-update. Claude Code will check for updates when it starts; run `/reload-plugins` when it asks you to activate an update.

To update manually instead:

```text
/plugin update flick@flick
/reload-plugins
```

### Codex

```text
npx skills add Creatorberry/flick --skill flick --agent codex --global --yes
```

Then ask: `Use $flick to animate this.`

Update later:

```text
npx skills update
```

## First run

The first Flick run creates a local `flick-output/` workspace and installs:

- Remotion
- a bundled FFmpeg binary
- Whisper
- yt-dlp
- Flick's bundled sound effects

It needs Node.js 20+, Python 3, and network access. If Node or Python is missing, Flick tells you how to install it and asks before it runs a system installer.

## The output

Each Flick run uses one local folder:

```text
flick-output/
  transcript.json
  flick-plan.md
  remotion-brief.md
  scene-spec.json
  brand-assets/
  remotion/
  scenes/
    [approved-scene-name]/
      [approved-scene-name].mp4
      poster.jpg
```

`flick-plan.md` is the compact scene plan you approve. `remotion-brief.md` and `scene-spec.json` are the build instructions. Each approved transcript scene becomes a separately named Remotion animation.

## Reusable animation library

Flick installs editable Remotion templates in [`skills/flick/saved-animations/`](skills/flick/saved-animations/). Before building, Flick reads that folder's catalog and reuses a template only when its visual pattern clearly fits the requested scene.

## Review and reuse

Flick renders each scene, opens the individual scene compositions in Remotion Studio, and asks what should change. It revises only the scene you mention. Once you approve, Flick asks which scene animations you want saved as reusable assets.

## Start with the right source

Flick turns source material into motion animation. If you need to find source content or develop an idea first, [Creatorberry](https://www.creatorberry.com/?utm_source=github&utm_medium=opensource&utm_campaign=flick) helps you find what is viral, script it, and post it.

## Examples

See the [Flick examples gallery](examples/) for six animations made with Flick, including [China OCR hook](examples/china-ocr-hook/), [Claude token waste](examples/claude-token-waste/), and [Gstack workflow](examples/workflow-start-to-finish/).

## Privacy and source material

Use only video, images, fonts, audio, and brand assets that you have the right to use. Flick workspaces remain local and are ignored by default.

## Contributing

Flick welcomes showcase examples made with Flick. Creatorberry maintains the core skills, scripts, and workflow. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT

---

Built by [Creatorberry](https://www.creatorberry.com/?utm_source=github&utm_medium=opensource&utm_campaign=flick).
