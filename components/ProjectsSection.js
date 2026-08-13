import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

const projects = [
  {
    title: 'RepSolana',
    label: 'On-Chain Reputation Passport',
    description:
      "Turns a Solana wallet's real on-chain activity into a dynamic reputation score and soulbound compressed NFT passport.",
    tags: ['Vite', 'React', 'TypeScript', 'Solana Web3.js', 'Metaplex', 'Vercel'],
    image: {
      src: '/images/projects/eaf66f14-4035-4788-bdb1-06803cdcfe89.png',
      alt: 'RepSolana dashboard preview showing an on-chain reputation passport interface',
    },
    links: {
      github: 'https://github.com/iamsuperfly/rep-solana',
      live: 'https://rep-solana.vercel.app/',
    },
  },
];

const upcomingSlots = [
  {
    title: 'Next Project',
    description: 'Add the next real build here when project details, links, and visuals are ready.',
  },
  {
    title: 'Future Build',
    description: 'Reserved for another polished project card without inventing placeholder project content.',
  },
];

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

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="Projects">
      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card project-card-featured">
            <div className="project-preview" aria-label={`${project.title} visual preview`}>
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 960px) 33vw, (min-width: 680px) 50vw, 92vw"
                className="project-image"
                priority
              />
            </div>
            <div className="project-card-body">
              <p className="project-label">{project.label}</p>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags" aria-label={`${project.title} technology stack`}>
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="project-links">
              {project.links.github && (
                <a
                  className="project-link"
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} on GitHub`}
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </a>
              )}
              {project.links.live && (
                <a
                  className="project-link"
                  href={project.links.live}
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
        ))}

        {upcomingSlots.map((slot) => (
          <article key={slot.title} className="project-card project-card-upcoming" aria-label={`${slot.title} slot`}>
            <div className="project-card-body">
              <p className="project-label">Reserved slot</p>
              <h3 className="project-title">{slot.title}</h3>
              <p className="project-description">{slot.description}</p>
            </div>
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
