import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookDemoButton } from "@/components/forms/book-demo-button";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaHref?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumb,
  showCta = false,
  ctaText = "Book a Free Demo",
  ctaHref = "/book-demo",
}: PageHeaderProps) {
  return (
    <section className="relative py-16 sm:py-20 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          
          {/* Optional Breadcrumbs */}
          {breadcrumb && (
            <nav className="mb-6">
              <Badge variant="outline" className="text-xs">
                {breadcrumb}
              </Badge>
            </nav>
          )}
          
          {/* Main Page Title */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          
          {/* Subtitle/Description */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Optional CTA */}
          {showCta && (
            <div className="mt-8">
              <BookDemoButton size="lg">
                <span className="flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </BookDemoButton>
            </div>
          )}
          
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[400px] w-[400px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}