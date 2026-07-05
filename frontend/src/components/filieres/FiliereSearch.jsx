export default function FiliereSearch({ value, onChange }) {
  return (
    <div className="max-w-3xl mx-auto pt-6 pb-4 px-2">
      <div className="bg-[#0b1126]/90 border border-purple-500/30 rounded-full p-2.5 flex items-center justify-between shadow-[0_0_40px_rgba(139,92,246,0.15)] focus-within:border-purple-500/60 focus-within:shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-300">
        <div className="flex items-center gap-4 pl-6 flex-1">
          <svg className="w-6 h-6 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Rechercher une filière..."
            value={value}
            onChange={onChange}
            className="w-full bg-transparent text-base md:text-lg text-white placeholder-gray-500 focus:outline-none py-1 tracking-wide"
          />
        </div>
        <button type="submit" className="bg-[#582be8] hover:bg-[#4c22cc] text-white text-sm md:text-base font-extrabold px-8 py-4 rounded-full transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-purple-950/50 tracking-wide whitespace-nowrap">
          Rechercher
        </button>
      </div>
    </div>
  );
}
