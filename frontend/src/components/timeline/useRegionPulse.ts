import { useEffect, useRef, useState } from 'react';
import type { Region } from './contract';

/**
 * §5, "Dado ao vivo":
 *   "Se o popover está aberto e o dado atualiza: só a região que mudou anima,
 *    com pulso de 300ms na borda dela. Nunca re-entrada do painel inteiro
 *    durante leitura."
 *
 * O hook recebe uma assinatura por região e devolve quais mudaram agora. Quem
 * decide o que conta como mudança é o dono do payload — o pulso é só a
 * consequência visual.
 */
export function useRegionPulse(
  signatures: Partial<Record<Region, string>>,
  durationMs = 300,
): ReadonlySet<Region> {
  const previous = useRef<Partial<Record<Region, string>> | null>(null);
  const [pulsing, setPulsing] = useState<ReadonlySet<Region>>(() => new Set<Region>());
  const timers = useRef<Map<Region, number>>(new Map());

  useEffect(() => {
    const prev = previous.current;
    previous.current = signatures;

    // Primeira passagem não pulsa: abrir o popover não é "dado que mudou".
    if (prev === null) return;

    const changed: Region[] = [];
    for (const key of Object.keys(signatures) as Region[]) {
      if (prev[key] !== undefined && prev[key] !== signatures[key]) changed.push(key);
    }
    if (changed.length === 0) return;

    setPulsing((current) => {
      const next = new Set(current);
      for (const region of changed) next.add(region);
      return next;
    });

    const activeTimers = timers.current;
    for (const region of changed) {
      const existing = activeTimers.get(region);
      if (existing !== undefined) window.clearTimeout(existing);
      const id = window.setTimeout(() => {
        activeTimers.delete(region);
        setPulsing((current) => {
          if (!current.has(region)) return current;
          const next = new Set(current);
          next.delete(region);
          return next;
        });
      }, durationMs);
      activeTimers.set(region, id);
    }
  }, [durationMs, signatures]);

  useEffect(() => {
    const activeTimers = timers.current;
    return () => {
      for (const id of activeTimers.values()) window.clearTimeout(id);
      activeTimers.clear();
    };
  }, []);

  return pulsing;
}
