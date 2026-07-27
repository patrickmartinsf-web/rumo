import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CellState, Interactivity } from '../components/timeline/contract';
import { SLOT_BUDGET } from '../components/timeline/contract';
import { TimelineTrack } from '../components/timeline/TimelineTrack';
import { cellKey } from '../components/timeline/scope';
import { formatClock } from '../components/timeline/time';
import { useNow } from '../hooks/useNow';
import { DensityLadder } from './DensityLadder';
import { buildDemo } from './demoData';

/** Praça que "cai" e volta na simulação de dado ao vivo (§5). */
const FLAPPING_CELL = cellKey('pe', 'tvplus');
const FLAPPING_ITEM = 'itr-4821';

interface LogEntry {
  id: number;
  text: string;
}

export function App() {
  const now = useNow(1000);
  const [base] = useState(() => Date.now());
  const demo = useMemo(() => buildDemo(base), [base]);

  const [items, setItems] = useState<Interactivity[]>(demo.items);
  const [live, setLive] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [log, setLog] = useState<LogEntry[]>([]);

  useEffect(() => {
    document.documentElement.dataset['theme'] = theme;
  }, [theme]);

  /**
   * §5, "Dado ao vivo": o bloco no ar muda sozinho. Aqui uma praça cai e volta
   * a cada 6s. Com o popover aberto, só a seção Escopo pulsa — o resto do
   * painel fica parado, que é exatamente a regra ("nunca re-entrada do painel
   * inteiro durante leitura").
   */
  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      setItems((previous) =>
        previous.map((item) => {
          if (item.id !== FLAPPING_ITEM) return item;
          const current = item.scope.cells[FLAPPING_CELL];
          const next: CellState = current === 'erro' ? 'no-ar' : 'erro';
          return {
            ...item,
            scope: { ...item.scope, cells: { ...item.scope.cells, [FLAPPING_CELL]: next } },
          };
        }),
      );
    }, 6000);
    return () => window.clearInterval(id);
  }, [live]);

  const handleAction = useCallback((item: Interactivity, actionId: string) => {
    setLog((previous) =>
      [
        { id: Date.now(), text: `${formatClock(Date.now())} · ${actionId} → ${item.title}` },
        ...previous,
      ].slice(0, 5),
    );
  }, []);

  const ladderItem = items.find((item) => item.id === FLAPPING_ITEM) ?? items[0];

  return (
    <div className="page">
      <header className="page__head">
        <div>
          <p className="page__eyebrow">Timeline Orchestra</p>
          <h1 className="page__title">Bloco de interatividade + popover ancorado</h1>
          <p className="page__lede">
            Um contrato de 5 regiões fixas. Seis tipos de interatividade, cinco estados, um
            componente só — o que muda entre eles é o payload, nunca o layout.
          </p>
        </div>
        <div className="page__controls">
          <button
            type="button"
            className="ctl"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? 'Dark mode' : 'Light mode'}
          </button>
          <button type="button" className="ctl" aria-pressed={live} onClick={() => setLive(!live)}>
            {live ? 'Pausar dado ao vivo' : 'Retomar dado ao vivo'}
          </button>
        </div>
      </header>

      <section className="panel">
        <div className="panel__head">
          <h2 className="panel__title">Trilha</h2>
          <p className="panel__hint">
            Hover abre em 350 ms · clique fixa · setas navegam entre blocos · Esc fecha
          </p>
        </div>
        <TimelineTrack
          items={items}
          view={demo.windows.view}
          container={demo.windows.container}
          now={now}
          onAction={handleAction}
        />
        <p className="panel__note">
          A largura de cada bloco <strong>é</strong> a janela temporal (região 2). A agulha marca{' '}
          {formatClock(now)}. O bloco de 2 min lá no fim da trilha é o degrau &lt; 44 px: só cor e
          posição.
        </p>
      </section>

      <section className="panel">
        <div className="panel__head">
          <h2 className="panel__title">Escada de densidade</h2>
          <p className="panel__hint">§3 — orçamento de slots por px renderizado</p>
        </div>
        {ladderItem ? (
          <DensityLadder
            item={ladderItem}
            now={now}
            container={demo.windows.container}
            onAction={handleAction}
          />
        ) : null}

        <table className="budget">
          <caption>Orçamento declarado — a tabela do §3 como dado, não como CSS</caption>
          <thead>
            <tr>
              <th scope="col">Slot</th>
              <th scope="col">Região</th>
              <th scope="col">Prioridade</th>
              <th scope="col">Largura mín.</th>
            </tr>
          </thead>
          <tbody>
            {SLOT_BUDGET.map((slot) => (
              <tr key={slot.id}>
                <td>
                  <code>{slot.id}</code>
                </td>
                <td>{slot.region}</td>
                <td>{slot.priority}</td>
                <td>{slot.minWidth}px</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel" aria-live="polite">
        <div className="panel__head">
          <h2 className="panel__title">Ações disparadas</h2>
          <p className="panel__hint">Ações são de decisão; “Editar” navegaria pro drawer</p>
        </div>
        {log.length === 0 ? (
          <p className="panel__note">Nenhuma ainda. Abra um popover e use o rodapé.</p>
        ) : (
          <ul className="logs">
            {log.map((entry) => (
              <li key={entry.id}>{entry.text}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
