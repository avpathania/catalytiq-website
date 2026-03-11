// Client-safe blog API for Italian content — calls /api/blog/it route handler
import { BLOG_CONFIG } from './constants';
import type {
  BlogPost,
  BlogPostFilters,
  BlogPostsResponse,
  RelatedPost,
  Category,
  Tag,
  Author,
} from '@/types/blog';

const BASE = '/api/blog/it';

function buildUrl(action: string, params: Record<string, string | number | boolean | undefined> = {}) {
  const url = new URL(BASE, typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  url.searchParams.set('action', action);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Blog IT API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getBlogPosts(
  filters: BlogPostFilters = {},
  page: number = 1,
  limit: number = BLOG_CONFIG.POSTS_PER_PAGE
): Promise<BlogPostsResponse> {
  const url = buildUrl('posts', {
    page,
    limit,
    category: filters.category,
    tag: filters.tag,
    search: filters.search,
    featured: filters.featured,
  });
  return apiFetch<BlogPostsResponse>(url);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = buildUrl('post', { slug });
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blog IT API error: ${res.status}`);
  return res.json() as Promise<BlogPost>;
}

export async function getFeaturedPosts(
  limit: number = BLOG_CONFIG.FEATURED_POSTS_COUNT
): Promise<BlogPost[]> {
  const url = buildUrl('featured', { limit });
  return apiFetch<BlogPost[]>(url);
}

export async function getRelatedPosts(
  postId: string,
  categories: string[],
  tags: string[],
  limit: number = BLOG_CONFIG.RELATED_POSTS_COUNT
): Promise<RelatedPost[]> {
  const url = buildUrl('related', {
    postId,
    categories: categories.join(','),
    tags: tags.join(','),
    limit,
  });
  return apiFetch<RelatedPost[]>(url);
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>(buildUrl('categories'));
}

export async function getTags(): Promise<Tag[]> {
  return apiFetch<Tag[]>(buildUrl('tags'));
}

export async function getAuthors(): Promise<Author[]> {
  return [];
}

export async function searchBlogPosts(query: string, limit: number = 10): Promise<BlogPost[]> {
  const url = buildUrl('posts', { search: query, limit });
  const data = await apiFetch<BlogPostsResponse>(url);
  return data.posts;
}

// No-op: view count tracking not supported in markdown mode
export async function incrementViewCount(_postId: string): Promise<void> {}
