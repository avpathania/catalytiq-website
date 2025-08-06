
# 🧾 Product Requirements Document (PRD)

**Project Name:** CatalytIQ Website  
**Type:** Corporate Website (Conversion-Focused)  
**Owner:** CatalytIQ Founding Partners  
**Developer Team:** Internal / Freelance / Agency  
**Hosting Platform:** Vercel  
**CMS/Data Layer:** Supabase (for leads, blog, case studies if needed)

---

## 1. 📌 Objective

Build a high-performance, responsive, professional website for CatalytIQ to:
- Establish credibility and showcase business/AI expertise
- Attract and convert SMEs interested in automation
- Book free consultations
- Educate potential clients with real-world scenarios

---

## 2. 🧩 Key Features & Requirements

### 2.1 Pages

| Page                        | Purpose                                           |
|-----------------------------|---------------------------------------------------|
| Home                        | Conversion, intro to CatalytIQ                    |
| Solutions                   | Detail what we automate (finance, marketing, strategy) |
| Use Cases / Scenarios       | Real-world mini stories per industry              |
| Industries We Serve         | Quick verticals overview                         |
| About Us                    | Story, team expertise, USP                        |
| Book a Demo (CTA page)      | Form + booking flow                              |
| Privacy / Terms / Legal     | Compliance                                       |

---

### 2.2 Functionality

- **Lead capture form** (Supabase backend)
- **CTA integration**: “Book a Free Demo” – sticky nav + homepage
- **Responsive design** – fully optimized for mobile/tablet
- **Lazy-loading images** and fast-loading assets
- **Modular content** – Components for Hero, Features, Cards, etc.
- **Google Analytics / Plausible Analytics**
- **SEO tags and metadata** for all pages
- **Dark mode (optional)**

---

## 3. 🧪 Tech Stack

| Layer           | Technology               |
|----------------|--------------------------|
| Frontend       | React (Next.js + Tailwind CSS + ShadCN UI) |
| Backend        | Supabase (forms, leads)   |
| Automation     | N8N + OpenAI APIs         |
| Hosting/CDN    | Vercel                    |
| Email Service  | Supabase SMTP or third-party (e.g., Resend) |

---

## 4. 🧱 Component Breakdown

### Shared
- Header with nav
- Footer with links, contact, social
- Reusable Buttons (Primary, Secondary)
- Layout Container/Grid

### Home
- Hero (headline + subheadline + CTA)
- Value Propositions section
- What We Automate cards
- Scenarios section (carousel or 3-column)
- Industries grid
- Process timeline
- Final CTA

### Demo Page
- Form (name, email, company, needs)
- Calendar booking embed (optional via Calendly)
- Confirmation message or email
