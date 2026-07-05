import { Eye, Pencil, Trash2, Ban, Play, CheckCircle2, XCircle } from "lucide-react";

const statusStyles = {
  active: "bg-emerald-100 text-emerald-800",
  suspended: "bg-rose-100 text-rose-800",
  pending: "bg-amber-100 text-amber-800",
};
const statusLabels = { active: "Actif", suspended: "Suspendu", pending: "En attente" };

export default function UtilisateurTable({
  users = [], loading, error,
  onView, onEdit, onToggleStatus, onPendingDecision, onDelete,
}) {
  return (
    <div style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "16px", padding: "24px" }}>
      <h3 className="text-base font-semibold text-gray-900 mb-5">Liste des utilisateurs</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-[15px]">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
              <th className="font-medium py-3 pr-4">Avatar</th>
              <th className="font-medium py-3 pr-4">Nom</th>
              <th className="font-medium py-3 pr-4">Email</th>
              <th className="font-medium py-3 pr-4">Ville</th>
              <th className="font-medium py-3 pr-4">Date</th>
              <th className="font-medium py-3 pr-4">Status</th>
              <th className="font-medium py-3 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={7} className="py-8 text-center text-gray-400">Chargement...</td></tr>}
            {!loading && error && <tr><td colSpan={7} className="py-8 text-center text-rose-500">{error}</td></tr>}
            {!loading && !error && users.length === 0 && (
              <tr><td colSpan={7} className="py-8 text-center text-gray-400">Aucun utilisateur trouvé</td></tr>
            )}
            {!loading && !error && users.map((u) => (
              <tr key={u.id} className="border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <td className="py-4 pr-4">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.fullname} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-semibold">
                      {u.fullname?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                  )}
                </td>
                <td className="py-4 pr-4 font-medium text-gray-900">{u.fullname}</td>
                <td className="py-4 pr-4 text-gray-600">{u.email}</td>
                <td className="py-4 pr-4 text-gray-600">{u.city || "-"}</td>
                <td className="py-4 pr-4 text-gray-600">{new Date(u.created_at).toLocaleDateString("fr-FR")}</td>
                <td className="py-4 pr-4">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${statusStyles[u.status]}`}>{statusLabels[u.status]}</span>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2.5">
                    {u.status === "pending" ? (
                      <>
                        <button onClick={() => onPendingDecision(u.id, "approve")} title="Valider le compte" className="w-9 h-9 flex items-center justify-center rounded-lg text-emerald-600 hover:bg-emerald-100 transition">
                          <CheckCircle2 size={18} />
                        </button>
                        <button onClick={() => onPendingDecision(u.id, "reject")} title="Refuser le compte" className="w-9 h-9 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-100 transition">
                          <XCircle size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => onView(u.id)} title="Voir" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition">
                          <Eye size={17} />
                        </button>
                        <button onClick={() => onEdit(u)} title="Modifier" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition">
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => onToggleStatus(u)}
                          title={u.status === "active" ? "Suspendre" : "Réactiver"}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg transition ${
                            u.status === "active" ? "text-gray-400 hover:bg-amber-100 hover:text-amber-600" : "text-gray-400 hover:bg-emerald-100 hover:text-emerald-600"
                          }`}
                        >
                          {u.status === "active" ? <Ban size={17} /> : <Play size={17} />}
                        </button>
                      </>
                    )}
                    <button onClick={() => onDelete(u.id)} title="Supprimer" className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}