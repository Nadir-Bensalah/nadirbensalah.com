import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import Apparait from '@/components/Apparait';
import { articles, dateEn } from '@/content/en/articles';
import { profileEn } from '@/content/en/profil';
import { alternatives } from '@/lib/langues';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Notes on the parts of iOS that React Native does not reach: App Intents, Live Activities, widgets and Watch apps. Written from shipped work.',
  alternates: alternatives('/en/blog'),
  openGraph: {
    title: 'Writing',
    description: 'Notes on the native iOS layer, written from apps that shipped.',
    url: '/en/blog',
    images: ['/assets/images/og.png'],
    locale: 'en_GB',
  },
};

export default function Blog() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    inLanguage: 'en',
    name: 'Writing',
    url: `${profileEn.site}/en/blog`,
    hasPart: articles.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      datePublished: a.published,
      url: `${profileEn.site}/en/blog/${a.slug}`,
      author: { '@type': 'Person', name: profileEn.name },
    })),
  };

  return (
    <>
      <a href="#content" className="saute-au-contenu">
        Skip to content
      </a>
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
              <span>Writing</span>
            </nav>

            <div style={{ maxWidth: 680, marginBottom: 'var(--e-8)' }}>
              <p className="etiquette" style={{ marginBottom: 'var(--e-3)' }}>
                Writing
              </p>
              <h1 className="t-h1">Notes from the native layer.</h1>
              <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                The parts of iOS that React Native does not reach, written from apps that actually
                shipped. No generic tutorials: if I have not done it in production, I have not
                written about it.
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, maxWidth: 'var(--colonne-lecture)' }}>
              {articles.map((a, i) => (
                <Apparait
                  key={a.slug}
                  as="li"
                  retard={(i % 3) as 0 | 1 | 2}
                  style={{ borderTop: i === 0 ? 'none' : '1px solid var(--trait)' }}
                >
                  <Link
                    href={`/en/blog/${a.slug}`}
                    style={{ display: 'block', paddingBlock: 'var(--e-5)', color: 'var(--texte)' }}
                    className="lien-guide"
                  >
                    <p className="t-micro t-3" style={{ marginBottom: 8 }}>
                      <time dateTime={a.published}>{dateEn(a.published)}</time> · {a.minutes} min
                    </p>
                    <h2 className="t-h3" style={{ fontSize: 21, marginBottom: 8 }}>
                      {a.title}
                    </h2>
                    <p className="t-corps t-2">{a.standfirst}</p>
                  </Link>
                </Apparait>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .lien-guide:hover { text-decoration: none; color: var(--texte); }
        .lien-guide:hover h2 { text-decoration: underline; text-underline-offset: 3px; }
      `}</style>
    </>
  );
}
