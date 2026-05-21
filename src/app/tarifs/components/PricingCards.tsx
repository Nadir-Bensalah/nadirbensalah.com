'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Maintenance Simple',
    price: '110€',
    period: '/ mois',
    description: 'Le minimum requis pour s\'assurer d\'une',
    descriptionBold: 'application en bonne santé',
    descriptionEnd: ' qui évolue.',
    features: [
      { bold: 'Garantie', rest: ' que l\'application reste disponible sur les stores.', strong: false },
      { bold: 'Modifications mineures', rest: ' sur l\'application', strong: true },
      { bold: '', rest: 'Corrections de bugs', strong: false },
      { bold: 'Support technique réactif', rest: '', strong: true },
      { bold: '', rest: 'Mises à jour régulières', strong: false },
    ],
    popular: false,
    gradient: 'from-indigo-500/10 to-violet-500/5',
    borderColor: 'border-white/[0.07]',
    accentColor: 'text-indigo-400',
    cta: 'Commencer avec ce plan',
  },
  {
    name: "Optimisation d\'Application",
    price: '300€',
    period: '/ mois',
    description: 'Solution complète pour',
    descriptionBold: 'atteindre ses objectifs financiers',
    descriptionEnd: '.',
    features: [
      { bold: 'Suivi avancé', rest: ' pour optimiser votre application à générer des revenus', strong: true },
      { bold: '', rest: 'Une méthode cyclique en 7 étapes basée sur les données de votre app', strong: false },
      { bold: '', rest: 'Et tout le contenu de la maintenance standard', strong: false },
    ],
    popular: true,
    proTip: 'Conseil de pro : la première année, boostez le lancement de votre appli avec cette offre, puis passez à la Maintenance Simple',
    gradient: 'from-indigo-500/15 to-violet-500/10',
    borderColor: 'border-indigo-500/25',
    accentColor: 'text-indigo-400',
    cta: 'Commencer avec ce plan',
  },
];

export default function PricingCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef?.current?.querySelectorAll('.scroll-reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 pb-32 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 scroll-reveal">
          <h2 className="text-3xl md:text-4xl font-800 text-white tracking-tight mb-4">
            Offres de maintenance
          </h2>
          <p className="text-[#71717A] max-w-2xl text-base leading-relaxed">
            Une fois l&apos;application lancée, il est nécessaire de{' '}
            <span className="text-[#A1A1AA] font-500">la rendre vivante</span>{' '}
            et de{' '}
            <span className="text-[#A1A1AA] font-500">l&apos;améliorer régulièrement</span>.{' '}
            Les utilisateurs sentent lorsqu&apos;une application est laissée à l&apos;abandon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
          {plans?.map((plan, i) => (
            <div
              key={i}
              className={`scroll-reveal stagger-${i + 1} pricing-card rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden border ${plan?.borderColor}`}
              style={{ background: `linear-gradient(135deg, ${plan?.gradient?.replace('from-', '')?.replace('to-', '')})`, backgroundColor: '#111113' }}
            >
              {plan?.popular && (
                <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              )}
              {plan?.popular && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-700 uppercase tracking-wider border border-indigo-500/30">
                    Populaire
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-xl font-800 text-white mb-3">{plan?.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-800 text-white">{plan?.price}</span>
                  <span className="text-[#71717A] font-500">{plan?.period}</span>
                </div>
                <p className="text-sm text-[#71717A]">
                  {plan?.description} <strong className="text-[#A1A1AA]">{plan?.descriptionBold}</strong>{plan?.descriptionEnd}
                </p>
              </div>

              <ul className="flex flex-col gap-3 flex-1">
                {plan?.features?.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#71717A] leading-relaxed">
                      {feat?.bold && <strong className="font-600 text-[#A1A1AA]">{feat?.bold}</strong>}
                      {feat?.rest}
                    </span>
                  </li>
                ))}
              </ul>

              {plan?.proTip && (
                <div className="bg-indigo-500/[0.08] border border-indigo-500/20 rounded-xl p-4">
                  <p className="text-xs text-indigo-300 leading-relaxed">
                    <strong>Conseil de pro</strong> : la première année, boostez le lancement de votre appli avec cette offre, puis passez à la Maintenance Simple
                  </p>
                </div>
              )}

              <Link
                href="/#contact"
                className={`${plan?.popular ? 'btn-primary' : 'btn-outline'} px-6 py-3.5 rounded-full text-sm font-700 text-center block`}
              >
                {plan?.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}