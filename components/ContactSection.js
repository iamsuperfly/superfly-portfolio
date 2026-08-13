import Image from 'next/image';
import SectionWrapper from './SectionWrapper';

const email = 'iamsuperfly02@gmail.com';

const channels = [
  {
    label: 'X',
    href: 'https://x.com/iamsuperflyy',
    icon: '/images/icons/images (1).png',
    alt: 'X icon',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/iamsuperfly',
    icon: '/images/icons/images.png',
    alt: 'GitHub icon',
  },
  {
    label: 'Email',
    href: `mailto:${email}`,
    icon: '/images/icons/1000740531-removebg-preview.png',
    alt: 'Email icon',
  },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact">
      <p className="contact-copy">Have an idea, collaboration, or build request? Let’s talk.</p>

      <a className="contact-link" href={`mailto:${email}`}>
        {email}
      </a>

      <div className="contact-channels">
        {channels.map((channel) => (
          <a
            key={channel.label}
            className="channel-link"
            href={channel.href}
            target={channel.href.startsWith('http') ? '_blank' : undefined}
            rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={channel.label}
          >
            <Image src={channel.icon} alt={channel.alt} className="channel-icon" width={19} height={19} />
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
