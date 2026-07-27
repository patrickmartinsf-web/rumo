import type { BlockState, Interactivity, Persistence } from './contract';

/**
 * Camada 0 — sinal de estado (§1). Não é região, é o container.
 *
 * §6 é bloqueante: "nenhum estado comunicado só por cor". Por isso todo estado
 * aqui tem label textual obrigatória, e o dot do bloco muda de FORMA além de
 * cor (ver `.tlb__dot[data-state]` no CSS).
 */

export const STATE_LABEL: Record<BlockState, string> = {
  rascunho: 'Rascunho',
  agendada: 'Agendada',
  'no-ar': 'No ar',
  encerrada: 'Encerrada',
  erro: 'Erro',
};

export const PERSISTENCE_LABEL: Record<Persistence, string> = {
  contextual: 'Contextual',
  persistente: 'Persistente',
};

export function replicationLabel(item: Interactivity): string {
  return item.replication.kind === 'replicada'
    ? `Replicada em ${item.replication.count} praças`
    : 'Única';
}
