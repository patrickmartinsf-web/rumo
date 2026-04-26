/* RUMO DS — Padrões mobile (bottom nav, sheet, calendário) */

const SectionMobile = () => {
  const [day, setDay] = React.useState(22);
  const [tab, setTab] = React.useState("home");

  const weekDays = [
    ["DOM", 19], ["SEG", 20], ["TER", 21], ["QUA", 22], ["QUI", 23], ["SEX", 24], ["SAB", 25]
  ];
  const navItems = [
    ["home", "home", "Hoje"],
    ["calendar", "calendar", "Agenda"],
    ["plus", "+", "", true],
    ["users", "users", "Alunos"],
    ["wallet", "wallet", "Caixa"],
  ];

  return (
    <section className="section" id="sec-mobile">
      <div className="section__head">
        <span className="section__num">07</span>
        <div>
          <div className="section__eyebrow">Padrões · Mobile</div>
          <h2 className="section__title">Desenhado<br/>para o polegar.</h2>
          <p className="section__lead">
            Navegação inferior, bottom sheets para ações rápidas, calendário compacto.
            Tudo na zona de alcance natural — o instrutor está com uma mão no volante.
          </p>
        </div>
      </div>

      <div className="section__sub">
        <span className="section__sub-num">7.1</span>
        <h3 className="section__sub-title">Bottom navigation</h3>
        <span className="section__sub-note">5 destinos · CTA central elevado</span>
      </div>
      <div className="spec" style={{ marginBottom: 48 }}>
        <div className="spec__preview" style={{ padding: 32, minHeight: 200 }}>
          <div style={{ width: "100%", maxWidth: 360, borderRadius: 24, overflow: "hidden", boxShadow: "var(--sh-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="bnav">
              {navItems.map(([k, ic, label, isFab]) => (
                <button key={k} className={`bnav__item ${tab === k ? "is-active" : ""}`} onClick={() => setTab(k)}>
                  <span className="bnav__icon" style={isFab ? { background: "var(--lima-400)", color: "var(--asfalto-950)", width: 44, height: 44, borderRadius: 999 } : {}}>
                    <Icon name={ic} size={isFab ? 24 : 22}/>
                  </span>
                  {label && <span>{label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Bottom nav</span><span className="spec__meta">.bnav · 5 col · FAB central</span></div>
      </div>

      <div className="section__sub">
        <span className="section__sub-num">7.2</span>
        <h3 className="section__sub-title">Day strip & calendário</h3>
        <span className="section__sub-note">selecionar dia · um toque</span>
      </div>
      <div className="grid grid--2" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 320 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                <span className="eyebrow">Abril 2025</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-tertiary)" }}>SEMANA 17</span>
              </div>
              <div className="daystrip">
                {weekDays.map(([wd, n]) => (
                  <button key={n} className={`daystrip__day ${day === n ? "is-active" : ""}`} onClick={() => setDay(n)}>
                    <span className="daystrip__wd">{wd}</span>
                    <span className="daystrip__num">{n}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Day strip</span><span className="spec__meta">.daystrip</span></div>
        </div>

        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 16 }}>
            <div className="cal" style={{ maxWidth: 320 }}>
              <div className="cal__head">
                <button className="btn btn--ghost btn--icon btn--sm"><Icon name="chevron-left" size={20}/></button>
                <div className="cal__title">abril 2025</div>
                <button className="btn btn--ghost btn--icon btn--sm"><Icon name="chevron-right" size={20}/></button>
              </div>
              <div className="cal__weekdays">
                {["D","S","T","Q","Q","S","S"].map((d, i) => <div key={i} className="cal__weekday">{d}</div>)}
              </div>
              <div className="cal__days">
                {Array.from({ length: 30 }).map((_, i) => {
                  const num = i - 1;
                  const isMuted = num < 1 || num > 30;
                  const display = num < 1 ? 30 + num : num > 30 ? num - 30 : num;
                  const isToday = num === 22;
                  const isSelected = num === day;
                  const hasEvent = [3, 8, 14, 22, 24, 28].includes(num);
                  return (
                    <button key={i} className={`cal__day ${isMuted ? "is-muted" : ""} ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`} onClick={() => !isMuted && setDay(num)}>
                      {display}
                      {hasEvent && !isMuted && <span className="cal__dots"><span className="cal__dot"/></span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Calendário mensal</span><span className="spec__meta">.cal</span></div>
        </div>
      </div>

      <div className="section__sub">
        <span className="section__sub-num">7.3</span>
        <h3 className="section__sub-title">Bottom sheet</h3>
        <span className="section__sub-note">ações rápidas · contextual</span>
      </div>
      <div className="grid grid--2" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview" style={{ padding: 0, background: "rgba(16,20,24,0.45)", minHeight: 320, alignItems: "flex-end" }}>
            <div className="sheet" style={{ width: "100%", maxWidth: 360 }}>
              <span className="sheet__handle"/>
              <h3 className="sheet__title">Nova aula</h3>
              <span className="sheet__sub">Selecione o aluno e o horário.</span>
              <div className="field">
                <div className="input-group">
                  <span className="input-group__icon"><Icon name="search" size={20}/></span>
                  <input className="input" placeholder="Buscar aluno"/>
                </div>
              </div>
              <div className="row">
                <span className="chip chip--solid"><Icon name="clock" size={12}/>Agora</span>
                <span className="chip chip--outline">Hoje 16h</span>
                <span className="chip chip--outline">Amanhã 9h</span>
              </div>
              <button className="btn btn--primary btn--block btn--lg"><Icon name="check" size={20}/>Criar aula</button>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Sheet · ação</span><span className="spec__meta">.sheet</span></div>
        </div>

        <div className="spec">
          <div className="spec__preview" style={{ padding: 0, background: "rgba(16,20,24,0.45)", minHeight: 320, alignItems: "flex-end" }}>
            <div className="sheet" style={{ width: "100%", maxWidth: 360, gap: 0 }}>
              <span className="sheet__handle"/>
              <h3 className="sheet__title" style={{ marginBottom: 16 }}>João Pedro</h3>
              {[
                ["whatsapp", "Enviar WhatsApp"],
                ["phone", "Ligar"],
                ["money", "Cobrar pendência"],
                ["edit", "Editar dados"],
                ["trash", "Remover aluno", true],
              ].map(([ic, label, danger], i) => (
                <button key={i} className="list-item" style={{ background: "transparent", padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--border-subtle)" : "none", border: "none", borderBottom: i < 4 ? "1px solid var(--border-subtle)" : "none", width: "100%", textAlign: "left", cursor: "pointer", color: danger ? "var(--danger)" : "inherit" }}>
                  <span className="avatar avatar--sm" style={{ background: danger ? "var(--danger-bg)" : "var(--asfalto-100)", color: danger ? "var(--danger)" : "var(--asfalto-700)" }}>
                    <Icon name={ic} size={18}/>
                  </span>
                  <span className="list-item__title" style={{ color: "inherit" }}>{label}</span>
                  <Icon name="chevron-right" size={20} color="var(--fg-tertiary)"/>
                </button>
              ))}
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Sheet · menu</span><span className="spec__meta">long-press</span></div>
        </div>
      </div>

      <div className="section__sub">
        <span className="section__sub-num">7.4</span>
        <h3 className="section__sub-title">Top app bar</h3>
        <span className="section__sub-note">títulos · ações principais</span>
      </div>
      <div className="grid grid--2">
        <div className="spec">
          <div className="spec__preview" style={{ padding: 0, minHeight: 160, background: "var(--bg-app)", alignItems: "stretch" }}>
            <div style={{ width: "100%" }}>
              <div style={{ background: "var(--bg-surface)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)" }}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 4 }}>QUARTA · 22 ABR</div>
                  <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28, letterSpacing: "-0.03em" }}>Sua agenda</h2>
                </div>
                <button className="btn btn--ghost btn--icon" style={{ position: "relative" }}>
                  <Icon name="bell" size={22}/>
                  <span style={{ position: "absolute", top: 10, right: 10, width: 10, height: 10, borderRadius: 999, background: "var(--lima-400)", border: "2px solid var(--bg-surface)" }}/>
                </button>
              </div>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">App bar · large title</span><span className="spec__meta">contextual</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ padding: 0, minHeight: 160, background: "var(--bg-app)", alignItems: "stretch" }}>
            <div style={{ width: "100%" }}>
              <div style={{ background: "var(--asfalto-950)", color: "var(--concreto)", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <button className="btn btn--icon btn--sm" style={{ background: "transparent", color: "var(--concreto)" }}><Icon name="chevron-left" size={22}/></button>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em", flex: 1 }}>Detalhe da aula</h2>
                <button className="btn btn--icon btn--sm" style={{ background: "transparent", color: "var(--concreto)" }}><Icon name="more" size={22}/></button>
              </div>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">App bar · interno</span><span className="spec__meta">asfalto · navegação</span></div>
        </div>
      </div>
    </section>
  );
};

window.SectionMobile = SectionMobile;
