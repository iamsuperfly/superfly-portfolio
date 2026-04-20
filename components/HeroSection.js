import SectionWrapper from './SectionWrapper';

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" title="Intro">
      <h1 className="hero-title">I design and build digital products with calm precision.</h1>
      <p className="hero-copy">
        Full-stack developer focused on clean architecture, thoughtful motion, and experiences that feel premium without trying too hard.
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href="#projects">
          View Projects
        </a>
        <a className="button button-ghost" href="#contact">
          Contact Me
        </a>
      </div>
    </SectionWrapper>
  );
}
