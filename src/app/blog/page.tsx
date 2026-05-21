import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts } from '@/content/blogPosts';

export const metadata: Metadata = {
  title: 'Blog SEO – Application mobile, SaaS, marketplace et logiciel métier',
  description: 'Guides business pour créer une application mobile, un SaaS, une marketplace, un logiciel métier ou une plateforme web rentable.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen premium-page-shell overflow-x-hidden">
      <Header />
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="premium-grid-bg absolute inset-0 opacity-60 pointer-events-none" />
        <div className="noise-bg absolute inset-0 opacity-70 pointer-events-none" />
        <div className="absolute left-1/2 top-16 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="premium-kicker inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
            <span className="text-xs font-700 tracking-widest text-indigo-200 uppercase">Traffic machine</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.2rem] font-800 text-white tracking-[-0.06em] leading-[0.96] max-w-5xl">Blog pour créer, lancer et rentabiliser un produit digital</h1>
          <p className="text-lg md:text-xl text-[#A1A1AA] leading-relaxed max-w-3xl mt-8">Guides business sur la création d’application mobile, SaaS, marketplace, logiciel métier, IA et transformation digitale. Chaque article aide à décider, cadrer et lancer plus efficacement.</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className={`premium-card premium-card-hover rounded-[1.75rem] p-7 ${index === 0 ? 'lg:col-span-2' : ''}`}>
              <div className="flex items-center gap-2 mb-5">
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/[0.08] text-indigo-300 text-xs font-700 uppercase">{post.intent}</span>
                <span className="text-xs text-[#71717A]">{post.keyword}</span>
              </div>
              <h2 className={`${index === 0 ? 'text-3xl md:text-4xl' : 'text-xl'} font-800 text-white tracking-tight leading-snug`}>{post.title}</h2>
              <p className="text-sm md:text-base text-[#A1A1AA] leading-relaxed mt-4">{post.angle}</p>
              <span className="inline-block text-sm font-800 text-indigo-300 mt-7">Lire l’article →</span>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
