import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { CaseStudy, CaseStudyMeta } from '@/types/case-study';

function getContentDir(locale: string) {
  return path.join(process.cwd(), `content/case-studies/${locale}`);
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(markdown);
  return result.toString();
}

async function parseFile(filename: string, contentDir: string): Promise<CaseStudy> {
  const filePath = path.join(contentDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content);

  return {
    title: data.title,
    slug: data.slug || filename.replace(/\.md$/, ''),
    industry: data.industry,
    automationType: data.automation_type,
    challenge: data.challenge,
    keyMetric: data.key_metric,
    metricDetail: data.metric_detail,
    icon: data.icon,
    image: data.image,
    openingStat: data.opening_stat,
    clientProfile: data.client_profile,
    timeline: data.timeline,
    investment: data.investment,
    clientQuote: data.client_quote,
    clientQuoteAuthor: data.client_quote_author,
    content: htmlContent,
  };
}

export async function getCaseStudies(locale = 'en'): Promise<CaseStudyMeta[]> {
  const contentDir = getContentDir(locale);
  if (!fs.existsSync(contentDir)) return [];

  const filenames = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const studies = await Promise.all(filenames.map((f) => parseFile(f, contentDir)));

  return studies.map(({ content: _content, ...meta }) => meta);
}

export async function getCaseStudy(slug: string, locale = 'en'): Promise<CaseStudy | null> {
  const contentDir = getContentDir(locale);
  if (!fs.existsSync(contentDir)) return null;

  const filenames = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const studies = await Promise.all(filenames.map((f) => parseFile(f, contentDir)));
  return studies.find((s) => s.slug === slug) ?? null;
}

export async function getRelatedCaseStudies(
  currentSlug: string,
  industry: string,
  locale = 'en',
  limit = 2
): Promise<CaseStudyMeta[]> {
  const all = await getCaseStudies(locale);
  const sameIndustry = all.filter(
    (s) => s.slug !== currentSlug && s.industry === industry
  );
  const others = all.filter(
    (s) => s.slug !== currentSlug && s.industry !== industry
  );
  return [...sameIndustry, ...others].slice(0, limit);
}
