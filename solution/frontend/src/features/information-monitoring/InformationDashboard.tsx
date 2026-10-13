import { useState, useEffect, useMemo } from 'react';
import { getInformation } from '../../core/services/information.service';
import { Flight, FlightStatus } from '../../core/models/occ.models';
import InformationList from './InformationList';
import InformationFilter, { InformationFilters } from './InformationFilter';
import PromptHeader from '../../shared/PromptHeader';
import KpiPanel from '../../shared/KpiPanel';

const POLL_MS = 30_000;

export default function InformationDashboard() {
  const [allInformation, setAllInformation] = useState<Flight[]>([]);
  const [filters, setFilters]       = useState<InformationFilters>({ route: '', status: '', date: '' });
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getInformation()
      .then(f => { if (!cancelled) { setAllInformation(f); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e.message); setLoading(false); } });

    const poll = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      getInformation()
        .then(f => { if (!cancelled) { setAllInformation(f); setError(null); } })
        .catch(() => {});
    }, POLL_MS);

    return () => { cancelled = true; clearInterval(poll); };
  }, []);

  const filteredInformation = useMemo(() => allInformation.filter(flight => {
    const routeMatch = !filters.route ||
      flight.origin.toLowerCase().includes(filters.route.toLowerCase()) ||
      flight.destination.toLowerCase().includes(filters.route.toLowerCase());
    const statusMatch = !filters.status || flight.status === filters.status;
    const dateMatch   = !filters.date   || flight.scheduledDeparture.startsWith(filters.date);
    return routeMatch && statusMatch && dateMatch;
  }), [allInformation, filters]);

  const countBy = (s: FlightStatus) => allInformation.filter(f => f.status === s).length;
  const showKpis = !loading && !error && allInformation.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <PromptHeader
        command="Get-Flights -Status All"
        subtitle="Estado operativo en tiempo real · actualización cada 30 s"
      />

      {showKpis && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <KpiPanel label="Total" value={allInformation.length} color="#3A96DD" />
          <KpiPanel label="Programados" value={countBy('Scheduled')} color="#F0F0F0" />
          <KpiPanel label="En tránsito" value={countBy('InTransit')} color="#3A96DD" />
          <KpiPanel label="Retrasados" value={countBy('Delayed')} color="#C19C00" />
          <KpiPanel label="Aterrizados" value={countBy('Landed')} color="#16C60C" />
          <KpiPanel label="Cancelados" value={countBy('Cancelled')} color="#E74856" />
        </div>
      )}

      <InformationFilter onFiltersChange={setFilters} />

      {loading ? (
        <div className="wt-panel" style={{ padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: '#767676' }}>
            <div style={{ width: 30, height: 30, border: '3px solid #2D2D2D', borderTopColor: '#16C60C', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
            <span style={{ fontSize: '0.875rem' }}>Conectando con el OCC...</span>
          </div>
        </div>
      ) : error ? (
        <div className="wt-panel" style={{ padding: '16px 20px', fontSize: '0.875rem', color: '#E74856' }}>
          ERROR: {error}
        </div>
      ) : (
        <>
          <div style={{ padding: '0 2px' }}>
            <span style={{ fontSize: '0.75rem', color: '#767676' }}>
              {filteredInformation.length} vuelo(s) encontrados
            </span>
          </div>
          <InformationList items={filteredInformation} />
        </>
      )}

    </div>
  );
}
