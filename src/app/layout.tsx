import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
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

/**
 * Inter, servie depuis le site et non depuis Google Fonts.
 *
 * Chargee depuis fonts.googleapis.com, elle coutait deux connexions a deux
 * domaines tiers AVANT qu'un seul caractere ne s'affiche : la feuille de
 * style bloque le rendu, puis elle declenche une seconde requete vers
 * fonts.gstatic.com. C'est ce qui placait le plus grand element de chaque
 * page entre 3,2 et 4,4 secondes, alors que cet element est du TEXTE.
 *
 * Inter est desormais une police variable : un seul fichier couvre les
 * graisses 400 a 700, d'ou deux fichiers seulement (latin et latin etendu)
 * au lieu de huit. Verifie par empreinte : les quatre graisses telechargees
 * separement etaient rigoureusement le meme fichier.
 *
 * Effet de bord utile : plus aucune requete du visiteur vers Google, et
 * fonts.gstatic.com peut sortir de la politique de securite.
 */
const inter = localFont({
  src: [
    { path: '../polices/Inter-latin.woff2', weight: '100 900', style: 'normal' },
    { path: '../polices/Inter-latin-ext.woff2', weight: '100 900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--police-inter',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica', 'Arial'],
});

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
  // Le fichier d'origine pesait 205 ko pour 692x692 px, et il etait declare
  // deux fois : le navigateur le telechargeait donc deux fois, sur chaque
  // page, pour afficher un carre de 32 px dans un onglet.
  icons: {
    // Seulement les deux tailles d'onglet : declarer un 192x192 en « icon »
    // pousse certains navigateurs a telecharger 26 ko pour rien. Le 192 est
    // l'icone d'ecran d'accueil Android, son usage passe par le manifeste.
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/assets/images/icone-32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/assets/images/icone-180.png', sizes: '180x180' }],
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
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
