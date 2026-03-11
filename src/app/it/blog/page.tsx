import { Metadata } from 'next';
import { Suspense } from 'react';
import {
  MainLayout,
  PageHeader,
} from '@/components';
import { BlogHeroIT } from '@/components/sections/blog-hero-it';
import { BlogGridIT } from '@/components/sections/blog-grid-it';
import { BlogSidebarIT } from '@/components/sections/blog-sidebar-it';

export const metadata: Metadata = {
  title: 'Blog | CatalytIQ Systems - Approfondimenti sull\'Automazione Aziendale',
  description: 'Scopri gli ultimi approfondimenti sull\'automazione aziendale, implementazione AI e strategie di trasformazione digitale per PMI.',
  keywords: ['blog automazione aziendale', 'approfondimenti AI', 'trasformazione digitale', 'automazione PMI', 'ottimizzazione workflow'],
  openGraph: {
    title: 'Blog | CatalytIQ Systems - Approfondimenti sull\'Automazione Aziendale',
    description: 'Scopri gli ultimi approfondimenti sull\'automazione aziendale, implementazione AI e strategie di trasformazione digitale per PMI.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
    search?: string;
  }>;
}

export default async function BlogPageIT({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const category = params.category;
  const tag = params.tag;
  const search = params.search;

  return (
    <MainLayout>
      <PageHeader
        title="Blog"
        subtitle="Approfondimenti, strategie e storie di successo per aiutarti a trasformare la tua azienda con l'automazione intelligente."
        breadcrumb="Home / Blog"
      />
      
      <Suspense fallback={<BlogHeroSkeleton />}>
        <BlogHeroIT />
      </Suspense>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Suspense fallback={<BlogGridSkeleton />}>
                <BlogGridIT
                  page={page}
                  category={category}
                  tag={tag}
                  search={search}
                />
              </Suspense>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<BlogSidebarSkeleton />}>
                <BlogSidebarIT />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

// Loading skeletons
function BlogHeroSkeleton() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video bg-muted rounded-lg mb-4" />
          <div className="h-4 bg-muted rounded mb-2" />
          <div className="h-4 bg-muted rounded w-3/4 mb-2" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

function BlogSidebarSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="animate-pulse">
        <div className="h-10 bg-muted rounded" />
      </div>
      
      {/* Categories */}
      <div className="animate-pulse">
        <div className="h-6 bg-muted rounded mb-4 w-1/2" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-muted rounded" />
          ))}
        </div>
      </div>
      
      {/* Recent Posts */}
      <div className="animate-pulse">
        <div className="h-6 bg-muted rounded mb-4 w-1/2" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 bg-muted rounded" />
              <div className="flex-1">
                <div className="h-3 bg-muted rounded mb-1" />
                <div className="h-3 bg-muted rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}