export interface EducationItem {
  university: string;
  degree: string;
  duration: string;
  gpa: string;
  coursework: string[];
}

export default function EducationCard({ data }: { data: EducationItem }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616]/80 via-[#171717]/80 to-[#111111]/80 backdrop-blur-sm p-6 h-full flex flex-col justify-between shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-white leading-tight">{data.university}</h4>
          <span className="text-[10px] text-zinc-500 font-mono tracking-wider ml-2 text-right shrink-0">
            {data.duration}
          </span>
        </div>
        
        <p className="text-blue-400 text-sm font-medium mb-3">{data.degree}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {data.coursework.map((course, i) => (
            <span 
              key={i} 
              className="bg-zinc-800/40 text-zinc-300 text-[10px] font-medium px-2 py-1 rounded-md border border-zinc-700/50"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      <div>
        <span className="text-green-500 font-bold text-xs border border-green-500/20 bg-green-500/10 px-2 py-1 rounded-md inline-block">
          GPA: {data.gpa}
        </span>
      </div>
    </div>
  );
}