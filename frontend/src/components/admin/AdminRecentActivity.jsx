import { useState } from "react";
import { Eye, Check, X, Trash2, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const statutStyles = {
  "En attente": "bg-amber-100 text-amber-800",
  "Validé":     "bg-emerald-100 text-emerald-800",
  "Refusé":     "bg-rose-100 text-rose-800",
};
const sourceStyles = {
  "Entreprise":  "bg-indigo-100 text-indigo-800",
  "Utilisateur": "bg-sky-100 text-sky-800",
};

const glass = { background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" };
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" };
const modalStyle = { background: "#fff", borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "460px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" };

export default function AdminRecentActivity({ rows = [], onRefresh }) {
  const navigate = useNavigate();

  const [detail, setDetail]       = useState(null);
  const [confirm, setConfirm]     = useState(null); // { row, action: 'delete'|'approve'|'reject' }
  const [toast, setToast]         = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const getEndpoint = (row, action) => {
    const base = row.type === "suggestion"
      ? `/admin/suggestions/${row.id}`
      : `/admin/companies/${row.id}`;
    if (action === "delete")  return { method: "delete", url: base };
    if (action === "approve") return { method: "patch",  url: `${base}/approve` };
    if (action === "reject")  return { method: "patch",  url: `${base}/reject` };
  };

  const execAction = async () => {
    if (!confirm) return;
    const { row, action } = confirm;
    setConfirm(null);
    setLoadingId(`${row.id}-${action}`);
    try {
      const ep = getEndpoint(row, action);
      await api[ep.method](ep.url);
      const msgs = { delete: "Supprimé avec succès.", approve: "Validé avec succès.", reject: "Refusé." };
      showToast(msgs[action]);
      onRefresh?.();
    } catch (e) {
      showToast("Erreur : " + (e.response?.data?.error || "action impossible."));
    } finally {
      setLoadingId(null);
    }
  };

  const actionLabel = { delete: "Supprimer", approve: "Valider", reject: "Refuser" };
  const actionColor = { delete: "#ef4444", approve: "#10b981", reject: "#f59e0b" };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium text-white shadow-lg"
          style={{ background: "rgba(15,23,42,0.92)", backdropFilter: "blur(12px)" }}>
          {toast}
        </div>
      )}

      {/* Modal Détail */}
      {detail && (
        <div style={overlayStyle} onClick={() => setDetail(null)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-900">Détails</h3>
              <button onClick={() => setDetail(null)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                ["Entreprise", detail.entreprise],
                ["Source",     detail.source],
                ["Localisation", detail.localisation],
                ["Date",       detail.date],
                ["Statut",     detail.statut],
              ].map(([label, val]) => val && (
                <div key={label} className="flex items-start gap-3">
                  <span className="text-xs text-slate-400 w-28 flex-shrink-0 mt-0.5">{label}</span>
                  <span className="text-sm font-medium text-slate-900">{val}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => { setDetail(null); setConfirm({ row: detail, action: "approve" }); }}
                className="flex-1 py-2 text-sm font-medium text-white rounded-lg transition"
                style={{ background: "#10b981" }}>
                Valider
              </button>
              <button onClick={() => { setDetail(null); setConfirm({ row: detail, action: "reject" }); }}
                className="flex-1 py-2 text-sm font-medium text-white rounded-lg transition"
                style={{ background: "#f59e0b" }}>
                Refuser
              </button>
              <button onClick={() => setDetail(null)}
                className="flex-1 py-2 text-sm font-medium text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmation */}
      {confirm && (
        <div style={overlayStyle} onClick={() => setConfirm(null)}>
          <div style={{ ...modalStyle, maxWidth: "380px" }} onClick={e => e.stopPropagation()}>
            <div className="flex flex-col items-center text-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: `${actionColor[confirm.action]}20` }}>
                <AlertTriangle size={22} style={{ color: actionColor[confirm.action] }} />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {confirm.action === "delete" ? "Supprimer ?" : confirm.action === "approve" ? "Valider ?" : "Refuser ?"}
              </h3>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-700">{confirm.row.entreprise}</span>
                {confirm.action === "delete" ? " — cette action est irréversible." : ""}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirm(null)}
                className="flex-1 py-2.5 text-sm font-medium text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-50 transition">
                Annuler
              </button>
              <button onClick={execAction}
                className="flex-1 py-2.5 text-sm font-medium text-white rounded-lg transition"
                style={{ background: actionColor[confirm.action] }}>
                {actionLabel[confirm.action]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="p-5 rounded-xl" style={glass}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-900">Activités récentes</h3>
          <button onClick={() => navigate('/admin/suggestions')}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition">
            Voir tout →
          </button>
        </div>

        {rows.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">Aucune activité récente</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-200">
                  <th className="font-medium py-2 pr-4">Entreprise</th>
                  <th className="font-medium py-2 pr-4">Source</th>
                  <th className="font-medium py-2 pr-4">Localisation</th>
                  <th className="font-medium py-2 pr-4">Date</th>
                  <th className="font-medium py-2 pr-4">Statut</th>
                  <th className="font-medium py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b last:border-0" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <td className="py-3 pr-4 font-medium text-slate-900">{row.entreprise}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${sourceStyles[row.source] || "bg-gray-100 text-gray-700"}`}>
                        {row.source}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-slate-500">{row.localisation}</td>
                    <td className="py-3 pr-4 text-slate-500">{row.date}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${statutStyles[row.statut] || "bg-gray-100 text-gray-700"}`}>
                        {row.statut}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        {/* Voir */}
                        <button onClick={() => setDetail(row)}
                          disabled={!!loadingId}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                          title="Voir les détails">
                          <Eye size={14} />
                        </button>
                        {/* Valider */}
                        <button onClick={() => setConfirm({ row, action: "approve" })}
                          disabled={!!loadingId || row.statut === "Validé"}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-emerald-100 hover:text-emerald-600 transition disabled:opacity-30"
                          title="Valider">
                          <Check size={14} />
                        </button>
                        {/* Refuser */}
                        <button onClick={() => setConfirm({ row, action: "reject" })}
                          disabled={!!loadingId || row.statut === "Refusé"}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-amber-100 hover:text-amber-600 transition disabled:opacity-30"
                          title="Refuser">
                          <X size={14} />
                        </button>
                        {/* Supprimer */}
                        <button onClick={() => setConfirm({ row, action: "delete" })}
                          disabled={!!loadingId}
                          className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:bg-rose-100 hover:text-rose-500 transition"
                          title="Supprimer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
