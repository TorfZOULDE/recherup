import { useState } from "react";
import { FileBarChart, SlidersHorizontal } from "lucide-react";

export default function MessageHeader({ total = 0, filters, onFilterChange }) {
  const [open, setOpen] = useState(false);

  const update = (key, value) => onFilterChange({ ...filters, [key]: value });

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white drop-shadow">Centre de Messages</h1>
          <p className="text-sm text-slate-300 mt-0.5">Total: {total.toLocaleString("fr-FR")} messages</p>
        </div>
        <div className="flex items-center gap-3 relative">
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition">
            <FileBarChart size={16} />Générer Rapport
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <SlidersHorizontal size={15} />Filtres
          </button>

          {open && (
            <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-xl p-4 z-20 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => update("type", e.target.value)}
                  className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5"
                >
                  <option value="">Tous</option>
                  <option value="user">Utilisateur</option>
                  <option value="company">Entreprise</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => update("status", e.target.value)}
                  className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5"
                >
                  <option value="">Tous</option>
                  <option value="unread">Non lu</option>
                  <option value="read">Lu</option>
                  <option value="replied">Répondu</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500">Date</label>
                <select
                  value={filters.period}
                  onChange={(e) => update("period", e.target.value)}
                  className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5"
                >
                  <option value="">Toutes</option>
                  <option value="today">Aujourd'hui</option>
                  <option value="7d">7 jours</option>
                  <option value="30d">30 jours</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}