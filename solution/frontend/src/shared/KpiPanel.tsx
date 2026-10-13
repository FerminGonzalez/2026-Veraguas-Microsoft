const MONO = "'Cascadia Code','Cascadia Mono','Consolas',ui-monospace,monospace";

interface Props {
  label: string;
  value: number | string;
  /** Color ANSI de la cifra (verde OK, rojo caídos, etc.) */
  color?: string;
}

/**
 * KPI tipo "output de consola": panel oscuro con cifra grande monoespaciada
 * y etiqueta gris en mayúsculas debajo.
 */
export default function KpiPanel({ label, value, color = '#F0F0F0' }: Props) {
  return (
    <div
      className="wt-panel"
      style={{
        flex: '1 1 130px',
        minWidth: 130,
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}
    >
      <div
        style={{
          fontFamily: MONO,
          fontSize: '1.75rem',
          fontWeight: 700,
          lineHeight: 1,
          color,
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: MONO,
          fontSize: '0.6875rem',
          color: '#767676',
          textTransform: 'uppercase',
          letterSpacing: '0.08em'
        }}
      >
        {label}
      </div>
    </div>
  );
}
