import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n, { type Language } from './i18n/index';
import { useWiringData } from './hooks/useWiringData';
import Layout from './components/Layout';
import { CircuitBrowser } from './components/CircuitBrowser';
import { WireTable } from './components/WireTable';
import { ComponentLookup } from './components/ComponentLookup';
import { EarthPoints } from './components/EarthPoints';
import { BlogView } from './components/BlogView';
import { PDM25View } from './components/PDM25View';

type View = 'circuits' | 'wires' | 'components' | 'earth' | 'blog' | 'pdm25';
type Theme = 'dark' | 'light';

function getInitialView(): View {
  const params = new URLSearchParams(window.location.search);
  if (params.get('view') === 'pdm25') return 'pdm25';
  return 'circuits';
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('vw-lt-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

function App() {
  const { t } = useTranslation();
  const data = useWiringData();
  const [view, setView] = useState<View>(getInitialView);
  const [selectedCircuit, setSelectedCircuit] = useState<string>('');
  const [pdmCircuit, setPdmCircuit] = useState<string>('');
  const [pdmSubView, setPdmSubView] = useState<'circuits' | 'inputs' | 'outputs' | 'kablar' | 'overview'>('overview');
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [lang, setLang] = useState<Language>(() => (i18n.language as Language) ?? 'sv');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vw-lt-theme', theme);
  }, [theme]);

  // Force light mode when printing — restore after
  useEffect(() => {
    const onBeforePrint = () => {
      document.documentElement.setAttribute('data-theme', 'light');
    };
    const onAfterPrint = () => {
      document.documentElement.setAttribute('data-theme', theme);
    };
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, [theme]);

  // Sync ?view=pdm25 with URL without full navigation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (view === 'pdm25' && params.get('view') !== 'pdm25') {
      params.set('view', 'pdm25');
      window.history.replaceState({}, '', `?${params}`);
    } else if (view !== 'pdm25' && params.get('view') === 'pdm25') {
      params.delete('view');
      const qs = params.toString();
      window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
    }
  }, [view]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const toggleLang = useCallback(() => {
    const next: Language = lang === 'sv' ? 'en' : 'sv';
    i18n.changeLanguage(next);
    localStorage.setItem('vw-lt-lang', next);
    setLang(next);
  }, [lang]);

  if (data.loading) {
    return <div className="loading">{t('loading')}</div>;
  }
  if (data.error || !data.lookup) {
    return <div className="loading error">{t('loadError', { error: data.error })}</div>;
  }

  const circuitKeys = Object.keys(data.lookup.circuits_index);

  const sidebar = view === 'circuits' ? (
    <div className="circuit-sidebar">
      <h3>{t('circuitsSidebarTitle', { count: circuitKeys.length })}</h3>
      {circuitKeys.map(key => {
        const info = data.lookup!.circuits_index[key];
        return (
          <button
            key={key}
            className={`sidebar-item ${selectedCircuit === key ? 'sidebar-item--active' : ''}`}
            onClick={() => setSelectedCircuit(key)}
          >
            <span className="sidebar-item__name">{key.replace(/_/g, ' ')}</span>
            <span className="sidebar-item__rail">{info.power_rail}</span>
          </button>
        );
      })}
    </div>
  ) : null;

  return (
    <Layout
      currentView={view}
      onViewChange={setView}
      sidebar={sidebar}
      theme={theme}
      onThemeToggle={toggleTheme}
      lang={lang}
      onLangToggle={toggleLang}
    >
      {view === 'circuits' && (
        selectedCircuit ? (
          <CircuitBrowser
            selectedCircuit={selectedCircuit}
            lookup={data.lookup}
            complete={data.complete}
            wiresByCircuit={data.wiresByCircuit}
            allColours={data.allColours}
            allDimensions={data.allDimensions}
            componentMap={data.componentMap}
            theme={theme}
          />
        ) : (
          <div className="panel welcome">
            <h2>{t('welcome.heading')}</h2>
            <p>{t('welcome.body')}</p>
          </div>
        )
      )}
      {view === 'wires' && (
        <div className="panel">
          <h2>{t('views.wires')}</h2>
          <WireTable
            wires={data.lookup.wires}
            colourCodes={data.complete?.meta.colour_code || null}
            allColours={data.allColours}
            allDimensions={data.allDimensions}
          />
        </div>
      )}
      {view === 'components' && (
        <div className="panel">
          <h2>{t('views.components')}</h2>
          <ComponentLookup componentMap={data.componentMap} />
        </div>
      )}
      {view === 'earth' && data.complete && (
        <div className="panel">
          <h2>{t('views.earth')}</h2>
          <EarthPoints complete={data.complete} />
        </div>
      )}
      {view === 'blog' && (
        <div className="panel">
          <h2>{t('blog.heading')}</h2>
          <BlogView />
        </div>
      )}
      {view === 'pdm25' && (
        <PDM25View
          selectedCircuit={pdmCircuit}
          onCircuitChange={setPdmCircuit}
          subView={pdmSubView}
          onSubViewChange={setPdmSubView}
        />
      )}
    </Layout>
  );
}

export default App;
