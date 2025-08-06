# CatalytIQ Systems Blog Setup Guide

This guide will help you set up the dynamic blog functionality with Supabase as the CMS.

## Prerequisites

- Supabase account and project
- Node.js and npm installed
- CatalytIQ Systems website project

## 1. Supabase Setup

### Create Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Note down your project URL and anon key

### Database Schema

Run the following SQL commands in your Supabase SQL editor to create the blog tables:

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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color code
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
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
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX idx_blog_posts_featured ON blog_posts(is_featured, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

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

### Row Level Security (RLS)

Enable RLS and create policies for public read access:

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

## 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://catalytiq.com
```

## 3. Sample Data

Insert some sample data to test the blog:

```sql
-- Insert sample author
INSERT INTO authors (name, email, bio, linkedin_url) VALUES
('CatalytIQ Systems Team', 'team@catalytiq.com', 'Business automation experts helping SMEs transform their operations with AI and intelligent workflows.', 'https://linkedin.com/company/catalytiq');

-- Insert sample categories
INSERT INTO categories (name, slug, description, color) VALUES 
('Automation Insights', 'automation-insights', 'Strategic automation advice and best practices', '#3B82F6'),
('Case Studies', 'case-studies', 'Real client success stories and implementations', '#10B981'),
('Industry Trends', 'industry-trends', 'Market analysis and future predictions', '#8B5CF6'),
('Thought Leadership', 'thought-leadership', 'Expert opinions and strategic vision', '#F59E0B'),
('ROI & Analytics', 'roi-analytics', 'Data-driven automation benefits and metrics', '#EF4444');

-- Insert sample tags
INSERT INTO tags (name, slug) VALUES 
('AI Automation', 'ai-automation'),
('Business Process', 'business-process'),
('Digital Transformation', 'digital-transformation'),
('SME Growth', 'sme-growth'),
('Workflow Optimization', 'workflow-optimization'),
('Cost Reduction', 'cost-reduction'),
('Productivity', 'productivity'),
('Technology Integration', 'technology-integration'),
('Data Analytics', 'data-analytics'),
('Customer Experience', 'customer-experience');

-- Insert sample blog post
INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    is_featured, 
    is_published, 
    published_at, 
    author_id, 
    reading_time,
    seo_metadata
) VALUES (
    '5 Ways AI Automation Can Transform Your SME Operations',
    '5-ways-ai-automation-transform-sme-operations',
    'Discover how small and medium enterprises can leverage AI automation to streamline operations, reduce costs, and accelerate growth in today''s competitive market.',
    '<h2>Introduction</h2><p>Small and medium enterprises (SMEs) are increasingly turning to AI automation to stay competitive and drive growth. In this comprehensive guide, we explore five transformative ways AI can revolutionize your business operations.</p><h2>1. Streamlined Financial Management</h2><p>AI-powered automation can transform your financial processes by automatically categorizing expenses, generating invoices, and providing real-time financial insights.</p><h2>2. Enhanced Customer Service</h2><p>Implement AI chatbots and automated response systems to provide 24/7 customer support while reducing operational costs.</p><h2>3. Optimized Marketing Campaigns</h2><p>Use AI to analyze customer behavior, personalize marketing messages, and automate lead nurturing processes for better conversion rates.</p><h2>4. Intelligent Inventory Management</h2><p>Predict demand patterns, automate reordering processes, and optimize stock levels to reduce waste and improve cash flow.</p><h2>5. Data-Driven Decision Making</h2><p>Transform raw data into actionable insights with AI-powered analytics and automated reporting systems.</p><h2>Conclusion</h2><p>AI automation is no longer a luxury for large corporations—it''s becoming essential for SMEs looking to thrive in the digital age. Start small, measure results, and scale your automation efforts as you see success.</p>',
    true,
    true,
    NOW(),
    (SELECT id FROM authors WHERE email = 'team@catalytiq.com'),
    8,
    '{"meta_title": "5 Ways AI Automation Can Transform Your SME Operations | CatalytIQ Systems", "meta_description": "Discover how small and medium enterprises can leverage AI automation to streamline operations, reduce costs, and accelerate growth.", "keywords": ["AI automation", "SME operations", "business transformation", "digital transformation"]}'::jsonb
);

-- Link the post to categories and tags
INSERT INTO post_categories (post_id, category_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-ways-ai-automation-transform-sme-operations'), (SELECT id FROM categories WHERE slug = 'automation-insights'));

INSERT INTO post_tags (post_id, tag_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-ways-ai-automation-transform-sme-operations'), (SELECT id FROM tags WHERE slug = 'ai-automation')),
((SELECT id FROM blog_posts WHERE slug = '5-ways-ai-automation-transform-sme-operations'), (SELECT id FROM tags WHERE slug = 'digital-transformation')),
((SELECT id FROM blog_posts WHERE slug = '5-ways-ai-automation-transform-sme-operations'), (SELECT id FROM tags WHERE slug = 'sme-growth'));
```

## 4. Homepage Integration

To add the featured blog section to your homepage, update `src/app/page.tsx`:

```tsx
import { MainLayout, Hero, Features, Process, UseCases, Industries, FeaturedBlog, CTA } from "@/components";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <Process />
      <UseCases />
      <Industries />
      <FeaturedBlog />
      <CTA />
    </MainLayout>
  );
}
```

## 5. Blog Content Styling

Add the blog content styles to your global CSS file (`src/app/globals.css`):

```css
/* Blog content styles */
.blog-content {
  line-height: 1.8;
}

.blog-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
}

.blog-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.blog-content h4 {
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
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
```

## 6. Testing

1. Start your development server: `npm run dev`
2. Navigate to `/blog` to see the blog listing
3. Check that the featured blog section appears on the homepage
4. Test individual blog post pages
5. Verify search and filtering functionality

## 7. Content Management

You can manage blog content through:

1. **Supabase Dashboard**: Direct database access for technical users
2. **Custom Admin Interface**: Build a simple admin panel (optional)
3. **API Endpoints**: Create content management API routes

## Features Included

✅ **Dynamic Blog Listing** - Paginated blog posts with filtering  
✅ **Individual Post Pages** - SEO-optimized blog post pages  
✅ **Featured Posts** - Highlighted content on homepage  
✅ **Categories & Tags** - Content organization system  
✅ **Search Functionality** - Full-text search across posts  
✅ **Social Sharing** - LinkedIn, Twitter, and email sharing  
✅ **Related Posts** - AI-powered content recommendations  
✅ **Reading Time** - Automatic reading time estimation  
✅ **View Tracking** - Post view count analytics  
✅ **SEO Optimization** - Meta tags, structured data, and Open Graph  
✅ **Responsive Design** - Mobile-first responsive layout  
✅ **Dark Mode Support** - Consistent with site theme  

## Next Steps

1. **Content Creation**: Start adding your blog content through Supabase
2. **SEO Enhancement**: Add more structured data and meta tags
3. **Analytics**: Integrate with Google Analytics or similar
4. **Performance**: Implement caching strategies for better performance
5. **Admin Panel**: Build a custom content management interface (optional)

Your CatalytIQ Systems blog is now ready to help establish thought leadership and drive organic traffic to your business automation services!