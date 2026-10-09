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
    <section className="page-hero"><p className="eyebrow">SELECTED WORK / 001—012</p><h1>Stories, shaped<br /><em>frame by frame.</em></h1><p>Twelve concept studies. One point of view: every visual choice should move the story forward.</p></section>
    <section className="section portfolio-section">
      <div className="filters" role="group" aria-label="Filter projects">{filters.map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
      <motion.div layout className="project-grid portfolio-grid"><AnimatePresence>{visible.map((project, i) => <motion.div layout key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><ProjectCard project={project} index={i} /></motion.div>)}</AnimatePresence></motion.div>
    </section>
    <CTA />
  </>;
}
