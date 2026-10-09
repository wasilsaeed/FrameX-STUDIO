import { useState } from 'react';

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(52);
  const illustrative = before === after;
  return (
    <div className={`before-after ${illustrative ? 'color-study' : ''}`} style={{ '--position': `${position}%` } as React.CSSProperties}>
      <img src={after} alt={illustrative ? 'Reference photograph with an illustrative warm color grade' : 'Retouched result'} />
      <div className="before-layer"><img src={before} alt="Original reference photograph" /></div>
      <span className="ba-label before-label">Original</span><span className="ba-label after-label">{illustrative ? 'Color treatment' : 'After'}</span>
      <input aria-label="Compare original and color-treated photograph" type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
      <div className="ba-line" aria-hidden="true" />
    </div>
  );
}
