import api from './api';

export const createCompany = async (companyData) => {
  const res = await api.post('/companies', companyData);
  return res.data;
};

export const getAllCompanies = async () => {
  const res = await api.get('/companies');
  return res.data;
};

export const searchCompanies = async (q = '', page = 1) => {
  const res = await api.get(`/companies/search?q=${q}&page=${page}`);
  return res.data;
};

export const getCompany = async (id) => {
  const res = await api.get(`/companies/${id}`);
  return res.data;
};