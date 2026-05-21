'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
{
  name: 'Wilfried',
  company: 'REKR',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13743afca-1763292193180.png",
  alt: 'Portrait de Wilfried, fondateur de REKR, homme souriant',
  rating: 5,
  quote: 'Excellent service et suivi. Recommande à 100%. Nadir a su comprendre notre vision et la traduire en une app parfaite.'
},
{
  name: 'Sophie Martin',
  company: 'Out Unity',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f290582d-1772705272953.png",
  alt: 'Portrait de Sophie Martin, fondatrice de Out Unity, femme professionnelle souriante',
  rating: 5,
  quote: 'Développement impeccable, délais respectés et communication claire à chaque étape. Notre app sport a dépassé nos attentes.'
},
{
  name: 'Thomas Leclerc',
  company: 'PASS.Haute-Savoie',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14aebd019-1763293570235.png",
  alt: 'Portrait de Thomas Leclerc, directeur du projet PASS Haute-Savoie',
  rating: 5,
  quote: 'Une expertise technique rare alliée à une vraie compréhension des enjeux business. Le résultat est bluffant.'
}];


export default function TestimonialsSection() {
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
    sectionRef?.current?.querySelectorAll('.scroll-reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 section-gradient">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-xs font-600 tracking-widest text-violet-400 uppercase">Avis Clients</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-800 text-white tracking-tight">
              Ce que disent{' '}
              <span className="text-gradient-primary">mes clients</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5]?.map((i) =>
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
            </div>
            <div>
              <span className="text-white font-700 text-lg">5.0</span>
              <span className="text-[#71717A] text-sm ml-1.5">sur 15 avis Google</span>
            </div>
          </div>
        </div>

        {/* Testimonials — varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Large featured testimonial */}
          <div className="scroll-reveal stagger-1 md:col-span-5 glass-card rounded-2xl p-8 flex flex-col gap-6 hover:border-violet-500/20 transition-all duration-400">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                <AppImage src={testimonials?.[0]?.avatar} alt={testimonials?.[0]?.alt} width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-700 text-white text-lg">{testimonials?.[0]?.name}</p>
                <p className="text-sm text-[#71717A]">{testimonials?.[0]?.company}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: testimonials?.[0]?.rating })?.map((_, j) =>
              <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
            </div>
            <p className="text-base text-[#A1A1AA] leading-relaxed italic flex-1">&quot;{testimonials?.[0]?.quote}&quot;</p>
          </div>

          {/* Two smaller testimonials */}
          <div className="md:col-span-7 grid grid-cols-1 gap-5">
            {testimonials?.slice(1)?.map((t, i) =>
            <div key={i} className={`scroll-reveal stagger-${i + 2} glass-card rounded-2xl p-6 flex flex-col gap-4 hover:border-indigo-500/20 transition-all duration-400`}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-white/10">
                    <AppImage src={t?.avatar} alt={t?.alt} width={44} height={44} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-700 text-white">{t?.name}</p>
                    <p className="text-xs text-[#71717A]">{t?.company}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t?.rating })?.map((_, j) =>
                  <svg key={j} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                  )}
                  </div>
                </div>
                <p className="text-sm text-[#71717A] leading-relaxed italic">&quot;{t?.quote}&quot;</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}