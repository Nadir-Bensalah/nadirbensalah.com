'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const liens = [
  { libelle: 'Réalisations', href: '/realisations' },
  { libelle: 'Expertise', href: '/expertise-react-native' },
  { libelle: 'Freelance', href: '/freelance' },
  { libelle: 'CDI', href: '/cdi' },
  { libelle: 'Guides', href: '/guides' },
];

export default function Entete() {
  const [decolle, setDecolle] = useState(false);
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const auDefilement = () => setDecolle(window.scrollY > 8);
    auDefilement();
    window.addEventListener('scroll', auDefilement, { passive: true });
    return () => window.removeEventListener('scroll', auDefilement);
  }, []);

  useEffect(() => {
    setOuvert(false);
  }, [chemin]);

  // Quand le panneau mobile est ouvert, la page dessous ne doit pas défiler.
  useEffect(() => {
    document.body.style.overflow = ouvert ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ouvert]);

  useEffect(() => {
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOuvert(false);
    };
    window.addEventListener('keydown', auClavier);
    return () => window.removeEventListener('keydown', auClavier);
  }, []);

  const actif = (href: string) => chemin === href || (href !== '/' && chemin?.startsWith(href));

  return (
    <header
      className="entete"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: `1px solid ${decolle ? 'var(--trait)' : 'transparent'}`,
        transition: 'border-color var(--t-survol)',
      }}
    >
      <div
        className="enveloppe"
        style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--e-4)',
        }}
      >
        <Link
          href="/"
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
          <span
            aria-hidden
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 22,
              height: 22,
              borderRadius: 'var(--r-2)',
              background: 'var(--texte)',
              color: 'var(--bg)',
              fontWeight: 700,
              fontSize: 12,
            }}
          >
            N
          </span>
          Nadir Ben Salah
        </Link>

        <nav
          aria-label="Navigation principale"
          className="nav-bureau"
          style={{ display: 'flex', gap: 22, marginLeft: 'auto' }}
        >
          {liens.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={actif(l.href) ? 'page' : undefined}
              style={{
                fontSize: 14.5,
                color: actif(l.href) ? 'var(--texte)' : 'var(--texte-2)',
                fontWeight: actif(l.href) ? 600 : 400,
                whiteSpace: 'nowrap',
              }}
              className="lien-sobre"
            >
              {l.libelle}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="btn btn-principal cta-bureau"
          style={{ flex: 'none', marginLeft: 16 }}
        >
          Me contacter
        </Link>

        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
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
            {ouvert ? (
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

      {ouvert && (
        <div
          id="menu-mobile"
          style={{
            position: 'fixed',
            inset: '60px 0 0',
            background: 'var(--bg)',
            zIndex: 49,
            overflowY: 'auto',
            padding: 'var(--e-5) var(--marge-mobile) var(--e-8)',
          }}
        >
          <nav aria-label="Navigation mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            {liens.map((l) => (
              <Link
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
                {l.libelle}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn btn-principal btn-large btn-bloc"
              style={{ marginTop: 'var(--e-6)' }}
            >
              Me contacter
            </Link>
            <a
              href="/assets/cv/cv-nadir-ben-salah.pdf"
              className="btn btn-secondaire btn-large btn-bloc"
              style={{ marginTop: 'var(--e-3)' }}
            >
              Télécharger le CV
            </a>
          </nav>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-bureau { display: none !important; }
          .cta-bureau { display: none !important; }
          .bouton-menu { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
