// Static compute grid over three soft ambient light regions; CSS-only motion.
export default function BenchmarkGrid({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) {
  return (
    <div
      className={`benchmark-grid ambient-surface ${variant}`}
      aria-hidden="true"
    >
      <span className="ambient-glow ambient-glow-one" />
      <span className="ambient-glow ambient-glow-two" />
      <span className="ambient-glow ambient-glow-three" />
    </div>
  );
}
