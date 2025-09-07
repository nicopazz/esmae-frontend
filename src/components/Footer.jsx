import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
import { BsInstagram, BsWhatsapp, BsEnvelope } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";



export default function Footer() {
  return (
    <footer className="footer bg-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-start align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <h5>Esmae</h5>
            <p>Transformá tus espacios con espejos modernos y elegantes.</p>
          </Col>
          <Col md={6} className="d-flex justify-content-center justify-content-md-end gap-3">
          {/*<a href="mailto:info@esmae.com" target="_blank" rel="noreferrer" className="footer-icon">
              <BsEnvelope size={24} />
            </a>*/}
            <a href="https://wa.me/5493813921321" target="_blank" rel="noreferrer" className="footer-icon">
              <BsWhatsapp size={24} />
            </a>
            <a href="https://www.instagram.com/esmae_espejo" target="_blank" rel="noreferrer" className="footer-icon">
              <BsInstagram size={24} />
            </a>
            <a href="https://www.tiktok.com/@florencia.salas75" target="_blank" rel="noreferrer" className="footer-icon">
              <SiTiktok size={24} />
            </a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <small>&copy; {new Date().getFullYear()} Esmae. Todos los derechos reservados.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
