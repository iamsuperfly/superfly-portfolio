import SectionWrapper from './SectionWrapper';

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact">
      <p className="contact-copy">Open to select collaborations, product consulting, and full-time opportunities.</p>
      <a className="contact-link" href="mailto:hello@example.com">
        hello@example.com
      </a>
    </SectionWrapper>
  );
}
