"use client";

import React, { useEffect, useRef, useState } from "react";

type AnimationVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  /** For above-the-fold content (e.g. Hero) - animates immediately on load */
  visibleOnLoad?: boolean;
}

export function AnimatedSection({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  visibleOnLoad = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(visibleOnLoad);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (visibleOnLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClasses = {
    "fade-up": isVisible
      ? "animate-section-fade-up"
      : "opacity-0 translate-y-12",
    "fade-in": isVisible ? "animate-section-fade-in" : "opacity-0",
    "fade-left": isVisible
      ? "animate-section-fade-left"
      : "opacity-0 -translate-x-8",
    "fade-right": isVisible
      ? "animate-section-fade-right"
      : "opacity-0 translate-x-8",
    scale: isVisible ? "animate-section-scale" : "opacity-0 scale-95",
  };

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${className}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
