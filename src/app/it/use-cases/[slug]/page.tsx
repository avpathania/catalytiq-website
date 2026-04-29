import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileText, BarChart3, MessageSquare, UserCheck, Search } from "lucide-react";
import { MainLayout, UseCasesCTAIT } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCaseStudy, getRelatedCaseStudies } from "@/lib/case-studies";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  FileText,
  BarChart3,
  MessageSquare,
  UserCheck,
  Search,
};

const INDUSTRY_COLORS: Record<string, string> = {
  Manifatturiero: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Amministrazione e Finanza": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Commerciale e Vendite": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Logistica: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Servizi Professionali": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug, 'it');

  if (!study) {
    return { title: "Caso Studio Non Trovato | CatalytIQ Systems" };
  }

  return {
    title: `${study.title} | CatalytIQ Systems`,
    description: study.challenge,
  };
}

export async function generateStaticParams() {
  const { getCaseStudies } = await import("@/lib/case-studies");
  const studies = await getCaseStudies('it');
  return studies.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyPageIT({ params }: Props) {
  const { slug } = await params;
  const [study, related] = await Promise.all([
    getCaseStudy(slug, 'it'),
    getCaseStudy(slug, 'it').then((s) =>
      s ? getRelatedCaseStudies(slug, s.industry, 'it') : []
    ),
  ]);

  if (!study) notFound();

  const IconComponent = ICON_MAP[study.icon] ?? Clock;
  const industryColor =
    INDUSTRY_COLORS[study.industry] ?? "bg-primary/10 text-primary";

  return (
    <MainLayout>
      {/* Back link + header */}
      <section className="py-12 sm:py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground">
              <Link href="/it/use-cases">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Casi d&apos;Uso
              </Link>
            </Button>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${industryColor}`}>
                {study.industry}
              </span>
              <span className="text-xs text-muted-foreground">{study.automationType}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
              {study.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{study.challenge}</p>
          </div>
        </div>
      </section>

      {/* Opening stat */}
      {study.openingStat && (
        <section className="py-8 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight">{study.openingStat}</p>
            </div>
          </div>
        </section>
      )}

      {/* Hero image */}
      {study.image && (
        <div className="relative w-full aspect-[21/9] max-h-[400px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Client profile */}
      {study.clientProfile && (
        <section className="py-6 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <UserCheck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Profilo Cliente</p>
                  <p className="text-sm font-medium">{study.clientProfile}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Metric bar */}
      <section className="py-10 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{study.keyMetric}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{study.metricDetail}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Settore</p>
                  <p className="text-sm font-semibold">{study.industry}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 border">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Tipo di Automazione</p>
                  <p className="text-sm font-semibold">{study.automationType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case study body */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-ul:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground"
              dangerouslySetInnerHTML={{ __html: study.content }}
            />
          </div>
        </div>
      </section>

      {/* Timeline + Investment */}
      {(study.timeline || study.investment) && (
        <section className="py-10 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className={`grid grid-cols-1 gap-4 ${study.timeline && study.investment ? "sm:grid-cols-2" : ""}`}>
                {study.timeline && (
                  <div className="p-5 rounded-xl bg-muted/50 border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Tempistiche</p>
                    <p className="text-lg font-bold">{study.timeline}</p>
                  </div>
                )}
                {study.investment && (
                  <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Investimento</p>
                    <p className="text-lg font-bold">{study.investment}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Client quote */}
      {study.clientQuote && (
        <section className="py-10 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <blockquote className="relative p-6 sm:p-8 rounded-2xl bg-muted/30 border border-primary/10">
                <div className="text-5xl text-primary/20 font-serif leading-none absolute top-4 left-6">&ldquo;</div>
                <p className="text-lg sm:text-xl font-medium italic text-foreground leading-relaxed pt-6">
                  {study.clientQuote}
                </p>
                {study.clientQuoteAuthor && (
                  <footer className="mt-4 text-sm text-muted-foreground font-medium">
                    &mdash; {study.clientQuoteAuthor}
                  </footer>
                )}
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* Related case studies */}
      {related.length > 0 && (
        <section className="py-16 border-t bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-bold mb-8">Altri Casi Studio</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {related.map((s) => {
                  const RelatedIcon = ICON_MAP[s.icon] ?? Clock;
                  const relatedColor =
                    INDUSTRY_COLORS[s.industry] ?? "bg-primary/10 text-primary";
                  return (
                    <Card
                      key={s.slug}
                      className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                            <RelatedIcon className="h-4 w-4 text-primary" />
                          </div>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${relatedColor}`}>
                            {s.industry}
                          </span>
                        </div>
                        <CardTitle className="text-base">{s.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {s.challenge}
                        </p>
                        <Button asChild variant="ghost" size="sm" className="-ml-2 group-hover:text-primary">
                          <Link href={`/it/use-cases/${s.slug}`}>
                            Leggi il caso studio <ArrowRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </CardContent>
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent" />
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <UseCasesCTAIT />
    </MainLayout>
  );
}
