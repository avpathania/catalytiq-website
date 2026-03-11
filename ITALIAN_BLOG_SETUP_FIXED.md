# Fixed Italian Blog Setup - SQL Script

This is the corrected version that handles the unique constraint issue with author emails.

## Option 1: Create Separate Italian Author (Recommended)

```sql
-- Add language column to existing tables (run this first if not already done)
ALTER TABLE authors ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE categories ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE tags ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS language VARCHAR(2) DEFAULT 'en';

-- Create indexes for language filtering (run this if not already done)
CREATE INDEX IF NOT EXISTS idx_authors_language ON authors(language);
CREATE INDEX IF NOT EXISTS idx_categories_language ON categories(language);
CREATE INDEX IF NOT EXISTS idx_tags_language ON tags(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_language ON blog_posts(is_published, language, published_at DESC);

-- Insert Italian author with unique email
INSERT INTO authors (name, email, bio, language, linkedin_url) VALUES
('Team CatalytIQ Systems', 'team-it@catalytiq.com', 'Esperti di automazione aziendale che aiutano le PMI a trasformare le loro operazioni con AI e flussi di lavoro intelligenti.', 'it', 'https://linkedin.com/company/catalytiq');

-- Insert Italian categories (with unique Italian slugs)
INSERT INTO categories (name, slug, description, color, language) VALUES
('Approfondimenti Automazione', 'approfondimenti-automazione-it', 'Consigli strategici sull''automazione e migliori pratiche', '#3B82F6', 'it'),
('Casi di Studio', 'casi-di-studio-it', 'Storie di successo reali dei clienti e implementazioni', '#10B981', 'it'),
('Tendenze del Settore', 'tendenze-settore-it', 'Analisi di mercato e previsioni future', '#8B5CF6', 'it'),
('Leadership di Pensiero', 'leadership-pensiero-it', 'Opinioni di esperti e visione strategica', '#F59E0B', 'it'),
('ROI e Analytics', 'roi-analytics-it', 'Benefici dell''automazione basati sui dati e metriche', '#EF4444', 'it');

-- Insert Italian tags (with unique Italian slugs)
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
('Esperienza Cliente', 'esperienza-cliente-it', 'it');

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

-- Link the Italian post to categories and tags (using updated slugs)
INSERT INTO post_categories (post_id, category_id) VALUES
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM categories WHERE slug = 'approfondimenti-automazione-it' AND language = 'it'));

INSERT INTO post_tags (post_id, tag_id) VALUES
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'automazione-ai-it' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'trasformazione-digitale-it' AND language = 'it')),
((SELECT id FROM blog_posts WHERE slug = '5-modi-automazione-ai-trasforma-operazioni-pmi'), (SELECT id FROM tags WHERE slug = 'crescita-pmi-it' AND language = 'it'));
```

## Option 2: Use Existing Author (Alternative)

If you prefer to use the existing author for both languages:

```sql
-- Update existing author to support Italian language (create a duplicate entry)
INSERT INTO authors (name, email, bio, language, linkedin_url) 
SELECT 
    name, 
    'team-it@catalytiq.com' as email,
    'Esperti di automazione aziendale che aiutano le PMI a trasformare le loro operazioni con AI e flussi di lavoro intelligenti.' as bio,
    'it' as language,
    linkedin_url
FROM authors 
WHERE email = 'team@catalytiq.com' 
LIMIT 1;

-- Then continue with the rest of the Italian data insertion...
```

## Option 3: Update Existing Author to be Language-Neutral

```sql
-- Update existing author to set language to 'en' explicitly
UPDATE authors SET language = 'en' WHERE email = 'team@catalytiq.com';

-- Then create Italian version
INSERT INTO authors (name, email, bio, language, linkedin_url) VALUES
('Team CatalytIQ Systems', 'team-it@catalytiq.com', 'Esperti di automazione aziendale che aiutano le PMI a trasformare le loro operazioni con AI e flussi di lavoro intelligenti.', 'it', 'https://linkedin.com/company/catalytiq');
```

## Troubleshooting

If you encounter other errors:

1. **Column doesn't exist**: Make sure you ran the ALTER TABLE commands first
2. **Permission denied**: Ensure you have the right permissions in Supabase
3. **Syntax errors**: Copy each section separately and run them one by one

## Verification

After running the SQL, verify the data was inserted correctly:

```sql
-- Check Italian author
SELECT * FROM authors WHERE language = 'it';

-- Check Italian categories
SELECT * FROM categories WHERE language = 'it';

-- Check Italian blog post
SELECT * FROM blog_posts WHERE language = 'it';
```

Use **Option 1** (recommended) as it creates a clean separation between English and Italian content while avoiding the unique constraint issue.