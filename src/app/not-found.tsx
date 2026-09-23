import React from 'react';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import type { Metadata } from 'next';
import { apps } from '@/content/apps';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description:
    'Cette page n’existe pas. Voici les pages vers lesquelles les liens cassés mènent le plus souvent.',
  robots: { index: false, follow: true },
};

/**
 * Le 404 doit être utile, pas décoratif : il propose les pages vers lesquelles
 * les liens cassés mènent le plus souvent. Les anciennes URL du site sont
 * redirigées en 301 par le .htaccess, donc arriver ici est déjà un cas rare.
 */
export default function Introuvable() {
  return (
    <>
      <LienEvitement />
      <Entete />
      <main id="contenu" data-page-404>
        <section style={{ paddingTop: 'clamp(48px, 9vw, 96px)', paddingBottom: 'var(--e-8)' }}>
          <div className="enveloppe">
            <div style={{ maxWidth: 640 }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Erreur 404
              </p>
              <h1 className="t-h1">Cette page n’existe pas.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Le lien est peut-être ancien, ou l’adresse comporte une faute. Voici ce qui se
                trouve habituellement derrière les liens qui mènent ici.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--e-3)',
                  marginTop: 'var(--e-6)',
                }}
              >
                <Link href="/" className="btn btn-principal btn-large">
                  Retour à l’accueil
                </Link>
                <Link href="/realisations" className="btn btn-secondaire btn-large">
                  Les réalisations
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 'clamp(48px, 7vw, 80px)', maxWidth: 720 }}>
              <h2 className="etiquette" style={{ marginBottom: 'var(--e-4)' }}>
                Les études de cas
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 'var(--e-3)',
                }}
              >
                {apps.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/realisations/${a.slug}`} className="t-petit lien-sobre">
                      {a.nomCourt}
                    </Link>
                  </li>
                ))}
              </ul>

              <h2
                className="etiquette"
                style={{ marginTop: 'var(--e-7)', marginBottom: 'var(--e-4)' }}
              >
                Les autres pages
              </h2>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: 'var(--e-3)',
                }}
              >
                {[
                  ['Qui je suis', '/a-propos'],
                  ['Mission freelance', '/freelance'],
                  ['Recrutement & CDI', '/cdi'],
                  ['Expertise React Native', '/expertise-react-native'],
                  ['Les guides', '/guides'],
                  ['Me contacter', '/contact'],
                  ['Plan du site', '/plan-du-site'],
                ].map(([libelle, href]) => (
                  <li key={href}>
                    <Link href={href} className="t-petit lien-sobre">
                      {libelle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Pied />
    </>
  );
}
