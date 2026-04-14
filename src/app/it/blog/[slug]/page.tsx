import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import {
  MainLayout,
  SocialShare,
} from '@/components';
import { BlogPostIT } from '@/components/sections/blog-post-it';
import { RelatedPostsIT } from '@/components/sections/related-posts-it';
import { getBlogPostBySlug as getBlogPostBySlugIT, incrementViewCount } from '@/lib/blog-markdown-it';

interface BlogPostPageITProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageITProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlugIT(slug);

  if (!post) {
    return {
      title: 'Articolo Non Trovato | Blog CatalytIQ Systems',
      description: 'L\'articolo del blog richiesto non è stato trovato.',
    };
  }

  const seoMetadata = post.seo_metadata;

  return {
    title: seoMetadata?.meta_title || `${post.title} | Blog CatalytIQ Systems`,
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
      locale: 'it_IT',
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
      canonical: `/it/blog/${post.slug}`,
      languages: {
        'it-IT': `/it/blog/${post.slug}`,
        'en-US': `/blog/${post.slug}`, // Assuming English version exists
      },
    },
  };
}

export default async function BlogPostPageIT({ params }: BlogPostPageITProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlugIT(slug);

  if (!post) {
    notFound();
  }

  // Increment view count (fire and forget)
  incrementViewCount(post.id).catch(console.warn);

  const shareData = {
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://catalytiq.com'}/it/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    image: post.featured_image_url,
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Left: Article */}
          <article>
            <Suspense fallback={<BlogPostSkeleton />}>
              <BlogPostIT post={post} />
            </Suspense>

            <section className="py-8 border-t mt-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Condividi questo articolo</h3>
                  <p className="text-muted-foreground">
                    Aiuta altri a scoprire approfondimenti sull'automazione aziendale
                  </p>
                </div>
                <SocialShare data={shareData} />
              </div>
            </section>
          </article>

          {/* Right: Related Posts Sidebar */}
          <div className="lg:sticky lg:top-8">
            <Suspense fallback={<RelatedPostsSkeleton />}>
              <RelatedPostsIT
                currentPostId={post.id}
                categories={post.categories?.map(c => c.slug) || []}
                tags={post.tags?.map(t => t.slug) || []}
                variant="sidebar"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* JSON-LD structured data for SEO */}
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
              '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://catalytiq.com'}/it/blog/${post.slug}`,
            },
            articleSection: post.categories?.[0]?.name,
            keywords: post.tags?.map(t => t.name).join(', '),
            inLanguage: 'it-IT',
          }),
        }}
      />
    </MainLayout>
  );
}

// Loading skeletons
function BlogPostSkeleton() {
  return (
    <div className="py-8 animate-pulse">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center gap-2 mb-4">
          <div className="h-6 bg-muted rounded w-24" />
          <div className="h-6 bg-muted rounded w-32" />
        </div>
        <div className="h-12 bg-muted rounded mb-6" />
        <div className="h-6 bg-muted rounded w-3/4 mx-auto mb-8" />
        <div className="flex justify-center gap-6">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
      </div>

      {/* Featured image */}
      <div className="aspect-video bg-muted rounded-lg mb-12" />

      {/* Content */}
      <div className="space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" />
        ))}
      </div>
    </div>
  );
}

function RelatedPostsSkeleton() {
  return (
    <aside className="space-y-6 animate-pulse">
      <div className="h-6 bg-muted rounded w-36" />
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
    </aside>
  );
}

