import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><Logo /><p>Precision in the cut.<br />Purpose in every frame.</p></div>
        <div className="footer-explore"><span>Explore</span><div className="footer-nav"><Link to="/work">Work</Link><Link to="/services">Services</Link><Link to="/about">Studio</Link><Link to="/team">Team</Link></div></div>
        <div className="footer-contact"><span>Let’s work together</span><Link to="/contact" className="footer-project-link">Start a project <ArrowUpRight strokeWidth={1.5} /></Link><p>A new idea deserves a good conversation.</p></div>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} FrameX Studio</p><div><Link to="/faq">FAQ</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div><span className="footer-signoff">Every frame, considered.</span></div>
    </footer>
  );
}
