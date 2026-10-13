import { ServiceStatus } from '../../core/models/occ.models';

interface Props { services: ServiceStatus[] }

/** Banner de estado global estilo salida de consola: [OK] / [WARN] / [FAIL] */
export default function OverallStatusBanner({ services }: Props) {
  if (services.length === 0) return null;

  const countBy = (s: string) => services.filter(x => x.availability === s).length;
  const hasUnavailable = services.some(s => s.availability === 'Unavailable');
  const hasDegraded    = services.some(s => s.availability === 'Degraded');

  const base: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '14px 18px',
    fontFamily: "'Cascadia Code','Cascadia Mono','Consolas',ui-monospace,monospace"
  };

  if (hasUnavailable) return (
    <div className="wt-panel" style={{ ...base, borderLeft: '3px solid #E74856' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#E74856', fontWeight: 700 }}>
        [FAIL] Falla de servicio detectada
      </p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#CCCCCC' }}>
        {countBy('Unavailable')} servicio(s) no disponible(s) — revisión inmediata requerida
      </p>
    </div>
  );

  if (hasDegraded) return (
    <div className="wt-panel" style={{ ...base, borderLeft: '3px solid #C19C00' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#C19C00', fontWeight: 700 }}>
        [WARN] Degradación detectada
      </p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#CCCCCC' }}>
        {countBy('Degraded')} servicio(s) operando de forma degradada
      </p>
    </div>
  );

  return (
    <div className="wt-panel" style={{ ...base, borderLeft: '3px solid #16C60C' }}>
      <p style={{ margin: 0, fontSize: '0.875rem', color: '#16C60C', fontWeight: 700 }}>
        [OK] Todos los servicios operativos
      </p>
      <p style={{ margin: 0, fontSize: '0.8125rem', color: '#CCCCCC' }}>
        {services.length} servicios verificados sin incidencias
      </p>
    </div>
  );
}
