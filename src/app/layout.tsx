import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { profil } from '@/content/profil';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nadirbensalah.com').replace(
  /\/$/,
  ''
);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#191919' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Nadir Ben Salah · Développeur mobile & full-stack à Amiens',
    template: '%s · Nadir Ben Salah',
  },
  description:
    'Développeur mobile et full-stack à Amiens. React Native, TypeScript, iOS et Android, de la conception à la publication sur les stores.',
  applicationName: profil.nom,
  authors: [{ name: profil.nom, url: siteUrl }],
  creator: profil.nom,
  publisher: profil.nom,
  formatDetection: { telephone: true, email: true, address: false },
  icons: {
    icon: [{ url: '/assets/images/Group 5 (1).png', type: 'image/png' }],
    apple: [{ url: '/assets/images/Group 5 (1).png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: profil.nom,
    url: siteUrl,
    images: [{ url: '/assets/images/og.png', width: 1200, height: 630, alt: profil.nom }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nadir Ben Salah · Développeur mobile & full-stack',
    description: 'Applications iOS et Android conçues, développées et publiées de bout en bout.',
    images: ['/assets/images/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
