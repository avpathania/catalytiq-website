import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookDemoButton } from "@/components/forms/book-demo-button";

export function SolutionsCTA() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="rounded-lg bg-primary/5 p-8 sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Start With One Workflow
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              You don't need to automate everything at once. We help you choose one high-impact workflow, show you fast results, and grow from there.
            </p>
            <BookDemoButton size="lg">
              <span className="flex items-center gap-2">
                Book a Free Consultation
                <ArrowRight className="h-4 w-4" />
              </span>
            </BookDemoButton>
          </div>
        </div>
      </div>
    </section>
  );
}