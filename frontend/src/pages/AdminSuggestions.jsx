import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import SuggestionHeader from "../components/admin/AdminSuggestion/SuggestionHeader";
import SuggestionTable from "../components/admin/AdminSuggestion/SuggestionTable";
import SuggestionPagination from "../components/admin/AdminSuggestion/SuggestionPagination";
import SuggestionDetailModal from "../components/admin/AdminSuggestion/SuggestionDetailModal";
import SuggestionRejectModal from "../components/admin/AdminSuggestion/SuggestionRejectModal";
import SuggestionEditModal from "../components/admin/AdminSuggestion/SuggestionEditModal";
import SuggestionDuplicateModal from "../components/admin/AdminSuggestion/SuggestionDuplicateModal";
import adminSuggestionService from "../services/admin.suggestion.service";

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pendingCount, setPendingCount] = useState(0);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  const [detailItem, setDetailItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [duplicateResult, setDuplicateResult] = useState(null);
  const [rejectTargetId, setRejectTargetId] = useState(null);

  // Debounce la recherche pour ne pas spammer l'API
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminSuggestionService.getAll({ page, status, search: debouncedSearch });
      setSuggestions(data.suggestions);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Impossible de charger les suggestions.");
    } finally {
      setLoading(false);
    }
  }, [page, status, debouncedSearch]);

  const fetchCount = useCallback(async () => {
    try {
      const { data } = await adminSuggestionService.getCount();
      setPendingCount(data.total);
    } catch (err) { /* silencieux */ }
  }, []);

  useEffect(() => { fetchSuggestions(); }, [fetchSuggestions]);
  useEffect(() => { fetchCount(); }, [fetchCount]);

  const refresh = async () => { await fetchSuggestions(); await fetchCount(); };

  const handleView = async (id) => {
    try {
      const { data } = await adminSuggestionService.getById(id);
      setDetailItem(data);
    } catch (err) { alert("Impossible de charger le détail."); }
  };

  const handleCheckDuplicate = async (id) => {
    try {
      const { data } = await adminSuggestionService.checkDuplicate(id);
      setDuplicateResult(data);
    } catch (err) { alert("Erreur lors de la vérification."); }
  };

  const handleEditSave = async (form) => {
    try {
      await adminSuggestionService.update(editItem.id, form);
      setEditItem(null);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la mise à jour.");
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approuver cette suggestion ?")) return;
    try {
      await adminSuggestionService.approve(id);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de l'approbation.");
    }
  };

  const handleRejectConfirm = async (comment) => {
    try {
      await adminSuggestionService.reject(rejectTargetId, comment);
      setRejectTargetId(null);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors du rejet.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette suggestion ?")) return;
    try {
      await adminSuggestionService.remove(id);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la suppression.");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await adminSuggestionService.exportReport({ status, search: debouncedSearch });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "suggestions_rapport.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur lors de la génération du rapport.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <AdminLayout adminName="Antoine Dubois">
      <SuggestionHeader
        total={pendingCount}
        status={status}
        onStatusChange={(s) => { setStatus(s); setPage(1); }}
        search={search}
        onSearchChange={setSearch}
        onExport={handleExport}
        exporting={exporting}
      />

      <SuggestionTable
        suggestions={suggestions}
        loading={loading}
        error={error}
        onView={handleView}
        onEdit={setEditItem}
        onCheckDuplicate={handleCheckDuplicate}
        onApprove={handleApprove}
        onReject={(id) => setRejectTargetId(id)}
        onDelete={handleDelete}
      />

      <SuggestionPagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {detailItem && <SuggestionDetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
      {editItem && <SuggestionEditModal item={editItem} onCancel={() => setEditItem(null)} onSave={handleEditSave} />}
      {duplicateResult && <SuggestionDuplicateModal result={duplicateResult} onClose={() => setDuplicateResult(null)} />}
      {rejectTargetId && (
        <SuggestionRejectModal onCancel={() => setRejectTargetId(null)} onConfirm={handleRejectConfirm} />
      )}
    </AdminLayout>
  );
}