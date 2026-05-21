import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'À propos – Nadir Ben Salah, développeur mobile, SaaS et solutions web',
  description: 'Découvrez le positionnement de Nadir Ben Salah : développeur expert en applications mobiles, SaaS, plateformes web et logiciels métier sur mesure.',
  alternates: { canonical: '/a-propos' },
};

export default function AboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nadir Ben Salah',
    jobTitle: 'Développeur expert applications mobiles, SaaS et solutions web sur mesure',
    knowsAbout: ['React Native', 'Next.js', 'SaaS', 'Mobile apps', 'Marketplaces', 'Custom software', 'AI integrations'],
    areaServed: ['France', 'Tunisie', 'Europe', 'International'],
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="relative pt-36 pb-24 md:pt-44 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.18) 42%, transparent 72%)' }} />
        <div className="noise-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          <div>
            <span className="text-xs font-700 tracking-widest text-indigo-400 uppercase">Personal branding</span>
            <h1 className="text-4xl md:text-7xl font-800 text-white tracking-tight leading-[1.05] mt-5">Un partenaire technique senior pour transformer une idée en produit digital rentable</h1>
            <div className="mt-8 space-y-5 text-lg text-[#A1A1AA] leading-relaxed max-w-3xl">
              <p>Je suis Nadir Ben Salah, développeur spécialisé dans les applications mobiles, SaaS, plateformes web, marketplaces, logiciels métier et intégrations IA.</p>
              <p>Mon positionnement est simple : aider les entrepreneurs, startups et PME à construire des produits digitaux sérieux, utiles et capables de générer des résultats business.</p>
              <p>Je ne vends pas uniquement du code. J’accompagne le cadrage produit, les choix techniques, l’expérience utilisateur, le lancement et l’évolution du produit.</p>
            </div>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link href="/#contact" className="btn-primary px-7 py-3.5 rounded-full text-base font-700 text-center">Parler de mon projet →</Link>
              <Link href="/etudes-de-cas" className="btn-outline px-7 py-3.5 rounded-full text-base font-600 text-center">Voir les études de cas</Link>
            </div>
          </div>
          <aside className="glass-card rounded-3xl p-7">
            <p className="text-sm font-700 text-white mb-5">Expertise principale</p>
            <div className="space-y-3">
              {['Applications mobiles React Native', 'SaaS et plateformes web', 'Logiciels métier sur mesure', 'Marketplaces et back-offices', 'Automatisations et IA appliquée'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[#A1A1AA]"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />{item}</div>
              ))}
            </div>
          </aside>
        </div>
      </section>
      <section className="py-20 section-gradient">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[['Produit', 'Prioriser les fonctionnalités qui créent réellement de la valeur.'], ['Technique', 'Construire une architecture maintenable, rapide et évolutive.'], ['Business', 'Transformer le développement en levier de conversion, d’efficacité ou de revenu.']].map(([title, text]) => (
            <div key={title} className="glass-card rounded-3xl p-7">
              <h2 className="text-2xl font-800 text-white mb-4">{title}</h2>
              <p className="text-[#A1A1AA] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
