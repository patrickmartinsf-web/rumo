import { useEffect, useId, useRef, useState } from 'react';
import type { BlockAction } from './contract';
import { Glyph } from './icons';

/**
 * O `...` do rodapé do popover (§4, item 5).
 *
 * Camada de Esc própria: `data-esc-layer="open"` faz o controller do popover
 * ceder o Escape para cá enquanto o menu está aberto, para Esc fechar de
 * dentro pra fora em vez de derrubar o popover inteiro de uma vez.
 */

interface ActionMenuProps {
  actions: BlockAction[];
  onSelect: (actionId: string) => void;
}

export function ActionMenu({ actions, onSelect }: ActionMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target !== null && rootRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  if (actions.length === 0) return null;

  return (
    <div className="menu" ref={rootRef} data-esc-layer={open ? 'open' : 'closed'}>
      <button
        ref={triggerRef}
        type="button"
        className="pop__btn pop__btn--icon"
        aria-label="Mais ações"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <Glyph name="ti-dots" size={18} />
      </button>

      {open ? (
        <div className="menu__list" id={menuId} role="menu">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              role="menuitem"
              className="menu__item"
              disabled={action.enabled === false}
              onClick={() => {
                setOpen(false);
                onSelect(action.id);
              }}
            >
              {action.label}
              {action.behavior === 'navigate' ? <Glyph name="ti-arrow-up-right" size={14} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
