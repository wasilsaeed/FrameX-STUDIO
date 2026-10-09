import { Link } from 'react-router-dom';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand"><Logo /><p>Purpose in every frame.</p></div>
        <nav className="footer-nav" aria-label="Footer navigation"><Link to="/team">Team</Link><Link to="/faq">FAQ</Link><Link to="/contact">Contact</Link></nav>
      </div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} FrameX Studio</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
    </footer>
  );
}
