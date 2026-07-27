/**
 * CONTRATO DO BLOCO — v1
 * ============================================================================
 * §0: o bloco não é uma lista de campos, é um contrato de 5 regiões fixas.
 * Toda interatividade (as do catálogo e as futuras) mapeia nessas regiões.
 *
 * Consequência prática para quem for adicionar um tipo novo: você mexe no
 * PAYLOAD (este arquivo), nunca no layout. Se um metadado novo não cabe em
 * nenhuma das 5 regiões, ele não é do bloco — vai pro drawer — ou o contrato
 * sobe de versão explicitamente (ver CONTRACT_VERSION).
 */

export const CONTRACT_VERSION = 1;

/** §1 — as 5 regiões. A ordem do enum é a ordem de leitura, no bloco e no popover. */
export type Region = 'ancora' | 'extensao' | 'escopo' | 'adornos' | 'acao';

export const REGION_ORDER: readonly Region[] = ['ancora', 'extensao', 'escopo', 'adornos', 'acao'];

/**
 * Camada 0 — sinal de estado. Não é região, é o container (§1).
 * `replicada` é dimensão ortogonal (uma interatividade replicada também está
 * em algum destes estados), por isso mora em `Interactivity.replication`.
 */
export type BlockState = 'rascunho' | 'agendada' | 'no-ar' | 'encerrada' | 'erro';

/**
 * §2 — tipo é comunicado por FORMA (glifo), nunca por cor.
 * Adicionar um tipo = adicionar um glifo em `icons.tsx`. Zero custo de layout.
 */
export type InteractivityType =
  'votacao' | 'estatisticas' | 'escalacao' | 'quiz' | 'placar' | 'enquete';

export type Persistence = 'contextual' | 'persistente';

export type Replication = { kind: 'unica' } | { kind: 'replicada'; count: number; groupId: string };

/** §4.1 — estados de célula da matriz praça × plataforma. */
export type CellState = 'no-ar' | 'erro' | 'agendada' | 'fora-do-escopo';

export interface Praca {
  id: string;
  /** Sigla curta usada no cabeçalho da matriz (ex.: "SP"). */
  label: string;
  /** Nome por extenso, usado no aria-label da célula. */
  name: string;
}

export interface Platform {
  id: string;
  /** "DTV+" | "TV+" hoje; a matriz aceita N plataformas sem mudar de layout. */
  label: string;
}

export interface Scope {
  pracas: Praca[];
  platforms: Platform[];
  /** Chave: `${pracaId}:${platformId}`. Ausência = 'fora-do-escopo'. */
  cells: Record<string, CellState>;
}

/** §1 região 4 — trilho de plugins. Cada adorno é um plugin, não um campo fixo. */
export type SignalKind = 'nota' | 'alerta' | 'dependencia';

export interface Signal {
  id: string;
  kind: SignalKind;
  text: string;
  author: string;
  /** epoch ms */
  at: number;
}

/**
 * §4 — ações são de DECISÃO, não de edição.
 * `navigate` sai do popover (drawer, outra tela) e é marcada com seta;
 * `execute` roda ali mesmo e é a única que pode ser sólida.
 */
export interface BlockAction {
  id: string;
  label: string;
  behavior: 'execute' | 'navigate';
  /** Exatamente uma ação primária por interatividade (§1 região 5). */
  primary?: boolean;
  /** `false` mantém a ação visível porém inerte (ex.: "pausar" numa encerrada). */
  enabled?: boolean;
}

export interface TimeWindow {
  /** epoch ms */
  startsAt: number;
  /** epoch ms */
  endsAt: number;
}

/** O payload completo. É isso que muda por tipo de interatividade — só isso. */
export interface Interactivity {
  id: string;
  type: InteractivityType;
  title: string;
  state: BlockState;
  persistence: Persistence;
  replication: Replication;
  window: TimeWindow;
  scope: Scope;
  signals: Signal[];
  actions: BlockAction[];
}

// ---------------------------------------------------------------------------
// §3 — ESCADA DE DENSIDADE (orçamento de slots)
// ---------------------------------------------------------------------------
// Não é decisão por zoom level nem por tipo: é regra em px de largura
// RENDERIZADA. Cada peça declara prioridade + largura mínima; o bloco renderiza
// o que couber e manda o resto pro popover (§4).
//
// Prioridade declarada (§3): âncora > estado > escopo > adornos > ação secundária.

export type SlotId =
  | 'ancora.icone'
  | 'ancora.titulo'
  | 'ancora.badge-replica'
  | 'estado.dot'
  | 'estado.progresso'
  | 'extensao.inicio'
  | 'extensao.fim'
  | 'escopo.chip'
  | 'escopo.contador'
  | 'adornos.trilho'
  | 'acao.primaria'
  | 'acao.overflow';

export interface SlotSpec {
  id: SlotId;
  region: Region;
  /** Menor = sobrevive por mais tempo. Espelha a prioridade declarada em §3. */
  priority: number;
  /** Largura renderizada mínima do bloco, em px, para este slot aparecer. */
  minWidth: number;
}

/**
 * A tabela de §3 vira dado. Um metadado novo entra aqui declarando região,
 * prioridade e minWidth — e o colapso passa a funcionar sozinho.
 * Custo de design = zero, que é o ponto da seção.
 */
export const SLOT_BUDGET: readonly SlotSpec[] = [
  { id: 'ancora.icone', region: 'ancora', priority: 10, minWidth: 44 },
  { id: 'estado.dot', region: 'ancora', priority: 20, minWidth: 44 },
  { id: 'ancora.titulo', region: 'ancora', priority: 30, minWidth: 120 },
  { id: 'ancora.badge-replica', region: 'ancora', priority: 35, minWidth: 120 },
  { id: 'estado.progresso', region: 'ancora', priority: 40, minWidth: 120 },
  { id: 'extensao.inicio', region: 'extensao', priority: 50, minWidth: 240 },
  { id: 'escopo.contador', region: 'escopo', priority: 60, minWidth: 240 },
  { id: 'acao.overflow', region: 'acao', priority: 70, minWidth: 240 },
  { id: 'extensao.fim', region: 'extensao', priority: 80, minWidth: 420 },
  { id: 'escopo.chip', region: 'escopo', priority: 85, minWidth: 420 },
  { id: 'adornos.trilho', region: 'adornos', priority: 90, minWidth: 420 },
  { id: 'acao.primaria', region: 'acao', priority: 100, minWidth: 420 },
];

/** Degraus nomeados da escada — usados só para `data-tier` (debug/QA/testes). */
export type DensityTier = 'full' | 'compact' | 'minimal' | 'icon' | 'bar';

export function densityTier(width: number): DensityTier {
  if (width >= 420) return 'full';
  if (width >= 240) return 'compact';
  if (width >= 120) return 'minimal';
  if (width >= 44) return 'icon';
  return 'bar';
}

/**
 * Resolve o orçamento para uma largura. Retorna um predicado em vez de uma
 * lista para o JSX ficar legível: `slot('escopo.chip') && <Chip/>`.
 */
export function resolveSlots(width: number): (id: SlotId) => boolean {
  const visible = new Set<SlotId>();
  for (const spec of SLOT_BUDGET) {
    if (width >= spec.minWidth) visible.add(spec.id);
  }
  // §3: escopo colapsa em contador — chip e contador nunca coexistem.
  if (visible.has('escopo.chip')) visible.delete('escopo.contador');
  return (id: SlotId) => visible.has(id);
}

/** Slots que o orçamento cortou. É exatamente o que o popover precisa cobrir (§4). */
export function overflowSlots(width: number): SlotId[] {
  return SLOT_BUDGET.filter((spec) => width < spec.minWidth).map((spec) => spec.id);
}
