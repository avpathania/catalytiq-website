/**
 * Enhanced intersection observer hook for scroll-triggered animations
 * Extends the existing useIntersectionObserver with animation-specific features
 */

import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from './use-intersection-observer';
import { shouldReduceMotion } from '@/lib/animations';

interface UseAnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  disabled?: boolean;
}

export function useAnimateOnScroll(options: UseAnimateOnScrollOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    delay = 0,
    disabled = false,
  } = options;

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    freezeOnceVisible: triggerOnce,
  });

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Don't animate if disabled, user prefers reduced motion, or already animated
    if (disabled || shouldReduceMotion() || (triggerOnce && hasAnimated)) {
      setShouldAnimate(false);
      return;
    }

    if (isVisible) {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldAnimate(true);
          setHasAnimated(true);
        }, delay);
      } else {
        setShouldAnimate(true);
        setHasAnimated(true);
      }
    } else if (!triggerOnce) {
      setShouldAnimate(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, delay, disabled, triggerOnce, hasAnimated]);

  return {
    ref,
    shouldAnimate,
    isVisible,
    hasAnimated,
  };
}