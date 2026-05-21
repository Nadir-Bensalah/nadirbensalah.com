import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { caseStudies } from '@/content/caseStudies';

export const metadata: Metadata = {
  title: 'Études de cas – Applications mobiles, SaaS, marketplaces et logiciels métier',
  description: 'Découvrez des exemples de projets digitaux : application mobile, SaaS B2B, marketplace et logiciel métier sur mesure.',
  alternates: { canonical: '/etudes-de-cas' },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <section className="pt-36 pb-24 md:pt-44 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-700 tracking-widest text-indigo-400 uppercase">Preuves & résultats</span>
          <h1 className="text-4xl md:text-7xl font-800 text-white tracking-tight leading-[1.05] max-w-4xl mt-5">Études de cas orientées produit, business et conversion</h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-3xl mt-7">Des exemples de problématiques résolues avec une approche pragmatique : cadrer, prioriser, développer et lancer une solution digitale utile.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/etudes-de-cas/${study.slug}`} className="glass-card rounded-3xl p-7 hover:border-indigo-500/25 transition-all duration-300 hover:-translate-y-1">
                <span className="text-xs font-700 text-indigo-400 uppercase tracking-widest">{study.sector}</span>
                <h2 className="text-2xl font-800 text-white tracking-tight mt-4">{study.title}</h2>
                <p className="text-[#A1A1AA] leading-relaxed mt-4">{study.description}</p>
                <p className="text-sm font-700 text-cyan-300 mt-6">Résultat : {study.result}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
