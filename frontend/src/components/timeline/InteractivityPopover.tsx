import { useEffect, useId, useMemo } from 'react';
import { createPortal } from 'react-dom';
import type { Interactivity, Region, TimeWindow } from './contract';
import { ActionMenu } from './ActionMenu';
import { ScopeMatrix } from './ScopeMatrix';
import { Glyph, SIGNAL_GLYPH, SIGNAL_LABEL, TYPE_GLYPH, TYPE_LABEL } from './icons';
import { summarizeScope } from './scope';
import { PERSISTENCE_LABEL, STATE_LABEL, replicationLabel } from './state';
import {
  fitLabel,
  fitStatus,
  formatClock,
  formatClockWithSeconds,
  formatDuration,
  durationOf,
  needleRelation,
  progressOf,
  remainingOf,
} from './time';
import { usePopoverPosition } from './usePopoverPosition';
import { useRegionPulse } from './useRegionPulse';
import type { PopoverController } from './usePopoverController';

/**
 * POPOVER ANCORADO — §4. NÃO é tooltip.
 * ============================================================================
 * O nome importa: tooltip é hover puro, efêmero e não-interativo; se tem botão
 * dentro, quebra. Isto aqui abre no hover com delay, fixa no clique, navega por
 * teclado e fecha no Esc — é popover / hover card.
 *
 * E, principalmente: é a SUPERFÍCIE DE OVERFLOW do orçamento de slots. Tudo que
 * colapsou na escada (§3) reaparece aqui, na mesma ordem das 5 regiões. Ninguém
 * desenha popover novo por tipo de interatividade — o conteúdo vem do contrato.
 */

interface InteractivityPopoverProps {
  item: Interactivity;
  controller: PopoverController;
  now: number;
  /** Janela do programa — base para encaixe/estouro. */
  container: TimeWindow;
  onAction: (item: Interactivity, actionId: string) => void;
}

export function InteractivityPopover({
  item,
  controller,
  now,
  container,
  onAction,
}: InteractivityPopoverProps) {
  const titleId = useId();
  const { anchorEl, popoverRef, pinned, instant, focusPanel } = controller;
  const position = usePopoverPosition(anchorEl, popoverRef, item.id);

  const scope = summarizeScope(item.scope);
  const progress = progressOf(item.window, now);
  const relation = needleRelation(item.window, now);
  const fit = fitStatus(item.window, container);
  const hasError = item.state === 'erro' || scope.error > 0;

  const primary = item.actions.find((action) => action.primary);
  const secondary = item.actions.filter((action) => !action.primary);
  const inlineSecondary = secondary.slice(0, 2);
  const menuSecondary = secondary.slice(2);

  /**
   * §5, dado ao vivo: só a região que mudou anima. As assinaturas abaixo são
   * de DADO, não de relógio — de propósito. Se `now` entrasse aqui, a janela
   * pulsaria a cada segundo e o painel viraria um pisca-pisca durante a leitura.
   */
  const sigAncora = `${item.state}|${item.title}`;
  const sigExtensao = `${item.window.startsAt}|${item.window.endsAt}`;
  const sigEscopo = JSON.stringify(item.scope.cells);
  const sigAdornos = item.signals.map((signal) => signal.id).join(',');
  const sigAcao = item.actions
    .map((action) => `${action.id}:${action.enabled !== false}`)
    .join(',');

  const signatures = useMemo<Partial<Record<Region, string>>>(
    () => ({
      ancora: sigAncora,
      extensao: sigExtensao,
      escopo: sigEscopo,
      adornos: sigAdornos,
      acao: sigAcao,
    }),
    [sigAcao, sigAdornos, sigAncora, sigEscopo, sigExtensao],
  );
  const pulsing = useRegionPulse(signatures);

  /**
   * O foco só entra no painel quando o usuário FIXA pelo teclado (Enter/Espaço).
   * Abrir por navegação de setas mantém o foco no bloco — do contrário a
   * primeira seta abriria o painel, o painel roubaria o foco e a segunda seta
   * não navegaria mais nada. (§5, roving tabindex.)
   */
  useEffect(() => {
    if (focusPanel) popoverRef.current?.focus();
  }, [focusPanel, popoverRef, item.id]);

  const needleText =
    relation === 'antes'
      ? `Agulha ainda não chegou · entra em ${formatDuration(item.window.startsAt - now)}`
      : relation === 'durante'
        ? `Agulha dentro da janela · restam ${formatDuration(remainingOf(item.window, now))}`
        : `Agulha já passou · encerrou há ${formatDuration(now - item.window.endsAt)}`;

  return createPortal(
    <div
      ref={popoverRef}
      className="pop"
      role="dialog"
      aria-labelledby={titleId}
      tabIndex={-1}
      data-placement={position?.placement ?? 'bottom'}
      data-instant={instant || undefined}
      data-pinned={pinned || undefined}
      style={{
        left: position ? `${position.left}px` : '-9999px',
        top: position ? `${position.top}px` : '-9999px',
        // Fallback só até a primeira medição; evita flash no canto da tela.
        visibility: position ? 'visible' : 'hidden',
        ['--arrow-offset' as string]: `${position?.arrowOffset ?? 0}px`,
      }}
      onPointerEnter={controller.cancelClose}
      onPointerLeave={controller.requestClose}
    >
      <span className="pop__arrow" aria-hidden="true" />

      {/* ---- 1. Cabeçalho (região 1 — Âncora) ---- */}
      <header
        className="pop__header"
        data-region="ancora"
        data-pulse={pulsing.has('ancora') || undefined}
      >
        <span className="pop__tipo" aria-hidden="true">
          <Glyph name={TYPE_GLYPH[item.type]} size={18} />
        </span>
        <div className="pop__ident">
          <h2 className="pop__titulo" id={titleId}>
            {item.title}
          </h2>
          <p className="pop__sub">
            {TYPE_LABEL[item.type]} · {PERSISTENCE_LABEL[item.persistence]} ·{' '}
            {replicationLabel(item)} · <span className="pop__id">{item.id}</span>
          </p>
        </div>
        <span className="pop__badge" data-state={item.state}>
          {STATE_LABEL[item.state]}
        </span>
        {pinned ? (
          <button
            type="button"
            className="pop__btn pop__btn--icon pop__close"
            aria-label="Fechar painel"
            onClick={() => controller.closeNow()}
          >
            <Glyph name="ti-x" size={18} />
          </button>
        ) : null}
      </header>

      {/* ---- Urgência reordena (ajuste da crítica em §4) ----
          A ordem das regiões é fixa, mas erro sobe pra logo abaixo do
          cabeçalho em vez de esperar a vez dele na região 4. */}
      {hasError ? (
        <div className="pop__erro" role="status">
          <Glyph name="ti-alert-triangle" size={16} />
          <span>
            {item.state === 'erro' ? 'Falha na publicação' : 'Falha parcial'}
            {scope.error > 0
              ? ` · ${scope.error} ${scope.error === 1 ? 'praça afetada' : 'praças afetadas'}`
              : ''}
          </span>
        </div>
      ) : null}

      {/* Cabeçalho, faixa de erro e rodapé ficam fixos; só o miolo rola.
          Assim a ação primária (item 5) nunca sai da tela, e o menu `...` do
          rodapé não é clipado por um container de scroll. */}
      <div className="pop__body">
        {/* ---- 2. Janela (região 2 — Extensão) ---- */}
        <section
          className="pop__sec"
          data-region="extensao"
          data-pulse={pulsing.has('extensao') || undefined}
          aria-label="Janela"
        >
          <h3 className="pop__sec-title">Janela</h3>
          <p className="pop__janela">
            <time dateTime={new Date(item.window.startsAt).toISOString()}>
              {formatClockWithSeconds(item.window.startsAt)}
            </time>
            <span aria-hidden="true"> → </span>
            <time dateTime={new Date(item.window.endsAt).toISOString()}>
              {formatClockWithSeconds(item.window.endsAt)}
            </time>
          </p>
          <p className="pop__meta">
            Duração {formatDuration(durationOf(item.window))}
            {relation === 'durante'
              ? ` · restam ${formatDuration(remainingOf(item.window, now))}`
              : null}
          </p>

          {/* Canal PROGRESSO (§2): barra dedicada, tonalidade própria. */}
          <div
            className="pop__progresso"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-label="Progresso da janela"
          >
            <span className="pop__progresso-fill" style={{ width: `${progress * 100}%` }} />
          </div>

          <ul className="pop__linhas">
            <li data-relation={relation}>{needleText}</li>
            <li data-fit={fit}>{fitLabel(fit)}</li>
          </ul>
        </section>

        {/* ---- 3. Escopo (região 3) ---- */}
        <section
          className="pop__sec"
          data-region="escopo"
          data-pulse={pulsing.has('escopo') || undefined}
          aria-label="Escopo"
        >
          <h3 className="pop__sec-title">
            Escopo
            <span className="pop__sec-count">
              {scope.active}/{scope.total} células · {scope.pracas} praças
            </span>
          </h3>
          <ScopeMatrix scope={item.scope} />
        </section>

        {/* ---- 4. Sinais (região 4 — Adornos) ---- */}
        <section
          className="pop__sec"
          data-region="adornos"
          data-pulse={pulsing.has('adornos') || undefined}
          aria-label="Sinais"
        >
          <h3 className="pop__sec-title">Sinais</h3>
          {item.signals.length === 0 ? (
            <p className="pop__vazio">Sem notas, alertas ou dependências.</p>
          ) : (
            <ul className="pop__sinais">
              {item.signals.map((signal) => (
                <li key={signal.id} className="pop__sinal" data-kind={signal.kind}>
                  <span className="pop__sinal-glifo" aria-hidden="true">
                    <Glyph name={SIGNAL_GLYPH[signal.kind]} size={14} />
                  </span>
                  <div>
                    <p className="pop__sinal-texto">
                      <span className="visually-hidden">{SIGNAL_LABEL[signal.kind]}: </span>
                      {signal.text}
                    </p>
                    <p className="pop__meta">
                      {signal.author} · {formatClock(signal.at)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ---- 5. Rodapé de ação (região 5) ----
          Ações de DECISÃO. "Editar" não abre form aqui: navega pro drawer, e
          por isso vem marcada com a seta em vez de sólida. */}
      <footer
        className="pop__footer"
        data-region="acao"
        data-pulse={pulsing.has('acao') || undefined}
      >
        {primary ? (
          <button
            type="button"
            className="pop__btn pop__btn--primary"
            data-behavior={primary.behavior}
            disabled={primary.enabled === false}
            onClick={() => onAction(item, primary.id)}
          >
            {primary.label}
            {primary.behavior === 'navigate' ? <Glyph name="ti-arrow-up-right" size={14} /> : null}
          </button>
        ) : null}

        {inlineSecondary.map((action) => (
          <button
            key={action.id}
            type="button"
            className="pop__btn"
            data-behavior={action.behavior}
            disabled={action.enabled === false}
            onClick={() => onAction(item, action.id)}
          >
            {action.label}
            {action.behavior === 'navigate' ? <Glyph name="ti-arrow-up-right" size={14} /> : null}
          </button>
        ))}

        <ActionMenu actions={menuSecondary} onSelect={(actionId) => onAction(item, actionId)} />
      </footer>
    </div>,
    document.body,
  );
}
