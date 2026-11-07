export type HeroVariant = "baseline" | "experimental-grid" | "gpu-lab";

// Single switch for the homepage hero. The approved baseline renderer and
// shared hero styles are preserved. GPU Lab owns its scene and scoped panel styles.
export const heroVariant: HeroVariant = "gpu-lab";

// Local design checkpoints; use integrated for normal playback.
export const gpuLabReviewStage: "geometry" | "motion" | "integrated" = "integrated";
