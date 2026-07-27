import { useRef, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { densityTier, resolveSlots, type Interactivity } from './contract';
import { useElementWidth } from '../../hooks/useElementWidth';
import { Glyph, TYPE_GLYPH, TYPE_LABEL, SIGNAL_GLYPH, SIGNAL_LABEL } from './icons';
import { summarizeScope } from './scope';
import { STATE_LABEL, replicationLabel } from './state';
import { formatClock, progressOf } from './time';

/**
 * BLOCO DE INTERATIVIDADE — as 5 regiões do contrato (§1).
 * ============================================================================
 *  1. Âncora    — ícone (tipo) + título          .tlb__ancora
 *  2. Extensão  — É A LARGURA. Não tem markup    (style.width, vindo da trilha)
 *  3. Escopo    — praças × plataformas           .tlb__escopo
 *  4. Adornos   — trilho de plugins              .tlb__adornos
 *  5. Ação      — UMA primária + overflow        .tlb__acao
 *
 *  Camada 0 — estado — é o container: `data-state` no elemento raiz.
 *
 * O que aparece em cada largura NÃO é decidido aqui: vem de `resolveSlots`
 * (§3). Este componente só pergunta "esse slot cabe?" e obedece.
 */

export interface BlockGeometry {
  /** % da largura da trilha. */
  left: number;
  width: number;
  /** Estouro: o bloco foi clipado pela borda da janela visível. */
  clipStart: boolean;
  clipEnd: boolean;
}

interface InteractivityBlockProps {
  item: Interactivity;
  geometry: BlockGeometry;
  now: number;
  focused: boolean;
  open: boolean;
  pinned: boolean;
  /** Irmã da replicada aberta agora — o "link visual entre instâncias" (§2). */
  linked: boolean;
  onHoverOpen: (id: string, el: HTMLElement) => void;
  onFocusOpen: (id: string, el: HTMLElement) => void;
  onPin: (id: string, el: HTMLElement) => void;
  onRequestClose: () => void;
  onCancelClose: () => void;
  onFocusBlock: (id: string) => void;
  onKeyNav: (event: KeyboardEvent<HTMLDivElement>, id: string) => void;
  onAction: (item: Interactivity, actionId: string) => void;
}

export function InteractivityBlock({
  item,
  geometry,
  now,
  focused,
  open,
  pinned,
  linked,
  onHoverOpen,
  onFocusOpen,
  onPin,
  onRequestClose,
  onCancelClose,
  onFocusBlock,
  onKeyNav,
  onAction,
}: InteractivityBlockProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const width = useElementWidth(ref);
  const lastPointerType = useRef<string>('mouse');

  const tier = densityTier(width);
  const slot = resolveSlots(width);

  const scope = summarizeScope(item.scope);
  const progress = progressOf(item.window, now);
  const primaryAction = item.actions.find((action) => action.primary);
  const adorno = item.signals[0];

  /**
   * §3, degrau <44px: "só cor e posição; identidade vai pro tooltip".
   * Para leitor de tela a identidade nunca some — está no aria-label, sempre.
   */
  const identity = `${TYPE_LABEL[item.type]}: ${item.title}`;
  const ariaLabel = [
    identity,
    STATE_LABEL[item.state],
    `${formatClock(item.window.startsAt)} às ${formatClock(item.window.endsAt)}`,
    replicationLabel(item),
    scope.error > 0 ? `${scope.error} praças com erro` : null,
  ]
    .filter((part): part is string => part !== null)
    .join('. ');

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerType.current = event.pointerType;
    // Touch não tem hover: no toque o `pointerenter` chega junto do tap e
    // abriria duas vezes. Quem trata toque é o `pointerdown`.
    if (event.pointerType === 'touch') return;
    if (ref.current) onHoverOpen(item.id, ref.current);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    onRequestClose();
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    lastPointerType.current = event.pointerType;
    // §5, Touch: "Tap abre já fixado". O guard de mesmo-gesto que impede o
    // abre-e-fecha clássico está no controller (SAME_GESTURE_MS).
    if (event.pointerType === 'touch' && ref.current) {
      onPin(item.id, ref.current);
    }
  };

  const handleClick = () => {
    // O tap já foi resolvido no pointerdown; o click sintetizado que vem
    // depois no touch não pode re-disparar o toggle.
    if (lastPointerType.current === 'touch') return;
    if (ref.current) onPin(item.id, ref.current);
  };

  const handleFocus = () => {
    onFocusBlock(item.id);
    // §5: "foco por teclado → abre instantâneo". Foco por mouse não abre nada
    // (o hover já cuida disso), daí o :focus-visible.
    if (ref.current?.matches(':focus-visible')) onFocusOpen(item.id, ref.current);
  };

  const style: CSSProperties = {
    left: `${geometry.left}%`,
    width: `${geometry.width}%`,
  };

  return (
    <div
      ref={ref}
      className="tlb"
      style={style}
      role="gridcell"
      data-block-id={item.id}
      tabIndex={focused ? 0 : -1}
      aria-label={ariaLabel}
      aria-expanded={open}
      aria-haspopup="dialog"
      data-state={item.state}
      data-tier={tier}
      data-open={open || undefined}
      data-pinned={pinned || undefined}
      data-replicada={item.replication.kind === 'replicada' || undefined}
      data-linked={linked || undefined}
      data-clip-start={geometry.clipStart || undefined}
      data-clip-end={geometry.clipEnd || undefined}
      title={tier === 'bar' ? identity : undefined}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      onFocus={handleFocus}
      // Sair do bloco pelo teclado fecha o preview. Se estiver fixado,
      // `requestClose` ignora — fixado só sai por Esc, `×` ou clique fora.
      onBlur={onRequestClose}
      onKeyDown={(event) => onKeyNav(event, item.id)}
      onMouseEnter={onCancelClose}
    >
      {/* ---- Região 1 — Âncora: identidade. Nunca colapsa abaixo do ícone. ---- */}
      <span className="tlb__ancora">
        {slot('estado.dot') ? <span className="tlb__dot" data-state={item.state} /> : null}
        {slot('ancora.icone') ? (
          <span className="tlb__tipo">
            <Glyph name={TYPE_GLYPH[item.type]} size={14} />
          </span>
        ) : null}
        {slot('ancora.titulo') ? <span className="tlb__titulo">{item.title}</span> : null}
        {slot('ancora.badge-replica') && item.replication.kind === 'replicada' ? (
          <span className="tlb__replica" aria-hidden="true">
            ×{item.replication.count}
          </span>
        ) : null}
      </span>

      {/* ---- Região 2 — Extensão ----
          Sem markup por definição: a janela temporal É a largura deste bloco
          (§1). O texto de horário abaixo é um resumo opcional dela, não a
          representação. Por isso some primeiro que o título. */}
      {slot('extensao.inicio') ? (
        <span className="tlb__janela">
          {formatClock(item.window.startsAt)}
          {slot('extensao.fim') ? `–${formatClock(item.window.endsAt)}` : null}
        </span>
      ) : null}

      {/* ---- Região 3 — Escopo: contável, colapsa em contador ---- */}
      {slot('escopo.chip') ? (
        <span className="tlb__escopo" aria-hidden="true">
          {scope.pracas} praças · {scope.active}/{scope.total}
        </span>
      ) : null}
      {slot('escopo.contador') ? (
        <span className="tlb__escopo tlb__escopo--contador" aria-hidden="true">
          {scope.active}
        </span>
      ) : null}

      {/* ---- Região 4 — Adornos: trilho de plugins, colapsa em contador ---- */}
      {slot('adornos.trilho') && adorno ? (
        <span className="tlb__adornos" aria-hidden="true">
          <span className="tlb__adorno" data-kind={adorno.kind} title={SIGNAL_LABEL[adorno.kind]}>
            <Glyph name={SIGNAL_GLYPH[adorno.kind]} size={13} />
          </span>
          {item.signals.length > 1 ? (
            <span className="tlb__adorno-contador">+{item.signals.length - 1}</span>
          ) : null}
        </span>
      ) : null}

      {/* ---- Região 5 — Ação: UMA primária, resto no menu ----
          tabIndex -1 de propósito: a trilha usa roving tabindex (§5) e 40
          blocos não podem virar 120 paradas de Tab. O caminho de teclado para
          as ações é o rodapé do popover. */}
      <span className="tlb__acao">
        {slot('acao.primaria') && primaryAction ? (
          <button
            type="button"
            className="tlb__btn"
            tabIndex={-1}
            disabled={primaryAction.enabled === false}
            onClick={(event) => {
              event.stopPropagation();
              onAction(item, primaryAction.id);
            }}
          >
            {primaryAction.label}
            {primaryAction.behavior === 'navigate' ? (
              <Glyph name="ti-arrow-up-right" size={12} />
            ) : null}
          </button>
        ) : null}
        {slot('acao.overflow') ? (
          <button
            type="button"
            className="tlb__btn tlb__btn--icon"
            tabIndex={-1}
            aria-label={`Mais ações de ${item.title}`}
            onClick={(event) => {
              event.stopPropagation();
              if (ref.current) onPin(item.id, ref.current);
            }}
          >
            <Glyph name="ti-dots" size={16} />
          </button>
        ) : null}
      </span>

      {/* ---- Camada 0, canal PROGRESSO (§2) ----
          Barra dedicada, tonalidade própria. Nunca reusa a lima do estado. */}
      {slot('estado.progresso') && item.state === 'no-ar' ? (
        <span className="tlb__progresso" aria-hidden="true">
          <span className="tlb__progresso-fill" style={{ width: `${progress * 100}%` }} />
        </span>
      ) : null}
    </div>
  );
}
