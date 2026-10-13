import { FlightStatus } from '../../core/models/occ.models';

/* Paleta ANSI de la consola (tema Windows Terminal / PowerShell) */
const STATUS_CONFIG: Record<FlightStatus, { label: string; color: string }> = {
  Scheduled: { label: 'Programado',  color: '#CCCCCC' },
  InTransit: { label: 'En tránsito', color: '#3A96DD' },
  Delayed:   { label: 'Retrasado',   color: '#C19C00' },
  Cancelled: { label: 'Cancelado',   color: '#E74856' },
  Landed:    { label: 'Aterrizado',  color: '#16C60C' }
};

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '1px 8px',
        borderRadius: 3,
        color,
        background: `${color}1A`,
        border: `1px solid ${color}55`,
        fontSize: '0.75rem',
        whiteSpace: 'nowrap'
      }}
    >
      {label}
    </span>
  );
}

interface Props {
  status: FlightStatus;
  diverted?: boolean;
}

export default function InformationStatusBadge({ status, diverted = false }: Props) {
  const { label, color } = STATUS_CONFIG[status];
  return (
    <>
      <Tag label={label} color={color} />
      {diverted && <span style={{ marginLeft: 6 }}><Tag label="Desviado" color="#C19C00" /></span>}
    </>
  );
}
