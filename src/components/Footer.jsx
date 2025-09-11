import React from "react";
import { Container } from "react-bootstrap";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import Image from "../public/favicon.ico";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer py-4">
      <Container className="text-center d-flex flex-column align-items-center">
        {/* Logo */}
        <img
          src={Image}
          alt="Esmae Logo"
          width="70"
          height="70"
          className="mb-3 footer-logo"
        />

        {/* Redes sociales */}
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a
            href="https://wa.me/5493813921321"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
          >
            <BsWhatsapp size={24} />
          </a>
          <a
            href="https://www.instagram.com/esmae_espejo"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
          >
            <BsInstagram size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@florencia.salas75"
            target="_blank"
            rel="noreferrer"
            className="footer-icon"
          >
            <SiTiktok size={24} />
          </a>
        </div>

        {/* Contacto */}
        <p className="footer-contact mb-1">
          📞 +54 381 2171537 &nbsp; | &nbsp; ✉️ esmae.espejos@gmail.com
        </p>

        {/* Dirección */}
        <p className="footer-address mb-3">
          📍 San Miguel de Tucumán, Argentina
        </p>

        {/* Copyright */}
        <small>
          &copy; {new Date().getFullYear()} Esmae. Todos los derechos reservados.
        </small>
      </Container>
    </footer>
  );
}
