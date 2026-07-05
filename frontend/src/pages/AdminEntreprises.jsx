import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import EntrepriseHeader from "../components/admin/AdminEntreprise/EntrepriseHeader";
import EntrepriseTable from "../components/admin/AdminEntreprise/EntrepriseTable";
import EntreprisePagination from "../components/admin/AdminEntreprise/EntreprisePagination";
import EntrepriseModal from "../components/admin/AdminEntreprise/EntrepriseModal";
import EntrepriseDetailModal from "../components/admin/AdminEntreprise/EntrepriseDetailModal";
import EntrepriseDeleteModal from "../components/admin/AdminEntreprise/EntrepriseDeleteModal";
import adminCompanyService from "../services/admin.company.service";

const LIMIT = 10; // ← 20 → 10

export default function AdminEntreprises() {
  const [entreprises, setEntreprises]     = useState([]);
  const [total, setTotal]                 = useState(0);
  const [page, setPage]                   = useState(1);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [search, setSearch]               = useState("");
  const [filters, setFilters]             = useState({ status: "", city: "" });
  const [viewTarget, setViewTarget]       = useState(null);
  const [editTarget, setEditTarget]       = useState(null);
  const [deleteTarget, setDeleteTarget]   = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showAdd, setShowAdd]             = useState(false);
  const [toast, setToast]                 = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminCompanyService.getAll({
        page,
        limit: LIMIT,
        search,
        status: filters.status,
        city:   filters.city,
      });
      setEntreprises(res.data.companies || []);
      setTotal(res.data.total || 0);
    } catch {
      setError("Impossible de charger les entreprises.");
    } finally {
      setLoading(false);
    }
  }, [page, search, filters]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => { setPage(1); }, [search, filters]);

  const handleAdd = async (form) => {
    await adminCompanyService.create(form);
    showToast("Entreprise ajoutée avec succès !");
    fetchData();
  };

  const handleEdit = async (form) => {
    await adminCompanyService.update(editTarget.id, form);
    showToast("Entreprise modifiée avec succès !");
    fetchData();
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await adminCompanyService.remove(deleteTarget.id);
      showToast("Entreprise supprimée.");
      setDeleteTarget(null);
      fetchData();
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleStatus = async (e) => {
    const newStatus = e.status === "disabled" ? "approved" : "disabled";
    await adminCompanyService.toggleStatus(e.id, newStatus);
    showToast(`Entreprise ${newStatus === "approved" ? "réactivée" : "désactivée"}.`);
    fetchData();
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout adminName="Antoine Dubois">
      <EntrepriseHeader
        total={total}
        search={search}
        onSearch={setSearch}
        filters={filters}
        onFilter={setFilters}
        onAdd={() => setShowAdd(true)}
      />

      {error && (
        <div className="mb-4 px-4 py-3 bg-rose-50 text-rose-600 text-sm rounded-xl border border-rose-100">
          {error}
        </div>
      )}

      <EntrepriseTable
        entreprises={entreprises}
        loading={loading}
        onView={(e)  => setViewTarget(e)}
        onEdit={(e)  => setEditTarget(e)}
        onDelete={(e) => setDeleteTarget(e)}
        onToggleStatus={handleToggleStatus}
      />

      <EntreprisePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <EntrepriseModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={handleAdd}
      />
      <EntrepriseModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
        entreprise={editTarget}
      />
      <EntrepriseDetailModal
        open={!!viewTarget}
        onClose={() => setViewTarget(null)}
        entreprise={viewTarget}
      />
      <EntrepriseDeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        nom={deleteTarget?.name}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-3 rounded-xl shadow-lg z-50">
          {toast}
        </div>
      )}
    </AdminLayout>
  );
}