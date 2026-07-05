import api from "./api";

const adminFieldService = {
  getAll:  (params = {}) => api.get("/admin/fields", { params }),
  create:  (data)        => api.post("/admin/fields", data),
  update:  (id, data)    => api.put(`/admin/fields/${id}`, data),
  remove:  (id)          => api.delete(`/admin/fields/${id}`),
};

export default adminFieldService;