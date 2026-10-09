import { Link } from 'react-router-dom';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="logo" aria-label="FrameX Studio home">
      <svg viewBox="0 0 54 44" role="img" aria-label="FrameX monogram">
        <path d="M4 4h24v7H12v8h13v7H12v14H4V4Z" fill="currentColor" />
        <path d="m26 18 14-14h10L35 22l15 18H40L26 26v-8Z" fill="var(--iris)" />
        <path d="M1 13V1h12M53 31v12H41" fill="none" stroke="var(--iris)" strokeWidth="1.5" />
      </svg>
      {!compact && <span>FrameX <b>Studio</b></span>}
    </Link>
  );
}
