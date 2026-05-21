'use client';

import React, { useState, useEffect, useRef } from 'react';

const faqs = [
  {
    question: "Combien coûte le développement d\'une application mobile ?",
    answer: "Le coût dépend de la complexité de votre projet : nombre d'écrans, fonctionnalités, intégrations API, backend nécessaire... En général, une app MVP se situe entre 8 000€ et 25 000€. Je vous donne une estimation précise après un appel de 30 minutes.",
  },
  {
    question: "Combien de temps pour développer mon application ?",
    answer: "Un MVP fonctionnel prend généralement 2 à 4 mois selon la complexité. Je livre en sprints de 2 semaines avec des démos régulières pour valider l\'avancement.",
  },
  {
    question: "Pourquoi choisir React Native ?",
    answer: "React Native permet de développer iOS, Android et Web avec une seule base de code, réduisant les coûts de 40% par rapport à des développements natifs séparés. Les performances sont excellentes pour 95% des cas d'usage.",
  },
  {
    question: "Que comprend la maintenance mensuelle ?",
    answer: "La maintenance inclut le monitoring de l'app, les corrections de bugs, les mises à jour de compatibilité avec les nouvelles versions d'iOS/Android, et les modifications mineures. Le plan Optimisation inclut en plus un suivi data et des améliorations continues.",
  },
  {
    question: "Travaillez-vous seul ou avec une équipe ?",
    answer: "Je travaille principalement en solo pour garantir un interlocuteur unique et une cohérence maximale. Pour les grands projets, je m'appuie sur un réseau de freelances spécialisés (design, backend, QA) que je coordonne.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section ref={sectionRef} className="py-20 pb-24 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-600 tracking-widest text-indigo-400 uppercase">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-800 text-white tracking-tight">
            Questions fréquentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs?.map((faq, i) => (
            <div
              key={i}
              className={`scroll-reveal stagger-${i + 1} glass-card rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'border-indigo-500/20' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="text-base font-600 text-white">{faq?.question}</span>
                <svg
                  className={`w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 border-t border-white/[0.06] pt-4">
                  <p className="text-sm text-[#71717A] leading-relaxed">{faq?.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}