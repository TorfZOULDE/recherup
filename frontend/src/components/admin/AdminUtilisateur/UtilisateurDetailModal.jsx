import { X } from "lucide-react";

export default function UtilisateurDetailModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-7 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Détail de l'utilisateur</h3>
        <div className="space-y-3 text-sm text-gray-800">
          {[
            ["Nom", item.fullname],
            ["Email", item.email],
            ["Téléphone", item.phone],
            ["Ville", item.city],
            ["Date inscription", new Date(item.created_at).toLocaleString("fr-FR")],
            ["Dernière connexion", item.last_login ? new Date(item.last_login).toLocaleString("fr-FR") : "Jamais connecté"],
            ["Statut", item.status],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2 border-b border-gray-100 pb-2 last:border-0">
              <span className="font-semibold text-gray-900 min-w-[160px]">{label} :</span>
              <span className="text-gray-600">{value || "-"}</span>
            </div>
          ))}
          {item.ban_reason && (
            <div className="flex gap-2 pt-1">
              <span className="font-semibold text-gray-900 min-w-[160px]">Motif suspension :</span>
              <span className="text-rose-600">{item.ban_reason}</span>
            </div>
          )}
        </div>

        <h4 className="text-sm font-bold text-gray-900 mt-6 mb-3">Activité</h4>
        <div className="grid grid-cols-3 gap-3">
          {[
            ["Favoris", item.stats?.favorites],
            ["Messages", item.stats?.messages],
            ["Suggestions", item.stats?.suggestions],
          ].map(([label, value]) => (
            <div key={label} className="border border-gray-200 rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-bold text-indigo-600">{value ?? 0}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}