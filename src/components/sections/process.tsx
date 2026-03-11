import { DollarSign, Target, BarChart3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimateOnScroll, StaggerContainer, HoverCard, HoverIcon } from "@/components/ui";
import { AUTOMATION_AREAS_NEW } from "@/lib/constants";

const iconMap = {
  DollarSign,
  Target,
  BarChart3,
};

export function Process() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll animation="slideUp" threshold={0.2}>
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">
              What We Automate
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Automation That Starts With Strategy
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              With decades of experience in finance, marketing, and operations, we know where automation makes a measurable difference.
            </p>
          </div>
        </AnimateOnScroll>

        <div className="mx-auto mt-16 max-w-4xl">
          <StaggerContainer
            className="grid gap-8 md:grid-cols-3"
            staggerDelay={0.2}
            threshold={0.1}
          >
            {AUTOMATION_AREAS_NEW.map((area, index) => {
              const IconComponent = iconMap[area.icon as keyof typeof iconMap];
              
              return (
                <HoverCard key={index} liftDistance={-6}>
                  <Card className="border-0 bg-background/80 backdrop-blur-sm text-center h-full">
                    <CardHeader>
                      <HoverIcon animation="scale" className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
                      </HoverIcon>
                      <CardTitle className="text-xl">{area.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{area.description}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}