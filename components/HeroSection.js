import SectionWrapper from './SectionWrapper';

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" title="Superfly">
      <div className="brand-lockup">
        <img
          className="brand-image"
          src="/images/branding/IMG_20251226_201906_741.jpg"
          alt="Superfly profile logo"
        />
        <div>
          <p className="brand-name">Superfly</p>
          <p className="brand-tagline">One build at a time.</p>
        </div>
      </div>

      <h1 className="hero-title">Bringing your ideas to life.</h1>
      <p className="hero-copy">
        Independent developer and creator focused on building useful tools and documenting the process.
      </p>

      <div className="hero-actions">
        <a className="button button-primary" href="#projects">
          Explore Builds
        </a>
        <a className="button button-ghost" href="#contact">
          Connect
        </a>
      </div>
    </SectionWrapper>
  );
}
