import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  return (
    <Navbar 
      expand="lg" 
      sticky="top" 
      className="shadow-sm"
      style={{ background: '#222', color: '#fff' }}  // navbar oscuro
    >
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: '#f8f9fa', fontWeight: 'bold', fontSize: '1.3rem' }}>
          Esmae
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" style={{ borderColor: '#f8f9fa' }} />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end style={{ color: '#ddd' }}>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" style={{ color: '#ddd' }}>
              Productos
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center">
            {!isAuthenticated ? (
              <>
                <Button 
                  variant="outline-light" 
                  as={Link} 
                  to="/login" 
                  className="me-2"
                  style={{ borderRadius: '20px', padding: '6px 16px' }}
                >
                  Iniciar sesión
                </Button>
                <Button 
                  variant="light" 
                  as={Link} 
                  to="/register"
                  style={{ borderRadius: '20px', padding: '6px 16px', fontWeight: '500' }}
                >
                  Crear cuenta
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/perfil" style={{ color: '#f8f9fa' }}>
                  Mi perfil
                </Nav.Link>

                {user?.role === 'admin' && (
                  <Nav.Link as={Link} to="/admin" style={{ color: '#f8f9fa' }}>
                    Panel Admin
                  </Nav.Link>
                )}

                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="ms-3"
                  style={{ borderRadius: '20px', padding: '6px 16px' }}
                >
                  Cerrar sesión
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
