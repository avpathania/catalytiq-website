"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getBlogPosts, getCategories } from '@/lib/blog-api';
import { BLOG_CONFIG } from '@/lib/constants';
import type { BlogPost, Category, BlogPostsResponse } from '@/types/blog';

interface BlogGridProps {
  page?: number;
  category?: string;
  tag?: string;
  search?: string;
}

export function BlogGrid({ page = 1, category, tag, search }: BlogGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blogData, setBlogData] = useState<BlogPostsResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(search || '');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postsResponse, categoriesData] = await Promise.all([
          getBlogPosts(
            { category, tag, search },
            page,
            BLOG_CONFIG.POSTS_PER_PAGE
          ),
          getCategories(),
        ]);
        setBlogData(postsResponse);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to load blog data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [page, category, tag, search]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handleCategoryFilter = (categorySlug: string) => {
    const params = new URLSearchParams(searchParams);
    if (categorySlug && categorySlug !== 'all') {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to first page
    router.push(`/blog?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    router.push(`/blog?${params.toString()}`);
  };

  if (loading) {
    return <BlogGridSkeleton />;
  }

  if (!blogData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load blog posts.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            className="w-full"
          />
        </div>
        <div className="sm:w-48">
          <Select value={category || 'all'} onValueChange={handleCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {blogData.total > 0 ? (
            <>
              Showing {((page - 1) * BLOG_CONFIG.POSTS_PER_PAGE) + 1} to{' '}
              {Math.min(page * BLOG_CONFIG.POSTS_PER_PAGE, blogData.total)} of{' '}
              {blogData.total} articles
            </>
          ) : (
            'No articles found'
          )}
        </p>
        {(category || tag || search) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/blog')}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Blog Posts Grid */}
      {blogData.posts.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogData.posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {blogData.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: blogData.totalPages }, (_, i) => i + 1)
                  .filter((pageNum) => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      pageNum === 1 ||
                      pageNum === blogData.totalPages ||
                      Math.abs(pageNum - page) <= 1
                    );
                  })
                  .map((pageNum, index, array) => {
                    // Add ellipsis if there's a gap
                    const showEllipsis = index > 0 && pageNum - array[index - 1] > 1;
                    
                    return (
                      <div key={pageNum} className="flex items-center">
                        {showEllipsis && <span className="px-2 text-muted-foreground">...</span>}
                        <Button
                          variant={pageNum === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      </div>
                    );
                  })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= blogData.totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No articles found matching your criteria.
          </p>
          <Button onClick={() => router.push('/blog')}>
            View all articles
          </Button>
        </div>
      )}
    </div>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors group">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video">
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-muted-foreground">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
          {post.is_featured && (
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories?.slice(0, 2).map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                style={{ borderColor: category.color }}
              >
                {category.name}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.published_at!).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.reading_time} min</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

function BlogGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filters skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
        <div className="sm:w-48 h-10 bg-muted rounded animate-pulse" />
      </div>

      {/* Results info skeleton */}
      <div className="h-4 bg-muted rounded w-64 animate-pulse" />

      {/* Grid skeleton */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-video bg-muted rounded-lg mb-4" />
            <div className="p-6">
              <div className="flex gap-2 mb-3">
                <div className="h-5 bg-muted rounded w-16" />
                <div className="h-5 bg-muted rounded w-20" />
              </div>
              <div className="h-6 bg-muted rounded mb-3" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-4 bg-muted rounded w-3/4 mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-20" />
                <div className="h-4 bg-muted rounded w-24" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}