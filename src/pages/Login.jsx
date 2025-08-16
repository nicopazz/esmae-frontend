import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form.email, form.password);
      navigate('/'); // redirige al home
    } catch (err) {
      const msg = err?.response?.data?.message || 'Error al iniciar sesión';
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: '40px auto' }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={onChange}
          required
        />
        {error && <small style={{ color: 'crimson' }}>{error}</small>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
