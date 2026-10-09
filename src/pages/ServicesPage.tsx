import { ArrowUpRight, Film, Image, Layers, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CTA } from '../components/common/CTA';
import { Reveal } from '../components/common/Reveal';
import { Seo } from '../components/common/Seo';
import { services } from '../data/services';

const serviceGroups = [
  { category: 'Video', title: 'Video & motion', benefit: 'Edits that hold attention and make your message clear.', icon: Film, capabilities: ['Long-form editing', 'Reels & social content', 'Commercial cuts', 'Color & sound finishing'] },
  { category: 'Photo', title: 'Photo & retouch', benefit: 'Refined images with natural texture and consistent color.', icon: Image, capabilities: ['Portrait & beauty', 'Product & e-commerce', 'Editorial finishing', 'Real estate enhancement'] },
  { category: 'Support', title: 'Ongoing support', benefit: 'A reliable creative partner for your recurring content.', icon: Layers, capabilities: ['Monthly editing capacity', 'Creator content', 'Agency collaboration', 'Organized review & delivery'] },
];

export default function ServicesPage() {
  return <>
    <Seo title="Creative Services" description="Video editing, photo retouching, color grading, commercial editing, and recurring post-production support." />
    <section className="editorial-hero service-hero">
      <Reveal className="editorial-hero-heading"><p className="eyebrow">OUR SERVICES</p><h1>Craft where it<br /><em>counts.</em></h1></Reveal>
      <Reveal className="editorial-hero-copy"><p>Sharp edits. Considered images. Creative support that fits the way you work.</p><Link className="button" to="/contact">Start a project <ArrowUpRight aria-hidden="true" /></Link></Reveal>
    </section>
    <section className="services-page section" aria-label="Our three service categories">
      <div className="service-card-grid">{serviceGroups.map(group => {
        const Icon = group.icon;
        return <Reveal className="service-card" key={group.category}>
          <span className="service-card-icon"><Icon aria-hidden="true" /></span>
          <h2>{group.title}</h2><p className="service-card-benefit">{group.benefit}</p>
          <ul className="service-card-capabilities">{group.capabilities.map(item => <li key={item}>{item}</li>)}</ul>
          <details className="service-card-details"><summary><span>Explore services</span><Plus aria-hidden="true" /></summary><div className="service-card-expanded">{services.filter(service => service.category === group.category).map(service => <div key={service.number}><h3>{service.title}</h3><p>{service.description}</p></div>)}</div></details>
        </Reveal>;
      })}</div>
      <p className="services-scope-note">Each quote is shaped around your brief, deliverables, and timeline.</p>
    </section>
    <CTA />
  </>;
}
