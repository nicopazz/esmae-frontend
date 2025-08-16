import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// si hay token guardado, lo agregamos al iniciar
const token = localStorage.getItem('token');
if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;

export const loginRequest = (email, password) =>
  api.post('/auth/login', { email, password });

export const registerRequest = (name, email, password) =>
  api.post('/auth/register', { name, email, password });
