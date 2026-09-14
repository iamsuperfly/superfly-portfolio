import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" title="Work">
      <div className="hero-identity">
        <p className="brand-wordmark">Superfly</p>
        <div className="hero-portrait-row">
          <div className="brand-image-wrap" aria-hidden="false">
            <Image
              className="brand-image"
              src="/images/branding/IMG_20251226_201906_741.jpg"
              alt="Portrait of Superfly"
              fill
              sizes="72px"
              priority
            />
          </div>
          <div>
            <p className="brand-name">Superfly</p>
            <p className="brand-tagline">Builder. Ships work, then the next experiment.</p>
          </div>
        </div>
      </div>

      <h1 className="hero-title">I build things, put them online, and keep them running.</h1>
      <p className="hero-copy">
        Recent public work includes RepSolana, an on-chain reputation passport, and Emma Gentle, a
        hardware-shop catalogue with WhatsApp enquiry. More experiments land here when they are
        ready to show.
      </p>

      <div className="hero-actions">
        <a className="button button-primary" href="#projects">
          See builds
        </a>
        <a className="button button-ghost" href="#contact">
          Email me
        </a>
      </div>
    </SectionWrapper>
  );
}
