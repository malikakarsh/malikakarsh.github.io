# Hero variants

Change `heroVariant` in `data/hero-variant.ts` and rebuild (`npm run build`),
or use the development server (`npm run dev`) for hot reload.

The active variant is `experimental-grid`. Set it to `baseline` to restore the
approved version without changing any hero markup or styles.

- `baseline`: the approved dark hero with three dotted-compute arrangements,
  48 clusters per arrangement, 0.448x playback, and 0.5-second dark intervals.
  Its renderer remains in `components/GPUExecutionFabric.tsx` and
  `components/fabric/executionFabric.ts` without changes.
- `experimental-grid`: a separate fixed-cell lattice with parallel block fills,
  ordered lane sweeps, and propagation chains confined to the left hero block.
  Work plays at 0.8× the original experimental speed (20% slower), with a
  0.3-second real-time quiet interval between waves.
  Six phases repeat: layout A → darkness → layout B → darkness → layout C →
  darkness. The lattice stays fixed; each layout schedules the same effects in
  different positions. Cursor illumination also pauses during darkness.
  On mobile, the lattice stops above the stacked FastInfer card.

Both render beneath the same hero content and FastInfer card. The baseline's
spacing, typography, card styling, colors, and layout remain in the original
shared markup and stylesheet; experimental styling belongs in its own renderer
or must be scoped to `[data-hero-variant="experimental-grid"]`.

## Approved baseline integrity

SHA-256 values recorded before variant work:

```
6559b924de7c781346b34b144cd25996bd5b492d145cf0b69268e666a75d42a4  components/GPUExecutionFabric.tsx
4fa682844cfc6308e88c09a3f16f8a8725b22dfcc48ca886334d41c77599c9dc  components/fabric/executionFabric.ts
100e4d8d9a652e38d8f38892d0be3a1cd6de4f40ef16867eef53f42cfe43e868  app/globals.css
```

The baseline renderer and stylesheet should not be edited to tune the experiment.

Before activating the experiment, the baseline was rebuilt and checked against
the approved capture: hero pixels, text, layout geometry, and the reduced-motion
canvas matched exactly.
