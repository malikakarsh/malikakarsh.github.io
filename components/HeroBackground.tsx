import type { HeroVariant } from "@/data/hero-variant";
import GPUExecutionFabric from "./GPUExecutionFabric";
import HeroExperimentalGrid from "./HeroExperimentalGrid";

export default function HeroBackground({ variant }: { variant: HeroVariant }) {
  switch (variant) {
    case "baseline":
      return <GPUExecutionFabric />;
    case "experimental-grid":
      return <HeroExperimentalGrid />;
  }
}
