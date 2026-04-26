/* RUMO DS — Tipografia + Espaçamento + Grid */

const TypeRow = ({ meta, sample, weight = 700, size, lh = 0.95, tracking = "-0.04em" }) => (
  <div className="type">
    <div className="type__meta">
      {meta.map((m, i) => <div key={i}>{m}</div>)}
    </div>
    <div className="type__sample" style={{ fontWeight: weight, fontSize: size, lineHeight: lh, letterSpacing: tracking, fontFamily: "var(--font-display)" }}>
      {sample}
    </div>
  </div>
);

const SectionType = () => (
  <section className="section section--lima" id="sec-type">
    <div className="section__head">
      <span className="section__num">03</span>
      <div>
        <div className="section__eyebrow">Fundamentos · Tipografia</div>
        <h2 className="section__title" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
          Bricolage<br/>Grotesque.
        </h2>
        <p className="section__lead">
          Uma família. Toda a hierarquia. Bricolage carrega densidade moderna e legibilidade
          excepcional — essencial entre uma aula e outra.
        </p>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">3.1</span>
      <h3 className="section__sub-title">Escala display</h3>
      <span className="section__sub-note">títulos · valores em destaque</span>
    </div>
    <div style={{ background: "var(--asfalto-950)", color: "var(--concreto)", padding: 32, borderRadius: 16, marginBottom: 48 }}>
      <TypeRow meta={["Display / 7xl", "176 / 162", "weight 800"]} sample="Rumo." weight={800} size={176} lh={0.85} tracking="-0.05em" />
      <TypeRow meta={["H1 / 5xl", "72 / 70", "weight 700"]} sample="Sua próxima aula" weight={700} size={72} lh={0.96} />
      <TypeRow meta={["H2 / 4xl", "48 / 50", "weight 700"]} sample="R$ 3.480,00 esta semana" weight={700} size={48} />
      <TypeRow meta={["H3 / 3xl", "36 / 40", "weight 700"]} sample="14 alunos ativos no mês" weight={700} size={36} lh={1.1} tracking="-0.03em" />
    </div>

    <div className="section__sub">
      <span className="section__sub-num">3.2</span>
      <h3 className="section__sub-title">Escala de UI</h3>
      <span className="section__sub-note">corpo · labels · captions</span>
    </div>
    <div style={{ background: "var(--bg-surface)", padding: 32, borderRadius: 16, color: "var(--fg-primary)" }}>
      <TypeRow meta={["H4 / 2xl", "28 / 32", "weight 600"]} sample="Aula confirmada" weight={600} size={28} lh={1.15} tracking="-0.02em" />
      <TypeRow meta={["H5 / xl", "22 / 28", "weight 600"]} sample="João Pedro · Honda Civic" weight={600} size={22} lh={1.25} tracking="-0.02em" />
      <TypeRow meta={["Body lg / lg", "18 / 28", "weight 500"]} sample="Confirme até as 18h de hoje." weight={500} size={18} lh={1.5} tracking="0" />
      <TypeRow meta={["Body / md", "16 / 26", "weight 400"]} sample="Receba o pagamento via PIX após cada aula." weight={400} size={16} lh={1.55} tracking="0" />
      <TypeRow meta={["Body sm / sm", "14 / 22", "weight 400"]} sample="Toque para ver detalhes do recebimento." weight={400} size={14} lh={1.55} tracking="0" />
      <TypeRow meta={["Caption / 2xs", "12 / 18", "weight 600 · uppercase"]} sample="QUARTA · 22 ABR · 14:30" weight={600} size={12} lh={1.5} tracking="0.12em" />
    </div>

    <div className="section__sub">
      <span className="section__sub-num">3.3</span>
      <h3 className="section__sub-title">Pesos & estilo</h3>
      <span className="section__sub-note">use 400 · 500 · 600 · 700 · 800</span>
    </div>
    <div className="grid grid--auto-200">
      {[
        ["300", "Light"],
        ["400", "Regular"],
        ["500", "Medium"],
        ["600", "Semibold"],
        ["700", "Bold"],
        ["800", "Extrabold"],
      ].map(([w, n]) => (
        <div key={w} className="spec" style={{ background: "var(--asfalto-950)", borderColor: "var(--asfalto-800)" }}>
          <div className="spec__preview" style={{ background: "var(--asfalto-950)", color: "var(--concreto)", minHeight: 120 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: parseInt(w), fontSize: 56, letterSpacing: "-0.04em" }}>Aa</span>
          </div>
          <div className="spec__caption" style={{ background: "var(--asfalto-900)", borderColor: "var(--asfalto-800)" }}>
            <span className="spec__name" style={{ color: "var(--concreto)" }}>{n}</span>
            <span className="spec__meta" style={{ color: "var(--asfalto-400)" }}>{w}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const SectionSpacing = () => (
  <section className="section" id="sec-spacing">
    <div className="section__head">
      <span className="section__num">04</span>
      <div>
        <div className="section__eyebrow">Fundamentos · Espaçamento & Grid</div>
        <h2 className="section__title">Ritmo de 4.</h2>
        <p className="section__lead">
          Toda dimensão do produto deriva de uma base 4px. Áreas tocáveis nunca abaixo de 44px —
          o polegar é o ponteiro.
        </p>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">4.1</span>
      <h3 className="section__sub-title">Escala de espaçamento</h3>
      <span className="section__sub-note">--sp-*</span>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 48 }}>
      {[
        ["sp-1", 4], ["sp-2", 8], ["sp-3", 12], ["sp-4", 16],
        ["sp-5", 20], ["sp-6", 24], ["sp-8", 32], ["sp-10", 40],
        ["sp-12", 48], ["sp-16", 64], ["sp-20", 80], ["sp-24", 96],
      ].map(([n, v]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "100px 80px 1fr", alignItems: "center", gap: 16 }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--fg-tertiary)" }}>--{n}</span>
          <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{v}px</span>
          <div style={{ height: 18, width: v, background: "var(--asfalto-950)", borderRadius: 2 }}/>
        </div>
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">4.2</span>
      <h3 className="section__sub-title">Hit targets</h3>
      <span className="section__sub-note">mínimo 44px · ideal 48px · grande 56px</span>
    </div>
    <div className="grid grid--3" style={{ marginBottom: 48 }}>
      {[
        ["Mín 44px", 44, "ações secundárias"],
        ["Confortável 48px", 48, "padrão de produto"],
        ["Grande 56px", 56, "CTAs principais · valores"],
      ].map(([n, h, note]) => (
        <div key={n} className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 120 }}>
            <button className="btn btn--primary" style={{ height: h, fontSize: h >= 56 ? 18 : 16 }}>
              Confirmar aula
            </button>
          </div>
          <div className="spec__caption">
            <span className="spec__name">{n}</span>
            <span className="spec__meta">{note}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">4.3</span>
      <h3 className="section__sub-title">Raios</h3>
      <span className="section__sub-note">--r-*</span>
    </div>
    <div className="grid grid--auto-160" style={{ marginBottom: 48 }}>
      {[
        ["xs", 4], ["sm", 8], ["md", 12], ["lg", 16], ["xl", 20], ["2xl", 24], ["pill", 999],
      ].map(([n, v]) => (
        <div key={n} className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 120 }}>
            <div style={{ width: 88, height: 88, background: "var(--asfalto-950)", borderRadius: v }}/>
          </div>
          <div className="spec__caption">
            <span className="spec__name">--r-{n}</span>
            <span className="spec__meta">{v === 999 ? "pill" : `${v}px`}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">4.4</span>
      <h3 className="section__sub-title">Sombras</h3>
      <span className="section__sub-note">elevação contida — operacional, não decorativa</span>
    </div>
    <div className="grid grid--auto-200">
      {[
        ["xs", "0 1px 2px rgba(16,20,24,.06)"],
        ["sm", "0 2px 6px rgba(16,20,24,.08)"],
        ["md", "0 6px 16px rgba(16,20,24,.10)"],
        ["lg", "0 14px 32px rgba(16,20,24,.14)"],
        ["xl", "0 24px 56px rgba(16,20,24,.20)"],
      ].map(([n, sh]) => (
        <div key={n} className="spec">
          <div className="spec__preview" style={{ background: "var(--concreto)", minHeight: 140 }}>
            <div style={{ width: 96, height: 96, background: "#fff", borderRadius: 16, boxShadow: sh }}/>
          </div>
          <div className="spec__caption">
            <span className="spec__name">--sh-{n}</span>
            <span className="spec__meta">elevação</span>
          </div>
        </div>
      ))}
    </div>

    <div className="section__sub">
      <span className="section__sub-num">4.5</span>
      <h3 className="section__sub-title">Grid mobile-first</h3>
      <span className="section__sub-note">4 colunas · gutter 16 · margem 20</span>
    </div>
    <div className="spec">
      <div className="spec__preview" style={{ background: "var(--concreto)", padding: 32, minHeight: 220 }}>
        <div style={{ width: "100%", maxWidth: 360, background: "var(--bg-surface)", borderRadius: 16, padding: "20px 20px", border: "1px solid var(--border-subtle)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, height: 160 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ background: "var(--lima-100)", border: "1px dashed var(--lima-700)", borderRadius: 6, display: "grid", placeItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--lima-900)" }}>
                {i+1}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="spec__caption">
        <span className="spec__name">Container 360px</span>
        <span className="spec__meta">4 col · gutter 16 · margem 20</span>
      </div>
    </div>
  </section>
);

window.SectionType = SectionType;
window.SectionSpacing = SectionSpacing;
