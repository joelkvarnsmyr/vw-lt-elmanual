import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { WireEntry, CompleteDatabase } from '../types';
import { WireColourBadge } from './WireColourBadge';

interface Props {
  wires: WireEntry[];
  colourCodes: CompleteDatabase['meta']['colour_code'] | null;
  allColours: string[];
  allDimensions: number[];
  filterCircuit?: string;
}

export function WireTable({ wires, colourCodes, allColours, allDimensions, filterCircuit }: Props) {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [colourFilter, setColourFilter] = useState('');
  const [dimFilter, setDimFilter] = useState('');
  const [manualCircuitFilter, setManualCircuitFilter] = useState('');
  const effectiveCircuitFilter = filterCircuit ?? manualCircuitFilter;

  const circuits = useMemo(() => {
    const s = new Set(wires.map(w => w.circuit));
    return Array.from(s).sort();
  }, [wires]);

  const filtered = useMemo(() => {
    return wires.filter(w => {
      if (colourFilter && w.colour_main !== colourFilter) return false;
      if (dimFilter && w.mm2 !== Number(dimFilter)) return false;
      if (effectiveCircuitFilter && w.circuit !== effectiveCircuitFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const haystack = `${w.id} ${w.from_component} ${w.to_component} ${w.colour_code || ''} ${w.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [wires, search, colourFilter, dimFilter, effectiveCircuitFilter]);

  const colourName = (code: string) => {
    if (!colourCodes || !colourCodes[code]) return code;
    return `${colourCodes[code].sv} (${code})`;
  };

  return (
    <div className="wire-table">
      <div className="wire-table__filters">
        <input
          type="text"
          placeholder={t('wires.searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="filter-input"
        />
        <select value={colourFilter} onChange={e => setColourFilter(e.target.value)} className="filter-select" aria-label={t('wires.allColours')}>
          <option value="">{t('wires.allColours')}</option>
          {allColours.map(c => (
            <option key={c} value={c}>{colourName(c)}</option>
          ))}
        </select>
        <select value={dimFilter} onChange={e => setDimFilter(e.target.value)} className="filter-select" aria-label={t('wires.allDimensions')}>
          <option value="">{t('wires.allDimensions')}</option>
          {allDimensions.map(d => (
            <option key={d} value={d}>{d} mm²</option>
          ))}
        </select>
        {!filterCircuit && (
          <select value={manualCircuitFilter} onChange={e => setManualCircuitFilter(e.target.value)} className="filter-select" aria-label={t('wires.allCircuits')}>
            <option value="">{t('wires.allCircuits')}</option>
            {circuits.map(c => (
              <option key={c} value={c}>{c.replace(/_/g, ' ')}</option>
            ))}
          </select>
        )}
      </div>
      <div className="wire-table__count">{t('wires.count', { count: filtered.length })}</div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>{t('wires.colFrom')}</th>
              <th>{t('wires.colTo')}</th>
              <th>{t('wires.colWire')}</th>
              <th>{t('wires.colCircuit')}</th>
              <th>{t('wires.colDesc')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => (
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
                <td>{w.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
