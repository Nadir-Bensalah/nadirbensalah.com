import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { caseStudies, findCaseStudy } from '@/content/caseStudies';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.description,
    alternates: { canonical: `/etudes-de-cas/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = findCaseStudy(slug);
  if (!study) notFound();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <article className="pt-36 pb-24 md:pt-44 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <Link href="/etudes-de-cas" className="text-sm font-700 text-indigo-400 hover:text-indigo-300">← Études de cas</Link>
          <span className="block text-xs font-700 tracking-widest text-indigo-400 uppercase mt-8">{study.sector}</span>
          <h1 className="text-4xl md:text-6xl font-800 text-white tracking-tight leading-[1.06] mt-5">{study.title}</h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mt-7 max-w-3xl">{study.description}</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
            <div className="glass-card rounded-3xl p-7 lg:col-span-2">
              <h2 className="text-2xl font-800 text-white mb-4">Challenge</h2>
              <p className="text-[#A1A1AA] leading-relaxed">{study.challenge}</p>
            </div>
            <div className="glass-card rounded-3xl p-7">
              <h2 className="text-2xl font-800 text-white mb-4">Résultat</h2>
              <p className="text-cyan-300 font-700 leading-relaxed">{study.result}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <section className="glass-card rounded-3xl p-7">
              <h2 className="text-2xl font-800 text-white mb-5">Solution</h2>
              <ul className="space-y-3">
                {study.solution.map((item) => <li key={item} className="text-[#A1A1AA] leading-relaxed">• {item}</li>)}
              </ul>
            </section>
            <section className="glass-card rounded-3xl p-7">
              <h2 className="text-2xl font-800 text-white mb-5">Impact business</h2>
              <ul className="space-y-3">
                {study.impact.map((item) => <li key={item} className="text-[#A1A1AA] leading-relaxed">• {item}</li>)}
              </ul>
            </section>
          </div>
          <div className="mt-12 rounded-3xl p-8 md:p-10 border border-indigo-500/20 bg-indigo-500/[0.06] text-center">
            <h2 className="text-3xl font-800 text-white tracking-tight">Vous voulez un résultat similaire ?</h2>
            <p className="text-[#A1A1AA] leading-relaxed mt-4 mb-7">Discutons de votre contexte, de vos contraintes et de la première version à lancer.</p>
            <Link href="/#contact" className="btn-primary px-7 py-3.5 rounded-full text-base font-700 inline-block">Parler de mon projet →</Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
