export interface CaseStudyMeta {
  title: string;
  slug: string;
  industry: string;
  automationType: string;
  challenge: string;
  keyMetric: string;
  metricDetail: string;
  icon: string;
  image?: string;
  openingStat?: string;
  clientProfile?: string;
  timeline?: string;
  investment?: string;
  clientQuote?: string;
  clientQuoteAuthor?: string;
}

export interface CaseStudy extends CaseStudyMeta {
  content: string;
}
