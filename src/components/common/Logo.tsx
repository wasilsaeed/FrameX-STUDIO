import { Link } from 'react-router-dom';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label="FrameX Studio home">
      <span className="logo-wordmark">{compact ? 'F' : 'Frame'}<span className="logo-x">X</span><span className="logo-period" aria-hidden="true">.</span></span>
      {!compact && <span className="logo-studio">STUDIO</span>}
    </Link>
  );
}
