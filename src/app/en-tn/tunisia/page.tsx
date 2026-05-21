import React from 'react';
import type { Metadata } from 'next';
import SeoLandingPage from '@/components/SeoLandingPage';
import { findLocalizedPage } from '@/content/seoPages';

const page = findLocalizedPage('en-tn', 'tunisia');

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
        locale: 'en_TN',
      },
    }
  : {};

export default function TunisiaEnglishPage() {
  if (!page) return null;

  return <SeoLandingPage page={page} basePath="/en-tn" />;
}
