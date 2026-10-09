import { ArrowUpRight, Film, Image, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Seo } from '../components/common/Seo';
import { Reveal } from '../components/common/Reveal';
import { CTA } from '../components/common/CTA';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projects } from '../data/projects';

const capabilities = [
  { icon: Film, name: 'Video & motion', description: 'Edits that find the story and hold attention.', detail: 'Brand films · YouTube · Social edits', service: 'Video editing' },
  { icon: Image, name: 'Photo & retouching', description: 'Natural detail. Consistent color. A considered finish.', detail: 'Portraits · Products · Editorial', service: 'Photo retouching' },
  { icon: Layers, name: 'Ongoing support', description: 'A creative partner for the content you make regularly.', detail: 'Creators · Brands · Agencies', service: 'Ongoing creative support' },
];
const steps = [
  { title: 'Share your idea', copy: 'Send a brief, your material, and a few references.' },
  { title: 'Shape it together', copy: 'We agree the scope, create, and refine with your feedback.' },
  { title: 'Ready to release', copy: 'Receive polished files in the formats you need.' },
];

export default function HomePage() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const featured = projects.filter(project => [2, 3].includes(project.id));
  return (
    <div className="studio-home">
      <Seo title="Every Frame, Elevated" description="Video editing, photo retouching, and creative post-production for creators, brands, and agencies. Every frame, elevated." />
      <section className="home-hero" ref={heroRef} aria-labelledby="home-title">
        <div className="hero-copy">
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
            <p className="eyebrow">Creative post-production</p>
            <h1 id="home-title">We don’t just edit.<br /><em>We elevate.</em></h1>
            <p className="hero-description">Video editing and photo retouching for creators, brands, and agencies. A sharper story. A stronger finish.</p>
            <div className="hero-actions"><Link to="/contact" className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link><Link to="/work" className="button button-outline">Explore work <ArrowUpRight aria-hidden="true" /></Link></div>
          </motion.div>
          <span className="hero-signoff">Every frame, elevated.</span>
        </div>
        <motion.div className="hero-art-wrap" initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: reduce ? 0 : .1, ease: [.22, 1, .36, 1] }}>
          <Link to="/work/midnight-drive" className="hero-art" aria-label="Explore Midnight Drive, an automotive concept study">
            <motion.div className="hero-art-motion" style={{ y: reduce ? 0 : imageY }}><img src="/media/midnight-drive.jpg" alt="Silver coupe crossing a volcanic landscape at sunset — concept artwork" loading="eager" decoding="async" /></motion.div>
            <div className="hero-art-caption"><div><span>Automotive concept</span><h2>Midnight Drive</h2></div><span className="image-action"><ArrowUpRight aria-hidden="true" /></span></div>
          </Link>
        </motion.div>
      </section>
      <section className="home-work section" aria-labelledby="selected-title">
        <Reveal className="section-top"><div><p className="eyebrow">Selected work</p><h2 id="selected-title">A feel for the finish.</h2></div><Link className="button button-outline" to="/work">View all work <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <p className="collection-note">Concept studies in motion and photography. Not client commissions.</p>
        <div className="project-grid home-projects">{featured.map((project, index) => <ProjectCard project={project} key={project.id} index={index} />)}</div>
      </section>
      <section className="home-services section" aria-labelledby="capabilities-title">
        <Reveal className="section-top"><div><p className="eyebrow">What we do</p><h2 id="capabilities-title">Your idea. Expertly finished.</h2></div><Link className="text-link" to="/services">Explore services <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <div className="capability-grid">{capabilities.map(({ icon: Icon, ...item }) => <Reveal key={item.name}><Link to={`/contact?service=${encodeURIComponent(item.service)}`} className="capability-card"><Icon className="capability-icon" aria-hidden="true" /><h3>{item.name}</h3><p>{item.description}</p><span className="capability-detail">{item.detail}</span><span className="capability-action">Let’s talk <ArrowUpRight aria-hidden="true" /></span></Link></Reveal>)}</div>
      </section>
      <section className="home-process section" aria-labelledby="process-title">
        <Reveal className="section-top"><div><p className="eyebrow">A simple process</p><h2 id="process-title">From first idea to final frame.</h2></div></Reveal>
        <div className="process-grid">{steps.map((step, index) => <Reveal key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></Reveal>)}</div>
      </section>
      <CTA />
    </div>
  );
}
