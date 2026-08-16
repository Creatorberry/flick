# Step 3: Hand off to Remotion

After approval, read [remotion-brief-template.md](remotion-brief-template.md) and write two files:

```text
<output-directory>/remotion-brief.md
<output-directory>/scene-spec.json
```

`remotion-brief.md` is the build handoff. Use the bundled template exactly: it states the approved format, selected assets, scene names, transcript timing, visual animation requirements, and sound-effect requirements. It does not add new creative direction.

`scene-spec.json` is the structured technical version of the approved plan. Each scene must include:

```json
{
  "id": "approved-kebab-name",
  "name": "Approved scene name",
  "transcript": "Exact transcript line(s)",
  "startMs": 0,
  "endMs": 0,
  "from": 0,
  "durationInFrames": 0,
  "componentName": "ApprovedSceneName",
  "assets": [],
  "visualDescription": "",
  "soundEffects": []
}
```

Build components in `<output-directory>/remotion/src/scenes/`. Use frame-driven Remotion motion only. Copy only selected user assets into `remotion/public/brand-assets/` when needed. Bundled sound effects are in `remotion/public/sounds/`.

Sync the approved spec:

```text
node <flick-skill>/scripts/sync-scene-spec.mjs --project <output-directory>
```

Create one dedicated composition per approved scene. Register each component in `Root.tsx` and do not create an all-scenes composition. Do not add background music.

## Call Remotion

After `flick-plan.md`, `remotion-brief.md`, `scene-spec.json`, and selected assets exist:

1. Build one custom React component for every approved scene under `<output-directory>/remotion/src/scenes/`.
2. Register every component as its own named Remotion composition in `<output-directory>/remotion/src/Root.tsx`.
3. Copy only selected brand assets into `remotion/public/brand-assets/`.
4. Use the approved transcript timing, visual direction, interaction order, and SFX triggers. Do not add new creative direction.
5. Render each named scene with `render-scene.mjs` before presenting it to the user.

Flick owns the approved transcript, plan, composition brief, and scene specification. Remotion owns the component code, frame-driven motion, composition registration, Studio preview, and scene render.

## Self-review checklist

Before presenting any scene, verify:

- [ ] `flick-plan.md` was approved.
- [ ] `remotion-brief.md` and `scene-spec.json` agree on the scene ID, component name, transcript timing, assets, SFX, and output name.
- [ ] The component is registered as an independent named composition in `Root.tsx`.
- [ ] The composition uses the approved aspect ratio, dimensions, FPS, and transcript-derived frame duration.
- [ ] Only approved brand assets are used and all on-screen text is readable.
- [ ] There is no background music; every SFX supports a visible approved action.
- [ ] `npx tsc --noEmit` passes from `<output-directory>/remotion/`.
- [ ] The named Remotion composition renders successfully.
- [ ] Opening, middle, and ending frames were inspected for timing, visual continuity, and text readability.
- [ ] `<output-directory>/scenes/[approved-scene-name]/[approved-scene-name].mp4` exists.
- [ ] Remotion Studio starts successfully before its URL is shared.
