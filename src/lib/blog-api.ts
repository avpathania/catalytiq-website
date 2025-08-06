import { supabase, handleSupabaseError, calculateReadingTime } from './supabase';
import type { 
  BlogPost, 
  BlogPostFilters, 
  BlogPostsResponse, 
  RelatedPost, 
  Category, 
  Tag, 
  Author,
  CreateBlogPostData,
  UpdateBlogPostData 
} from '@/types/blog';

// Fetch all blog posts with optional filtering and pagination
export async function getBlogPosts(
  filters: BlogPostFilters = {},
  page: number = 1,
  limit: number = 10
): Promise<BlogPostsResponse> {
  try {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    // Apply filters
    if (filters.category) {
      query = query.contains('categories', [{ slug: filters.category }]);
    }
    
    if (filters.tag) {
      query = query.contains('tags', [{ slug: filters.tag }]);
    }
    
    if (filters.author) {
      query = query.eq('author.slug', filters.author);
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }
    
    if (filters.featured !== undefined) {
      query = query.eq('is_featured', filters.featured);
    }

    // Get total count for pagination
    const { count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true);

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error } = await query;

    if (error) handleSupabaseError(error);

    const posts = data?.map(transformBlogPost) || [];
    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      posts,
      total,
      page,
      limit,
      totalPages,
    };
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      handleSupabaseError(error);
    }

    return data ? transformBlogPost(data) : null;
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch featured blog posts
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .eq('is_published', true)
      .eq('is_featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) handleSupabaseError(error);

    return data?.map(transformBlogPost) || [];
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch related posts based on categories and tags
export async function getRelatedPosts(
  postId: string,
  categories: string[],
  tags: string[],
  limit: number = 3
): Promise<RelatedPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        featured_image_url,
        published_at,
        reading_time,
        author:authors(name, avatar_url),
        categories:post_categories(category:categories(name, slug, color))
      `)
      .eq('is_published', true)
      .neq('id', postId)
      .order('published_at', { ascending: false })
      .limit(limit * 2); // Get more to filter by relevance

    if (error) handleSupabaseError(error);

    // Score posts by relevance (shared categories/tags)
    const scoredPosts = data?.map(post => {
      let score = 0;
      const postCategories = post.categories?.map((pc: any) => pc.category.slug) || [];
      const postTags = []; // We'll need to fetch tags separately if needed
      
      // Score based on shared categories
      score += categories.filter(cat => postCategories.includes(cat)).length * 2;
      
      return { ...post, relevanceScore: score };
    }) || [];

    // Sort by relevance score and take top results
    return scoredPosts
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featured_image_url: post.featured_image_url || undefined,
        published_at: post.published_at || '',
        reading_time: post.reading_time,
        author: {
          ...post.author,
          avatar_url: post.author?.avatar_url || undefined,
        },
        categories: post.categories?.map((pc: any) => pc.category) || [],
      }));
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) handleSupabaseError(error);

    return data?.map(category => ({
      ...category,
      description: category.description || undefined,
      color: category.color || undefined,
    })) || [];
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch all tags
export async function getTags(): Promise<Tag[]> {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name');

    if (error) handleSupabaseError(error);

    return data || [];
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const { data, error } = await supabase
      .from('authors')
      .select('*')
      .order('name');

    if (error) handleSupabaseError(error);

    return data?.map(author => ({
      ...author,
      bio: author.bio || undefined,
      avatar_url: author.avatar_url || undefined,
      linkedin_url: author.linkedin_url || undefined,
    })) || [];
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Increment view count for a blog post
export async function incrementViewCount(postId: string): Promise<void> {
  try {
    // Get current view count and increment
    const { data: currentPost } = await supabase
      .from('blog_posts')
      .select('view_count')
      .eq('id', postId)
      .single();

    if (currentPost) {
      const { error } = await supabase
        .from('blog_posts')
        .update({ view_count: (currentPost.view_count || 0) + 1 })
        .eq('id', postId);

      if (error) handleSupabaseError(error);
    }
  } catch (error) {
    // Don't throw error for view count increment failures
    console.warn('Failed to increment view count:', error);
  }
}

// Search blog posts
export async function searchBlogPosts(
  query: string,
  limit: number = 10
): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .eq('is_published', true)
      .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) handleSupabaseError(error);

    return data?.map(transformBlogPost) || [];
  } catch (error) {
    handleSupabaseError(error);
  }
}

// Transform raw Supabase data to BlogPost type
function transformBlogPost(data: any): BlogPost {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    featured_image_url: data.featured_image_url,
    is_featured: data.is_featured,
    is_published: data.is_published,
    published_at: data.published_at,
    created_at: data.created_at,
    updated_at: data.updated_at,
    author_id: data.author_id,
    reading_time: data.reading_time,
    view_count: data.view_count,
    seo_metadata: data.seo_metadata,
    author: data.author,
    categories: data.categories?.map((pc: any) => pc.category) || [],
    tags: data.tags?.map((pt: any) => pt.tag) || [],
  };
}

// Admin functions (for content management)
export async function createBlogPost(data: CreateBlogPostData): Promise<BlogPost> {
  try {
    const readingTime = calculateReadingTime(data.content);
    
    // Remove fields that don't belong in the insert
    const { category_ids, tag_ids, ...insertData } = data;
    
    const { data: post, error } = await supabase
      .from('blog_posts')
      .insert({
        ...insertData,
        reading_time: readingTime,
        view_count: 0,
        seo_metadata: data.seo_metadata as any,
      })
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .single();

    if (error) handleSupabaseError(error);

    // Insert category relationships
    if (data.category_ids.length > 0) {
      const categoryRelations = data.category_ids.map(categoryId => ({
        post_id: post.id,
        category_id: categoryId,
      }));

      const { error: categoryError } = await supabase
        .from('post_categories')
        .insert(categoryRelations);

      if (categoryError) handleSupabaseError(categoryError);
    }

    // Insert tag relationships
    if (data.tag_ids.length > 0) {
      const tagRelations = data.tag_ids.map(tagId => ({
        post_id: post.id,
        tag_id: tagId,
      }));

      const { error: tagError } = await supabase
        .from('post_tags')
        .insert(tagRelations);

      if (tagError) handleSupabaseError(tagError);
    }

    return transformBlogPost(post);
  } catch (error) {
    handleSupabaseError(error);
  }
}

export async function updateBlogPost(data: UpdateBlogPostData): Promise<BlogPost> {
  try {
    const updateData: any = { ...data };
    delete updateData.id;
    delete updateData.category_ids;
    delete updateData.tag_ids;

    if (data.content) {
      updateData.reading_time = calculateReadingTime(data.content);
    }

    const { data: post, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', data.id)
      .select(`
        *,
        author:authors(*),
        categories:post_categories(category:categories(*)),
        tags:post_tags(tag:tags(*))
      `)
      .single();

    if (error) handleSupabaseError(error);

    return transformBlogPost(post);
  } catch (error) {
    handleSupabaseError(error);
  }
}