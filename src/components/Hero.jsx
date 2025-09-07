// src/components/Hero.jsx
import { Button } from "react-bootstrap";

export default function Hero() {
  const handleVerProductos = () => {
    const productosSection = document.getElementById("productos");
    if (productosSection) {
      productosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <h1>
            Reflejá tu estilo con <span style={{ color: "var(--accent)" }}>Esmae</span>
          </h1>
          <p>
            Descubrí nuestra colección de espejos modernos y elegantes diseñados para transformar tus espacios.
          </p>
          <Button
            variant="dark"
            style={{ borderRadius: "20px", padding: "6px 16px", fontWeight: "500" }}
            onClick={handleVerProductos}
          >
            Ver productos
          </Button>
        </div>

        <div className="hero-right">
          <img
            src="https://cinderelladecoracion.com/wp-content/uploads/2022/07/07.-espejos.jpg"
            alt="Espejo decorativo"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
}
