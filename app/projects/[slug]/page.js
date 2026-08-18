import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import ProjectGallery from '../../../components/ProjectGallery';
import { getProjectBySlug, projectImageSource } from '../../../lib/projects';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return project
    ? { title: `${project.title} — Superfly Portfolio`, description: project.description }
    : { title: 'Project — Superfly Portfolio' };
}

export default async function ProjectDetailsPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const imageSource = projectImageSource(project);
  const technologies = project.technologies || [];

  return (
    <>
      <Navbar />
      <main className="site-shell">
        <section className="section reveal is-visible project-detail">
          <Link className="back-link" href="/projects">← All projects</Link>
          <div className="project-detail-grid">
            <div className="project-detail-preview">
              {imageSource ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="project-image" src={imageSource} alt={`${project.title} preview`} />
              ) : (
                <span className="project-image-fallback">Project preview coming soon</span>
              )}
            </div>
            <div className="project-detail-copy">
              <p className="project-label">{project.label || technologies[0] || 'Project'}</p>
              <h1 className="page-title">{project.title}</h1>
              <p className="project-detail-description">{project.description}</p>
              {project.extended_description ? (
                <div className="project-detail-extended">
                  <h2>About this project</h2>
                  <p>{project.extended_description}</p>
                </div>
              ) : null}
              <ProjectGallery projectTitle={project.title} items={project.gallery} />
              {technologies.length > 0 && (
                <div className="project-tags" aria-label={`${project.title} technology stack`}>
                  {technologies.map((technology) => (
                    <span key={technology} className="project-tag">{technology}</span>
                  ))}
                </div>
              )}
              <div className="project-detail-actions">
                {project.project_url && (
                  <a className="button button-primary" href={project.project_url} target="_blank" rel="noreferrer">
                    Visit project
                  </a>
                )}
                {project.github_url && (
                  <a className="button button-ghost" href={project.github_url} target="_blank" rel="noreferrer">
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}