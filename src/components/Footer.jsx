import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import Image from "../public/favicon.ico";

export default function Footer() {
  return (
    <footer className="footer bg-light py-4 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Logo - en mobile primero, en desktop al medio */}
          <Col
            xs={12}
            md={{ span: 4, order: 2 }}
            className="text-center mb-3 mb-md-0"
          >
            <img
              src={Image}
              alt="Esmae Logo"
              width="80"
              height="80"
              className="d-inline-block align-top"
            />
            <p className="mt-2">
              Transformá tus espacios con espejos modernos y elegantes.
            </p>
          </Col>

          {/* Redes sociales - en mobile después del logo, en desktop a la izquierda */}
          <Col
            xs={12}
            md={{ span: 4, order: 1 }}
            className="d-flex justify-content-center justify-content-md-start gap-3 mb-3 mb-md-0"
          >
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
          </Col>

          {/* Col vacío en desktop (a la derecha) */}
          <Col xs={12} md={{ span: 4, order: 3 }}></Col>
        </Row>

        <Row className="mt-3">
          <Col className="text-center">
            <small>
              &copy; {new Date().getFullYear()} Esmae. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
