import { ArrowDown, ArrowUpRight, Film, Image, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Seo } from '../components/common/Seo';
import { Reveal } from '../components/common/Reveal';
import { CTA } from '../components/common/CTA';
import { Testimonials } from '../components/common/Testimonials';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projects } from '../data/projects';
import { clientTestimonials } from '../data/testimonials';

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
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const featured = projects.filter(project => [2, 3, 6].includes(project.id));
  return (
    <div className="studio-home">
      <Seo title="Every Frame, Elevated" description="Video editing, photo retouching, and creative post-production for creators, brands, and agencies. Every frame, elevated." />
      <section className="home-hero" ref={heroRef} aria-labelledby="home-title">
        <motion.div className="hero-art" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} aria-hidden="true">
          <motion.div className="hero-art-motion" style={{ y: reduce ? 0 : imageY }}><img src="/media/midnight-drive.jpg" alt="" loading="eager" decoding="async" /></motion.div>
        </motion.div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-frame-corners" aria-hidden="true" />
        <div className="hero-copy">
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>
            <p className="eyebrow">FrameX Studio / Creative post-production</p>
            <h1 id="home-title">We don’t just edit.<br /><em>We elevate.</em></h1>
            <p className="hero-description">Video editing, photo retouching, and creative finishing.<br className="hero-desktop-break" /> Built around your vision.</p>
            <div className="hero-actions"><Link to="/contact" className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link><Link to="/work" className="button button-outline">Explore work <ArrowUpRight aria-hidden="true" /></Link></div>
          </motion.div>
        </div>
        <div className="hero-bottom-bar"><a href="#selected-work" className="hero-scroll">Discover the work <ArrowDown aria-hidden="true" /></a><Link to="/work/midnight-drive" className="hero-featured"><span>Featured concept</span><span>Midnight Drive <ArrowUpRight aria-hidden="true" /></span></Link></div>
      </section>
      <section className="home-work section" id="selected-work" aria-labelledby="selected-title">
        <Reveal className="section-top"><div><p className="eyebrow">Highlighted projects</p><h2 id="selected-title">A few standout frames.</h2></div><Link className="button button-outline" to="/work">View all work <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <p className="collection-note">Concept studies in motion and photography. Not client commissions.</p>
        <div className="project-grid home-projects">{featured.map((project, index) => <ProjectCard project={project} key={project.id} index={index} />)}</div>
      </section>
      <section className="home-services section" aria-labelledby="capabilities-title">
        <Reveal className="section-top"><div><p className="eyebrow">What we do</p><h2 id="capabilities-title">Your idea. Expertly finished.</h2></div><Link className="text-link" to="/services">Explore services <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <div className="capability-grid">{capabilities.map(({ icon: Icon, ...item }) => <Reveal key={item.name}><Link to={`/contact?service=${encodeURIComponent(item.service)}`} className="capability-card"><Icon className="capability-icon" aria-hidden="true" /><h3>{item.name}</h3><p>{item.description}</p><span className="capability-detail">{item.detail}</span><span className="capability-action">Let’s talk <ArrowUpRight aria-hidden="true" /></span></Link></Reveal>)}</div>
      </section>
      <section className="home-process section" aria-labelledby="process-title">
        <Reveal className="section-top"><div><p className="eyebrow">A simple process</p><h2 id="process-title">From first idea to final frame.</h2></div><Link to="/team" className="text-link">Meet the team <ArrowUpRight aria-hidden="true" /></Link></Reveal>
        <div className="process-grid">{steps.map((step, index) => <Reveal key={step.title}><span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p></Reveal>)}</div>
      </section>
      <Testimonials records={clientTestimonials} />
      <CTA />
    </div>
  );
}
