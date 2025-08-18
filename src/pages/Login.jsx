import { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Completá email y contraseña');
      return;
    }

    try {
      setLoadingSubmit(true);
      await login(form.email, form.password);
      navigate('/'); // o /admin, según tu flujo
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
        'Credenciales inválidas o error al iniciar sesión'
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card style={{ width: 380 }} className="shadow-sm">
        <Card.Body>
          <h3 className="mb-3 text-center">Iniciar Sesión</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="tuemail@correo.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Tu contraseña"
                value={form.password}
                onChange={onChange}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button type="submit" disabled={loadingSubmit}>
                {loadingSubmit ? <Spinner size="sm" /> : 'Entrar'}
              </Button>
            </div>
          </Form>

          {/* Posible link a registro si luego implementás: 
          <div className="text-center mt-3">
            <small>¿No tenés cuenta? <Link to="/register">Registrate</Link></small>
          </div> */}
        </Card.Body>
      </Card>
    </div>
  );
}
