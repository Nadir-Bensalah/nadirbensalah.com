import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/SeoLandingPage';
import { findLocalizedPage, locationPages } from '@/content/seoPages';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locationPages
    .filter((page) => page.market === 'fr-fr')
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findLocalizedPage('fr-fr', slug);

  if (!page) return {};

  return {
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
      locale: 'fr_FR',
    },
  };
}

export default async function FranceFrenchPage({ params }: PageProps) {
  const { slug } = await params;
  const page = findLocalizedPage('fr-fr', slug);

  if (!page) notFound();

  return <SeoLandingPage page={page} basePath="/fr-fr" />;
}
