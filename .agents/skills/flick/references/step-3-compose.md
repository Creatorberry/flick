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
