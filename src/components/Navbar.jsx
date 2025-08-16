import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const closeMenu = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__brand" onClick={closeMenu}>
          {/* Logo simple SVG + nombre */}
          <svg viewBox="0 0 24 24" className="nav__logo" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
          </svg>
          <span>Esmae</span>
        </Link>

        {/* Botón mobile */}
        <button
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          <NavLink to="/" onClick={closeMenu} className="nav__link">
            Inicio
          </NavLink>
          <NavLink to="/products" onClick={closeMenu} className="nav__link">
            Productos
          </NavLink>
          {/* ejemplo de futura sección */}
          {/* <NavLink to="/about" onClick={closeMenu} className="nav__link">Nosotros</NavLink> */}

          <div className="nav__spacer" />

          {isAuthenticated ? (
            <>
              <span className="nav__user">Hola, {user?.name || 'Usuario'}</span>
              <button className="nav__btn nav__btn--ghost" onClick={() => { logout(); closeMenu(); }}>
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={closeMenu} className="nav__btn">
                Ingresar
              </NavLink>
              <NavLink to="/register" onClick={closeMenu} className="nav__btn nav__btn--outline">
                Crear cuenta
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
