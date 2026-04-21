import SectionWrapper from './SectionWrapper';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <p className="about-copy">
        I’m a developer and creator operating at the edge of the digital frontier. My workflow is built on efficiency.
        I build tools that solve real problems. If it’s technical and interesting, I’m building it.
      </p>

      <dl className="about-details">
        <div>
          <dt>Specialization</dt>
          <dd>Mobile-first development and technical content creation.</dd>
        </div>
        <div>
          <dt>Audience</dt>
          <dd>Builders, degens, and brands of any kind.</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>Open for Collaboration</dd>
        </div>
      </dl>
    </SectionWrapper>
  );
}
