import type {
  BlockAction,
  BlockState,
  Interactivity,
  Praca,
  Platform,
  Scope,
  CellState,
} from '../components/timeline/contract';
import { cellKey } from '../components/timeline/scope';

/**
 * Payload de demonstração.
 * ============================================================================
 * Existe para provar a tese do §0: TODO tipo de interatividade aqui usa o mesmo
 * componente, o mesmo layout e o mesmo popover. O que muda entre "Votação",
 * "Placar" e "Enquete" é só o objeto — nenhuma tela custom por caso.
 */

const MIN = 60_000;

export const PRACAS: Praca[] = [
  { id: 'sp', label: 'SP', name: 'SP' },
  { id: 'rj', label: 'RJ', name: 'RJ' },
  { id: 'mg', label: 'MG', name: 'MG' },
  { id: 'rs', label: 'RS', name: 'RS' },
  { id: 'ba', label: 'BA', name: 'BA' },
  { id: 'pe', label: 'PE', name: 'PE' },
  { id: 'df', label: 'DF', name: 'DF' },
];

export const PLATFORMS: Platform[] = [
  { id: 'dtv', label: 'DTV+' },
  { id: 'tvplus', label: 'TV+' },
];

function scopeFrom(rows: Record<string, [CellState, CellState]>): Scope {
  const cells: Record<string, CellState> = {};
  for (const [pracaId, [dtv, tvplus]] of Object.entries(rows)) {
    cells[cellKey(pracaId, 'dtv')] = dtv;
    cells[cellKey(pracaId, 'tvplus')] = tvplus;
  }
  return { pracas: PRACAS, platforms: PLATFORMS, cells };
}

/**
 * §4: ações são de DECISÃO, não de edição. "Editar" navega pro drawer — por
 * isso `behavior: 'navigate'`, que o rodapé marca com a seta.
 */
function actionsFor(state: BlockState): BlockAction[] {
  const editar: BlockAction = { id: 'editar', label: 'Editar', behavior: 'navigate' };
  const logs: BlockAction = { id: 'logs', label: 'Abrir logs', behavior: 'navigate' };

  switch (state) {
    case 'no-ar':
      return [
        { id: 'pausar', label: 'Pausar', behavior: 'execute', primary: true },
        { id: 'replicar', label: 'Replicar', behavior: 'execute' },
        editar,
        { id: 'encerrar', label: 'Encerrar agora', behavior: 'execute' },
        logs,
      ];
    case 'agendada':
      return [
        { id: 'publicar', label: 'Publicar agora', behavior: 'execute', primary: true },
        { id: 'replicar', label: 'Replicar', behavior: 'execute' },
        editar,
        { id: 'cancelar', label: 'Cancelar agendamento', behavior: 'execute' },
      ];
    case 'rascunho':
      return [
        { id: 'agendar', label: 'Agendar', behavior: 'execute', primary: true },
        editar,
        { id: 'descartar', label: 'Descartar', behavior: 'execute' },
      ];
    case 'encerrada':
      return [
        { id: 'replicar', label: 'Replicar', behavior: 'execute', primary: true },
        { id: 'relatorio', label: 'Ver relatório', behavior: 'navigate' },
        { id: 'pausar', label: 'Pausar', behavior: 'execute', enabled: false },
        logs,
      ];
    case 'erro':
      return [
        { id: 'republicar', label: 'Republicar', behavior: 'execute', primary: true },
        logs,
        editar,
        { id: 'encerrar', label: 'Encerrar', behavior: 'execute' },
      ];
  }
}

export interface DemoWindows {
  view: { startsAt: number; endsAt: number };
  container: { startsAt: number; endsAt: number };
}

export function buildDemo(now: number): { items: Interactivity[]; windows: DemoWindows } {
  const view = { startsAt: now - 40 * MIN, endsAt: now + 80 * MIN };
  // Janela do programa mais estreita que a vista de propósito: é o que faz
  // "estouro" aparecer no popover em vez de virar teoria.
  const container = { startsAt: now - 30 * MIN, endsAt: now + 60 * MIN };

  const items: Interactivity[] = [
    {
      id: 'itr-4821',
      type: 'votacao',
      title: 'Craque da partida',
      state: 'no-ar',
      persistence: 'contextual',
      replication: { kind: 'replicada', count: 5, groupId: 'grp-craque' },
      window: { startsAt: now - 12 * MIN, endsAt: now + 18 * MIN },
      scope: scopeFrom({
        sp: ['no-ar', 'no-ar'],
        rj: ['no-ar', 'no-ar'],
        mg: ['no-ar', 'agendada'],
        rs: ['agendada', 'agendada'],
        ba: ['fora-do-escopo', 'fora-do-escopo'],
        pe: ['no-ar', 'erro'],
        df: ['fora-do-escopo', 'fora-do-escopo'],
      }),
      signals: [
        {
          id: 'sig-1',
          kind: 'alerta',
          text: 'PE · TV+ sem confirmação de encaixe há 3 min.',
          author: 'Monitor',
          at: now - 3 * MIN,
        },
        {
          id: 'sig-2',
          kind: 'nota',
          text: 'Combinado com a direção: manter no ar até o fim do 2º tempo.',
          author: 'Carla Menezes',
          at: now - 26 * MIN,
        },
      ],
      actions: actionsFor('no-ar'),
    },
    {
      id: 'itr-4790',
      type: 'placar',
      title: 'Placar ao vivo',
      state: 'no-ar',
      persistence: 'persistente',
      replication: { kind: 'replicada', count: 7, groupId: 'grp-placar' },
      // Estoura a janela do programa nas duas pontas — caso de "estouro-ambos".
      window: { startsAt: now - 38 * MIN, endsAt: now + 72 * MIN },
      scope: scopeFrom({
        sp: ['no-ar', 'no-ar'],
        rj: ['no-ar', 'no-ar'],
        mg: ['no-ar', 'no-ar'],
        rs: ['no-ar', 'no-ar'],
        ba: ['no-ar', 'no-ar'],
        pe: ['no-ar', 'no-ar'],
        df: ['no-ar', 'no-ar'],
      }),
      signals: [
        {
          id: 'sig-3',
          kind: 'dependencia',
          text: 'Depende do feed de estatísticas (STATS-02).',
          author: 'Integração',
          at: now - 90 * MIN,
        },
      ],
      actions: actionsFor('no-ar'),
    },
    {
      id: 'itr-4755',
      type: 'estatisticas',
      title: 'Estatísticas do 1º tempo',
      state: 'encerrada',
      persistence: 'contextual',
      replication: { kind: 'unica' },
      window: { startsAt: now - 36 * MIN, endsAt: now - 20 * MIN },
      scope: scopeFrom({
        sp: ['fora-do-escopo', 'fora-do-escopo'],
        rj: ['fora-do-escopo', 'fora-do-escopo'],
        mg: ['fora-do-escopo', 'fora-do-escopo'],
        rs: ['fora-do-escopo', 'fora-do-escopo'],
        ba: ['fora-do-escopo', 'fora-do-escopo'],
        pe: ['fora-do-escopo', 'fora-do-escopo'],
        df: ['fora-do-escopo', 'fora-do-escopo'],
      }),
      signals: [],
      actions: actionsFor('encerrada'),
    },
    {
      id: 'itr-4830',
      type: 'enquete',
      title: 'Enquete do intervalo',
      state: 'erro',
      persistence: 'contextual',
      replication: { kind: 'unica' },
      window: { startsAt: now + 4 * MIN, endsAt: now + 22 * MIN },
      scope: scopeFrom({
        sp: ['erro', 'erro'],
        rj: ['agendada', 'agendada'],
        mg: ['agendada', 'erro'],
        rs: ['fora-do-escopo', 'fora-do-escopo'],
        ba: ['agendada', 'agendada'],
        pe: ['fora-do-escopo', 'fora-do-escopo'],
        df: ['fora-do-escopo', 'fora-do-escopo'],
      }),
      signals: [
        {
          id: 'sig-4',
          kind: 'alerta',
          text: 'Publicação rejeitada em SP: template sem opção padrão.',
          author: 'Publisher',
          at: now - 1 * MIN,
        },
        {
          id: 'sig-5',
          kind: 'dependencia',
          text: 'Bloqueada pela votação Craque da partida.',
          author: 'Orchestra',
          at: now - 15 * MIN,
        },
      ],
      actions: actionsFor('erro'),
    },
    {
      id: 'itr-4844',
      type: 'escalacao',
      title: 'Escalação confirmada do 2º tempo',
      state: 'agendada',
      persistence: 'contextual',
      replication: { kind: 'unica' },
      window: { startsAt: now + 26 * MIN, endsAt: now + 44 * MIN },
      scope: scopeFrom({
        sp: ['agendada', 'agendada'],
        rj: ['agendada', 'agendada'],
        mg: ['agendada', 'fora-do-escopo'],
        rs: ['fora-do-escopo', 'fora-do-escopo'],
        ba: ['fora-do-escopo', 'fora-do-escopo'],
        pe: ['fora-do-escopo', 'fora-do-escopo'],
        df: ['agendada', 'agendada'],
      }),
      signals: [
        {
          id: 'sig-6',
          kind: 'nota',
          text: 'Conferir nomes com a produção antes de publicar.',
          author: 'João Prado',
          at: now - 50 * MIN,
        },
      ],
      actions: actionsFor('agendada'),
    },
    {
      id: 'itr-4851',
      type: 'quiz',
      title: 'Quiz pós-jogo',
      state: 'rascunho',
      persistence: 'contextual',
      replication: { kind: 'unica' },
      window: { startsAt: now + 50 * MIN, endsAt: now + 66 * MIN },
      scope: scopeFrom({
        sp: ['agendada', 'fora-do-escopo'],
        rj: ['fora-do-escopo', 'fora-do-escopo'],
        mg: ['fora-do-escopo', 'fora-do-escopo'],
        rs: ['fora-do-escopo', 'fora-do-escopo'],
        ba: ['fora-do-escopo', 'fora-do-escopo'],
        pe: ['fora-do-escopo', 'fora-do-escopo'],
        df: ['fora-do-escopo', 'fora-do-escopo'],
      }),
      signals: [],
      actions: actionsFor('rascunho'),
    },
    {
      // Caso limite do §3: dura 2 minutos. Na vista de 2h isso rende ~15px,
      // ou seja, degrau "< 44px — só cor e posição".
      id: 'itr-4860',
      type: 'votacao',
      title: 'Lance polêmico: foi pênalti?',
      state: 'agendada',
      persistence: 'contextual',
      replication: { kind: 'unica' },
      window: { startsAt: now + 47 * MIN, endsAt: now + 49 * MIN },
      scope: scopeFrom({
        sp: ['agendada', 'agendada'],
        rj: ['agendada', 'agendada'],
        mg: ['fora-do-escopo', 'fora-do-escopo'],
        rs: ['fora-do-escopo', 'fora-do-escopo'],
        ba: ['fora-do-escopo', 'fora-do-escopo'],
        pe: ['fora-do-escopo', 'fora-do-escopo'],
        df: ['fora-do-escopo', 'fora-do-escopo'],
      }),
      signals: [],
      actions: actionsFor('agendada'),
    },
  ];

  return { items, windows: { view, container } };
}
