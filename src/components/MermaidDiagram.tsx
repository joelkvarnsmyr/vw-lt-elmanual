import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import mdiIcons from '@iconify-json/mdi/icons.json';
import type { ComponentInfo } from '../hooks/useWiringData';
import { WireColourBadge } from './WireColourBadge';

const mermaidWithIcons = mermaid as typeof mermaid & {
  registerIconPacks?: (packs: Array<{ name: string; loader: () => Promise<unknown> }>) => void;
};

let iconPackRegistered = false;
if (!iconPackRegistered && typeof mermaidWithIcons.registerIconPacks === 'function') {
  mermaidWithIcons.registerIconPacks([
    { name: 'mdi', loader: async () => mdiIcons },
  ]);
  iconPackRegistered = true;
}

const DARK_THEME = {
  background: '#08080c',
  primaryColor: '#18181f',
  primaryBorderColor: 'rgba(208,174,120,0.28)',
  primaryTextColor: '#ece8e0',
  secondaryColor: '#111118',
  tertiaryColor: '#0d0d13',
  lineColor: 'rgba(208,174,120,0.50)',
  edgeLabelBackground: '#111118',
  clusterBkg: '#111118',
  clusterBorder: 'rgba(255,255,255,0.08)',
  titleColor: '#d0ae78',
  nodeBorder: 'rgba(208,174,120,0.30)',
  nodeTextColor: '#ece8e0',
  fontFamily: "'Outfit', -apple-system, sans-serif",
  fontSize: '13px',
};

const LIGHT_THEME = {
  background: '#f9f7f4',
  primaryColor: '#fff',
  primaryBorderColor: 'rgba(158,124,60,0.30)',
  primaryTextColor: '#1c1a17',
  secondaryColor: '#f4f1ec',
  tertiaryColor: '#eae6df',
  lineColor: 'rgba(158,124,60,0.50)',
  edgeLabelBackground: '#f4f1ec',
  clusterBkg: '#f4f1ec',
  clusterBorder: 'rgba(0,0,0,0.08)',
  titleColor: '#9e7c3c',
  nodeBorder: 'rgba(158,124,60,0.35)',
  nodeTextColor: '#1c1a17',
  fontFamily: "'Outfit', -apple-system, sans-serif",
  fontSize: '13px',
};

function getCurrentTheme(): 'dark' | 'light' {
  return (document.documentElement.getAttribute('data-theme') as 'light') || 'dark';
}

interface Props {
  diagramFile: string;
  componentMap?: Map<string, ComponentInfo>;
  basePath?: string;
}

let renderCounter = 0;

function normalizeIconSyntax(code: string): string {
  return code.replace(
    /(^\s*)([A-Za-z_][A-Za-z0-9_]*)@\{[^}\n]*?(?:label:\s*"([^"]*)")?[^}\n]*\}\s*$/gm,
    (_match, indent: string, id: string, label?: string) => `${indent}${id}["${label || id}"]`
  );
}

function extractComponentId(nodeId: string): string | null {
  // Mermaid generates IDs like "flowchart-E1-42"
  const match = nodeId.match(/^flowchart-([A-Za-z_]\w*)-\d+$/);
  return match ? match[1] : null;
}

export function MermaidDiagram({ diagramFile, componentMap, basePath = '/data/diagrams' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ComponentInfo | null>(null);

  // Close popover on click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    const popover = document.querySelector('.mermaid-popover');
    if (popover && !popover.contains(e.target as Node)) {
      setSelectedNode(null);
    }
  }, []);

  useEffect(() => {
    if (selectedNode) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [selectedNode, handleClickOutside]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSelectedNode(null);

    const themeVars = getCurrentTheme() === 'light' ? LIGHT_THEME : DARK_THEME;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: themeVars,
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true, htmlLabels: true },
    });

    fetch(`${basePath}/${diagramFile}`)
      .then(r => {
        if (!r.ok) throw new Error(`Kunde inte ladda ${diagramFile}`);
        return r.text();
      })
      .then(async (code) => {
        if (cancelled || !containerRef.current) return;
        try {
          const id = `mermaid-${++renderCounter}`;
          let svg: string;
          try {
            ({ svg } = await mermaid.render(id, code));
          } catch {
            const fallback = normalizeIconSyntax(code);
            ({ svg } = await mermaid.render(`${id}-fallback`, fallback));
          }
          if (!cancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
            // Attach interactivity after SVG is in the DOM
            if (componentMap) {
              attachInteractivity(containerRef.current, componentMap);
            }
          }
        } catch (e) {
          if (!cancelled) setError(`Renderingsfel: ${(e as Error).message}`);
        }
        setLoading(false);
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [diagramFile, componentMap]);

  function attachInteractivity(container: HTMLDivElement, cMap: Map<string, ComponentInfo>) {
    const nodes = container.querySelectorAll<SVGGElement>('.node[id]');
    const tooltip = tooltipRef.current;

    nodes.forEach(node => {
      const compId = extractComponentId(node.id);
      if (!compId) return;
      const info = cMap.get(compId);
      if (!info) return;

      node.classList.add('mermaid-node-interactive');

      node.addEventListener('mouseenter', (e) => {
        node.classList.add('mermaid-node-hover');
        if (tooltip) {
          tooltip.innerHTML = `<strong>${info.id}</strong> — ${info.description}<br><span class="mermaid-tooltip__wires">${info.wires.length} kablar</span>`;
          tooltip.style.display = 'block';
          positionTooltip(e, tooltip, container);
        }
      });

      node.addEventListener('mousemove', (e) => {
        if (tooltip) positionTooltip(e, tooltip, container);
      });

      node.addEventListener('mouseleave', () => {
        node.classList.remove('mermaid-node-hover');
        if (tooltip) tooltip.style.display = 'none';
      });

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        if (tooltip) tooltip.style.display = 'none';
        setSelectedNode(prev => prev?.id === info.id ? null : info);
      });
    });
  }

  function positionTooltip(e: MouseEvent, tooltip: HTMLDivElement, container: HTMLDivElement) {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left + 12;
    const y = e.clientY - rect.top - 8;
    tooltip.style.left = `${Math.min(x, rect.width - tooltip.offsetWidth - 8)}px`;
    tooltip.style.top = `${Math.max(0, y - tooltip.offsetHeight)}px`;
  }

  // Deduplicate wires for selected node (same wire can appear from both endpoints)
  const uniqueWires = selectedNode
    ? Array.from(new Map(selectedNode.wires.map(w => [w.id, w])).values())
    : [];

  return (
    <div className="mermaid-container" style={{ position: 'relative' }}>
      {loading && <div className="mermaid-loading">Laddar diagram…</div>}
      {error && <div className="mermaid-error">{error}</div>}
      <div ref={containerRef} className="mermaid-svg" />

      {/* Tooltip (hover) */}
      <div ref={tooltipRef} className="mermaid-tooltip" style={{ display: 'none' }} />

      {/* Popover (click) */}
      {selectedNode && (
        <div className="mermaid-popover">
          <div className="mermaid-popover__header">
            <div>
              <span className="mermaid-popover__id">{selectedNode.id}</span>
              <span className="mermaid-popover__desc">{selectedNode.description}</span>
            </div>
            <button className="mermaid-popover__close" onClick={() => setSelectedNode(null)}>×</button>
          </div>

          {selectedNode.circuits.length > 0 && (
            <div className="mermaid-popover__circuits">
              {selectedNode.circuits.map(c => (
                <span key={c} className="tag">{c.replace(/_/g, ' ')}</span>
              ))}
            </div>
          )}

          <div className="mermaid-popover__wires">
            <h4>Anslutna kablar ({uniqueWires.length})</h4>
            <div className="mermaid-popover__wire-list">
              {uniqueWires.map(w => (
                <div key={w.id} className="mermaid-popover__wire-row">
                  <WireColourBadge
                    colourMain={w.colour_main}
                    colourStripe={w.colour_stripe}
                    mm2={w.mm2}
                    colourCode={w.colour_code}
                  />
                  <span className="mermaid-popover__wire-desc">
                    {w.from_component}
                    {w.from_terminal ? `:${w.from_terminal}` : ''}
                    {' → '}
                    {w.to_component}
                    {w.to_terminal ? `:${w.to_terminal}` : ''}
                  </span>
                </div>
              ))}
              {uniqueWires.length === 0 && (
                <span className="mermaid-popover__empty">Inga kablar registrerade</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
