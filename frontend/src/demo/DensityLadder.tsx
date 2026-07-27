import { useMemo } from 'react';
import type { Interactivity, TimeWindow } from '../components/timeline/contract';
import { densityTier } from '../components/timeline/contract';
import { InteractivityBlock } from '../components/timeline/InteractivityBlock';
import { InteractivityPopover } from '../components/timeline/InteractivityPopover';
import { usePopoverController } from '../components/timeline/usePopoverController';

/**
 * Demonstração do §3 — a mesma interatividade, oito larguras.
 * ============================================================================
 * O ponto da seção é que o colapso é AUTOMÁTICO e vem de px RENDERIZADOS, não
 * de zoom level nem de decisão manual. Aqui só a largura da caixa muda; o
 * componente é o mesmo e o payload é o mesmo.
 *
 * As larguras são escolhidas em pares em volta de cada degrau (420/240/120/44)
 * para dar pra ver o slot sumindo de um passo pro outro.
 */

const WIDTHS = [520, 420, 300, 240, 160, 120, 60, 40];

interface DensityLadderProps {
  item: Interactivity;
  now: number;
  container: TimeWindow;
  onAction: (item: Interactivity, actionId: string) => void;
}

export function DensityLadder({ item, now, container, onAction }: DensityLadderProps) {
  const controller = usePopoverController();

  /** Um id por largura: senão o popover abriria "em todos" ao mesmo tempo. */
  const variants = useMemo(
    () => WIDTHS.map((width) => ({ width, item: { ...item, id: `${item.id}@${width}` } })),
    [item],
  );

  const openItem = variants.find((variant) => variant.item.id === controller.openId)?.item ?? null;

  return (
    <div className="ladder">
      {variants.map(({ width, item: variant }) => (
        <div className="ladder__row" key={width}>
          <span className="ladder__label">
            {width}px<span className="ladder__tier">{densityTier(width)}</span>
          </span>
          <div
            className="ladder__box"
            style={{ width }}
            role="grid"
            aria-label={`Bloco renderizado a ${width} pixels`}
          >
            <div className="ladder__lane" role="row">
              <InteractivityBlock
                item={variant}
                geometry={{ left: 0, width: 100, clipStart: false, clipEnd: false }}
                now={now}
                focused
                open={controller.openId === variant.id}
                pinned={controller.pinned && controller.openId === variant.id}
                linked={false}
                onHoverOpen={controller.hoverOpen}
                onFocusOpen={controller.focusOpen}
                onPin={controller.pinTo}
                onRequestClose={controller.requestClose}
                onCancelClose={controller.cancelClose}
                onFocusBlock={() => undefined}
                onKeyNav={(event, id) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    if (event.currentTarget instanceof HTMLElement) {
                      controller.pinTo(id, event.currentTarget, true);
                    }
                  }
                }}
                onAction={onAction}
              />
            </div>
          </div>
        </div>
      ))}

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
