// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas que usan el layout con Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* otras rutas públicas aquí */}
      </Route>

      {/* Rutas que no usan el MainLayout (opcional) */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <div>Panel Admin</div>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
