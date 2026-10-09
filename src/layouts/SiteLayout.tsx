import { useLocation, useOutlet } from 'react-router-dom';
import { Suspense, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export function SiteLayout() {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1}>
        <motion.div
          key={pathname}
          className="route-view"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="page-loader" role="status" aria-label="Loading page"><span /></div>}>
            {outlet}
          </Suspense>
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
