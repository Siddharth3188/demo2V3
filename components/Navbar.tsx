'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/studio', label: 'Studio' },
  { href: '/services', label: 'Services' },
  { href: '/journal', label: 'Journal' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hero pages have a full-bleed dark image — navbar should be light when transparent
  const isHeroPage = pathname === '/';
  // Light mode = transparent over dark hero image (unscrolled on homepage)
  const lightMode = isHeroPage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Derived colors
  const logoColor       = lightMode ? '#FFFFFF' : 'var(--ink)';
  const linkColor       = lightMode ? 'rgba(255,255,255,0.82)' : 'var(--stone)';
  const linkActiveColor = lightMode ? '#FFFFFF' : 'var(--ink)';
  const linkActiveBorder= lightMode ? '1px solid rgba(255,255,255,0.6)' : '1px solid var(--ink)';
  const ctaBg           = lightMode ? 'rgba(255,255,255,0.15)' : 'var(--ink)';
  const ctaBorder       = lightMode ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent';
  const ctaColor        = '#FFFFFF';
  const hamburgerColor  = lightMode ? '#FFFFFF' : 'var(--ink)';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'rgba(249,247,244,0.96)' : 'transparent',
        borderBottom: scrolled ? '1px solid #EAE5DF' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          padding: '0 32px', height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 22, fontWeight: 500, letterSpacing: '0.12em',
            color: logoColor, textDecoration: 'none',
            transition: 'color 0.4s ease',
          }}>
            ATELIER
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40 }} className="desktop-nav">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={lightMode ? 'nav-link nav-link--light' : 'nav-link nav-link--dark'}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: isActive ? linkActiveColor : linkColor,
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    borderBottom: isActive ? linkActiveBorder : '1px solid transparent',
                    paddingBottom: 2,
                    transition: 'color 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="nav-cta"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: ctaColor,
                background: ctaBg,
                border: ctaBorder,
                textDecoration: 'none',
                textTransform: 'uppercase',
                padding: '10px 22px',
                marginLeft: 8,
                transition: 'background 0.4s ease, border-color 0.4s ease',
              }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-nav-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: 5, padding: 8,
            }}
          >
            <span style={{
              display: 'block', width: 24, height: 1,
              background: menuOpen ? 'var(--ink)' : hamburgerColor,
              transition: 'transform 0.3s ease, background 0.4s ease',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 24, height: 1,
              background: menuOpen ? 'var(--ink)' : hamburgerColor,
              transition: 'opacity 0.2s ease, background 0.4s ease',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 24, height: 1,
              background: menuOpen ? 'var(--ink)' : hamburgerColor,
              transition: 'transform 0.3s ease, background 0.4s ease',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 90,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '0 48px',
        transition: 'opacity 0.4s ease, visibility 0.4s ease',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        <div style={{
          marginBottom: 8, color: 'var(--stone-light)',
          fontSize: 12, letterSpacing: '0.1em',
          textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
        }}>
          Navigation
        </div>
        {[...navLinks, { href: '/contact', label: 'Contact' }].map((link, i) => (
          <Link key={link.href} href={link.href} style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: 300, color: 'var(--ink)',
            textDecoration: 'none', lineHeight: 1.15,
            borderBottom: i < navLinks.length ? '1px solid var(--linen-pale)' : 'none',
            paddingBottom: 16, paddingTop: 16, display: 'block',
            transition: `opacity 0.3s ease ${i * 0.05}s`,
            opacity: menuOpen ? 1 : 0,
          }} className="mobile-nav-link">
            {link.label}
          </Link>
        ))}
        <div style={{ marginTop: 48, fontSize: 13, color: 'var(--stone)', fontFamily: 'Inter, sans-serif' }}>
          hello@atelier.example · Chennai, India
        </div>
      </div>

      <style>{`
        .nav-link--light:hover { color: #ffffff !important; }
        .nav-link--dark:hover  { color: var(--ink) !important; }
        .nav-cta:hover { background: rgba(255,255,255,0.25) !important; }
        .mobile-nav-link:hover { opacity: 0.6 !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
