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
  return <>
    <Seo title={project.title} description={project.description} />
    <article className="case-study">
      <section className="case-opening">
        <header className="case-header">
          <Link to="/work" className="case-back"><ArrowLeft aria-hidden="true" /> All work</Link>
          <div className="case-title-row"><div><p className="eyebrow">CONCEPT STUDY</p><h1>{project.title}</h1><p className="case-category">{project.category}</p></div><Link to={contactHref} className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link></div>
        </header>
        <div className="case-cover"><img src={project.thumbnail} alt={`${project.title} visual concept`} loading="eager" decoding="async" /></div>
        <div className="case-overview">
          <p className="case-description">{description}</p>
          <dl className="case-details"><div><dt>Focus</dt><dd>{project.services.join(' · ')}</dd></div><div><dt>Format</dt><dd>{project.mediaType === 'video' ? 'Video concept' : 'Photo concept'}</dd></div><div><dt>Status</dt><dd>Illustrative study</dd></div></dl>
        </div>
      </section>
      {hasComparison && <section className="case-comparison" aria-labelledby="color-study-heading"><div className="case-section-heading"><h2 id="color-study-heading">Explore the color.</h2><p>An illustrative treatment of the same photo. Drag or use the arrow keys.</p></div><BeforeAfter before={project.beforeImage!} after={project.afterImage!} /></section>}
      <section className="case-related" aria-labelledby="related-heading"><div className="case-section-heading"><h2 id="related-heading">More concepts</h2><Link to="/work" className="text-link">All work <ArrowUpRight aria-hidden="true" /></Link></div><div className="project-grid">{related.map((p, index) => <ProjectCard project={p} index={index} key={p.id} />)}</div></section>
      <section className="case-next"><h2>Let’s shape your next project.</h2><Link to={contactHref} className="button">Start a project <ArrowUpRight aria-hidden="true" /></Link></section>
    </article>
  </>;
}
