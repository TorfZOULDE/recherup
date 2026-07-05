import { X, Building2, MapPin, Mail, Calendar, Tag } from "lucide-react";

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-600",
  pending:  "bg-amber-50 text-amber-600",
  rejected: "bg-gray-100 text-gray-500",
  disabled: "bg-rose-50 text-rose-500",
};
const statusLabels = {
  approved: "Approuvé",
  pending:  "En attente",
  rejected: "Rejeté",
  disabled: "Désactivé",
};

export default function EntrepriseDetailModal({ open, onClose, entreprise }) {
  if (!open || !entreprise) return null;

  const rows = [
    { icon: Building2, label: "Domaine",      value: entreprise.domain },
    { icon: MapPin,    label: "Ville",         value: entreprise.city },
    { icon: Mail,      label: "Email",         value: entreprise.contact_email },
    { icon: Calendar,  label: "Date d'ajout",  value: entreprise.created_at
        ? new Date(entreprise.created_at).toLocaleDateString("fr-FR") : "—" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Building2 size={17} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">{entreprise.name}</h2>
              <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${statusStyles[entreprise.status] || "bg-gray-50 text-gray-500"}`}>
                {statusLabels[entreprise.status] || entreprise.status}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {rows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-900">{value || "—"}</p>
              </div>
            </div>
          ))}

          {entreprise.description && (
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Tag size={14} className="text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed">{entreprise.description}</p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}