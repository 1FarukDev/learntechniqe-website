import React from "react";
import type { Metadata } from "next";
import { AnimatedSection } from "@/components/animated-section";
import { PathwaysHero } from "../features/pathways/PathwaysHero";
import { PathwaysComparisonTable } from "../features/pathways/PathwaysComparisonTable";
import { PathwayCardsGrid } from "../features/pathways/PathwayCardsGrid";
import { PathwaysProcess } from "../features/pathways/PathwaysProcess";
import { PathwaysCalculatorSticky } from "../features/pathways/PathwaysCalculatorSticky";
import type { PathwayCalcData } from "../features/pathways/PathwaysCalculatorSticky";
import Location from "../features/homepage/location";
import Contact from "../features/homepage/contact";
import { client } from "@/lib/sanity/client";
import { PATHWAYS_PAGE_QUERY } from "@/lib/queries/pathway";

export const metadata: Metadata = {
  title: "Electrical Career Pathways",
  description:
    "Explore structured electrical career pathways from beginner to professional. Compare packages, calculate costs, and find the perfect route to becoming a qualified electrician with Technique Learning Solutions.",
  alternates: { canonical: "https://www.learntechnique.com/pathways" },
  openGraph: {
    title: "Electrical Career Pathways | Technique Learning Solutions",
    description:
      "Structured pathways to becoming a qualified electrician. Compare packages and find your route.",
    url: "https://www.learntechnique.com/pathways",
  },
};

type Pathway = {
  id: string;
  image?: string;
  title: string;
  badge: string;
  description: string;
  href: string;
  external?: boolean;
  pathway?: {
    title: string;
    slug: string;
    priceIncVat: number | string;
    deposit: number | string;
    paymentPlan: string;
    monthlyInstalment: number | string;
    instalments: number | string;
    [key: string]: any;
  };
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

type PathwaysPageData = {
  _id: string;
  title: string;
  hero: Hero;
  comparison: Comparison;
  process: Process;
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
  const pathways: Pathway[] = pageData.pathways;

  const calculatorPathways: PathwayCalcData[] = pathways
    .filter((p) => p.pathway?.slug && p.pathway?.priceIncVat)
    .map((p) => ({
      title: p.pathway!.title,
      slug: p.pathway!.slug,
      priceIncVat: p.pathway!.priceIncVat,
      deposit: p.pathway!.deposit,
      paymentPlan: p.pathway!.paymentPlan,
      monthlyInstalment: p.pathway!.monthlyInstalment,
      instalments: p.pathway!.instalments,
    }));

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <PathwaysHero {...hero} />
      </AnimatedSection>

      <AnimatedSection variant="fade-up">
        <PathwaysComparisonTable pathways={pathways} {...comparison} />
      </AnimatedSection>

      {calculatorPathways.length > 0 && (
        <PathwaysCalculatorSticky pathways={calculatorPathways} />
      )}

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
