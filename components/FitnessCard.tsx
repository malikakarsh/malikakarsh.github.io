interface FitnessData {
  pace: string;
  runnerType: string;
  weekendActivity: string;
}

export default function FitnessCard({ data }: { data: FitnessData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616]/80 via-[#171717]/80 to-[#111111]/80 backdrop-blur-sm p-6 h-full shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.2em] mb-4">Off the Clock</h3>
      <div className="space-y-3">
        <p className="text-sm">🏃 <span className="font-medium">{data.pace}</span> • {data.runnerType}</p>
        <p className="text-sm">🏔️ <span className="font-medium">{data.weekendActivity}</span></p>
      </div>
    </div>
  );
}