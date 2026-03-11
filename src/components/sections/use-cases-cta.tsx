import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookDemoButton } from "@/components/forms/book-demo-button";

export function UseCasesCTA() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-secondary/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>

                {/* Headline */}
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                  Let's Explore Your Use Case
                </h2>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Every business has inefficiencies. We help you turn them into streamlined, smart workflows using AI and automation—designed around how you already work.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <BookDemoButton size="lg" className="min-w-[200px]">
                    <span className="inline-flex items-center gap-2">
                      Book a Free Consultation
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </BookDemoButton>
                  
                  <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                    <Link href="/solutions">
                      View Our Solutions
                    </Link>
                  </Button>
                </div>

                {/* Additional info */}
                <div className="mt-8 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Free consultation</span> • <span className="font-medium">No commitment</span> • <span className="font-medium">Tailored to your business</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}