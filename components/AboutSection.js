import SectionWrapper from './SectionWrapper';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" title="About">
      <p className="about-copy">
        I am Superfly. I write software, publish it, and stay close to the admin desk when something
        needs updating. The question is usually whether a tool can ship and stay useful, not whether
        it looks like a pitch deck.
      </p>
      <p className="about-copy">
        Lately that has meant a Solana reputation experiment and a live electrical catalogue for a
        shop that sells over WhatsApp. I work from Port Harcourt and the public internet.
      </p>

      <dl className="about-details">
        <div>
          <dt>Builds</dt>
          <dd>Web apps, catalogues, and on-chain experiments that people can actually open.</dd>
        </div>
        <div>
          <dt>Availability</dt>
          <dd>Open to paid builds and collaborations. Email first.</dd>
        </div>
      </dl>
    </SectionWrapper>
  );
}
