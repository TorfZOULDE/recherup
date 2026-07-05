import { Trash2, X } from "lucide-react";

export default function FiliereDeleteModal({ open, onClose, onConfirm, loading, nom }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Confirmer la suppression</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-6 flex flex-col items-center text-center gap-3">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
            <Trash2 size={20} className="text-rose-500" />
          </div>
          <p className="text-sm text-gray-700">
            Voulez-vous supprimer la filière{" "}
            <span className="font-semibold text-gray-900">{nom}</span> ?
          </p>
          <p className="text-xs text-gray-400">
            Les entreprises liées à cette filière ne seront pas supprimées.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600 disabled:opacity-60 transition">
            {loading ? "Suppression..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
}