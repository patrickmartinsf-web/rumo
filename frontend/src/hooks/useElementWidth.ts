import { useEffect, useState, type RefObject } from 'react';

/**
 * Largura RENDERIZADA do elemento, em px.
 *
 * §3 é explícito: a escada de densidade "não é decisão por zoom level — é regra
 * em px de largura renderizada, automática". Então tem que ser medida, não
 * derivada da duração nem do nível de zoom da timeline. ResizeObserver é o
 * único jeito de isso continuar certo quando a trilha muda de escala, a janela
 * redimensiona ou o container ganha um scrollbar.
 */
export function useElementWidth(ref: RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Medida síncrona inicial: evita um frame renderizando no degrau errado.
    setWidth(el.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const box = entry.borderBoxSize?.[0];
      setWidth(box ? box.inlineSize : entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}
