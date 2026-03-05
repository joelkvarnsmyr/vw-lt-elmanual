import { useState, useEffect, useCallback } from 'react';
import { useWiringData } from './hooks/useWiringData';
import Layout from './components/Layout';
import { CircuitBrowser } from './components/CircuitBrowser';
import { WireTable } from './components/WireTable';
import { ComponentLookup } from './components/ComponentLookup';
import { EarthPoints } from './components/EarthPoints';

type View = 'circuits' | 'wires' | 'components' | 'earth';
type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('vw-lt-theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

function App() {
  const data = useWiringData();
  const [view, setView] = useState<View>('circuits');
  const [selectedCircuit, setSelectedCircuit] = useState<string>('');
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vw-lt-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  if (data.loading) {
    return <div className="loading">Laddar kopplingsdata…</div>;
  }
  if (data.error || !data.lookup) {
    return <div className="loading error">Fel vid laddning: {data.error}</div>;
  }

  const circuitKeys = Object.keys(data.lookup.circuits_index);

  const sidebar = view === 'circuits' ? (
    <div className="circuit-sidebar">
      <h3>Kretsar ({circuitKeys.length})</h3>
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
    <Layout currentView={view} onViewChange={setView} sidebar={sidebar} theme={theme} onThemeToggle={toggleTheme}>
      {view === 'circuits' && (
        selectedCircuit ? (
          <CircuitBrowser
            selectedCircuit={selectedCircuit}
            lookup={data.lookup}
            complete={data.complete}
            wiresByCircuit={data.wiresByCircuit}
            allColours={data.allColours}
            allDimensions={data.allDimensions}
          />
        ) : (
          <div className="panel welcome">
            <h2>Välj en krets</h2>
            <p>Klicka på en krets i sidomenyn för att visa kopplingsschema och kabellista.</p>
          </div>
        )
      )}
      {view === 'wires' && (
        <div className="panel">
          <h2>Kabelsök</h2>
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
          <h2>Komponentregister</h2>
          <ComponentLookup componentMap={data.componentMap} />
        </div>
      )}
      {view === 'earth' && data.complete && (
        <div className="panel">
          <h2>Jordpunkter</h2>
          <EarthPoints complete={data.complete} />
        </div>
      )}
    </Layout>
  );
}

export default App;
