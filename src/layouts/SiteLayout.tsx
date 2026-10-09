import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Some browsers return a Promise from scrollTo. Effects must not return it.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Outlet /></main><Footer /></>;
}
