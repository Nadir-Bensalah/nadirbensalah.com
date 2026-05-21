import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PricingHero from './components/PricingHero';
import PricingCards from './components/PricingCards';
import PricingFAQ from './components/PricingFAQ';
import PricingCTA from './components/PricingCTA';

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <PricingHero />
      <PricingCards />
      <PricingFAQ />
      <PricingCTA />
      <Footer />
    </main>
  );
}