import api from "./api";

const adminCompanyService = {
  getAll: (params = {}) =>
    api.get("/admin/companies", { params }),

  getById: (id) =>
    api.get(`/admin/companies/${id}`),

  create: (data) =>
    api.post("/admin/companies", data),

  update: (id, data) =>
    api.put(`/admin/companies/${id}`, data),

  remove: (id) =>
    api.delete(`/admin/companies/${id}`),

  toggleStatus: (id, status) =>
    api.patch(`/admin/companies/${id}/status`, { status }),
};

export default adminCompanyService;