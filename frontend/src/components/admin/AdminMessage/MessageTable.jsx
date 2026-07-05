import { Eye, Trash2, Archive } from "lucide-react";

const typeStyles = { User: "bg-sky-100 text-sky-800", Company: "bg-indigo-100 text-indigo-800" };
const statusStyles = {
  Unread: "text-gray-900 font-semibold",
  Read: "text-gray-400",
  Replied: "text-emerald-600 font-medium",
  Archived: "text-gray-300 italic",
};
const statusLabels = { Unread: "Unread", Read: "Read", Replied: "Replied", Archived: "Archived" };

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR");
}

export default function MessageTable({ messages = [], loading, selectedId, onSelect, onArchive, onDeleteRequest }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "12px", padding: "20px" }}>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Boîte de réception centralisée</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
              <th className="font-medium py-2 pr-4">Sender</th>
              <th className="font-medium py-2 pr-4">Type</th>
              <th className="font-medium py-2 pr-4">Subject</th>
              <th className="font-medium py-2 pr-4">Date</th>
              <th className="font-medium py-2 pr-4">Status</th>
              <th className="font-medium py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <td colSpan={6} className="py-3"><div className="h-4 bg-gray-100 rounded animate-pulse" /></td>
                </tr>
              ))
            )}

            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10 text-center text-sm text-gray-400">Aucun message trouvé</td>
              </tr>
            )}

            {!loading && messages.map((m) => (
              <tr key={m.id} className={`border-b last:border-0 ${selectedId === m.id ? "bg-indigo-50/60" : ""}`} style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <td className="py-3 pr-4 font-medium text-gray-900">{m.sender}</td>
                <td className="py-3 pr-4"><span className={`px-2 py-1 rounded-md text-xs font-medium ${typeStyles[m.type]}`}>{m.type}</span></td>
                <td className="py-3 pr-4 text-gray-600">{m.subject}</td>
                <td className="py-3 pr-4 text-gray-600">{formatDate(m.date)}</td>
                <td className={`py-3 pr-4 text-xs ${statusStyles[m.status]}`}>{statusLabels[m.status]}</td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => onSelect(m)} className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition"><Eye size={15} /></button>
                    <button onClick={() => onDeleteRequest(m.id)} className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-rose-100 hover:text-rose-600 transition"><Trash2 size={15} /></button>
                    <button
                      onClick={() => onArchive(m.id)}
                      disabled={m.status === "Archived"}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Archive size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}