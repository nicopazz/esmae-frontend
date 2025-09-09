import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

// Páginas
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";

function App() {

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminPanel />} />
              

              {/* Ruta 404 */}
              <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
            </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
