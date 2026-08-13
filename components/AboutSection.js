import SectionWrapper from './SectionWrapper';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <p className="about-copy">{`I’m Superfly. I build things, experiment with ideas, and share what I find interesting.

Most of my work starts with a simple question: “Can this actually be built?”`}</p>

      <dl className="about-details">
        <div>
          <dt>For</dt>
          <dd>Builders, individuals, and brands.</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>Open for Collaboration</dd>
        </div>
      </dl>
    </SectionWrapper>
  );
}
