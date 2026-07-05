import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

const SECTOR_COLORS = {
  "Télécommunication": { bg: "#FF7900", text: "#fff" },
  "Banque":            { bg: "#003da5", text: "#fff" },
  "Finance":           { bg: "#1e40af", text: "#fff" },
  "Energie":           { bg: "#dc2626", text: "#fff" },
  "Logistique":        { bg: "#92400e", text: "#fff" },
  "Transport":         { bg: "#78350f", text: "#fff" },
  "Assurance":         { bg: "#065f46", text: "#fff" },
  "Hôtellerie":        { bg: "#7c3aed", text: "#fff" },
  "Agriculture":       { bg: "#15803d", text: "#fff" },
  "BTP":               { bg: "#b45309", text: "#fff" },
  "Santé":             { bg: "#be123c", text: "#fff" },
  "Technologie":       { bg: "#0891b2", text: "#fff" },
  "Commerce":          { bg: "#d97706", text: "#fff" },
  "Industrie":         { bg: "#475569", text: "#fff" },
  "EdTech":            { bg: "#6d28d9", text: "#fff" },
  "Education":         { bg: "#4f46e5", text: "#fff" },
};

const DEFAULT_COLOR = { bg: "#6366f1", text: "#fff" };

function getInitials(name = "") {
  return name.split(" ").filter(w => w.length > 0).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

function CompanyLogo({ name, domain, logoUrl }) {
  const [imgError, setImgError] = useState(false);
  if (logoUrl && !imgError) {
    return <img src={logoUrl} alt={name} className="w-full h-full object-contain p-1" onError={() => setImgError(true)} />;
  }
  const { bg, text } = SECTOR_COLORS[domain] || DEFAULT_COLOR;
  return (
    <div className="w-full h-full rounded-2xl flex items-center justify-center font-black text-base md:text-lg select-none"
      style={{ backgroundColor: bg, color: text }}>
      {getInitials(name)}
    </div>
  );
}

export default function PopularCompanies({ searchCompanies, isSearching, searching }) {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/companies/popular")
      .then(r => setPopular(r.data))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const companies = isSearching ? (searchCompanies || []) : popular;
  const isLoading = loading || (isSearching && searching && !searchCompanies);
  const isEmpty   = isSearching && !searching && searchCompanies !== null && companies.length === 0;

  const title = isSearching
    ? searching ? "Recherche en cours..." : `Entreprises trouvées (${companies.length})`
    : "Entreprises populaires";

  return (
    <section className="py-10 md:py-20">
      <div className="flex justify-between items-center mb-8 md:mb-12">
        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{title}</h2>
          {isSearching && searching && (
            <svg className="w-5 h-5 text-purple-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          )}
        </div>
        <Link to="/entreprises" className="text-purple-400 font-bold text-sm md:text-lg hover:text-purple-300 transition-all flex items-center gap-1.5 md:gap-2 group shrink-0">
          Découvrir tout <span className="group-hover:translate-x-1 transition-transform">➔</span>
        </Link>
      </div>

      {isEmpty && (
        <div className="text-center py-12 md:py-16 space-y-4">
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <p className="text-gray-400 font-semibold text-base md:text-lg">Aucune entreprise trouvée</p>
          <Link to="/entreprises" className="inline-block px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all">
            Voir toutes les entreprises
          </Link>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-[260px] md:h-[350px] rounded-2xl md:rounded-3xl bg-[#070b19]/80 animate-pulse border-2 border-gray-800/60"/>
          ))}
        </div>
      )}

      {!isLoading && !isEmpty && companies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {companies.map((company, idx) => {
            const { bg } = SECTOR_COLORS[company.domain] || DEFAULT_COLOR;
            return (
              <div
                key={company.id || idx}
                onClick={() => navigate(`/entreprises/${company.id}`)}
                className="bg-[#070b19]/80 border-2 border-gray-800/60 rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col justify-between min-h-[260px] md:min-h-[350px] transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:bg-[#1a1f35] hover:border-purple-500/50 group relative overflow-hidden shadow-2xl cursor-pointer"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: bg }} />

                <div className="space-y-4 md:space-y-6">
                  <div className="w-14 h-14 md:w-20 md:h-20 border border-gray-800 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-inner group-hover:border-purple-500/50 transition-colors overflow-hidden" style={{ background: "#101731" }}>
                    <CompanyLogo name={company.name} domain={company.domain} logoUrl={company.logoUrl} />
                  </div>

                  <div>
                    <h4 className="text-white font-black text-lg md:text-2xl group-hover:text-purple-300 transition-colors leading-tight">
                      {company.name}
                    </h4>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ backgroundColor: bg + "22", color: bg }}>
                      {company.domain}
                    </span>
                    <p className="text-cyan-400 text-xs md:text-sm font-bold mt-2 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      {company.city}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mt-4 md:mt-8">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/entreprises/${company.id}`); }}
                    className="w-full py-3 md:py-4 rounded-xl md:rounded-2xl border-2 border-gray-700 bg-transparent text-gray-300 font-black text-sm hover:border-purple-500 hover:text-white transition-all active:scale-95"
                  >
                    Voir détails
                  </button>
                  {company.compatibilityScore > 0 && (
                    <div className="w-full bg-[#0a1f1f] border-2 border-emerald-500/30 text-emerald-400 font-black py-3 md:py-4 rounded-xl md:rounded-2xl text-center flex items-center justify-center gap-2 text-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"/>
                      {company.compatibilityScore}% compatible
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}