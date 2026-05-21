'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const allProjects = [
{
  name: 'Out Unity',
  year: '2025',
  description: "Charlène, passionnée de sport outdoor, voyageait souvent seule. Out Unity connecte les sportifs outdoor pour ne plus jamais sortir seul. Trail, rando, run, vélo — trouvez votre partenaire.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_107f30a82-1767802979035.png",
  alt: 'Application mobile sport outdoor avec interface de carte de randonnée et profils sportifs',
  tag: 'Sport & Social',
  accent: 'text-indigo-400',
  accentBg: 'bg-indigo-500/10 border-indigo-500/20'
},
{
  name: 'Empabox',
  year: '2025',
  description: "Empabox transforme la communication de couple en un jeu simple et efficace. Échangez des points, relevez des quêtes adaptées à votre relation, exprimez ce que vous ressentez sans conflits.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dbb26a31-1777115299999.png",
  alt: 'Interface application couple avec système de points et quêtes quotidiennes sur fond coloré',
  tag: 'Lifestyle',
  accent: 'text-violet-400',
  accentBg: 'bg-violet-500/10 border-violet-500/20'
},
{
  name: 'PASS.Haute-Savoie',
  year: '2026',
  description: "Un pass digital pour (re)découvrir la Haute-Savoie grâce à une sélection d'adresses locales d'exception, avec des avantages exclusifs accessibles depuis une app simple et élégante.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a99b73d8-1777115300518.png",
  alt: 'Application tourisme Haute-Savoie avec paysage alpin montagneux et interface de découverte locale',
  tag: 'Tourisme',
  accent: 'text-cyan-400',
  accentBg: 'bg-cyan-500/10 border-cyan-500/20'
},
{
  name: 'Fleeto',
  year: '2024',
  description: "Application de gestion de flotte automobile pour PME. Suivi GPS en temps réel, alertes de maintenance, rapports kilométriques et gestion des conducteurs depuis une interface mobile intuitive.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f90c4fd6-1772803707014.png",
  alt: 'Application mobile gestion de flotte automobile avec carte GPS et tableau de bord de véhicules',
  tag: 'B2B SaaS',
  accent: 'text-blue-400',
  accentBg: 'bg-blue-500/10 border-blue-500/20'
},
{
  name: 'Katch',
  year: '2024',
  description: "Plateforme de mise en relation entre photographes freelance et clients pour des shootings express. Réservation en 3 clics, paiement sécurisé et livraison des photos en 48h.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_159376051-1765467770017.png",
  alt: 'Application de mise en relation photographes avec portfolio visuel et interface de réservation',
  tag: 'Marketplace',
  accent: 'text-pink-400',
  accentBg: 'bg-pink-500/10 border-pink-500/20'
},
{
  name: 'Wello',
  year: '2023',
  description: "Application de bien-être mental pour les équipes en entreprise. Suivi de l'humeur quotidienne, exercices de respiration, méditations guidées et dashboard RH anonymisé.",
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_163e50af9-1772131420505.png",
  alt: 'Application bien-être mental avec interface apaisante, graphiques d\'humeur et exercices de méditation',
  tag: 'Santé & RH',
  accent: 'text-emerald-400',
  accentBg: 'bg-emerald-500/10 border-emerald-500/20'
}];


export default function ProjectsGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    sectionRef?.current?.querySelectorAll('.scroll-reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 pb-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allProjects?.map((project, i) =>
          <div
            key={i}
            className={`scroll-reveal stagger-${i % 3 + 1} project-card glass-card rounded-2xl overflow-hidden flex flex-col`}>

              {/* Image */}
              <div className="h-52 overflow-hidden bg-white/[0.02]">
                <AppImage
                src={project?.image}
                alt={project?.alt}
                width={600} height={400}
                className="project-image w-full h-full object-cover transition-transform duration-700" />

              </div>
              {/* Content */}
              <div className="p-6 flex flex-col flex-1 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-xl font-800 text-white">{project?.name}</h2>
                  <span className="text-sm font-600 text-[#71717A] flex-shrink-0">{project?.year}</span>
                </div>
                <span className={`self-start text-xs font-600 px-3 py-1 rounded-full border ${project?.accentBg} ${project?.accent}`}>{project?.tag}</span>
                <p className="text-sm text-[#71717A] leading-relaxed flex-1">{project?.description}</p>
                <button className="btn-outline px-4 py-2.5 rounded-full text-sm font-600 text-center mt-2 w-full">
                  Voir plus
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-20 scroll-reveal">
          <div className="glass-card rounded-2xl p-10 max-w-2xl mx-auto border border-indigo-500/10">
            <h3 className="text-2xl font-800 text-white mb-3">Votre projet sera le prochain ?</h3>
            <p className="text-[#71717A] mb-6">Discutons de votre idée et transformons-la en application.</p>
            <Link href="/#contact" className="btn-primary px-8 py-4 rounded-full text-base font-700 inline-block">
              Démarrer mon projet →
            </Link>
          </div>
        </div>
      </div>
    </section>);

}