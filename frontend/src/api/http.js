import axios from 'axios';

// Cliente HTTP centralizado para hablar con la API de Django.
// Usa la variable de entorno VITE_API_BASE_URL o cae a localhost.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
});

// Inserta el token en cada request si existe.
// Inserta el token en cada request si existe.
api.interceptors.request.use((config) => {
  let token = localStorage.getItem('auth_token');
  if (token) {
    // Limpieza defensiva por si se guardó con comillas extra
    token = token.replace(/^"|"$/g, '');
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Permite manejar 401 centralmente.
api.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response?.status === 401) {
      // Si el token es inválido o expiró, limpiamos y redirigimos
      console.warn("Sesión expirada o inválida. Cerrando sesión...");
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/iniciar-sesion';
    }
    return Promise.reject(error);
  },
);

export default api;

