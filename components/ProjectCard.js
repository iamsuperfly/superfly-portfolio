import Link from 'next/link';
import { caseNote } from '../lib/caseNotes';
import { projectImageSource } from '../lib/projects';
import { IconGithub } from './icons';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

export default function ProjectCard({ project }) {
  const imageSource = projectImageSource(project);
  const technologies = project.technologies || [];
  const note = caseNote(project.slug);
  const label = note?.label || project.label || technologies[0] || 'Project highlight';
  const description = note?.summary || project.description;

  return (
    <article className="project-card project-card-featured">
      <Link
        className="project-preview"
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} project details`}
      >
        {imageSource ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="project-image" src={imageSource} alt={`${project.title} preview`} />
        ) : (
          <span className="project-image-fallback">Project preview coming soon</span>
        )}
      </Link>
      <div className="project-card-body">
        <p className="project-label">{label}</p>
        <h3 className="project-title">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="project-description">{description}</p>
        {technologies.length > 0 && (
          <div className="project-tags" aria-label={`${project.title} technology stack`}>
            {technologies.map((technology) => (
              <span key={technology} className="project-tag">{technology}</span>
            ))}
          </div>
        )}
      </div>
      <div className="project-links">
        <Link className="project-link" href={`/projects/${project.slug}`}>
          <ArrowIcon />
          <span>View project</span>
        </Link>
        {project.github_url && (
          <a
            className="project-link"
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <IconGithub size={14} />
            <span>GitHub</span>
          </a>
        )}
        {project.project_url && (
          <a
            className="project-link"
            href={project.project_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} live demo`}
          >
            <ArrowIcon />
            <span>Live</span>
          </a>
        )}
      </div>
    </article>
  );
}
