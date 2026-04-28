export interface LanguageItem {
  name: string;
  level: string;
  progress: number;
}

export default function LanguageSkillCard({ title, skills }: { title: string, skills: LanguageItem[] }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-6 h-full flex flex-col justify-center shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4">
        {title}
      </h3>
      
      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {skills.map((skill, index) => (
          <div key={index} className="w-full">
            
            <div className="flex justify-between items-end mb-3">
              <span className="text-[13px] font-bold text-zinc-200">{skill.name}</span>
              <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
                {skill.level}
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-[#202020] rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                style={{ width: `${skill.progress}%` }}
              />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}