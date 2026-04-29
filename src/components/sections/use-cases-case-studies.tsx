"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, FileText, BarChart3, MessageSquare, UserCheck, Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStudyMeta } from "@/types/case-study";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  FileText,
  BarChart3,
  MessageSquare,
  UserCheck,
  Search,
};

const INDUSTRY_COLORS: Record<string, string> = {
  // English
  Manufacturing: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Finance: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Sales: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Logistics: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Professional Services": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  // Italian
  Manifatturiero: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Amministrazione e Finanza": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Commerciale e Vendite": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Logistica: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Servizi Professionali": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

const UI_STRINGS = {
  en: {
    badge: "Case Studies",
    heading: "Real-World Automation in Action",
    subtitle: "See how businesses use CatalytIQ to eliminate manual work, respond faster, and grow without adding headcount.",
    allFilter: "All",
    cardCta: "Read case study",
  },
  it: {
    badge: "Casi Studio",
    heading: "L'Automazione al Lavoro, Ogni Giorno",
    subtitle: "Scopri come le aziende usano CatalytIQ per eliminare il lavoro manuale, rispondere più velocemente e crescere senza aumentare il personale.",
    allFilter: "Tutti",
    cardCta: "Leggi il caso studio",
  },
};

interface UseCasesCaseStudiesProps {
  caseStudies: CaseStudyMeta[];
  locale?: "en" | "it";
}

export function UseCasesCaseStudies({ caseStudies, locale = "en" }: UseCasesCaseStudiesProps) {
  const strings = UI_STRINGS[locale];
  const basePath = locale === "it" ? "/it/use-cases" : "/use-cases";

  const industries = [strings.allFilter, ...Array.from(new Set(caseStudies.map((s) => s.industry)))];
  const [active, setActive] = useState(strings.allFilter);

  const filtered =
    active === strings.allFilter ? caseStudies : caseStudies.filter((s) => s.industry === active);

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            {strings.badge}
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {strings.heading}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {strings.subtitle}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setActive(industry)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === industry
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((study) => {
              const IconComponent = ICON_MAP[study.icon] ?? Clock;
              const industryColor =
                INDUSTRY_COLORS[study.industry] ?? "bg-primary/10 text-primary";

              return (
                <Card
                  key={study.slug}
                  className="group relative flex flex-col overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors"
                >
                  {study.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={study.image}
                        alt={study.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${industryColor}`}
                      >
                        {study.industry}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 gap-4">
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {study.challenge}
                    </p>
                    <div className="rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">{study.keyMetric}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{study.metricDetail}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm" className="self-start -ml-2 group-hover:text-primary">
                      <Link href={`${basePath}/${study.slug}`}>
                        {strings.cardCta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
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
  );
}
