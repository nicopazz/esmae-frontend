import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const buttonStyle = {
    borderRadius: "20px",
    padding: "6px 16px",
    fontWeight: "300",
  };

  return (
    <>
      {/* Topbar */}
      <div className="topbar">
        Envíos seleccionados • Atención al cliente 24hs
      </div>

      <Navbar expand="lg" className="navbar-custom" bg="light">
        <Container className="position-relative">
          {/* Brand centrado */}
          <Navbar.Brand className="brand-center">
            <Link to="/" className="brand-logo">
              Esmae
            </Link>
          </Navbar.Brand>

          {/* Toggle para móvil */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Links de navegación */}
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Catálogo
              </Nav.Link>
              
              <Nav.Link as={NavLink} to="/about">
                Nosotros
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Contacto
              </Nav.Link>
            </Nav>

            {/* Botones a la derecha */}
            <Nav className="ms-auto d-flex align-items-center gap-2">
              {isAuthenticated ? (
                <>
                  {/* Nombre del usuario logueado */}
                  <span className="navbar-user">
                    👤 {user?.nombre || user?.email}
                  </span>

                  {/* Botón Admin solo si el usuario es admin */}
                  {user?.role === "admin" && (
                    <Button
                      as={Link}
                      to="/admin"
                      variant="dark"
                      size="sm"
                      className="d-flex align-items-center gap-1"
                      style={buttonStyle}
                    >
                      Panel
                    </Button>
                  )}

                  {/* Botón Cerrar sesión */}
                  <Button
                    variant="danger"
                    size="sm"
                    className="d-flex align-items-center gap-1"
                    style={buttonStyle}
                    onClick={logout}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="dark"
                  size="sm"
                  className="d-flex align-items-center gap-1"
                  style={buttonStyle}
                >
                  <BsPersonCircle size={16} />
                  Ingresar
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
