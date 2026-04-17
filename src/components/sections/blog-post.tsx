"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { BlogPost as BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="py-8">
      {/* Back to Blog */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="-ml-3">
          <Link href="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Article Header — left aligned */}
      <header className="mb-12">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {post.categories.map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                style={{ borderColor: category.color }}
              >
                <Link href={`/blog?category=${category.slug}`}>
                  {category.name}
                </Link>
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
          {post.excerpt}
        </p>

        {/* Meta — author avatar + name, date, reading time */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground border-y py-4">
          {/* Author */}
          <div className="flex items-center gap-2.5">
            {post.author?.avatar_url ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border">
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-border">
                <span className="text-xs font-bold text-primary">
                  {post.author?.name?.charAt(0) ?? '?'}
                </span>
              </div>
            )}
            <span className="font-medium text-foreground">{post.author?.name}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(post.published_at!).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{post.reading_time} min read</span>
          </div>

          {post.view_count > 0 && (
            <span>{post.view_count.toLocaleString()} views</span>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="blog-content"
        />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                <Link href={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Author Bio */}
      {post.author && (
        <div className="mt-12 pt-8 border-t">
          <div className="flex gap-5 items-start">
            {post.author.avatar_url ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-border">
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 ring-2 ring-border">
                <span className="text-xl font-bold text-primary">
                  {post.author.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Written by
              </p>
              <h3 className="text-lg font-semibold mb-1">{post.author.name}</h3>
              {post.author.bio && (
                <p className="text-muted-foreground text-sm mb-3">{post.author.bio}</p>
              )}
              {post.author.linkedin_url && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={post.author.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Connect on LinkedIn
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const blogContentStyles = `
  .blog-content {
    line-height: 1.8;
  }

  .blog-content h2 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1.875rem;
    font-weight: 700;
    line-height: 1.2;
    scroll-margin-top: 5rem;
  }

  .blog-content h3 {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.3;
    scroll-margin-top: 5rem;
  }

  .blog-content h4 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    scroll-margin-top: 5rem;
  }

  .blog-content p {
    margin-bottom: 1.5rem;
  }

  .blog-content ul, .blog-content ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  .blog-content li {
    margin-bottom: 0.5rem;
  }

  .blog-content blockquote {
    margin: 2rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid hsl(var(--primary));
    background: hsl(var(--muted));
    border-radius: 0.5rem;
    font-style: italic;
  }

  .blog-content code {
    background: hsl(var(--muted));
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .blog-content pre {
    background: hsl(var(--muted));
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .blog-content pre code {
    background: none;
    padding: 0;
  }

  .blog-content img {
    border-radius: 0.5rem;
    margin: 2rem 0;
  }

  .blog-content a {
    color: hsl(var(--primary));
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .blog-content a:hover {
    text-decoration: none;
  }
`;
