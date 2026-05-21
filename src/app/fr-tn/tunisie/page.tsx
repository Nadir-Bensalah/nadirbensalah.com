import React from 'react';
import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';
import { findLocalizedPage } from '@/content/seoPages';

const page = findLocalizedPage('fr-tn', 'tunisie');

export const metadata: Metadata = page
  ? {
      title: page.title,
      description: page.description,
      alternates: {
        canonical: page.path,
        languages: page.alternatePaths,
      },
      openGraph: {
        title: page.title,
        description: page.description,
        type: 'website',
        url: page.path,
        locale: 'fr_TN',
      },
    }
  : {};

export default function TunisiaFrenchPage() {
  if (!page) return null;

  return <SeoLandingPage page={page} basePath="/fr-tn" />;
}
