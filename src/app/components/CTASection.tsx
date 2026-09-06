'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.2 }
    );
    sectionRef?.current?.querySelectorAll('.scroll-reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-28 md:py-36 bg-background">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="scroll-reveal relative overflow-hidden rounded-3xl p-12 md:p-16"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/[0.06] mb-6">
              <span className="availability-pulse relative w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-600 tracking-widest text-green-400 uppercase">Disponible maintenant</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-800 text-white tracking-tight mb-6">
              Votre idée mérite une{' '}
              <span className="text-gradient-vivid">application qui performe</span>
            </h2>
            <p className="text-[#71717A] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Discutons de votre projet en 30 minutes. Estimation honnête et plan d&apos;action clair, sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@nadirbensalah.com"
                className="btn-primary px-8 py-4 rounded-full text-base font-700 inline-block"
              >
                Envoyer un email →
              </a>
              <Link href="/tarifs" className="btn-outline px-8 py-4 rounded-full text-base font-600 inline-block">
                Voir les tarifs
              </Link>
            </div>
            <p className="text-sm text-[#52525B] mt-6">
              Réponse garantie sous 24h · Première consultation gratuite
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}