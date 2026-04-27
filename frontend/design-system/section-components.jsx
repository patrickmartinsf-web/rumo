/* RUMO DS — Componentes core */

const SectionComponents = () => {
  const [chk, setChk] = React.useState(true);
  const [chk2, setChk2] = React.useState(false);
  const [rad, setRad] = React.useState("a");
  const [sw, setSw] = React.useState(true);
  const [sw2, setSw2] = React.useState(false);

  return (
    <section className="section" id="sec-components">
      <div className="section__head">
        <span className="section__num">06</span>
        <div>
          <div className="section__eyebrow">Componentes</div>
          <h2 className="section__title">Blocos<br/>operacionais.</h2>
          <p className="section__lead">
            Botões, inputs, chips, cards e modais com hit targets generosos e
            estados claros. Tudo desenhado para o polegar e para o sol.
          </p>
        </div>
      </div>

      {/* BOTÕES */}
      <div className="section__sub">
        <span className="section__sub-num">6.1</span>
        <h3 className="section__sub-title">Botões</h3>
        <span className="section__sub-note">primário · secundário · ghost · texto · perigo</span>
      </div>
      <div className="grid grid--auto-260" style={{ marginBottom: 32 }}>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--primary"><Icon name="plus" size={18}/> Nova aula</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Primário</span><span className="spec__meta">.btn--primary</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--secondary">Ver agenda <Icon name="arrow-right" size={18}/></button>
          </div>
          <div className="spec__caption"><span className="spec__name">Secundário</span><span className="spec__meta">.btn--secondary</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--ghost">Cancelar</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Ghost</span><span className="spec__meta">.btn--ghost</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--text">Ver detalhes</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Texto</span><span className="spec__meta">.btn--text</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--danger"><Icon name="trash" size={18}/> Excluir aula</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Perigo</span><span className="spec__meta">.btn--danger</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 140 }}>
            <button className="btn btn--primary" disabled>Confirmar</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Disabled</span><span className="spec__meta">opacity 45%</span></div>
        </div>
      </div>

      <div className="grid grid--3" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 120, gap: 8 }}>
            <button className="btn btn--primary btn--sm">SM 36</button>
            <button className="btn btn--primary btn--md">MD 48</button>
            <button className="btn btn--primary btn--lg">LG 56</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Tamanhos</span><span className="spec__meta">36 · 48 · 56</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 120, gap: 8 }}>
            <button className="btn btn--primary btn--icon"><Icon name="plus" size={22}/></button>
            <button className="btn btn--secondary btn--icon"><Icon name="bell" size={22}/></button>
            <button className="btn btn--ghost btn--icon"><Icon name="more" size={22}/></button>
          </div>
          <div className="spec__caption"><span className="spec__name">Ícone</span><span className="spec__meta">circular 48</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 120, padding: 20 }}>
            <button className="btn btn--primary btn--block btn--lg"><Icon name="check" size={20}/> Confirmar aula de hoje</button>
          </div>
          <div className="spec__caption"><span className="spec__name">Bloco · large</span><span className="spec__meta">CTA mobile</span></div>
        </div>
      </div>

      {/* FAB */}
      <div className="section__sub">
        <span className="section__sub-num">6.2</span>
        <h3 className="section__sub-title">FAB · Ação flutuante</h3>
        <span className="section__sub-note">único por tela · canto inferior direito</span>
      </div>
      <div className="grid grid--3" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 160 }}>
            <button className="fab"><Icon name="plus" size={28}/></button>
          </div>
          <div className="spec__caption"><span className="spec__name">FAB</span><span className="spec__meta">64×64 · sombra lg</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 160 }}>
            <button className="fab fab--extended"><Icon name="plus" size={22}/> Nova aula</button>
          </div>
          <div className="spec__caption"><span className="spec__name">FAB extended</span><span className="spec__meta">com label</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--inverse" style={{ minHeight: 160 }}>
            <button className="fab" style={{ background: "var(--asfalto-950)", color: "var(--lima-400)", border: "2px solid var(--lima-400)" }}>
              <Icon name="whatsapp" size={28}/>
            </button>
          </div>
          <div className="spec__caption"><span className="spec__name">FAB contato</span><span className="spec__meta">contextual</span></div>
        </div>
      </div>

      {/* INPUTS */}
      <div className="section__sub">
        <span className="section__sub-num">6.3</span>
        <h3 className="section__sub-title">Inputs & formulários</h3>
        <span className="section__sub-note">labels acima · hints abaixo · erro à direita</span>
      </div>
      <div className="grid grid--2" style={{ marginBottom: 32 }}>
        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 24 }}>
            <div className="field" style={{ width: "100%", maxWidth: 320 }}>
              <label className="field__label">Nome do aluno</label>
              <input className="input" defaultValue="João Pedro Silva" />
              <span className="field__hint">Como aparece no documento.</span>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Default</span><span className="spec__meta">.input</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 24 }}>
            <div className="field" style={{ width: "100%", maxWidth: 320 }}>
              <label className="field__label">Buscar aluno</label>
              <div className="input-group">
                <span className="input-group__icon"><Icon name="search" size={20}/></span>
                <input className="input" placeholder="Nome, CPF ou telefone" />
              </div>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Com ícone</span><span className="spec__meta">.input-group</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 24 }}>
            <div className="field" style={{ width: "100%", maxWidth: 320 }}>
              <label className="field__label">Valor da aula</label>
              <input className="input is-error" defaultValue="R$ 0,00" />
              <span className="field__error"><Icon name="warning" size={14}/> Defina um valor maior que zero.</span>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Erro</span><span className="spec__meta">.is-error</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain spec__preview--tall" style={{ padding: 24 }}>
            <div className="field" style={{ width: "100%", maxWidth: 320 }}>
              <label className="field__label">Observação</label>
              <textarea className="input" rows={3} placeholder="Anotações da aula (opcional)"></textarea>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Textarea</span><span className="spec__meta">resize y</span></div>
        </div>
      </div>

      <div className="grid grid--3" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 160, flexDirection: "column", gap: 12 }}>
            <label style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setChk(!chk)}>
              <span className={`check ${chk ? "is-checked" : ""}`}><Icon name="check" size={16}/></span>
              <span style={{ fontWeight: 500, fontSize: 15 }}>Cobrança recorrente</span>
            </label>
            <label style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setChk2(!chk2)}>
              <span className={`check ${chk2 ? "is-checked" : ""}`}><Icon name="check" size={16}/></span>
              <span style={{ fontWeight: 500, fontSize: 15 }}>Enviar lembrete WhatsApp</span>
            </label>
          </div>
          <div className="spec__caption"><span className="spec__name">Checkbox</span><span className="spec__meta">.check</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 160, flexDirection: "column", gap: 12 }}>
            {[["a", "PIX"], ["b", "Dinheiro"], ["c", "Cartão"]].map(([k, l]) => (
              <label key={k} style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }} onClick={() => setRad(k)}>
                <span className={`radio ${rad === k ? "is-checked" : ""}`}/>
                <span style={{ fontWeight: 500, fontSize: 15 }}>{l}</span>
              </label>
            ))}
          </div>
          <div className="spec__caption"><span className="spec__name">Radio</span><span className="spec__meta">.radio</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ minHeight: 160, flexDirection: "column", gap: 16, alignItems: "flex-start", padding: 32 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className={`switch ${sw ? "is-on" : ""}`} onClick={() => setSw(!sw)} aria-label="toggle"/>
              <span style={{ fontWeight: 500, fontSize: 15 }}>Lembrete 1h antes</span>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button className={`switch ${sw2 ? "is-on" : ""}`} onClick={() => setSw2(!sw2)} aria-label="toggle"/>
              <span style={{ fontWeight: 500, fontSize: 15 }}>Modo escuro</span>
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">Switch</span><span className="spec__meta">.switch</span></div>
        </div>
      </div>

      {/* CHIPS */}
      <div className="section__sub">
        <span className="section__sub-num">6.4</span>
        <h3 className="section__sub-title">Chips de status</h3>
        <span className="section__sub-note">feedback semântico do produto</span>
      </div>
      <div className="grid grid--auto-260" style={{ marginBottom: 32 }}>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 120, gap: 8, flexWrap: "wrap" }}>
            <span className="chip chip--pendente"><span className="chip__dot"/>Pendente</span>
            <span className="chip chip--pago"><span className="chip__dot"/>Pago</span>
            <span className="chip chip--confirmado"><span className="chip__dot"/>Confirmado</span>
            <span className="chip chip--cancelado"><span className="chip__dot"/>Cancelado</span>
          </div>
          <div className="spec__caption"><span className="spec__name">Status do produto</span><span className="spec__meta">4 estados</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 120, gap: 8, flexWrap: "wrap" }}>
            <span className="chip chip--neutral">Manhã</span>
            <span className="chip chip--rota">PIX</span>
            <span className="chip chip--solid">Confirmado</span>
            <span className="chip chip--outline">Filtro</span>
          </div>
          <div className="spec__caption"><span className="spec__name">Variantes</span><span className="spec__meta">filtros · tags</span></div>
        </div>
        <div className="spec">
          <div className="spec__preview" style={{ minHeight: 120, gap: 8, flexWrap: "wrap" }}>
            <span className="chip chip--confirmado"><Icon name="check" size={12}/>Confirmado às 14:30</span>
            <span className="chip chip--pendente"><Icon name="clock" size={12}/>Vence em 2 dias</span>
            <span className="chip chip--cancelado"><Icon name="x-circle" size={12}/>Cancelado pelo aluno</span>
          </div>
          <div className="spec__caption"><span className="spec__name">Com ícone</span><span className="spec__meta">contexto extra</span></div>
        </div>
      </div>

      {/* CARDS */}
      <div className="section__sub">
        <span className="section__sub-num">6.5</span>
        <h3 className="section__sub-title">Cards operacionais</h3>
        <span className="section__sub-note">leitura rápida da agenda do dia</span>
      </div>
      <div className="grid grid--auto-260" style={{ marginBottom: 32 }}>
        {/* Card aula */}
        <div className="card" style={{ gap: 16 }}>
          <div className="card__header">
            <div>
              <div className="card__meta">QUA · 22 ABR · 14:30 — 15:30</div>
              <h3 className="card__title" style={{ marginTop: 4 }}>Aula prática · João Pedro</h3>
            </div>
            <span className="chip chip--confirmado"><span className="chip__dot"/>Confirmado</span>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", color: "var(--fg-secondary)", fontSize: 14 }}>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="map-pin" size={16}/>Av. Paulista, 1500</span>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="car" size={16}/>Honda Civic</span>
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}><Icon name="money" size={16}/>R$ 120,00</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn--primary btn--sm" style={{ flex: 1 }}><Icon name="check" size={16}/>Iniciar</button>
            <button className="btn btn--ghost btn--sm btn--icon"><Icon name="whatsapp" size={18}/></button>
            <button className="btn btn--ghost btn--sm btn--icon"><Icon name="phone" size={18}/></button>
          </div>
        </div>

        {/* Card aluno */}
        <div className="card">
          <div className="card__header">
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span className="avatar avatar--lg avatar--asfalto">JP</span>
              <div>
                <h3 className="card__title">João Pedro</h3>
                <span className="card__meta">12 aulas · iniciante</span>
              </div>
            </div>
            <button className="btn btn--ghost btn--icon btn--sm"><Icon name="more" size={18}/></button>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: "var(--fg-secondary)", fontWeight: 600 }}>
              <span>Progresso</span><span className="mono">12 / 20</span>
            </div>
            <div className="progress"><div className="progress__fill" style={{ width: "60%" }}/></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <span className="chip chip--rota">PIX</span>
            <span className="chip chip--neutral">Manhã</span>
            <span className="chip chip--pago"><span className="chip__dot"/>Em dia</span>
          </div>
        </div>

        {/* Card financeiro inverse */}
        <div className="card card--inverse">
          <div className="card__meta" style={{ color: "var(--asfalto-400)" }}>RECEBIMENTOS · ESTA SEMANA</div>
          <div className="stat">
            <span className="stat__value" style={{ color: "var(--lima-400)", fontSize: 56 }}>R$ 3.480</span>
            <span className="stat__delta"><Icon name="trending-up" size={14} style={{ verticalAlign: "middle" }}/> +18% vs anterior</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid var(--asfalto-800)", fontSize: 13 }}>
            <div><span style={{ color: "var(--asfalto-400)" }}>Pagas</span><br/><span className="mono" style={{ fontWeight: 700 }}>29</span></div>
            <div><span style={{ color: "var(--asfalto-400)" }}>Pendentes</span><br/><span className="mono" style={{ fontWeight: 700 }}>4</span></div>
            <div><span style={{ color: "var(--asfalto-400)" }}>Atraso</span><br/><span className="mono" style={{ fontWeight: 700, color: "var(--danger)" }}>R$ 240</span></div>
          </div>
        </div>
      </div>

      {/* AVATARS & LIST */}
      <div className="section__sub">
        <span className="section__sub-num">6.6</span>
        <h3 className="section__sub-title">Avatares & list items</h3>
        <span className="section__sub-note">linhas de toque ≥ 56px</span>
      </div>
      <div className="grid grid--2" style={{ marginBottom: 48 }}>
        <div className="spec">
          <div className="spec__preview spec__preview--plain" style={{ gap: 12, minHeight: 140 }}>
            <span className="avatar avatar--sm">JP</span>
            <span className="avatar">JP</span>
            <span className="avatar avatar--lg">JP</span>
            <span className="avatar avatar--lima">MR</span>
            <span className="avatar avatar--asfalto">CL</span>
          </div>
          <div className="spec__caption"><span className="spec__name">Avatares</span><span className="spec__meta">32 · 40 · 56 · variantes</span></div>
        </div>
        <div className="spec" style={{ overflow: "hidden" }}>
          <div className="spec__preview spec__preview--plain" style={{ padding: 0, minHeight: 240, alignItems: "stretch" }}>
            <div style={{ width: "100%", background: "var(--bg-surface)" }}>
              {[
                ["Maria Ribeiro", "Próxima aula · hoje 16h", "MR", "confirmado"],
                ["Carlos Lima",   "Pagamento pendente · R$ 120", "CL", "pendente"],
                ["Ana Souza",     "Aula concluída · ontem", "AS", "pago"],
              ].map(([n, s, ini, st], i) => (
                <div key={i} className="list-item">
                  <span className="avatar avatar--asfalto">{ini}</span>
                  <div className="list-item__body">
                    <span className="list-item__title">{n}</span>
                    <span className="list-item__sub">{s}</span>
                  </div>
                  <div className="list-item__trail">
                    <span className={`chip chip--${st}`}><span className="chip__dot"/></span>
                    <Icon name="chevron-right" size={20} color="var(--fg-tertiary)"/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="spec__caption"><span className="spec__name">List item</span><span className="spec__meta">.list-item · 56px+</span></div>
        </div>
      </div>

      {/* MODAL */}
      <div className="section__sub">
        <span className="section__sub-num">6.7</span>
        <h3 className="section__sub-title">Modal de confirmação</h3>
        <span className="section__sub-note">decisões irreversíveis · ações críticas</span>
      </div>
      <div className="spec">
        <div className="spec__preview" style={{ background: "rgba(16,20,24,0.55)", padding: 32, minHeight: 320 }}>
          <div className="modal">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--danger-bg)", color: "var(--danger)", display: "grid", placeItems: "center" }}>
              <Icon name="warning" size={24}/>
            </div>
            <div>
              <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em" }}>Cancelar esta aula?</h3>
              <p style={{ margin: "8px 0 0", color: "var(--fg-secondary)", fontSize: 14, lineHeight: 1.5 }}>
                João Pedro será notificado por WhatsApp. O valor de R$ 120,00 voltará para o saldo a receber.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="btn btn--ghost" style={{ flex: 1 }}>Voltar</button>
              <button className="btn btn--danger" style={{ flex: 1 }}>Cancelar aula</button>
            </div>
          </div>
        </div>
        <div className="spec__caption"><span className="spec__name">Modal · destructive</span><span className="spec__meta">.modal · centered</span></div>
      </div>
    </section>
  );
};

window.SectionComponents = SectionComponents;
