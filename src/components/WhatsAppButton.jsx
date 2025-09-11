import React from "react";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493812171537?text=Hola%20ESMAE%2C%20quiero%20hacer%20una%20consulta"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-circle"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
      />
    </a>
  );
}
