'use client';

import React from 'react';
import { EVENEMENTS, suit } from '@/lib/analytics';
import { profil } from '@/content/profil';

/** Les coordonnées directes, avec le suivi attaché à chaque canal. */
export default function LiensDirects() {
  const liens = [
    {
      libelle: 'E-mail',
      valeur: profil.email,
      href: `mailto:${profil.email}`,
      evenement: EVENEMENTS.clicEmail,
      externe: false,
      icone: (
        <>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 6-10 7L2 6" />
        </>
      ),
    },
    {
      libelle: 'Téléphone',
      valeur: profil.telephone,
      href: profil.telephoneLien,
      evenement: EVENEMENTS.clicTelephone,
      externe: false,
      icone: (
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      ),
    },
    {
      libelle: 'GitHub',
      valeur: 'Le code public',
      href: profil.github,
      evenement: EVENEMENTS.clicGithub,
      externe: true,
      // Tracé en contour : dans cette liste toutes les icônes sont dessinées
      // au trait, un glyphe plein y ferait une tache.
      icone: (
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      ),
    },
    {
      libelle: 'LinkedIn',
      valeur: 'Le profil',
      href: profil.linkedin,
      evenement: EVENEMENTS.clicLinkedin,
      externe: true,
      icone: (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </>
      ),
    },
  ];

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--e-2)',
      }}
    >
      {liens.map((l) => (
        <li key={l.libelle}>
          <a
            href={l.href}
            target={l.externe ? '_blank' : undefined}
            rel={l.externe ? 'noopener noreferrer' : undefined}
            onClick={() => suit(l.evenement, { depuis: 'contact' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--e-3)',
              padding: '12px 14px',
              borderRadius: 'var(--r-3)',
              background: 'var(--bg-2)',
              color: 'var(--texte)',
              textDecoration: 'none',
              transition: 'background var(--t-survol)',
            }}
            className="lien-direct"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--texte-3)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              style={{ flex: 'none' }}
            >
              {l.icone}
            </svg>
            <span style={{ minWidth: 0 }}>
              <span className="t-micro t-3" style={{ display: 'block' }}>
                {l.libelle}
              </span>
              <span className="t-petit" style={{ display: 'block', overflowWrap: 'anywhere' }}>
                {l.valeur}
              </span>
            </span>
          </a>
        </li>
      ))}

      <style>{`
        .lien-direct:hover { background: var(--bg-3); text-decoration: none; color: var(--texte); }
      `}</style>
    </ul>
  );
}
