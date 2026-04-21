import SectionWrapper from './SectionWrapper';

const channels = [
  {
    label: 'X',
    href: 'https://x.com/killsh0tx',
    icon: '/images/icons/images.png',
    alt: 'X icon',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/iamsuperfly',
    icon: '/images/icons/9801502.png',
    alt: 'GitHub icon',
  },
  {
    label: 'Email',
    href: 'mailto:sendamailtosuperfly@gmail.com',
    icon: '/images/icons/images (1).png',
    alt: 'Email icon',
  },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact">
      <p className="contact-copy">For the high-signal conversations.</p>

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
          >
            <img src={channel.icon} alt={channel.alt} className="channel-icon" />
            <span>{channel.label}</span>
          </a>
        ))}
      </div>
    </SectionWrapper>
  );
}
