const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand">
          Superfly
        </a>
        <nav className="navbar-links" aria-label="Site navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar-link">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
