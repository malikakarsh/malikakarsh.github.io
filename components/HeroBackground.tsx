import type { HeroVariant } from "@/data/hero-variant";
import HeroGPUEnvironment from "./gpu-lab/HeroGPUEnvironment";
import GPUExecutionFabric from "./GPUExecutionFabric";
import HeroExperimentalGrid from "./HeroExperimentalGrid";

export default function HeroBackground({ variant }: { variant: HeroVariant }) {
  switch (variant) {
    case "gpu-lab":
      return <HeroGPUEnvironment />;
    case "baseline":
      return <GPUExecutionFabric />;
    case "experimental-grid":
      return <HeroExperimentalGrid />;
  }
}
