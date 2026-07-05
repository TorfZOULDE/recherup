import { X, AlertTriangle, CheckCircle } from "lucide-react";

export default function SuggestionDuplicateModal({ result, onClose }) {
  const found = result?.found;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-7 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700">
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold text-gray-900 mb-5">Vérification de doublon</h3>
        {found ? (
          <>
            <div className="flex items-center gap-2 text-rose-600 mb-4">
              <AlertTriangle size={20} />
              <span className="text-sm font-semibold">Entreprise(s) similaire(s) trouvée(s)</span>
            </div>
            <ul className="space-y-2">
              {result.matches.map((m) => (
                <li key={m.id} className="border border-gray-200 rounded-xl px-4 py-3">
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.city} — statut : {m.status}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="text-sm font-semibold">Aucun doublon détecté</span>
          </div>
        )}
      </div>
    </div>
  );
}