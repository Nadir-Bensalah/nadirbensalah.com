'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EVENEMENTS, suit } from '@/lib/analytics';
import { equivalent } from '@/lib/langues';
import { profileEn } from '@/content/en/profil';

const links = [
  { label: 'Apps', href: '/en/apps' },
  { label: 'Native iOS', href: '/en/ios-native-modules' },
  { label: 'Audit', href: '/en/react-native-audit' },
  { label: 'Hire me', href: '/en/hire' },
  { label: 'Writing', href: '/en/blog' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const active = (href: string) => path === href || (href !== '/en' && path?.startsWith(href));
  const other = equivalent(path || '/en');

  return (
    <header
      className="entete"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--trait)' : 'transparent'}`,
        transition: 'border-color var(--t-survol)',
      }}
    >
      <div
        className="enveloppe"
        style={{ height: 60, display: 'flex', alignItems: 'center', gap: 'var(--e-4)' }}
      >
        <Link
          prefetch={false}
          href="/en"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--e-2)',
            fontWeight: 600,
            fontSize: 15,
            color: 'var(--texte)',
            flex: 'none',
          }}
        >
          <img
            src="/assets/marque/nb-noir.webp"
            alt=""
            aria-hidden
            width={30}
            height={20}
            className="marque-claire"
            style={{ height: 20, width: 'auto', flex: 'none' }}
          />
          <img
            src="/assets/marque/nb-blanc.webp"
            alt=""
            aria-hidden
            width={30}
            height={20}
            className="marque-sombre"
            style={{ height: 20, width: 'auto', flex: 'none' }}
          />
          Nadir Ben Salah
        </Link>

        <nav
          aria-label="Main navigation"
          className="nav-bureau"
          style={{ display: 'flex', gap: 20, marginLeft: 'auto' }}
        >
          {links.map((l) => (
            <Link
              prefetch={false}
              key={l.href}
              href={l.href}
              aria-current={active(l.href) ? 'page' : undefined}
              className="lien-sobre"
              style={{
                fontSize: 14.5,
                color: active(l.href) ? 'var(--texte)' : 'var(--texte-2)',
                fontWeight: active(l.href) ? 600 : 400,
                whiteSpace: 'nowrap',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Le passage d'une langue à l'autre garde la page équivalente plutôt
            que de renvoyer à l'accueil : personne ne veut recommencer. */}
        {other && (
          <Link
            prefetch={false}
            href={other.href}
            hrefLang={other.langue}
            className="btn btn-fantome cta-bureau"
            style={{ flex: 'none', marginLeft: 8 }}
          >
            Français
          </Link>
        )}

        <a
          href={profileEn.cv}
          download
          onClick={() => suit(EVENEMENTS.telechargeCv, { depuis: 'en_header' })}
          className="btn btn-fantome cta-bureau"
          style={{ flex: 'none' }}
        >
          CV
        </a>

        <Link
          prefetch={false}
          href="/en/contact"
          className="btn btn-principal cta-bureau"
          style={{ flex: 'none' }}
        >
          Get in touch
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="en-mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="bouton-menu"
          style={{
            marginLeft: 'auto',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            background: 'transparent',
            border: 0,
            borderRadius: 'var(--r-2)',
            cursor: 'pointer',
            color: 'var(--texte)',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="en-mobile-menu"
          style={{
            position: 'fixed',
            inset: '60px 0 0',
            background: 'var(--bg)',
            zIndex: 49,
            overflowY: 'auto',
            padding: 'var(--e-5) var(--marge-mobile) var(--e-8)',
          }}
        >
          <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map((l) => (
              <Link
                prefetch={false}
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: 'var(--texte)',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--trait)',
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              prefetch={false}
              href="/en/contact"
              className="btn btn-principal btn-large btn-bloc"
              style={{ marginTop: 'var(--e-6)' }}
            >
              Get in touch
            </Link>
            <a
              href={profileEn.cv}
              download
              className="btn btn-secondaire btn-large btn-bloc"
              style={{ marginTop: 'var(--e-3)' }}
            >
              Download CV
            </a>
            {other && (
              <Link
                prefetch={false}
                href={other.href}
                hrefLang={other.langue}
                className="btn btn-fantome btn-bloc"
                style={{ marginTop: 'var(--e-4)' }}
              >
                Lire en français
              </Link>
            )}
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .nav-bureau { display: none !important; }
          .cta-bureau { display: none !important; }
          .bouton-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
