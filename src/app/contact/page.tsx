import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Entete from '@/components/Entete';
import Pied from '@/components/Pied';
import Formulaire from '@/components/Formulaire';
import LiensDirects from '@/components/LiensDirects';
import { disponibilite, profil } from '@/content/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'Me contacter',
  description:
    'Un projet d’application, une mission, un poste ou une question technique. Réponse sous 24 h, et je dis quand ce n’est pas pour moi.',
  alternates: alternatives('/contact'),
  openGraph: {
    title: 'Me contacter · Nadir Ben Salah',
    description: 'Un projet, une mission ou un poste. Réponse sous 24 h.',
    url: '/contact',
    images: ['/assets/images/og.png'],
  },
};

export default function Contact() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: `${profil.site}/contact`,
    mainEntity: {
      '@type': 'Person',
      name: profil.nom,
      email: `mailto:${profil.email}`,
      telephone: profil.telephone,
      url: profil.site,
    },
  };

  return (
    <>
      <a href="#contenu" className="saute-au-contenu">
        Aller au contenu
      </a>
      <Entete />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
              <span>Contact</span>
            </nav>

            <div style={{ maxWidth: 680, marginBottom: 'var(--e-8)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Contact
              </p>
              <h1 className="t-h1">Dites-moi ce que vous cherchez.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                Un projet à construire, une mission, un poste, ou simplement une question technique.
                Je réponds sous {disponibilite.delaiReponse}, et je vous dis franchement quand ce
                n’est pas pour moi.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 300px)',
                gap: 'clamp(32px, 6vw, 64px)',
                alignItems: 'start',
              }}
              className="grille-contact"
            >
              <Formulaire />

              <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--e-5)' }}>
                <div>
                  <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                    Ou directement
                  </p>
                  <LiensDirects />
                </div>

                <div className="carte-creuse">
                  <p className="t-petit t-fort" style={{ marginBottom: 'var(--e-2)' }}>
                    Ce qui m’aide à répondre vite
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      fontSize: 14,
                      color: 'var(--texte-2)',
                    }}
                  >
                    <li>Ce que le produit doit faire, en une ou deux phrases.</li>
                    <li>Pour qui, et sur quelle plateforme.</li>
                    <li>Votre contrainte de temps, si vous en avez une.</li>
                    <li>Ce qui existe déjà, s’il y a un existant.</li>
                  </ul>
                </div>

                <div>
                  <p className="t-petit t-3">
                    {profil.ville}, {profil.pays}. Travail à distance sans difficulté, et
                    déplacements possibles.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Pied />

      <style>{`
        @media (max-width: 880px) {
          .grille-contact { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
