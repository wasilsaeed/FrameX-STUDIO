import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/site';
import { Logo } from '../common/Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div><Logo /><p>Precision in the cut.<br />Purpose in every frame.</p></div>
        <div><span>Explore</span><Link to="/work">Our Work</Link><Link to="/services">Services</Link><Link to="/about">Studio</Link></div>
        <div><span>Connect</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={siteConfig.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div>
        <div><span>Next step</span><Link to="/contact" className="text-link">Start a project <ArrowUpRight /></Link></div>
      </div>
      <div className="footer-wordmark">FRAMEX</div>
      <div className="footer-bottom"><p>© {new Date().getFullYear()} FrameX Studio</p><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/faq">FAQ</Link></div></div>
    </footer>
  );
}
