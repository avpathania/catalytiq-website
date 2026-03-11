# 🏗️ CatalytIQ Website - Technical Architecture

## 📋 Project Overview

**Project:** CatalytIQ Corporate Website  
**Tech Stack:** Next.js 14+ + TypeScript + Tailwind CSS + ShadCN UI + Supabase  
**Package Manager:** npm  
**Deployment:** Vercel  
**Repository:** Git with conventional commits  

---

## 🛠️ Technology Stack

### Frontend Framework
- **Next.js 14+** with App Router
- **React 18+** with Server Components
- **TypeScript 5+** for type safety
- **Tailwind CSS 3+** for styling
- **ShadCN UI** for component library

### Backend & Database
- **Supabase** for authentication, database, and real-time features
- **PostgreSQL** (via Supabase) for data storage
- **Supabase Edge Functions** for serverless API endpoints

### Development Tools
- **ESLint** with Next.js recommended rules
- **Prettier** for code formatting
- **Husky** for git hooks (optional)
- **TypeScript** strict mode enabled

### Deployment & Hosting
- **Vercel** for hosting and CI/CD
- **Vercel Analytics** for performance monitoring
- **Custom domain** configuration

---

## 📁 Project Structure

```
catalytiq-website/
├── app/                          # Next.js App Router
│   ├── (marketing)/             # Route groups
│   │   ├── page.tsx             # Home page
│   │   ├── solutions/           # Solutions pages
│   │   ├── use-cases/           # Use cases pages
│   │   ├── industries/          # Industries pages
│   │   └── about/               # About page
│   ├── book-demo/               # Demo booking page
│   ├── api/                     # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── loading.tsx              # Loading UI
├── components/                   # Reusable components
│   ├── ui/                      # ShadCN UI components
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   ├── sections/                # Page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   └── cta.tsx
│   └── forms/                   # Form components
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   ├── supabase.ts              # Supabase client
│   ├── validations.ts           # Zod schemas
│   └── constants.ts             # App constants
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── styles/                      # Additional styles
└── docs/                        # Documentation
```

---

## 🎨 Design System Integration

### CSS Variables Migration
- Integrate existing `index.css` design tokens
- Convert to Tailwind CSS custom properties
- Maintain light/dark mode support
- Ensure ShadCN UI compatibility

### Component Architecture
```
Atomic Design Principles:
├── Atoms (Button, Input, Typography)
├── Molecules (SearchBox, Card, FormField)
├── Organisms (Header, Footer, Hero)
├── Templates (PageLayout, SectionLayout)
└── Pages (Home, Solutions, About)
```

---

## 🗄️ Database Schema (Supabase)

### Core Tables

#### `leads` Table
```sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  source VARCHAR(100), -- 'contact_form', 'demo_booking', etc.
  status VARCHAR(50) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'converted'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `demo_bookings` Table
```sql
CREATE TABLE demo_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  preferred_date TIMESTAMP WITH TIME ZONE,
  preferred_time VARCHAR(50),
  company_size VARCHAR(50),
  automation_needs TEXT[],
  urgency VARCHAR(50), -- 'immediate', 'within_month', 'exploring'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### `page_analytics` Table
```sql
CREATE TABLE page_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path VARCHAR(255) NOT NULL,
  visitor_id VARCHAR(255),
  session_id VARCHAR(255),
  referrer VARCHAR(255),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🔧 Configuration Files

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'supabase.co'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Import existing CSS variables
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // ... other custom colors
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 🚀 Development Workflow

### Setup Commands
```bash
# 1. Initialize Next.js project
npx create-next-app@latest catalytiq-website --typescript --tailwind --eslint --app

# 2. Install ShadCN UI
npx shadcn-ui@latest init

# 3. Install additional dependencies
npm install @supabase/supabase-js zod react-hook-form @hookform/resolvers

# 4. Install dev dependencies
npm install -D prettier eslint-config-prettier
```

### Development Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🔐 Environment Variables

### Required Environment Variables
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain

# Email service
RESEND_API_KEY=your_resend_api_key
```

---

## 📊 Performance Optimization

### Next.js Optimizations
- **Image Optimization:** Use `next/image` for all images
- **Font Optimization:** Use `next/font` for custom fonts
- **Bundle Analysis:** Regular bundle size monitoring
- **Static Generation:** Use SSG where possible
- **Incremental Static Regeneration:** For dynamic content

### SEO Configuration
- **Metadata API:** Use Next.js 14 metadata API
- **Structured Data:** JSON-LD for rich snippets
- **Sitemap:** Auto-generated sitemap.xml
- **Robots.txt:** Proper crawling instructions

---

## 🚀 Deployment Strategy

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### CI/CD Pipeline
1. **Development:** Feature branches → PR → Review
2. **Staging:** Merge to `develop` → Auto-deploy to staging
3. **Production:** Merge to `main` → Auto-deploy to production

---

## 📈 Monitoring & Analytics

### Performance Monitoring
- **Vercel Analytics:** Built-in performance metrics
- **Core Web Vitals:** LCP, FID, CLS tracking
- **Error Tracking:** Sentry integration (optional)

### Business Analytics
- **Google Analytics 4:** User behavior tracking
- **Supabase Analytics:** Database query performance
- **Custom Events:** Lead conversion tracking

---

## 🔄 Next Steps

1. **Initialize Project:** Run setup commands
2. **Configure Design System:** Integrate existing CSS variables
3. **Build Core Components:** Header, Footer, Layout
4. **Implement Pages:** Following PRD specifications
5. **Supabase Integration:** Database setup and API integration
6. **Testing:** Unit tests and E2E testing setup
7. **Deployment:** Vercel configuration and go-live

---

*This architecture document will be updated as the project evolves.*