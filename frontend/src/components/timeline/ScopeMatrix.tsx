import type { Scope } from './contract';
import { Glyph } from './icons';
import { CELL_GLYPH, CELL_LABEL, CELL_ORDER, cellStateOf } from './scope';

/**
 * §4.1 — Matriz de escopo acessível.
 * ============================================================================
 * Grid praça (coluna) × plataforma (linha). Cada célula é um estado.
 *
 * Três regras da spec estão codificadas aqui e não devem ser "otimizadas":
 *  1. Cor NUNCA é o único canal — toda célula carrega glifo.
 *  2. Célula ≥ 14px (era 11px, abaixo do piso).
 *  3. `aria-label` por célula no formato "SP · TV+ · erro" + legenda visível.
 *
 * É `<table>` de verdade, não um grid de divs: leitor de tela precisa anunciar
 * o cabeçalho de linha e de coluna ao navegar célula a célula.
 */

interface ScopeMatrixProps {
  scope: Scope;
  /** id usado pelo `aria-describedby` do container do popover. */
  captionId?: string;
}

export function ScopeMatrix({ scope, captionId }: ScopeMatrixProps) {
  return (
    <div className="scope">
      <table className="scope__table">
        <caption className="visually-hidden" id={captionId}>
          Escopo por praça e plataforma. Cada célula informa o estado da interatividade naquela
          combinação.
        </caption>
        <thead>
          <tr>
            <th scope="col">
              <span className="visually-hidden">Plataforma</span>
            </th>
            {scope.pracas.map((praca) => (
              <th key={praca.id} scope="col" className="scope__col-head" title={praca.name}>
                {praca.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {scope.platforms.map((platform) => (
            <tr key={platform.id}>
              <th scope="row" className="scope__row-head">
                {platform.label}
              </th>
              {scope.pracas.map((praca) => {
                const state = cellStateOf(scope, praca.id, platform.id);
                return (
                  <td key={praca.id} className="scope__cell-wrap">
                    <span
                      className="scope__cell"
                      data-cell={state}
                      role="img"
                      aria-label={`${praca.name} · ${platform.label} · ${CELL_LABEL[state]}`}
                    >
                      <Glyph name={CELL_GLYPH[state]} size={12} />
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="scope__legend">
        {CELL_ORDER.map((state) => (
          <li key={state} className="scope__legend-item">
            <span className="scope__cell scope__cell--legend" data-cell={state} aria-hidden="true">
              <Glyph name={CELL_GLYPH[state]} size={12} />
            </span>
            {CELL_LABEL[state]}
          </li>
        ))}
      </ul>
    </div>
  );
}
