# Step 4: Validate, preview, revise, and save

## Validate

Complete the Step 3 self-review checklist for every scene before starting Studio. Do not share a Studio URL until each named scene composition has rendered successfully.

Render every scene before review:

```text
node <flick-skill>/scripts/render-scene.mjs --project <output-directory> --composition <scene-id> --name <approved-scene-name>
```

This writes `<output-directory>/scenes/<approved-scene-name>/<approved-scene-name>.mp4`.

## Preview and revise

Start Studio from `<output-directory>/remotion/`:

```text
npm run studio
```

Only after it succeeds, give the user the Studio URL and say:

> Watch it and tell me what you think. What should change, if anything?

On feedback, revise only the affected scene, render that scene again, repeat its self-review, and reopen Studio. After acceptance, create a poster for each approved scene.

## Poster frame

Choose each scene's strongest **settled** visual beat: text fully readable, the focal action complete, and no transition in progress. Do not use a blank opening frame, an animation mid-state, or an arbitrary timestamp.

Create the poster:

```text
node <flick-skill>/scripts/create-poster.mjs --project <output-directory> --name <approved-scene-name> --timestamp <settled-seconds>
```

This writes `<output-directory>/scenes/<approved-scene-name>/poster.jpg`. It is the preview image for the scene, its reusable saved asset, and a possible gallery thumbnail. Do not replace or alter the first frame of the MP4.

## Save reusable animations

After posters are created, ask:

> Which scene animations should I save as reusable assets?

For each selected scene, run:

```text
node <flick-skill>/scripts/save-animation.mjs --project <output-directory> --name <approved-scene-name> --component <component.tsx> --preview <scene.mp4> --poster <poster.jpg>
```

This saves the component, rendered preview, poster, and metadata in `saved-animations/<approved-scene-name>/`. Do not save private brand assets unless the user explicitly requests it.

## Final delivery

Tell the user:

- the path to every rendered scene MP4;
- the path to every `poster.jpg`;
- which scenes were saved under `saved-animations/`;
- that a future revision changes only the named scene.
