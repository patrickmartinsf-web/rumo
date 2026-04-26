import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <p className="mt-4 text-gray-600 text-lg">Página não encontrada</p>
      <Link to="/dashboard" className="mt-6 btn-primary">Voltar ao Dashboard</Link>
    </div>
  );
}
