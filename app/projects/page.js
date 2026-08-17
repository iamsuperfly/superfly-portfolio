import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
import ProjectTrack from '../../components/ProjectTrack';
import { getProjects } from '../../lib/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <Navbar />
      <main className="site-shell projects-page">
        <section className="section reveal is-visible">
          <div className="projects-page-heading">
            <div>
              <p className="section-label">Portfolio</p>
              <h1 className="page-title">All Projects</h1>
              <p className="page-intro">A growing collection of products, experiments, and useful digital work.</p>
            </div>
            <Link className="button button-ghost" href="/#projects">Back to highlights</Link>
          </div>
          {projects.length > 0 ? (
            <ProjectTrack>
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </ProjectTrack>
          ) : (
            <div className="empty-state">
              <p className="project-label">No published projects yet</p>
              <p className="empty-state-subtext">Published projects will appear here.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}