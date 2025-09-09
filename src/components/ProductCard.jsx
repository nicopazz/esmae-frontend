import React from 'react';
import { Card } from 'react-bootstrap';

export default function ProductCard({ product }) {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : product.image
      ? `http://localhost:5000${product.image}`
      : '/no-image.png';

  return (
    <Card className="product-card h-100 shadow-sm border-0">
      <div className="product-image-wrapper">
        <img src={imageUrl} alt={product.name} className="product-image" />
      </div>

      <Card.Body className="d-flex flex-column">
        <h5 className="product-title">{product.name}</h5>
        <p className="product-description">{product.description?.substring(0, 80)}</p>
        <div className="mt-auto">
          <div className="product-price">${product.price?.toLocaleString('es-AR')}</div>
        </div>
      </Card.Body>
    </Card>
  );
}
