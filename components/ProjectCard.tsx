export interface ProjectItem {
  title: string;
  desc: string;
  tech: string[];
  link: string;
}

export default function ProjectCard({ data }: { data: ProjectItem }) {
  return (
    <a 
      href={data.link} 
      target="_blank" 
      rel="noreferrer"
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-6 flex flex-col h-full shadow-xl shadow-black/25 transition-all duration-300 hover:shadow-black/30"
    >
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="flex justify-between items-start mb-9">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
          {data.title}
        </h3>
        <div className="text-zinc-500 group-hover:text-white transition-colors bg-[#202020] p-2 rounded-full border border-[#2a2a2a] group-hover:border-zinc-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </div>
      </div>

      <p className="text-zinc-400 text-sm leading-relaxed mb-7 flex-1">
        {data.desc}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {data.tech.map((tag, i) => (
          <span 
            key={i} 
            className="bg-zinc-800/40 text-zinc-300 text-[10px] font-medium px-2 py-1 rounded-md border border-zinc-700/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}