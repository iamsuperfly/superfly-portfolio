import SectionWrapper from './SectionWrapper';

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="empty-state" role="status" aria-live="polite">
        <p className="empty-state-message">Empty for now — new builds dropping soon.</p>
        <p className="empty-state-subtext">Follow on X or GitHub for updates.</p>
      </div>
    </SectionWrapper>
  );
}
