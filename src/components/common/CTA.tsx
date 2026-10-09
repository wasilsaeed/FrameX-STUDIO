import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="final-cta">
      <p className="eyebrow">AVAILABLE FOR SELECT PROJECTS</p>
      <h2>Your next great visual<br />starts here.</h2>
      <Link className="button button-light" to="/contact">Let’s work together <ArrowUpRight /></Link>
    </section>
  );
}
