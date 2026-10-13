const MONO = "'Cascadia Code','Cascadia Mono','Consolas',ui-monospace,monospace";

interface Props {
  /** Comando que se "ejecuta" en la página, p. ej. Get-Flights -Status All */
  command: string;
  subtitle?: string;
}

/**
 * Encabezado tipo prompt de PowerShell:
 *   PS C:\occ> Get-Flights -Status All
 * "PS" en blanco, "C:\occ" en dorado (#D7BA7D) y el comando en blanco,
 * con cursor parpadeante al final.
 */
export default function PromptHeader({ command, subtitle }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: '1.125rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: 8,
          lineHeight: 1.4
        }}
      >
        <span style={{ color: '#F0F0F0', fontWeight: 700 }}>PS</span>
        <span style={{ color: '#D7BA7D' }}>{`C:\\occ`}</span>
        <span style={{ color: '#F0F0F0' }}>
          &gt; {command}
          <span style={{ color: '#16C60C', animation: 'blink 1.1s step-end infinite' }}>█</span>
        </span>
      </div>
      {subtitle && (
        <p style={{ margin: 0, fontFamily: MONO, fontSize: '0.75rem', color: '#767676' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
