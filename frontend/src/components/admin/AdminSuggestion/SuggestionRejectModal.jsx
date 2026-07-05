import { useState } from "react";

const MOTIFS = ["Informations incomplètes", "Doublon", "Entreprise invalide", "Autre"];

export default function SuggestionRejectModal({ onCancel, onConfirm }) {
  const [motif, setMotif] = useState(MOTIFS[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-7 shadow-2xl">
        <h3 className="text-xl font-bold text-gray-900 mb-5">Rejeter cette suggestion ?</h3>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Motif</label>
        <select
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6"
        >
          {MOTIFS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-5 py-2.5 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition">
            Annuler
          </button>
          <button onClick={() => onConfirm(motif)} className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition shadow-sm">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}