import Link from 'next/link';
import SectionWrapper from './SectionWrapper';
import ProjectCard from './ProjectCard';
import ProjectTrack from './ProjectTrack';
import { getProjects } from '../lib/projects';

export const dynamic = 'force-dynamic';

export default async function ProjectsSection() {
  const projects = await getProjects({ highlightedOnly: true, limit: 4 });

  return (
    <SectionWrapper id="projects" title="Builds">
      <div className="projects-section-heading">
        <p>RepSolana and Emma Gentle first. Other published work follows from the CMS.</p>
        <Link className="view-more-link" href="/projects">All projects</Link>
      </div>
      {projects.length > 0 ? (
        <>
          <p className="project-track-hint" aria-hidden="true">Swipe for more</p>
          <ProjectTrack>
            {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
            <Link className="project-more-card" href="/projects">
              <span className="project-label">Archive</span>
              <span className="project-more-title">All projects</span>
              <span className="project-more-copy">Open the full published list, including GitHub and live links.</span>
              <span className="project-more-arrow" aria-hidden="true">↗</span>
            </Link>
          </ProjectTrack>
        </>
      ) : (
        <div className="empty-state">
          <p className="project-label">Builds</p>
          <p className="empty-state-subtext">Published projects from the CMS will appear here.</p>
        </div>
      )}
    </SectionWrapper>
  );
}
