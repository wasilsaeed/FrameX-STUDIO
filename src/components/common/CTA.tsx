import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section className="final-cta" aria-labelledby="project-cta-heading">
      <Reveal className="cta-inner">
        <div className="cta-project-copy">
          <p className="eyebrow">FRAMEX / POST-PRODUCTION</p>
          <h2 id="project-cta-heading">Make every frame<br />work for your brand.</h2>
          <p className="cta-summary">Editing, colour and motion. One considered finish.</p>
        </div>
        <div className="cta-project-action"><Link className="button" to="/contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
        <div className="cta-timeline" aria-hidden="true"><span /><span /><span /><i /></div>
      </Reveal>
    </section>
  );
}
