import { useState } from 'react';
import { FlightStatus } from '../../core/models/occ.models';

export interface InformationFilters {
  route: string;
  status: FlightStatus | '';
  date: string;
}

const LABEL: React.CSSProperties = {
  fontSize: '0.6875rem',
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: '#767676',
  marginBottom: 5,
  display: 'block'
};

const FIELD: React.CSSProperties = {
  height: 34,
  width: '100%',
  minWidth: 148,
  padding: '0 10px',
  boxSizing: 'border-box',
  fontSize: '0.8125rem'
};

const STATUSES: Array<{ value: FlightStatus; label: string }> = [
  { value: 'Scheduled', label: 'Programado' },
  { value: 'InTransit', label: 'En tránsito' },
  { value: 'Delayed',   label: 'Retrasado' },
  { value: 'Cancelled', label: 'Cancelado' },
  { value: 'Landed',    label: 'Aterrizado' }
];

interface Props {
  onFiltersChange: (f: InformationFilters) => void;
}

export default function InformationFilter({ onFiltersChange }: Props) {
  const [route, setRoute]   = useState('');
  const [status, setStatus] = useState<FlightStatus | ''>('');
  const [date, setDate]     = useState('');

  function emit(r: string, s: FlightStatus | '', d: string) {
    onFiltersChange({ route: r, status: s, date: d });
  }

  function clear() {
    setRoute(''); setStatus(''); setDate('');
    onFiltersChange({ route: '', status: '', date: '' });
  }

  return (
    <div className="wt-panel" style={{ padding: '14px 16px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 160 }}>
          <label style={LABEL}>Ruta (origen / destino)</label>
          <input type="text" value={route}
            onChange={e => { setRoute(e.target.value); emit(e.target.value, status, date); }}
            placeholder="Ej. PTY, BOG…" className="wt-input" style={FIELD} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={LABEL}>Estado</label>
          <select value={status}
            onChange={e => { const v = e.target.value as FlightStatus | ''; setStatus(v); emit(route, v, date); }}
            className="wt-input" style={FIELD}>
            <option value="">Todos los estados</option>
            {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={LABEL}>Fecha</label>
          <input type="date" value={date}
            onChange={e => { setDate(e.target.value); emit(route, status, e.target.value); }}
            className="wt-input" style={{ ...FIELD, colorScheme: 'dark' }} />
        </div>

        <button type="button" onClick={clear}
          className="wt-btn" style={{ height: 34, padding: '0 16px', alignSelf: 'flex-end', whiteSpace: 'nowrap' }}>
          Limpiar filtros
        </button>

      </div>
    </div>
  );
}
