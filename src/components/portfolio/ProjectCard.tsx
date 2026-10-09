import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link to={`/work/${project.slug}`} className="project-card">
      <div className="project-media">
        <img src={project.thumbnail} alt={`${project.title} — ${project.category}`} loading={index > 1 ? 'lazy' : 'eager'} />
        <span className="demo-badge">Concept / Demo</span>
        <span className="project-open" aria-hidden="true"><ArrowUpRight /></span>
      </div>
      <div className="project-meta"><div><p>{String(project.id).padStart(3, '0')} / {project.category}</p><h3>{project.title}</h3></div><ArrowUpRight aria-hidden="true" /></div>
    </Link>
  );
}
