import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookDemoButtonIT } from "@/components/forms/book-demo-button-it";

export function SolutionsCTAIT() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-lg bg-primary/5 p-8 sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Inizia con un Flusso di Lavoro
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Non devi automatizzare tutto in una volta. Ti aiutiamo a scegliere un flusso di lavoro ad alto impatto, ti mostriamo risultati rapidi e cresciamo da lì.
            </p>
            <BookDemoButtonIT size="lg">
              <span className="flex items-center gap-2">
                Prenota una Consulenza Gratuita
                <ArrowRight className="h-4 w-4" />
              </span>
            </BookDemoButtonIT>
          </div>
        </div>
      </div>
    </section>
  );
}