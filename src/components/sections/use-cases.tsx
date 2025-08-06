import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { USE_CASES } from "@/lib/constants";

export function UseCases() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Real-World Use Cases
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real Business Problems. Real Results.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            {USE_CASES.map((useCase, index) => (
              <Card key={index} className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </p>
                </CardContent>
                
                {/* Background gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent"></div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p className="text-lg text-muted-foreground">
            Want to see more automation scenarios?
          </p>
          <div className="mt-6">
            <Link
              href="/use-cases"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              See All Scenarios
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}