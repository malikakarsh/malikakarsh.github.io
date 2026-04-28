export interface ProfileData {
  initials: string;
  name: string;
  title: string;
  availability: string;
  location: string;
}

interface SidebarProps {
  data: ProfileData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ data, activeTab, setActiveTab }: SidebarProps) {
  const navItems = ['About', 'Background', 'Projects'];

  return (
    <div className="flex flex-col gap-4 h-full">
      
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-6 flex flex-col items-center text-center shadow-xl shadow-black/25 transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
           {data.initials}
        </div>
        <h1 className="text-2xl font-bold text-white">{data.name}</h1>
        <p className="text-zinc-500 text-sm mt-1">{data.title}</p>
        
        {/* Pills */}
        <div className="flex gap-1 mt-4">
          <span className="bg-green-900/20 border border-green-900/50 text-green-500 text-[10px] px-3 py-1.5 rounded-full font-bold">
            {data.availability}
          </span>
          <span className="bg-indigo-900/20 border border-indigo-900/50 text-indigo-400 text-[10px] px-3 py-1.5 rounded-full font-bold">
            {data.location}
          </span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#161616] via-[#171717] to-[#111111] p-6 flex-1 flex flex-col justify-between shadow-xl shadow-black/25 transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        <div>
          <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-4 ml-2">
            Navigate
          </h3>
          <div className="space-y-1 w-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#1e2433] text-blue-400 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-[#202020]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        <div className="h-22"></div>
        <div className="space-y-4 pt-8 mt-8 border-t border-[#262626]">
          <a href="https://github.com/malikakarsh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-500 hover:text-white text-sm transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            github/malikakarsh
          </a>
          <a href="https://linkedin.com/in/malikakarsh" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-500 hover:text-white text-sm transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            linkedin/malikakarsh
          </a>
          <a href="mailto:malikakarsh@gmail.com" className="flex items-center gap-3 text-zinc-500 hover:text-white text-sm transition-colors cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            malikakarsh@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}