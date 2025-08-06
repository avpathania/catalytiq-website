"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { AnimateOnScroll, HoverButton } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <AnimateOnScroll animation="slideDown" delay={0}>
            <Badge variant="outline" className="mb-6">
              Strategic Automation Advisory
            </Badge>
          </AnimateOnScroll>

          {/* Main Headline */}
          <AnimateOnScroll animation="slideUp" delay={200}>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Automate What Matters.{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Grow What Counts.
              </span>
            </h1>
          </AnimateOnScroll>

          {/* Subheadline */}
          <AnimateOnScroll animation="slideUp" delay={400}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              CatalytIQ Systems combines decades of business expertise with powerful AI automation to help SMEs grow smarter — through finance, marketing, operations, and strategy.
            </p>
          </AnimateOnScroll>

          {/* CTA Buttons */}
          <AnimateOnScroll animation="slideUp" delay={600}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <HoverButton>
                <BookDemoButton size="lg" className="w-full sm:w-auto">
                  <span className="flex items-center gap-2">
                    Book Your Free Demo
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </BookDemoButton>
              </HoverButton>
              
              <HoverButton>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Link href="/use-cases" className="flex items-center gap-2">
                    See Use Cases
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </HoverButton>
            </div>
          </AnimateOnScroll>

          {/* Social Proof - DISABLED */}
          {/* <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Trusted by growing SMEs across industries
            </p>
            <div className="flex items-center gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-muted"></div>
                <span className="text-sm font-medium">TechCorp</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-muted"></div>
                <span className="text-sm font-medium">InnovateLtd</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-muted"></div>
                <span className="text-sm font-medium">GrowthCo</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}