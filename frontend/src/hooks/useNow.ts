import { useEffect, useState } from 'react';

/**
 * Relógio da agulha. Existe para o bloco "no ar" mudar sozinho (§5, "dado ao
 * vivo") sem que ninguém precise re-renderizar a trilha inteira na mão.
 */
export function useNow(intervalMs = 1000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return now;
}
