import React from "react";
import { AnimatedSection } from "@/components/animated-section";
import { PathwaysHero } from "../features/pathways/PathwaysHero";
import { PathwaysComparisonTable } from "../features/pathways/PathwaysComparisonTable";
import { PathwayCardsGrid } from "../features/pathways/PathwayCardsGrid";
import { PathwaysProcess } from "../features/pathways/PathwaysProcess";
import { PathwaysCalculatorSticky } from "../features/pathways/PathwaysCalculatorSticky";

import pathwaysData from "@/data/pathways.json";
import Location from "../features/homepage/location";
import Contact from "../features/homepage/contact";

export const metadata = {
  title: "Electrical Career Pathways | Technique Learning Solutions",
  description:
    "Explore our electrical career pathways. Whether you're new to the industry or an experienced professional, we have a pathway to suit your requirements.",
};

type PathwaysData = {
  page: {
    hero: { title: string; subtitle: string; description: string; ctaPrimary: string; ctaSecondary: string; ctaSecondaryHref: string };
    comparison: { title: string; description: string; disclaimer: string };
    process: { title: string; subtitle: string; items: string[] };
    cta: { title: string; headline: string; description: string; benefits: string[]; buttonText: string; pathwayHref: string };
  };
  calculator: {
    courses: Array<{ id: string; name: string; priceIncVat: number; paymentPlanAvailable: boolean }>;
    platinumUpgrade: { name: string; priceIncVat: number; description: string };
  };
  pathways: Array<{
    id: string; image?: string; title: string; badge: string; description: string; href: string; external?: boolean;
    eligibility: string[]; attendance: string; exams: string; duration: string; location: string;
    priceExVat: number; priceIncVat: number; paymentPlan: boolean; deposit: number;
    monthlyInstalment: number; instalments: number;
  }>;
};

export default function PathwaysPage() {
  const { page, pathways, calculator } = pathwaysData as PathwaysData;

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <PathwaysHero {...page.hero} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <PathwaysComparisonTable
          pathways={pathways}
          {...page.comparison}
        />
      </AnimatedSection>

      <PathwaysCalculatorSticky
        courses={calculator.courses}
        platinumUpgrade={calculator.platinumUpgrade}
      />
      <AnimatedSection variant="fade-up">
        <PathwayCardsGrid pathways={pathways} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <PathwaysProcess {...page.process} />
      </AnimatedSection>

      <AnimatedSection variant="fade-in">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="fade-in">
        <Contact />
      </AnimatedSection>


    </main>
  );
}
