import { Outlet } from 'react-router-dom';
import TerminalTabBar from './shared/TerminalTabBar';
import StatusBar from './shared/StatusBar';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', flexDirection: 'column' }}>
      <TerminalTabBar />
      <main style={{ flex: 1, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '20px 24px 32px' }}>
        <Outlet />
      </main>
      <StatusBar />
    </div>
  );
}
