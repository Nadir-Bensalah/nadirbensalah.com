import React from 'react';

export default function ProjectsHero() {
  return (
    <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: '#09090B' }}>
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)' }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-xs font-600 tracking-widest text-indigo-400 uppercase">Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-800 text-white tracking-tight mb-6 max-w-3xl">
          <span className="text-[#71717A]">22 applications</span>{' '}
          <span className="text-gradient-vivid">développées</span>{' '}
          <span className="text-white">pour des startups</span>
        </h1>
        <p className="text-lg text-[#71717A] max-w-2xl leading-relaxed">
          Chaque application est une illustration de mon expertise dans le développement mobile pour les startups et entrepreneurs ambitieux.
        </p>
      </div>
    </section>
  );
}