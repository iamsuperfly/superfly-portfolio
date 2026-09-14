import SectionWrapper from './SectionWrapper';
import { IconGithub, IconMail, IconX } from './icons';

const email = 'iamsuperfly02@gmail.com';

const channels = [
  {
    label: 'X',
    href: 'https://x.com/iamsuperflly',
    Icon: IconX,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/iamsuperfly',
    Icon: IconGithub,
  },
  {
    label: 'Email',
    href: `mailto:${email}`,
    Icon: IconMail,
  },
];

export default function ContactSection() {
  return (
    <SectionWrapper id="contact" title="Contact">
      <p className="contact-copy">
        If you want something built, or you found a bug in a public project, write to me.
      </p>

      <a className="contact-link" href={`mailto:${email}`}>
        {email}
      </a>

      <div className="contact-channels">
        {channels.map((channel) => {
          const Icon = channel.Icon;
          return (
            <a
              key={channel.label}
              className="channel-link"
              href={channel.href}
              target={channel.href.startsWith('http') ? '_blank' : undefined}
              rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
              aria-label={channel.label}
            >
              <Icon />
              <span className="channel-label">{channel.label}</span>
            </a>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
