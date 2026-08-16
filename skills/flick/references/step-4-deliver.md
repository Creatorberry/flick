# Step 4: Preview, revise, and save

Render every scene before review:

```text
node <flick-skill>/scripts/render-scene.mjs --project <output-directory> --composition <scene-id> --name <approved-scene-name>
```

This writes `<output-directory>/scenes/<approved-scene-name>/<approved-scene-name>.mp4`.

Start Studio from `<output-directory>/remotion/`:

```text
npm run studio
```

Only after it succeeds, give the user the Studio URL and say:

> Watch it and tell me what you think. What should change, if anything?

On feedback, revise only the affected scene, render that scene again, and reopen Studio. After acceptance, ask:

> Which scene animations should I save as reusable assets?

For each selected scene, run:

```text
node <flick-skill>/scripts/save-animation.mjs --project <output-directory> --name <approved-scene-name> --component <component.tsx> --preview <scene.mp4>
```

This saves the component, rendered preview, and metadata in `saved-animations/<approved-scene-name>/`. Do not save private brand assets unless the user explicitly requests it.
