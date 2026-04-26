import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AxiosError } from 'axios';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ academyName: '', name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      const msg = err instanceof AxiosError ? err.response?.data?.error : 'Erro ao cadastrar';
      setError(msg ?? 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-700">Rumo</h1>
          <p className="mt-2 text-gray-500 text-sm">Crie sua academia em minutos</p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cadastrar academia</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="academyName">Nome da academia</label>
              <input
                id="academyName"
                name="academyName"
                type="text"
                className="input"
                value={form.academyName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="name">Seu nome</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label className="label" htmlFor="password">Senha (mínimo 8 caracteres)</label>
              <input
                id="password"
                name="password"
                type="password"
                className="input"
                value={form.password}
                onChange={handleChange}
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar academia'}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Já tem conta?{' '}
            <Link to="/login" className="text-brand-600 font-medium hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
