'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const stats = [
{ value: 26, suffix: '', label: 'Clients\nAccompagnés' },
{ value: 22, suffix: '', label: 'Applications\nLancées' },
{ value: 5, suffix: '', label: "Ans\nd\'Expérience" },
{ value: 5.0, suffix: '★', label: 'Sur 15 Avis\nGoogle', isDecimal: true }];


function CounterNumber({ value, suffix, isDecimal }: {value: number;suffix: string;isDecimal?: boolean;}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting && !started) setStarted(true);},
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * value;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, isDecimal]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-800 tracking-tight text-white">
      {isDecimal ? count.toFixed(1) : count}{suffix}
    </span>);

}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !phoneRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      phoneRef.current.style.transform = `rotate(-3deg) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(20px)`;
    };
    const handleMouseLeave = () => {
      if (!phoneRef.current) return;
      phoneRef.current.style.transform = 'rotate(-3deg) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    };
    const hero = heroRef.current;
    hero?.addEventListener('mousemove', handleMouseMove);
    hero?.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      hero?.removeEventListener('mousemove', handleMouseMove);
      hero?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ perspective: '1000px', background: '#09090B' }}>

      {/* Ambient gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)' }} />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.5) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />

      {/* Noise overlay */}
      <div className="noise-bg absolute inset-0 pointer-events-none z-0" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }} />


      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-7">
            {/* Availability badge */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm">
                <span className="availability-pulse relative w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-600 tracking-widest text-green-400 uppercase">Disponible pour de nouveaux projets</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block text-5xl md:text-6xl lg:text-[3.75rem] font-800 leading-[1.05] text-white tracking-tight">
                Développeur
              </span>
              <span className="block text-5xl md:text-6xl lg:text-[3.75rem] font-800 leading-[1.05] tracking-tight mt-1">
                <span className="text-gradient-vivid">Applications Mobiles</span>
              </span>
              <span className="block text-5xl md:text-6xl lg:text-[3.75rem] font-800 leading-[1.05] text-white/60 tracking-tight mt-1">
                pour Startups
              </span>
            </h1>

            {/* Subtext */}
            <p className="animate-fade-in-up text-lg text-[#71717A] font-400 leading-relaxed max-w-lg" style={{ animationDelay: '0.35s' }}>
              Je transforme vos idées en applications iOS & Android performantes. Expertise React Native, design premium, livraison rapide.
            </p>

            {/* CTA */}
            <div className="animate-fade-in-up flex flex-wrap gap-4" style={{ animationDelay: '0.5s' }}>
              <Link href="/#contact" className="btn-primary px-7 py-3.5 rounded-full text-base font-700 inline-block">
                Démarrer un projet →
              </Link>
              <Link href="/projets" className="btn-outline px-7 py-3.5 rounded-full text-base font-600 inline-block">
                Voir mes projets
              </Link>
            </div>

            {/* Tech stack badges */}
            <div className="animate-fade-in-up flex flex-wrap gap-2 mt-1" style={{ animationDelay: '0.6s' }}>
              {['React Native', 'iOS', 'Android', 'TypeScript', 'Node.js'].map((tech) =>
              <span key={tech} className="px-3 py-1.5 text-xs font-600 rounded-full bg-white/[0.04] text-[#A1A1AA] border border-white/[0.07]">
                  {tech}
                </span>
              )}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Review card floating */}
            <div className="animate-float-card-delay absolute top-4 left-0 lg:-left-8 z-20 glass-card rounded-2xl p-4 max-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-[#1A1A2E] flex items-center justify-center text-sm font-700 text-white overflow-hidden">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_196a8c904-1771253021868.png"
                    alt="Portrait de Wilfried, client satisfait"
                    width={36} height={36}
                    className="w-full h-full object-cover" />

                </div>
                <div>
                  <p className="text-sm font-700 text-white">Wilfried</p>
                  <p className="text-xs text-[#71717A]">REKR</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) =>
                <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-[#71717A] italic">&quot;Excellent service et suivi. Recommande à 100%&quot;</p>
            </div>

            {/* Phone */}
            <div
              ref={phoneRef}
              className="relative z-10 phone-shadow"
              style={{
                transform: 'rotate(-3deg)',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d'
              }}>

              <div className="w-[260px] md:w-[300px] lg:w-[320px] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#111113] shadow-2xl">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1f26fb66b-1772378524499.png"
                  alt="Interface d'application mobile dashboard avec graphiques et données sur fond sombre violet"
                  width={320} height={600}
                  priority
                  className="w-full object-cover"
                  style={{ height: '580px' }} />

              </div>
              {/* Phone glow */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 pointer-events-none" />
            </div>

            {/* Tech icons floating */}
            <div className="animate-float-card absolute bottom-8 right-0 lg:-right-4 z-20 glass-card rounded-xl px-4 py-3 flex items-center gap-3">
              <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              <svg className="w-5 h-5 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341l-4.908-9.068L7.71 15.34a5.98 5.98 0 0 0-.887 3.16A5.994 5.994 0 0 0 12.615 24a5.994 5.994 0 0 0 5.794-5.5 5.981 5.981 0 0 0-.886-3.159zm-4.908 6.635a4.016 4.016 0 0 1-4.012-4.013c0-.739.205-1.43.561-2.019l3.45 6.377.001-.345z" /></svg>
              <span className="text-xs font-600 text-[#71717A]">Stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-0">
            {/* Avatar */}
            <div className="flex-shrink-0 sm:mr-10">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-white/10 ring-2 ring-indigo-500/20">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_124b73a1e-1763291748823.png"
                  alt="Portrait professionnel de Nadir Ben Salah, développeur freelance"
                  width={56} height={56}
                  className="w-full h-full object-cover" />

              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-10 sm:gap-14">
              {stats.map((stat, i) =>
              <div key={i} className="flex flex-col items-center sm:items-start gap-0.5">
                  <CounterNumber value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
                  <p className="text-[10px] font-500 text-[#71717A] uppercase tracking-wider whitespace-pre-line text-center sm:text-left" style={{ lineHeight: '1.4' }}>
                    {stat.label}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>);

}