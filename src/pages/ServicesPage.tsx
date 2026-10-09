import { ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { services } from '../data/services';

const serviceGroups = [
  { id: 'video', number: '01', category: 'Video', title: 'Motion, with purpose.', description: 'From the first assembly to the final grade. Editing, sound, and color that work together.', image: services[0].image, alt: 'Professional video editing workstation', capabilities: 'Long-form · Social content · Campaigns · Color finishing' },
  { id: 'photo', number: '02', category: 'Photo', title: 'Every detail, considered.', description: 'Careful image finishing for portraits, products, and editorial work. Consistent color. Natural texture.', image: services[1].image, alt: 'Fashion editorial photograph', capabilities: 'Portraits · Beauty · E-commerce · Real estate · Compositing' },
  { id: 'support', number: '03', category: 'Support', title: 'Your ongoing creative partner.', description: 'A dependable post-production workflow for the content you make every month.', image: services[5].image, alt: 'Creative production and collaborative work', capabilities: 'Creators · Brands · Agencies · Content teams' },
];

export default function ServicesPage() {
  return <>
    <Seo title="Creative Services" description="Video editing, photo retouching, color grading, commercial editing, and recurring post-production support." />
    <section className="page-hero editorial-hero service-hero"><p className="eyebrow">OUR EXPERTISE</p><h1>Craft where it<br /><em>counts.</em></h1><div className="editorial-hero-copy"><p>Video, photography, and a considered finish. Choose the support your next project needs.</p><Link className="text-link" to="/contact">Discuss your project <ArrowUpRight /></Link></div><nav className="service-jump-links" aria-label="Service categories">{serviceGroups.map(group => <a href={`#${group.id}`} key={group.id}>{group.category === 'Support' ? 'Ongoing support' : group.category}<ArrowUpRight /></a>)}</nav></section>
    <div className="services-page section">{serviceGroups.map((group, index) => <section className="service-group" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}><Reveal className="service-group-visual"><img src={group.image} alt={group.alt} loading={index ? 'lazy' : 'eager'} /><span>{group.number} / {group.category === 'Support' ? 'Ongoing support' : group.category}</span></Reveal><Reveal className="service-group-content"><p className="eyebrow">{group.category === 'Support' ? 'ONGOING SUPPORT' : `${group.category.toUpperCase()} POST-PRODUCTION`}</p><h2 id={`${group.id}-title`}>{group.title}</h2><p className="service-group-description">{group.description}</p><div className="service-accordions">{services.filter(service => service.category === group.category).map(service => <details className="service-accordion" key={service.number} open={group.category !== 'Video'}><summary><h3>{service.title}</h3><Plus aria-hidden="true" /></summary><div className="service-accordion-body"><p>{service.description}</p><div className="service-scope"><div><span>What we deliver</span><p>{service.deliverables.join(' · ')}</p></div><div><span>Made for</span><p>{service.useCases.join(' · ')}</p></div></div></div></details>)}</div><p className="service-capabilities">{group.capabilities}</p></Reveal></section>)}</div>
    <section className="service-brief-note"><p>Every project has its own scope.<br /><span>We’ll shape a quote around yours.</span></p><Link className="text-link" to="/contact">Request a quote <ArrowUpRight /></Link></section>
    <CTA />
  </>;
}
