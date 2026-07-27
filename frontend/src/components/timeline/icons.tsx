/**
 * Glifos — §2, canal TIPO.
 * ============================================================================
 * "forma, nunca cor". Todo ícone daqui herda `currentColor` de propósito: se
 * alguém tentar dar cor própria a um tipo, o canal de estado quebra.
 *
 * Traçado no padrão Tabler (24x24, stroke 2, sem fill), então os nomes batem
 * com os `ti-*` citados na spec e a troca por @tabler/icons-react é 1:1.
 */

import type { SVGProps } from 'react';
import type { InteractivityType, SignalKind } from './contract';

export type GlyphName =
  | 'ti-chart-bar' // estatísticas
  | 'ti-checkbox' // votação
  | 'ti-users' // escalação
  | 'ti-help-circle' // quiz
  | 'ti-scoreboard' // placar
  | 'ti-list-check' // enquete
  | 'ti-check'
  | 'ti-alert-triangle'
  | 'ti-circle'
  | 'ti-minus'
  | 'ti-note'
  | 'ti-link'
  | 'ti-arrow-up-right'
  | 'ti-dots'
  | 'ti-x';

const PATHS: Record<GlyphName, string> = {
  'ti-chart-bar': 'M3 20h18M7 20V10M12 20V4M17 20v-7',
  'ti-checkbox': 'M9 11l3 3l8 -8M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9',
  'ti-users':
    'M9 7a3 3 0 1 0 6 0a3 3 0 0 0 -6 0M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0 -3 -3.85',
  'ti-help-circle':
    'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0M12 17v.01M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4',
  'ti-scoreboard':
    'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-11a1 1 0 0 1 1 -1zM12 5v11M7 9v3M17 9v3M8 20h8',
  'ti-list-check':
    'M3.5 5.5l1.5 1.5l2.5 -2.5M3.5 11.5l1.5 1.5l2.5 -2.5M3.5 17.5l1.5 1.5l2.5 -2.5M11 6h9M11 12h9M11 18h9',
  'ti-check': 'M5 12l5 5l9 -9',
  'ti-alert-triangle':
    'M12 9v4M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0zM12 16h.01',
  'ti-circle': 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0',
  'ti-minus': 'M5 12h14',
  'ti-note':
    'M13 20l7 -7M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7z',
  'ti-link':
    'M9 15l6 -6M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463',
  'ti-arrow-up-right': 'M17 7l-10 10M8 7h9v9',
  'ti-dots': 'M5 12h.01M12 12h.01M19 12h.01',
  'ti-x': 'M18 6l-12 12M6 6l12 12',
};

interface GlyphProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: GlyphName;
  size?: number;
  /**
   * §6: ícone decorativo leva `aria-hidden`. Só passe `label` quando o glifo
   * for a ÚNICA fonte da informação (ex.: célula da matriz, dot de sinal).
   */
  label?: string;
}

export function Glyph({ name, size = 16, label, ...rest }: GlyphProps) {
  const decorative = label === undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** §2 — mapa tipo → forma. Tipo novo entra aqui e em lugar nenhum mais. */
export const TYPE_GLYPH: Record<InteractivityType, GlyphName> = {
  votacao: 'ti-checkbox',
  estatisticas: 'ti-chart-bar',
  escalacao: 'ti-users',
  quiz: 'ti-help-circle',
  placar: 'ti-scoreboard',
  enquete: 'ti-list-check',
};

export const TYPE_LABEL: Record<InteractivityType, string> = {
  votacao: 'Votação',
  estatisticas: 'Estatísticas',
  escalacao: 'Escalação',
  quiz: 'Quiz',
  placar: 'Placar',
  enquete: 'Enquete',
};

export const SIGNAL_GLYPH: Record<SignalKind, GlyphName> = {
  nota: 'ti-note',
  alerta: 'ti-alert-triangle',
  dependencia: 'ti-link',
};

export const SIGNAL_LABEL: Record<SignalKind, string> = {
  nota: 'Nota',
  alerta: 'Alerta',
  dependencia: 'Dependência',
};
