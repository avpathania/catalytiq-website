import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SOLUTIONS_APPROACH } from "@/lib/constants";

export function SolutionsApproach() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Our Approach
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Not Just Tools. Tailored Solutions.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At CatalytIQ Systems, we don't sell prebuilt tools or off-the-shelf automation. Every solution we design begins with understanding your business goals. Our strategic advisory approach ensures that what we build is aligned with how you work and what delivers the greatest ROI.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {SOLUTIONS_APPROACH.map((step, index) => (
              <div key={step.step} className="relative">
                <Card className="h-full border-0 bg-background/80 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector arrow for desktop */}
                {index < SOLUTIONS_APPROACH.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}