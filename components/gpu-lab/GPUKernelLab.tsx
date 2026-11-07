"use client";

import type { ReactNode } from "react";
import styles from "./GPUKernelLab.module.css";

type Measurement = {speedup:string;baseline:string;candidate:string;resultLabel:string};
export default function GPUKernelLab({ children, benchmark }: {children:ReactNode;benchmark:Measurement}) {
  return <div className={styles.lab} data-gpu-lab-anchor>

    <div className={styles.instrument}>
      <div className={styles.heading}><h2>FastInfer</h2><span><i/> Measured</span></div>
      <div className={styles.result}><strong>{benchmark.speedup}</strong><span>{benchmark.resultLabel}</span></div>
      <div className={styles.latencies}><span>PyTorch <b>{benchmark.baseline} μs</b></span><span>Triton <b>{benchmark.candidate} μs</b></span></div>
      <details className={styles.details}><summary>Benchmark details & methodology <span aria-hidden="true">↗</span></summary><div className={styles.full}>{children}</div></details>
    </div>
  </div>;
}
