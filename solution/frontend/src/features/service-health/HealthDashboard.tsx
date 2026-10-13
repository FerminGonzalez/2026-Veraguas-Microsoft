import { useState, useEffect } from 'react';
import { getServices } from '../../core/services/health.service';
import { ServiceStatus, ServiceAvailability } from '../../core/models/occ.models';
import ServiceStatusCard from './ServiceStatusCard';
import OverallStatusBanner from './OverallStatusBanner';
import PromptHeader from '../../shared/PromptHeader';
import KpiPanel from '../../shared/KpiPanel';

const POLL_MS = 30_000;

export default function HealthDashboard() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getServices()
      .then(s => { if (!cancelled) { setServices(s); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e.message); setLoading(false); } });

    const poll = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      getServices()
        .then(s => { if (!cancelled) { setServices(s); setError(null); } })
        .catch(() => {});
    }, POLL_MS);

    return () => { cancelled = true; clearInterval(poll); };
  }, []);

  const countBy = (a: ServiceAvailability) => services.filter(s => s.availability === a).length;
  const showKpis = !loading && !error && services.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <PromptHeader
        command="Get-ServiceHealth -Continuous"
        subtitle="Disponibilidad operativa de servicios de soporte · actualización cada 30 s"
      />

      {showKpis && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <KpiPanel label="Total" value={services.length} color="#F0F0F0" />
          <KpiPanel label="Operativos" value={countBy('Available')} color="#16C60C" />
          <KpiPanel label="Degradados" value={countBy('Degraded')} color="#C19C00" />
          <KpiPanel label="Caídos" value={countBy('Unavailable')} color="#E74856" />
        </div>
      )}

      <OverallStatusBanner services={services} />

      {loading ? (
        <div className="wt-panel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '64px 24px', color: '#767676' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 30, height: 30, border: '3px solid #2D2D2D', borderTopColor: '#16C60C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
            <span style={{ fontSize: '0.875rem' }}>Conectando con el OCC...</span>
          </div>
        </div>
      ) : error ? (
        <div className="wt-panel" style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#E74856' }}>
          ERROR: {error}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {services.map(svc => <ServiceStatusCard key={svc.id} service={svc} />)}
        </div>
      )}

    </div>
  );
}
