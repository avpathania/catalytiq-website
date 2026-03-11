import { Brain, Clock, TrendingUp, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll, StaggerContainer, HoverCard, HoverIcon } from "@/components/ui";
import { WHY_CATALYTIQ } from "@/lib/constants";

const iconMap = {
  Brain,
  Clock,
  TrendingUp,
  BarChart3,
};

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slideUp" threshold={0.2}>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Why CatalytIQ Systems?
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              We Don't Just Automate — We Advise.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We're not here to throw tools at your problems. We help you figure out <em>what</em> to automate — and <em>why</em>.
            </p>
          </div>
        </AnimateOnScroll>

        <StaggerContainer
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2"
          staggerDelay={0.15}
          threshold={0.1}
        >
          {WHY_CATALYTIQ.map((point, index) => {
            const IconComponent = iconMap[point.icon as keyof typeof iconMap];
            
            return (
              <HoverCard key={index} className="flex items-center gap-4 rounded-lg bg-card/50 p-6 backdrop-blur-sm">
                <HoverIcon animation="scale" className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                </HoverIcon>
                <p className="text-lg font-medium">{point.title}</p>
              </HoverCard>
            );
          })}
        </StaggerContainer>

        {/* Bottom CTA */}
        <AnimateOnScroll animation="slideUp" delay={300} threshold={0.3}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-lg text-muted-foreground">
              Ready to see how we can help your business?
            </p>
            <div className="mt-6">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Our Solutions
                <HoverIcon animation="rotate">
                  <ArrowRight className="h-4 w-4" />
                </HoverIcon>
              </Link>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}