import { NextRequest, NextResponse } from 'next/server';
import {
  getBlogPosts,
  getBlogPostBySlug,
  getFeaturedPosts,
  getRelatedPosts,
  getCategories,
  getTags,
} from '@/lib/blog-markdown-it';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'posts': {
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = searchParams.get('limit')
          ? parseInt(searchParams.get('limit')!, 10)
          : undefined;
        const filters = {
          category: searchParams.get('category') || undefined,
          tag: searchParams.get('tag') || undefined,
          search: searchParams.get('search') || undefined,
          featured: searchParams.get('featured') != null
            ? searchParams.get('featured') === 'true'
            : undefined,
        };
        const data = await getBlogPosts(filters, page, limit);
        return NextResponse.json(data);
      }

      case 'post': {
        const slug = searchParams.get('slug');
        if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });
        const post = await getBlogPostBySlug(slug);
        if (!post) return NextResponse.json(null, { status: 404 });
        return NextResponse.json(post);
      }

      case 'featured': {
        const limit = searchParams.get('limit')
          ? parseInt(searchParams.get('limit')!, 10)
          : undefined;
        const posts = await getFeaturedPosts(limit);
        return NextResponse.json(posts);
      }

      case 'related': {
        const postId = searchParams.get('postId') || '';
        const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
        const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
        const limit = searchParams.get('limit')
          ? parseInt(searchParams.get('limit')!, 10)
          : undefined;
        const posts = await getRelatedPosts(postId, categories, tags, limit);
        return NextResponse.json(posts);
      }

      case 'categories': {
        const data = await getCategories();
        return NextResponse.json(data);
      }

      case 'tags': {
        const data = await getTags();
        return NextResponse.json(data);
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('[api/blog/it] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
