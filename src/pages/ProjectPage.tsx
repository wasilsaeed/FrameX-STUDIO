import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BeforeAfter } from '../components/portfolio/BeforeAfter';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { Seo } from '../components/common/Seo';
import { projects } from '../data/projects';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return <Navigate to="/404" replace />;
  const related = projects.filter(p => p.id !== project.id && p.filter === project.filter).slice(0, 2);
  if (related.length < 2) related.push(...projects.filter(p => p.id !== project.id && !related.includes(p)).slice(0, 2 - related.length));
  return <>
    <Seo title={project.title} description={project.description} />
    <article className="case-study">
      <header className="case-header"><Link to="/work" className="back-link"><ArrowLeft /> All work</Link><p className="eyebrow">CONCEPT PROJECT / {String(project.id).padStart(3, '0')}</p><h1>{project.title}</h1><p>{project.category}</p></header>
      <div className="case-cover"><img src={project.thumbnail} alt={`${project.title} project cover`} /><span className="demo-badge">Concept Project / Demo Work</span></div>
      <section className="case-overview section"><div><p className="eyebrow">THE CREATIVE INTENT</p><h2>A study in<br />visual direction.</h2></div><div><p>{project.description}</p><dl><div><dt>Focus</dt><dd>{project.services.join(' · ')}</dd></div>{project.tools.length > 0 && <div><dt>Tools</dt><dd>{project.tools.join(' · ')}</dd></div>}<div><dt>Status</dt><dd>Concept / Demo work</dd></div></dl></div></section>
      <section className="case-reference-section"><p className="eyebrow">VISUAL REFERENCES / CONCEPT EXPLORATION</p><div className="case-gallery">{project.gallery.slice(0, 2).map((image, i) => <img key={image} src={image} alt={`${project.title} concept reference ${i + 1}`} loading="lazy" />)}</div></section>
      {project.beforeImage && project.afterImage && <section className="section comparison"><p className="eyebrow">INTERACTIVE COLOR STUDY</p><h2>A different tone.<br />The same frame.</h2><p className="comparison-note">An illustrative color treatment of one reference image. Drag to compare.</p><BeforeAfter before={project.beforeImage} after={project.afterImage} /></section>}
      <section className="process-note section"><p className="eyebrow">CREATIVE PROCESS</p><h2>Find the rhythm.<br />Refine the frame.</h2><p>The concept begins with mood and intent. From there, structure, color, sound, and detail are refined into one coherent finish—without overworking what already feels true.</p></section>
      <section className="section related"><p className="eyebrow">KEEP EXPLORING</p><h2>Related work</h2><div className="project-grid">{related.map(p => <ProjectCard project={p} key={p.id} />)}</div></section>
      <section className="inline-cta"><h2>Have a project with a similar ambition?</h2><Link to="/contact" className="button">Start a conversation <ArrowUpRight /></Link></section>
    </article>
  </>;
}
