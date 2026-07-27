import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Máquina de estados do popover — §5 "Estados de interação".
 * ============================================================================
 * Está isolada num hook de propósito: a spec descreve um comportamento com
 * quatro temporizações concorrentes (intenção, grace, pin, gesto de toque) e
 * espalhar isso em `onMouseEnter` de componente é exatamente como esse padrão
 * quebra em produção.
 *
 * Transições implementadas, uma a uma:
 *   fechado      --hover na âncora--> (350ms) --> aberto não-fixado
 *   não-fixado   --sai do bloco E do popover--> (180ms) --> fechado
 *   não-fixado   --clique em qualquer bloco--> fixado
 *   fixado       --Esc | × | clique fora--> fechado
 *   já aberto    --move pra outro bloco--> reposiciona SEM fechar
 *   foco teclado --> abre instantâneo, sem animação de posição
 */

/** §5, tabela de timings. */
export const INTENT_DELAY_MS = 350;
export const GRACE_PERIOD_MS = 180;

/**
 * Janela em que um clique/tap é considerado "o mesmo gesto" que abriu o
 * popover. §5, Touch: "o handler de 'clique fora' precisa ignorar o mesmo
 * gesto (bug clássico abre-e-fecha)". No touch o `click` sintetizado chega
 * bem depois do `pointerdown`, por isso a folga é generosa.
 */
const SAME_GESTURE_MS = 400;

export interface PopoverState {
  /** id da interatividade ancorada, ou null se fechado. */
  openId: string | null;
  pinned: boolean;
  /** Aberto por teclado: entra sem animação de posição (§5). */
  instant: boolean;
  /**
   * O painel deve receber o foco agora.
   *
   * Separado de `instant` porque as duas coisas parecem a mesma e não são:
   * navegar de bloco em bloco com as setas ABRE o painel (preview) mas o foco
   * tem que ficar no bloco, senão a próxima seta não navega mais nada — o
   * roving tabindex morre na primeira tecla. O foco só entra no painel quando
   * o usuário pede (Enter/Espaço), e volta pra âncora no Esc.
   */
  focusPanel: boolean;
}

export interface PopoverController extends PopoverState {
  anchorEl: HTMLElement | null;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  /** Hover com delay de intenção. Se já houver popover aberto, reposiciona na hora. */
  hoverOpen: (id: string, el: HTMLElement) => void;
  /** Foco por teclado: abre imediatamente. */
  focusOpen: (id: string, el: HTMLElement) => void;
  /**
   * Clique/tap: fixa (ou re-fixa em outro bloco).
   * `focusPanel` só quando o pin veio do teclado — aí o Tab precisa cair
   * dentro do painel para alcançar o rodapé de ação.
   */
  pinTo: (id: string, el: HTMLElement, focusPanel?: boolean) => void;
  /** Saiu do bloco ou do popover: agenda fechamento com grace period. */
  requestClose: () => void;
  /** Voltou pro bloco ou entrou no popover: cancela o fechamento pendente. */
  cancelClose: () => void;
  closeNow: (options?: { restoreFocus?: boolean }) => void;
  isOpen: (id: string) => boolean;
}

export function usePopoverController(): PopoverController {
  const [state, setState] = useState<PopoverState>({
    openId: null,
    pinned: false,
    instant: false,
    focusPanel: false,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const popoverRef = useRef<HTMLDivElement | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const lastGestureAt = useRef(0);
  /** Âncora que tinha o foco quando abrimos — para devolver o foco no Esc (§6). */
  const focusOrigin = useRef<HTMLElement | null>(null);

  const clearOpenTimer = useCallback(() => {
    if (openTimer.current !== null) {
      window.clearTimeout(openTimer.current);
      openTimer.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearOpenTimer();
      clearCloseTimer();
    };
  }, [clearOpenTimer, clearCloseTimer]);

  const closeNow = useCallback(
    (options?: { restoreFocus?: boolean }) => {
      clearOpenTimer();
      clearCloseTimer();

      // Só devolve o foco se ele estiver dentro do popover; senão a gente
      // roubaria o foco de onde o usuário já estava.
      const popover = popoverRef.current;
      const focusInside =
        popover !== null &&
        document.activeElement !== null &&
        popover.contains(document.activeElement);
      if (options?.restoreFocus !== false && focusInside) {
        focusOrigin.current?.focus();
      }
      focusOrigin.current = null;

      setState({ openId: null, pinned: false, instant: false, focusPanel: false });
      setAnchorEl(null);
    },
    [clearCloseTimer, clearOpenTimer],
  );

  const open = useCallback(
    (
      id: string,
      el: HTMLElement,
      opts: { pinned: boolean; instant: boolean; focusPanel?: boolean },
    ) => {
      clearOpenTimer();
      clearCloseTimer();
      focusOrigin.current = el;
      setAnchorEl(el);
      setState({
        openId: id,
        pinned: opts.pinned,
        instant: opts.instant,
        focusPanel: opts.focusPanel === true,
      });
    },
    [clearCloseTimer, clearOpenTimer],
  );

  const hoverOpen = useCallback(
    (id: string, el: HTMLElement) => {
      clearCloseTimer();

      // Fixado é decisão explícita do usuário: hover em outro bloco não rouba.
      // (Trocar de bloco fixado exige clique — ver `pinTo`.)
      if (state.pinned) return;
      if (state.openId === id) return;

      if (state.openId !== null) {
        // "já aberto → move pra outro bloco → reposiciona sem fechar".
        // Sem delay de intenção aqui: a intenção já foi demonstrada.
        clearOpenTimer();
        open(id, el, { pinned: false, instant: false });
        return;
      }

      clearOpenTimer();
      openTimer.current = window.setTimeout(() => {
        openTimer.current = null;
        open(id, el, { pinned: false, instant: false });
      }, INTENT_DELAY_MS);
    },
    [clearCloseTimer, clearOpenTimer, open, state.openId, state.pinned],
  );

  const focusOpen = useCallback(
    (id: string, el: HTMLElement) => {
      if (state.pinned && state.openId !== id) return;
      if (state.openId === id) return;
      open(id, el, { pinned: false, instant: true });
    },
    [open, state.openId, state.pinned],
  );

  const pinTo = useCallback(
    (id: string, el: HTMLElement, focusPanel = false) => {
      lastGestureAt.current = performance.now();
      if (state.openId === id && state.pinned) {
        closeNow();
        return;
      }
      open(id, el, { pinned: true, instant: false, focusPanel });
    },
    [closeNow, open, state.openId, state.pinned],
  );

  const requestClose = useCallback(() => {
    // Um pedido de fechar também cancela uma abertura ainda em espera: sair do
    // bloco antes dos 350ms não deve abrir nada.
    clearOpenTimer();
    if (state.pinned || state.openId === null) return;
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      closeNow();
    }, GRACE_PERIOD_MS);
  }, [clearCloseTimer, clearOpenTimer, closeNow, state.openId, state.pinned]);

  const cancelClose = useCallback(() => {
    clearCloseTimer();
  }, [clearCloseTimer]);

  /**
   * Esc fecha de qualquer lugar (§6). Capture porque o popover pode conter
   * controles que dão stopPropagation por conta própria.
   *
   * A exceção é a camada mais interna: se houver um menu aberto dentro do
   * popover, Esc pertence a ele primeiro. Como a captura no document roda
   * ANTES de qualquer handler do menu, quem cede é este handler — daí a
   * checagem por `[data-esc-layer="open"]` em vez de stopPropagation lá dentro.
   */
  useEffect(() => {
    if (state.openId === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (document.querySelector('[data-esc-layer="open"]') !== null) return;
        event.stopPropagation();
        closeNow();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [closeNow, state.openId]);

  /** Clique fora fecha o fixado — ignorando o gesto que acabou de abrir. */
  useEffect(() => {
    if (state.openId === null || !state.pinned) return;

    const onPointerDown = (event: PointerEvent) => {
      if (performance.now() - lastGestureAt.current < SAME_GESTURE_MS) return;
      const target = event.target as Node | null;
      if (target === null) return;
      if (popoverRef.current?.contains(target)) return;
      if (anchorEl?.contains(target)) return;
      closeNow();
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [anchorEl, closeNow, state.openId, state.pinned]);

  const isOpen = useCallback((id: string) => state.openId === id, [state.openId]);

  return useMemo(
    () => ({
      ...state,
      anchorEl,
      popoverRef,
      hoverOpen,
      focusOpen,
      pinTo,
      requestClose,
      cancelClose,
      closeNow,
      isOpen,
    }),
    [anchorEl, cancelClose, closeNow, focusOpen, hoverOpen, isOpen, pinTo, requestClose, state],
  );
}
