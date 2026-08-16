---
name: flick
description: Turn a supplied video, public video URL, or transcript into original short-form scene animations with Remotion. Use when a user says "/flick", "$flick", "animate this", or asks to turn a video, transcript, or script into motion animation. Extract a timestamped transcript first when the source is video.
---

# /flick

Flick is the only public entry skill. Run its transcription, planning, Remotion build, preview, revision, and reusable-animation workflow inside this skill. Do not require the user to install or invoke supporting skills.

## Invocation and workspace

Recognize `/flick` in Claude Code and `$flick` in Codex. Create `flick-output/` in the current project. If it already exists, create `flick-output-YYYY-MM-DD-HHmmss/` and use that directory for the complete run.

Run:

```text
node <flick-skill>/scripts/bootstrap.mjs --project <output-directory>
```

Bootstrap creates `brand-assets/`, `scenes/`, `saved-animations/`, and `remotion/`; it installs Remotion, bundled FFmpeg, Whisper, yt-dlp, and Flick's bundled sound effects. It requires Node.js 20+, Python 3, and network access. If Node or Python is missing, use the install guidance printed by bootstrap and ask before running a system installer.

Read the workflow reference named for each stage:

1. [Transcript](references/step-1-transcript.md)
2. [Plan](references/step-2-plan.md)
3. [Compose](references/step-3-compose.md)
4. [Preview, revision, and delivery](references/step-4-deliver.md)

## Hard rules

- The transcript is always the script Flick animates.
- Ask only for aspect ratio, brand assets, and the user's opinion after the transcript exists.
- Use transcript timings unless the user explicitly asks to alter duration.
- Do not add background music.
- Use bundled sound effects only when they match a visible event.
- Do not build before the user approves `flick-plan.md`.
- Name scene folders, components, and renders from approved scene names; never invent generic output names.
- Do not claim Studio or a preview opened unless its command succeeded.
