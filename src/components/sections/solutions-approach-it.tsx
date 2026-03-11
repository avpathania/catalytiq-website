import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SOLUTIONS_APPROACH_IT } from "@/lib/constants";

export function SolutionsApproachIT() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Il Nostro Approccio
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Non Solo Strumenti. Soluzioni Su Misura.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            In CatalytIQ Systems, non vendiamo strumenti preconfezionati o automazioni standard. Ogni soluzione che progettiamo inizia con la comprensione dei tuoi obiettivi aziendali. Il nostro approccio di consulenza strategica garantisce che ciò che costruiamo sia allineato con il tuo modo di lavorare e con ciò che offre il maggior ROI.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {SOLUTIONS_APPROACH_IT.map((step, index) => (
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
                {index < SOLUTIONS_APPROACH_IT.length - 1 && (
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