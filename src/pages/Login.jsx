import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // importa el css que te dejo abajo
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // opcional: instalar react-bootstrap-icons

export default function LoginBrown() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error al iniciar sesión';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <Container className="login-bg d-flex align-items-center justify-content-center">
      <Card className="login-card">
        <Card.Body>
          <div className="brand">
            <div className="logo" aria-hidden="true" />
            <h3 className="mb-0">Esmae</h3>
          </div>

          <h5 className="text-muted mb-3">Iniciar sesión</h5>

          {error && <Alert variant="warning" onClose={() => setError('')} dismissible>{error}</Alert>}

          <Form onSubmit={onSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="email">
              <Form.Label className="small text-muted">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="tu@ejemplo.com"
                required
                className="form-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="small text-muted">Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="pw-toggle"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button type="submit" variant="brown" disabled={loading}>
                {loading ? 'Ingresando...' : 'Entrar'}
              </Button>
              <Button as="a" href="/register" variant="outline-brown">
                Crear cuenta
              </Button>
            </div>
          </Form>

          <div className="mt-3 text-center small text-muted">
            ¿Olvidaste tu contraseña? <a href="/forgot">Restablecer</a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
