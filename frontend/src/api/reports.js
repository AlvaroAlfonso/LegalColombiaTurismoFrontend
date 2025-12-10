import api from './http';

export const fetchMyReports = () => api.get('/api/reports/my-reports/');

export const createReport = (formData) =>
  api.post('/api/reports/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

