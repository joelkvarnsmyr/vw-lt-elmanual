import type { WireLookupData, CompleteDatabase, WireEntry } from '../types';
import { CIRCUIT_DIAGRAM_MAP } from '../types';
import { MermaidDiagram } from './MermaidDiagram';
import { WireTable } from './WireTable';
import { useTranslation } from 'react-i18next';
import type { ComponentInfo } from '../hooks/useWiringData';

interface Props {
  selectedCircuit: string;
  lookup: WireLookupData;
  complete: CompleteDatabase | null;
  wiresByCircuit: Map<string, WireEntry[]>;
  allColours: string[];
  allDimensions: number[];
  componentMap: Map<string, ComponentInfo>;
  theme?: 'dark' | 'light';
}

export function CircuitBrowser({ selectedCircuit, lookup, complete, wiresByCircuit, allColours, allDimensions, componentMap, theme }: Props) {
  const { t } = useTranslation();
  const info = lookup.circuits_index[selectedCircuit];
  const wires = wiresByCircuit.get(selectedCircuit) || [];
  const diagramFile = CIRCUIT_DIAGRAM_MAP[selectedCircuit];

  if (!info) return <div className="panel">{t('circuit.noSelection')}</div>;

  return (
    <div className="circuit-browser">
      <div className="circuit-header">
        <h2>{selectedCircuit.replace(/_/g, ' ')}</h2>
        <div className="circuit-meta">
          <span className="tag">{t('circuit.rail')}: {info.power_rail}</span>
          {info.fuse && <span className="tag tag--fuse">{t('circuit.fuse')}: {info.fuse}</span>}
        </div>
        <p className="circuit-desc">{info.description}</p>
      </div>

      {diagramFile && (
        <details className="diagram-section" open>
          <summary>{t('circuit.diagram')}</summary>
          <MermaidDiagram diagramFile={diagramFile} componentMap={componentMap} wires={wires} theme={theme} />
        </details>
      )}

      <details open>
        <summary>{t('circuit.wiresInCircuit', { count: wires.length })}</summary>
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
