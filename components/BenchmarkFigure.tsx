import BenchmarkGrid from "./BenchmarkGrid";
import SiteLink from "./SiteLink";
type Benchmark = {
  label: string;
  title: string;
  unit: string;
  baselineLabel: string;
  candidateLabel: string;
  baseline: string;
  candidate: string;
  baselineMax: number;
  candidateMax: number;
  speedup: string;
  resultLabel: string;
  scope: string;
  source: string;
  summary?: string;
  grid?: boolean;
  saving?: { value: string; unit: string; label: string };
};

export default function BenchmarkFigure({
  benchmark,
}: {
  benchmark: Benchmark;
}) {
  return (
    <figure className="benchmark">
      {benchmark.grid && <BenchmarkGrid variant="secondary" />}
      <div className="figure-top">
        <span className="eyebrow">{benchmark.label}</span>
        <span className="live-dot">Measured</span>
      </div>
      <h3>{benchmark.title}</h3>
      <div className="benchmark-result">
        <strong>{benchmark.speedup}</strong>
        <span>{benchmark.resultLabel}</span>
      </div>
      <p className="benchmark-unit">
        Latency / {benchmark.unit} <span>Lower is better ↓</span>
      </p>
      <div className="bar-row">
        <div className="bar-label">
          <span>{benchmark.baselineLabel}</span>
          <span>
            {benchmark.baseline} {benchmark.unit}
          </span>
        </div>
        <div className="bar-track">
          <div className="bar baseline" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="bar-row bar-row-candidate">
        <div className="bar-label">
          <span>{benchmark.candidateLabel}</span>
          <span>
            {benchmark.candidate} {benchmark.unit}
          </span>
        </div>
        <div className="bar-track">
          <div
            className="bar candidate"
            style={{
              width: `${(benchmark.candidateMax / benchmark.baselineMax) * 100}%`,
            }}
          />
          {benchmark.saving && (
            <span
              className="bar-saved-region"
              aria-hidden="true"
              style={{
                width: `${(1 - benchmark.candidateMax / benchmark.baselineMax) * 100}%`,
              }}
            />
          )}
        </div>
      </div>
      {benchmark.saving && (
        <p className="benchmark-saving">
          <strong>
            −{benchmark.saving.value} {benchmark.saving.unit}
          </strong>
          <span>{benchmark.saving.label}</span>
        </p>
      )}
      {benchmark.summary && (
        <p className="benchmark-summary">{benchmark.summary}</p>
      )}
      <figcaption>
        {benchmark.scope}{" "}
        <SiteLink href={benchmark.source}>Methodology & evidence</SiteLink>
      </figcaption>
    </figure>
  );
}
