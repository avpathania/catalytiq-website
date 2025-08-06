// Application constants for CatalytIQ Systems website

export const SITE_CONFIG = {
  name: "CatalytIQ Systems",
  description: "AI-powered automation solutions for SMEs",
  url: "https://catalytiq.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/catalytiq",
    linkedin: "https://linkedin.com/company/catalytiq",
    github: "https://github.com/catalytiq",
  },
} as const;

export const NAVIGATION_ITEMS = [
  {
    label: "Home",
    href: "/",
    description: "Return to homepage",
  },
  {
    label: "About",
    href: "/about",
    description: "Learn about our team and mission",
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Discover our automation solutions",
  },
  {
    label: "Use Cases",
    href: "/use-cases",
    description: "Real-world automation scenarios",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Latest insights and updates",
  },
] as const;

export const AUTOMATION_AREAS = [
  "Finance & Accounting",
  "Marketing & Sales",
  "Operations & Logistics",
  "Customer Service",
  "HR & Recruitment",
  "Data Analysis & Reporting",
] as const;

export const COMPANY_SIZES = [
  { value: "startup", label: "Startup (1-10 employees)" },
  { value: "small", label: "Small Business (11-50 employees)" },
  { value: "medium", label: "Medium Business (51-200 employees)" },
  { value: "enterprise", label: "Enterprise (200+ employees)" },
] as const;

export const URGENCY_OPTIONS = [
  { value: "immediate", label: "Immediate (within 2 weeks)" },
  { value: "within_month", label: "Within a month" },
  { value: "exploring", label: "Just exploring options" },
] as const;

export const INDUSTRIES = [
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Automate inventory, orders, and customer communications",
    icon: "ShoppingCart",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Streamline patient management and administrative tasks",
    icon: "Heart",
  },
  {
    id: "finance",
    name: "Financial Services",
    description: "Automate compliance, reporting, and client onboarding",
    icon: "DollarSign",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Optimize supply chain and production workflows",
    icon: "Factory",
  },
  {
    id: "realestate",
    name: "Real Estate",
    description: "Automate lead management and property workflows",
    icon: "Home",
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Streamline client management and project delivery",
    icon: "Users",
  },
] as const;

export const WHY_CATALYTIQ = [
  {
    title: "Deep expertise in finance, marketing, and strategy",
    icon: "Brain",
  },
  {
    title: "100+ hours/month saved with tailored automations",
    icon: "Clock",
  },
  {
    title: "Higher conversion and on-time payments",
    icon: "TrendingUp",
  },
  {
    title: "Dashboards that drive business decisions",
    icon: "BarChart3",
  },
] as const;

export const AUTOMATION_AREAS_NEW = [
  {
    title: "Finance",
    description: "Invoicing, reporting, accounts",
    icon: "DollarSign",
  },
  {
    title: "Marketing",
    description: "Lead capture, follow-ups, CRMs",
    icon: "Target",
  },
  {
    title: "Business Strategy",
    description: "Dashboards, reporting, insights",
    icon: "BarChart3",
  },
] as const;

export const USE_CASES = [
  {
    title: "Lead responds in 2 minutes",
    description: "Automated lead capture and instant follow-up sequences that convert prospects while they're hot.",
  },
  {
    title: "Invoice auto-logged",
    description: "Seamless invoice generation and tracking that eliminates manual data entry and reduces errors.",
  },
  {
    title: "Production report emailed Friday noon",
    description: "Automated weekly reports delivered exactly when you need them for strategic decision-making.",
  },
] as const;

export const INDUSTRIES_SERVED = [
  {
    name: "Manufacturing",
    icon: "Factory",
  },
  {
    name: "Professional Services",
    icon: "Briefcase",
  },
  {
    name: "Distribution",
    icon: "Truck",
  },
  {
    name: "Business Consulting",
    icon: "Users",
  },
  {
    name: "Marketing Agencies",
    icon: "Megaphone",
  },
  {
    name: "Retail",
    icon: "ShoppingBag",
  },
] as const;

export const HOW_WE_WORK = [
  {
    step: 1,
    title: "Strategic Advisory",
    description: "We identify where automation will deliver the biggest ROI",
  },
  {
    step: 2,
    title: "Workflow Design",
    description: "We build the solution using AI and automation tools",
  },
  {
    step: 3,
    title: "Launch & Review",
    description: "You see results in days, not months",
  },
] as const;

export const API_ENDPOINTS = {
  LEADS: "/api/leads",
  DEMO_BOOKINGS: "/api/demo-bookings",
  CONTACT: "/api/contact",
  NEWSLETTER: "/api/newsletter",
  ANALYTICS: "/api/analytics",
} as const;

export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\+]?[1-9][\d]{0,15}$/,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 1000,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
} as const;

// Solutions Page Constants
export const SOLUTIONS_APPROACH = [
  {
    step: 1,
    title: "Strategic Advisory",
    description: "Define the right problems to solve",
  },
  {
    step: 2,
    title: "Custom Workflow Design",
    description: "Map the ideal solution using the right tools",
  },
  {
    step: 3,
    title: "Launch & Optimization",
    description: "Implement fast, then fine-tune",
  },
] as const;

export const SOLUTIONS_AUTOMATION_AREAS = [
  {
    id: "finance",
    title: "Finance",
    subtitle: "Smarter, Faster Financial Operations",
    icon: "Calculator",
    items: [
      "AI-powered invoice capture and entry",
      "Automatic payment scheduling & reminders",
      "Monthly financial dashboards & reports",
      "Vendor management & onboarding",
      "Bank feed categorization (semi-automated)",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    subtitle: "Turn Leads Into Clients — Automatically",
    icon: "Megaphone",
    items: [
      "Webform + CRM lead capture",
      "Personalized email replies & nurturing",
      "Instant proposal generation",
      "Campaign tracking dashboards",
      "Win/loss follow-up email sequences",
    ],
  },
  {
    id: "strategy",
    title: "Business Strategy",
    subtitle: "Dashboards That Drive Decisions",
    icon: "BarChart3",
    items: [
      "Weekly KPI summaries delivered via email",
      "Live performance visualizations",
      "Automated client onboarding workflows",
      "Sales pipeline alerts",
      "Meeting preparation digests",
    ],
  },
] as const;

export const SOLUTIONS_RESULTS = [
  {
    stat: "50+ hours/month saved",
    description: "Just by automating reporting and invoicing",
  },
  {
    stat: "2-minute lead response time",
    description: "Improve conversion rates by striking while interest is high",
  },
  {
    stat: ">90% on-time payments",
    description: "Thanks to automated reminders and follow-ups",
  },
] as const;

// Blog Constants
export const BLOG_CATEGORIES = [
  {
    name: "Automation Insights",
    slug: "automation-insights",
    description: "Strategic automation advice and best practices",
    color: "#3B82F6",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    description: "Real client success stories and implementations",
    color: "#10B981",
  },
  {
    name: "Industry Trends",
    slug: "industry-trends",
    description: "Market analysis and future predictions",
    color: "#8B5CF6",
  },
  {
    name: "Thought Leadership",
    slug: "thought-leadership",
    description: "Expert opinions and strategic vision",
    color: "#F59E0B",
  },
  {
    name: "ROI & Analytics",
    slug: "roi-analytics",
    description: "Data-driven automation benefits and metrics",
    color: "#EF4444",
  },
] as const;

export const BLOG_TAGS = [
  "AI Automation",
  "Business Process",
  "Digital Transformation",
  "SME Growth",
  "Workflow Optimization",
  "Cost Reduction",
  "Productivity",
  "Technology Integration",
  "Data Analytics",
  "Customer Experience",
] as const;

export const SOCIAL_SHARE_PLATFORMS = [
  {
    name: "LinkedIn",
    icon: "Linkedin",
    getShareUrl: (data: { url: string; title: string; description: string }) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`,
    color: "#0077B5",
  },
  {
    name: "Twitter",
    icon: "Twitter",
    getShareUrl: (data: { url: string; title: string; description: string }) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(data.title)}`,
    color: "#1DA1F2",
  },
  {
    name: "Email",
    icon: "Mail",
    getShareUrl: (data: { url: string; title: string; description: string }) =>
      `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(`${data.description}\n\n${data.url}`)}`,
    color: "#6B7280",
  },
] as const;

export const BLOG_CONFIG = {
  POSTS_PER_PAGE: 9,
  FEATURED_POSTS_COUNT: 3,
  RELATED_POSTS_COUNT: 3,
  EXCERPT_LENGTH: 160,
  READING_SPEED_WPM: 200,
} as const;