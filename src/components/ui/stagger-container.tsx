/**
 * StaggerContainer Component
 * A simplified wrapper component for creating staggered animations on child elements
 */

"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { 
  staggerItemVariants,
  getReducedMotionVariants,
  STAGGER
} from '@/lib/animations';

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  itemVariants?: Variants;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = STAGGER.normal,
  itemVariants,
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = true,
  disabled = false,
  className,
}: StaggerContainerProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: triggerOnce,
  });

  // If disabled, just render children without animation
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const finalItemVariants = itemVariants || staggerItemVariants;
  const reducedItemVariants = getReducedMotionVariants(finalItemVariants);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <StaggerItem key={index} variants={reducedItemVariants}>
          {child}
        </StaggerItem>
      ))}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}

export function StaggerItem({ children, variants, className }: StaggerItemProps) {
  const finalVariants = variants || staggerItemVariants;
  const reducedVariants = getReducedMotionVariants(finalVariants);

  return (
    <motion.div variants={reducedVariants} className={className}>
      {children}
    </motion.div>
  );
}