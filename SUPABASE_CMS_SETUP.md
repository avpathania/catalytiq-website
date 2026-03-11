# Supabase CMS Implementation Guide

## Overview

Your CatalytIQ website now has a fully functional Supabase CMS for blog content management. This guide will help you set up and start using the dynamic blog system.

## What's Been Implemented

✅ **Supabase Client Configuration** - [`src/lib/supabase.ts`](src/lib/supabase.ts)  
✅ **Complete Database Types** - [`src/types/supabase.ts`](src/types/supabase.ts)  
✅ **Dynamic English Blog API** - [`src/lib/blog-api.ts`](src/lib/blog-api.ts)  
✅ **Dynamic Italian Blog API** - [`src/lib/blog-api-it.ts`](src/lib/blog-api-it.ts)  
✅ **Environment Variables Template** - [`.env.local.example`](.env.local.example)  

## Setup Instructions

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the API settings

### 2. Clean Up Existing Database (If Needed)

If you have an existing Supabase project with different database structure, you may need to clean it up first.

**⚠️ IMPORTANT: Backup Your Data First!**
Before proceeding, consider backing up any important data:
1. Go to your Supabase dashboard → Database → Backups
2. Create a manual backup or export important tables
3. Alternatively, use `pg_dump` to export specific data you want to keep

**⚠️ WARNING: The following commands will delete all existing blog-related data!**

**Option A: If you're unsure what tables exist, run this safe cleanup:**

```sql
-- Safe cleanup - only drops tables if they exist (no errors if they don't)
DO $$
BEGIN
    -- Drop tables in correct order to handle foreign keys
    DROP TABLE IF EXISTS post_tags CASCADE;
    DROP TABLE IF EXISTS post_categories CASCADE;
    DROP TABLE IF EXISTS blog_posts CASCADE;
    DROP TABLE IF EXISTS tags CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    DROP TABLE IF EXISTS authors CASCADE;
    
    -- Drop functions if they exist
    DROP FUNCTION IF EXISTS increment_view_count(UUID);
    DROP FUNCTION IF EXISTS update_updated_at_column();
    
    RAISE NOTICE 'Cleanup completed successfully';
END $$;
```

**Option B: If you have a fresh database or no blog tables, skip the cleanup and go directly to Step 3.**

**Note:** If you get errors like "relation does not exist", that's normal - it means those tables weren't there to begin with. You can safely proceed to the next step.

### 3. Set Up Database Schema

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Authors table
CREATE TABLE authors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    linkedin_url TEXT,
    language VARCHAR(2) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color code
    language VARCHAR(2) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    language VARCHAR(2) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    reading_time INTEGER NOT NULL DEFAULT 1,
    view_count INTEGER DEFAULT 0,
    language VARCHAR(2) DEFAULT 'en',
    seo_metadata JSONB
);

-- Post categories junction table
CREATE TABLE post_categories (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- Post tags junction table
CREATE TABLE post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- Indexes for better performance
CREATE INDEX idx_blog_posts_published_language ON blog_posts(is_published, language, published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_authors_language ON authors(language);
CREATE INDEX idx_categories_language ON categories(language);
CREATE INDEX idx_tags_language ON tags(language);
CREATE INDEX idx_blog_posts_language ON blog_posts(language);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE blog_posts 
    SET view_count = view_count + 1 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### 4. Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Authors are publicly readable" ON authors FOR SELECT USING (true);
CREATE POLICY "Categories are publicly readable" ON categories FOR SELECT USING (true);
CREATE POLICY "Tags are publicly readable" ON tags FOR SELECT USING (true);
CREATE POLICY "Published posts are publicly readable" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Post categories are publicly readable" ON post_categories FOR SELECT USING (true);
CREATE POLICY "Post tags are publicly readable" ON post_tags FOR SELECT USING (true);

-- Allow public to increment view count
CREATE POLICY "Anyone can increment view count" ON blog_posts FOR UPDATE USING (true) WITH CHECK (true);
```

### 5. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=https://catalytiq.com
   ```

### 6. Add Sample Data

Use the SQL from [`ITALIAN_BLOG_COMPLETE_SETUP.md`](ITALIAN_BLOG_COMPLETE_SETUP.md) to add sample content for both English and Italian.

## Content Management

### Option 1: Supabase Dashboard (Immediate)

1. Go to your Supabase project dashboard
2. Navigate to the Table Editor
3. Add content directly to the tables:
   - `authors` - Create author profiles
   - `categories` - Add blog categories
   - `tags` - Create tags
   - `blog_posts` - Add blog posts
   - `post_categories` - Link posts to categories
   - `post_tags` - Link posts to tags

### Option 2: API Endpoints (Advanced)

The blog APIs now include full CRUD operations:

```typescript
// Create a new blog post
import { createBlogPost } from '@/lib/blog-api';

const newPost = await createBlogPost({
  title: 'Your Blog Post Title',
  slug: 'your-blog-post-slug',
  excerpt: 'Brief description',
  content: '<h2>Your content</h2><p>Full HTML content...</p>',
  author_id: 'author-uuid',
  category_ids: ['category-uuid'],
  tag_ids: ['tag-uuid-1', 'tag-uuid-2'],
  is_published: true,
  is_featured: false,
  seo_metadata: {
    meta_title: 'SEO Title',
    meta_description: 'SEO Description',
    keywords: ['keyword1', 'keyword2']
  }
});
```

### Option 3: Custom Admin Panel (Future)

You can build a custom admin interface using the provided API functions.

## Features Available

✅ **Multi-language Support** - English (`/blog`) and Italian (`/it/blog`)  
✅ **Dynamic Content** - Real-time updates from database  
✅ **SEO Optimization** - Meta tags and structured data  
✅ **Categories & Tags** - Content organization  
✅ **Featured Posts** - Homepage integration  
✅ **Search Functionality** - Full-text search  
✅ **View Tracking** - Post analytics  
✅ **Related Posts** - Content recommendations  
✅ **Responsive Design** - Mobile-first layout  

## Blog Structure

### English Blog
- **URL**: `/blog`
- **API**: [`src/lib/blog-api.ts`](src/lib/blog-api.ts)
- **Language**: `en`

### Italian Blog
- **URL**: `/it/blog`
- **API**: [`src/lib/blog-api-it.ts`](src/lib/blog-api-it.ts)
- **Language**: `it`

## Content Upload Process

1. **Add Author** (if new):
   ```sql
   INSERT INTO authors (name, email, bio, language) VALUES 
   ('Author Name', 'email@example.com', 'Bio text', 'en');
   ```

2. **Add Categories/Tags** (if needed):
   ```sql
   INSERT INTO categories (name, slug, description, color, language) VALUES 
   ('Category Name', 'category-slug', 'Description', '#3B82F6', 'en');
   ```

3. **Add Blog Post**:
   ```sql
   INSERT INTO blog_posts (title, slug, excerpt, content, author_id, is_published, published_at, language) VALUES 
   ('Post Title', 'post-slug', 'Excerpt', '<h2>Content</h2>', 'author-id', true, NOW(), 'en');
   ```

4. **Link Categories/Tags**:
   ```sql
   INSERT INTO post_categories (post_id, category_id) VALUES ('post-id', 'category-id');
   INSERT INTO post_tags (post_id, tag_id) VALUES ('post-id', 'tag-id');
   ```

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit:
   - `/blog` - English blog
   - `/it/blog` - Italian blog
   - `/` - Homepage with featured posts

## Next Steps

1. **Set up your Supabase project** using the SQL schema above
2. **Configure environment variables** with your Supabase credentials
3. **Add sample content** to test the system
4. **Start creating blog posts** through the Supabase dashboard
5. **Consider building a custom admin panel** for easier content management

Your CatalytIQ blog is now powered by Supabase and ready for dynamic content management!