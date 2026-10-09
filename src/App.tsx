import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WorkPage = lazy(() => import('./pages/WorkPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Legal = lazy(() => import('./pages/LegalPage').then(m => ({ default: () => <><m.PrivacyPage /></> })));
const Terms = lazy(() => import('./pages/LegalPage').then(m => ({ default: () => <><m.TermsPage /></> })));

const router = createBrowserRouter([{
  element: <SiteLayout />,
  children: [
    { path: '/', element: <HomePage /> },
    { path: '/services', element: <ServicesPage /> },
    { path: '/work', element: <WorkPage /> },
    { path: '/work/:slug', element: <ProjectPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/team', element: <TeamPage /> },
    { path: '/contact', element: <ContactPage /> },
    { path: '/faq', element: <FaqPage /> },
    { path: '/privacy', element: <Legal /> },
    { path: '/terms', element: <Terms /> },
    { path: '/404', element: <NotFoundPage /> },
    { path: '*', element: <NotFoundPage /> },
  ],
}]);

export default function App() {
  return <Suspense fallback={<div className="page-loader" aria-label="Loading"><span /></div>}><RouterProvider router={router} /></Suspense>;
}
