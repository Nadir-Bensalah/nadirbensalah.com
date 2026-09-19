import React from 'react';
import Link from 'next/link';
import { profil } from '@/content/profil';

const colonnes = [
  {
    titre: 'Le travail',
    liens: [
      { libelle: 'Les réalisations', href: '/realisations' },
      { libelle: 'Expertise React Native', href: '/expertise-react-native' },
      { libelle: 'Audit d’application', href: '/audit-application-react-native' },
      { libelle: 'Guides', href: '/guides' },
    ],
  },
  {
    titre: 'Travailler ensemble',
    liens: [
      { libelle: 'Mission freelance', href: '/freelance' },
      { libelle: 'Recrutement & CDI', href: '/cdi' },
      { libelle: 'Développeur à Amiens', href: '/developpeur-application-mobile-amiens' },
      { libelle: 'Soumettre un problème', href: '/challenge' },
    ],
  },
  {
    titre: 'À propos',
    liens: [
      { libelle: 'Qui je suis', href: '/a-propos' },
      { libelle: 'Le CV en PDF', href: '/assets/cv/cv-nadir-ben-salah.pdf' },
      { libelle: 'Me contacter', href: '/contact' },
      { libelle: 'Plan du site', href: '/plan-du-site' },
      { libelle: 'Mentions légales', href: '/mentions-legales' },
    ],
  },
];

export default function Pied() {
  return (
    <footer
      className="pied"
      style={{
        borderTop: '1px solid var(--trait)',
        paddingBlock: 'var(--e-8)',
        marginTop: 'clamp(64px, 9vw, 128px)',
      }}
    >
      <div className="enveloppe">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: 'var(--e-7)',
            marginBottom: 'var(--e-8)',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--e-2)',
                fontWeight: 600,
                marginBottom: 'var(--e-3)',
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
              {profil.nom}
            </div>
            <p className="t-petit t-2" style={{ maxWidth: 260 }}>
              Développeur mobile et full-stack à {profil.ville}. React Native, TypeScript, iOS et
              Android.
            </p>
            <div style={{ display: 'flex', gap: 'var(--e-3)', marginTop: 'var(--e-4)' }}>
              <a
                href={profil.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn"
                className="lien-sobre lien-icone"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
                </svg>
              </a>
              <a
                href={profil.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profil GitHub"
                className="lien-sobre lien-icone"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
                </svg>
              </a>
              <a
                href={`mailto:${profil.email}`}
                aria-label="Envoyer un e-mail"
                className="lien-sobre lien-icone"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 6-10 7L2 6" />
                </svg>
              </a>
            </div>
          </div>

          {colonnes.map((c) => (
            <nav key={c.titre} aria-label={c.titre}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                {c.titre}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                {c.liens.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="lien-sobre t-petit">
                      {l.libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          style={{
            borderTop: '1px solid var(--trait)',
            paddingTop: 'var(--e-5)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--e-4)',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p className="t-petit t-3">
            © {new Date().getFullYear()} {profil.nom} · {profil.ville}, {profil.pays}
          </p>
          <p className="t-petit t-3">
            Activité exercée sous l’enseigne{' '}
            <a
              href={profil.capmedia}
              target="_blank"
              rel="noopener noreferrer"
              className="lien-sobre"
              style={{ textDecoration: 'underline' }}
            >
              Capmedia Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
