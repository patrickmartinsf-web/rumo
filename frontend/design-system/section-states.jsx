/* RUMO DS — Estados (loading, empty, error, success) + Toasts */

const SectionStates = () => (
  <section className="section" id="sec-states">
    <div className="section__head">
      <span className="section__num">09</span>
      <div>
        <div className="section__eyebrow">Estados & Feedback</div>
        <h2 className="section__title">Sempre dizer<br/>algo.</h2>
        <p className="section__lead">
          Carregar, vazio, erro, sucesso. Cada estado tem voz pragmática e um próximo passo claro —
          nunca um vazio mudo.
        </p>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">9.1</span>
      <h3 className="section__sub-title">Loading</h3>
      <span className="section__sub-note">spinner · skeleton · progress</span>
    </div>
    <div className="grid grid--3" style={{ marginBottom: 48 }}>
      <div className="spec">
        <div className="spec__preview" style={{ minHeight: 160 }}>
          <div className="spinner"/>
        </div>
        <div className="spec__caption"><span className="spec__name">Spinner</span><span className="spec__meta">.spinner · 28px</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--inverse" style={{ minHeight: 160 }}>
          <div className="spinner spinner--lima"/>
        </div>
        <div className="spec__caption"><span className="spec__name">Spinner inverso</span><span className="spec__meta">.spinner--lima</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 160 }}>
          <div className="col stretch" style={{ maxWidth: 280 }}>
            <div className="skel" style={{ height: 14, width: "60%" }}/>
            <div className="skel" style={{ height: 22 }}/>
            <div className="skel" style={{ height: 14, width: "85%" }}/>
            <div className="skel" style={{ height: 40, marginTop: 8 }}/>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Skeleton</span><span className="spec__meta">.skel</span></div>
      </div>
    </div>

    <div className="grid grid--2" style={{ marginBottom: 48 }}>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="col stretch" style={{ maxWidth: 320 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--fg-secondary)", fontWeight: 600 }}>
              <span>Sincronizando 24 aulas</span>
              <span className="mono">68%</span>
            </div>
            <div className="progress"><div className="progress__fill" style={{ width: "68%" }}/></div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Progress bar</span><span className="spec__meta">.progress</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--inverse" style={{ minHeight: 140, gap: 14 }}>
          <div className="spinner spinner--lima"/>
          <span style={{ color: "var(--concreto)", fontWeight: 500 }}>Confirmando pagamento…</span>
        </div>
        <div className="spec__caption"><span className="spec__name">Loading + label</span><span className="spec__meta">contextual</span></div>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">9.2</span>
      <h3 className="section__sub-title">Empty · Error · Success</h3>
      <span className="section__sub-note">tela inteira ou área contida</span>
    </div>
    <div className="grid grid--3" style={{ marginBottom: 48 }}>
      <div className="spec">
        <div className="spec__preview spec__preview--plain spec__preview--tall">
          <div className="state">
            <div className="state__icon" style={{ background: "var(--asfalto-100)", color: "var(--asfalto-700)" }}>
              <Icon name="calendar" size={32}/>
            </div>
            <h3 className="state__title">Nada na agenda hoje</h3>
            <p className="state__sub">Que tal aproveitar para confirmar as aulas de amanhã?</p>
            <button className="btn btn--primary btn--sm" style={{ marginTop: 8 }}><Icon name="plus" size={18}/>Adicionar aula</button>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Empty state</span><span className="spec__meta">.state · neutro</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain spec__preview--tall">
          <div className="state">
            <div className="state__icon" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>
              <Icon name="x-circle" size={32}/>
            </div>
            <h3 className="state__title">Sem conexão</h3>
            <p className="state__sub">Suas aulas continuam salvas. Tentaremos sincronizar de novo em segundos.</p>
            <button className="btn btn--secondary btn--sm" style={{ marginTop: 8 }}>Tentar agora</button>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Error state</span><span className="spec__meta">recuperável</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview" style={{ background: "var(--lima-400)", minHeight: 240 }}>
          <div className="state" style={{ color: "var(--asfalto-950)" }}>
            <div className="state__icon" style={{ background: "var(--asfalto-950)", color: "var(--lima-400)" }}>
              <Icon name="check" size={32}/>
            </div>
            <h3 className="state__title">Pago! R$ 120,00</h3>
            <p className="state__sub" style={{ color: "var(--asfalto-800)" }}>O recibo foi enviado para o WhatsApp do João Pedro.</p>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Success state</span><span className="spec__meta">celebratório</span></div>
      </div>
    </div>

    <div className="section__sub">
      <span className="section__sub-num">9.3</span>
      <h3 className="section__sub-title">Toasts & banners</h3>
      <span className="section__sub-note">feedback inline · não bloqueante</span>
    </div>
    <div className="grid grid--2" style={{ marginBottom: 32 }}>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="toast" style={{ maxWidth: 360 }}>
            <span className="toast__icon"><Icon name="check-circle" size={20} color="var(--lima-400)"/></span>
            <div style={{ flex: 1 }}>
              <div className="toast__title">Aula confirmada</div>
              <div className="toast__sub">Quarta · 22 abr · 14:30 com João Pedro</div>
            </div>
            <button className="btn btn--icon btn--sm" style={{ background: "transparent", color: "var(--concreto)" }}><Icon name="close" size={18}/></button>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Toast asfalto</span><span className="spec__meta">padrão</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="toast" style={{ maxWidth: 360, background: "var(--lima-400)", color: "var(--asfalto-950)" }}>
            <span className="toast__icon"><Icon name="trending-up" size={20}/></span>
            <div style={{ flex: 1 }}>
              <div className="toast__title">+R$ 120,00 recebido</div>
              <div className="toast__sub" style={{ color: "var(--asfalto-800)" }}>Pix de Maria Ribeiro · agora</div>
            </div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Toast lima</span><span className="spec__meta">vitória</span></div>
      </div>
    </div>

    <div className="grid grid--2">
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="banner banner--info" style={{ maxWidth: 420 }}>
            <Icon name="info" size={20}/>
            <div><strong>Modo offline.</strong> Suas aulas serão sincronizadas quando voltar a internet.</div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Banner info</span><span className="spec__meta">.banner--info</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="banner banner--warning" style={{ maxWidth: 420 }}>
            <Icon name="warning" size={20}/>
            <div><strong>3 cobranças vencendo amanhã.</strong> Toque para enviar lembretes via WhatsApp.</div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Banner warning</span><span className="spec__meta">.banner--warning</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="banner banner--success" style={{ maxWidth: 420 }}>
            <Icon name="check-circle" size={20}/>
            <div><strong>Mês fechado.</strong> Você bateu R$ 12.450 em aulas — recorde do trimestre.</div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Banner success</span><span className="spec__meta">.banner--success</span></div>
      </div>
      <div className="spec">
        <div className="spec__preview spec__preview--plain" style={{ padding: 24, minHeight: 140 }}>
          <div className="banner banner--danger" style={{ maxWidth: 420 }}>
            <Icon name="x-circle" size={20}/>
            <div><strong>Falha ao salvar.</strong> Verifique sua conexão e tente novamente.</div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Banner danger</span><span className="spec__meta">.banner--danger</span></div>
      </div>
    </div>
  </section>
);

window.SectionStates = SectionStates;
