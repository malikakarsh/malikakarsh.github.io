import { portfolioData } from "./portfolio";

export const fastInfer = {
  title: "FastInfer",
  link: "https://github.com/malikakarsh/fastInfer",
  notes: {
    label: "Implementation & benchmark notes",
    href: "https://github.com/malikakarsh/fastInfer/tree/main/notes",
  },
  description:
    "FastInfer is an experimental LLM inference optimization project exploring how custom GPU kernels translate from microbenchmark improvements to real model-level performance.",
  evaluation:
    "It implements Triton kernels for common transformer operations and evaluates them against PyTorch references for correctness, latency, and integration into cached Qwen decoding.",
  technologies: ["Triton", "PyTorch", "FP16", "CUDA graphs"],
  benchmark: {
    label: "PROJECTION MICROBENCHMARK",
    title: "Qwen2.5-1.5B · first-layer up_proj",
    unit: "μs",
    baselineLabel: "PyTorch GEMV",
    candidateLabel: "Triton GEMV",
    baseline: "116.56–116.60",
    candidate: "99.14–99.30",
    baselineMax: 116.6,
    candidateMax: 99.3,
    speedup: "1.174–1.176×",
    resultLabel: "isolated projection speedup",
    summary: "Measured across 3 captured decode inputs.",
    scope:
      "Tesla T4 · Batch 1 · FP16 · CUDA-graph projection timing. These isolated results do not establish a whole-model speedup.",
    source:
      "https://github.com/malikakarsh/fastInfer#real-qwen-projection-and-decode-integration",
  },
  decodeBenchmark: {
    grid: true,
    label: "MODEL-LEVEL CACHED DECODE",
    title: "Qwen2.5-1.5B · RMSNorm candidate",
    unit: "ms/step",
    baselineLabel: "Original PyTorch model",
    candidateLabel: "Triton RMSNorm candidate",
    baseline: "32.990",
    candidate: "31.402",
    baselineMax: 32.99,
    candidateMax: 31.402,
    speedup: "4.8%",
    resultLabel: "lower median decode latency",
    saving: { value: "1.588", unit: "ms/step", label: "saved versus baseline" },
    scope:
      "Qwen2.5-1.5B · Tesla T4 · Batch 1 · FP16 · Cached decode. Median latency versus uncompiled PyTorch with math SDPA; prefill excluded. Tested logits and tokens matched exactly. No advantage over a fully compiled model is established.",
    source:
      "https://github.com/malikakarsh/fastInfer/blob/main/results/raw/rmsnorm_mean_candidate_confirmed_console_summary.json",
  },
};

// Separate from FastInfer. Repository renamed from LLM-Inference.
export const inferenceProject = {
  title: "Transformer GPU Kernel Optimization",
  desc: "A notebook-based investigation of inference performance: quantization, KV caching, tiled attention, speculative decoding, and fused Triton softmax kernels.",
  tech: ["Python", "PyTorch", "Triton", "Inference"],
  link: "https://github.com/malikakarsh/Transformer-GPU-Kernel-Optimization",
};
export const selectedProjects = [
  inferenceProject,
  ...portfolioData.projects.filter((project) =>
    ["Weave", "Snatch"].includes(project.title),
  ),
];
