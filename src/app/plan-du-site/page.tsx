import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import { apps } from '@/content/apps';
import { guides } from '@/content/guides';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Plan du site',
  description:
    'Toutes les pages du site : réalisations, études de cas, pages de contact et guides.',
  alternates: { canonical: '/plan-du-site' },
};

export default function PlanDuSite() {
  const groupes = [
    {
      titre: 'Les pages principales',
      liens: [
        { libelle: 'Accueil', href: '/' },
        { libelle: 'Les 8 réalisations', href: '/realisations' },
        { libelle: 'Qui je suis', href: '/a-propos' },
        { libelle: 'Me contacter', href: '/contact' },
      ],
    },
    {
      titre: 'Travailler ensemble',
      liens: [
        { libelle: 'Mission freelance', href: '/freelance' },
        { libelle: 'Recrutement & CDI', href: '/cdi' },
        { libelle: 'Avant de publier votre offre', href: '/recruter-developpeur' },
        { libelle: 'Me soumettre un problème', href: '/challenge' },
      ],
    },
    {
      titre: 'Expertise',
      liens: [
        { libelle: 'Expertise React Native', href: '/expertise-react-native' },
        { libelle: 'Audit d’application React Native', href: '/audit-application-react-native' },
        { libelle: 'Développeur mobile à Amiens', href: '/developpeur-application-mobile-amiens' },
        { libelle: 'Développeur freelance à Amiens', href: '/developpeur-freelance-amiens' },
      ],
    },
    {
      titre: 'Les études de cas',
      liens: apps.map((a) => ({ libelle: a.nomCourt, href: `/realisations/${a.slug}` })),
    },
    {
      titre: 'Les guides',
      liens: [
        { libelle: 'Tous les guides', href: '/guides' },
        ...guides.map((g) => ({ libelle: g.titre, href: `/guides/${g.slug}` })),
      ],
    },
    {
      titre: 'Support des applications',
      liens: [
        { libelle: 'Ose+ · aide et support', href: '/ose-plus' },
        { libelle: 'Ose+ · confidentialité', href: '/ose-plus-confidentialite' },
      ],
    },
    {
      titre: 'Informations légales',
      liens: [{ libelle: 'Mentions légales', href: '/mentions-legales' }],
    },
  ];

  return (
    <>
      <LienEvitement />
      <Entete />

      <main id="contenu">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-8)' }}>
          <div className="enveloppe">
            <nav
              aria-label="Fil d’ariane"
              className="t-petit t-3"
              style={{ marginBottom: 'var(--e-5)' }}
            >
              <Link href="/" className="lien-sobre">
                Accueil
              </Link>
              <span aria-hidden> › </span>
              <span>Plan du site</span>
            </nav>

            <div style={{ maxWidth: 680, marginBottom: 'var(--e-8)' }}>
              <h1 className="t-h1">Plan du site</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Toutes les pages, en un seul endroit.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--e-7)',
              }}
            >
              {groupes.map((g) => (
                <nav key={g.titre} aria-label={g.titre}>
                  <h2 className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                    {g.titre}
                  </h2>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 9,
                    }}
                  >
                    {g.liens.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="t-petit lien-sobre">
                          {l.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Pied />
    </>
  );
}
