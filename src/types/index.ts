// Global type definitions for CatalytIQ website

export interface Lead {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  message?: string;
  source: 'contact_form' | 'demo_booking' | 'newsletter';
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  createdAt: Date;
  updatedAt: Date;
}

export interface DemoBooking {
  id: string;
  leadId: string;
  preferredDate: Date;
  preferredTime: string;
  companySize: 'startup' | 'small' | 'medium' | 'enterprise';
  automationNeeds: string[];
  urgency: 'immediate' | 'within_month' | 'exploring';
  createdAt: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

export interface DemoFormData {
  name: string;
  email: string;
  company: string;
  companySize: 'startup' | 'small' | 'medium' | 'enterprise';
  automationNeeds: string[];
  preferredDate: string;
  preferredTime: string;
  urgency: 'immediate' | 'within_month' | 'exploring';
  additionalInfo?: string;
}

export interface BookDemoFormData {
  name: string;
  surname: string;
  email: string;
  contactNumber: string;
  companyName: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  industry: string;
  automationType: string;
  roi: string;
  timeToImplement: string;
  complexity: 'low' | 'medium' | 'high';
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  useCases: string[];
  automationOpportunities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
  slug: string;
  featured: boolean;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form validation types
export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormState<T> {
  data: T;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  userId?: string;
  timestamp?: Date;
}

// Export blog-specific types
export * from './blog';