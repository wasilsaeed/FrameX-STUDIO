import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

export function CTA() {
  return (
    <section className="final-cta" aria-labelledby="project-cta-heading">
      <Reveal className="cta-inner">
        <h2 id="project-cta-heading">Your next frame starts here.</h2>
        <Link className="button" to="/contact">Start a project <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </Reveal>
    </section>
  );
}
