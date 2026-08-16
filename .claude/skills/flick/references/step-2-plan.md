# Step 2: Write the Flick plan

Write `<output-directory>/flick-plan.md` before writing Remotion code. This is the user-facing creative contract. Keep it compact. State what the animation must show, not React, frame, or implementation details.

## Structure of `flick-plan.md`

```md
# Flick Plan

## Transcript
[The transcript Flick will animate. Include timestamps when available.]

## Format
[Approved aspect ratio and dimensions.]

## Brand assets
[Only user-supplied assets selected for this animation.]

## Creative direction
[The user's answer to “What do you think?” and Flick's concise interpretation.]

## Storyboard

### Scene 1 — [approved scene name] — [transcript timestamp range]

Transcript:
[Exact transcript line(s).]

What's on screen:
[The full visual composition the viewer sees.]

Text on screen:
[Exact text shown, or “none.”]

Brand assets / supplied material:
[Specific user-supplied files to use, or “none.”]

Sequential / interaction:
[What appears one by one, is typed, clicks, swipes, counts,
transforms, reveals, or exits; or “none.”]

Sound effect:
[The library sound or sound type and its visible trigger; or “none.”]

Audio-coupled idea:
[The visual event that must sync to that sound; or “none.”]

Transition:
[How this scene moves to the next scene.]

### Scene 2 — [approved scene name] — [transcript timestamp range]
...
```

## Planning scenes from the transcript

Split scenes from natural transcript beats. The transcript defines spoken timing; do not ask for a duration or force a fixed scene length.

For every transcript line, plan a visual proof of what that line says. The scene must make the spoken idea clearer, not merely decorate it.

```text
Transcript line → visual proof → next transcript line → next visual proof
```

Do not ask the user to identify the hook, core message, or ending. Derive the scene sequence from the transcript and the user's existing creative direction.

## Choosing what to show

Choose the visual source for every scene in this order:

1. **Use supplied material.** Use the user's logo, screenshots, product images, reference images, brand assets, or other supplied source.
2. **Animate supplied material.** Recreate or transform a supplied screenshot, UI, image, graph, or reference element.
3. **Animate the transcript concept.** Build an original visual metaphor that explains the exact line.
4. **Use a text-forward scene only when the line itself is the visual.** Use deliberate type and motion, not a generic title card.

Never fill a scene with abstract patterns, colour washes, or generic motion graphics that could belong to any transcript.

## Readability and timing

Keep the pace through motion, cuts, and transitions—not by removing text before it can be read.

- A short label needs a settled hold of roughly 0.8 seconds.
- A readable sentence needs roughly 0.3 seconds per word, with a minimum of about 1.2 seconds.
- If a scene contains more text than its transcript range allows, reduce the on-screen text or split the visual beat. Do not make readable text flash faster.
- For sequential text, hold each item long enough to read or reveal the sequence quickly and then hold the full set.

## Sequential and interaction moments

Before writing each scene, look for a visible event that can make it feel alive:

- elements arriving one by one;
- typing, clicking, selecting, swiping, or toggling;
- a count-up, a reveal, an impact, or a transformation.

If a scene has one, state exactly what appears, in what order, and what interaction is simulated. Do not leave rhythm or interaction for Remotion to guess.

## Sound-effect planning

Flick has no background music. Plan sound effects only when they support a visible action.

Use `Sound effect` to state the intended sound and trigger, for example: `Typing.mp3 when the hook types in.` Use `Audio-coupled idea` to state the visual timing that must align with it, for example: `Each word appears as if typed.`

Do not add sound effects solely to fill silence. Use `none` when a scene has no visible event that needs sound.

## Transition vocabulary

Choose a transition that preserves the approved creative direction and connects the visual story: clean cut, crossfade, slide, wipe, transform, zoom, or a scene-specific transition. State it in each scene's `Transition` line.

## Handoff posture

The plan is the creative contract for approval. It must be specific about what appears, what moves, what uses supplied assets, and what sound supports a visible action. Do not prescribe component structure, CSS, React hooks, frame values, or exact implementation mechanics.

Show the whole plan and ask:

> Here are the scenes Flick will build from your transcript. Approve them, or tell me what to change.

Do not build until approved.
