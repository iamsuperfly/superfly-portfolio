import SectionWrapper from './SectionWrapper';

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="empty-state" role="status" aria-live="polite">
        <p className="empty-state-message">Projects will be published here soon.</p>
        <p className="empty-state-subtext">Check back shortly for new releases.</p>
      </div>
    </SectionWrapper>
  );
}
