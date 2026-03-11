# Complete Italian Blog Setup - Final Version

This script handles all unique constraint issues and provides a clean setup for Italian blog content.

## Step 1: Schema Updates (Run First)

```sql
-- Add language columns if they don't exist
ALTER TABLE authors ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE categories ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE tags ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_authors_language ON authors(language);
CREATE INDEX IF NOT EXISTS idx_categories_language ON categories(language);
CREATE INDEX IF NOT EXISTS idx_tags_language ON tags(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_language ON blog_posts(is_published, language, published_at DESC);

-- Update existing data to be explicitly English
UPDATE authors SET language = 'en' WHERE language IS NULL OR language = '';
UPDATE categories SET language = 'en' WHERE language IS NULL OR language = '';
UPDATE tags SET language = 'en' WHERE language IS NULL OR language = '';
UPDATE blog_posts SET language = 'en' WHERE language IS NULL OR language = '';
```

## Step 2: Clean Up Any Existing Italian Data (Optional)

```sql
-- Remove any existing Italian data if you want to start fresh
DELETE FROM post_tags WHERE tag_id IN (SELECT id FROM tags WHERE language = 'it');
DELETE FROM post_categories WHERE category_id IN (SELECT id FROM categories WHERE language = 'it');
DELETE FROM blog_posts WHERE language = 'it';
DELETE FROM tags WHERE language = 'it';
DELETE FROM categories WHERE language = 'it';
DELETE FROM authors WHERE language = 'it';
```

## Step 3: Insert Italian Data

```sql
-- Insert Italian author
INSERT INTO authors (name, email, bio, language, linkedin_url) VALUES
('Team CatalytIQ Systems', 'team-it@catalytiq.com', 'Esperti di automazione aziendale che aiutano le PMI a trasformare le loro operazioni con AI e flussi di lavoro intelligenti.', 'it', 'https://linkedin.com/company/catalytiq')
ON CONFLICT (email) DO NOTHING;

-- Insert Italian categories
INSERT INTO categories (name, slug, description, color, language) VALUES 
('Approfondimenti Automazione', 'approfondimenti-automazione-it', 'Consigli strategici sull''automazione e migliori pratiche', '#3B82F6', 'it'),
('Casi di Studio', 'casi-di-studio-it', 'Storie di successo reali dei clienti e implementazioni', '#10B981', 'it'),
('Tendenze del Settore', 'tendenze-settore-it', 'Analisi di mercato e previsioni future', '#8B5CF6', 'it'),
('Leadership di Pensiero', 'leadership-pensiero-it', 'Opinioni di esperti e visione strategica', '#F59E0B', 'it'),
('ROI e Analytics', 'roi-analytics-it', 'Benefici dell''automazione basati sui dati e metriche', '#EF4444', 'it')
ON CONFLICT (slug) DO NOTHING;

-- Insert Italian tags
INSERT INTO tags (name, slug, language) VALUES 
('Automazione AI', 'automazione-ai-it', 'it'),
('Processo Aziendale', 'processo-aziendale-it', 'it'),
('Trasformazione Digitale', 'trasformazione-digitale-it', 'it'),
('Crescita PMI', 'crescita-pmi-it', 'it'),
('Ottimizzazione Workflow', 'ottimizzazione-workflow-it', 'it'),
('Riduzione Costi', 'riduzione-costi-it', 'it'),
('Produttività', 'produttivita-it', 'it'),
('Integrazione Tecnologica', 'integrazione-tecnologica-it', 'it'),
('Analisi Dati', 'analisi-dati-it', 'it'),
('Esperienza Cliente', 'esperienza-cliente-it', 'it')
ON CONFLICT (slug) DO NOTHING;

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
)
ON CONFLICT (slug) DO NOTHING;

-- Link the Italian post to categories and tags
INSERT INTO post_categories (post_id, category_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM categories WHERE slug = 'approfondimenti-automazione-it' AND language = 'it'))
ON CONFLICT DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES 
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'automazione-ai-it' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'trasformazione-digitale-it' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'crescita-pmi-it' AND language = 'it'))
ON CONFLICT DO NOTHING;
```

## Step 4: Verification

```sql
-- Verify Italian data was inserted correctly
SELECT 'Authors' as table_name, count(*) as count FROM authors WHERE language = 'it'
UNION ALL
SELECT 'Categories' as table_name, count(*) as count FROM categories WHERE language = 'it'
UNION ALL
SELECT 'Tags' as table_name, count(*) as count FROM tags WHERE language = 'it'
UNION ALL
SELECT 'Blog Posts' as table_name, count(*) as count FROM blog_posts WHERE language = 'it';

-- Check the Italian blog post details
SELECT 
    bp.title,
    bp.slug,
    bp.language,
    a.name as author_name,
    array_agg(DISTINCT c.name) as categories,
    array_agg(DISTINCT t.name) as tags
FROM blog_posts bp
LEFT JOIN authors a ON bp.author_id = a.id
LEFT JOIN post_categories pc ON bp.id = pc.post_id
LEFT JOIN categories c ON pc.category_id = c.id
LEFT JOIN post_tags pt ON bp.id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.id
WHERE bp.language = 'it'
GROUP BY bp.id, bp.title, bp.slug, bp.language, a.name;
```

## Key Changes Made

1. **Unique Slugs**: All Italian categories and tags now have `-it` suffix
2. **Unique Email**: Italian author uses `team-it@catalytiq.com`
3. **Conflict Handling**: Added `ON CONFLICT DO NOTHING` to prevent errors
4. **Clean Setup**: Option to remove existing Italian data first
5. **Verification**: Queries to confirm data was inserted correctly

## Expected Results

After running this script, you should have:
- ✅ 1 Italian author
- ✅ 5 Italian categories  
- ✅ 10 Italian tags
- ✅ 1 Italian blog post
- ✅ Proper relationships between post, categories, and tags

This script is safe to run multiple times and will not cause unique constraint violations.