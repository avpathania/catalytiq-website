/**
 * Animation Configuration System
 * Centralized animation presets, timings, and utilities for consistent animations across the app
 */

import { Variants, Transition } from "framer-motion";

// Animation durations in milliseconds
export const DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// Easing presets for different animation types
export const EASINGS = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
} as const;

// Stagger delays for sequential animations
export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
  slower: 0.2,
} as const;

// Common transition presets
export const TRANSITIONS = {
  smooth: {
    duration: DURATIONS.normal,
    ease: EASINGS.smooth,
  },
  bounce: {
    duration: DURATIONS.slow,
    ease: EASINGS.bounce,
  },
  sharp: {
    duration: DURATIONS.fast,
    ease: EASINGS.sharp,
  },
  elastic: {
    duration: DURATIONS.slower,
    ease: EASINGS.elastic,
  },
} as const;

// Fade animation variants
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: TRANSITIONS.smooth,
  },
};

// Slide up animation variants
export const slideUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Slide down animation variants
export const slideDownVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Slide left animation variants
export const slideLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Slide right animation variants
export const slideRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Scale animation variants
export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: TRANSITIONS.elastic,
  },
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.normal,
    },
  },
};

// Stagger item variants
export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.smooth,
  },
};

// Hover scale variants
export const hoverScaleVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: TRANSITIONS.sharp,
  },
  tap: {
    scale: 0.95,
    transition: TRANSITIONS.sharp,
  },
};

// Button hover variants
export const buttonHoverVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: TRANSITIONS.sharp,
  },
  tap: {
    scale: 0.98,
    transition: TRANSITIONS.sharp,
  },
};

// Card hover variants
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  hover: {
    y: -4,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
    transition: TRANSITIONS.smooth,
  },
};

// Icon rotation variants
export const iconRotateVariants: Variants = {
  rest: {
    rotate: 0,
  },
  hover: {
    rotate: 360,
    transition: {
      duration: DURATIONS.slow,
      ease: EASINGS.smooth,
    },
  },
};

// Page transition variants
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: TRANSITIONS.smooth,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: TRANSITIONS.sharp,
  },
};

// Utility function to create custom stagger variants
export const createStaggerVariants = (
  staggerDelay: number = STAGGER.normal,
  itemVariants: Variants = staggerItemVariants
) => ({
  container: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  },
  item: itemVariants,
});

// Utility function to create custom slide variants
export const createSlideVariants = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30
) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance };
      case 'down':
        return { y: -distance };
      case 'left':
        return { x: distance };
      case 'right':
        return { x: -distance };
    }
  };

  return {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: TRANSITIONS.smooth,
    },
  };
};

// Utility function to check if user prefers reduced motion
export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Utility function to get reduced motion variants
export const getReducedMotionVariants = (variants: Variants): Variants => {
  if (shouldReduceMotion()) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0 } },
    };
  }
  return variants;
};