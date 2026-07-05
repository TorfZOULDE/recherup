import { Link, useNavigate } from "react-router-dom";

const DEFAULT_FIELDS = [
  { id: 1, name: "Informatique", count: "1248", color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10", border: "border-[#8b5cf6]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
  { id: 5, name: "Comptabilité", count: "856", color: "text-[#10b981]", bg: "bg-[#10b981]/10", border: "border-[#10b981]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg> },
  { id: 6, name: "Marketing", count: "654", color: "text-[#f43f5e]", bg: "bg-[#f43f5e]/10", border: "border-[#f43f5e]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg> },
  { id: 2, name: "Génie civil", count: "743", color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg> },
  { id: 4, name: "Droit", count: "532", color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg> },
  { id: 3, name: "Médecine", count: "312", color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10", border: "border-[#06b6d4]/30",
    svg: <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> },
];

const COLORS = [
  { color: "text-[#8b5cf6]", bg: "bg-[#8b5cf6]/10", border: "border-[#8b5cf6]/30" },
  { color: "text-[#10b981]", bg: "bg-[#10b981]/10", border: "border-[#10b981]/30" },
  { color: "text-[#f43f5e]", bg: "bg-[#f43f5e]/10", border: "border-[#f43f5e]/30" },
  { color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/30" },
  { color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/30" },
  { color: "text-[#06b6d4]", bg: "bg-[#06b6d4]/10", border: "border-[#06b6d4]/30" },
];

const SearchIcon = () => (
  <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
  </svg>
);

export default function BrowseCategories({ searchFields, isSearching, searching }) {
  const navigate = useNavigate();

  const displayFields = isSearching
    ? (searchFields || []).map((f, i) => ({ ...f, ...COLORS[i % COLORS.length], count: null, svg: <SearchIcon /> }))
    : DEFAULT_FIELDS;

  const isEmpty = isSearching && !searching && searchFields !== null && displayFields.length === 0;

  const title = isSearching
    ? searching ? "Recherche en cours..." : `Filières trouvées (${displayFields.length})`
    : "Parcourir par filière";

  return (
    <section className="py-10 md:py-20">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{title}</h2>
          {isSearching && searching && (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          )}
        </div>
        <Link to="/filieres" className="text-purple-400 font-bold text-sm md:text-lg hover:text-purple-300 transition-all flex items-center gap-1.5 md:gap-2 group shrink-0">
          Voir toutes <span className="group-hover:translate-x-1 transition-transform">➔</span>
        </Link>
      </div>

      {isEmpty && (
        <div className="text-center py-10 text-gray-500 font-semibold text-sm md:text-base">
          Aucune filière trouvée pour cette recherche.
        </div>
      )}

      {isSearching && searching && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[140px] md:h-[180px] rounded-3xl bg-[#070b19]/80 animate-pulse border-2 border-gray-800/60"/>
          ))}
        </div>
      )}

      {!isEmpty && !searching && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {displayFields.map((filiere, idx) => (
            <div
              key={filiere.id || idx}
              onClick={() => navigate(`/entreprises?filiere=${filiere.id}`)}
              className="group bg-[#070b19]/80 border-2 border-gray-800/60 rounded-2xl md:rounded-3xl p-5 md:p-8 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:bg-[#1a1f35] hover:border-purple-500/50 relative overflow-hidden shadow-xl cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 ${filiere.bg} ${filiere.color} border ${filiere.border} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                {filiere.svg}
              </div>
              <h4 className="text-white font-black text-base md:text-xl mb-0.5 md:mb-1 group-hover:text-purple-300 transition-colors leading-tight">
                {filiere.name}
              </h4>
              {filiere.count && (
                <p className="text-gray-400 font-bold text-xs md:text-sm">{filiere.count} opportunités</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}