import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locationPages, type SeoPage } from '@/content/seoPages';
import { expertComparisons, moneyPageInsights, riskReducers, trustMetrics, trustProofs } from '@/content/trustSignals';

export default function SeoLandingPage({ page, basePath }: { page: SeoPage; basePath: string }) {
  const isEnglish = page.locale === 'en';
  const pageUrl = page.path || `${basePath}/${page.slug}`;
  const relatedLocations = locationPages
    .filter((location) => location.locale === page.locale && location.path !== page.path)
    .slice(0, 8);
  const pageInsights = moneyPageInsights[page.slug] || [];
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com').replace(/\/$/, '');
  const fullPageUrl = `${siteUrl}${pageUrl}`;
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Nadir Ben Salah',
      description: page.description,
      areaServed: ['France', 'Europe', 'Tunisie'],
      serviceType: page.primaryKeyword,
      url: fullPageUrl,
      founder: { '@type': 'Person', name: 'Nadir Ben Salah' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '15',
        bestRating: '5',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.h1,
      description: page.description,
      provider: { '@type': 'Person', name: 'Nadir Ben Salah', url: siteUrl },
      areaServed: ['France', 'Tunisia', 'Europe', 'Remote'],
      serviceType: page.primaryKeyword,
      url: fullPageUrl,
      offers: {
        '@type': 'OfferCatalog',
        name: isEnglish ? 'Digital product services' : 'Services produit digital',
        itemListElement: page.offer.map((item, index) => ({
          '@type': 'Offer',
          position: index + 1,
          name: item,
          availability: 'https://schema.org/InStock',
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: page.title,
      description: page.description,
      url: fullPageUrl,
      inLanguage: isEnglish ? 'en' : 'fr',
      about: page.secondaryKeywords,
      mainEntity: { '@type': 'Service', name: page.primaryKeyword },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: isEnglish ? 'Proof points and risk reducers' : 'Preuves et réduction du risque',
      itemListElement: [...trustProofs, ...riskReducers].map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: isEnglish ? 'Home' : 'Accueil', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: page.h1, item: fullPageUrl },
      ],
    },
  ];

  return (
    <main className="min-h-screen premium-page-shell overflow-x-hidden">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative min-h-[92vh] pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <div className="premium-grid-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="noise-bg absolute inset-0 opacity-70 pointer-events-none" />
        <div className="absolute left-1/2 top-16 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_430px] gap-10 lg:gap-14 items-center">
          <div>
            <div className="premium-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
              </span>
              <span className="text-xs font-700 tracking-widest text-indigo-200 uppercase">{page.eyebrow}</span>
            </div>
            <h1 className="max-w-5xl text-5xl md:text-7xl lg:text-[5.35rem] font-800 text-white tracking-[-0.06em] leading-[0.96]">
              {page.h1}
            </h1>
            <div className="mt-8 flex flex-col gap-4 max-w-3xl">
              {page.intro.map((paragraph) => (
                <p key={paragraph} className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary px-7 py-4 rounded-full text-base font-800 text-center">
                {page.cta} →
              </Link>
              <Link href={isEnglish ? '/en/pricing/application-mobile' : '/tarifs'} className="btn-outline px-7 py-4 rounded-full text-base font-700 text-center">
                {isEnglish ? 'View pricing' : 'Voir les tarifs'}
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {page.secondaryKeywords.slice(0, 5).map((keyword) => (
                <span key={keyword} className="px-3.5 py-2 text-xs font-700 rounded-full bg-white/[0.045] text-[#D4D4D8] border border-white/[0.08]">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <aside className="premium-card rounded-[2rem] p-5 md:p-6 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#0D0D10] p-6">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full premium-orb opacity-80" />
              <div className="relative">
                <p className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Primary intent' : 'Intention principale'}</p>
                <p className="text-white text-xl font-800 tracking-tight mt-4 leading-snug">{page.primaryKeyword}</p>
                <p className="text-[#A1A1AA] leading-relaxed mt-4">{page.intent}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <p className="text-2xl font-800 text-white tracking-tight">{metric.value}</p>
                  <p className="text-xs text-[#A1A1AA] mt-1.5 leading-snug">{metric.label}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="relative py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="premium-card rounded-[2rem] p-5 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
              <div>
                <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Trust layer' : 'Preuves & confiance'}</span>
                <h2 className="text-3xl md:text-5xl font-800 text-white tracking-[-0.04em] leading-tight mt-4">{isEnglish ? 'A senior product frame, not a generic delivery.' : 'Un cadre senior, pas une page SEO générique.'}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trustProofs.map((proof) => (
                  <div key={proof} className="premium-card-hover rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300 font-800">✓</span>
                    <p className="text-[#A1A1AA] leading-relaxed mt-3">{proof}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {page.offer.map((item, index) => (
            <div key={item} className={`premium-card premium-card-hover rounded-[1.75rem] p-7 ${index === 0 ? 'lg:col-span-1 lg:row-span-2' : ''}`}>
              <span className="text-5xl font-800 text-white/10">0{index + 1}</span>
              <div className="mt-10 h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-lg shadow-indigo-500/20" />
              <p className="text-xl font-800 text-white tracking-tight leading-snug mt-6">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 section-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-28 self-start">
              <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Deep dive' : 'Analyse détaillée'}</span>
              <h2 className="text-4xl md:text-5xl font-800 text-white tracking-[-0.045em] leading-tight mt-4">
                {isEnglish ? 'The thinking behind the execution.' : 'La réflexion derrière l’exécution.'}
              </h2>
              <p className="text-[#A1A1AA] text-lg leading-relaxed mt-5">
                {isEnglish ? 'Each decision is tied to scope, conversion, budget and long-term maintainability.' : 'Chaque décision est reliée au périmètre, à la conversion, au budget et à la maintenabilité.'}
              </p>
            </div>
            <div className="space-y-5">
              {page.sections.map((section, index) => (
                <article key={section.heading} className="premium-card rounded-[1.75rem] p-7 md:p-9">
                  <div className="flex flex-col md:flex-row gap-5 md:gap-8">
                    <span className="text-4xl font-800 text-white/10 shrink-0">0{index + 1}</span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-800 text-white tracking-tight mb-5">{section.heading}</h3>
                      <div className="space-y-4">
                        {section.body.map((paragraph) => (
                          <p key={paragraph} className="text-[#A1A1AA] text-lg leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {pageInsights.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Expert insight' : 'Analyse expert'}</span>
              <h2 className="text-4xl md:text-6xl font-800 text-white tracking-[-0.05em] leading-tight mt-4">
                {isEnglish ? 'What matters before investing.' : 'Ce qu’il faut comprendre avant d’investir.'}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {pageInsights.map((insight) => (
                <article key={insight.heading} className="premium-card premium-card-hover rounded-[1.75rem] p-7 md:p-8">
                  <h3 className="text-2xl font-800 text-white tracking-tight leading-snug">{insight.heading}</h3>
                  <div className="space-y-4 mt-6">
                    {insight.body.map((paragraph) => (
                      <p key={paragraph} className="text-[#A1A1AA] leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24 section-gradient">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="premium-card rounded-[2rem] p-8 md:p-10">
            <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Business outcomes' : 'Bénéfices business'}</span>
            <h2 className="text-3xl md:text-5xl font-800 text-white tracking-[-0.04em] mt-4 mb-8">{isEnglish ? 'Designed for outcomes.' : 'Pensé pour produire un résultat.'}</h2>
            <ul className="space-y-4">
              {page.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[#A1A1AA] leading-relaxed">
                  <span className="mt-1.5 h-5 w-5 rounded-full bg-cyan-400/10 text-cyan-300 text-xs font-800 flex items-center justify-center shrink-0">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="premium-card rounded-[2rem] p-8 md:p-10">
            <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Execution system' : 'Système d’exécution'}</span>
            <h2 className="text-3xl md:text-5xl font-800 text-white tracking-[-0.04em] mt-4 mb-8">{isEnglish ? 'Clear from day one.' : 'Clair dès le premier jour.'}</h2>
            <ol className="space-y-4">
              {page.process.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="w-9 h-9 rounded-2xl bg-white/[0.06] border border-white/[0.08] text-white font-800 text-sm flex items-center justify-center shrink-0">{index + 1}</span>
                  <span className="text-[#A1A1AA] leading-relaxed pt-1.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Risk reducers' : 'Réduction du risque'}</span>
            <h2 className="text-4xl md:text-5xl font-800 text-white tracking-[-0.045em] leading-tight mt-4">{isEnglish ? 'A safer way to start.' : 'Une manière plus sûre de démarrer.'}</h2>
            <p className="text-[#A1A1AA] text-lg leading-relaxed mt-5">{isEnglish ? 'The objective is to invest in the right first version, with clear priorities and fewer blind spots.' : 'L’objectif est d’investir dans la bonne première version, avec des priorités claires et moins d’angles morts.'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {riskReducers.map((item) => (
              <div key={item} className="premium-card premium-card-hover rounded-2xl p-5">
                <p className="text-white font-800 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 section-gradient">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">FAQ</span>
            <h2 className="text-4xl md:text-5xl font-800 text-white tracking-[-0.045em] mt-4">{isEnglish ? 'Frequently asked questions' : 'Questions fréquentes'}</h2>
          </div>
          <div className="space-y-4">
            {page.faq.map((item) => (
              <div key={item.question} className="premium-card rounded-[1.5rem] p-6 md:p-7">
                <h3 className="text-lg md:text-xl font-800 text-white mb-3">{item.question}</h3>
                <p className="text-[#A1A1AA] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedLocations.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Service areas' : 'Zones desservies'}</span>
              <h2 className="text-4xl md:text-5xl font-800 text-white tracking-[-0.045em] leading-tight mt-4">{isEnglish ? 'Available across France and Tunisia.' : 'Disponible en France et en Tunisie.'}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedLocations.map((location) => (
                <Link key={location.path || location.slug} href={location.path || `/${location.market}/${location.slug}`} className="premium-card premium-card-hover rounded-2xl p-5">
                  <span className="text-white font-800 leading-snug">{location.eyebrow}</span>
                  <span className="block text-sm text-[#A1A1AA] mt-2">{location.primaryKeyword}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="contact" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="premium-card relative overflow-hidden rounded-[2.25rem] p-10 md:p-16">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative">
              <span className="text-xs font-800 tracking-widest text-indigo-300 uppercase">{isEnglish ? 'Next step' : 'Prochaine étape'}</span>
              <h2 className="text-4xl md:text-6xl font-800 text-white tracking-[-0.055em] leading-tight mt-5">{isEnglish ? 'Let’s make the project clearer.' : 'Rendons votre projet plus clair.'}</h2>
              <p className="text-[#A1A1AA] text-lg leading-relaxed max-w-2xl mx-auto mt-6 mb-9">
                {isEnglish ? 'Send me your idea, context and goals. I will reply with a clear first analysis of the scope, budget and next steps.' : 'Envoyez-moi votre idée, votre contexte et vos objectifs. Je vous réponds avec une première analyse claire du périmètre, du budget et des prochaines étapes.'}
              </p>
              <a href="mailto:contact@nadirbs.dev" className="btn-primary px-8 py-4 rounded-full text-base font-800 inline-block">
                {isEnglish ? 'Send an email →' : 'Envoyer un email →'}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
