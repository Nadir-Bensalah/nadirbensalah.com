import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPosts, findBlogPost } from '@/content/blogPosts';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, type: 'article', url: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = findBlogPost(slug);
  if (!post) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: 'Nadir Ben Salah' },
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="relative pt-36 pb-24 md:pt-44 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.16) 45%, transparent 72%)' }} />
        <div className="noise-bg absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Link href="/blog" className="text-sm font-700 text-indigo-400 hover:text-indigo-300">← Blog</Link>
          <div className="flex flex-wrap gap-2 mt-8 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-indigo-500/[0.08] text-indigo-300 text-xs font-700 uppercase">{post.intent}</span>
            <span className="px-3 py-1.5 rounded-full bg-white/[0.04] text-[#A1A1AA] text-xs font-700">{post.keyword}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-800 text-white tracking-tight leading-[1.06]">{post.title}</h1>
          <p className="text-lg text-[#A1A1AA] leading-relaxed mt-7">{post.description}</p>
          <div className="mt-12 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading} className="glass-card rounded-3xl p-7 md:p-9">
                <h2 className="text-2xl md:text-3xl font-800 text-white tracking-tight mb-5">{section.heading}</h2>
                <div className="space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-[#A1A1AA] text-lg leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-14 rounded-3xl p-8 md:p-10 border border-indigo-500/20 bg-indigo-500/[0.06] text-center">
            <h2 className="text-3xl font-800 text-white tracking-tight">Vous avez un projet concret ?</h2>
            <p className="text-[#A1A1AA] leading-relaxed mt-4 mb-7">Je peux vous aider à cadrer le périmètre, estimer le budget et définir la meilleure première version.</p>
            <Link href="/#contact" className="btn-primary px-7 py-3.5 rounded-full text-base font-700 inline-block">Demander un audit →</Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
