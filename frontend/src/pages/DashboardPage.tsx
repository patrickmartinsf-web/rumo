import { Users, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const STAT_CARDS = [
  { label: 'Instrutores Ativos', value: '–', icon: Users, color: 'text-brand-600', bg: 'bg-brand-50' },
  { label: 'Aulas Hoje', value: '–', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Taxa de Ocupação', value: '–', icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
  { label: 'Instrutores sem Aula', value: '–', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Olá, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 mt-1">Aqui está o resumo do dia</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card flex items-center gap-4">
            <div className={`${bg} p-3 rounded-lg`}>
              <Icon className={color} size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Aulas de Hoje</h2>
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            Nenhuma aula agendada para hoje
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold text-gray-900 mb-4">Instrutores Disponíveis</h2>
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            Cadastre instrutores para ver aqui
          </div>
        </div>
      </div>
    </div>
  );
}
