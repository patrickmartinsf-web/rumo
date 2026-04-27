/* RUMO DS — App + Sidebar de navegação */

const SECTIONS = [
  { id: "sec-cover",      num: "01", group: "intro",        label: "Introdução" },
  { id: "sec-colors",     num: "02", group: "fundamentos",  label: "Cores" },
  { id: "sec-type",       num: "03", group: "fundamentos",  label: "Tipografia" },
  { id: "sec-spacing",    num: "04", group: "fundamentos",  label: "Espaço & Grid" },
  { id: "sec-icons",      num: "05", group: "fundamentos",  label: "Iconografia" },
  { id: "sec-components", num: "06", group: "componentes",  label: "Componentes" },
  { id: "sec-mobile",     num: "07", group: "componentes",  label: "Padrões mobile" },
  { id: "sec-logo",       num: "08", group: "marca",        label: "Logo & Marca" },
  { id: "sec-states",     num: "09", group: "marca",        label: "Estados & Feedback" },
];

const Sidebar = ({ active, onJump }) => {
  const groups = [
    { key: "intro",       title: "00 · Início" },
    { key: "fundamentos", title: "01 · Fundamentos" },
    { key: "componentes", title: "02 · Componentes" },
    { key: "marca",       title: "03 · Marca & Estados" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__brand-mark">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 19 17.5 6.5M9 6h9.5a.5.5 0 0 1 .5.5V16" stroke="var(--asfalto-950)" strokeWidth="3.2" strokeLinecap="square"/>
          </svg>
        </div>
        <div>
          <div className="sidebar__brand-name">rumo<span style={{ color: "var(--lima-400)" }}>.</span></div>
          <div className="sidebar__brand-tag">Design System</div>
        </div>
      </div>

      {groups.map(g => (
        <div key={g.key} className="sidebar__group">
          <div className="sidebar__group-title">{g.title}</div>
          <nav className="sidebar__nav">
            {SECTIONS.filter(s => s.group === g.key).map(s => (
              <button
                key={s.id}
                className={`sidebar__link ${active === s.id ? "is-active" : ""}`}
                onClick={() => onJump(s.id)}
              >
                <span className="sidebar__num">{s.num}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </div>
      ))}

      <div className="sidebar__footer">
        v0.1 · Abr 2026<br/>
        Bricolage Grotesque<br/>
        Construído para o sol.
      </div>
    </aside>
  );
};

const App = () => {
  const [active, setActive] = React.useState("sec-cover");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="app">
      <Sidebar active={active} onJump={jump}/>
      <main className="main">
        <SectionCover/>
        <SectionColors/>
        <SectionType/>
        <SectionSpacing/>
        <SectionIcons/>
        <SectionComponents/>
        <SectionMobile/>
        <SectionLogo/>
        <SectionStates/>
      </main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
