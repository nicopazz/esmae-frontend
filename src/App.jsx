import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Páginas
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";

function App() {
  const { user, loading } = useAuth();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <main className="flex-fill">
          {loading ? (
            <p className="text-center mt-4">Cargando usuario...</p>
          ) : (
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/login" element={<Login />} />

              {/* Ruta protegida de admin */}
              <Route
                path="/admin"
                element={
                  user?.role === "admin" ? <AdminPanel /> : <Navigate to="/login" />
                }
              />

              {/* Ruta 404 */}
              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
          )}
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
