import { type ReactNode } from 'react';

type View = 'circuits' | 'wires' | 'components' | 'earth';

interface Props {
  currentView: View;
  onViewChange: (v: View) => void;
  sidebar: ReactNode;
  children: ReactNode;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
}

const NAV_ITEMS: { id: View; label: string }[] = [
  { id: 'circuits', label: 'Kretsar' },
  { id: 'wires', label: 'Kabelsök' },
  { id: 'components', label: 'Komponenter' },
  { id: 'earth', label: 'Jordpunkter' },
];

function NavIcon({ view }: { view: View }) {
  if (view === 'circuits') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-icon">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }
  if (view === 'wires') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-icon">
        <path d="M6 6h4v4H6zM14 14h4v4h-4zM10 8h4M14 8v6M10 14h4" />
      </svg>
    );
  }
  if (view === 'components') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-icon">
        <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-icon">
      <path d="M12 3v8M8 7h8M4 14h16M7 14l1 7h8l1-7" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function Layout({ currentView, onViewChange, sidebar, children, theme, onThemeToggle }: Props) {
  return (
    <div className="layout">
      <header className="header">
        <img src="/vw-logo.svg" className="header__vw-logo" alt="VW" />
        <img src="/logo.svg" className="header__logo" alt="Hannas LT" />
        <div className="header__divider" aria-hidden />
        <div className="header__wordmark">
          <span className="header__title">VW LT Elmanual</span>
          <span className="header__subtitle">1976–1987 · Kopplingsschema</span>
        </div>
        <nav className="header__nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-btn ${currentView === item.id ? 'nav-btn--active' : ''}`}
              onClick={() => onViewChange(item.id)}
            >
              <NavIcon view={item.id} />
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          title={theme === 'dark' ? 'Byt till ljust läge' : 'Byt till mörkt läge'}
          aria-label="Växla tema"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>
      <div className="main">
        {sidebar && <aside className="sidebar">{sidebar}</aside>}
        <section className="content">{children}</section>
      </div>
    </div>
  );
}

export default Layout;
