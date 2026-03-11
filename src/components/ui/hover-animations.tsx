/**
 * Hover Animation Components
 * Reusable components for interactive hover effects
 */

"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  hoverScaleVariants,
  buttonHoverVariants,
  cardHoverVariants,
  iconRotateVariants,
  getReducedMotionVariants
} from '@/lib/animations';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
  disabled?: boolean;
}

export function HoverScale({
  children,
  scale = 1.05,
  className,
  disabled = false
}: HoverScaleProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    rest: { scale: 1 },
    hover: { scale, transition: { duration: 0.2 } },
    tap: { scale: scale * 0.95, transition: { duration: 0.1 } },
  };

  const finalVariants = getReducedMotionVariants(variants);

  return (
    <motion.div
      variants={finalVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variants?: Variants;
}

export function HoverButton({ 
  children, 
  className, 
  disabled = false,
  variants 
}: HoverButtonProps) {
  const finalVariants = disabled 
    ? {} 
    : variants || buttonHoverVariants;

  const reducedVariants = getReducedMotionVariants(finalVariants);

  return (
    <motion.div
      variants={reducedVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  liftDistance?: number;
}

export function HoverCard({
  children,
  className,
  disabled = false,
  liftDistance = -4
}: HoverCardProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    rest: {
      y: 0,
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    hover: {
      y: liftDistance,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const finalVariants = getReducedMotionVariants(variants);

  return (
    <motion.div
      variants={finalVariants}
      initial="rest"
      whileHover="hover"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HoverIconProps {
  children: React.ReactNode;
  animation?: 'rotate' | 'scale' | 'bounce';
  className?: string;
  disabled?: boolean;
}

export function HoverIcon({
  children,
  animation = 'rotate',
  className,
  disabled = false
}: HoverIconProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = (): Variants => {
    switch (animation) {
      case 'rotate':
        return iconRotateVariants;
      case 'scale':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.2, transition: { duration: 0.2 } },
        };
      case 'bounce':
        return {
          rest: { y: 0 },
          hover: {
            y: [-2, 0, -2],
            transition: {
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut" as const
            }
          },
        };
      default:
        return {
          rest: {},
          hover: {},
        };
    }
  };

  const variants = getVariants();
  const finalVariants = getReducedMotionVariants(variants);

  return (
    <motion.div
      variants={finalVariants}
      initial="rest"
      whileHover="hover"
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface PulseProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  intensity?: number;
}

export function Pulse({
  children,
  className,
  disabled = false,
  intensity = 1.05
}: PulseProps) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    pulse: {
      scale: [1, intensity, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const finalVariants = getReducedMotionVariants(variants);

  return (
    <motion.div
      variants={finalVariants}
      animate="pulse"
      className={className}
    >
      {children}
    </motion.div>
  );
}