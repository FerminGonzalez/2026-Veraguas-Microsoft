import { NavLink, useNavigate } from 'react-router-dom';

const MONO = "'Cascadia Code','Cascadia Mono','Consolas',ui-monospace,monospace";

const TAB_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 34,
  padding: '0 14px',
  fontFamily: MONO,
  fontSize: '0.8125rem',
  textDecoration: 'none',
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderRight: '1px solid #0C0C0C',
  transition: 'background 150ms, color 150ms',
  whiteSpace: 'nowrap'
};

interface TabDef {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const TABS: TabDef[] = [
  {
    to: '/information',
    label: 'Vuelos',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    )
  },
  {
    to: '/health',
    label: 'Servicios',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    )
  }
];

/**
 * Barra de pestañas estilo Windows Terminal (sustituye al header azul Copa).
 * Pestaña activa = fondo del área de contenido (#0C0C0C) + línea de acento
 * inferior #0078D4; pestañas inactivas = #2D2D2D con texto #999.
 */
export default function TerminalTabBar() {
  const navigate = useNavigate();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: '#1F1F1F',
        borderBottom: '1px solid #2D2D2D',
        display: 'flex',
        alignItems: 'flex-end',
        height: 40,
        padding: '0 8px',
        userSelect: 'none'
      }}
    >
      {/* Identidad de la app */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 40, paddingRight: 14, flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
        <span style={{ fontFamily: MONO, fontSize: '0.75rem', color: '#F0F0F0', letterSpacing: '0.02em' }}>
          Copa OCC Console
        </span>
      </div>

      {/* Pestañas */}
      <nav style={{ display: 'flex', alignItems: 'flex-end', gap: 2, flex: 1, minWidth: 0, overflow: 'hidden' }}>
        {TABS.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            style={({ isActive }) => ({
              ...TAB_BASE,
              background: isActive ? '#0C0C0C' : '#2D2D2D',
              color: isActive ? '#F0F0F0' : '#999999',
              boxShadow: isActive ? 'inset 0 -2px 0 0 #0078D4' : undefined
            })}
          >
            {tab.icon}
            {tab.label}
          </NavLink>
        ))}

        {/* "+" decorativo: abre la pestaña de Servicios */}
        <button
          type="button"
          title="Nueva pestaña (Servicios)"
          aria-label="Nueva pestaña"
          onClick={() => navigate('/health')}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#999999',
            fontFamily: MONO,
            fontSize: '1rem',
            lineHeight: 1,
            width: 28,
            height: 34,
            cursor: 'pointer',
            transition: 'color 150ms'
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#F0F0F0'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#999999'; }}
        >
          +
        </button>
      </nav>
    </header>
  );
}
