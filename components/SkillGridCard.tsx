// 1. Update the interface to accept the new categorized structure
export interface SkillCategory {
  category: string;
  items: string[];
}

export default function SkillGridCard({ title, skills }: { title: string, skills: SkillCategory[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-6 h-full flex flex-col justify-center shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">
        {title}
      </h3>
      
      <div className="flex flex-col gap-4 flex-1">
        {skills.map((group, index) => (
          <div key={index}>
            <h4 className="text-[11px] font-bold text-zinc-500 mb-2 tracking-wide">
              {group.category}
            </h4>

            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, i) => (
                <span 
                  key={i} 
                  className="bg-[#202020] text-zinc-300 text-[11px] font-medium px-3 py-1.5 rounded-lg border border-[#2a2a2a] hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}