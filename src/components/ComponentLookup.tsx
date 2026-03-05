import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ComponentInfo } from '../hooks/useWiringData';
import { WireColourBadge } from './WireColourBadge';

interface Props {
  componentMap: Map<string, ComponentInfo>;
}

export function ComponentLookup({ componentMap }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allComps = useMemo(() => Array.from(componentMap.values()), [componentMap]);

  const filtered = useMemo(() => {
    if (!search) return allComps;
    const q = search.toLowerCase();
    return allComps.filter(c =>
      c.id.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  }, [allComps, search]);

  const selected = selectedId ? componentMap.get(selectedId) : null;

  return (
    <div className="component-lookup">
      <input
        type="text"
        placeholder={t('components.searchPlaceholder')}
        value={search}
        onChange={e => { setSearch(e.target.value); setSelectedId(null); }}
        className="filter-input filter-input--wide"
      />

      <div className="component-layout">
        <div className="component-list">
          {filtered.map(c => (
            <button
              key={c.id}
              className={`component-item ${selectedId === c.id ? 'component-item--active' : ''}`}
              onClick={() => setSelectedId(c.id)}
            >
              <span className="component-id">{c.id}</span>
              <span className="component-desc">{c.description}</span>
              <span className="component-wire-count">{t('components.wiresCount', { count: c.wires.length })}</span>
            </button>
          ))}
          {filtered.length === 0 && <div className="empty">{t('components.noResults')}</div>}
        </div>

        {selected && (
          <div className="component-detail">
            <h3>{selected.id} – {selected.description}</h3>
            {selected.track && <p className="mono">{t('components.track')}: {selected.track}</p>}
            <p>{t('components.circuits')}: {selected.circuits.map(c => c.replace(/_/g, ' ')).join(', ')}</p>

            <h4>{t('components.connectedWires', { count: selected.wires.length })}</h4>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>{t('components.colFrom')}</th>
                    <th>{t('components.colTo')}</th>
                    <th>{t('components.colWire')}</th>
                    <th>{t('components.colCircuit')}</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.wires.map(w => (
                    <tr key={w.id}>
                      <td className="mono">{w.id}</td>
                      <td className="mono">{w.from_component}{w.from_terminal ? ` (${w.from_terminal})` : ''}</td>
                      <td className="mono">{w.to_component}{w.to_terminal ? ` (${w.to_terminal})` : ''}</td>
                      <td>
                        <WireColourBadge
                          colourMain={w.colour_main}
                          colourStripe={w.colour_stripe}
                          mm2={w.mm2}
                          colourCode={w.colour_code}
                        />
                      </td>
                      <td>{w.circuit.replace(/_/g, ' ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
