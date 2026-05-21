import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoLandingPage from '@/components/SeoLandingPage';
import { englishPricePages, findEnglishSeoPage } from '@/content/englishSeoPages';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return englishPricePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findEnglishSeoPage(englishPricePages, slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.path, languages: page.alternatePaths },
    openGraph: { title: page.title, description: page.description, type: 'website', url: page.path, locale: 'en_US' },
  };
}

export default async function EnglishPricePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findEnglishSeoPage(englishPricePages, slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} basePath="/en/pricing" />;
}
