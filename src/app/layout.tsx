import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com'),
  title: "Développeur d'applications mobiles iOS & Android · Nadir Ben Salah",
  description: 'Independent mobile app developer. Seven apps shipped to the App Store, designed and built end to end. React Native, TypeScript, iOS and Android.',
  keywords: "développeur applications mobiles, développeur react native, développeur mobile freelance, application iOS Android, react native, typescript, publication app store, firebase, supabase, développeur mobile Amiens, Capmedia Digital",
  icons: {
    icon: [
      { url: '/assets/images/Group 5 (1).png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/images/Group 5 (1).png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
      { url: '/assets/images/Group 5 (1).png', sizes: '180x180' },
    ],
  },
  openGraph: {
    title: "Développeur d'applications mobiles iOS & Android · Nadir Ben Salah",
    description: 'Independent mobile app developer. Seven apps shipped to the App Store, designed and built end to end. React Native, TypeScript, iOS and Android.',
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
      name: "Nadir Ben Salah · Développeur d'applications mobiles",
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
      name: "Nadir Ben Salah · Développeur d'applications mobiles",
      url: siteUrl,
      description: 'Independent mobile app developer. Seven apps shipped to the App Store, designed and built end to end. React Native, TypeScript, iOS and Android.',
      areaServed: [{
        '@type': 'City',
        name: 'Amiens'
      }, {
        '@type': 'Country',
        name: 'France'
      }],
      serviceType: ['React Native Development', 'Mobile App Development', 'iOS App Development', 'Android App Development', 'Mobile Architecture', 'App Store Release', 'Google Play Release', 'Product Engineering', 'API Integration', 'Firebase', 'Supabase', 'PostgreSQL'],
      priceRange: '$$',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Nadir Ben Salah',
      url: siteUrl,
      jobTitle: "Développeur d'applications mobiles indépendant",
      knowsAbout: ['React Native', 'TypeScript', 'React', 'Mobile Architecture', 'iOS Development', 'Android Development', 'App Store Release', 'Google Play Release', 'Firebase', 'Supabase', 'PostgreSQL', 'API REST', 'SaaS', 'Product Engineering', 'Mobile Apps', 'AI-assisted development'],
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