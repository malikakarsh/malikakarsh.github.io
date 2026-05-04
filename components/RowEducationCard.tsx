export interface EducationItem {
  university: string;
  degree: string;
  duration: string;
  gpa: string;
  coursework: string[];
}

export default function RowEducationCard({ data }: { data: EducationItem }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616]/80 via-[#171717]/80 to-[#111111]/80 backdrop-blur-sm p-8 flex flex-col justify-center shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="flex flex-col md:flex-row justify-between md:items-start mb-3">
        
        <div>
          <h4 className="text-lg font-bold text-white">{data.university}</h4>
          <p className="text-blue-400 text-sm font-medium mt-0.5">{data.degree}</p>
        </div>
     
        <div className="md:text-right mt-2 md:mt-0 shrink-0">
          <p className="text-zinc-500 text-[10px] font-mono tracking-widest uppercase mb-1">{data.duration}</p>
          <span className="text-green-500 font-bold text-xs border border-green-500/20 bg-green-500/10 px-2 py-0.5 rounded inline-block">
            GPA: {data.gpa}
          </span>
        </div>

      </div>
      
      <div className="flex flex-wrap gap-2">
        {data.coursework.map((course, i) => (
          <span 
            key={i} 
            className="bg-zinc-800/40 text-zinc-300 text-[10px] font-medium px-2 py-1 rounded border border-zinc-700/50"
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}