import { useEffect, useState, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import UtilisateurHeader from "../components/admin/AdminUtilisateur/UtilisateurHeader";
import UtilisateurTable from "../components/admin/AdminUtilisateur/UtilisateurTable";
import UtilisateurPagination from "../components/admin/AdminUtilisateur/UtilisateurPagination";
import UtilisateurDetailModal from "../components/admin/AdminUtilisateur/UtilisateurDetailModal";
import UtilisateurEditModal from "../components/admin/AdminUtilisateur/UtilisateurEditModal";
import UtilisateurSuspendModal from "../components/admin/AdminUtilisateur/UtilisateurSuspendModal";
import adminUserService from "../services/admin.user.service";

export default function AdminUtilisateurs() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCount, setActiveCount] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", city: "", period: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exporting, setExporting] = useState(false);

  const [detailItem, setDetailItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [suspendTarget, setSuspendTarget] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await adminUserService.getAll({ page, search: debouncedSearch, ...filters });
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, filters]);

  const fetchCount = useCallback(async () => {
    try {
      const { data } = await adminUserService.getCount();
      setActiveCount(data.total);
    } catch (err) { /* silencieux */ }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);
  useEffect(() => { fetchCount(); }, [fetchCount]);

  const refresh = async () => { await fetchUsers(); await fetchCount(); };

  const handleView = async (id) => {
    try {
      const { data } = await adminUserService.getById(id);
      setDetailItem(data);
    } catch (err) { alert("Impossible de charger le détail."); }
  };

  const handleEditSave = async (form) => {
    try {
      await adminUserService.update(editItem.id, form);
      setEditItem(null);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la mise à jour.");
    }
  };

  const handleToggleStatus = async (user) => {
    if (user.status === "active") {
      setSuspendTarget(user);
    } else {
      try {
        await adminUserService.updateStatus(user.id, "active");
        await refresh();
      } catch (err) {
        alert(err.response?.data?.error || "Erreur lors de la mise à jour.");
      }
    }
  };

  const handleSuspendConfirm = async (reason) => {
    try {
      await adminUserService.updateStatus(suspendTarget.id, "suspended", reason);
      setSuspendTarget(null);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la suspension.");
    }
  };

  const handlePendingDecision = async (id, decision) => {
    try {
      await adminUserService.updateStatus(id, decision === "approve" ? "active" : "suspended");
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce compte utilisateur ?")) return;
    try {
      await adminUserService.remove(id);
      await refresh();
    } catch (err) {
      alert(err.response?.data?.error || "Erreur lors de la suppression.");
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await adminUserService.exportReport({ search: debouncedSearch, ...filters });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "utilisateurs_rapport.csv");
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
      <UtilisateurHeader
        total={activeCount}
        search={search}
        onSearch={setSearch}
        filters={filters}
        onFilter={(updater) => { setFilters(prev => typeof updater === "function" ? updater(prev) : updater); setPage(1); }}
        onExport={handleExport}
        exporting={exporting}
      />

      <UtilisateurTable
        users={users}
        loading={loading}
        error={error}
        onView={handleView}
        onEdit={setEditItem}
        onToggleStatus={handleToggleStatus}
        onPendingDecision={handlePendingDecision}
        onDelete={handleDelete}
      />

      <UtilisateurPagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {detailItem && <UtilisateurDetailModal item={detailItem} onClose={() => setDetailItem(null)} />}
      {editItem && <UtilisateurEditModal item={editItem} onCancel={() => setEditItem(null)} onSave={handleEditSave} />}
      {suspendTarget && (
        <UtilisateurSuspendModal user={suspendTarget} onCancel={() => setSuspendTarget(null)} onConfirm={handleSuspendConfirm} />
      )}
    </AdminLayout>
  );
}