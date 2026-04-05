import React from "react";
import { AnimatedSection } from "@/components/animated-section";
import { PathwaysHero } from "../features/pathways/PathwaysHero";
import { PathwaysComparisonTable } from "../features/pathways/PathwaysComparisonTable";
import { PathwayCardsGrid } from "../features/pathways/PathwayCardsGrid";
import { PathwaysProcess } from "../features/pathways/PathwaysProcess";
import { PathwaysCalculatorSticky } from "../features/pathways/PathwaysCalculatorSticky";
import Location from "../features/homepage/location";
import Contact from "../features/homepage/contact";
import { client } from "@/lib/sanity/client";
import { PATHWAYS_PAGE_QUERY } from "@/lib/queries/pathway";

export const metadata = {
  title: "Electrical Career Pathways | Technique Learning Solutions",
  description:
    "Explore our electrical career pathways. Whether you're new to the industry or an experienced professional, we have a pathway to suit your requirements.",
};

type Pathway = {
  id: string;
  image?: string;
  title: string;
  badge: string;
  description: string;
  href: string;
  external?: boolean;
  eligibility: string[];
  attendance: string;
  exams: string;
  duration: string;
  location: string;
  priceExVat: number;
  priceIncVat: number;
  paymentPlan: boolean;
  deposit: number;
  monthlyInstalment: number;
  instalments: number;
};

type Hero = {
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

type Comparison = {
  title: string;
  description: string;
  disclaimer: string;
};

type Process = {
  title: string;
  subtitle: string;
  items: string[];
};

type Course = {
  id: string;
  name: string;
  priceIncVat: number;
  paymentPlanAvailable: boolean;
};

type PlatinumUpgrade = {
  name: string;
  priceIncVat: number;
  description: string;
};

type Calculator = {
  courses: Course[];
  platinumUpgrade: PlatinumUpgrade;
};

type PathwaysPageData = {
  _id: string;
  title: string;
  hero: Hero;
  comparison: Comparison;
  process: Process;
  calculator: Calculator;
  pathways: Pathway[];
};

async function getPathwaysData(): Promise<PathwaysPageData> {
  try {
    const data = await client.fetch(PATHWAYS_PAGE_QUERY);
    return {
      ...data,
      pathways: data.pathways.map((pathway: any) => ({
        ...pathway,
        image: pathway.image?.asset?.url || undefined,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch pathways data:", error);
    throw error;
  }
}

export default async function PathwaysPage() {
  const pageData: PathwaysPageData = await getPathwaysData();

  const hero: Hero = pageData.hero;
  const comparison: Comparison = pageData.comparison;
  const process: Process = pageData.process;
  const calculator: Calculator = pageData.calculator;
  const pathways: Pathway[] = pageData.pathways;

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <PathwaysHero {...hero} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <PathwaysComparisonTable pathways={pathways} {...comparison} />
      </AnimatedSection>

      <PathwaysCalculatorSticky
        courses={calculator.courses}
        platinumUpgrade={calculator.platinumUpgrade}
      />

      <AnimatedSection variant="fade-up">
        <PathwayCardsGrid pathways={pathways} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <PathwaysProcess {...process} />
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
