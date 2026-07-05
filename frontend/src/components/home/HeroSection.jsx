import hero from "../../assets/images/hero.png";

const BADGES = ["Informatique","Comptabilité","Marketing","Génie civil","Droit","Médecine"];

export default function HeroSection({ searchQuery, onSearchChange, onSearchSubmit, searching }) {
  const handleSubmit = (e) => { e.preventDefault(); if (searchQuery.trim()) onSearchSubmit(); };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-6 md:mt-10">

      {/* LEFT */}
      <div>
        <h1 className="text-[38px] sm:text-[52px] lg:text-[64px] xl:text-[70px] leading-[1.1] font-extrabold tracking-[-1px]">
          Trouvez les{" "}
          <span className="block">entreprises adaptées</span>
          <span className="block">
            à{" "}
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              votre filière
            </span>
          </span>
        </h1>

        <p className="mt-5 text-gray-400 text-[15px] sm:text-[17px] md:text-[19px] leading-relaxed max-w-[580px]">
          La plateforme qui connecte étudiants, diplômés et professionnels
          aux meilleures entreprises pour leurs stages, emplois et opportunités.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-[660px]">
          <div className="h-[64px] md:h-[78px] bg-[#0D1326]/95 border border-purple-500/20 rounded-2xl flex items-center px-4 md:px-5 shadow-[0_0_35px_rgba(139,92,246,0.18)] backdrop-blur-xl focus-within:border-purple-500/50 transition-all">
            {searching ? (
              <svg className="w-5 h-5 md:w-7 md:h-7 text-purple-400 mr-3 md:mr-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-7 md:h-7 text-gray-500 mr-3 md:mr-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            )}

            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-[14px] md:text-[17px] placeholder:text-gray-500 min-w-0"
              placeholder="Rechercher par filière, domaine..."
            />

            {searchQuery && (
              <button type="button" onClick={() => onSearchChange("")} className="text-gray-500 hover:text-white mr-2 md:mr-3 transition-colors shrink-0">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}

            <button
              type="submit"
              className="w-11 h-11 md:w-14 md:h-14 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/40 hover:scale-105 transition-all duration-300 shrink-0"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6"/>
              </svg>
            </button>
          </div>
        </form>

        {/* Badges */}
        <div className="flex gap-2 md:gap-3 mt-5 md:mt-6 flex-wrap">
          {BADGES.map((badge) => (
            <button
              key={badge}
              onClick={() => onSearchChange(badge)}
              className={`px-3 md:px-5 py-2 md:py-3 rounded-full text-[13px] md:text-[15px] border transition-all cursor-pointer
                ${searchQuery === badge
                  ? "bg-purple-600/20 border-purple-500/60 text-purple-300"
                  : "bg-[#121933] text-gray-300 border-white/5 hover:border-purple-500/30"}`}
            >
              {badge}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT — caché sur mobile, visible à partir de lg */}
      <div className="flex relative justify-center mt-6 lg:mt-0">
  <img src={hero} alt="" className="relative z-10 w-[220px] sm:w-[320px] lg:w-[400px] xl:w-[500px] rounded-full" />
        <div className="absolute top-16 left-0 z-20 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 xl:px-6 xl:py-4">
          <h3 className="text-xl xl:text-2xl font-bold">+5000</h3>
          <p className="text-xs xl:text-sm text-gray-300">Entreprises répertoriées</p>
        </div>
        <div className="absolute top-48 left-12 z-20 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 xl:px-6 xl:py-4">
          <h3 className="text-xl xl:text-2xl font-bold">+200</h3>
          <p className="text-xs xl:text-sm text-gray-300">Filières disponibles</p>
        </div>
        <div className="absolute right-0 top-56 z-20 bg-emerald-500/20 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3 xl:px-6 xl:py-4">
          <h3 className="text-xl xl:text-2xl font-bold">98%</h3>
          <p className="text-xs xl:text-sm text-gray-300">Satisfaction utilisateurs</p>
        </div>
      </div>

      {/* Stats visibles uniquement sur mobile (sous le texte) */}
      <div className="flex lg:hidden gap-3 flex-wrap mt-2">
        {[
          { val: "+5000", label: "Entreprises" },
          { val: "+200",  label: "Filières" },
          { val: "98%",   label: "Satisfaction" },
        ].map(({ val, label }) => (
          <div key={label} className="flex-1 min-w-[90px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 text-center">
            <h3 className="text-lg font-bold">{val}</h3>
            <p className="text-xs text-gray-300">{label}</p>
          </div>
        ))}
      </div>

    </section>
  );
}