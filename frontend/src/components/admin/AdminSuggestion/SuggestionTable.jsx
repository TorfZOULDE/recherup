import { Eye, Search, Pencil, Check, X, Trash2, AlertTriangle } from "lucide-react";

const statusStyles = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-rose-100 text-rose-800",
  duplicate: "bg-rose-100 text-rose-800",
};
const statusLabels = {
  pending: "En attente", approved: "Approuvé", rejected: "Rejeté", duplicate: "Doublon",
};

export default function SuggestionTable({
  suggestions = [], loading, error,
  onView, onEdit, onCheckDuplicate, onApprove, onReject, onDelete,
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "16px", padding: "24px" }}>
      <h3 className="text-base font-semibold text-gray-900 mb-5">Liste des suggestions</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[15px]">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="font-medium py-3 pr-4">Entreprise</th>
              <th className="font-medium py-3 pr-4">Domaine</th>
              <th className="font-medium py-3 pr-4">Ville</th>
              <th className="font-medium py-3 pr-4">Proposé par</th>
              <th className="font-medium py-3 pr-4">Date</th>
              <th className="font-medium py-3 pr-4">Status</th>
              <th className="font-medium py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="py-8 text-center text-gray-400">Chargement...</td></tr>}
            {!loading && error && <tr><td colSpan={7} className="py-8 text-center text-rose-500">{error}</td></tr>}
            {!loading && !error && suggestions.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-gray-400">Aucune suggestion disponible</td></tr>
            )}
            {!loading && !error && suggestions.map((s) => {
              const isDuplicate = s.status === "duplicate";
              const isTreated = s.status !== "pending";
              return (
                <tr key={s.id} className={`border-b last:border-0 ${isDuplicate ? "bg-rose-50/60" : ""}`} style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <td className="py-4 pr-4 font-medium text-gray-900">{s.company_name}</td>
                  <td className="py-4 pr-4 text-gray-600">{s.domain || "-"}</td>
                  <td className="py-4 pr-4 text-gray-600">{s.city || "-"}</td>
                  <td className="py-4 pr-4 text-gray-600">{s.submitted_by_name || "Anonyme"}</td>
                  <td className="py-4 pr-4 text-gray-600">{new Date(s.submitted_at).toLocaleDateString("fr-FR")}</td>
                  <td className="py-4 pr-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${statusStyles[s.status]}`}>{statusLabels[s.status]}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2.5">
                      <button onClick={() => onView(s.id)} title="Voir" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
                        <Eye size={17} />
                      </button>
                      <button onClick={() => onCheckDuplicate(s.id)} title="Vérifier doublon" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition">
                        <Search size={17} />
                      </button>

                      {isDuplicate && (
                        <span className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-100 text-rose-700 text-xs font-semibold">
                          <AlertTriangle size={14} />Doublon
                        </span>
                      )}

                      {!isTreated && (
                        <>
                          <button onClick={() => onEdit(s)} title="Modifier" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition">
                            <Pencil size={17} />
                          </button>
                          <button onClick={() => onApprove(s.id)} title="Approuver" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-green-100 hover:text-green-600 transition">
                            <Check size={17} />
                          </button>
                          <button onClick={() => onReject(s.id)} title="Rejeter" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition">
                            <X size={17} />
                          </button>
                        </>
                      )}

                      <button onClick={() => onDelete(s.id)} title="Supprimer" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition">
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}