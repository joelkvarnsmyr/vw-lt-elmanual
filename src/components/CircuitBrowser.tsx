import type { WireLookupData, CompleteDatabase, WireEntry } from '../types';
import { CIRCUIT_DIAGRAM_MAP } from '../types';
import { MermaidDiagram } from './MermaidDiagram';
import { WireTable } from './WireTable';

interface Props {
  selectedCircuit: string;
  lookup: WireLookupData;
  complete: CompleteDatabase | null;
  wiresByCircuit: Map<string, WireEntry[]>;
  allColours: string[];
  allDimensions: number[];
}

export function CircuitBrowser({ selectedCircuit, lookup, complete, wiresByCircuit, allColours, allDimensions }: Props) {
  const info = lookup.circuits_index[selectedCircuit];
  const wires = wiresByCircuit.get(selectedCircuit) || [];
  const diagramFile = CIRCUIT_DIAGRAM_MAP[selectedCircuit];

  if (!info) return <div className="panel">Välj en krets i sidomenyn.</div>;

  return (
    <div className="circuit-browser">
      <div className="circuit-header">
        <h2>{selectedCircuit.replace(/_/g, ' ')}</h2>
        <div className="circuit-meta">
          <span className="tag">Skena: {info.power_rail}</span>
          {info.fuse && <span className="tag tag--fuse">Säkring: {info.fuse}</span>}
        </div>
        <p className="circuit-desc">{info.description}</p>
      </div>

      {diagramFile && (
        <details className="diagram-section" open>
          <summary>Kopplingsschema</summary>
          <MermaidDiagram diagramFile={diagramFile} />
        </details>
      )}

      <details open>
        <summary>Kablar i denna krets ({wires.length})</summary>
        <WireTable
          wires={wires}
          colourCodes={complete?.meta.colour_code || null}
          allColours={allColours}
          allDimensions={allDimensions}
          filterCircuit={selectedCircuit}
        />
      </details>
    </div>
  );
}
