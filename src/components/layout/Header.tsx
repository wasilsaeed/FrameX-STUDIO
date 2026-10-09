import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';

const links = [
  ['Work', '/work'], ['Services', '/services'], ['Studio', '/about'], ['Team', '/team'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = requestAnimationFrame(() => navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key !== 'Tab') return;

      const items = [toggleRef.current, ...Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const closeMenu = () => {
    if (open) toggleRef.current?.focus();
    setOpen(false);
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <Logo />
      <button ref={toggleRef} type="button" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="main-navigation">
        <span>{open ? 'Close' : 'Menu'}</span>{open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav ref={navRef} id="main-navigation" className={open ? 'open' : ''} aria-label="Main navigation">
        {links.map(([label, href]) => <NavLink key={href} to={href} onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}
        <NavLink to="/contact" onClick={closeMenu} className="nav-cta">Start a project <ArrowUpRight size={15} /></NavLink>
        <span className="nav-note">A considered approach.<br />A memorable result.</span>
      </nav>
    </header>
  );
}
