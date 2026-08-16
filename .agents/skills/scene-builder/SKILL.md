---
name: scene-builder
description: Build approved Flick scene compositions into a portable Remotion project, render previews, and open Remotion Studio for review. Use inside Flick after `flick-plan.md`, `remotion-brief.md`, and `scene-spec.json` are approved and available, or when a user asks to build, preview, render, or revise an approved animation scene.
---

# Scene Builder

Build only after `flick-plan.md` is approved. Read `remotion-brief.md` for the approved creative contract and `scene-spec.json` for exact IDs, timing, frames, component names, assets, and SFX timing. Use the generated Flick Remotion project; never depend on a user's private project layout.

## Build

1. Confirm the approved plan, brief, and scene spec agree; confirm referenced assets exist in `brand-assets/`.
2. Add one dedicated component per approved scene under `src/scenes/` and register every scene independently in `Root.tsx`. Do not create a combined composition.
3. Use real user assets rather than recreating screenshots or product UIs.
4. Use no background music. Add an SFX only when it supports the approved visible action.
5. Render every affected scene.
6. Start Studio with `npx remotion studio src/index.tsx` from the Flick project and provide its URL for review.

## Verify

Before presenting a scene, verify:

- the plan, brief, and spec agree on the scene ID, component name, transcript timing, assets, and SFX;
- the composition has the approved aspect ratio and frame duration;
- text is readable and only approved assets are used;
- no background music exists and every SFX supports a visible action;
- TypeScript passes and the named Remotion composition renders successfully;
- an opening, middle, and ending frame have been inspected;
- the MP4 exists at `scenes/[approved-scene-name]/[approved-scene-name].mp4`.

For timed transcript edits, verify the visual beat begins within the intended spoken segment. On feedback, revise the affected scene first and preview again.
