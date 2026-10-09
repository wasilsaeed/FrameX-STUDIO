import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="final-cta" aria-labelledby="project-cta-heading">
      <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
      <div className="cta-grid">
        <div>
          <h2 id="project-cta-heading">Make something<br /><span>worth watching.</span></h2>
          <p className="cta-note">Tell us the idea. We’ll shape the next step.</p>
        </div>
        <Link className="cta-action" to="/contact">
          <span className="cta-arrow" aria-hidden="true"><ArrowUpRight strokeWidth={1.25} /></span>
          <span className="cta-action-label">Start a conversation <ArrowUpRight size={15} /></span>
        </Link>
      </div>
    </section>
  );
}
