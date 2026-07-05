import { useState } from "react";
import { FileBarChart, SlidersHorizontal, X, Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "Tous les statuts" },
  { value: "active", label: "Actif" },
  { value: "suspended", label: "Suspendu" },
  { value: "pending", label: "En attente" },
];

const PERIOD_OPTIONS = [
  { value: "", label: "Toutes les dates" },
  { value: "today", label: "Aujourd'hui" },
  { value: "7d", label: "7 derniers jours" },
  { value: "30d", label: "30 derniers jours" },
];

export default function UtilisateurHeader({ 
  total = 0, 
  search = "", 
  onSearch,
  filters = {},
  onFilter,
  onExport,
  exporting,
}) {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = filters?.status || filters?.city || filters?.period;

  const handleFilter = (key, value) => {
    onFilter((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    onFilter({ status: "", city: "", period: "" });
  };

  return (
    <div className="mb-6">
      {/* Titre + boutons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow">
            Gestion des Utilisateurs
          </h1>
          <p className="text-sm text-slate-300 mt-0.5">
            Total : {total.toLocaleString("fr-FR")} utilisateurs actifs
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExport}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            <FileBarChart size={16} />
            {exporting ? "Génération..." : "Générer Rapport"}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition ${
              hasActiveFilters 
                ? "bg-indigo-600" 
                : ""
            }`}
            style={!hasActiveFilters ? { 
              background: "rgba(255,255,255,0.12)", 
              border: "1px solid rgba(255,255,255,0.2)" 
            } : {}}
          >
            <SlidersHorizontal size={15} />
            Filtres
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="relative max-w-sm mt-3">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Rechercher un utilisateur..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg text-white placeholder:text-slate-400 bg-transparent"
          style={{ 
            background: "rgba(255,255,255,0.1)", 
            border: "1px solid rgba(255,255,255,0.2)" 
          }}
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Panneau des filtres */}
      {showFilters && (
        <div 
          className="mt-3 p-4 rounded-xl flex items-end gap-4 flex-wrap"
          style={{ 
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Statut</label>
            <select
              value={filters?.status || ""}
              onChange={(e) => handleFilter("status", e.target.value)}
              className="px-3 py-2 text-sm rounded-lg bg-transparent text-white border border-white/20 outline-none focus:border-indigo-500"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} className="bg-[#0b0e1a]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Ville</label>
            <input
              value={filters?.city || ""}
              onChange={(e) => handleFilter("city", e.target.value)}
              placeholder="Cotonou..."
              className="px-3 py-2 text-sm rounded-lg bg-transparent text-white placeholder:text-slate-500 border border-white/20 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 mb-1 block">Période</label>
            <select
              value={filters?.period || ""}
              onChange={(e) => handleFilter("period", e.target.value)}
              className="px-3 py-2 text-sm rounded-lg bg-transparent text-white border border-white/20 outline-none focus:border-indigo-500"
            >
              {PERIOD_OPTIONS.map((p) => (
                <option key={p.value} value={p.value} className="bg-[#0b0e1a]">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 pb-2 transition"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  );
}