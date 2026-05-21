'use client';

import React, { useState, useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const steps = [
{
  number: '01',
  title: 'Préparation du projet',
  emoji: '📋',
  subtitle: 'Cadrer pour maximiser les chances de succès',
  description: "Analyse de votre marché, définition des fonctionnalités prioritaires, estimation du budget et des délais. On cadre le projet pour maximiser vos chances de succès."
},
{
  number: '02',
  title: 'Maquettage',
  emoji: '🎨',
  subtitle: 'Valider le visuel avant de coder',
  description: "Création des maquettes UI/UX interactives. Vous validez chaque écran avant qu\'une seule ligne de code soit écrite. Zéro surprise au développement."
},
{
  number: '03',
  title: 'Développement',
  emoji: '</>',
  subtitle: 'Front, back, serveur — tout inclus',
  description: "Développement React Native full-stack avec backend Node.js, base de données, APIs, notifications push. Livraisons régulières pour suivre l'avancement."
},
{
  number: '04',
  title: 'Lancement',
  emoji: '🚀',
  subtitle: 'App Store, Play Store et au-delà',
  description: "Publication sur les stores, configuration des outils d'analytics, onboarding de vos premiers utilisateurs. Votre app est en vie."
}];


export default function ProcessSection() {
  const [openStep, setOpenStep] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    const els = sectionRef?.current?.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="processus" className="py-28 md:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="text-xs font-600 tracking-widest text-violet-400 uppercase">Méthode</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-800 text-white tracking-tight max-w-2xl">
            4 étapes pour{' '}
            <span className="text-gradient-primary">atteindre votre objectif</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24 scroll-reveal stagger-1">
          {steps?.map((step, i) =>
          <button
            key={i}
            onClick={() => setOpenStep(openStep === i ? null : i)}
            className={`process-item text-left glass-card rounded-2xl p-6 cursor-pointer transition-all duration-400 ${
            openStep === i ? 'border-indigo-500/30 bg-indigo-500/[0.04]' : 'hover:border-white/10'}`
            }>

              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-700 text-indigo-400 font-mono">{step?.number}</span>
                    <h3 className="text-base md:text-lg font-700 text-white">{step?.title}</h3>
                  </div>
                  <p className="text-sm text-[#71717A]">{step?.subtitle}</p>
                  {openStep === i &&
                <p className="text-sm text-[#A1A1AA] mt-3 leading-relaxed border-t border-white/[0.06] pt-3">
                      {step?.description}
                    </p>
                }
                </div>
                <svg
                className={`w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5 transition-transform duration-300 ${openStep === i ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>

                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* Optimization cycle */}
        <div className="scroll-reveal stagger-2">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-800 text-white tracking-tight">
              Et la suite :{' '}
              <span className="text-gradient-vivid">Optimisation Continue</span>
            </h3>
            <p className="text-[#71717A] mt-3 text-base">
              Une méthode data-driven pour améliorer la rentabilité de votre application.
            </p>
          </div>

          <div className="max-w-2xl rounded-2xl overflow-hidden glass-card border border-white/[0.07]">
            <AppImage
              src="https://img.rocket.new/generatedImages/rocket_gen_img_1107701b7-1765199291240.png"
              alt="Diagramme cyclique d'optimisation d'application mobile avec étapes analytiques, tableau de bord data"
              width={800} height={500}
              className="w-full object-cover opacity-80" />

            <div className="p-6">
              <p className="text-sm text-[#A1A1AA] text-center">
                <strong className="text-white">Je me base sur des chiffres</strong>, de la vraie data issue de l&apos;utilisation de votre application.{' '}
                <span className="text-indigo-400 font-600">Nous avançons méthodiquement vers vos objectifs financiers</span>.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {['Analyse des données', 'Repérer le problème', 'Formuler hypothèses', 'Implémenter & tester']?.map((s, i) =>
                <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-700 flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    <span className="text-xs text-[#A1A1AA] font-500">{s}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}