import { useEffect, useState } from 'react';

const MONO = "'Cascadia Code','Cascadia Mono','Consolas',ui-monospace,monospace";

const SEGMENT: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '0 12px',
  height: '100%',
  borderLeft: '1px solid #2D2D2D'
};

/**
 * Barra de estado inferior estilo Windows Terminal:
 * perfil a la izquierda; indicador en vivo, reloj UTC y cadencia de
 * actualización a la derecha. Altura 22px, monoespaciada 11px.
 */
export default function StatusBar() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const utc = now.toISOString().slice(11, 19) + ' Z';

  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 22,
        background: '#1F1F1F',
        borderTop: '1px solid #2D2D2D',
        fontFamily: MONO,
        fontSize: '0.6875rem',
        color: '#999999',
        userSelect: 'none'
      }}
    >
      {/* Perfil */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 12px', height: '100%', background: '#0078D4', color: '#FFFFFF' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
          copa-occ
        </span>
        <span style={{ padding: '0 12px', height: '100%', display: 'inline-flex', alignItems: 'center' }}>PowerShell 7.4</span>
      </div>

      {/* Telemetría */}
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <span style={SEGMENT}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16C60C', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          En vivo
        </span>
        <span style={{ ...SEGMENT, color: '#CCCCCC' }}>{utc}</span>
        <span style={SEGMENT}>Actualización: 30s</span>
      </div>
    </div>
  );
}
