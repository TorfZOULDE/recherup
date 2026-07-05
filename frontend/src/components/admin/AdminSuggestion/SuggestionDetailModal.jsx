import { X } from "lucide-react";

export default function SuggestionDetailModal({ item, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-7 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Détail de la suggestion</h3>
        <div className="space-y-3 text-sm text-gray-800 max-h-[65vh] overflow-y-auto pr-1">
          {[
            ["Nom entreprise", item.company_name],
            ["Domaine", item.domain],
            ["Ville", item.city],
            ["Téléphone", item.phone],
            ["Email", item.contact_email],
            ["Site web", item.website],
            ["Description", item.description],
            ["Proposé par", item.submitted_by_name || "Anonyme"],
            ["Date", new Date(item.submitted_at).toLocaleString("fr-FR")],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2 border-b border-gray-100 pb-2 last:border-0">
              <span className="font-semibold text-gray-900 min-w-[140px]">{label} :</span>
              <span className="text-gray-600">{value || "-"}</span>
            </div>
          ))}
          {item.admin_comment && (
            <div className="flex gap-2 pt-2">
              <span className="font-semibold text-gray-900 min-w-[140px]">Commentaire admin :</span>
              <span className="text-gray-600">{item.admin_comment}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}