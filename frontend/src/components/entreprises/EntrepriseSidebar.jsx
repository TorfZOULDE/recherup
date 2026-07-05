import { useState, useEffect } from "react";
import api from "../../services/api";

export default function EntrepriseSidebar({ filters, onChange, onApply, onReset }) {
  const [fields, setFields] = useState([]);
  const [loadingFields, setLoadingFields] = useState(true);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await api.get("/fields");
        setFields(res.data);
      } catch (err) {
        console.error("Erreur chargement filières:", err);
      } finally {
        setLoadingFields(false);
      }
    };
    fetchFields();
  }, []);

  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-[#0b1126]/80 border-2 border-gray-800/60 rounded-3xl p-7 w-full shadow-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-black text-white tracking-tight mb-8">
        Filtres
      </h2>

      <div className="space-y-7">

        {/* --- FILIÈRE (select déroulant) --- */}
        <div className="space-y-3">
          <h3 className="text-gray-500 uppercase text-xs font-black tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Filière
          </h3>
          <div className="relative">
            <select
              value={filters.fieldId || ""}
              onChange={(e) => handleChange("fieldId", e.target.value)}
              disabled={loadingFields}
              className="w-full bg-[#070b19] border border-gray-800 text-sm md:text-base text-gray-300 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-purple-500/50 cursor-pointer font-medium disabled:opacity-50">
              <option value="">Toutes les filières</option>
              {fields.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* --- DOMAINE (select texte libre, en attendant une vraie liste de domaines en base) --- */}
        <div className="space-y-3">
          <h3 className="text-gray-500 uppercase text-xs font-black tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A11.95 11.95 0 0112 21c-2.476 0-4.786-.755-6.702-2.049l.481-2.883a9.88 9.88 0 005.103-4.43m5.103-4.43a10.012 10.012 0 014.2 4.23m-4.2-4.23a9.92 9.92 0 00-4.23-4.2M12 3a9 9 0 00-3.182 17.182m5.73-15.556a9.06 9.06 0 011.517 3.396M12 3v18" />
            </svg>
            Domaine
          </h3>
          <input
            type="text"
            value={filters.domain || ""}
            onChange={(e) => handleChange("domain", e.target.value)}
            placeholder="Ex : Informatique, Finance..."
            className="w-full bg-[#070b19] border border-gray-800 text-sm md:text-base text-gray-300 placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500/50 font-medium"
          />
        </div>

        {/* --- VILLE (select déroulant) --- */}
        <div className="space-y-3">
          <h3 className="text-gray-500 uppercase text-xs font-black tracking-widest flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Ville
          </h3>
          <div className="relative">
            <select
              value={filters.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full bg-[#070b19] border border-gray-800 text-sm md:text-base text-gray-300 rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-purple-500/50 cursor-pointer font-medium">
              <option value="">Toutes les villes</option>
              <option value="Cotonou">Cotonou</option>
              <option value="Porto-Novo">Porto-Novo</option>
              <option value="Abomey-Calavi">Abomey-Calavi</option>
              <option value="Parakou">Parakou</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* --- SCORE COMPATIBILITÉ --- */}
        <div className="pt-6 border-t border-gray-800/80 space-y-4">
          <h3 className="text-gray-500 uppercase text-xs font-black tracking-widest">
            Score Compatibilité minimum
          </h3>
          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.minScore || 0}
              onChange={(e) => handleChange("minScore", e.target.value)}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            />
            <div className="flex justify-between text-[11px] text-gray-500 font-extrabold pt-2 px-0.5">
              <span>0%</span>
              <span className="text-blue-400">{filters.minScore || 0}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- BOUTONS D'ACTION --- */}
      <div className="space-y-3 pt-8">
        <button
          onClick={onApply}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide transition-all shadow-md shadow-purple-950/50 cursor-pointer active:scale-95">
          Appliquer filtres
        </button>

        <button
          onClick={onReset}
          className="w-full py-3.5 rounded-xl border border-gray-800 bg-transparent text-gray-400 hover:text-white hover:bg-white/[0.02] font-bold text-sm tracking-wide transition-all cursor-pointer">
          Réinitialiser
        </button>
      </div>

    </div>
  );
}