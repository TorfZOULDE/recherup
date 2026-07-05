import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import { isAuthenticated } from "../services/auth.service";

import EntrepriseSidebar from "../components/entreprises/EntrepriseSidebar";
import EntrepriseCard from "../components/entreprises/EntrepriseCard";
import EntrepriseSearch from "../components/entreprises/EntrepriseSearch";
import EntrepriseRecommendation from "../components/entreprises/EntrepriseRecommendation";

// Logo générique de remplacement quand l'entreprise n'a pas de logoUrl
function DefaultLogo({ name }) {
  return (
    <div className="w-full h-full bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-black text-lg">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

export default function Entreprises() {
  const [searchParams] = useSearchParams();
  const fieldId = searchParams.get("filiere"); // Cas 4 : ?filiere=3 depuis la page Filières

  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); // requête réellement lancée (après clic "Rechercher")
  const [filters, setFilters] = useState({ fieldId: "", domain: "", city: "", minScore: 0 });
  const [activeFilters, setActiveFilters] = useState(null); // filtres réellement appliqués
  const [companies, setCompanies] = useState([]);
  const [fieldInfo, setFieldInfo] = useState(null); // nom de la filière si Cas 4
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });

  const connected = isAuthenticated();

  // Détermine le mode actif
  const mode = fieldId
    ? "field"
    : activeQuery || activeFilters
    ? "search"
    : connected
    ? "recommended"
    : "popular";

  const buildFilterParams = () => {
    if (!activeFilters) return "";
    const params = new URLSearchParams();
    if (activeQuery) params.set("q", activeQuery);
    if (activeFilters.fieldId) params.set("fieldId", activeFilters.fieldId);
    if (activeFilters.domain) params.set("domain", activeFilters.domain);
    if (activeFilters.city) params.set("city", activeFilters.city);
    if (activeFilters.minScore) params.set("minScore", activeFilters.minScore);
    return params.toString();
  };

  const fetchCompanies = async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (mode === "field") {
        res = await api.get(`/fields/${fieldId}/companies?page=${page}`);
        setFieldInfo(res.data.field);
        setCompanies(res.data.results);
        setPagination({ page: res.data.page, totalPages: res.data.totalPages, total: res.data.total });
      } else if (mode === "search") {
        const qParam = activeQuery ? `q=${encodeURIComponent(activeQuery)}&` : "";
        const filterParams = activeFilters
          ? Object.entries(activeFilters)
              .filter(([, v]) => v)
              .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
              .join("&")
          : "";
        res = await api.get(`/companies/search?${qParam}${filterParams}&page=${page}`);
        setCompanies(res.data.results);
        setPagination({ page: res.data.page, totalPages: res.data.totalPages, total: res.data.total });
      } else if (mode === "recommended") {
        res = await api.get(`/companies/recommended`);
        setCompanies(res.data);
        setPagination({ page: 1, totalPages: 1, total: res.data.length });
      } else {
        res = await api.get(`/companies/popular`);
        setCompanies(res.data);
        setPagination({ page: 1, totalPages: 1, total: res.data.length });
      }
    } catch (err) {
      console.error("Erreur chargement entreprises:", err);
      setError("Impossible de charger les entreprises.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, fieldId, activeQuery, activeFilters]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveQuery(searchQuery.trim());
  };

  const handleApplyFilters = () => {
    setActiveFilters({ ...filters });
  };

  const handleResetFilters = () => {
    setFilters({ fieldId: "", domain: "", city: "", minScore: 0 });
    setActiveFilters(null);
    setSearchQuery("");
    setActiveQuery("");
  };

  return (
    <div className="min-h-screen bg-[#030614] text-white px-4 sm:px-8 md:px-10 font-sans relative antialiased overflow-x-hidden">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1450px] mx-auto">

        {/* --- SECTION EN-TÊTE / SEARCH --- */}
        <section className="text-center pt-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Explorer les meilleures entreprises
            </h1>
            <span className="bg-purple-500/10 text-purple-300 text-xs font-bold px-4 py-2 rounded-full border border-purple-500/20 whitespace-nowrap tracking-wide shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              ✨ +5000 entreprises disponibles
            </span>
          </div>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Trouvez les entreprises les plus adaptées à votre profil, votre filière et vos objectifs professionnels.
          </p>

          <form onSubmit={handleSearchSubmit} className="max-w-5xl mx-auto pt-4">
            <EntrepriseSearch value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </form>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-14 pb-24 items-start">

          {/* Panneau de gauche (Filtres) */}
          <div className="lg:col-span-1 lg:sticky lg:top-6">
            <EntrepriseSidebar
              filters={filters}
              onChange={setFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
            />
          </div>

          {/* Panneau de droite */}
          <div className="lg:col-span-3 space-y-8">

            {/* Cas 2 uniquement : bandeau IA (connecté + pas de recherche/filière active) */}
            {mode === "recommended" && <EntrepriseRecommendation />}

            {/* Titre + compteur selon le mode */}
            <div className="flex justify-between items-center">
              <h2 key={mode} className="text-white text-lg font-bold">
                {mode === "popular" && "Entreprises populaires"}
                {mode === "recommended" && "Entreprises recommandées"}
                {mode === "search" && (
                  <span>Résultats pour <span className="text-purple-400">"{activeQuery}"</span></span>
                )}
                {mode === "field" && fieldInfo && (
                  <span>Entreprises en <span className="text-purple-400">{fieldInfo.name}</span></span>
                )}
              </h2>
              {(mode === "search" || mode === "field") && (
                <p className="text-gray-400 text-sm">{pagination.total} entreprises trouvées</p>
              )}
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[250px] rounded-2xl bg-[#0c1230] animate-pulse" />
                ))}
              </div>
            )}

            {/* Erreur */}
            {!loading && error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
            )}

            {/* Empty state */}
            {!loading && !error && companies.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                <div className="w-20 h-20 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-white font-bold text-lg">Aucun résultat trouvé</p>
                <button
                  onClick={() => { setSearchQuery(""); setActiveQuery(""); }}
                  className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all">
                  Retour
                </button>
              </div>
            )}

            {/* Grille des cartes */}
            {!loading && !error && companies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {companies.map((c) => (
                  <EntrepriseCard
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    domain={c.domain}
                    location={c.city}
                    logoSvg={<DefaultLogo name={c.name} />}
                    isCompatible={!!c.compatibilityScore && c.compatibilityScore > 0}
                    compatibilityScore={c.compatibilityScore || 0}
                    canApply={!!c.can_apply}
                    contactEmail={c.contact_email}
                  />
                ))}
              </div>
            )}

            {/* Pagination (search & field uniquement) */}
            {!loading && (mode === "search" || mode === "field") && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-12 select-none">
                <button
                  disabled={pagination.page === 1}
                  onClick={() => fetchCompanies(pagination.page - 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-800 text-gray-500 hover:text-white transition-colors disabled:opacity-30 cursor-pointer">
                  &lt;
                </button>
                {[...Array(pagination.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => fetchCompanies(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm transition-colors cursor-pointer ${
                      pagination.page === i + 1
                        ? "bg-purple-600 text-white shadow-md shadow-purple-950/50"
                        : "border border-gray-800 text-gray-400 hover:text-white"
                    }`}>
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => fetchCompanies(pagination.page + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-800 text-gray-500 hover:text-white transition-colors disabled:opacity-30 cursor-pointer">
                  &gt;
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}