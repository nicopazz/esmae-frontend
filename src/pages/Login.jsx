import { useState } from "react";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../pages/Login.css";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Completá email y contraseña");
      return;
    }

    try {
      setLoadingSubmit(true);
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Credenciales inválidas o error al iniciar sesión"
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card shadow">
        <Card.Body>
          <h3 className="login-title">Iniciar Sesión</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="login-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="tuemail@correo.com"
                value={form.email}
                onChange={onChange}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ position: "relative" }}>
              <Form.Label className="login-label">Contraseña</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Tu contraseña"
                value={form.password}
                onChange={onChange}
                required
                className="login-input password-input"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="password-toggle"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                className="login-btn"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? <Spinner size="sm" /> : "Entrar"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
