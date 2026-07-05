import { useState } from "react";
import { X } from "lucide-react";

const inputClass =
  "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

export default function UtilisateurEditModal({ item, onCancel, onSave }) {
  const [form, setForm] = useState({
    fullname: item.fullname || "",
    email: item.email || "",
    city: item.city || "",
    phone: item.phone || "",
    role: item.role || "user",
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
      <div className="bg-white rounded-2xl w-full max-w-md p-7 relative shadow-2xl">
        <button onClick={onCancel} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Modifier l'utilisateur</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom complet</label>
            <input name="fullname" value={form.fullname} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville</label>
            <input name="city" value={form.city} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Téléphone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Rôle</label>
            <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition">
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={saving} className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition shadow-sm">
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}