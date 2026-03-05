import { COLOUR_HEX } from '../types';

interface Props {
  colourMain: string | null;
  colourStripe: string | null;
  mm2: number | null;
  colourCode: string | null;
}

export function WireColourBadge({ colourMain, colourStripe, mm2, colourCode }: Props) {
  if (!colourMain && !colourCode) return <span className="wire-badge wire-badge--unknown">?</span>;

  const mainHex = COLOUR_HEX[colourMain || ''] || '#666';
  const stripeHex = colourStripe ? COLOUR_HEX[colourStripe] : null;
  const isLight = ['ge', 'ws', 'pi'].includes(colourMain || '');

  return (
    <span
      className="wire-badge"
      style={{
        background: stripeHex
          ? `repeating-linear-gradient(135deg, ${mainHex} 0px, ${mainHex} 6px, ${stripeHex} 6px, ${stripeHex} 9px)`
          : mainHex,
        color: isLight ? '#000' : '#fff',
        padding: '3px 10px',
        borderRadius: '4px',
        fontSize: '0.72rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        border: `1px solid ${isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)'}`,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        letterSpacing: '0.02em',
        lineHeight: '1.4',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 2px rgba(0,0,0,0.2)',
      }}
    >
      {mm2 != null ? `${mm2} ` : ''}{colourCode || colourMain || '?'}
    </span>
  );
}
