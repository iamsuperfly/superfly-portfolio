import SectionWrapper from './SectionWrapper';

const projects = [
  {
    name: 'Nova Commerce',
    description: 'A conversion-focused storefront system with modular content blocks and realtime analytics overlays.',
  },
  {
    name: 'Pulse Board',
    description: 'An internal product dashboard that turns noisy operational data into clear decision signals.',
  },
  {
    name: 'Slate Studio',
    description: 'A minimalist portfolio CMS for creative teams that value speed, typography, and editorial control.',
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.name} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
