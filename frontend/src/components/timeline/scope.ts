import type { CellState, Scope } from './contract';
import type { GlyphName } from './icons';

/**
 * Região 3 — Escopo. "Praças × plataformas — contável e expansível", que
 * colapsa em contador numérico (§1). Estas funções são o "contável".
 */

export function cellKey(pracaId: string, platformId: string): string {
  return `${pracaId}:${platformId}`;
}

export function cellStateOf(scope: Scope, pracaId: string, platformId: string): CellState {
  return scope.cells[cellKey(pracaId, platformId)] ?? 'fora-do-escopo';
}

export interface ScopeSummary {
  live: number;
  error: number;
  scheduled: number;
  out: number;
  /** Células dentro do escopo (tudo menos 'fora-do-escopo'). */
  active: number;
  /** Praças com ao menos uma plataforma no escopo. */
  pracas: number;
  total: number;
}

export function summarizeScope(scope: Scope): ScopeSummary {
  const summary: ScopeSummary = {
    live: 0,
    error: 0,
    scheduled: 0,
    out: 0,
    active: 0,
    pracas: 0,
    total: scope.pracas.length * scope.platforms.length,
  };

  for (const praca of scope.pracas) {
    let pracaHasScope = false;
    for (const platform of scope.platforms) {
      const state = cellStateOf(scope, praca.id, platform.id);
      switch (state) {
        case 'no-ar':
          summary.live += 1;
          break;
        case 'erro':
          summary.error += 1;
          break;
        case 'agendada':
          summary.scheduled += 1;
          break;
        case 'fora-do-escopo':
          summary.out += 1;
          break;
      }
      if (state !== 'fora-do-escopo') {
        summary.active += 1;
        pracaHasScope = true;
      }
    }
    if (pracaHasScope) summary.pracas += 1;
  }

  return summary;
}

/** §4.1 — cor É reforço; o glifo é o portador obrigatório. */
export const CELL_GLYPH: Record<CellState, GlyphName> = {
  'no-ar': 'ti-check',
  erro: 'ti-alert-triangle',
  agendada: 'ti-circle',
  'fora-do-escopo': 'ti-minus',
};

export const CELL_LABEL: Record<CellState, string> = {
  'no-ar': 'no ar',
  erro: 'erro',
  agendada: 'agendada',
  'fora-do-escopo': 'fora do escopo',
};

export const CELL_ORDER: readonly CellState[] = ['no-ar', 'erro', 'agendada', 'fora-do-escopo'];
