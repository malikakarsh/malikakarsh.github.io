export interface AboutData {
  paragraphs: string[];
  tags: string[];
}

export default function AboutCard({ data }: { data: AboutData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-8 shadow-xl shadow-black/25 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-6">What I do?</h3>
      
      <div className="space-y-6 text-zinc-300 leading-relaxed text-sm">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-8">
        {data.tags.map(tag => (
          <span key={tag} className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-lg border border-blue-500/20">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}