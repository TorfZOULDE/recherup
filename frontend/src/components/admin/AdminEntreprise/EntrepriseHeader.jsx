import { useState } from "react";
import { Plus, SlidersHorizontal, Search, X } from "lucide-react";

const STATUTS = [
  { value: "",         label: "Tous les statuts" },
  { value: "approved", label: "Approuvé" },
  { value: "pending",  label: "En attente" },
  { value: "rejected", label: "Rejeté" },
  { value: "disabled", label: "Désactivé" },
];

export default function EntrepriseHeader({ total = 0, search, onSearch, filters, onFilter, onAdd }) {
  const [showFilters, setShowFilters] = useState(false);
  const hasActiveFilters = filters?.status || filters?.city;

  const handleFilter = (key, value) =>
    onFilter((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    onFilter({ status: "", city: "" });

  return (
    <div className="mb-6">
      {/* Titre + boutons */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Gestion des Entreprises</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Total : <span className="font-semibold text-indigo-600">{total.toLocaleString("fr-FR")}</span> entreprises
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition ${
              showFilters || hasActiveFilters
                ? "bg-indigo-50 text-indigo-600 border-indigo-300"
                : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
            }`}
          >
            <SlidersHorizontal size={15} />
            Filtres
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={16} />
            Ajouter entreprise
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search || ""}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Rechercher une entreprise..."
          className="w-full pl-9 pr-9 py-2.5 text-sm text-gray-900 bg-white border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder-gray-400 shadow-sm"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Panneau filtres */}
      {showFilters && (
        <div className="mt-3 p-4 bg-white border-2 border-gray-200 rounded-xl shadow-md flex items-end gap-4 flex-wrap">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Statut</label>
            <select
              value={filters?.status || ""}
              onChange={(e) => handleFilter("status", e.target.value)}
              className="px-3 py-2.5 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition cursor-pointer"
            >
              {STATUTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Ville</label>
            <input
              value={filters?.city || ""}
              onChange={(e) => handleFilter("city", e.target.value)}
              placeholder="Cotonou..."
              className="px-3 py-2.5 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder-gray-400"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 text-xs font-medium text-rose-500 border-2 border-rose-200 rounded-lg hover:bg-rose-50 transition"
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  );
}