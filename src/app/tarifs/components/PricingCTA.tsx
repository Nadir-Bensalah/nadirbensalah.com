'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function PricingCTA() {
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
    <section ref={sectionRef} className="py-20 pb-32 section-gradient">
      <div className="max-w-3xl mx-auto px-6 text-center scroll-reveal">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-14"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.08) 50%, rgba(6,182,212,0.06) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-800 text-white mb-4">
              Prêt à lancer votre application ?
            </h2>
            <p className="text-[#71717A] mb-8 leading-relaxed">
              Contactez-moi pour une estimation gratuite et personnalisée de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@nadirbensalah.com"
                className="btn-primary px-8 py-4 rounded-full text-base font-700 inline-block"
              >
                Obtenir mon estimation →
              </a>
              <Link href="/projets" className="btn-outline px-8 py-4 rounded-full text-base font-600 inline-block">
                Voir mes projets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}