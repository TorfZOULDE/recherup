import { Plus } from "lucide-react";

export default function FiliereHeader({ total = 0, onAdd }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Gestion des Filières</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Total : <span className="font-semibold text-indigo-600">{total}</span> filières
        </p>
      </div>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition shadow-sm"
      >
        <Plus size={16} />
        Ajouter filière
      </button>
    </div>
  );
}