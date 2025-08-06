"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFeaturedPosts } from '@/lib/blog-api';
import type { BlogPost } from '@/types/blog';

export function FeaturedBlog() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedPosts() {
      try {
        const posts = await getFeaturedPosts(3);
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
    return <FeaturedBlogSkeleton />;
  }

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Stay ahead with our latest thoughts on business automation, AI implementation, 
            and digital transformation strategies.
          </p>
          <Button variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <FeaturedPostCard key={post.id} post={post} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPostCard({ post, featured }: { post: BlogPost; featured?: boolean }) {
  return (
    <Card className={`overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors group ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      <Link href={`/blog/${post.slug}`}>
        <div className={`relative ${featured ? 'aspect-video' : 'aspect-video'}`}>
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className={`${featured ? 'text-4xl' : 'text-3xl'} font-bold text-muted-foreground`}>
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
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors`}>
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

function FeaturedBlogSkeleton() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-muted rounded w-96 mx-auto mb-8 animate-pulse" />
          <div className="h-10 bg-muted rounded w-32 mx-auto animate-pulse" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
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
    </section>
  );
}