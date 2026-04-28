import Image from "next/image";
export interface LeetCodeData {
  currentRating: string;
  peakRating: string;
  level: string;
  globalRanking: string;
  totalUsers: string;
  attended: number;
  link: string;
  badgeImage?: string;
  topPercentage?: string;
}

export default function LeetCodeCard({ data }: { data: LeetCodeData }) {
  return (
    <a 
      href={data.link}
      target="_blank"
      rel="noreferrer"
      className="group relative overflow-hidden block h-full rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-8 text-center shadow-xl shadow-black/25 transition-all duration-300"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-5 right-5 w-5 h-5">
        <img 
          src="https://cdn.simpleicons.org/leetcode/52525b/eab308" 
          alt="LeetCode Logo" 
          className="w-full h-full opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-110 group-hover:saturate-200 group-hover:hue-rotate-20" 
        />
      </div>

      <h3 className="text-left self-start text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1">
        LeetCode
      </h3>

      <div className="flex flex-col items-center justify-center my-1">
        <p className="text-zinc-200 text-[11px] font-medium mb-2 uppercase tracking-widest">
          Max Contest Rating
        </p>
        <h2 className="text-5xl font-black text-white leading-none tracking-tight group-hover:scale-105 transition-transform duration-300">
          {data.peakRating}
        </h2>
      </div>

      <div className="flex flex-col items-center w-full mt-4 mb-4">
        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mb-4">
          {data.topPercentage}
        </p>
        
        <div className="flex items-center justify-center gap-10 w-full">
          
          <div className="flex items-center gap-3">
            {data.badgeImage && (
              <Image
                src={data.badgeImage}
                alt="Knight"
                width={60}
                height={60}
                className="drop-shadow-[0_0_10px_rgba(110,231,183,0.3)]"
              />
            )}
            <div className="flex flex-col gap-1">
              <p className="text-zinc-500 text-[9px] uppercase tracking-tighter leading-none">
                Level
              </p>
              <span className="text-blue-400 font-bold text-lg tracking-wide">
                {data.level}
              </span>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-zinc-800" />

          <div className="flex flex-col items-start">
            <p className="text-zinc-500 text-[9px] uppercase tracking-tighter leading-none mb-3">
              Global Rank
            </p>
            <p className="text-xl font-bold text-white leading-none">
              {data.globalRanking}
              <span className="text-zinc-600 text-[10px] font-medium ml-1">
                of {data.totalUsers}
              </span>
            </p>
          </div>

        </div>
      </div>
    </a>
  );
}