import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navbar moderno en MODO OSCURO usando React-Bootstrap.
// Solución al problema de la línea superior en botones: se debía a la clase border-top.
// Eliminamos esa clase y ajustamos los botones para que no muestren borde innecesario.

export default function NavbarRB() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="me-2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="fw-bold">Esmae</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls={`offcanvas-navbar`} />

        <Navbar.Offcanvas
          id={`offcanvas-navbar`}
          aria-labelledby={`offcanvas-navbar-label`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvas-navbar-label`}>Esmae</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <Nav.Link as={NavLink} to="/" end>
                Inicio
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products">
                Productos
              </Nav.Link>
              {/* <Nav.Link as={NavLink} to="/about">Nosotros</Nav.Link> */}
            </Nav>

            <div className="mt-3 mt-lg-0">
              {isAuthenticated ? (
                <div className="d-flex align-items-center justify-content-between">
                  <NavDropdown title={`Hola, ${user?.name ?? 'Usuario'}`} id="user-dropdown">
                    <NavDropdown.Item as={NavLink} to="/profile">
                      Perfil
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        logout();
                      }}
                    >
                      Cerrar sesión
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <div className="d-flex gap-2">
                  <Button as={NavLink} to="/login" variant="outline-light" className="shadow-none border-0">
                    Ingresar
                  </Button>
                  <Button as={NavLink} to="/register" variant="light" className="shadow-none border-0">
                    Crear cuenta
                  </Button>
                </div>
              )}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
