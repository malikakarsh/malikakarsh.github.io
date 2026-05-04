interface ExperienceData {
  role: string;
  company: string;
  duration: string;
  active: boolean;
}

export default function ExperienceCard({ data }: { data: ExperienceData[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616]/80 via-[#171717]/80 to-[#111111]/80 backdrop-blur-sm p-8 h-full shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold mb-8 text-zinc-600 uppercase tracking-[0.2em] mb-4">Experience</h3>
      <div className="space-y-6">
        {data.map((item, i) => (
          <div key={i} className="flex gap-4 relative">
            {i !== data.length - 1 && <div className="absolute left-[7px] top-6 w-[2px] h-12 bg-zinc-800" />}

            <div className={`z-10 w-4 h-4 rounded-full mt-1.5 border-4 border-[#161616] ${item.active ? 'bg-blue-500' : 'bg-zinc-700'}`} />

            <div>
              <h4 className="text-md font-bold leading-none">{item.role}</h4>
              <p className="text-blue-400 text-sm font-medium mt-2">{item.company}</p>
              <p className="text-zinc-500 text-xs mt-1 uppercase tracking-wider">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}