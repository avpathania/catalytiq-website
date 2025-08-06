"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedPosts } from '@/lib/blog-api';
import { BLOG_CONFIG } from '@/lib/constants';
import type { BlogPost } from '@/types/blog';

export function BlogHero() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const posts = await getFeaturedPosts(BLOG_CONFIG.FEATURED_POSTS_COUNT);
        setFeaturedPosts(posts);
      } catch (error) {
        console.error('Failed to load featured posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedPosts();
  }, []);

  if (loading) {
    return <BlogHeroSkeleton />;
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  const [mainPost, ...otherPosts] = featuredPosts;

  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Featured Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our latest insights on business automation and digital transformation
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main Featured Post */}
          {mainPost && (
            <Card className="lg:row-span-2 overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors">
              <Link href={`/blog/${mainPost.slug}`}>
                <div className="relative aspect-video">
                  {mainPost.featured_image_url ? (
                    <Image
                      src={mainPost.featured_image_url}
                      alt={mainPost.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {mainPost.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      Featured
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {mainPost.categories?.slice(0, 2).map((category) => (
                      <Badge
                        key={category.id}
                        variant="outline"
                        style={{ borderColor: category.color }}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                    {mainPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {mainPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{mainPost.author?.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(mainPost.published_at!).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{mainPost.reading_time} min read</span>
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )}

          {/* Other Featured Posts */}
          <div className="space-y-6">
            {otherPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex gap-4 p-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      {post.featured_image_url ? (
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-muted-foreground">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {post.categories?.slice(0, 1).map((category) => (
                          <Badge
                            key={category.id}
                            variant="outline"
                            className="text-xs"
                            style={{ borderColor: category.color }}
                          >
                            {category.name}
                          </Badge>
                        ))}
                      </div>
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{post.author?.name}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.published_at!).toLocaleDateString()}
                        </span>
                        <span>•</span>
                        <span>{post.reading_time} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogHeroSkeleton() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-muted rounded w-96 mx-auto" />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Main skeleton */}
          <div className="lg:row-span-2 animate-pulse">
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

          {/* Other skeletons */}
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4 p-6">
                  <div className="w-24 h-24 bg-muted rounded-lg" />
                  <div className="flex-1">
                    <div className="h-4 bg-muted rounded w-16 mb-2" />
                    <div className="h-5 bg-muted rounded mb-2" />
                    <div className="h-3 bg-muted rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}