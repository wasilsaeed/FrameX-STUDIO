import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CTA } from '../components/common/CTA';
import { Seo } from '../components/common/Seo';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { filters, projects } from '../data/projects';

export default function WorkPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All Work');
  const visible = useMemo(() => filter === 'All Work' ? projects : projects.filter(p => p.filter === filter), [filter]);
  return <>
    <Seo title="Our Work" description="Explore FrameX Studio concept projects across video editing, commercial work, social content, and photo retouching." />
    <div className="work-index">
      <section className="page-hero editorial-hero"><p className="eyebrow">WORK / CONCEPT COLLECTION</p><h1>Stories, shaped<br /><em>frame by frame.</em></h1><div className="editorial-hero-copy"><p>A collection of twelve concept studies exploring motion, photography, and the craft of the finish.</p><span className="work-collection-note">All projects shown are concept work.</span></div></section>
      <section className="section portfolio-section">
        <div className="portfolio-toolbar"><div className="filters" role="group" aria-label="Filter projects">{filters.map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item} aria-pressed={filter === item} aria-controls="work-results">{item}</button>)}</div><p className="portfolio-count" role="status" aria-live="polite">{String(visible.length).padStart(2, '0')} projects</p></div>
        <motion.div layout className="project-grid portfolio-grid" id="work-results"><AnimatePresence>{visible.map((project, i) => <motion.div layout key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProjectCard project={project} index={i} /></motion.div>)}</AnimatePresence></motion.div>
      </section>
    </div>
    <CTA />
  </>;
}
