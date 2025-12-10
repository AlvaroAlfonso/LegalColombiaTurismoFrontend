import api from './http';

export const fetchProvider = (id) => api.get(`/api/providers/${id}/`);

export const fetchProviderCertificates = (id) =>
  api.get(`/api/providers/${id}/certificates/`);

export const fetchProviderServices = (id, params = {}) =>
  api.get(`/api/providers/${id}/services/`, { params });

export const uploadCertificate = (id, formData) =>
  api.post(`/api/providers/${id}/certificates/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const fetchProviderQr = (id) => api.get(`/api/providers/${id}/qr/`, { responseType: 'blob' });

