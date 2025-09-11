import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsWhatsapp } from 'react-icons/bs';

export default function ProductCard({ product }) {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : product.image
      ? `http://localhost:5000${product.image}`
      : '/no-image.png';

  const handleWhatsApp = () => {
    const phoneNumber = "5493813921321";
    const message = `HOLA ESMAE!! Quiero consultar por el producto: ${product.name}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Card
      className="product-card h-100 shadow-sm border-0"
      style={{ opacity: product.stock > 0 ? 1 : 0.5 }}
    >
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} className="product-image" />
      </div>

      <Card.Body className="d-flex flex-column">
        <h5 className="product-title">{product.name}</h5>
        <p className="product-description">{product.description?.substring(0, 80)}</p>

        <p className="mb-2">
          {product.stock > 0 ? (
            <>Stock: {product.stock}</>
          ) : (
            <span style={{ color: 'red', fontWeight: 'bold' }}>Sin stock</span>
          )}
        </p>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div className="product-price">${product.price?.toLocaleString('es-AR')}</div>
          <Button
            variant="success"
            size="sm"
            onClick={handleWhatsApp}
            className="d-flex align-items-center"
            disabled={product.stock <= 0}
          >
            <BsWhatsapp style={{ marginRight: '4px' }} /> Consulta
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
