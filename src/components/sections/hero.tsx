"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookDemoButton } from "@/components/forms/book-demo-button";
import { AnimateOnScroll, HoverButton } from "@/components/ui";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Base dim grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern id="grid-base" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-revealed bright grid */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern id="grid-reveal" offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      {/* Colored orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-primary/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 dark:bg-orange-600/20 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-6 pointer-events-none">
        <AnimateOnScroll animation="slideDown" delay={0}>
          <Badge variant="outline" className="pointer-events-auto">
            Strategic Automation Advisory
          </Badge>
        </AnimateOnScroll>

        <AnimateOnScroll animation="slideUp" delay={200}>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Automate What Matters.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Grow What Counts.
            </span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll animation="slideUp" delay={400}>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            CatalytIQ Systems combines decades of business expertise with powerful AI automation to help SMEs grow smarter — through finance, marketing, operations, and strategy.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll animation="slideUp" delay={600}>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 pointer-events-auto">
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
      </div>
    </section>
  );
}

function GridPattern({
  id,
  offsetX,
  offsetY,
}: {
  id: string;
  offsetX: any;
  offsetY: any;
}) {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
