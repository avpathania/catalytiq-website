"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCategories, getTags, getBlogPosts } from '@/lib/blog-api';
import { BLOG_CATEGORIES } from '@/lib/constants';
import type { Category, Tag, BlogPost } from '@/types/blog';

export function BlogSidebar() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSidebarData() {
      try {
        const [categoriesData, tagsData, recentPostsData, popularPostsData] = await Promise.all([
          getCategories(),
          getTags(),
          getBlogPosts({}, 1, 5), // Recent posts
          getBlogPosts({}, 1, 5), // Popular posts (we'll sort by view_count)
        ]);

        setCategories(categoriesData);
        setTags(tagsData.slice(0, 10)); // Limit to 10 tags
        setRecentPosts(recentPostsData.posts);
        
        // Sort by view count for popular posts
        const sortedByViews = [...popularPostsData.posts].sort((a, b) => b.view_count - a.view_count);
        setPopularPosts(sortedByViews.slice(0, 5));
      } catch (error) {
        console.error('Failed to load sidebar data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSidebarData();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (categorySlug: string) => {
    router.push(`/blog?category=${categorySlug}`);
  };

  const handleTagClick = (tagSlug: string) => {
    router.push(`/blog?tag=${tagSlug}`);
  };

  if (loading) {
    return <BlogSidebarSkeleton />;
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Articles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Button size="sm" onClick={handleSearch}>
              Go
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color || '#6B7280' }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  {/* You could add post count here if available */}
                </button>
              ))
            ) : (
              // Fallback to predefined categories
              BLOG_CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </button>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      {tags.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Popular Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleTagClick(tag.slug)}
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {post.featured_image_url ? (
                      <Image
                        src={post.featured_image_url}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-muted-foreground">
                          {post.title.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(post.published_at!).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Posts */}
      {popularPosts.length > 0 && popularPosts.some(post => post.view_count > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Popular Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularPosts
                .filter(post => post.view_count > 0)
                .map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex gap-3 group"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.view_count} views
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle>Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Get the latest automation insights delivered to your inbox.
          </p>
          <div className="space-y-2">
            <Input placeholder="Your email address" type="email" />
            <Button className="w-full" size="sm">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            No spam. Unsubscribe anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function BlogSidebarSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-32 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-10 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>

      {/* Categories skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-24 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-8 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tags skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-28 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-muted rounded w-16 animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent posts skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-28 animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-16 h-16 bg-muted rounded-lg animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded mb-1 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-20 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}