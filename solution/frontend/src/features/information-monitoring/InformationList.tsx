import { Flight } from '../../core/models/occ.models';
import InformationStatusBadge from './InformationStatusBadge';

function fmtDate(iso: string, includeDate = true): string {
  const d = new Date(iso);
  const time = d.toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' });
  if (!includeDate) return time;
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleString('es-PA', { month: 'short' });
  return `${day} ${month} · ${time}`;
}

const COLUMNS = ['Vuelo', 'Origen', 'Destino', 'Hora Prog.', 'Hora Est.', 'Estado'];

interface Props { items: Flight[] }

export default function InformationList({ items }: Props) {
  return (
    <div className="wt-panel" style={{ overflow: 'hidden', width: '100%' }}>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
          <thead>
            <tr style={{ background: '#1F1F1F' }}>
              {COLUMNS.map(col => (
                <th
                  key={col}
                  style={{
                    padding: '9px 14px',
                    textAlign: 'left',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#6A9955',
                    borderBottom: '1px solid #2D2D2D',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '48px 16px', textAlign: 'center', fontSize: '0.8125rem', color: '#767676' }}>
                  Sin vuelos para los filtros seleccionados
                </td>
              </tr>
            ) : items.map((flight, i) => (
              <tr
                key={flight.id}
                style={{
                  background: i % 2 === 0 ? '#0C0C0C' : '#1F1F1F',
                  borderBottom: '1px solid #2D2D2D',
                  transition: 'background 150ms'
                }}
              >
                <td style={{ padding: '7px 14px', fontSize: '0.8125rem', fontWeight: 600, color: '#F0F0F0', whiteSpace: 'nowrap' }}>
                  {flight.flightNumber}
                  {flight.isAlert && <span style={{ marginLeft: 6, color: '#E74856' }} aria-label="Alerta crítica">⚠</span>}
                </td>
                <td style={{ padding: '7px 14px', color: '#CCCCCC' }}>{flight.origin}</td>
                <td style={{ padding: '7px 14px', color: '#CCCCCC' }}>{flight.destination}</td>
                <td style={{ padding: '7px 14px', color: '#999999', whiteSpace: 'nowrap' }}>{fmtDate(flight.scheduledDeparture)}</td>
                <td style={{ padding: '7px 14px', color: '#999999', whiteSpace: 'nowrap' }}>{fmtDate(flight.estimatedDeparture, false)}</td>
                <td style={{ padding: '7px 14px' }}>
                  <InformationStatusBadge status={flight.status} diverted={flight.diverted} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
