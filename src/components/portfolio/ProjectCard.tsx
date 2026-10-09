import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link to={`/work/${project.slug}`} className="project-card" aria-label={`Explore ${project.title}, a concept study`}>
      <div className="project-media">
        <img src={project.thumbnail} alt="" loading={index > 1 ? 'lazy' : 'eager'} decoding="async" />
        <span className="project-open" aria-hidden="true"><ArrowUpRight /></span>
      </div>
      <div className="project-meta"><h3>{project.title}</h3><p>{project.category}</p></div>
    </Link>
  );
}
