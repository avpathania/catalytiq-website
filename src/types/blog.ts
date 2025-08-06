// Blog-related type definitions for CatalytIQ website

export interface Author {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  author_id: string;
  reading_time: number;
  view_count: number;
  seo_metadata?: SEOMetadata;
  
  // Relations
  author?: Author;
  categories?: Category[];
  tags?: Tag[];
}

export interface SEOMetadata {
  meta_title?: string;
  meta_description?: string;
  keywords?: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

export interface BlogPostFilters {
  category?: string;
  tag?: string;
  author?: string;
  search?: string;
  featured?: boolean;
  published?: boolean;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string;
  published_at: string;
  reading_time: number;
  author?: Pick<Author, 'name' | 'avatar_url'>;
  categories?: Pick<Category, 'name' | 'slug' | 'color'>[];
}

export interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalCategories: number;
  totalTags: number;
  popularPosts: Pick<BlogPost, 'id' | 'title' | 'slug' | 'view_count'>[];
}

// Form types for blog management
export interface CreateBlogPostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  published_at?: string;
  author_id: string;
  category_ids: string[];
  tag_ids: string[];
  seo_metadata?: SEOMetadata;
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
  id: string;
}

// Social sharing types
export interface SocialShareData {
  url: string;
  title: string;
  description: string;
  image?: string;
}

export interface SharePlatform {
  name: string;
  icon: string;
  getShareUrl: (data: SocialShareData) => string;
  color: string;
}