// Markdown-based blog API for English content
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
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

const CONTENT_DIR = path.join(process.cwd(), 'content/blog/en');

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Strip a leading # H1 heading that duplicates the frontmatter title
function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^\s*#\s+[^\n]+\n?/, '');
}

// Add id attributes to h2/h3 headings so the TOC can link to them
function addHeadingIds(html: string): string {
  const counts: Record<string, number> = {};
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '');
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    counts[base] = (counts[base] || 0) + 1;
    const id = counts[base] > 1 ? `${base}-${counts[base]}` : base;
    return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
  });
}

// Convert markdown body to HTML
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return addHeadingIds(result.toString());
}

// Parse a single markdown file into a BlogPost
async function parsePost(filename: string): Promise<BlogPost> {
  const filePath = path.join(CONTENT_DIR, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const strippedContent = stripLeadingH1(content);
  const htmlContent = await markdownToHtml(strippedContent);

  const author: Author = {
    id: data.author?.email || 'default',
    name: data.author?.name || 'CatalytIQ Systems Team',
    email: data.author?.email || 'team@catalytiq.com',
    bio: data.author?.bio,
    avatar_url: data.author?.avatar_url,
    linkedin_url: data.author?.linkedin_url,
    created_at: data.published_at || new Date().toISOString(),
  };

  const categories: Category[] = (data.categories || []).map((cat: any) => ({
    id: cat.slug,
    name: cat.name,
    slug: cat.slug,
    color: cat.color,
    description: cat.description,
    created_at: data.published_at || new Date().toISOString(),
  }));

  const tags: Tag[] = (data.tags || []).map((tag: any) => ({
    id: tag.slug,
    name: tag.name,
    slug: tag.slug,
    created_at: data.published_at || new Date().toISOString(),
  }));

  const slug = data.slug || filename.replace(/\.md$/, '');
  const publishedAt = data.published_at
    ? new Date(data.published_at).toISOString()
    : new Date().toISOString();

  return {
    id: slug,
    title: data.title,
    slug,
    excerpt: data.excerpt || '',
    content: htmlContent,
    featured_image_url: data.featured_image_url || undefined,
    is_featured: data.is_featured ?? false,
    is_published: data.is_published ?? true,
    published_at: publishedAt,
    created_at: publishedAt,
    updated_at: publishedAt,
    author_id: author.id,
    reading_time: calculateReadingTime(strippedContent),
    view_count: 0,
    seo_metadata: data.seo
      ? {
          meta_title: data.seo.meta_title,
          meta_description: data.seo.meta_description,
          keywords: data.seo.keywords,
          og_title: data.seo.og_title,
          og_description: data.seo.og_description,
          og_image: data.seo.og_image,
          twitter_title: data.seo.twitter_title,
          twitter_description: data.seo.twitter_description,
          twitter_image: data.seo.twitter_image,
        }
      : undefined,
    author,
    categories,
    tags,
  };
}

// Load and cache all published posts sorted by date descending
async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const filenames = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md'));

  const posts = await Promise.all(filenames.map(parsePost));

  return posts
    .filter((p) => p.is_published)
    .sort(
      (a, b) =>
        new Date(b.published_at!).getTime() - new Date(a.published_at!).getTime()
    );
}

export async function getBlogPosts(
  filters: BlogPostFilters = {},
  page: number = 1,
  limit: number = BLOG_CONFIG.POSTS_PER_PAGE
): Promise<BlogPostsResponse> {
  let posts = await getAllPosts();

  if (filters.category) {
    posts = posts.filter((p) =>
      p.categories?.some((c) => c.slug === filters.category)
    );
  }

  if (filters.tag) {
    posts = posts.filter((p) =>
      p.tags?.some((t) => t.slug === filters.tag)
    );
  }

  if (filters.search) {
    const term = filters.search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    );
  }

  if (filters.featured !== undefined) {
    posts = posts.filter((p) => p.is_featured === filters.featured);
  }

  const total = posts.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  return {
    posts: posts.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getFeaturedPosts(
  limit: number = BLOG_CONFIG.FEATURED_POSTS_COUNT
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.is_featured).slice(0, limit);
}

export async function getRelatedPosts(
  postId: string,
  categories: string[],
  tags: string[],
  limit: number = BLOG_CONFIG.RELATED_POSTS_COUNT
): Promise<RelatedPost[]> {
  const posts = await getAllPosts();

  const scored = posts
    .filter((p) => p.id !== postId)
    .map((p) => {
      let score = 0;
      score += (p.categories?.filter((c) => categories.includes(c.slug)).length || 0) * 2;
      score += p.tags?.filter((t) => tags.includes(t.slug)).length || 0;
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    featured_image_url: p.featured_image_url,
    published_at: p.published_at!,
    reading_time: p.reading_time,
    author: p.author
      ? { name: p.author.name, avatar_url: p.author.avatar_url }
      : undefined,
    categories: p.categories?.map((c) => ({
      name: c.name,
      slug: c.slug,
      color: c.color,
    })),
  }));
}

export async function getCategories(): Promise<Category[]> {
  const posts = await getAllPosts();
  const seen = new Map<string, Category>();
  for (const post of posts) {
    for (const cat of post.categories || []) {
      if (!seen.has(cat.slug)) seen.set(cat.slug, cat);
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getTags(): Promise<Tag[]> {
  const posts = await getAllPosts();
  const seen = new Map<string, Tag>();
  for (const post of posts) {
    for (const tag of post.tags || []) {
      if (!seen.has(tag.slug)) seen.set(tag.slug, tag);
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAuthors(): Promise<Author[]> {
  const posts = await getAllPosts();
  const seen = new Map<string, Author>();
  for (const post of posts) {
    if (post.author && !seen.has(post.author.id)) {
      seen.set(post.author.id, post.author);
    }
  }
  return Array.from(seen.values());
}

export async function searchBlogPosts(
  query: string,
  limit: number = 10
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const term = query.toLowerCase();
  return posts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    )
    .slice(0, limit);
}

// No-op: view count tracking not supported in markdown mode
export async function incrementViewCount(_postId: string): Promise<void> {}
