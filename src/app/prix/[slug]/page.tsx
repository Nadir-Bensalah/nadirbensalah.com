import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/SeoLandingPage';
import { findSeoPage, pricePages } from '@/content/seoPages';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return pricePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findSeoPage(pricePages, slug);

  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/prix/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'website',
      url: `/prix/${page.slug}`,
    },
  };
}

export default async function PricePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findSeoPage(pricePages, slug);

  if (!page) notFound();

  return <SeoLandingPage page={page} basePath="/prix" />;
}
