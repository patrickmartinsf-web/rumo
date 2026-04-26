/* RUMO DS — Cover editorial */

const SectionCover = () => (
  <section className="section section--inverse" id="sec-cover" style={{ paddingTop: 56, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 90% 10%, rgba(183,245,0,0.10), transparent 50%)", pointerEvents: "none" }}/>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 64, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Logotype size={36} color="var(--concreto)" mark={true} />
        <span style={{ width: 1, height: 28, background: "var(--asfalto-700)" }}/>
        <span className="eyebrow" style={{ color: "var(--lima-400)" }}>Design System v0.1</span>
      </div>
      <div className="mono" style={{ fontSize: 12, color: "var(--asfalto-400)" }}>
        ABR 2026 · BRICOLAGE GROTESQUE · 4PX BASE
      </div>
    </div>

    <div style={{ position: "relative" }}>
      <div className="mono" style={{ fontSize: 12, color: "var(--asfalto-500)", marginBottom: 24, letterSpacing: "0.04em" }}>
        / 01 — INTRODUÇÃO
      </div>
      <h1 style={{
        margin: 0,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(3.5rem, 11vw, 11rem)",
        lineHeight: 0.85,
        letterSpacing: "-0.055em",
        color: "var(--concreto)",
      }}>
        Do caderno<br/>
        <span style={{ color: "var(--lima-400)" }}>ao negócio</span><br/>
        de verdade.
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32, marginTop: 64, maxWidth: 1100 }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--lima-400)", marginBottom: 8 }}>Para quem</div>
          <p style={{ margin: 0, color: "var(--asfalto-200)", fontSize: 17, lineHeight: 1.55 }}>
            Instrutor de trânsito independente, 25–50 anos, pós-Resolução Contran 1.020/2025.
            Usa o celular dentro do carro, entre uma aula e outra, sob luz solar forte.
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "var(--lima-400)", marginBottom: 8 }}>Promessa</div>
          <p style={{ margin: 0, color: "var(--asfalto-200)", fontSize: 17, lineHeight: 1.55 }}>
            Transformar o improviso em operação profissional. Identidade, controle e previsibilidade
            no bolso de quem nunca teve sistema.
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ color: "var(--lima-400)", marginBottom: 8 }}>Pilar visual</div>
          <p style={{ margin: 0, color: "var(--asfalto-200)", fontSize: 17, lineHeight: 1.55 }}>
            Funcionalidade moderna, contraste extremo e clareza operacional.
            Repertório familiar (WhatsApp, Instagram). Sem manual.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 56, flexWrap: "wrap" }}>
        <span className="pill">PWA</span>
        <span className="pill">Mobile-first</span>
        <span className="pill">Offline-capable</span>
        <span className="pill">A11y AA</span>
        <span className="pill">PT-BR</span>
      </div>
    </div>

    <div style={{ marginTop: 96, paddingTop: 32, borderTop: "1px solid var(--asfalto-800)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
      <div className="stat">
        <span className="stat__label" style={{ color: "var(--asfalto-400)" }}>Tokens</span>
        <span className="stat__value" style={{ color: "var(--concreto)" }}>120<span style={{ color: "var(--lima-400)" }}>+</span></span>
      </div>
      <div className="stat">
        <span className="stat__label" style={{ color: "var(--asfalto-400)" }}>Componentes</span>
        <span className="stat__value" style={{ color: "var(--concreto)" }}>32</span>
      </div>
      <div className="stat">
        <span className="stat__label" style={{ color: "var(--asfalto-400)" }}>Ícones</span>
        <span className="stat__value" style={{ color: "var(--concreto)" }}>42</span>
      </div>
      <div className="stat">
        <span className="stat__label" style={{ color: "var(--asfalto-400)" }}>Hit min.</span>
        <span className="stat__value" style={{ color: "var(--concreto)" }}>44<span style={{ color: "var(--lima-400)", fontSize: "0.5em" }}>px</span></span>
      </div>
    </div>
  </section>
);

window.SectionCover = SectionCover;
