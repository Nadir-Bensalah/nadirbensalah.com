import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Développeur Web & Mobile Amiens | Application Mobile React Native | Agence Web France',
  description: "Développeur Full Stack Amiens - Création application mobile iOS Android, site web WordPress, développement SaaS, base de données. Agence web freelance React Native Node.js Amiens France.",
  keywords: 'développeur web amiens, développeur mobile amiens, application mobile amiens, agence web amiens, création site web amiens, react native amiens, développeur freelance amiens, application ios android amiens, développeur wordpress amiens, base de données amiens, développement saas amiens, site internet amiens, agence digitale amiens, développeur full stack france, création application mobile france, mobile app developer france, web developer amiens, react developer amiens, node.js developer amiens',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
  openGraph: {
    title: 'Développeur Web Mobile Amiens | Application React Native | Agence Web',
    description: "Expert développement application mobile iOS Android, site web, SaaS. Agence web freelance Amiens France.",
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    locale: 'fr_FR',
    alternateLocale: ['en_US', 'ar_SA'],
  },
  alternates: {
    languages: {
      'fr': '/',
      'en': '/',
      'ar': '/',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com').replace(/\/$/, '');
  const globalSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Nadir Ben Salah - Développeur Web Mobile Amiens',
      url: siteUrl,
      inLanguage: ['fr-FR', 'en-US', 'ar-SA'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/plan-du-site?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Nadir Ben Salah - Agence Web & Mobile Amiens',
      url: siteUrl,
      description: 'Développeur Full Stack spécialisé création application mobile React Native, développement web WordPress, SaaS, base de données. Agence web freelance Amiens France.',
      areaServed: [{
        '@type': 'City',
        name: 'Amiens'
      }, {
        '@type': 'Country',
        name: 'France'
      }],
      serviceType: ['Développement Application Mobile', 'Création Site Web', 'Développement WordPress', 'Application React Native', 'Développement SaaS', 'Base de Données', 'API REST', 'Application iOS', 'Application Android', 'Site E-commerce', 'Web Agency', 'Mobile App Development', 'تطوير تطبيقات الجوال', 'تطوير المواقع'],
      priceRange: '$$',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nadir Ben Salah',
      url: siteUrl,
      jobTitle: 'Développeur Full Stack Web & Mobile | Mobile App Developer | مطور تطبيقات',
      knowsAbout: ['React Native', 'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'WordPress', 'MongoDB', 'PostgreSQL', 'Firebase', 'Supabase', 'iOS Development', 'Android Development', 'SaaS', 'API REST', 'Mobile Apps', 'Web Development', 'Database', 'تطوير التطبيقات', 'تطوير الويب'],
      areaServed: ['Amiens', 'France', 'Tunisie', 'Europe', 'Remote'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amiens',
        addressCountry: 'FR'
      },
    },
  ];

  return (
    <html lang="fr">
      <head>
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="alternate" hrefLang="fr" href={siteUrl} />
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="ar" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      </head>
      <body style={{ background: '#0d0f14' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }} />
        {children}
      </body>
    </html>
  );
}