import api from './http';

export const fetchServices = (params = {}) =>
  api.get('/api/services/', { params });

export const fetchServiceDetail = (id) =>
  api.get(`/api/services/${id}/`);

export const fetchServiceReviews = (id) =>
  api.get(`/api/services/${id}/reviews/`);

export const createReview = (id, payload) =>
  api.post(`/api/services/${id}/reviews/`, payload);

export const createService = (payload) =>
  api.post('/api/services/', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateService = (id, payload) =>
  api.patch(`/api/services/${id}/`, payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteService = (id) =>
  api.delete(`/api/services/${id}/`);

