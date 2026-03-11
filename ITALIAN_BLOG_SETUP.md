# Italian Blog Setup Guide

This guide extends the existing blog setup to support Italian content with separate Italian posts in the same Supabase database.

## Database Schema Extensions

### 1. Add Language Support to Existing Tables

Run the following SQL commands in your Supabase SQL editor:

```sql
-- Add language column to existing tables
ALTER TABLE authors ADD COLUMN language VARCHAR(2) DEFAULT 'en';
ALTER TABLE categories ADD COLUMN language VARCHAR(2) DEFAULT 'en';
ALTER TABLE tags ADD COLUMN language VARCHAR(2) DEFAULT 'en';
ALTER TABLE blog_posts ADD COLUMN language VARCHAR(2) DEFAULT 'en';

-- Create indexes for language filtering
CREATE INDEX idx_authors_language ON authors(language);
CREATE INDEX idx_categories_language ON categories(language);
CREATE INDEX idx_tags_language ON tags(language);
CREATE INDEX idx_blog_posts_language ON blog_posts(language);
CREATE INDEX idx_blog_posts_published_language ON blog_posts(is_published, language, published_at DESC);

-- Update RLS policies to include language filtering
DROP POLICY IF EXISTS "Published posts are publicly readable" ON blog_posts;
CREATE POLICY "Published posts are publicly readable" ON blog_posts 
FOR SELECT USING (is_published = true);

-- Allow filtering by language in all tables
DROP POLICY IF EXISTS "Authors are publicly readable" ON authors;
CREATE POLICY "Authors are publicly readable" ON authors FOR SELECT USING (true);

DROP POLICY IF EXISTS "Categories are publicly readable" ON categories;
CREATE POLICY "Categories are publicly readable" ON categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Tags are publicly readable" ON tags;
CREATE POLICY "Tags are publicly readable" ON tags FOR SELECT USING (true);
```

### 2. Insert Italian Sample Data

```sql
-- Insert Italian author (using different email to avoid unique constraint violation)
INSERT INTO authors (name, email, bio, language, linkedin_url) VALUES
('Team CatalytIQ Systems', 'team-it@catalytiq.com', 'Esperti di automazione aziendale che aiutano le PMI a trasformare le loro operazioni con AI e flussi di lavoro intelligenti.', 'it', 'https://linkedin.com/company/catalytiq');

-- Insert Italian categories
INSERT INTO categories (name, slug, description, color, language) VALUES 
('Approfondimenti Automazione', 'approfondimenti-automazione', 'Consigli strategici sull''automazione e migliori pratiche', '#3B82F6', 'it'),
('Casi di Studio', 'casi-di-studio', 'Storie di successo reali dei clienti e implementazioni', '#10B981', 'it'),
('Tendenze del Settore', 'tendenze-settore', 'Analisi di mercato e previsioni future', '#8B5CF6', 'it'),
('Leadership di Pensiero', 'leadership-pensiero', 'Opinioni di esperti e visione strategica', '#F59E0B', 'it'),
('ROI e Analytics', 'roi-analytics', 'Benefici dell''automazione basati sui dati e metriche', '#EF4444', 'it');

-- Insert Italian tags
INSERT INTO tags (name, slug, language) VALUES 
('Automazione AI', 'automazione-ai', 'it'),
('Processo Aziendale', 'processo-aziendale', 'it'),
('Trasformazione Digitale', 'trasformazione-digitale', 'it'),
('Crescita PMI', 'crescita-pmi', 'it'),
('Ottimizzazione Workflow', 'ottimizzazione-workflow', 'it'),
('Riduzione Costi', 'riduzione-costi', 'it'),
('Produttività', 'produttivita', 'it'),
('Integrazione Tecnologica', 'integrazione-tecnologica', 'it'),
('Analisi Dati', 'analisi-dati', 'it'),
('Esperienza Cliente', 'esperienza-cliente', 'it');

-- Insert sample Italian blog post
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
    language,
    seo_metadata
) VALUES (
    '5 Modi in cui l''Automazione AI Può Trasformare le Operazioni della Tua PMI',
    '5-modi-automazione-ai-trasforma-operazioni-pmi',
    'Scopri come le piccole e medie imprese possono sfruttare l''automazione AI per snellire le operazioni, ridurre i costi e accelerare la crescita nel mercato competitivo di oggi.',
    '<h2>Introduzione</h2><p>Le piccole e medie imprese (PMI) si stanno sempre più rivolgendo all''automazione AI per rimanere competitive e guidare la crescita. In questa guida completa, esploriamo cinque modi trasformativi in cui l''AI può rivoluzionare le operazioni della tua azienda.</p><h2>1. Gestione Finanziaria Semplificata</h2><p>L''automazione basata su AI può trasformare i tuoi processi finanziari categorizzando automaticamente le spese, generando fatture e fornendo insights finanziari in tempo reale.</p><h2>2. Servizio Clienti Migliorato</h2><p>Implementa chatbot AI e sistemi di risposta automatizzati per fornire supporto clienti 24/7 riducendo i costi operativi.</p><h2>3. Campagne Marketing Ottimizzate</h2><p>Utilizza l''AI per analizzare il comportamento dei clienti, personalizzare i messaggi di marketing e automatizzare i processi di nurturing dei lead per migliori tassi di conversione.</p><h2>4. Gestione Intelligente dell''Inventario</h2><p>Prevedi i modelli di domanda, automatizza i processi di riordino e ottimizza i livelli di stock per ridurre gli sprechi e migliorare il flusso di cassa.</p><h2>5. Decisioni Basate sui Dati</h2><p>Trasforma i dati grezzi in insights azionabili con analytics basati su AI e sistemi di reporting automatizzati.</p><h2>Conclusione</h2><p>L''automazione AI non è più un lusso per le grandi aziende—sta diventando essenziale per le PMI che vogliono prosperare nell''era digitale. Inizia in piccolo, misura i risultati e scala i tuoi sforzi di automazione man mano che vedi il successo.</p>',
    true,
    true,
    NOW(),
    (SELECT id FROM authors WHERE email = 'team-it@catalytiq.com' AND language = 'it'),
    8,
    'it',
    '{"meta_title": "5 Modi in cui l''Automazione AI Può Trasformare le Operazioni della Tua PMI | CatalytIQ Systems", "meta_description": "Scopri come le piccole e medie imprese possono sfruttare l''automazione AI per snellire le operazioni, ridurre i costi e accelerare la crescita.", "keywords": ["automazione AI", "operazioni PMI", "trasformazione aziendale", "trasformazione digitale"]}'::jsonb
);

-- Link the Italian post to categories and tags
INSERT INTO post_categories (post_id, category_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM categories WHERE slug = 'approfondimenti-automazione' AND language = 'it'));

INSERT INTO post_tags (post_id, tag_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'automazione-ai' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'trasformazione-digitale' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'crescita-pmi' AND language = 'it'));
```

## Implementation Notes

1. **Language Field**: Added to all blog-related tables with default 'en' for existing content
2. **Separate Content**: Italian content is completely separate from English content
3. **URL Structure**: Italian blog posts will be accessible at `/it/blog/[slug]`
4. **SEO Optimization**: Italian metadata and structured data support
5. **Backward Compatibility**: Existing English content remains unchanged

## Next Steps

1. Update blog API functions to support language filtering
2. Create Italian-specific blog components
3. Implement Italian blog post pages
4. Add Italian constants and translations
5. Test functionality and add more Italian content
