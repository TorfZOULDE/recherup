import api from './api';

// INSCRIPTION
export const register = async (userData) => {
  const res = await api.post('/auth/register', userData);
  return res.data;
};

// CONNEXION
export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  const { token, user } = res.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

// DÉCONNEXION
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// UTILISATEUR CONNECTÉ
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!localStorage.getItem('token');