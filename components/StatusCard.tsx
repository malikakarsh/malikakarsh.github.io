interface StatusData {
  status: string;
  roles: string;
}

export default function StatusCard({ data }: { data: StatusData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616]/80 via-[#171717]/80 to-[#111111]/80 backdrop-blur-sm p-6 flex flex-col justify-center h-full shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Status</h3>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xl font-bold text-green-500">{data.status}</span>
      </div>
      <p className="text-zinc-500 text-xs mt-1">{data.roles}</p>
    </div>
  );
}