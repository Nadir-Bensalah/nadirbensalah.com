'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Services', href: '/services/creation-application-mobile' },
  { label: 'SaaS', href: '/services/developpement-saas' },
  { label: 'Prix app', href: '/prix/application-mobile' },
  { label: 'Cas clients', href: '/etudes-de-cas' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#09090B]/90 backdrop-blur-2xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-800 text-sm">N</span>
          </div>
          <span className="font-700 text-base tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
            Nadir Ben Salah
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className={`nav-link text-sm font-500 transition-colors duration-300 ${
                pathname === link?.href || (link?.href.startsWith('/services') && pathname?.startsWith('/services')) || (link?.href.startsWith('/prix') && pathname?.startsWith('/prix')) || (link?.href === '/blog' && pathname?.startsWith('/blog')) || (link?.href === '/etudes-de-cas' && pathname?.startsWith('/etudes-de-cas'))
                  ? 'text-white' : 'text-[#71717A] hover:text-white'
              }`}
            >
              {link?.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/contact"
            className="btn-primary px-5 py-2.5 rounded-full text-sm font-700"
          >
            Me contacter
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex flex-col gap-1.5 p-2 group"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-[#09090B]/98 backdrop-blur-2xl border-b border-white/[0.06] py-6 px-6">
          <nav className="flex flex-col gap-4">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                onClick={() => setMobileOpen(false)}
                className="text-base font-600 text-[#71717A] hover:text-white transition-colors duration-200 py-2 border-b border-white/[0.05]"
              >
                {link?.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 px-5 py-3 rounded-full text-sm font-700 text-center"
            >
              Me contacter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}