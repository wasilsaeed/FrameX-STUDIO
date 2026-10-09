import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { services } from '../data/services';

const capabilities = {
  Video: ['Professional & long-form editing', 'Reels, Shorts & TikTok', 'Commercial and brand films', 'Corporate video', 'Color correction & grading', 'Motion graphics & titles'],
  Photo: ['Professional photo retouching', 'Portrait & beauty finishing', 'Product and e-commerce editing', 'Real estate enhancement', 'Fashion & lifestyle editing', 'Compositing & background work'],
  Support: ['Monthly editing support', 'Recurring social content', 'Creator post-production', 'Agency white-label support', 'Brand content assistance'],
};

export default function ServicesPage() {
  return <>
    <Seo title="Creative Services" description="Video editing, photo retouching, color grading, commercial editing, and recurring post-production support." />
    <section className="page-hero service-hero"><p className="eyebrow">WHAT WE DO / 001—006</p><h1>Craft where it<br /><em>counts.</em></h1><p>Focused post-production for content that deserves more than a quick pass.</p></section>
    <section className="service-list section">{services.map((service, index) => <Reveal className={`service-feature ${index % 2 ? 'reverse' : ''}`} key={service.number}><div className="service-image"><img src={service.image} alt={service.title} loading={index > 1 ? 'lazy' : 'eager'} /><span>{service.number} / {service.category}</span></div><div className="service-detail"><p className="eyebrow">{service.number} / {service.category.toUpperCase()}</p><h2>{service.title}</h2><p>{service.description}</p><div className="detail-columns"><div><b>Deliverables</b>{service.deliverables.map(item => <span key={item}><Check />{item}</span>)}</div><div><b>Ideal for</b>{service.useCases.map(item => <span key={item}><Check />{item}</span>)}</div></div><Link to="/contact" className="text-link">Discuss this service <ArrowUpRight /></Link></div></Reveal>)}</section>
    <section className="capability-matrix section"><p className="eyebrow">FULL CAPABILITIES</p><div>{Object.entries(capabilities).map(([category, items]) => <article key={category}><h3>{category}</h3><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section className="quote-strip"><div><p className="eyebrow">NO PRESET PACKAGES</p><h2>Built around the actual brief.</h2></div><Link className="button" to="/contact">Request a custom quote <ArrowUpRight /></Link></section>
    <CTA />
  </>;
}
