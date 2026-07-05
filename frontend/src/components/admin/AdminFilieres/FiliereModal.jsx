import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f59e0b",
  "#10b981", "#3b82f6", "#ef4444", "#14b8a6",
];

const EMPTY = { name: "", icon: "", color: "#6366f1" };

export default function FiliereModal({ open, onClose, onSave, filiere = null }) {
  const isEdit = !!filiere;
  const [form, setForm]       = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    if (filiere) {
      setForm({ name: filiere.name || "", icon: filiere.icon || "", color: filiere.color || "#6366f1" });
    } else {
      setForm(EMPTY);
    }
    setError("");
  }, [filiere, open]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name) { setError("Le nom est obligatoire."); return; }
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">
            {isEdit ? "Modifier la filière" : "Ajouter une filière"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <p className="text-xs text-rose-500 bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Nom *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Informatique, Gestion, Droit..."
              className="w-full px-3 py-2.5 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">
              Icône <span className="text-gray-400 font-normal">(nom lucide ex: Code, BookOpen)</span>
            </label>
            <input
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="Code"
              className="w-full px-3 py-2.5 text-sm text-gray-900 border-2 border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Couleur</label>
            <div className="flex items-center gap-2 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setForm((prev) => ({ ...prev, color: c }))}
                  className="w-8 h-8 rounded-full border-2 transition"
                  style={{
                    backgroundColor: c,
                    borderColor: form.color === c ? "#1e293b" : "transparent",
                    transform: form.color === c ? "scale(1.15)" : "scale(1)",
                  }}
                />
              ))}
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm((prev) => ({ ...prev, color: e.target.value }))}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                title="Couleur personnalisée"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
            Annuler
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition">
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}