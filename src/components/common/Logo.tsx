import { Link } from 'react-router-dom';

export function Logo({ compact = false, onNavigate }: { compact?: boolean; onNavigate?: () => void }) {
  return (
    <Link to="/" className="logo" aria-label="FrameX Studio home" onClick={onNavigate}>
      <span className="logo-wordmark">{compact ? 'F' : 'Frame'}<span className="logo-x">X</span><span className="logo-period" aria-hidden="true">.</span></span>
      {!compact && <span className="logo-studio">STUDIO</span>}
    </Link>
  );
}
