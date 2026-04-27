/* RUMO DS — Seção: Fundamentos (Cores) */

const SwatchCard = ({ name, hex, fg = "var(--asfalto-950)", varName }) => (
  <div className="token">
    <div className="token__swatch" style={{ background: hex, color: fg }}>
      <div style={{
        position: "absolute", inset: 0,
        padding: "12px 14px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, opacity: 0.7 }}>{varName}</span>
      </div>
    </div>
    <div className="token__body">
      <span className="token__name">{name}</span>
      <span className="token__hex">{hex}</span>
    </div>
  </div>
);

const ColorScale = ({ title, prefix, scale }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
      <h4 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--fs-lg)", fontWeight: 700, letterSpacing: "var(--tr-snug)" }}>{title}</h4>
      <span className="mono" style={{ fontSize: 12, color: "var(--fg-tertiary)" }}>--{prefix}-50 → 950</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(11, 1fr)", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
      {scale.map(([weight, hex]) => {
        const isLight = parseInt(weight) <= 300;
        return (
          <div key={weight} style={{
            background: hex,
            padding: "16px 6px 10px",
            color: isLight ? "var(--asfalto-950)" : "var(--concreto)",
            display: "flex", flexDirection: "column", gap: 2,
            minHeight: 80,
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 600, opacity: 0.85 }}>{weight}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.65, textTransform: "uppercase" }}>{hex}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const SectionColors = () => (
  <section className="section" id="sec-colors">
    <div className="section__head">
      <span className="section__num">02</span>
      <div>
        <div className="section__eyebrow">Fundamentos · Cores</div>
        <h2 className="section__title">Sinalização<br/>digital.</h2>
        <p className="section__lead">
          A paleta nasce do asfalto e da placa — alto contraste não é estética, é utilidade
          para quem usa o app dentro do carro, sob luz solar forte.
        </p>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">2.1</span>
      <h3 className="section__sub-title">Paleta-mãe</h3>
      <span className="section__sub-note">do brand kit · 4 cores oficiais</span>
    </div>
    <div className="grid grid--auto-260" style={{ marginBottom: 48 }}>
      <SwatchCard name="Asfalto"  hex="#101418" fg="#F4F5F2" varName="--asfalto" />
      <SwatchCard name="Sinal Lima" hex="#B7F500" fg="#101418" varName="--lima" />
      <SwatchCard name="Concreto" hex="#F4F5F2" fg="#101418" varName="--concreto" />
      <SwatchCard name="Rota Azul" hex="#2D6BFF" fg="#F4F5F2" varName="--rota" />
    </div>

    <div className="section__sub">
      <span className="section__sub-num">2.2</span>
      <h3 className="section__sub-title">Escalas estendidas</h3>
      <span className="section__sub-note">11 paradas por família</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <ColorScale title="Asfalto" prefix="asfalto" scale={[
        ["50", "#F7F8F6"], ["100", "#ECEEEA"], ["200", "#DADDD6"], ["300", "#B8BCB4"],
        ["400", "#898E87"], ["500", "#5C6159"], ["600", "#3D423B"], ["700", "#272B26"],
        ["800", "#1A1E1A"], ["900", "#14171A"], ["950", "#101418"],
      ]}/>
      <ColorScale title="Lima" prefix="lima" scale={[
        ["50", "#F4FCD9"], ["100", "#E9F9B3"], ["200", "#D7F37A"], ["300", "#C5EE4A"],
        ["400", "#B7F500"], ["500", "#A6E000"], ["600", "#8AB800"], ["700", "#6B8F00"],
        ["800", "#4D6700"], ["900", "#344600"], ["950", "#1F2A00"],
      ]}/>
      <ColorScale title="Rota" prefix="rota" scale={[
        ["50", "#EAF1FF"], ["100", "#D5E3FF"], ["200", "#ABC7FF"], ["300", "#80AAFF"],
        ["400", "#568EFF"], ["500", "#2D6BFF"], ["600", "#1E54D6"], ["700", "#163FA3"],
        ["800", "#0F2B70"], ["900", "#08183D"], ["950", "#040C20"],
      ]}/>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">2.3</span>
      <h3 className="section__sub-title">Semânticas & status</h3>
      <span className="section__sub-note">feedback do produto</span>
    </div>
    <div className="grid grid--auto-200">
      {[
        ["Success",   "#00A86B", "#fff",      "--success"],
        ["Warning",   "#FFB020", "#101418",   "--warning"],
        ["Danger",    "#E5484D", "#fff",      "--danger"],
        ["Info",      "#2D6BFF", "#fff",      "--info"],
        ["Pendente",  "#FFF1D6", "#8A6100",   "status"],
        ["Pago",      "#DDF3E6", "#00713F",   "status"],
        ["Confirmado","#B7F500", "#101418",   "status"],
        ["Cancelado", "#FCE0E1", "#8B1F22",   "status"],
      ].map(([n, bg, fg, v]) => (
        <SwatchCard key={n} name={n} hex={bg} fg={fg} varName={v} />
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">2.4</span>
      <h3 className="section__sub-title">Pares de contraste</h3>
      <span className="section__sub-note">aprovados WCAG AA · uso em sol</span>
    </div>
    <div className="grid grid--auto-260">
      {[
        { bg: "#101418", fg: "#F4F5F2", label: "Asfalto / Concreto", ratio: "16.8 : 1" },
        { bg: "#B7F500", fg: "#101418", label: "Lima / Asfalto",     ratio: "13.4 : 1" },
        { bg: "#F4F5F2", fg: "#101418", label: "Concreto / Asfalto", ratio: "16.5 : 1" },
        { bg: "#2D6BFF", fg: "#FFFFFF", label: "Rota / Branco",      ratio: "5.7 : 1" },
      ].map((p, i) => (
        <div key={i} className="spec">
          <div className="spec__preview" style={{ background: p.bg, color: p.fg, minHeight: 140 }}>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 32, letterSpacing: "-0.03em",
            }}>Aa Rg</span>
          </div>
          <div className="spec__caption">
            <span className="spec__name">{p.label}</span>
            <span className="spec__meta">{p.ratio}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

window.SectionColors = SectionColors;
