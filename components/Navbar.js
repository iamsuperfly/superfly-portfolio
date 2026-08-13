'use client';

import { useState } from 'react';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const HamburgerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand" onClick={handleLinkClick}>
          Superfly
        </a>

        {/* Desktop links */}
        <nav className="navbar-links" aria-label="Site navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="navbar-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <nav id="mobile-navigation" className="navbar-mobile" aria-label="Mobile site navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="navbar-mobile-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
