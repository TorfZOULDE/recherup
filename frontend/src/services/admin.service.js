import api from './api';

export const getDashboardStats  = () => api.get('/admin/dashboard/stats').then(r => r.data);
export const getDashboardCharts = () => api.get('/admin/dashboard/charts').then(r => r.data);
export const getActivityLogs    = () => api.get('/admin/activity-logs').then(r => r.data);
