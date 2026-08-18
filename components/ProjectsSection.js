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
        <>
          <p className="project-track-hint" aria-hidden="true">Swipe to explore</p>
          <ProjectTrack>
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            <Link className="project-more-card" href="/projects">
              <span className="project-label">Project Highlights</span>
              <span className="project-more-title">View More</span>
              <span className="project-more-copy">Explore the full collection of builds, experiments, and products.</span>
              <span className="project-more-arrow" aria-hidden="true">↗</span>
            </Link>
          </ProjectTrack>
        </>
      ) : (
        <div className="empty-state">
          <p className="project-label">Project Highlights</p>
          <p className="empty-state-subtext">New work will appear here as projects are published.</p>
        </div>
      )}
    </SectionWrapper>
  );
}