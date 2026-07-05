import api from './api';

export const getFieldsPaginated = (page = 1) =>
  api.get(`/fields/paginated?page=${page}`).then(r => r.data);

export const searchFields = (q) =>
  api.get(`/fields/search?q=${encodeURIComponent(q)}`).then(r => r.data);

export const getFieldById = (id) =>
  api.get(`/fields/${id}`).then(r => r.data);
