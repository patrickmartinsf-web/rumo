import { useLayoutEffect, useState, type RefObject } from 'react';

/**
 * Ancoragem do popover. Fixed + flip vertical + clamp horizontal.
 *
 * Nada de "safe triangle" geométrico aqui: §5 resolve isso com `pointerenter`
 * no próprio popover (o popover cancela o grace period), então o cálculo de
 * posição pode ficar burro e previsível.
 */

export type Placement = 'top' | 'bottom';

export interface PopoverPosition {
  left: number;
  top: number;
  placement: Placement;
  /** Deslocamento da setinha em relação à borda esquerda do popover, em px. */
  arrowOffset: number;
}

const VIEWPORT_MARGIN = 12;
const ANCHOR_GAP = 10;

export function usePopoverPosition(
  anchorEl: HTMLElement | null,
  popoverRef: RefObject<HTMLElement | null>,
  /** Muda quando o conteúdo muda de tamanho — força recálculo. */
  contentKey: string | null,
): PopoverPosition | null {
  const [position, setPosition] = useState<PopoverPosition | null>(null);

  useLayoutEffect(() => {
    const popover = popoverRef.current;
    if (anchorEl === null || popover === null) {
      setPosition(null);
      return;
    }

    const compute = () => {
      const anchor = anchorEl.getBoundingClientRect();
      const box = popover.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Preferência: abaixo. Vira pra cima quando não cabe — e só quando cabe
      // melhor em cima, senão manteria a preferência.
      const spaceBelow = vh - anchor.bottom - ANCHOR_GAP - VIEWPORT_MARGIN;
      const spaceAbove = anchor.top - ANCHOR_GAP - VIEWPORT_MARGIN;
      const placement: Placement =
        spaceBelow >= box.height || spaceBelow >= spaceAbove ? 'bottom' : 'top';

      const preferredTop =
        placement === 'bottom' ? anchor.bottom + ANCHOR_GAP : anchor.top - box.height - ANCHOR_GAP;

      // Nenhum dos dois lados cabe (popover alto, bloco no meio da tela):
      // gruda no topo e deixa o `max-height` do CSS dar scroll interno. Sem
      // isso o rodapé de ação some pra fora da viewport — e ele é o item 5 do
      // conteúdo, não um detalhe.
      const maxTop = vh - box.height - VIEWPORT_MARGIN;
      const top =
        maxTop < VIEWPORT_MARGIN
          ? VIEWPORT_MARGIN
          : Math.min(Math.max(preferredTop, VIEWPORT_MARGIN), maxTop);

      // Centraliza no bloco, mas o bloco pode ser larguíssimo (interatividade
      // longa) ou estreitíssimo: ancorar no centro do TRECHO VISÍVEL do bloco
      // mantém o popover perto do que o olho está olhando.
      const visibleLeft = Math.max(anchor.left, 0);
      const visibleRight = Math.min(anchor.right, vw);
      const anchorCenter = (visibleLeft + visibleRight) / 2;

      const rawLeft = anchorCenter - box.width / 2;
      const left = Math.min(Math.max(rawLeft, VIEWPORT_MARGIN), vw - box.width - VIEWPORT_MARGIN);

      const arrowOffset = Math.min(Math.max(anchorCenter - left, 16), box.width - 16);

      setPosition({ left, top, placement, arrowOffset });
    };

    compute();

    // `true` na captura pega scroll de qualquer ancestral da trilha.
    window.addEventListener('scroll', compute, true);
    window.addEventListener('resize', compute);
    const observer = new ResizeObserver(compute);
    observer.observe(popover);

    return () => {
      window.removeEventListener('scroll', compute, true);
      window.removeEventListener('resize', compute);
      observer.disconnect();
    };
  }, [anchorEl, popoverRef, contentKey]);

  return position;
}
