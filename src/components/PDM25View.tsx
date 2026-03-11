import { useEffect, useState } from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import type { WireEntry } from '../types';
import { WireTable } from './WireTable';

interface PdmOutput {
  id: string;
  label: string;
  pin: string;
  pdm_name?: string;
  fuse_a?: number | null;
  high_fuse_A?: number | null;
  function?: string | null;
  description?: string;
  note?: string;
  mode?: string;
  loads?: string[];
  load_terminal?: string;
  cable_label?: string;
  cable_mm2?: number;
  cable_colour?: string;
}

interface PdmInput {
  id: string;
  label: string;
  pin: string;
  type: string;
  mode?: string;
  source_component: string;
  source_terminal?: string;
  source_description?: string;
  note?: string;
  cable_label?: string;
  cable_mm2?: number;
  cable_colour?: string;
}

interface CircuitEntry {
  label: string;
  description: string;
  diagram?: string;
  outputs: string[];
  inputs: string[];
}

interface PdmData {
  _description: string;
  vehicle: { make: string; model: string; year: number; registration: string; engine_code: string };
  pdm: { model: string; outputs: number; inputs: number; main_cable_mm2: number };
  inputs: PdmInput[];
  outputs: PdmOutput[];
  circuits_index: Record<string, CircuitEntry>;
  timers: Array<{ id: string; label: string; description: string }>;
  generic_functions: Array<{ id: string; label: string; function: string; description: string }>;
}

type SubView = 'circuits' | 'inputs' | 'outputs' | 'kablar' | 'overview';

interface Props {
  selectedCircuit: string;
  onCircuitChange: (key: string) => void;
  subView: SubView;
  onSubViewChange: (v: SubView) => void;
}

export function PDM25View({ selectedCircuit, onCircuitChange, subView, onSubViewChange }: Props) {
  const [data, setData] = useState<PdmData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/pdm25/pdm25_installation.json')
      .then(r => { if (!r.ok) throw new Error('Kunde inte ladda PDM25-data'); return r.json(); })
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) return <div className="panel"><p className="mermaid-error">{error}</p></div>;
  if (!data) return <div className="loading">Laddar PDM25-data…</div>;

  const circuit = selectedCircuit ? data.circuits_index[selectedCircuit] : null;

  return (
    <div className="pdm-view">
      <div className="pdm-subnav">
        {(['circuits', 'inputs', 'outputs', 'kablar', 'overview'] as SubView[]).map(v => (
          <button
            key={v}
            className={`pdm-subnav__btn ${subView === v ? 'pdm-subnav__btn--active' : ''}`}
            onClick={() => onSubViewChange(v)}
          >
            {v === 'circuits' ? 'Kretsar' : v === 'inputs' ? 'Inputs' : v === 'outputs' ? 'Outputs' : v === 'kablar' ? 'Kablar' : 'Översikt'}
          </button>
        ))}
      </div>

      {subView === 'overview' && (
        <div className="panel pdm-overview">
          <div className="pdm-overview__header">
            <h2>PDM25 V2 – Elinstallation</h2>
            <p className="pdm-overview__vehicle">
              {data.vehicle.year} {data.vehicle.make} {data.vehicle.model} · {data.vehicle.registration} · Motor {data.vehicle.engine_code}
            </p>
          </div>
          <div className="pdm-overview__stats">
            <div className="pdm-stat">
              <span className="pdm-stat__value">{data.outputs.filter(o => o.fuse_a).length}</span>
              <span className="pdm-stat__label">Aktiva outputs</span>
            </div>
            <div className="pdm-stat">
              <span className="pdm-stat__value">{data.inputs.length}</span>
              <span className="pdm-stat__label">Inputs</span>
            </div>
            <div className="pdm-stat">
              <span className="pdm-stat__value">{data.pdm.main_cable_mm2}mm²</span>
              <span className="pdm-stat__label">Huvudkabel</span>
            </div>
            <div className="pdm-stat">
              <span className="pdm-stat__value">{Object.keys(data.circuits_index).length}</span>
              <span className="pdm-stat__label">Kretsar</span>
            </div>
          </div>
          <div className="pdm-overview__logic">
            <h3>Logikblock</h3>
            <div className="pdm-logic-grid">
              {data.timers.map(t => (
                <div key={t.id} className="pdm-logic-card">
                  <span className="pdm-logic-card__id">{t.id}</span>
                  <span className="pdm-logic-card__label">{t.label}</span>
                  <span className="pdm-logic-card__desc">{t.description}</span>
                </div>
              ))}
              {data.generic_functions.map(gf => (
                <div key={gf.id} className="pdm-logic-card">
                  <span className="pdm-logic-card__id">{gf.id}</span>
                  <span className="pdm-logic-card__label">{gf.label}</span>
                  <span className="pdm-logic-card__desc">{gf.description}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pdm-overview__diagram">
            <h3>Systemöversikt</h3>
            <MermaidDiagram diagramFile="pdm25_00_overview.mermaid" basePath="/data/pdm25" />
          </div>
        </div>
      )}

      {subView === 'circuits' && (
        <div className="pdm-circuits">
          <div className="pdm-circuit-list">
            {Object.entries(data.circuits_index).map(([key, c]) => (
              <button
                key={key}
                className={`pdm-circuit-item ${selectedCircuit === key ? 'pdm-circuit-item--active' : ''}`}
                onClick={() => onCircuitChange(key)}
              >
                <span className="pdm-circuit-item__label">{c.label}</span>
                <span className="pdm-circuit-item__badges">
                  {c.outputs.length > 0 && <span className="tag tag--out">O:{c.outputs.length}</span>}
                  {c.inputs.length > 0 && <span className="tag tag--in">I:{c.inputs.length}</span>}
                </span>
              </button>
            ))}
          </div>
          <div className="pdm-circuit-detail">
            {circuit ? (
              <>
                <div className="pdm-circuit-detail__header">
                  <h2>{circuit.label}</h2>
                  <p>{circuit.description}</p>
                  <div className="pdm-circuit-detail__io">
                    {circuit.outputs.map(o => <span key={o} className="tag tag--out">{o}</span>)}
                    {circuit.inputs.map(i => <span key={i} className="tag tag--in">{i}</span>)}
                  </div>
                </div>
                {circuit.diagram ? (
                  <MermaidDiagram diagramFile={circuit.diagram} basePath="/data/pdm25" />
                ) : (
                  <div className="panel">
                    <p style={{ color: 'var(--text-muted)' }}>Inget separat diagram för denna krets.</p>
                  </div>
                )}
              </>
            ) : (
              <div className="panel welcome">
                <h2>Välj en krets</h2>
                <p>Klicka på en krets till vänster för att visa diagram och kopplingsinfo.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {subView === 'inputs' && (
        <div className="panel pdm-table-panel">
          <h2>PDM25 Inputs (I1–I16)</h2>
          <div className="pdm-table-wrap">
            <table className="pdm-table">
              <thead>
                <tr>
                  <th>ID</th><th>Label</th><th>Pin</th><th>Typ</th><th>Läge</th><th>Källa</th><th>Beskrivning</th>
                </tr>
              </thead>
              <tbody>
                {data.inputs.map(inp => (
                  <tr key={inp.id}>
                    <td><code>{inp.id}</code></td>
                    <td><strong>{inp.label}</strong></td>
                    <td><code>{inp.pin}</code></td>
                    <td>{inp.type}</td>
                    <td>{inp.mode ?? '—'}</td>
                    <td><code>{inp.source_component}</code></td>
                    <td className="pdm-table__desc">{inp.source_description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subView === 'outputs' && (
        <div className="panel pdm-table-panel">
          <h2>PDM25 Outputs (O1–O25)</h2>
          <div className="pdm-table-wrap">
            <table className="pdm-table">
              <thead>
                <tr>
                  <th>ID</th><th>Label</th><th>Pin</th><th>Säkring</th><th>Funktion</th><th>Beskrivning</th>
                </tr>
              </thead>
              <tbody>
                {data.outputs.map(out => (
                  <tr key={out.id} className={!out.fuse_a && !out.high_fuse_A ? 'pdm-table__row--dim' : ''}>
                    <td><code>{out.id}</code></td>
                    <td><strong>{out.label || out.pdm_name}</strong></td>
                    <td><code>{out.pin}</code></td>
                    <td>{out.fuse_a || out.high_fuse_A ? `${out.fuse_a || out.high_fuse_A}A` : <span style={{ color: 'var(--text-muted)' }}>Reserv</span>}</td>
                    <td><code className="pdm-function">{out.function ?? '—'}</code></td>
                    <td className="pdm-table__desc">{out.description || out.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subView === 'kablar' && (() => {
        // Transform PDM inputs/outputs to WireEntry for the WireTable
        
        const pdmWires: WireEntry[] = [];
        
        // Helper to parse colour
        const parseCol = (c?: string) => {
          if (!c) return { main: null, stripe: null };
          const parts = c.split('/');
          return { main: parts[0] || null, stripe: parts[1] || null };
        };

        let wId = 1;

        data.inputs.forEach(inp => {
          if (!inp.cable_label) return;
          const { main, stripe } = parseCol(inp.cable_colour);
          pdmWires.push({
            id: `W-IN-${wId++}`,
            figure: 'PDM25',
            from_component: inp.source_component,
            from_terminal: inp.source_terminal || null,
            to_component: 'PDM25',
            to_terminal: inp.pin,
            wire_id: inp.cable_label,
            mm2: inp.cable_mm2 || null,
            colour_main: main,
            colour_stripe: stripe,
            colour_code: inp.cable_colour || null,
            track: null,
            circuit: 'pdm_input',
            description: inp.source_description || inp.note || '',
            confidence: 'high'
          });
        });

        data.outputs.forEach(out => {
          if (!out.cable_label) return;
          const { main, stripe } = parseCol(out.cable_colour);
          pdmWires.push({
            id: `W-OUT-${wId++}`,
            figure: 'PDM25',
            from_component: 'PDM25',
            from_terminal: out.pin,
            to_component: (out.loads || []).join(', ') || '?',
            to_terminal: out.load_terminal || null,
            wire_id: out.cable_label,
            mm2: out.cable_mm2 || null,
            colour_main: main,
            colour_stripe: stripe,
            colour_code: out.cable_colour || null,
            track: null,
            circuit: 'pdm_output',
            description: out.description || out.note || '',
            confidence: 'high'
          });
        });

        const allColours = Array.from(new Set(pdmWires.flatMap(w => [w.colour_main, w.colour_stripe]).filter(Boolean))) as string[];
        const allDimensions = Array.from(new Set(pdmWires.map(w => w.mm2).filter(Boolean))).sort((a,b) => a! - b!) as number[];

        return (
          <div className="panel print-friendly">
            <h2>Kabelmärkning (PDM25)</h2>
            <p className="print-hide">Detta är en genererad lista över alla kablar till/från PDM25. Listan är utskriftsvänlig.</p>
            <WireTable 
              wires={pdmWires}
              colourCodes={null} // We don't have descriptions in JSON easily mapped, fallback to codes
              allColours={allColours}
              allDimensions={allDimensions}
            />
          </div>
        );
      })()}
    </div>
  );
}
