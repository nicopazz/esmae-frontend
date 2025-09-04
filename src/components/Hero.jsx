// src/components/Hero.jsx
import { Button } from "react-bootstrap";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <h1>Reflejá tu estilo con <span style={{color:'var(--accent)'}}>Esmae</span></h1>
          <p>
            Descubrí nuestra colección de espejos modernos y elegantes diseñados para transformar tus espacios.
          </p>
          <Button variant="light" style={{ borderRadius: '20px', padding: '6px 16px', fontWeight: '500' }}>Ver productos</Button>
        </div>

        <div className="hero-right">
          <img
            src="https://cinderelladecoracion.com/wp-content/uploads/2022/07/07.-espejos.jpg"         // poné aquí el nombre de tu imagen en public/
            alt="Espejo decorativo"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
