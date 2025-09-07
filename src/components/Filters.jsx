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
      page: 1,
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
    <Form onSubmit={handleSubmit} className="filters-form">
      <Row className="g-2 align-items-center w-100">
        <Col md={3}>
          <Form.Control
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>

       {/* -- Activar cuando se tenga más de una categoría --
        <Col md={3}>
          <Form.Control
            placeholder="Categoría (Ej: Espejos)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Col>
      */}
      
        <Col md={2}>
          <Form.Control
            type="number"
            min={0}
            placeholder="Precio mín."
            value={minPrice}
            onChange={(e) => setMin(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            type="number"
            min={0}
            placeholder="Precio máx."
            value={maxPrice}
            onChange={(e) => setMax(e.target.value)}
          />
        </Col>
        <Col md={2} className="d-flex gap-2">
          <Button type="submit" variant="dark" className="btn-filter w-100">Filtrar</Button>
          <Button type="button" variant="light" className="btn-clear w-100" onClick={handleClear}>Limpiar</Button>
        </Col>
      </Row>
    </Form>
  );
}
