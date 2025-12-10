import api from './http';

export const login = (credentials) =>
  api.post('/api/auth/login/', credentials);

export const register = (formData) =>
  api.post('/api/auth/register/', formData);

export const recoverPassword = (payload) =>
  api.post('/api/auth/recover-password/', payload);

export const getProfile = () => api.get('/api/users/profile/');

export const updateProfile = (formData) =>
  api.patch('/api/users/profile/', formData);

