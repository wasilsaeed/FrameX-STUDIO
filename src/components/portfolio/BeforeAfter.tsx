import { useState } from 'react';

export function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(52);
  return (
    <div className="before-after" style={{ '--position': `${position}%` } as React.CSSProperties}>
      <img src={after} alt="Retouched result" />
      <div className="before-layer"><img src={before} alt="Original image" /></div>
      <span className="ba-label before-label">Before</span><span className="ba-label after-label">After</span>
      <input aria-label="Compare original and retouched image" type="range" min="0" max="100" value={position} onChange={(e) => setPosition(Number(e.target.value))} />
      <div className="ba-line" aria-hidden="true" />
    </div>
  );
}
