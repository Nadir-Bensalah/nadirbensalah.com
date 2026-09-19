import React from 'react';
import Link from 'next/link';
import Header from '@/components/en/Header';
import Footer from '@/components/en/Footer';
import { Article, articles, dateEn } from '@/content/en/articles';
import { profileEn } from '@/content/en/profil';

/** The shell every English article shares: breadcrumb, header, body, next. */
export default function ArticlePage({
  article,
  children,
}: {
  article: Article;
  children: React.ReactNode;
}) {
  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated || article.published,
      inLanguage: 'en',
      author: { '@type': 'Person', name: profileEn.name, url: `${profileEn.site}/en` },
      publisher: { '@type': 'Person', name: profileEn.name, url: `${profileEn.site}/en` },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${profileEn.site}/en/blog/${article.slug}`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${profileEn.site}/en` },
        { '@type': 'ListItem', position: 2, name: 'Writing', item: `${profileEn.site}/en/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.title,
          item: `${profileEn.site}/en/blog/${article.slug}`,
        },
      ],
    },
  ];

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
        <article>
          <header style={{ paddingTop: 'clamp(40px, 7vw, 72px)', paddingBottom: 'var(--e-6)' }}>
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
                <Link href="/en/blog" className="lien-sobre">
                  Writing
                </Link>
              </nav>

              <div style={{ maxWidth: 'var(--colonne-lecture)' }}>
                <h1 className="t-h1">{article.title}</h1>
                <p className="t-lead" style={{ marginTop: 'var(--e-4)' }}>
                  {article.standfirst}
                </p>
                <p className="t-petit t-3" style={{ marginTop: 'var(--e-4)' }}>
                  <time dateTime={article.published}>{dateEn(article.published)}</time> ·{' '}
                  {article.minutes} min read · {profileEn.name}
                </p>
              </div>
            </div>
          </header>

          <div className="enveloppe">
            <div className="article-corps">{children}</div>
          </div>
        </article>

        <div className="enveloppe">
          <section
            className="creux"
            style={{ marginTop: 'clamp(56px, 8vw, 96px)', maxWidth: 'var(--colonne-lecture)' }}
          >
            <h2 className="t-h3" style={{ marginBottom: 'var(--e-3)' }}>
              Stuck on this in your own app?
            </h2>
            <p className="t-corps t-2" style={{ marginBottom: 'var(--e-5)' }}>
              This is the kind of work I take on: the native layer a React Native team cannot reach.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--e-3)' }}>
              <Link href="/en/ios-native-modules" className="btn btn-principal">
                What I can add
              </Link>
              <Link href="/en/contact" className="btn btn-secondaire">
                Get in touch
              </Link>
            </div>
          </section>

          {others.length > 0 && (
            <section
              style={{ marginTop: 'clamp(48px, 7vw, 80px)', maxWidth: 'var(--colonne-lecture)' }}
            >
              <h2 className="etiquette" style={{ marginBottom: 'var(--e-4)' }}>
                Read next
              </h2>
              <ul
                style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column' }}
              >
                {others.map((a, i) => (
                  <li
                    key={a.slug}
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--trait)' }}
                  >
                    <Link
                      href={`/en/blog/${a.slug}`}
                      style={{
                        display: 'block',
                        paddingBlock: 'var(--e-4)',
                        color: 'var(--texte)',
                      }}
                      className="lien-sobre"
                    >
                      <span className="t-h3" style={{ display: 'block', marginBottom: 4 }}>
                        {a.title}
                      </span>
                      <span className="t-petit t-2">{a.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
