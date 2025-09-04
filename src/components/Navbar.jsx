import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppNavbar(){
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {/* Topbar */}
      <div className="topbar">Envíos seleccionados • Atención al cliente 9–18</div>

      <Navbar expand="lg" className="navbar-custom" bg="light">
        <Container className="position-relative">
          
          {/* Brand centrado */}
          <Navbar.Brand className="brand-center">
            <Link to="/" className="brand-logo">Esmae</Link>
          </Navbar.Brand>

          {/* Toggle para móvil */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Links de navegación */}
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/products">Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/about">Nosotros</Nav.Link>
              <Nav.Link as={NavLink} to="/account">Cuenta</Nav.Link>
            </Nav>

            {/* Botón de login/logout a la derecha */}
            <Nav className="ms-auto d-flex align-items-center">
              {isAuthenticated ? (
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={logout}
                  className="ms-2"
                >
                  Cerrar sesión
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-dark"
                  size="sm"
                  className="ms-2"
                >
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
