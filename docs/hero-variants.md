# Hero variants

The configuration point is `data/hero-variant.ts`:

```ts
export const heroVariant: HeroVariant = "gpu-lab";
```

Set `heroVariant` to `"baseline"` and rebuild to restore the approved hero. The
older `"experimental-grid"` variant also remains available. The baseline needs no
CSS or component rollback.

`gpuLabReviewStage` is a local design aid: `geometry` freezes a still frame,
`motion` plays without the atmospheric layer, and `integrated` is normal playback.
The current selection is `integrated`.

## Preservation and provenance

Annotated tag `hero-pre-gpu-lab-2026-11-06` preserves the clean pre-experiment
repository at `4b4bbe3`. That snapshot selected `experimental-grid`; the approved
baseline was already independently available. The approved renderer files,
`app/globals.css`, and benchmark data in `data/projects.ts` remain unchanged.

No historical Git revision, reflog entry, stash, or unreachable object contained
the first point-and-line GPU Lab experiment. Fragments recovered from earlier
conversation source are documented in `components/gpu-lab/reference/`; this is
not an exact historical Git rollback. The current version follows the user's
subsequently supplied visual reference and corrections.

## Current experimental files

- `components/gpu-lab/referenceLattice.ts`: regular lattice, equal-edge cube
  meshes, camera projection, and the reference-fitted input/output curves.
- `components/gpu-lab/scene.ts`: WebGL materials, perspective, per-cell birth and
  travel, travelling line illumination, glow buffers, and graphics cleanup.
- `components/gpu-lab/HeroGPUEnvironment.tsx`: full-viewport hero canvas, static
  SVG fallback, resize/visibility/motion preferences, and pointer lifecycle.
- `components/gpu-lab/GPUKernelLab.tsx`: existing compact FastInfer overlay and
  expandable original benchmark details.
- `components/gpu-lab/GPUKernelLab.module.css`: scoped experimental styles and
  the soft text shield. It does not change the baseline stylesheet.
- `components/HeroBackground.tsx` and `components/HomeSections.tsx`: variant
  routing and reuse of the original FastInfer data/markup.

## Geometry, lighting and motion

The grid and cuboids use the same projective camera. The bright cube face is the
plane whose upper edge rises toward the right, following the supplied reference.
The horizontal face switches with the camera height; opposite/invisible faces
are not substituted for the visible ones. The front is luminous pale green;
horizontal and side faces use separate, darker green tones. Grid geometry draws
behind the face fill, and cube edges/corner highlights draw in front.

Cells appear independently at sampled lattice positions, fade in, and continue
travelling at individual speeds. Their next birth position changes while fully
faded, preventing visible teleports. They do not remain stationary and do not
move as repeated columns. Three mesh dimensions share `CUBE_SIZE`.

Four gently sinusoidal entry paths join actual indexed grid vertices. Inside the
volume, illumination and moving packets use the existing neighbor edges rather
than independent overlay curves. The entry tangent follows the first grid edge;
its displacement tapers to zero at the shared junction. Perspective-compensated
packet travel continues through the same grid points. Grid coordinates and cube
geometry, size, placement, motion, and materials remain unchanged in this iteration.

The canvas is mounted directly on the hero, outside the column layout, spans the
viewport, and fades before the statistics strip. The FastInfer card does not
control its center or bounds. The original headline, introduction, links,
navbar, statistics and other sections are preserved.

## Benchmark integrity

All measurements are reused unchanged from `data/projects.ts`. The foreground
panel preserves the `1.174–1.176×` isolated projection result and both latency
ranges. Expanded details retain model/operation identifiers, hardware, precision,
methodology link and the explicit limit on whole-model conclusions. The scene is
illustrative, not live benchmark telemetry.

## Runtime and fallbacks

No added dependencies. Rendering caps at 30 fps; the pixel ratio caps at 1.25 on
desktop and 1 on narrow screens. Glow uses a lower-resolution framebuffer and
adjusts point sizes to that resolution, avoiding oversized blurred streaks.

Reduced motion renders a still frame. Hidden tabs and offscreen heroes stop
requesting animation frames. Pointer response is small and eased. Resize and
pointer reads do not occur inside the render loop. Observers, listeners, frames,
shaders, programs, buffers, texture and framebuffer are cleaned up on unmount.

The server-rendered SVG remains available without JavaScript or WebGL, after
shader setup failure, and after context loss. Mobile lowers geometry complexity
and uses a shorter visual region so cells retain their proportions.

Current review artifacts are in `docs/gpu-lab-review/reference-match/`. Older
captures document superseded experiments and should not be used to assess the
current implementation. This experiment has not been deployed.
