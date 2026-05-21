'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const projects = [
{
  name: 'Out Unity',
  year: '2025',
  description: "Charlène, passionnée de sport outdoor, voyageait souvent seule. Out Unity connecte les sportifs outdoor pour ne plus jamais sortir seul.",
  image: "https://images.unsplash.com/photo-1638447841552-8194177a5536",
  alt: "Écrans d'application mobile de sport outdoor avec carte de randonnée et profils utilisateurs",
  tag: 'Sport & Social',
  accent: 'text-indigo-400',
  accentBg: 'bg-indigo-500/10 border-indigo-500/20'
},
{
  name: 'Empabox',
  year: '2025',
  description: "Empabox transforme la communication de couple en un jeu simple et efficace. Échangez des points, relevez des quêtes, exprimez ce que vous ressentez.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_144d6c8ed-1767569731248.png",
  alt: "Interface d\'application mobile de communication de couple avec profils et système de points colorés",
  tag: 'Lifestyle',
  accent: 'text-violet-400',
  accentBg: 'bg-violet-500/10 border-violet-500/20'
},
{
  name: 'PASS.Haute-Savoie',
  year: '2026',
  description: "Un pass digital pour (re)découvrir la Haute-Savoie grâce à une sélection d'adresses locales d'exception avec des avantages exclusifs.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dcf4f999-1764724518284.png",
  alt: "Application mobile tourisme Haute-Savoie avec montagne alpine et interface de découverte locale",
  tag: 'Tourisme',
  accent: 'text-cyan-400',
  accentBg: 'bg-cyan-500/10 border-cyan-500/20'
}];


export default function PortfolioPreview() {
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
    <section ref={sectionRef} id="portfolio" className="py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16 scroll-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-xs font-600 tracking-widest text-cyan-400 uppercase">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-800 text-white tracking-tight max-w-xl">
              <span className="text-[#71717A]">22 applications</span>{' '}
              <span className="text-gradient-vivid">développées</span>
            </h2>
          </div>
          <p className="text-[#71717A] max-w-sm text-base leading-relaxed">
            Chaque application est une illustration de mon expertise pour les startups et entrepreneurs.
          </p>
        </div>

        {/* Projects grid — asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-14">
          {/* Large card */}
          <div className="scroll-reveal stagger-1 md:col-span-5 project-card glass-card rounded-2xl overflow-hidden flex flex-col">
            <div className="h-64 overflow-hidden bg-white/[0.02]">
              <AppImage
                src={projects?.[0]?.image}
                alt={projects?.[0]?.alt}
                width={600} height={400}
                className="project-image w-full h-full object-cover transition-transform duration-700" />

            </div>
            <div className="p-6 flex flex-col flex-1 gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-800 text-white">{projects?.[0]?.name}</h3>
                <span className="text-sm font-600 text-[#71717A] flex-shrink-0">{projects?.[0]?.year}</span>
              </div>
              <span className={`self-start text-xs font-600 px-3 py-1 rounded-full border ${projects?.[0]?.accentBg} ${projects?.[0]?.accent}`}>{projects?.[0]?.tag}</span>
              <p className="text-sm text-[#71717A] leading-relaxed flex-1">{projects?.[0]?.description}</p>
              <Link href="/projets" className="btn-outline px-4 py-2.5 rounded-full text-sm font-600 inline-block text-center mt-2">
                Voir le projet
              </Link>
            </div>
          </div>

          {/* Two stacked cards */}
          <div className="md:col-span-7 grid grid-cols-1 gap-5">
            {projects?.slice(1)?.map((project, i) =>
            <div key={i} className={`scroll-reveal stagger-${i + 2} project-card glass-card rounded-2xl overflow-hidden flex flex-col md:flex-row`}>
                <div className="h-48 md:h-auto md:w-48 flex-shrink-0 overflow-hidden bg-white/[0.02]">
                  <AppImage
                  src={project?.image}
                  alt={project?.alt}
                  width={400} height={300}
                  className="project-image w-full h-full object-cover transition-transform duration-700" />

                </div>
                <div className="p-5 flex flex-col flex-1 gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-800 text-white">{project?.name}</h3>
                    <span className="text-xs font-600 text-[#71717A] flex-shrink-0">{project?.year}</span>
                  </div>
                  <span className={`self-start text-xs font-600 px-2.5 py-1 rounded-full border ${project?.accentBg} ${project?.accent}`}>{project?.tag}</span>
                  <p className="text-sm text-[#71717A] leading-relaxed flex-1">{project?.description}</p>
                  <Link href="/projets" className="btn-outline px-3 py-2 rounded-full text-xs font-600 inline-block text-center mt-1">
                    Voir le projet
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* View all CTA */}
        <div className="text-center scroll-reveal stagger-4">
          <Link href="/projets" className="btn-primary px-8 py-4 rounded-full text-base font-700 inline-block">
            Voir tous mes projets (22) →
          </Link>
        </div>
      </div>
    </section>);

}