# Remotion Composition Brief Template

Write `<output-directory>/remotion-brief.md` after the user approves `flick-plan.md` and before writing scene components. This is Flick's handoff to the Remotion implementation. It must preserve the approved plan; do not add new creative direction.

```md
# Remotion Composition Brief: Flick

## Objective
Create the approved short-form scene animations from the timestamped transcript.

## Output
- Remotion project: `<output-directory>/remotion/`
- Format: [approved aspect ratio] — [width]x[height] at [fps] fps
- Rendered scenes:
  - `[approved-scene-name]` → `scenes/[approved-scene-name]/[approved-scene-name].mp4`

## Source Material
- Transcript: `transcript.json`
- Approved plan: `flick-plan.md`
- Selected brand assets: [specific files, or none]
- Available sound effects: `remotion/public/sounds/`

## Creative Direction
- User direction: [their answer to “What do you think?”]
- Interpretation: [how that direction affects visual language and restraint]
- Avoid: generic filler visuals, unapproved assets, background music

## Scene Compositions

### [Approved scene name]
- Composition ID: `[approved-kebab-name]`
- Component: `[ApprovedSceneName]`
- Transcript: [exact line(s)]
- Time: [start timestamp]–[end timestamp]
- Output: `scenes/[approved-scene-name]/[approved-scene-name].mp4`
- What is on screen: [approved visual composition]
- Text on screen: [exact text, or none]
- Brand assets / supplied material: [specific files, or none]
- Sequential / interaction: [what appears or changes, in exact order; or none]
- Sound effect: [file/type and visible trigger; or none]
- Audio-coupled idea: [visual timing that must align to the sound; or none]
- Transition: [entry/exit treatment]

## Remotion Instructions
- Build one dedicated React component for each approved scene under `src/scenes/`.
- Register each scene as its own `<Composition>` in `src/Root.tsx`.
- Do not create a combined or all-scenes composition.
- Derive frame timing from the approved transcript timestamps and `scene-spec.json`.
- Use frame-driven Remotion motion. Build the approved visual idea; do not fall back to generic title-card layouts.
- Use only selected brand assets from `public/brand-assets/` and bundled SFX from `public/sounds/`.
- Do not add background music. Use an SFX only when it supports the visible action in the approved scene.
- Keep on-screen text readable and render each scene before review.
```

`scene-spec.json` is the structured companion to this brief. It must match the composition IDs, component names, timestamp/frame ranges, selected asset paths, and sound-effect timing stated above.
