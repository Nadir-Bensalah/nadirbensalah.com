import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/content/blogPosts';
import { caseStudies } from '@/content/caseStudies';
import { englishPricePages, englishServicePages } from '@/content/englishSeoPages';
import { locationPages, pricePages, servicePages } from '@/content/seoPages';

export const metadata: Metadata = {
  title: 'Plan du site – Toutes les pages et URLs SEO',
  description: 'Plan du site Nadir Ben Salah : services, prix, blog, études de cas, pages locales France et Tunisie, versions françaises et anglaises.',
  alternates: { canonical: '/plan-du-site' },
};

const groups = [
  {
    title: 'Pages principales',
    links: [
      { label: 'Accueil', href: '/' },
      { label: 'Projets', href: '/projets' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Études de cas', href: '/etudes-de-cas' },
      { label: 'À propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  { title: 'Services en français', links: servicePages.map((page) => ({ label: page.h1, href: `/services/${page.slug}` })) },
  { title: 'Prix en français', links: pricePages.map((page) => ({ label: page.h1, href: `/prix/${page.slug}` })) },
  { title: 'Services in English', links: englishServicePages.map((page) => ({ label: page.h1, href: page.path || `/en/services/${page.slug}` })) },
  { title: 'Pricing in English', links: englishPricePages.map((page) => ({ label: page.h1, href: page.path || `/en/pricing/${page.slug}` })) },
  { title: 'Pages locales France', links: locationPages.filter((page) => page.market === 'fr-fr').map((page) => ({ label: page.h1, href: page.path || `/fr-fr/${page.slug}` })) },
  { title: 'France local pages in English', links: locationPages.filter((page) => page.market === 'en-fr').map((page) => ({ label: page.h1, href: page.path || `/en-fr/${page.slug}` })) },
  { title: 'Pages locales Tunisie', links: locationPages.filter((page) => page.market === 'fr-tn').map((page) => ({ label: page.h1, href: page.path || `/fr-tn/${page.slug}` })) },
  { title: 'Tunisia local pages in English', links: locationPages.filter((page) => page.market === 'en-tn').map((page) => ({ label: page.h1, href: page.path || `/en-tn/${page.slug}` })) },
  { title: 'Articles de blog', links: blogPosts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })) },
  { title: 'Études de cas', links: caseStudies.map((study) => ({ label: study.title, href: `/etudes-de-cas/${study.slug}` })) },
];

export default function SitemapPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Plan du site',
    description: 'Toutes les pages principales, SEO, locales et éditoriales du site Nadir Ben Salah.',
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative pt-36 pb-20 md:pt-44 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(6,182,212,0.14) 45%, transparent 72%)' }} />
        <div className="noise-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <span className="text-xs font-700 tracking-widest text-indigo-400 uppercase">Architecture SEO</span>
          <h1 className="text-4xl md:text-7xl font-800 text-white tracking-tight leading-[1.05] max-w-4xl mt-5">Plan du site complet</h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-3xl mt-7">Toutes les pages importantes du site : services, prix, blog, études de cas, pages locales France et Tunisie, avec versions françaises et anglaises.</p>
        </div>
      </section>
      <section className="pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {groups.map((group) => (
            <section key={group.title} className="glass-card rounded-3xl p-7">
              <h2 className="text-2xl font-800 text-white tracking-tight mb-6">{group.title}</h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[#A1A1AA] hover:text-white transition-colors duration-200 leading-relaxed">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
