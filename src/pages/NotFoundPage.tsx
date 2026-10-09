import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/common/Seo';

export default function NotFoundPage() {
  return <><Seo title="Page Not Found" description="The requested FrameX Studio page could not be found." /><section className="not-found"><p className="eyebrow">ERROR / FRAME MISSING</p><strong>404</strong><h1>This frame didn’t make the cut.</h1><Link className="button" to="/"><ArrowLeft /> Back to home</Link></section></>;
}
