import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DOMAINES = [
  "Télécommunication", "Banque", "Technologie", "Santé",
  "Agriculture", "Education", "Transport", "Finance",
  "Énergie", "E-Santé", "EdTech", "Services Financiers",
  "Logistique", "BTP", "Assurance", "Hôtellerie",
  "Médias", "Commerce", "Industrie",
];

const EMPTY = {
  name: "", domain: "", city: "",
  contact_email: "", description: "", status: "pending",
};

const inputClass = "w-full px-3 py-2.5 text-sm text-gray-900 bg-white border-2 border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition placeholder-gray-400";
const labelClass = "text-xs font-medium text-gray-700 mb-1.5 block";

export default function EntrepriseModal({ open, onClose, onSave, entreprise = null }) {
  const isEdit = !!entreprise;
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    setForm(entreprise ? {
      name:          entreprise.name          || "",
      domain:        entreprise.domain        || "",
      city:          entreprise.city          || "",
      contact_email: entreprise.contact_email || "",
      description:   entreprise.description   || "",
      status:        entreprise.status        || "pending",
    } : EMPTY);
    setError("");
  }, [entreprise, open]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.domain || !form.city) {
      setError("Nom, Domaine et Ville sont obligatoires.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">
            {isEdit ? "Modifier l'entreprise" : "Ajouter une entreprise"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        {/* Body scrollable */}
        <div className="px-6 py-5 space-y-4 overflow-y-auto flex-1">
          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Nom *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="MTN Benin"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Domaine *</label>
              <select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                className={inputClass + " cursor-pointer"}
              >
                <option value="">Sélectionner</option>
                {DOMAINES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Ville *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Cotonou"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                name="contact_email"
                value={form.contact_email}
                onChange={handleChange}
                placeholder="contact@entreprise.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Entreprise spécialisée dans..."
              className={inputClass + " resize-none"}
            />
          </div>

          <div>
            <label className={labelClass}>Statut</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass + " cursor-pointer"}
            >
              <option value="approved">Approuvé</option>
              <option value="pending">En attente</option>
              <option value="rejected">Rejeté</option>
              <option value="disabled">Désactivé</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}