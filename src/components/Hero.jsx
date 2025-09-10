import { Button, Carousel } from "react-bootstrap";

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
        {/* Texto a la izquierda */}
        <div className="hero-left">
          <h1>
            Reflejá tu estilo con{" "}
            <span style={{ color: "var(--accent)" }}>Esmae</span>
          </h1>
          <p>
            Descubrí nuestra colección de espejos modernos y elegantes diseñados
            para transformar tus espacios.
          </p>
          <Button
            variant="dark"
            style={{
              borderRadius: "20px",
              padding: "6px 16px",
              fontWeight: "500",
            }}
            onClick={handleVerProductos}
          >
            Ver productos
          </Button>
        </div>

        {/* Carrusel a la derecha */}
        <div className="hero-right">
          <Carousel
            controls={true}
            indicators={false}
            interval={4000}
          >
            <Carousel.Item>
              <img
                src="https://cinderelladecoracion.com/wp-content/uploads/2022/07/07.-espejos.jpg"
                alt="Espejo 1"
                className="hero-image"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://blog.rosen.cl/hubfs/espejos-y-decoracion-3.jpg"
                alt="Espejo 2"
                className="hero-image"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://www.timbrit.com.ar/blog/wp-content/uploads/2020/06/Como-decorar-con-espejos-la-cas.jpg"
                alt="Espejo 3"
                className="hero-image"
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
