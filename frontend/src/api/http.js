import axios from 'axios';

// Cliente HTTP centralizado para hablar con la API de Django.
// Usa la variable de entorno VITE_API_BASE_URL o cae a localhost.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
});

// Inserta el token en cada request si existe.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Permite manejar 401 centralmente si se desea.
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response?.status === 401) {
      // Podemos limpiar sesión si el backend devuelve 401 persistente.
      // Se deja como comentario para evitar side-effects inesperados.
      // localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  },
);

export default api;

