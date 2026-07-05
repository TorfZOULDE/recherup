import api from "./api";

const adminMessageService = {
  getAll: (params = {}) => api.get("/admin/messages", { params }),
  getCount: () => api.get("/admin/messages/count"),
  getById: (id) => api.get(`/admin/messages/${id}`),
  markAsRead: (id) => api.patch(`/admin/messages/${id}/read`),
  reply: (id, message) => api.post(`/admin/messages/${id}/reply`, { message }),
  archive: (id) => api.patch(`/admin/messages/${id}/archive`),
  remove: (id) => api.delete(`/admin/messages/${id}`),
};

export default adminMessageService;