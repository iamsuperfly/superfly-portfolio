import Link from 'next/link';
import { projectImageSource } from '../lib/projects';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectCard({ project }) {
  const imageSource = projectImageSource(project);
  const technologies = project.technologies || [];
  const label = project.label || technologies[0] || 'Project highlight';

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
        <p className="project-description">{project.description}</p>
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
            <GitHubIcon />
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
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </article>
  );
}