import SectionWrapper from './SectionWrapper';

const channels = [
  {
    label: 'X',
    href: 'https://x.com/killsh0tx',
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
    href: 'mailto:sendamailtosuperfly@gmail.com',
    icon: '/images/icons/1000740531-removebg-preview.png',
    alt: 'Email icon',
  },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact">
      <p className="contact-copy">For conversations.</p>

      <a className="contact-link" href="mailto:sendamailtosuperfly@gmail.com">
        sendamailtosuperfly@gmail.com
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
            <img src={channel.icon} alt={channel.alt} className="channel-icon" />
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
