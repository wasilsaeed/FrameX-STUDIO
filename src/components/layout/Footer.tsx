import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><Logo /><p>Purpose in every frame.</p></div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <div className="footer-link-group"><span>Explore</span><Link to="/work">Work</Link><Link to="/services">Services</Link><Link to="/about">Studio</Link></div>
          <div className="footer-link-group"><span>The people</span><Link to="/team">Team</Link><Link to="/faq">FAQ</Link></div>
          <div className="footer-link-group footer-project"><span>Have an idea?</span><Link to="/contact">Start a project <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
        </nav>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} FrameX Studio</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
    </footer>
  );
}
