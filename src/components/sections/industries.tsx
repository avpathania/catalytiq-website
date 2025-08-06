import Link from "next/link";
import { Factory, Briefcase, Truck, Users, Megaphone, ShoppingBag, ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll, StaggerContainer, HoverCard, HoverIcon } from "@/components/ui";
import { INDUSTRIES_SERVED } from "@/lib/constants";

const iconMap = {
  Factory,
  Briefcase,
  Truck,
  Users,
  Megaphone,
  ShoppingBag,
};

export function Industries() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slideUp" threshold={0.2}>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              Industries We Serve
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Small and Medium Businesses
            </h2>
          </div>
        </AnimateOnScroll>

        <div className="mx-auto mt-16 max-w-4xl">
          <StaggerContainer
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
            threshold={0.1}
          >
            {INDUSTRIES_SERVED.map((industry, index) => {
              const IconComponent = iconMap[industry.icon as keyof typeof iconMap];
              
              return (
                <HoverCard key={index} className="flex items-center gap-4 rounded-lg bg-background/80 p-6 backdrop-blur-sm">
                  <HoverIcon animation="scale" className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                  </HoverIcon>
                  <h3 className="font-medium">{industry.name}</h3>
                </HoverCard>
              );
            })}
          </StaggerContainer>
        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll animation="slideUp" delay={300} threshold={0.3}>
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <p className="text-lg text-muted-foreground">
              Don't see your industry? We work with businesses across all sectors.
            </p>
            <div className="mt-6">
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse by Industry
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