import { Card, Button, Badge } from 'react-bootstrap';

export default function ProductCard({ product }) {
  const imageUrl = product.image?.startsWith('http')
    ? product.image
    : product.image
      ? `http://localhost:5000${product.image}`
      : '/no-image.png';

  return (
    <Card className="h-100 shadow-sm">
      <div style={{ height: 220, overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.name}
          style={{ width: '100%', height: 220, objectFit: 'cover' }}
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="mb-1">{product.name}</Card.Title>
          {product.category && <Badge bg="secondary">{product.category}</Badge>}
        </div>

        <Card.Text className="text-muted" style={{ minHeight: 48 }}>
          {product.description?.substring(0, 60)}...
        </Card.Text>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <strong>${product.price?.toLocaleString('es-AR')}</strong>
          {/* Si luego agregás carrito: <Button size="sm">Agregar</Button> */}
        </div>
      </Card.Body>
    </Card>
  );
}
