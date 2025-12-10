import api from './http';

export const fetchEmployees = (params = {}) =>
    api.get('/api/employees/', { params });

export const fetchEmployeeDetail = (id) =>
    api.get(`/api/employees/${id}/`);

export const createEmployee = (payload) =>
    api.post('/api/employees/', payload);

export const updateEmployee = (id, payload) =>
    api.patch(`/api/employees/${id}/`, payload);

export const deleteEmployee = (id) =>
    api.delete(`/api/employees/${id}/`);
