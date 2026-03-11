import { type ReactNode, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Language } from '../i18n/index';

const MCP_URL = 'https://vw-lt-mcp.vercel.app/mcp';

type View = 'circuits' | 'wires' | 'components' | 'earth' | 'blog' | 'pdm25';

interface Props {
  currentView: View;
  onViewChange: (v: View) => void;
  sidebar: ReactNode;
  children: ReactNode;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  lang: Language;
  onLangToggle: () => void;
}

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
  if (view === 'blog') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="nav-icon">
        <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />
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

const AI_CLIENTS: { name: string; url: string; howKey: string }[] = [
  { name: 'Claude', url: 'https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp', howKey: 'footer.howClaude' },
  { name: 'ChatGPT', url: 'https://platform.openai.com/docs/guides/tools-connectors-mcp', howKey: 'footer.howChatGPT' },
  { name: 'Grok', url: 'https://docs.x.ai/docs/guides/tools/remote-mcp-tools', howKey: 'footer.howGrok' },
  { name: 'Cursor', url: 'https://cursor.com/docs/context/mcp', howKey: 'footer.howCursor' },
  { name: 'Claude Code', url: 'https://code.claude.com/docs/en/mcp', howKey: 'footer.howClaudeCode' },
];

function McpSection() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const copyUrl = useCallback(() => {
    navigator.clipboard.writeText(MCP_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <div className="mcp-section">
      <div className="mcp-section__header">
        <svg viewBox="0 0 24 24" className="mcp-section__icon" aria-hidden="true">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1.27c.34-.6.99-1 1.73-1a2 2 0 1 1 0 4c-.74 0-1.39-.4-1.73-1H20a7 7 0 0 1-7 7v1.27c.6.34 1 .99 1 1.73a2 2 0 1 1-4 0c0-.74.4-1.39 1-1.73V23a7 7 0 0 1-7-7H2.73c-.34.6-.99 1-1.73 1a2 2 0 1 1 0-4c.74 0 1.39.4 1.73 1H4a7 7 0 0 1 7-7V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        </svg>
        <h4>{t('footer.aiTitle')}</h4>
      </div>
      <p className="mcp-section__desc">{t('footer.aiDesc')}</p>

      <div className="mcp-section__url-block">
        <span className="mcp-section__url-label">{t('footer.aiUrl')}</span>
        <div className="mcp-section__url-row">
          <code className="mcp-section__url">{MCP_URL}</code>
          <button className="mcp-section__copy" onClick={copyUrl}>
            {copied ? t('footer.aiCopied') : t('footer.aiCopy')}
          </button>
        </div>
      </div>

      <div className="mcp-section__clients">
        <span className="mcp-section__clients-label">{t('footer.aiClients')}</span>
        <div className="mcp-section__clients-list">
          {AI_CLIENTS.map(client => (
            <div key={client.name} className="mcp-client-card">
              <div className="mcp-client-card__header">
                <span className="mcp-client-card__name">{client.name}</span>
                <a
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mcp-client-card__docs"
                >{t('footer.aiDocsLink')}</a>
              </div>
              <p className="mcp-client-card__how">{t(client.howKey)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mcp-section__examples-block">
        <h5>{t('footer.aiExamples')}</h5>
        <ul className="mcp-section__examples">
          <li>{t('footer.aiEx1')}</li>
          <li>{t('footer.aiEx2')}</li>
          <li>{t('footer.aiEx3')}</li>
          <li>{t('footer.aiEx4')}</li>
        </ul>
      </div>
    </div>
  );
}

export function Layout({ currentView, onViewChange, sidebar, children, theme, onThemeToggle, lang, onLangToggle }: Props) {
  const { t } = useTranslation();

  const NAV_ITEMS: { id: View; label: string }[] = [
    { id: 'circuits', label: t('nav.circuits') },
    { id: 'wires', label: t('nav.wires') },
    { id: 'components', label: t('nav.components') },
    { id: 'earth', label: t('nav.earth') },
    { id: 'blog', label: t('nav.blog') },
  ];

  return (
    <div className="layout">
      <header className="header">
        <img src="/vw-logo.svg" className="header__vw-logo" alt="VW" />
        <img src="/logo.svg" className="header__logo" alt="Hannas LT" />
        <div className="header__divider" aria-hidden />
        <div className="header__wordmark">
          <span className="header__title">VW LT Elmanual</span>
          <span className="header__subtitle">{t('header.subtitle')}</span>
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
          className="lang-toggle"
          onClick={onLangToggle}
          title={t('header.switchLang')}
          aria-label={t('header.switchLang')}
        >
          {/* Show the flag of the OTHER language (the one you'd switch to) */}
          <span className={`fi fi-${lang === 'sv' ? 'gb' : 'se'}`} />
        </button>
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          title={theme === 'dark' ? t('header.themeToLight') : t('header.themeToDark')}
          aria-label={t('header.themeLabel')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </header>
      <div className="main">
        {sidebar && <aside className="sidebar">{sidebar}</aside>}
        <section className="content">
          {children}
          <footer className="app-footer">
            <McpSection />
            <div className="app-footer__credit">
              {t('footer.createdBy', { name: 'Joel Kvarnsmyr' })} — <a href="mailto:joel@kvarnsmyr.se">joel@kvarnsmyr.se</a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Layout;
