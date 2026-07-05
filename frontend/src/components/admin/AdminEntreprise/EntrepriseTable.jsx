import { Eye, Pencil, Trash2, Ban, CheckCircle } from "lucide-react";

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-600",
  pending:  "bg-amber-50 text-amber-600",
  rejected: "bg-gray-100 text-gray-500",
  disabled: "bg-rose-50 text-rose-500",
  deleted:  "bg-rose-100 text-rose-700",
};

const statusLabels = {
  approved: "Approuvé",
  pending:  "En attente",
  rejected: "Rejeté",
  disabled: "Désactivé",
  deleted:  "Supprimé",
};

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50">
      {[...Array(6)].map((_, i) => (
        <td key={i} className="py-3 pr-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function EntrepriseTable({ entreprises = [], loading = false, onView, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Liste des entreprises</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
              <th className="font-medium py-2 pr-4">Nom</th>
              <th className="font-medium py-2 pr-4">Domaine</th>
              <th className="font-medium py-2 pr-4">Ville</th>
              <th className="font-medium py-2 pr-4">Email</th>
              <th className="font-medium py-2 pr-4">Status</th>
              <th className="font-medium py-2 pr-4">Date</th>
              <th className="font-medium py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(7)].map((_, i) => <SkeletonRow key={i} />)
            ) : entreprises.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-sm text-gray-400">
                  Aucune entreprise trouvée
                </td>
              </tr>
            ) : (
              entreprises.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                  <td className="py-3 pr-4 font-medium text-gray-900">{e.name}</td>
                  <td className="py-3 pr-4 text-gray-500">{e.domain || "—"}</td>
                  <td className="py-3 pr-4 text-gray-500">{e.city || "—"}</td>
                  <td className="py-3 pr-4 text-gray-500">{e.contact_email || "—"}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[e.status] || "bg-gray-50 text-gray-500"}`}>
                      {statusLabels[e.status] || e.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-500">
                    {e.created_at ? new Date(e.created_at).toLocaleDateString("fr-FR") : "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onView(e)} title="Voir"
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => onEdit(e)} title="Modifier"
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onDelete(e)} title="Supprimer"
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition">
                        <Trash2 size={15} />
                      </button>
                      <button
                        onClick={() => onToggleStatus(e)}
                        title={e.status === "disabled" ? "Réactiver" : "Désactiver"}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                      >
                        {e.status === "disabled"
                          ? <CheckCircle size={15} className="text-emerald-500" />
                          : <Ban size={15} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}