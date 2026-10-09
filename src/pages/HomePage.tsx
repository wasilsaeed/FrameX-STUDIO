import { ArrowDown, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Seo } from '../components/common/Seo';
import { Reveal } from '../components/common/Reveal';
import { SectionHeader } from '../components/common/SectionHeader';
import { Marquee } from '../components/common/Marquee';
import { CTA } from '../components/common/CTA';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { testimonialPlaceholder } from '../data/testimonials';

const workflow = [
  ['01', 'Share your vision', 'Tell us the goal, the audience, and what the finished work needs to do.'],
  ['02', 'Plan & coordinate', 'We shape the scope, organize the inputs, and create a clear production path.'],
  ['03', 'Create & refine', 'The edit takes form, feedback stays focused, and every detail is brought into line.'],
  ['04', 'Deliver & elevate', 'Approved work arrives organized, polished, and ready for the right channels.'],
];

export default function HomePage() {
  const reduce = useReducedMotion();
  return (
    <>
      <Seo title="Every Frame, Elevated" description="Premium video editing and photo retouching that transforms raw content into powerful visual experiences." />
      <section className="hero">
        <img className="hero-bg" src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=2200&q=88" alt="Cinematic theatre and screen" />
        <div className="hero-overlay" />
        <div className="frame-corners" aria-hidden="true" />
        <div className="hero-content">
          <motion.p className="eyebrow" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}>FRAMEX STUDIO — CREATIVE POST-PRODUCTION</motion.p>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .1 }}>We don’t just edit.<br /><em>We elevate.</em></motion.h1>
          <motion.div className="hero-bottom" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .35 }}>
            <p>Premium video editing and photo retouching that turns raw content into powerful visual experiences.</p>
            <div className="hero-actions"><Link className="button" to="/contact">Start a project <ArrowUpRight /></Link><Link className="text-button" to="/work"><Play /> Explore our work</Link></div>
          </motion.div>
        </div>
        <a className="scroll-cue" href="#intro">Scroll <ArrowDown /></a>
      </section>

      <section className="intro section" id="intro">
        <Reveal><p className="eyebrow">THE STUDIO / 001</p><h2>Creative precision.<br /><span>Powerful visuals.</span></h2></Reveal>
        <Reveal className="intro-copy"><p>FrameX is a post-production partner for creators and brands who care how every cut, color, and detail lands.</p><Link className="text-link" to="/about">Inside the studio <ArrowUpRight /></Link></Reveal>
      </section>

      <Marquee />

      <section className="section work-preview">
        <Reveal><SectionHeader eyebrow="SELECTED WORK / 002" title="A sharper way to tell it." copy="Concept work exploring pace, tone, texture, and the many ways a visual can hold attention." /></Reveal>
        <div className="project-grid featured-grid">{projects.filter(p => p.featured).slice(0, 4).map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}</div>
        <div className="section-end"><Link className="button button-outline" to="/work">View all projects <ArrowUpRight /></Link></div>
      </section>

      <section className="services-preview section">
        <Reveal><SectionHeader eyebrow="CAPABILITIES / 003" title="From raw to remarkable." /></Reveal>
        <div className="service-rows">
          {services.map((service) => <Link to="/services" className="service-row" key={service.number}><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><ArrowUpRight /></Link>)}
        </div>
      </section>

      <section className="partnership section">
        <Reveal className="partnership-image"><img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1600&q=85" alt="Post-production editing workspace" loading="lazy" /><span>DETAIL / DISCIPLINE / DIRECTION</span></Reveal>
        <Reveal className="partnership-copy"><p className="eyebrow">WHY FRAMEX / 004</p><h2>More than editing.<br />A creative partnership.</h2><p>Good work needs more than software. It needs someone protecting the idea, organizing the details, and making the whole process feel considered.</p><ul><li>Purposeful creative decisions</li><li>Clear communication</li><li>Consistent visual quality</li><li>Organized delivery</li></ul></Reveal>
      </section>

      <section className="workflow section">
        <Reveal><SectionHeader eyebrow="OUR PROCESS / 005" title="Clear at every cut." copy="A simple four-step workflow keeps creative energy high and project friction low." /></Reveal>
        <div className="workflow-grid">{workflow.map(([n, title, copy]) => <Reveal className="workflow-step" key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </section>

      <section className="testimonial section"><Reveal><p className="eyebrow">CLIENT FEEDBACK / 006</p><blockquote>“{testimonialPlaceholder.quote}”</blockquote><p>{testimonialPlaceholder.name}</p><small>{testimonialPlaceholder.label}</small></Reveal></section>
      <CTA />
    </>
  );
}
