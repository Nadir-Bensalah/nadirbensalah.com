import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact – Discuter de votre application mobile, SaaS ou projet web',
  description: 'Contactez Nadir Ben Salah pour cadrer une application mobile, un SaaS, une plateforme web, une marketplace ou un logiciel métier sur mesure.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <section className="relative pt-36 pb-24 md:pt-44 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(6,182,212,0.16) 42%, transparent 72%)' }} />
        <div className="noise-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
          <div>
            <span className="text-xs font-700 tracking-widest text-indigo-400 uppercase">Contact qualifié</span>
            <h1 className="text-4xl md:text-7xl font-800 text-white tracking-tight leading-[1.05] mt-5">Parlons de votre projet digital avec clarté</h1>
            <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-3xl mt-7">Application mobile, SaaS, marketplace, logiciel métier, site web premium ou automatisation : envoyez votre contexte et je vous réponds avec une première lecture claire du périmètre, des risques, du budget et des prochaines étapes.</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a href="mailto:contact@nadirbensalah.com?subject=Projet digital - demande d'échange" className="btn-primary px-7 py-3.5 rounded-full text-base font-700 text-center">Envoyer un email →</a>
              <Link href="/tarifs" className="btn-outline px-7 py-3.5 rounded-full text-base font-600 text-center">Voir les tarifs</Link>
            </div>
          </div>
          <aside className="glass-card rounded-3xl p-7">
            <h2 className="text-2xl font-800 text-white mb-5">Pour gagner du temps, précisez :</h2>
            <ul className="space-y-4">
              {['Type de projet : mobile, SaaS, web, marketplace, logiciel métier', 'Objectif business principal', 'Fonctionnalités indispensables', 'Budget ou fourchette envisagée', 'Délai souhaité', 'Existence d’un design, cahier des charges ou produit actuel'].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#A1A1AA] leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2.5 flex-shrink-0" />{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <section className="py-20 section-gradient">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[['Réponse claire', 'Une première analyse du périmètre et des priorités.'], ['Vision budget', 'Une lecture réaliste des coûts selon le niveau de complexité.'], ['Prochaine étape', 'Un plan simple pour cadrer, développer ou auditer.']].map(([title, text]) => (
            <div key={title} className="glass-card rounded-3xl p-7">
              <h2 className="text-xl font-800 text-white mb-3">{title}</h2>
              <p className="text-[#A1A1AA] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
