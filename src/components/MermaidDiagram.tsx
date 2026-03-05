import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import mdiIcons from '@iconify-json/mdi/icons.json';

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
  background:      '#08080c',
  primaryColor:    '#18181f',
  primaryBorderColor: 'rgba(208,174,120,0.28)',
  primaryTextColor:   '#ece8e0',
  secondaryColor:  '#111118',
  tertiaryColor:   '#0d0d13',
  lineColor:       'rgba(208,174,120,0.50)',
  edgeLabelBackground: '#111118',
  clusterBkg:      '#111118',
  clusterBorder:   'rgba(255,255,255,0.08)',
  titleColor:      '#d0ae78',
  nodeBorder:      'rgba(208,174,120,0.30)',
  nodeTextColor:   '#ece8e0',
  fontFamily:      "'Outfit', -apple-system, sans-serif",
  fontSize:        '13px',
};

const LIGHT_THEME = {
  background:      '#f9f7f4',
  primaryColor:    '#fff',
  primaryBorderColor: 'rgba(158,124,60,0.30)',
  primaryTextColor:   '#1c1a17',
  secondaryColor:  '#f4f1ec',
  tertiaryColor:   '#eae6df',
  lineColor:       'rgba(158,124,60,0.50)',
  edgeLabelBackground: '#f4f1ec',
  clusterBkg:      '#f4f1ec',
  clusterBorder:   'rgba(0,0,0,0.08)',
  titleColor:      '#9e7c3c',
  nodeBorder:      'rgba(158,124,60,0.35)',
  nodeTextColor:   '#1c1a17',
  fontFamily:      "'Outfit', -apple-system, sans-serif",
  fontSize:        '13px',
};

function getCurrentTheme(): 'dark' | 'light' {
  return (document.documentElement.getAttribute('data-theme') as 'light') || 'dark';
}

interface Props {
  diagramFile: string;
}

let renderCounter = 0;

function normalizeIconSyntax(code: string): string {
  return code.replace(
    /(^\s*)([A-Za-z_][A-Za-z0-9_]*)@\{[^}\n]*?(?:label:\s*"([^"]*)")?[^}\n]*\}\s*$/gm,
    (_match, indent: string, id: string, label?: string) => `${indent}${id}["${label || id}"]`
  );
}

export function MermaidDiagram({ diagramFile }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    // Re-initialize mermaid with the current theme
    const themeVars = getCurrentTheme() === 'light' ? LIGHT_THEME : DARK_THEME;
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      themeVariables: themeVars,
      securityLevel: 'loose',
      flowchart: { useMaxWidth: true, htmlLabels: true },
    });

    fetch(`/data/diagrams/${diagramFile}`)
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
  }, [diagramFile]);

  return (
    <div className="mermaid-container">
      {loading && <div className="mermaid-loading">Laddar diagram…</div>}
      {error && <div className="mermaid-error">{error}</div>}
      <div ref={containerRef} className="mermaid-svg" />
    </div>
  );
}
