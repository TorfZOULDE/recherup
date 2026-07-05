import { Pencil, Trash2 } from "lucide-react";

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-50">
      {[...Array(4)].map((_, i) => (
        <td key={i} className="py-3 pr-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export default function FiliereTable({ filieres = [], loading = false, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Liste des filières</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
              <th className="font-medium py-2 pr-4">Nom</th>
              <th className="font-medium py-2 pr-4">Icône</th>
              <th className="font-medium py-2 pr-4">Couleur</th>
              <th className="font-medium py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
            ) : filieres.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-sm text-gray-400">
                  Aucune filière trouvée
                </td>
              </tr>
            ) : (
              filieres.map((f) => (
                <tr key={f.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                  <td className="py-3 pr-4 font-medium text-gray-900">{f.name}</td>
                  <td className="py-3 pr-4 text-gray-500">{f.icon || "—"}</td>
                  <td className="py-3 pr-4">
                    {f.color ? (
                      <div className="flex items-center gap-2">
                        <span
                          className="w-5 h-5 rounded-full border border-gray-200 flex-shrink-0"
                          style={{ backgroundColor: f.color }}
                        />
                        <span className="text-gray-500 text-xs">{f.color}</span>
                      </div>
                    ) : "—"}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEdit(f)}
                        title="Modifier"
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => onDelete(f)}
                        title="Supprimer"
                        className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-rose-50 hover:text-rose-500 transition"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}