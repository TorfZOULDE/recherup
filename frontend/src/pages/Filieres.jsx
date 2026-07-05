import { useState, useEffect, useCallback } from "react";
import FiliereSearch from "../components/filieres/FiliereSearch";
import FiliereIaBanner from "../components/filieres/FiliereIaBanner";
import FiliereCard from "../components/filieres/FiliereCard";
import { getFieldsPaginated, searchFields } from "../services/field.service";

export default function Filieres() {
  const [searchQuery, setSearchQuery] = useState("");
  const [fields, setFields]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(1);
  const [total, setTotal]             = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  // Chargement paginé normal
  const loadPage = useCallback(async (p = 1) => {
    setLoading(true);
    setError("");
    try {
      const data = await getFieldsPaginated(p);
      setFields(data.fields);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les filières.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Chargement initial
  useEffect(() => { loadPage(1); }, [loadPage]);

  // Recherche avec debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      if (isSearching) {
        setIsSearching(false);
        loadPage(1);
      }
      return;
    }

    setIsSearching(true);
    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchFields(searchQuery.trim());
        setFields(results);
        setTotalPages(1);
        setPage(1);
        setTotal(results.length);
      } catch (e) {
        setError("Erreur lors de la recherche.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handlePageChange = (p) => {
    if (p < 1 || p > totalPages) return;
    loadPage(p);
    
  };

  // Pagination intelligente — affiche toujours la page courante
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = new Set([1, totalPages, page]);
    if (page > 1) pages.add(page - 1);
    if (page < totalPages) pages.add(page + 1);
    return Array.from(pages).sort((a, b) => a - b);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="min-h-screen bg-[#030614] text-white px-4 sm:px-8 md:px-10 overflow-x-hidden font-sans relative antialiased">

      <div className="absolute top-24 left-[15%] w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#60a5fa] animate-pulse" />
      <div className="absolute top-40 right-[25%] w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_#c084fc]" />

      <div className="max-w-[1450px] mx-auto space-y-12">

        {/* Header */}
        <section className="text-center pt-8 space-y-6 relative">
          <div className="absolute -top-10 -right-20 w-[450px] h-[300px] bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Explorez les filières disponibles
            </h1>
            <span className="bg-[#00f2fe]/10 text-[#00f2fe] text-xs font-bold px-3 py-1.5 rounded-full border border-[#00f2fe]/20 whitespace-nowrap tracking-wide">
              {total > 0 ? `+${total} filières disponibles` : "+200 filières disponibles"}
            </span>
          </div>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-medium tracking-wide">
            Trouvez votre domaine d'étude ou d'expertise et découvrez les entreprises les plus adaptées.
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            <FiliereSearch
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </section>

        {/* Bannière IA */}
        <section className="space-y-4 pt-4">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block pl-1">
            Section Recommandation IA
          </span>
          <FiliereIaBanner />
        </section>

        {/* Erreur */}
        {error && (
          <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}

        {/* Grille */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-[220px] rounded-2xl bg-[#0c1230] animate-pulse" />
            ))
          ) : fields.length === 0 ? (
            <div className="col-span-full text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400 font-semibold">Aucune filière ne correspond à votre recherche.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all"
              >
                Réinitialiser
              </button>
            </div>
          ) : (
            fields.map((field, idx) => (
              <FiliereCard
                key={field.id}
                id={field.id}
                title={field.name}
                count={field.company_count != null ? `${field.company_count} entreprises` : null}
                desc={field.description}
                colorIdx={idx}
                isHighlighted={idx === 1}
              />
            ))
          )}
        </section>

        {/* Pagination */}
        {!isSearching && !loading && totalPages > 1 && (
          <section className="flex flex-col items-center gap-6 pt-8 pb-12 select-none">

            <div className="flex items-center gap-2 text-sm font-black text-gray-400">

              {/* Précédent */}
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#070b19]/40 hover:border-purple-500/40 hover:text-white transition-all disabled:opacity-30 active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Pages */}
              {visiblePages.map((p, i) => {
                const prev = visiblePages[i - 1];
                const showDots = prev && p - prev > 1;
                return (
                  <div key={p} className="flex items-center gap-2">
                    {showDots && (
                      <span className="text-gray-600 px-1">…</span>
                    )}
                    <button
                      onClick={() => handlePageChange(p)}
                      className={`w-11 h-11 flex items-center justify-center rounded-xl text-base transition-all
                        ${page === p
                          ? "bg-[#582be8] text-white shadow-md shadow-purple-950/50"
                          : "border border-gray-800 bg-[#070b19]/40 hover:border-purple-500/30 hover:text-white"
                        }`}
                    >
                      {p}
                    </button>
                  </div>
                );
              })}

              {/* Suivant */}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-800 bg-[#070b19]/40 hover:border-purple-500/40 hover:text-white transition-all disabled:opacity-30 active:scale-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-600">
              Page <span className="text-gray-400 font-bold">{page}</span> sur{" "}
              <span className="text-gray-400 font-bold">{totalPages}</span>
            </p>

          </section>
        )}

      </div>
    </div>
  );
}