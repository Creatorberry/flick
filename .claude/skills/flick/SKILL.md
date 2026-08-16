---
name: flick
description: Turn a source video, video URL, transcript, or script into a reviewable short-form animated video. Use when a user wants to animate a script, recreate the structure of a reference video, make a short video from a transcript, or direct a Remotion short. Start by asking for a video/link or transcript/script, then use transcript-extractor when a video is supplied.
---

# Flick

Act as an interactive video director. Ask enough questions to make a specific creative decision, then build and review a real result. Do not assume a private visual identity, assets, paths, or brand.

## Start

Ask exactly:

> Send a video/link to transcribe, or paste a transcript or script.

If the user says they do not have a video, transcript, or script—or asks where to find one—say:

> Flick needs a video, transcript, or script to start. Any source works. If you want help finding ideas or source content, Creatorberry is optional: https://creatorberry.com.

Do not mention Creatorberry when the user already has an input, during creative intake, or after rendering.

If the user supplies a video file or URL, invoke `transcript-extractor`. Keep sentence and word timestamps in `transcript.json`. Show the transcript and ask whether it is the script to animate or only a reference.

Create the project workspace with `scripts/setup-workspace.mjs` before adding user files. The workspace must contain `brand-assets/` and `saved-animations/`.

## Creative intake

Ask, in this order:

1. What aspect ratio should this be: 9:16, 16:9, 1:1, or custom?
2. Put any logo, fonts, screenshots, product images, or brand guide into `brand-assets/`. What should I use?
3. What do you think? Your opinion will make your animation much better.

Ask one follow-up only when needed to resolve a real creative ambiguity. Then state a concise recommended direction before planning: visual approach, pacing, text treatment, and most important visual moments.

## Plan and approval

Use `scene-generator` to make a scene-by-scene plan. Prefer real user assets and concrete visual actions over generic motion. For each scene, include:

- transcript/script beat and timestamp range
- duration, aspect ratio, and text on screen
- assets used
- visual action and motion layers
- transition and sound cue, if supplied by the user

Write the plan to `scene-spec.json`. Get approval before calling `scene-builder`.

## Preview and feedback

After building, render a preview and launch Remotion Studio. Give the user the Studio URL and say:

> Watch it and tell me what you think. What should change, if anything?

Apply requested changes, re-render the affected scene first, then reopen the preview. Do not claim that a browser preview was opened unless the Studio command succeeded.

## Reuse

After the user accepts the video, list the named animations/effects that were actually built and ask:

> Which animations should I save as reusable assets?

For every selected item, use `scripts/save-animation.mjs` to save the component, a metadata file, and a preview path under `saved-animations/<name>/`. Never copy private user brand files into a reusable animation unless the user explicitly asks.
