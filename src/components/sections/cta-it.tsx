import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookDemoButtonIT } from "@/components/forms/book-demo-button-it";
import { HOW_WE_WORK_IT } from "@/lib/constants";

export function CTAIT() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">
            Come Lavoriamo
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Guidati dalle Intuizioni. Potenziati dall'Automazione.
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {HOW_WE_WORK_IT.map((step, index) => (
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
                {index < HOW_WE_WORK_IT.length - 1 && (
                  <div className="absolute top-1/2 -right-4 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <div className="rounded-lg bg-primary/5 p-8">
            <h3 className="text-xl font-semibold mb-2">
              Pronto per iniziare?
            </h3>
            <p className="text-muted-foreground mb-6">
              Prenota una consulenza gratuita e scopri come possiamo trasformare i tuoi processi aziendali.
            </p>
            <BookDemoButtonIT size="lg">
              <span className="flex items-center gap-2">
                Prenota la Tua Demo Gratuita
                <ArrowRight className="h-4 w-4" />
              </span>
            </BookDemoButtonIT>
          </div>
        </div>
      </div>
    </section>
  );
}