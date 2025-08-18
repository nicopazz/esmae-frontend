import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Interceptor para enviar token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // o cookies si preferís
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
