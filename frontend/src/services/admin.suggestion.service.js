import api from "./api";

const adminSuggestionService = {
  getAll: (params = {}) => api.get("/admin/suggestions", { params }),
  getCount: () => api.get("/admin/suggestions/count"),
  getById: (id) => api.get(`/admin/suggestions/${id}`),
  update: (id, data) => api.put(`/admin/suggestions/${id}`, data),
  checkDuplicate: (id) => api.get(`/admin/suggestions/${id}/check-duplicate`),
  approve: (id) => api.patch(`/admin/suggestions/${id}/approve`),
  reject: (id, admin_comment) => api.patch(`/admin/suggestions/${id}/reject`, { admin_comment }),
  remove: (id) => api.delete(`/admin/suggestions/${id}`),
  exportReport: (params = {}) =>
    api.get("/admin/suggestions/export", { params, responseType: "blob" }),
};

export default adminSuggestionService;