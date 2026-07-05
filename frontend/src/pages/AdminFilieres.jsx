import { useState, useEffect, useCallback } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import FiliereHeader from "../components/admin/AdminFilieres/FiliereHeader";
import FiliereTable from "../components/admin/AdminFilieres/FiliereTable";
import FiliereModal from "../components/admin/AdminFilieres/FiliereModal";
import FiliereDeleteModal from "../components/admin/AdminFilieres/FiliereDeleteModal";
import FilierePagination from "../components/admin/AdminFilieres/FilierePagination";
import adminFieldService from "../services/admin.field.service";

const LIMIT = 10;

export default function AdminFilieres() {
  const [filieres, setFilieres]           = useState([]);
  const [total, setTotal]                 = useState(0);
  const [page, setPage]                   = useState(1);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
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
      const res = await adminFieldService.getAll({ page, limit: LIMIT });
      // Support deux formats : { fields, total } ou tableau direct
      if (Array.isArray(res.data)) {
        setFilieres(res.data);
        setTotal(res.data.length);
      } else {
        setFilieres(res.data.fields || res.data.data || []);
        setTotal(res.data.total || 0);
      }
    } catch {
      setError("Impossible de charger les filières.");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleAdd = async (form) => {
    await adminFieldService.create(form);
    showToast("Filière ajoutée avec succès !");
    fetchData();
  };

  const handleEdit = async (form) => {
    await adminFieldService.update(editTarget.id, form);
    showToast("Filière modifiée avec succès !");
    fetchData();
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await adminFieldService.remove(deleteTarget.id);
      showToast("Filière supprimée.");
      setDeleteTarget(null);
      fetchData();
    } finally {
      setDeleteLoading(false);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <AdminLayout adminName="Samson">
      <FiliereHeader
        total={total}
        onAdd={() => setShowAdd(true)}
      />

      {error && (
        <div className="mb-4 px-4 py-3 bg-rose-50 text-rose-600 text-sm rounded-xl border border-rose-100">
          {error}
        </div>
      )}

      <FiliereTable
        filieres={filieres}
        loading={loading}
        onEdit={(f) => setEditTarget(f)}
        onDelete={(f) => setDeleteTarget(f)}
      />

      <FilierePagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <FiliereModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={handleAdd}
      />
      <FiliereModal
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleEdit}
        filiere={editTarget}
      />
      <FiliereDeleteModal
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