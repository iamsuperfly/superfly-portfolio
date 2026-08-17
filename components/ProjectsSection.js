import Link from 'next/link';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import ProjectTrack from './ProjectTrack';
import { getProjects } from '../lib/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsSection() {
  const projects = await getProjects({ highlightedOnly: true, limit: 4 });

  return (
    <SectionWrapper id="projects" title="Project Highlights">
      <div className="projects-section-heading">
        <p>Selected builds, experiments, and products worth a closer look.</p>
        <Link className="view-more-link" href="/projects">View More</Link>
      </div>
      {projects.length > 0 ? (
        <ProjectTrack>
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </ProjectTrack>
      ) : (
        <div className="empty-state">
          <p className="project-label">Project Highlights</p>
          <p className="empty-state-subtext">New work will appear here as projects are published.</p>
        </div>
      )}
    </SectionWrapper>
  );
}