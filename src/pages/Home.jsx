import { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import api from '../api/client';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Paginator from '../components/Paginator';
import Hero from '../components/Hero';


export default function Home() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // filtros + paginación
  const [query, setQuery] = useState({
    page: 1,
    limit: 8,
    search: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const params = {};
        if (query.page) params.page = query.page;
        if (query.limit) params.limit = query.limit;
        if (query.search) params.search = query.search;
        if (query.category) params.category = query.category;
        if (query.minPrice !== undefined) params.minPrice = query.minPrice;
        if (query.maxPrice !== undefined) params.maxPrice = query.maxPrice;

        // Si tu backend devuelve { total, page, pages, products }
        const { data } = await api.get('/products', { params });

        if (Array.isArray(data)) {
          // Compatibilidad si alguna ruta devuelve array a secas
          setProducts(data);
          setPageInfo({ page: query.page, pages: 1, total: data.length });
        } else {
          setProducts(data.products || []);
          setPageInfo({ page: data.page, pages: data.pages, total: data.total });
        }
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el listado de productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  const handleFiltersChange = (filters) => {
    setQuery((q) => ({
      ...q,
      ...filters,
      page: filters.page || 1, // reset de página si cambian filtros
    }));
  };

  const handlePageChange = (newPage) => {
    setQuery((q) => ({ ...q, page: newPage }));
  };

  return (
  <>
    <Hero />

    <div id="productos" className="home-container">
  <Filters onChange={handleFiltersChange} />

  {loading && (
    <div className="text-center my-5">
      <Spinner animation="border" />
    </div>
  )}

  {error && <Alert variant="danger">{error}</Alert>}

  {!loading && !error && products.length === 0 && (
    <Alert variant="info">No se encontraron productos.</Alert>
  )}

  <Row className="g-4">
    {products.map((prod) => (
      <Col key={prod._id} xs={12} sm={6} md={4} lg={3}>
        <ProductCard product={prod} />
      </Col>
    ))}
  </Row>

  <Paginator
    page={pageInfo.page || 1}
    pages={pageInfo.pages || 1}
    onChange={handlePageChange}
  />
</div>

  </>
);

}
