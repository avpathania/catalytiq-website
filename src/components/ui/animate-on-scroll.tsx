/**
 * AnimateOnScroll Component
 * A simplified, more robust wrapper component for scroll-triggered animations
 */

"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { 
  slideUpVariants, 
  fadeVariants, 
  scaleVariants,
  slideLeftVariants,
  slideRightVariants,
  slideDownVariants,
  getReducedMotionVariants 
} from '@/lib/animations';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  variants?: Variants;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
  className?: string;
}

const presetAnimations = {
  fadeIn: fadeVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scale: scaleVariants,
};

export function AnimateOnScroll({
  children,
  animation = 'slideUp',
  variants,
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  triggerOnce = true,
  disabled = false,
  className,
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: triggerOnce,
  });

  // If disabled, just render children without animation
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  // Use custom variants if provided, otherwise use preset animation
  const selectedVariants = variants || presetAnimations[animation];
  const finalVariants = getReducedMotionVariants(selectedVariants);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={finalVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      transition={{ delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}