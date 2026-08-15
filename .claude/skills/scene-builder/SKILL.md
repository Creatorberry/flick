---
name: scene-builder
description: Build an approved Flick scene specification into a portable Remotion project, render previews, and open Remotion Studio for review. Use after a Flick scene plan is approved or when a user asks to build, preview, render, or revise an approved animation scene.
---

# Scene Builder

Build only from an approved `scene-spec.json`. Use the generated Flick Remotion project; never depend on a user's private project layout.

## Build

1. Read the approved scene spec and confirm referenced assets exist in `brand-assets/`.
2. Add scene components under `src/scenes/` and register them in the root composition.
3. Use real user assets rather than recreating screenshots or product UIs.
4. Render the affected scene before a complete video.
5. Start Studio with `npx remotion studio src/index.tsx` from the Flick project and provide its URL for review.

## Verify

Check an opening, middle, and ending frame of each changed scene. For timed transcript edits, verify the visual beat begins within the intended spoken segment. On feedback, revise the affected scene first and preview again.
