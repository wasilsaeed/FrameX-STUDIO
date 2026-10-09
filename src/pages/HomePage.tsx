import { ArrowDownRight, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Seo } from '../components/common/Seo';
import { Reveal } from '../components/common/Reveal';
import { CTA } from '../components/common/CTA';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projects } from '../data/projects';
import { faqs } from '../data/faq';

const disciplines = [
  { number: '01', title: 'Video editing', tags: 'Brand films · YouTube · Commercials', copy: 'A considered cut. A stronger story. From the first hook to the final frame.' },
  { number: '02', title: 'Photo retouching', tags: 'Beauty · Product · Editorial', copy: 'Natural detail, refined color, and a finish that makes the image feel complete.' },
  { number: '03', title: 'Short-form content', tags: 'Reels · Shorts · Social campaigns', copy: 'Sharp, platform-ready edits that hold attention and keep your identity intact.' },
  { number: '04', title: 'Color & finishing', tags: 'Color grading · Motion titles · Sound', copy: 'The final layer of intention. Cohesive tone, precise details, and the right atmosphere.' },
];

export default function HomePage() {
  const reduce = useReducedMotion();
  const featured = projects.filter(project => [1, 2, 3, 4].includes(project.id));
  return (
    <div className="studio-home">
      <Seo title="Every Frame, Elevated" description="Video editing, photo retouching, and creative post-production for creators, brands, and agencies. Every frame, elevated." />
      <section className="home-hero">
        <div className="hero-topline"><span><i aria-hidden="true" />Every frame, elevated.</span><span>Independent creative studio <span className="topline-year">/ 2026</span></span></div>
        <div className="hero-masthead">
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: [0.2, 1, 0.3, 1] }}>We don’t just edit.<br /><em>We elevate.</em></motion.h1>
          <motion.div className="hero-pitch" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }}><p>Video. Photo. A better finish.<br />Thoughtful post-production for<br className="desktop-break" /> visuals worth paying attention to.</p><Link to="/contact" className="button">Start a project <ArrowUpRight /></Link></motion.div>
        </div>
        <Link to="/work/midnight-drive" className="hero-scene" aria-label="Explore Midnight Drive, a cinematic automotive concept project">
          <img src="/media/midnight-drive.jpg" alt="Silver sports car crossing a volcanic landscape at sunset — automotive concept artwork" loading="eager" decoding="async" />
          <div className="scene-top"><span><span className="frame-mark" aria-hidden="true" />FRAMEX / IN FRAME</span><span>01 — AUTOMOTIVE</span></div>
          <div className="scene-bottom"><div><span className="scene-category">CINEMATIC COLOR / CONCEPT WORK</span><h2>Midnight Drive</h2></div><span className="scene-link">Explore the concept <span><ArrowUpRight /></span></span></div>
        </Link>
        <div className="hero-footnote"><span>Post-production, with purpose.</span><div><span>Video editing</span><span>Photo retouching</span><span>Color & finishing</span></div><ArrowDownRight size={18} aria-hidden="true" /></div>
      </section>
      <section className="home-intro" id="intro">
        <p className="eyebrow">01 / THE STUDIO</p>
        <Reveal><h2>Raw material.<br /><span>Remarkable potential.</span></h2></Reveal>
        <Reveal className="home-intro-copy"><p>We shape footage and imagery into work that feels intentional. A precise edit, a natural retouch, a color palette that tells the right story.</p><Link className="text-link" to="/about">A little about us <ArrowUpRight /></Link></Reveal>
      </section>
      <section className="home-work">
        <div className="home-section-top"><p className="eyebrow">02 / SELECTED WORK</p><span>THE ART OF THE AFTER</span></div>
        <div className="home-section-heading"><h2>A few frames.<br /><span>A different feeling.</span></h2><Link className="text-link" to="/work">All 12 projects <ArrowUpRight /></Link></div>
        <p className="work-disclosure">Concept studies in editing, retouching, and visual storytelling.</p>
        <div className="project-grid home-projects">{featured.map((project, index) => <ProjectCard project={project} key={project.id} index={index} />)}</div>
      </section>
      <section className="home-capabilities">
        <div className="capabilities-intro"><p className="eyebrow">03 / WHAT WE DO</p><h2>The details<br />make the<br /><em>difference.</em></h2><p>Four disciplines. One considered finish.</p><Link className="text-link" to="/services">Explore services <ArrowUpRight /></Link></div>
        <div className="discipline-list">{disciplines.map(item => <Link to="/services" className="discipline" key={item.number}><span className="discipline-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p><span className="discipline-tags">{item.tags}</span></div><ArrowUpRight aria-hidden="true" /></Link>)}</div>
      </section>
      <section className="home-process">
        <div className="process-intro"><p className="eyebrow">04 / THE WAY WE WORK</p><h2>Good work.<br /><span>Clear process.</span></h2><p>Your operations lead keeps the brief, feedback, and delivery moving. Your creative lead keeps the visual standard high.</p><Link to="/team" className="text-link">Meet the two-person team <ArrowUpRight /></Link></div>
        <div className="process-path"><div><span>01</span><h3>Share the vision</h3><p>Send your footage, references, and the outcome you have in mind.</p></div><div><span>02</span><h3>Plan & coordinate</h3><p>We align the brief, deliverables, and a clear production timeline.</p></div><div><span>03</span><h3>Create & refine</h3><p>Focused creative decisions and an organized feedback process.</p></div><div><span>04</span><h3>Ready to go</h3><p>Polished files, organized delivery, and the formats your channels need.</p></div></div>
      </section>
      <section className="home-questions"><div><p className="eyebrow">A FEW PRACTICAL DETAILS</p><h2>Before the first cut.</h2><Link to="/faq" className="text-link">All questions <ArrowRight /></Link></div><div className="home-answers">{[faqs[5], faqs[4], faqs[6]].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
      <CTA />
    </div>
  );
}
