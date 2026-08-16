---
name: scene-generator
description: Design concrete, asset-first short-form video scenes from a Flick transcript or script. Use inside Flick after the transcript, aspect ratio, selected brand assets, and creative opinion are available, or when a user needs a scene plan, animation direction, pacing, or visual treatment for a short video.
---

# Scene Generator

Design scenes around the user's actual script, timestamps, assets, format, and creative opinion. Produce the proposed `flick-plan.md` only. Do not create `scene-spec.json`, Remotion code, or renders before the user approves the plan.

## Rules

- Use the source transcript timestamps when they exist.
- Make every scene show a concrete visual event: an asset reveal, crop, camera move, text transformation, interface action, chart, or illustration.
- Keep text concise and readable for the selected aspect ratio.
- Use motion to support the point; avoid motion that is merely decorative.
- Plan one visual focal point per beat and add a pattern interrupt only when the scene is long enough to need one.
- Record all creative selections in the user-facing Flick plan; do not hide them in implementation data.

## Output

For each scene, produce an approved scene name, transcript range, what is on screen, exact text, selected assets, sequential interaction, sound effect, audio-coupled idea, and transition. Give the user the complete plan before asking for approval.
