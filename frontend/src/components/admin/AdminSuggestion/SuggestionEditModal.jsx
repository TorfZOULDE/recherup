import { useState } from "react";
import { X } from "lucide-react";

const FIELDS = [
  { name: "company_name", label: "Nom entreprise" },
  { name: "city", label: "Ville" },
  { name: "domain", label: "Domaine" },
  { name: "contact_email", label: "Email" },
  { name: "phone", label: "Téléphone" },
  { name: "website", label: "Site web" },
];

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

export default function SuggestionEditModal({ item, onCancel, onSave }) {
  const [form, setForm] = useState({
    company_name: item.company_name || "",
    city: item.city || "",
    domain: item.domain || "",
    contact_email: item.contact_email || "",
    phone: item.phone || "",
    website: item.website || "",
    description: item.description || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-7 relative shadow-2xl">
        <button onClick={onCancel} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Modifier la suggestion</h3>
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
              <input name={f.name} value={form[f.name]} onChange={handleChange} className={inputClass} />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition">
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition shadow-sm"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}