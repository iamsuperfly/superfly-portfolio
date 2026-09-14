import Link from 'next/link';
import Navbar from '../../components/Navbar';
import ProjectCard from '../../components/ProjectCard';
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
              <p className="section-label">Published work</p>
              <h1 className="page-title">Projects</h1>
              <p className="page-intro">
                Public builds you can open: RepSolana on Solana, Emma Gentle for a hardware counter,
                and anything else published from /admin.
              </p>
            </div>
            <Link className="button button-ghost" href="/#projects">Back to home</Link>
          </div>
          {projects.length > 0 ? (
            <div className="projects-grid projects-catalogue-grid">
              {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
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
