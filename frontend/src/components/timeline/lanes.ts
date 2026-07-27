import type { Interactivity, TimeWindow } from './contract';
import { fractionIn } from './time';

/**
 * Empacotamento em trilhas (lanes).
 * ============================================================================
 * ATENÇÃO — §7, item 1: o modelo de trilha/lane está explicitamente FORA deste
 * doc. Colisão, empilhamento de simultâneas, replicada em N praças e
 * Contextual sobre Persistente ainda não têm regra escrita.
 *
 * O que existe aqui é o mínimo para o bloco ser demonstrável numa trilha real:
 * empacotamento guloso por horário de início, com Contextual empurrada para
 * cima de Persistente quando colidem. Não trate como a regra final — quando o
 * modelo de lane sair, é este arquivo que muda, e só ele.
 */

export interface LaneItem {
  item: Interactivity;
  lane: number;
}

/** Folga mínima entre blocos vizinhos, em ms, para não encostarem. */
const LANE_GAP_MS = 0;

export function packLanes(items: Interactivity[]): LaneItem[] {
  const ordered = [...items].sort((a, b) => {
    if (a.window.startsAt !== b.window.startsAt) return a.window.startsAt - b.window.startsAt;
    // Contextual por cima de Persistente quando começam juntas (provisório).
    if (a.persistence !== b.persistence) return a.persistence === 'contextual' ? -1 : 1;
    return a.window.endsAt - b.window.endsAt;
  });

  const laneEnds: number[] = [];
  const result: LaneItem[] = [];

  for (const item of ordered) {
    let lane = laneEnds.findIndex((end) => end <= item.window.startsAt - LANE_GAP_MS);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.window.endsAt);
    } else {
      laneEnds[lane] = item.window.endsAt;
    }
    result.push({ item, lane });
  }

  return result;
}

export function laneCount(packed: LaneItem[]): number {
  return packed.reduce((max, entry) => Math.max(max, entry.lane + 1), 0);
}

export interface Geometry {
  left: number;
  width: number;
  clipStart: boolean;
  clipEnd: boolean;
}

/**
 * Região 2 do contrato: "Extensão — é a largura, não um texto".
 * É esta função que faz essa frase ser verdade.
 */
export function geometryOf(win: TimeWindow, view: TimeWindow): Geometry | null {
  const rawStart = fractionIn(view, win.startsAt);
  const rawEnd = fractionIn(view, win.endsAt);
  if (rawEnd <= 0 || rawStart >= 1) return null; // inteiramente fora da vista

  const start = Math.max(0, rawStart);
  const end = Math.min(1, rawEnd);

  return {
    left: start * 100,
    width: Math.max(end - start, 0) * 100,
    clipStart: rawStart < 0,
    clipEnd: rawEnd > 1,
  };
}
