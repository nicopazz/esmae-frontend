/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);        // { id, nombre, email, role }
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token) {
      setToken(token);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
    if (userData) {
      setUser(JSON.parse(userData));  // 👈 rehidratamos el usuario
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    // backend devuelve { token, user }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); // 👈 guardamos user

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // 👈 limpiamos también user
    delete api.defaults.headers.common.Authorization;
    setToken('');
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
