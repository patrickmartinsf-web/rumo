/* RUMO DS — Iconografia · Material Icons (Filled) */

const IconShowcase = ({ name, big = false }) => (
  <div style={{
    background: "var(--bg-surface)",
    padding: big ? "24px 16px 14px" : "20px 12px 12px",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
    minHeight: big ? 120 : 92,
  }}>
    <Icon name={name} size={big ? 40 : 28} color="var(--asfalto-950)" />
    <span className="mono" style={{ fontSize: 10, color: "var(--fg-tertiary)" }}>{name}</span>
  </div>
);

const SectionIcons = () => (
  <section className="section" id="sec-icons">
    <div className="section__head">
      <span className="section__num">05</span>
      <div>
        <div className="section__eyebrow">Fundamentos · Iconografia</div>
        <h2 className="section__title">Material Icons.<br/>Estilo Filled.</h2>
        <p className="section__lead">
          Set adotado da biblioteca <span className="mono" style={{ fontSize: "0.85em" }}>@mui/icons-material</span> ·
          variante <strong>Filled</strong>. Convenções Material Design 3: grid 24×24,
          peso sólido, cantos retos, geometria reduzida ao essencial. Todos os glifos
          do produto da Rumo são selecionados deste catálogo — sem desenhos próprios,
          sem mistura de estilos.
        </p>
      </div>
    </div>

    {/* Decisão + Diretrizes */}
    <div className="grid grid--2" style={{ marginBottom: 56 }}>
      <div className="card" style={{ background: "var(--asfalto-950)", color: "var(--concreto)", borderColor: "var(--asfalto-800)", padding: 28 }}>
        <div className="eyebrow" style={{ color: "var(--lima-400)" }}>Decisão</div>
        <h3 style={{ margin: "8px 0 12px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Material Icons, sem desvios.
        </h3>
        <p style={{ margin: 0, color: "var(--asfalto-300)", fontSize: 15, lineHeight: 1.6 }}>
          A Rumo usa a biblioteca oficial do Material UI como única fonte de ícones.
          Isso garante familiaridade imediata para o instrutor (mesmo vocabulário do
          Android), reduz custo de desenho e acelera implementação. A personalidade
          da marca vem da <strong style={{ color: "var(--concreto)" }}>tipografia</strong>,
          das <strong style={{ color: "var(--concreto)" }}>cores</strong> e do
          <strong style={{ color: "var(--concreto)" }}> layout</strong> — não dos ícones.
        </p>
      </div>

      <div className="card" style={{ background: "var(--lima-400)", color: "var(--asfalto-950)", borderColor: "var(--lima-500)", padding: 28 }}>
        <div className="eyebrow" style={{ color: "var(--asfalto-800)" }}>Diretrizes</div>
        <h3 style={{ margin: "8px 0 12px", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          Filled · 24px · 1 só estilo.
        </h3>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: 1.65, color: "var(--asfalto-900)" }}>
          <li>Variante <strong>Filled</strong> em todo o produto</li>
          <li>Tamanho base <strong>24px</strong> · escalas 16/20/32/48</li>
          <li>Nunca misturar com Outlined, Rounded, Sharp ou Two Tone</li>
          <li>Cor herdada do contexto · <span className="mono" style={{ fontSize: 11 }}>fill="currentColor"</span></li>
          <li>Não criar ícones próprios — buscar em <span className="mono" style={{ fontSize: 11 }}>mui.com/material-icons</span></li>
        </ul>
      </div>
    </div>

    {/* Origem · referência */}
    <div className="section__sub">
      <span className="section__sub-num">5.1</span>
      <h3 className="section__sub-title">Origem & importação</h3>
      <span className="section__sub-note">como consumir</span>
    </div>
    <div className="grid grid--2" style={{ marginBottom: 48 }}>
      <div className="card" style={{ padding: 24 }}>
        <div className="eyebrow">Catálogo</div>
        <p style={{ margin: "8px 0 12px", fontSize: 14, lineHeight: 1.6, color: "var(--fg-secondary)" }}>
          Todos os glifos vêm de <span className="mono" style={{ fontSize: 12 }}>mui.com/material-ui/material-icons</span>.
          Use a busca por nome em inglês (ex.: <em>schedule</em>, <em>directions_car</em>, <em>event</em>).
        </p>
        <pre style={{
          margin: 0, padding: 14, background: "var(--asfalto-950)", color: "var(--lima-400)",
          fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.55, borderRadius: 8, overflow: "auto",
        }}>{`npm install @mui/icons-material @mui/material

import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DirectionsCarIcon
  from '@mui/icons-material/DirectionsCar';

<HomeIcon />        // 24px, fontSize="medium"
<EventIcon fontSize="small" />   // 20px
<EventIcon fontSize="large" />   // 35px`}</pre>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div className="eyebrow">Mapa Rumo → Material</div>
        <p style={{ margin: "8px 0 16px", fontSize: 14, lineHeight: 1.6, color: "var(--fg-secondary)" }}>
          Tradução dos termos do nosso domínio para o catálogo MUI:
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "8px 12px", fontSize: 13, alignItems: "center" }}>
          {[
            ["agenda", "Event"],
            ["alunos", "People"],
            ["financeiro", "AccountBalanceWallet"],
            ["nova_aula", "AddCircle"],
            ["iniciar_aula", "PlayArrow"],
            ["aula_confirmada", "CheckCircle"],
            ["aula_pendente", "Schedule"],
            ["aula_cancelada", "Cancel"],
            ["reagendar", "Update"],
            ["rota", "Explore"],
            ["car", "DirectionsCar"],
            ["money", "AttachMoney"],
          ].map(([k, v]) => (
            <React.Fragment key={k}>
              <span className="mono" style={{ color: "var(--fg-secondary)" }}>{k}</span>
              <span style={{ color: "var(--fg-tertiary)" }}>→</span>
              <span className="mono" style={{ color: "var(--asfalto-950)" }}>{v}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>

    {/* Anatomia · Material grid */}
    <div className="section__sub">
      <span className="section__sub-num">5.2</span>
      <h3 className="section__sub-title">Anatomia · grid 24</h3>
      <span className="section__sub-note">convenções Material Design</span>
    </div>
    <div className="grid grid--3" style={{ marginBottom: 48 }}>
      <div className="spec">
        <div className="spec__preview" style={{ minHeight: 220, background: "var(--concreto)" }}>
          <svg width="180" height="180" viewBox="-1 -1 26 26" style={{ overflow: "visible" }}>
            {/* canvas */}
            <rect x="0" y="0" width="24" height="24" fill="none" stroke="var(--rota-500)" strokeWidth="0.08" strokeDasharray="0.5 0.3"/>
            {/* live area 20×20 (Material spec) */}
            <rect x="2" y="2" width="20" height="20" fill="none" stroke="var(--rota-500)" strokeWidth="0.12"/>
            {/* grid */}
            <g stroke="var(--asfalto-300)" strokeWidth="0.04" opacity="0.7">
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i} x2="24" y2={i}/>
              ))}
              {Array.from({ length: 25 }).map((_, i) => (
                <line key={`v${i}`} x1={i} y1="0" x2={i} y2="24"/>
              ))}
            </g>
            {/* glifo Material */}
            <g fill="var(--asfalto-950)">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </g>
          </svg>
        </div>
        <div className="spec__caption">
          <span className="spec__name">Canvas 24 · live 20</span>
          <span className="spec__meta">padding 2u perimetral</span>
        </div>
      </div>

      <div className="spec">
        <div className="spec__preview" style={{ minHeight: 220, background: "var(--concreto)", flexDirection: "column", gap: 16 }}>
          <Icon name="agenda" size={88} color="var(--asfalto-950)" />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-tertiary)" }}>filled</span>
        </div>
        <div className="spec__caption">
          <span className="spec__name">Variante única</span>
          <span className="spec__meta">peso sólido</span>
        </div>
      </div>

      <div className="spec">
        <div className="spec__preview" style={{ minHeight: 220, background: "var(--concreto)", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", gap: 18, alignItems: "center", opacity: 0.35 }}>
            {/* outlined exemplo */}
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--asfalto-950)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="mono" style={{ fontSize: 22, color: "var(--asfalto-950)" }}>✕</span>
          </div>
          <Icon name="agenda" size={44} color="var(--asfalto-950)" />
          <span className="mono" style={{ fontSize: 11, color: "var(--fg-tertiary)" }}>nunca misturar estilos</span>
        </div>
        <div className="spec__caption">
          <span className="spec__name">Não fazer</span>
          <span className="spec__meta">outlined ✕ filled</span>
        </div>
      </div>
    </div>

    {/* Set por categoria */}
    <div className="section__sub">
      <span className="section__sub-num">5.3</span>
      <h3 className="section__sub-title">Set Rumo · {ICON_NAMES.length} glifos</h3>
      <span className="section__sub-note">subconjunto do catálogo Material</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 32, marginBottom: 48 }}>
      {ICON_GROUPS.map(group => (
        <div key={group.title}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <h4 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em" }}>{group.title}</h4>
            <span className="mono" style={{ fontSize: 11, color: "var(--fg-tertiary)" }}>{group.names.length}</span>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: 1,
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            {group.names.map(name => <IconShowcase key={name} name={name}/>)}
          </div>
        </div>
      ))}
    </div>

    {/* Principais — destaque */}
    <div className="section__sub">
      <span className="section__sub-num">5.4</span>
      <h3 className="section__sub-title">Glifos principais · ampliados</h3>
      <span className="section__sub-note">navegação + operação</span>
    </div>
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
      gap: 1,
      background: "var(--border-subtle)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 48,
    }}>
      {["home","agenda","alunos","financeiro","perfil","nova_aula","iniciar_aula","aula_confirmada","aula_pendente","aula_cancelada","reagendar","rota"].map(name => (
        <IconShowcase key={name} name={name} big/>
      ))}
    </div>

    {/* Tamanhos */}
    <div className="section__sub">
      <span className="section__sub-num">5.5</span>
      <h3 className="section__sub-title">Tamanhos & uso</h3>
      <span className="section__sub-note">16 · 20 · 24 · 32 · 48</span>
    </div>
    <div className="grid grid--auto-200" style={{ marginBottom: 48 }}>
      {[
        [16, "inline · captions",       "fontSize='inherit'"],
        [20, "chips · botões sm",       "fontSize='small'"],
        [24, "padrão UI",               "fontSize='medium' (default)"],
        [32, "headers · cards",         "—"],
        [48, "empty states",            "fontSize='large'"],
      ].map(([s, note, mui]) => (
        <div key={s} className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 130 }}>
            <Icon name="agenda" size={s} color="var(--asfalto-950)" />
          </div>
          <div className="spec__caption">
            <span className="spec__name">{s}px</span>
            <span className="spec__meta">{note}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--fg-tertiary)", marginTop: 2 }}>{mui}</span>
          </div>
        </div>
      ))}
    </div>

    {/* Cores aplicadas */}
    <div className="section__sub">
      <span className="section__sub-num">5.6</span>
      <h3 className="section__sub-title">Cores aplicadas</h3>
      <span className="section__sub-note">currentColor herda do contexto</span>
    </div>
    <div className="grid grid--auto-200">
      {[
        { bg: "var(--asfalto-950)", fg: "var(--lima-400)",   label: "asfalto + lima" },
        { bg: "var(--lima-400)",    fg: "var(--asfalto-950)",label: "lima + asfalto" },
        { bg: "var(--concreto)",    fg: "var(--asfalto-950)",label: "concreto + asfalto" },
        { bg: "var(--rota-500)",    fg: "#fff",              label: "rota + branco" },
      ].map((p, i) => (
        <div key={i} className="spec">
          <div className="spec__preview" style={{ background: p.bg, minHeight: 130 }}>
            <Icon name="rota" size={36} color={p.fg} />
          </div>
          <div className="spec__caption">
            <span className="spec__name">{p.label}</span>
            <span className="spec__meta">filled · 36px</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

window.SectionIcons = SectionIcons;
