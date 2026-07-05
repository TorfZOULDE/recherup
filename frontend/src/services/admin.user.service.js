import api from "./api";

const adminUserService = {
  getAll: (params = {}) =>
    api.get("/admin/users", { params }),

  getCount: () =>
    api.get("/admin/users/count"),

  getById: (id) =>
    api.get(`/admin/users/${id}`),

  update: (id, data) =>
    api.put(`/admin/users/${id}`, data),

  updateStatus: (id, status, ban_reason) =>
    api.patch(`/admin/users/${id}/status`, { status, ban_reason }),

  remove: (id) =>
    api.delete(`/admin/users/${id}`),

  exportReport: (params = {}) =>
    api.get("/admin/users/export", { params, responseType: "blob" }),
};

export default adminUserService;