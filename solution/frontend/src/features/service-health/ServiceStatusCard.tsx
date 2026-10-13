import { ServiceStatus, ServiceAvailability } from '../../core/models/occ.models';

/* Estado tipo consola: [OK] verde / [WARN] amarillo / [FAIL] rojo (ANSI) */
const AVAIL_CONFIG: Record<ServiceAvailability, { tag: string; color: string; label: string }> = {
  Available:   { tag: '[OK]',   color: '#16C60C', label: 'Disponible' },
  Degraded:    { tag: '[WARN]', color: '#C19C00', label: 'Degradado' },
  Unavailable: { tag: '[FAIL]', color: '#E74856', label: 'No disponible' }
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  const day   = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('es-PA', { month: 'short' });
  const time  = d.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return `${day} ${month}, ${time}`;
}

/** Par clave: valor con tokens del tema Dark+ de VS Code */
function Pair({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: 'flex', gap: 6, minWidth: 0 }}>
      <span style={{ color: '#9CDCFE', flexShrink: 0 }}>{k}:</span>
      <span style={{ color: '#CE9178', minWidth: 0, overflowWrap: 'anywhere' }}>{v}</span>
    </div>
  );
}

interface Props { service: ServiceStatus }

export default function ServiceStatusCard({ service }: Props) {
  const cfg = AVAIL_CONFIG[service.availability] ?? AVAIL_CONFIG['Unavailable'];

  return (
    <div className="wt-panel" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, minWidth: 0 }}>
        <span style={{ color: cfg.color, fontWeight: 700, fontSize: '0.8125rem', flexShrink: 0 }}>
          {cfg.tag}
        </span>
        <span style={{ color: '#F0F0F0', fontSize: '0.875rem', fontWeight: 600, minWidth: 0, overflowWrap: 'anywhere' }}>
          {service.name}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, fontSize: '0.75rem', lineHeight: 1.6 }}>
        <Pair k="Descripción" v={service.description} />
        <Pair k="Estado" v={cfg.label} />
        <Pair k="Verificado" v={fmtDate(service.lastChecked)} />
      </div>
    </div>
  );
}
