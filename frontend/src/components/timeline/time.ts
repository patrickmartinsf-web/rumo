/**
 * Vocabulário temporal do domínio: agulha, encaixe, estouro.
 * ============================================================================
 * A região 2 (Extensão) "é a largura, não um texto" (§1). Este arquivo é o que
 * transforma a janela em px — e o que o popover usa para escrever em texto o
 * que o bloco comunica por geometria.
 */

import type { TimeWindow } from './contract';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

export function formatClock(ts: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(ts);
}

export function formatClockWithSeconds(ts: number): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(ts);
}

/** "1h 20min", "45min", "30s" — curto o bastante para caber no popover. */
export function formatDuration(ms: number): string {
  const abs = Math.max(0, Math.round(ms));
  if (abs < MINUTE) return `${Math.round(abs / 1000)}s`;
  const hours = Math.floor(abs / HOUR);
  const minutes = Math.round((abs % HOUR) / MINUTE);
  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}

export function durationOf(win: TimeWindow): number {
  return Math.max(0, win.endsAt - win.startsAt);
}

/** 0..1. Fora da janela satura, para a barra nunca renderizar negativa. */
export function progressOf(win: TimeWindow, now: number): number {
  const total = durationOf(win);
  if (total === 0) return now >= win.endsAt ? 1 : 0;
  return Math.min(1, Math.max(0, (now - win.startsAt) / total));
}

export function remainingOf(win: TimeWindow, now: number): number {
  return Math.max(0, win.endsAt - now);
}

/** Onde a agulha está em relação a esta interatividade. */
export type NeedleRelation = 'antes' | 'durante' | 'depois';

export function needleRelation(win: TimeWindow, now: number): NeedleRelation {
  if (now < win.startsAt) return 'antes';
  if (now >= win.endsAt) return 'depois';
  return 'durante';
}

/**
 * Encaixe / estouro: a janela da interatividade cabe dentro da janela que a
 * contém (programa, faixa exibida)? Estouro é o caso em que não cabe, e é a
 * informação que o bloco perde ao ser clipado nas bordas da trilha.
 */
export type FitStatus = 'encaixe' | 'estouro-inicio' | 'estouro-fim' | 'estouro-ambos';

export function fitStatus(win: TimeWindow, container: TimeWindow): FitStatus {
  const before = win.startsAt < container.startsAt;
  const after = win.endsAt > container.endsAt;
  if (before && after) return 'estouro-ambos';
  if (before) return 'estouro-inicio';
  if (after) return 'estouro-fim';
  return 'encaixe';
}

export function fitLabel(status: FitStatus): string {
  switch (status) {
    case 'encaixe':
      return 'Encaixa na janela do programa';
    case 'estouro-inicio':
      return 'Estouro: começa antes da janela do programa';
    case 'estouro-fim':
      return 'Estouro: termina depois da janela do programa';
    case 'estouro-ambos':
      return 'Estouro: extrapola a janela do programa nas duas pontas';
  }
}

/** Fração 0..1 da posição de `ts` dentro de `view`. Sem clamp: o chamador decide. */
export function fractionIn(view: TimeWindow, ts: number): number {
  const total = durationOf(view);
  if (total === 0) return 0;
  return (ts - view.startsAt) / total;
}
