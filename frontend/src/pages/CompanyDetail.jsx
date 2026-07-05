import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function DefaultLogo({ name }) {
  return (
    <div className="w-full h-full bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 font-black text-3xl">
      {name?.charAt(0)?.toUpperCase() || "?"}
    </div>
  );
}

export default function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/companies/${id}`);
        setCompany(res.data);
      } catch (err) {
        setError("Entreprise introuvable.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030614] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-[#030614] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-white font-bold text-xl">{error || "Entreprise introuvable."}</p>
        <button onClick={() => navigate("/entreprises")}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold transition-all">
          Retour aux entreprises
        </button>
      </div>
    );
  }

  const isCompatible = !!company.compatibilityScore && company.compatibilityScore > 0;

  return (
    <div className="min-h-screen bg-[#030614] text-white px-4 sm:px-8 md:px-10 font-sans antialiased overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto py-10 relative">

        {/* Fil d'ariane / retour */}
        <Link to="/entreprises" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold mb-8 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"/>
          </svg>
          Retour aux entreprises
        </Link>

        {/* En-tête entreprise */}
        <div className="bg-[#070b19]/80 border-2 border-gray-800/60 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start mb-8">
          <div className="w-24 h-24 shrink-0">
            <DefaultLogo name={company.name} />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{company.name}</h1>
              <p className="text-gray-400 text-base mt-1">{company.domain}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-bold bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {company.city}
              </span>

              {isCompatible && (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 text-sm font-black bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {company.compatibilityScore}% compatible
                </span>
              )}
            </div>

            {/* Filières liées */}
            {company.fields?.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {company.fields.map((f) => (
                  <span key={f.id} className="text-xs font-bold text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    {f.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bouton Postuler conditionnel — mailto si email renseigné */}
          <div className="w-full md:w-auto shrink-0">
            {company.can_apply && company.contact_email ? (
              <a
                href={`mailto:${company.contact_email}?subject=${encodeURIComponent(`Candidature - ${company.name}`)}`}
                className="block text-center w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:brightness-110 text-white text-sm font-black shadow-lg shadow-purple-950/50 transition-all active:scale-95">
                Postuler
              </a>
            ) : (
              <span className="block text-center text-gray-500 text-xs font-semibold bg-gray-800/40 border border-gray-800 px-5 py-3 rounded-xl">
                Candidatures fermées
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#070b19]/80 border-2 border-gray-800/60 rounded-3xl p-8 md:p-10 space-y-4">
          <h2 className="text-xl font-extrabold text-white">À propos</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            {company.description || "Aucune description disponible pour cette entreprise."}
          </p>
        </div>

      </div>
    </div>
  );
}