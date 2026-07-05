import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import MessageHeader from "../components/admin/AdminMessage/MessageHeader";
import MessageTable from "../components/admin/AdminMessage/MessageTable";
import MessagePagination from "../components/admin/AdminMessage/MessagePagination";
import MessageDetailPanel from "../components/admin/AdminMessage/MessageDetailPanel";
import adminMessageService from "../services/admin.message.service";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({ type: "", status: "", period: "" });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { page, ...filters };
      Object.keys(params).forEach((k) => !params[k] && delete params[k]);
      const { data } = await adminMessageService.getAll(params);
      setMessages(data.messages);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Impossible de charger les messages.");
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const fetchCount = useCallback(async () => {
    try {
      const { data } = await adminMessageService.getCount();
      setTotal(data.total);
    } catch {
      // silencieux, non bloquant
    }
  }, []);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);
  useEffect(() => { fetchCount(); }, [fetchCount]);

  const handleSelect = async (msg) => {
    if (selectedMessage?.id === msg.id) {
      setSelectedMessage(null);
      return;
    }
    setSelectedMessage(msg);
    if (msg.status === "Unread") {
      try {
        await adminMessageService.markAsRead(msg.id);
        setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, status: "Read" } : m)));
        setSelectedMessage((prev) => (prev ? { ...prev, status: "Read" } : prev));
      } catch {
        // pas bloquant pour l'ouverture
      }
    }
  };

  const handleReply = async (id, replyText) => {
    await adminMessageService.reply(id, replyText);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Replied", admin_reply: replyText } : m)));
    setSelectedMessage((prev) => (prev ? { ...prev, status: "Replied", admin_reply: replyText } : prev));
    showToast("Réponse envoyée");
  };

  const handleArchive = async (id) => {
    await adminMessageService.archive(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status: "Archived" } : m)));
    setSelectedMessage((prev) => (prev && prev.id === id ? { ...prev, status: "Archived" } : prev));
    showToast("Message archivé");
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await adminMessageService.remove(deleteTarget);
      setMessages((prev) => prev.filter((m) => m.id !== deleteTarget));
      if (selectedMessage?.id === deleteTarget) setSelectedMessage(null);
      setTotal((t) => Math.max(0, t - 1));
      showToast("Message supprimé");
    } catch {
      showToast("Erreur lors de la suppression");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <AdminLayout adminName="Antoine Dubois">
      <MessageHeader total={total} filters={filters} onFilterChange={handleFilterChange} />
      <div className="relative">
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-rose-100 text-rose-700 text-sm">{error}</div>
        )}
        <MessageTable
          messages={messages}
          loading={loading}
          selectedId={selectedMessage?.id}
          onSelect={handleSelect}
          onArchive={handleArchive}
          onDeleteRequest={(id) => setDeleteTarget(id)}
        />
        <MessagePagination page={page} totalPages={totalPages} onPageChange={setPage} />
        <MessageDetailPanel
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onReply={handleReply}
          onArchive={handleArchive}
        />
      </div>

      {/* Confirmation suppression */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-80 shadow-xl">
            <p className="text-sm font-medium text-gray-900 mb-5">Supprimer ce message ?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 text-sm rounded-lg bg-rose-600 text-white hover:bg-rose-700"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-4 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}