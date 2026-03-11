import { useEffect, useRef, useState, useCallback } from 'react';
import mermaid from 'mermaid';
import mdiIcons from '@iconify-json/mdi/icons.json';
import type { ComponentInfo } from '../hooks/useWiringData';
import type { WireEntry } from '../types';
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
  primaryBorderColor: 'rgba(158,124,60,0.40)',
  primaryTextColor: '#2c2a27',
  secondaryColor: '#f0ede7',
  tertiaryColor: '#e8e4dc',
  lineColor: 'rgba(100,80,40,0.55)',
  edgeLabelBackground: '#f0ede7',
  clusterBkg: '#f0ede7',
  clusterBorder: 'rgba(0,0,0,0.12)',
  titleColor: '#7a5e2a',
  nodeBorder: 'rgba(158,124,60,0.45)',
  nodeTextColor: '#2c2a27',
  fontFamily: "'Outfit', -apple-system, sans-serif",
  fontSize: '13px',
};

function getCurrentTheme(): 'dark' | 'light' {
  return (document.documentElement.getAttribute('data-theme') as 'light') || 'dark';
}

interface Props {
  diagramFile: string;
  componentMap?: Map<string, ComponentInfo>;
  wires?: WireEntry[];
  basePath?: string;
  theme?: 'dark' | 'light';
}

let renderCounter = 0;

function normalizeIconSyntax(code: string): string {
  return code.replace(
    /(^\s*)([A-Za-z_][A-Za-z0-9_]*)@\{[^}\n]*?(?:label:\s*"([^"]*)")?[^}\n]*\}\s*$/gm,
    (_match, indent: string, id: string, label?: string) => `${indent}${id}["${label || id}"]`
  );
}

function injectPrintStyles(container: HTMLDivElement) {
  const svg = container.querySelector('svg');
  if (!svg) return;
  const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.textContent = `
    @media print {
      /* Override Mermaid's inline !important color:#fff on node labels */
      .nodeLabel, .nodeLabel *, .labelBkg, .labelBkg * {
        color: #1a1a1a !important;
        fill: #1a1a1a !important;
      }
      /* Reduce heavy node background fills — make them semi-transparent */
      g[id^="flowchart-"] > g > path,
      g[id^="flowchart-"] > g > rect,
      g[id^="flowchart-"] > g > circle {
        opacity: 0.25;
      }
      /* Keep icons/images fully visible */
      g[id^="flowchart-"] image,
      g[id^="flowchart-"] svg {
        opacity: 1;
      }
      /* Edge labels */
      .edgeLabel .label-container {
        background-color: #fff !important;
      }
      .edgeLabel span, .edgeLabel div {
        color: #000 !important;
      }
      /* Force light SVG background (dark mode rendered with dark bg) */
      > style + g { }
      .cluster rect {
        fill: #f5f5f3 !important;
        stroke: #bbb !important;
      }
      .cluster-label .nodeLabel {
        color: #333 !important;
        fill: #333 !important;
        font-weight: 700;
      }
      /* Override dark theme line/edge colours */
      .flowchart-link {
        stroke: #444 !important;
      }
      /* Force edge label backgrounds light */
      .edgeLabel foreignObject > div {
        background-color: #fff !important;
        color: #000 !important;
      }
    }
  `;
  svg.insertBefore(style, svg.firstChild);
}

function extractComponentId(nodeId: string): string | null {
  // Mermaid generates IDs like "flowchart-E1-42"
  const match = nodeId.match(/^flowchart-([A-Za-z_]\w*)-\d+$/);
  return match ? match[1] : null;
}

export function MermaidDiagram({ diagramFile, componentMap, wires, basePath = '/data/diagrams', theme }: Props) {
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

    const currentTheme = theme ?? getCurrentTheme();
    const themeVars = currentTheme === 'light' ? LIGHT_THEME : DARK_THEME;
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
            // Inject print-friendly styles inside SVG to override inline !important
            injectPrintStyles(containerRef.current);
            // Attach interactivity after SVG is in the DOM
            if (componentMap) {
              attachInteractivity(containerRef.current, componentMap);
            }
            if (wires?.length) {
              attachWireInteractivity(containerRef.current, wires);
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
  }, [diagramFile, componentMap, wires, theme]);

  function attachInteractivity(container: HTMLDivElement, cMap: Map<string, ComponentInfo>) {
    const svg = container.querySelector('svg');
    if (!svg) return;
    const nodes = svg.querySelectorAll<SVGGElement>('g[id^="flowchart-"]');
    const tooltip = tooltipRef.current;

    nodes.forEach(node => {
      const compId = extractComponentId(node.id);
      if (!compId) return;
      // Normalize: L1_lo → L1, D30 → D
      const normalized = normalizeNodeId(compId);
      const info = cMap.get(normalized) || cMap.get(compId);
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

  function attachWireInteractivity(container: HTMLDivElement, wireList: WireEntry[]) {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    // Build wire lookup by from→to component pair
    const wireByRoute = new Map<string, WireEntry>();
    for (const w of wireList) {
      wireByRoute.set(`${w.from_component}|${w.to_component}`, w);
      wireByRoute.set(`${w.to_component}|${w.from_component}`, w);
    }

    const svg = container.querySelector('svg');
    if (!svg) return;

    // Collect known node IDs from SVG to disambiguate edge ID parsing
    const knownNodeIds = new Set<string>();
    for (const g of svg.querySelectorAll<SVGGElement>('g[id^="flowchart-"]')) {
      const match = g.id.match(/^flowchart-(.+)-\d+$/);
      if (match) knownNodeIds.add(match[1]);
    }

    const links = svg.querySelectorAll<SVGPathElement>('.flowchart-link[id]');
    // Mermaid creates 2 .edgeLabel elements per link (visible + hitbox)
    const allEdgeLabels = Array.from(svg.querySelectorAll<SVGGElement>('.edgeLabel'));
    const processedLinks = new Set<string>();

    links.forEach((link, linkIndex) => {
      if (processedLinks.has(link.id)) return;
      processedLinks.add(link.id);

      const parsed = parseEdgeId(link.id, knownNodeIds);
      if (!parsed) return;

      const fromComp = normalizeNodeId(parsed.from);
      const toComp = normalizeNodeId(parsed.to);

      const wire = wireByRoute.get(`${fromComp}|${toComp}`);
      if (!wire) return;

      // Labels come in pairs (2 per link): use linkIndex * 2
      const labelEl = allEdgeLabels[linkIndex * 2] ?? null;
      const hasVisibleLabel = labelEl && labelEl.getBoundingClientRect().width > 0;

      const buildTooltipHtml = () => {
        const badgeHtml = wire.colour_code
          ? `<span class="mermaid-wire-badge" style="background:${getBadgeBg(wire)};color:${getBadgeColor(wire)}">${wire.mm2 != null ? wire.mm2 + ' ' : ''}${wire.colour_code}</span>`
          : '';
        return [
          `<strong>${wire.id}</strong>`,
          badgeHtml,
          `<br><span class="mermaid-tooltip__route">${wire.from_component}${wire.from_terminal ? ':' + wire.from_terminal : ''} → ${wire.to_component}${wire.to_terminal ? ':' + wire.to_terminal : ''}</span>`,
          wire.description ? `<br><span class="mermaid-tooltip__desc">${wire.description}</span>` : '',
        ].join(' ');
      };

      const showTooltip = (e: MouseEvent) => {
        link.classList.add('mermaid-edge-hover-line');
        if (hasVisibleLabel) labelEl.classList.add('mermaid-edge-hover');
        tooltip.innerHTML = buildTooltipHtml();
        tooltip.style.display = 'block';
        positionTooltip(e, tooltip, container);
      };

      const moveTooltip = (e: MouseEvent) => positionTooltip(e, tooltip, container);

      const hideTooltip = () => {
        link.classList.remove('mermaid-edge-hover-line');
        if (hasVisibleLabel) labelEl.classList.remove('mermaid-edge-hover');
        tooltip.style.display = 'none';
      };

      if (hasVisibleLabel) {
        // For labeled edges: attach to both label elements (visible + hitbox)
        labelEl.classList.add('mermaid-edge-interactive');
        labelEl.addEventListener('mouseenter', showTooltip);
        labelEl.addEventListener('mousemove', moveTooltip);
        labelEl.addEventListener('mouseleave', hideTooltip);
        const labelHitbox = allEdgeLabels[linkIndex * 2 + 1];
        if (labelHitbox) {
          labelHitbox.classList.add('mermaid-edge-interactive');
          labelHitbox.addEventListener('mouseenter', showTooltip);
          labelHitbox.addEventListener('mousemove', moveTooltip);
          labelHitbox.addEventListener('mouseleave', hideTooltip);
        }
      }

      // Create invisible wider hit-area on the path for hovering
      const hitArea = link.cloneNode(false) as SVGPathElement;
      hitArea.removeAttribute('id');
      hitArea.setAttribute('class', 'mermaid-edge-hitarea');
      hitArea.setAttribute('stroke', 'transparent');
      hitArea.setAttribute('stroke-width', '14');
      hitArea.setAttribute('fill', 'none');
      hitArea.setAttribute('pointer-events', 'stroke');
      hitArea.style.cursor = 'pointer';
      link.parentNode?.insertBefore(hitArea, link.nextSibling);
      hitArea.addEventListener('mouseenter', showTooltip);
      hitArea.addEventListener('mousemove', moveTooltip);
      hitArea.addEventListener('mouseleave', hideTooltip);
    });
  }

  function parseEdgeId(edgeId: string, knownNodeIds: Set<string>): { from: string; to: string } | null {
    // Edge IDs: L_{from}_{to}_{index}
    // Problem: node IDs can contain underscores (L1_lo, GND15)
    // Solution: try all possible splits using known node IDs
    const stripped = edgeId.replace(/^L_/, '').replace(/_\d+$/, '');
    // Try every possible split point
    for (let i = 1; i < stripped.length; i++) {
      if (stripped[i] !== '_') continue;
      const from = stripped.slice(0, i);
      const to = stripped.slice(i + 1);
      if (knownNodeIds.has(from) && knownNodeIds.has(to)) {
        return { from, to };
      }
    }
    return null;
  }

  function normalizeNodeId(mermaidId: string): string {
    // L1_lo → L1, L1_hi → L1, D30 → D, GND15 → GND15
    return mermaidId
      .replace(/_(lo|hi|left|right)$/, '')
      .replace(/^([A-Z])(\d+)$/, (_m, letter, digits) => {
        // Single letter + digits >= 10: D30 → D (power distribution track number)
        // But S1, M1, L1 etc. stay as-is (real component IDs)
        return digits.length >= 2 ? letter : `${letter}${digits}`;
      });
  }

  function getBadgeBg(wire: WireEntry): string {
    const COLOUR_HEX: Record<string, string> = {
      sw: '#1a1a1a', ws: '#f5f5f5', ro: '#dc2626', bl: '#2563eb',
      gn: '#16a34a', ge: '#eab308', br: '#92400e', gr: '#6b7280',
      vi: '#7c3aed', or: '#ea580c', pi: '#ec4899', li: '#06b6d4',
    };
    const main = COLOUR_HEX[wire.colour_main || ''] || '#666';
    const stripe = wire.colour_stripe ? COLOUR_HEX[wire.colour_stripe] : null;
    if (stripe) {
      return `repeating-linear-gradient(135deg, ${main} 0px, ${main} 6px, ${stripe} 6px, ${stripe} 9px)`;
    }
    return main;
  }

  function getBadgeColor(wire: WireEntry): string {
    return ['ge', 'ws', 'pi'].includes(wire.colour_main || '') ? '#000' : '#fff';
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
