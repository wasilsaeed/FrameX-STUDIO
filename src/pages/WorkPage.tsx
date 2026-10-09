import { useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CTA } from '../components/common/CTA';
import { Seo } from '../components/common/Seo';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { filters, projects } from '../data/projects';

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All Work');
  const reduce = useReducedMotion();
  const visible = useMemo(() => filter === 'All Work' ? projects : projects.filter(p => p.filter === filter), [filter]);
  return <>
    <Seo title="Our Work" description="Explore FrameX Studio concept projects across video editing, commercial work, social content, and photo retouching." />
    <div className="work-index">
      <section className="portfolio-header">
        <p className="eyebrow">WORK</p>
        <h1>A better finish.</h1>
        <p className="portfolio-intro">12 illustrative concept studies in video, photo, and color.</p>
      </section>
      <section className="portfolio-section" aria-label="Concept portfolio">
        <div className="portfolio-toolbar">
          <div className="filters" role="group" aria-label="Filter projects">{filters.map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item} aria-pressed={filter === item} aria-controls="work-results">{item}</button>)}</div>
          <p className="portfolio-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'study' : 'studies'}</p>
        </div>
        <motion.div layout={!reduce} className="project-grid portfolio-grid" id="work-results" transition={{ layout: { duration: reduce ? 0 : .3 } }}>
          <AnimatePresence initial={false} mode="popLayout">{visible.map((project, i) => <motion.div className="portfolio-item" layout={reduce ? false : 'position'} key={project.id} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : .22, layout: { duration: reduce ? 0 : .3, ease: [0.22, 1, 0.36, 1] } }}><ProjectCard project={project} index={i} /></motion.div>)}</AnimatePresence>
        </motion.div>
      </section>
    </div>
    <CTA />
  </>;
}
