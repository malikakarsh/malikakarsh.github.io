# Current GPU Lab review

This directory contains actual browser captures of the reference-based hero.
The current selection is `gpu-lab` with `gpuLabReviewStage = "integrated"`.

Current artifacts:

- `desktop-load.png`: initial desktop render, 1672 × 941.
- `checkpoint-c-execution.png`: execution phase with current materials.
- `checkpoint-c-completion.png`: completion phase.
- `hero-cycle.mp4`: 9.4-second browser recording, covering an execution cycle.
- `recording-frames.jpg`: sequential frames sampled from that recording.
- `mobile-load.png`, `mobile-scene.png`: 390 × 844.
- `tablet-load.png`: 768 × 1024.
- `benchmark-details.png`: expanded original benchmark scope and methodology.
- `reduced-motion.png`: still-frame mode.
- `no-webgl.png`: static fallback with WebGL explicitly disabled.

Earlier checkpoint A/B files are retained as iteration history. They do not show
the final face assignment, materials, or complete current path treatment.

## Changes verified

The grid perspective is preserved. Cuboid edges now use that same camera rather
than a separate isometric projection. The reference-facing plane has the most
luminous pale-green material; the horizontal and side faces have distinct darker
tones. Grid lines render behind the face fill, with cube outlines/corner highlights
in front. The text shield no longer darkens the central cuboids unnecessarily.

Cells appear independently at lattice positions and then continue travelling.
Reappearance occurs only while faded out. Four sinusoidal entry paths now share
the lattice's front vertex indices. Inside the volume, packets follow the same
neighbor edges as the grid. Their entry tangent aligns with the first grid edge,
and staggered packet phases avoid vertical bars. This line-only refinement
preserves the existing grid vertices, cube anchors, face geometry, size, and materials.
Desktop and compact graph checks verify those invariants and shared junctions.

## Validation and limits

- `npm run build` passes, including TypeScript and static export.
- Browser checks report no runtime errors.
- Desktop, mobile, and tablet report zero horizontal overflow.
- Reduced-motion canvas pixels remain stable.
- WebGL-disabled mode shows the SVG fallback.
- Expanded details retain the original Tesla T4 / Batch 1 / FP16 methodology and
  the limitation on whole-model conclusions.
- The approved baseline renderers, shared stylesheet, and benchmark data remain
  byte-identical to the preservation tag.

The current screenshots and recording frames were visually inspected. The
comparison is against the supplied image; no pixel-identical reproduction or user
visual approval is claimed. These checks used Chrome with software WebGL, so they
are not a physical-device GPU performance profile or a Safari validation.

The development preview remains local at `http://127.0.0.1:3000`. No deployment
or Git push was performed.
