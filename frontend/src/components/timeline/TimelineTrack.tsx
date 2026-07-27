import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import type { Interactivity, TimeWindow } from './contract';
import { InteractivityBlock } from './InteractivityBlock';
import { InteractivityPopover } from './InteractivityPopover';
import { geometryOf, laneCount, packLanes, type LaneItem } from './lanes';
import { formatClock, fractionIn } from './time';
import { usePopoverController } from './usePopoverController';

/**
 * A TRILHA.
 * ============================================================================
 * §7 lembra que "a unidade real de escala é bloco + trilha, não o bloco
 * sozinho". A trilha é dona de três coisas que o bloco não pode resolver
 * sozinho:
 *
 *  1. Geometria — converte janela temporal em px (região 2 do contrato).
 *  2. Foco — roving tabindex. §5: "Tab entra na trilha, setas navegam entre
 *     blocos. Não deixar cada bloco focável individualmente (40 blocos = 40
 *     paradas de Tab)."
 *  3. O popover — um por trilha, não um por bloco. É o que permite "move pra
 *     outro bloco → reposiciona sem fechar".
 */

interface TimelineTrackProps {
  items: Interactivity[];
  /** Janela visível da timeline. */
  view: TimeWindow;
  /** Janela do programa — base de encaixe/estouro. */
  container: TimeWindow;
  now: number;
  onAction: (item: Interactivity, actionId: string) => void;
  label?: string;
}

const TICK_STEP_MS = 15 * 60_000;

export function TimelineTrack({
  items,
  view,
  container,
  now,
  onAction,
  label = 'Timeline de interatividades',
}: TimelineTrackProps) {
  const controller = usePopoverController();
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const packed = useMemo(() => packLanes(items), [items]);
  const lanes = laneCount(packed);

  /** Só o que aparece na vista participa da navegação por teclado. */
  const visible = useMemo(
    () =>
      packed
        .map((entry) => ({ entry, geometry: geometryOf(entry.item.window, view) }))
        .filter(
          (row): row is { entry: LaneItem; geometry: NonNullable<ReturnType<typeof geometryOf>> } =>
            row.geometry !== null,
        ),
    [packed, view],
  );

  const ticks = useMemo(() => {
    const result: number[] = [];
    const first = Math.ceil(view.startsAt / TICK_STEP_MS) * TICK_STEP_MS;
    for (let ts = first; ts <= view.endsAt; ts += TICK_STEP_MS) result.push(ts);
    return result;
  }, [view.endsAt, view.startsAt]);

  const rovingId = focusedId ?? visible[0]?.entry.item.id ?? null;

  const focusBlock = useCallback((id: string) => {
    setFocusedId(id);
    gridRef.current?.querySelector<HTMLElement>(`[data-block-id="${CSS.escape(id)}"]`)?.focus();
  }, []);

  /**
   * Navegação: setas horizontais andam no tempo dentro da mesma lane; setas
   * verticais trocam de lane pegando o bloco temporalmente mais próximo.
   */
  const handleKeyNav = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, id: string) => {
      const current = visible.find((row) => row.entry.item.id === id);
      if (!current) return;

      const sameLane = visible
        .filter((row) => row.entry.lane === current.entry.lane)
        .sort((a, b) => a.entry.item.window.startsAt - b.entry.item.window.startsAt);
      const index = sameLane.findIndex((row) => row.entry.item.id === id);

      const goToLane = (delta: number) => {
        const targetLane = current.entry.lane + delta;
        const candidates = visible.filter((row) => row.entry.lane === targetLane);
        if (candidates.length === 0) return;
        const anchor = current.entry.item.window.startsAt;
        const nearest = candidates.reduce((best, row) =>
          Math.abs(row.entry.item.window.startsAt - anchor) <
          Math.abs(best.entry.item.window.startsAt - anchor)
            ? row
            : best,
        );
        focusBlock(nearest.entry.item.id);
      };

      switch (event.key) {
        case 'ArrowRight': {
          event.preventDefault();
          const next = sameLane[index + 1];
          if (next) focusBlock(next.entry.item.id);
          break;
        }
        case 'ArrowLeft': {
          event.preventDefault();
          const prev = sameLane[index - 1];
          if (prev) focusBlock(prev.entry.item.id);
          break;
        }
        case 'ArrowDown':
          event.preventDefault();
          goToLane(1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          goToLane(-1);
          break;
        case 'Home': {
          event.preventDefault();
          const first = sameLane[0];
          if (first) focusBlock(first.entry.item.id);
          break;
        }
        case 'End': {
          event.preventDefault();
          const last = sameLane[sameLane.length - 1];
          if (last) focusBlock(last.entry.item.id);
          break;
        }
        case 'Enter':
        case ' ': {
          event.preventDefault();
          if (event.currentTarget instanceof HTMLElement) {
            // `true`: pin por teclado leva o foco pro painel, para o Tab
            // seguinte alcançar o rodapé de ação.
            controller.pinTo(id, event.currentTarget, true);
          }
          break;
        }
        default:
          break;
      }
    },
    [controller, focusBlock, visible],
  );

  const openItem = items.find((item) => item.id === controller.openId) ?? null;
  /** Replicada aberta acende as irmãs — o "link visual entre instâncias" (§2). */
  const linkedGroupId =
    openItem?.replication.kind === 'replicada' ? openItem.replication.groupId : null;
  const needleLeft = Math.min(Math.max(fractionIn(view, now), 0), 1) * 100;
  const needleVisible = now >= view.startsAt && now <= view.endsAt;

  return (
    <div className="track">
      <div className="track__ruler" aria-hidden="true">
        {ticks.map((ts) => (
          <span
            key={ts}
            className="track__tick"
            data-hour={ts % 3_600_000 === 0 || undefined}
            style={{ left: `${fractionIn(view, ts) * 100}%` }}
          >
            {formatClock(ts)}
          </span>
        ))}
      </div>

      <div
        ref={gridRef}
        className="track__grid"
        role="grid"
        aria-label={label}
        aria-rowcount={lanes}
        style={{ ['--lanes' as string]: lanes }}
      >
        {ticks.map((ts) => (
          <span
            key={ts}
            className="track__gridline"
            aria-hidden="true"
            style={{ left: `${fractionIn(view, ts) * 100}%` }}
          />
        ))}

        {/* A agulha. Fica acima das gridlines e abaixo dos blocos. */}
        {needleVisible ? (
          <span
            className="track__agulha"
            style={{ left: `${needleLeft}%` }}
            role="img"
            aria-label={`Agulha em ${formatClock(now)}`}
          />
        ) : null}

        {Array.from({ length: lanes }, (_, lane) => (
          <div className="track__lane" role="row" key={lane}>
            {visible
              .filter((row) => row.entry.lane === lane)
              .map(({ entry, geometry }) => (
                <InteractivityBlock
                  key={entry.item.id}
                  item={entry.item}
                  geometry={geometry}
                  now={now}
                  focused={rovingId === entry.item.id}
                  open={controller.openId === entry.item.id}
                  pinned={controller.pinned && controller.openId === entry.item.id}
                  linked={
                    linkedGroupId !== null &&
                    entry.item.replication.kind === 'replicada' &&
                    entry.item.replication.groupId === linkedGroupId &&
                    entry.item.id !== controller.openId
                  }
                  onHoverOpen={controller.hoverOpen}
                  onFocusOpen={controller.focusOpen}
                  onPin={controller.pinTo}
                  onRequestClose={controller.requestClose}
                  onCancelClose={controller.cancelClose}
                  onFocusBlock={setFocusedId}
                  onKeyNav={handleKeyNav}
                  onAction={onAction}
                />
              ))}
          </div>
        ))}
      </div>

      {openItem ? (
        <InteractivityPopover
          item={openItem}
          controller={controller}
          now={now}
          container={container}
          onAction={onAction}
        />
      ) : null}
    </div>
  );
}
