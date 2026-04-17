import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import {
  MainLayout,
  BlogPost,
  RelatedPosts,
  SocialShare,
} from '@/components';
import { BlogToc } from '@/components/sections/blog-toc';
import { ReadingProgress } from '@/components/ui/reading-progress';
import { getBlogPostBySlug, incrementViewCount } from '@/lib/blog-markdown';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | CatalytIQ Systems Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const seoMetadata = post.seo_metadata;

  return {
    title: seoMetadata?.meta_title || `${post.title} | CatalytIQ Systems Blog`,
    description: seoMetadata?.meta_description || post.excerpt,
    keywords: seoMetadata?.keywords || [],
    authors: [{ name: post.author?.name || 'CatalytIQ Systems' }],
    openGraph: {
      title: seoMetadata?.og_title || post.title,
      description: seoMetadata?.og_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: [post.author?.name || 'CatalytIQ Systems'],
      images: seoMetadata?.og_image || post.featured_image_url ? [
        {
          url: seoMetadata?.og_image || post.featured_image_url!,
          alt: post.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoMetadata?.twitter_title || post.title,
      description: seoMetadata?.twitter_description || post.excerpt,
      images: seoMetadata?.twitter_image || post.featured_image_url ? [
        seoMetadata?.twitter_image || post.featured_image_url!
      ] : undefined,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  incrementViewCount(post.id).catch(console.warn);

  const shareData = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://catalytiq.com'}/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.featured_image_url,
  };

  return (
    <MainLayout>
      <ReadingProgress />

      {/* Full-bleed featured image hero */}
      {post.featured_image_url && (
        <div className="relative w-full aspect-[21/9] max-h-[480px] overflow-hidden">
          <Image
            src={post.featured_image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* Left: Article */}
          <article>
            <Suspense fallback={<BlogPostSkeleton />}>
              <BlogPost post={post} />
            </Suspense>

            <section className="py-8 border-t mt-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Share this article</h3>
                  <p className="text-sm text-muted-foreground">
                    Help others discover insights on business automation
                  </p>
                </div>
                <SocialShare data={shareData} />
              </div>
            </section>
          </article>

          {/* Right: TOC + Related Posts */}
          <aside className="lg:sticky lg:top-8 space-y-8">
            <Suspense fallback={null}>
              <BlogToc content={post.content} />
            </Suspense>

            <div className="border-t pt-8">
              <Suspense fallback={<RelatedPostsSkeleton />}>
                <RelatedPosts
                  currentPostId={post.id}
                  categories={post.categories?.map(c => c.slug) || []}
                  tags={post.tags?.map(t => t.slug) || []}
                  variant="sidebar"
                />
              </Suspense>
            </div>
          </aside>

        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.featured_image_url,
            author: {
              '@type': 'Person',
              name: post.author?.name || 'CatalytIQ Systems',
              url: post.author?.linkedin_url,
            },
            publisher: {
              '@type': 'Organization',
              name: 'CatalytIQ Systems',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://catalytiq.com'}/logo.png`,
              },
            },
            datePublished: post.published_at,
            dateModified: post.updated_at,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://catalytiq.com'}/blog/${post.slug}`,
            },
            articleSection: post.categories?.[0]?.name,
            keywords: post.tags?.map(t => t.name).join(', '),
          }),
        }}
      />
    </MainLayout>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      <div className="mb-8">
        <div className="h-9 bg-muted rounded w-28" />
      </div>
      <div className="mb-12">
        <div className="flex gap-2 mb-5">
          <div className="h-6 bg-muted rounded w-24" />
        </div>
        <div className="h-12 bg-muted rounded mb-5" />
        <div className="h-12 bg-muted rounded w-3/4 mb-8" />
        <div className="flex gap-5 border-y py-4">
          <div className="w-8 h-8 bg-muted rounded-full" />
          <div className="h-4 bg-muted rounded w-28" />
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-20" />
        </div>
      </div>
      <div className="space-y-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" style={{ width: `${75 + (i % 4) * 6}%` }} />
        ))}
      </div>
    </div>
  );
}

function RelatedPostsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-28" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-3 p-3">
          <div className="w-20 h-20 bg-muted rounded-md flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 bg-muted rounded mb-2" />
            <div className="h-4 bg-muted rounded w-3/4 mb-2" />
            <div className="flex gap-2">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
