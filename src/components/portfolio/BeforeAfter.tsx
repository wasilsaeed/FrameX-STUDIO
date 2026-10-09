import { useState, type CSSProperties } from 'react';
import { MoveHorizontal } from 'lucide-react';

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);
  const illustrative = before === after;
  return (
    <div className={`before-after ${illustrative ? 'color-study' : ''}`} style={{ '--position': `${position}%` } as CSSProperties}>
      <img src={after} alt={illustrative ? 'Reference photograph with an illustrative warm color treatment' : 'Second visual reference'} loading="lazy" decoding="async" />
      <div className="before-layer"><img src={before} alt="Original reference photograph" loading="lazy" decoding="async" /></div>
      <span className="ba-label before-label">Original</span><span className="ba-label after-label">{illustrative ? 'Color treatment' : 'Reference'}</span>
      <input aria-label={illustrative ? 'Compare original and illustrative color treatment' : 'Compare visual references'} aria-valuetext={`${position}% original reference visible`} type="range" min="0" max="100" step="1" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
      <div className="ba-line" aria-hidden="true"><span><MoveHorizontal /></span></div>
    </div>
  );
}
