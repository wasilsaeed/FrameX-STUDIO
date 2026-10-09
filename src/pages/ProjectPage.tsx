import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BeforeAfter } from '../components/portfolio/BeforeAfter';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { Seo } from '../components/common/Seo';
import { projects } from '../data/projects';

const contactServices = {
  'Video Editing': 'Video editing',
  'Photo Editing': 'Photo retouching',
  Retouching: 'Photo retouching',
  Commercial: 'Commercial editing',
  'Social Media': 'Short-form content',
};

const finishingDirections: Record<number, string> = {
  1: 'Cut for momentum. Shape the contrast. Let sound carry the movement.',
  2: 'Preserve texture, balance the tones, and let the editorial light lead.',
  3: 'Give material detail space, with clean color and a precise commercial rhythm.',
  4: 'Connect atmosphere, movement, and ambient sound into a fluid city story.',
  5: 'Lead with a strong hook, readable captions, and purposeful vertical pacing.',
  6: 'Balance the light, straighten the frame, and keep the space feeling natural.',
  7: 'Build a consistent brand rhythm through transitions, graphics, and finishing.',
  8: 'Keep expression and texture present through restrained skin and tone work.',
  9: 'Carry the energy through movement, decisive cuts, and well-placed sound.',
  10: 'Keep product color accurate, backgrounds clean, and the catalog consistent.',
  11: 'Protect the story with clear pacing, purposeful graphics, and clean audio.',
  12: 'Shape a warm look with controlled contrast and coherent color across the sequence.',
};

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) return <Navigate to="/404" replace />;
  const related = projects.filter(p => p.id !== project.id && p.filter === project.filter).slice(0, 2);
  if (related.length < 2) related.push(...projects.filter(p => p.id !== project.id && !related.includes(p)).slice(0, 2 - related.length));
  const service = project.category.includes('Color Grading') ? 'Color grading' : contactServices[project.filter];
  const contactHref = `/contact?service=${encodeURIComponent(service)}`;
  const hasComparison = project.beforeImage && project.afterImage && project.beforeImage === project.afterImage;
  const description = project.description.split(' The comparison')[0];
  const finishingDirection = finishingDirections[project.id] ?? `${project.services.join(' · ')}.`;
  return <>
    <Seo title={project.title} description={project.description} />
    <article className="case-study">
      <section className="case-opening">
        <header className="case-header">
          <Link to="/work" className="case-back"><ArrowLeft aria-hidden="true" /> All work</Link>
          <div className="case-title-row"><div><p className="eyebrow">CONCEPT STUDY</p><h1>{project.title}</h1><p className="case-category">{project.category}</p></div><Link to={contactHref} className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link></div>
        </header>
        <figure className="case-viewer">
          <div className="case-viewer-toolbar"><span className="case-viewer-brand"><span className="case-frame-mark" aria-hidden="true" />FRAMEX <span>/ POST-PRODUCTION</span></span><span className="case-viewer-state"><i aria-hidden="true" />Concept frame</span></div>
          <div className="case-cover"><img src={project.thumbnail} alt={`${project.title} visual concept`} loading="eager" decoding="async" /><span className="case-frame-guides" aria-hidden="true"><i /><i /><i /><i /></span></div>
          <figcaption className="case-viewer-footer"><span>Visual reference</span><span>16:9 <span>FRAME VIEW</span></span></figcaption>
        </figure>
        <div className="case-overview">
          <div className="case-concept-copy"><p className="case-description">{description}</p><div className="case-craft-note"><span>Finishing direction</span><p>{finishingDirection}</p></div></div>
          <dl className="case-details"><div><dt>Discipline</dt><dd>{service}</dd></div><div><dt>Scope</dt><dd>{project.services.join(' · ')}</dd></div><div><dt>Study</dt><dd>Illustrative concept</dd></div></dl>
        </div>
      </section>
      {hasComparison && <section className="case-comparison" aria-labelledby="color-study-heading"><div className="case-section-heading"><h2 id="color-study-heading">Color direction.</h2><p>An illustrative treatment of the same photo. Drag or use the arrow keys.</p></div><BeforeAfter before={project.beforeImage!} after={project.afterImage!} /></section>}
      <section className="case-related" aria-labelledby="related-heading"><div className="case-section-heading"><h2 id="related-heading">More concepts</h2><Link to="/work" className="text-link">All work <ArrowUpRight aria-hidden="true" /></Link></div><div className="project-grid">{related.map((p, index) => <ProjectCard project={p} index={index} key={p.id} />)}</div></section>
      <section className="case-next"><div><p className="eyebrow">{project.mediaType === 'image' ? 'YOUR IMAGES. OUR FINISH.' : 'YOUR FOOTAGE. OUR FINISH.'}</p><h2>Let’s shape your next project.</h2></div><Link to={contactHref} className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link></section>
    </article>
  </>;
}
