import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Formulaire from '@/components/Formulaire';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';
import LienEvitement from '@/components/LienEvitement';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    'A stalled project, a native iOS feature you cannot get working, a role to fill. I reply within a day, and I say so when it is not for me.',
  alternates: alternatives('/en/contact'),
  openGraph: {
    title: 'Get in touch',
    description: 'Tell me what you are building. I reply within a day.',
    url: '/en/contact',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

export default function Contact() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    inLanguage: 'en',
    url: `${profileEn.site}/en/contact`,
    mainEntity: {
      '@type': 'Person',
      name: profileEn.name,
      email: `mailto:${profileEn.email}`,
      url: `${profileEn.site}/en`,
    },
  };

  return (
    <>
      <LienEvitement cible="#content">Skip to content</LienEvitement>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main id="content">
        <section style={{ paddingTop: 'clamp(40px, 7vw, 80px)', paddingBottom: 'var(--e-8)' }}>
          <div className="enveloppe">
            <nav
              aria-label="Breadcrumb"
              className="t-petit t-3"
              style={{ marginBottom: 'var(--e-5)' }}
            >
              <Link href="/en" className="lien-sobre">
                Home
              </Link>
              <span aria-hidden> › </span>
              <span>Contact</span>
            </nav>

            <div style={{ maxWidth: 680, marginBottom: 'var(--e-8)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Contact
              </p>
              <h1 className="t-h1">Tell me what you&apos;re building.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                A native feature that will not work, a codebase somebody left behind, a role to
                fill, or just a technical question. I reply within a day, and I say so plainly when
                it is not for me.
              </p>
            </div>

            <div
              className="grille-contact"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 300px)',
                gap: 'clamp(32px, 6vw, 64px)',
                alignItems: 'start',
              }}
            >
              <Formulaire
                titreChamp="Your project, or your role"
                placeholder="A few lines: what the product does, who it is for, and where you are stuck. Technical detail is welcome."
              />

              <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--e-5)' }}>
                <div>
                  <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                    Or directly
                  </p>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--e-2)',
                    }}
                  >
                    <li>
                      <a href={`mailto:${profileEn.email}`} className="t-petit">
                        {profileEn.email}
                      </a>
                    </li>
                    <li>
                      <a
                        href={profileEn.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-petit"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href={profileEn.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="t-petit"
                      >
                        GitHub
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="carte-creuse">
                  <p className="t-petit t-fort" style={{ marginBottom: 'var(--e-2)' }}>
                    What helps me answer well
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
                    <li>What the product does, in a sentence or two.</li>
                    <li>Whether something already exists, and in what state.</li>
                    <li>Your timeline, if you have one.</li>
                    <li>Whether this is a contract, a role, or you are not sure yet.</li>
                  </ul>
                </div>

                <p className="t-petit t-3">{profileEn.timezone}.</p>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 880px) {
          .grille-contact { grid-template-columns: minmax(0, 1fr) !important; }
        }
      `}</style>
    </>
  );
}
