// src/pages/About.jsx
import React from "react";
import "./About.css";
import Image from "../public/favicon.ico";

export default function About() {
  return (
    <div className="about-container">
      {/* Título principal */}
      <h1 className="main-title">Sobre Esmae</h1>

      {/* Sección Quiénes Somos */}
      <section className="about-section">
        <h2 className="section-title">¿Quiénes Somos?</h2>
        <p className="about-text">
          Esmae es un emprendimiento en el cual creemos en la belleza de lo simple. 
          Creamos espejos y muebles de decoración a medida. Cada pieza está pensada 
          para transformar tu hogar en un espacio de calma y armonía, cuidando cada detalle.
        </p>
        <p className="about-text">
          <strong>Envíos:</strong> No tenemos local físico pero hacemos envíos de nuestros productos a todo Tucumán.<br/>
          <strong>Medios de pago:</strong> Efectivo, tarjetas de crédito, débito, transferencia y depósitos.
        </p>
      </section>

      {/* Sección Equipo */}
      <section className="about-section team-section">
        <h2 className="section-title">Nuestro Equipo</h2>
        <div className="team-container">
          <div className="team-member">
            <div className="team-photo">
              <img src={Image} alt="Esmae Logo" />
            </div>
            <h3 className="team-name">Florecia y Gabriel</h3>
            <p className="team-role">
              Dos jóvenes emprendedores que buscan llevar belleza y funcionalidad a cada hogar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
