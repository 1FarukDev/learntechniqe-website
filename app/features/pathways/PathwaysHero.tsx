import React from "react";
import HeroSection from "@/app/shared/heroBackground";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PathwaysHeroProps {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
}

export function PathwaysHero({
  title,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  ctaSecondaryHref,
}: PathwaysHeroProps) {
  return (
    <section className="relative">
      <HeroSection
        title={title}
        description={
          <>
            <span className="block text-lg font-medium">{subtitle}</span>
            {description}
          </>
        }
      />

    </section>
  );
}
