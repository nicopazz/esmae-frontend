import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Filters({ onChange }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMin] = useState('');
  const [maxPrice, setMax] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({
      search: search.trim(),
      category: category.trim(),
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
      page: 1, // siempre reseteamos a la primera página
    });
  };

  const handleClear = () => {
    setSearch('');
    setCategory('');
    setMin('');
    setMax('');
    onChange({ search: '', category: '', minPrice: undefined, maxPrice: undefined, page: 1 });
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Row className="g-2 align-items-end">
        <Col md={4}>
          <Form.Label>Buscar</Form.Label>
          <Form.Control
            placeholder="Nombre o descripción"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            placeholder="Ej: Espejos"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Precio Mín.</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMin(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Label>Precio Máx.</Form.Label>
          <Form.Control
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMax(e.target.value)}
          />
        </Col>
        <Col md={1} className="d-flex gap-2">
          <Button type="submit" variant="primary">Filtrar</Button>
          <Button type="button" variant="outline-secondary" onClick={handleClear}>Limpiar</Button>
        </Col>
      </Row>
    </Form>
  );
}
