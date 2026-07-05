import { FileBarChart, Search } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "Tous les statuts" },
  { value: "pending", label: "En attente" },
  { value: "approved", label: "Approuvé" },
  { value: "rejected", label: "Rejeté" },
  { value: "duplicate", label: "Doublon" },
];

export default function SuggestionHeader({
  total = 0, status = "", onStatusChange,
  search = "", onSearchChange, onExport, exporting,
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white drop-shadow">Gestion des Suggestions</h1>
          <p className="text-base text-slate-300 mt-1">
            Total : {total.toLocaleString("fr-FR")} suggestion{total > 1 ? "s" : ""} en attente
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onExport}
            disabled={exporting}
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50 shadow-sm"
          >
            <FileBarChart size={18} />{exporting ? "Génération..." : "Générer Rapport"}
          </button>
          <select
            value={status}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="px-4 py-3 text-sm font-medium text-white rounded-xl bg-transparent cursor-pointer"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-gray-900 bg-white">{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative max-w-md">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Rechercher une suggestion..."
          className="w-full pl-10 pr-4 py-3 text-sm rounded-xl text-white placeholder:text-slate-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
        />
      </div>
    </div>
  );
}