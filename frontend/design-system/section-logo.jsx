/* RUMO DS — Seção: Logo + Marca */
const LogoMark = ({ size = 40, bg = "var(--lima-400)", fg = "var(--asfalto-950)" }) => (
  <div style={{
    width: size, height: size, borderRadius: size * 0.22,
    background: bg, color: fg,
    display: "grid", placeItems: "center", flexShrink: 0,
  }}>
    {/* Seta estilizada apontando para o progresso (NE) */}
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 19 17.5 6.5M9 6h9.5a.5.5 0 0 1 .5.5V16" stroke="currentColor" strokeWidth="3.2" strokeLinecap="square" strokeLinejoin="miter" fill="none"/>
    </svg>
  </div>
);

const Logotype = ({ color = "var(--asfalto-950)", size = 48, mark = true, accentDot = true }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.28 }}>
    {mark && <LogoMark size={size} />}
    <span style={{
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: size * 0.92,
      letterSpacing: "-0.04em",
      lineHeight: 0.9,
      color,
    }}>
      rumo{accentDot && <span style={{ color: "var(--lima-400)" }}>.</span>}
    </span>
  </div>
);

const SectionLogo = () => (
  <section className="section section--inverse" id="sec-logo">
    <div className="section__head">
      <span className="section__num">08</span>
      <div>
        <div className="section__eyebrow">Brand · Logo</div>
        <h2 className="section__title">A seta que vira rotina.</h2>
        <p className="section__lead">
          O símbolo é uma seta apontando para o progresso, com peso de placa de sinalização.
          Marca e tipografia caminham juntas — autoridade em telas pequenas, generosidade no respiro.
          <em style={{ display: "block", marginTop: 8, color: "var(--asfalto-400)", fontStyle: "normal", fontSize: "var(--fs-sm)" }}>
            Placeholder funcional — substituir pelo logo final quando refinado.
          </em>
        </p>
      </div>
    </div>

    <div className="grid grid--auto-260" style={{ marginBottom: 48 }}>
      <div className="spec">
        <div className="spec__preview spec__preview--inverse" style={{ minHeight: 200 }}>
          <Logotype size={64} color="var(--concreto)" />
        </div>
        <div className="spec__caption">
          <span className="spec__name">Lockup principal</span>
          <span className="spec__meta">símbolo + wordmark</span>
        </div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--concreto" style={{ minHeight: 200 }}>
          <Logotype size={64} color="var(--asfalto-950)" />
        </div>
        <div className="spec__caption">
          <span className="spec__name">Lockup claro</span>
          <span className="spec__meta">fundo concreto</span>
        </div>
      </div>
      <div className="spec">
        <div className="spec__preview" style={{ background: "var(--lima-400)", minHeight: 200 }}>
          <Logotype size={64} color="var(--asfalto-950)" mark={true} />
        </div>
        <div className="spec__caption">
          <span className="spec__name">Lockup lima</span>
          <span className="spec__meta">aplicação acento</span>
        </div>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">8.1</span>
      <h3 className="section__sub-title">Símbolo isolado</h3>
      <span className="section__sub-note">app icon · favicon · stamp</span>
    </div>
    <div className="grid grid--auto-160">
      {[
        { size: 96, bg: "var(--lima-400)",   fg: "var(--asfalto-950)", note: "primário" },
        { size: 96, bg: "var(--asfalto-950)",fg: "var(--lima-400)",    note: "noturno" },
        { size: 96, bg: "var(--concreto)",   fg: "var(--asfalto-950)", note: "claro" },
        { size: 96, bg: "var(--rota-500)",   fg: "var(--concreto)",    note: "promo" },
      ].map((v, i) => (
        <div key={i} className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 160 }}>
            <LogoMark size={v.size} bg={v.bg} fg={v.fg} />
          </div>
          <div className="spec__caption">
            <span className="spec__name">{v.note}</span>
            <span className="spec__meta">96px</span>
          </div>
        </div>
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">8.2</span>
      <h3 className="section__sub-title">Área de respiro</h3>
      <span className="section__sub-note">manter ≥ 1× a altura do "r" em todos os lados</span>
    </div>
    <div className="spec" style={{ background: "var(--asfalto-900)" }}>
      <div className="spec__preview" style={{
        background: "var(--asfalto-900)",
        minHeight: 220,
        backgroundImage: "linear-gradient(var(--asfalto-800) 1px, transparent 1px), linear-gradient(90deg, var(--asfalto-800) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}>
        <div style={{ padding: 32, border: "1.5px dashed var(--asfalto-600)", borderRadius: 8 }}>
          <Logotype size={72} color="var(--concreto)" />
        </div>
      </div>
      <div className="spec__caption">
        <span className="spec__name">Clear space</span>
        <span className="spec__meta">padding mínimo = 1× altura do "r"</span>
      </div>
    </div>
  </section>
);

window.LogoMark = LogoMark;
window.Logotype = Logotype;
window.SectionLogo = SectionLogo;
