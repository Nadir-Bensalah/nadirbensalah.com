'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const services = [
  {
    iconName: 'DevicePhoneMobileIcon' as const,
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'rgba(99,102,241,0.2)',
    title: 'Développement Mobile & Web',
    tag: 'Core',
    href: '/services/creation-application-mobile',
    features: [
      { bold: 'React Native', rest: ' : iOS, Android et Web avec une seule base de code.' },
      { bold: 'Performant', rest: ' : Optimisation du temps de chargement et des animations.' },
      { bold: 'Intuitif', rest: " : Pensé pour que l\'utilisateur atteigne son but sans friction." },
      { bold: "Intégration IA", rest: ' : Aide à la saisie, suggestions, automatisations.' },
    ],
  },
  {
    iconName: 'SwatchIcon' as const,
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.2)',
    title: 'UI/UX Design',
    tag: 'Design',
    href: '/services/developpement-site-web-sur-mesure',
    features: [
      { bold: 'Interfaces premium', rest: ' : Animations fluides et hiérarchie visuelle soignée.' },
      { bold: 'Engagement & rétention', rest: " : Structure des écrans pour garder l'utilisateur actif." },
      { bold: 'Maquettes itératives', rest: ' : Vous validez le design avant le développement.' },
      { bold: 'Expertise mobile', rest: ' : Patterns iOS/Android et bonnes pratiques natives.' },
    ],
  },
  {
    iconName: 'RocketLaunchIcon' as const,
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.2)',
    title: 'Lancement & Suivi',
    tag: 'Growth',
    href: '/services/maintenance-application-mobile-saas',
    features: [
      { bold: 'AppStore & Play Store', rest: ' : Conformité et politiques des stores gérées pour vous.' },
      { bold: 'Maintenance évolutive', rest: ' : Évolutions, mises à jour et correctifs dans la durée.' },
      { bold: 'Réactivité', rest: ' : Échanges directs, sans intermédiaire.' },
      { bold: 'Suivi des performances', rest: ' : Data-driven pour rester au niveau.' },
    ],
  },
];

export default function ServicesSection() {
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
    sectionRef.current?.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20 scroll-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span className="text-xs font-600 tracking-widest text-indigo-400 uppercase">Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-800 text-white tracking-tight max-w-2xl">
            Des services taillés{' '}
            <span className="text-gradient-vivid">pour votre succès</span>
          </h2>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1 — large */}
          <div className="scroll-reveal stagger-1 md:col-span-5 glass-card rounded-2xl p-8 flex flex-col gap-6 hover:border-indigo-500/20 transition-all duration-400 hover:-translate-y-1 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${services[0].glow} 0%, transparent 70%)` }} />
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${services[0].gradient} flex items-center justify-center shadow-lg`}>
              <Icon name={services[0].iconName} size={22} className="text-white" variant="outline" />
            </div>
            <div>
              <span className="text-xs font-600 text-indigo-400 uppercase tracking-wider">{services[0].tag}</span>
              <h3 className="text-xl font-700 text-white mt-1">{services[0].title}</h3>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {services[0].features.map((feat, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-indigo-400 mt-2.5 flex-shrink-0" />
                  <span className="text-sm text-[#71717A] leading-relaxed">
                    <strong className="text-[#A1A1AA] font-600">{feat.bold}</strong>{feat.rest}
                  </span>
                </li>
              ))}
            </ul>
            <Link href={services[0].href} className="text-sm font-700 text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
              Découvrir ce service →
            </Link>
          </div>

          {/* Cards 2 & 3 stacked */}
          <div className="md:col-span-7 grid grid-cols-1 gap-5">
            {services.slice(1).map((service, i) => (
              <div key={i} className={`scroll-reveal stagger-${i + 2} glass-card rounded-2xl p-7 flex flex-col gap-5 hover:border-violet-500/20 transition-all duration-400 hover:-translate-y-1 group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${service.glow} 0%, transparent 70%)` }} />
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon name={service.iconName} size={18} className="text-white" variant="outline" />
                  </div>
                  <div>
                    <span className="text-xs font-600 text-violet-400 uppercase tracking-wider">{service.tag}</span>
                    <h3 className="text-lg font-700 text-white">{service.title}</h3>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#71717A] leading-relaxed">
                        <strong className="text-[#A1A1AA] font-600">{feat.bold}</strong>{feat.rest}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="text-sm font-700 text-violet-400 hover:text-violet-300 transition-colors duration-200">
                  Découvrir ce service →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20 scroll-reveal stagger-4">
          <p className="text-[#71717A] mb-6 text-base">Chaque projet est unique — parlons du vôtre.</p>
          <Link href="/#contact" className="btn-primary px-8 py-4 rounded-full text-base font-700 inline-block">
            Discuter de mon projet →
          </Link>
        </div>
      </div>
    </section>
  );
}