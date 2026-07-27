import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './demo/App';

import './styles/tokens.css';
import './styles/global.css';
import './components/timeline/timeline.css';
import './components/timeline/popover.css';
import './demo/demo.css';

const container = document.getElementById('root');
if (container === null) throw new Error('#root não encontrado');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
