// src/routes/AppRouter.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';
import MainLayout from '../layouts/MainLayout';

// -- Wrappers de rutas --

// Ruta privada: requiere estar autenticado
function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

// Ruta de admin: requiere estar autenticado y tener rol admin
function AdminRoute() {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <p>Cargando...</p>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}

// Ruta solo para invitados (si ya está logueado, redirige)
function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* RUTAS PÚBLICAS con MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        {/* Login visible solo si NO está autenticado */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Route>

      {/* RUTAS PRIVADAS con MainLayout */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          {/* Ejemplo: perfil o pedidos del usuario */}
          <Route path="/perfil" element={<div>Mi Perfil</div>} />
        </Route>
      </Route>

      {/* RUTAS ADMIN con MainLayout */}
      <Route element={<AdminRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<div>Panel Admin</div>} />
          {/* Ejemplo: CRUD de productos */}
          {/* <Route path="/admin/products" element={<ProductsAdmin />} /> */}
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
