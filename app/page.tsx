import type { Metadata } from "next";
import Hero from "./features/homepage/hero";
import Stages from "./features/homepage/stages";
import TradeCourses from "./features/homepage/tradeCourses";
import Courses from "./features/homepage/courses";
import Location from "./features/homepage/location";
import Brochure from "./features/homepage/brochure";
import Ratings from "./features/homepage/ratings";
import Certification from "./features/homepage/certification";
import CampaignBanner from "./features/homepage/campaignBanner";
import Contact from "./features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import { PATHWAYS_PAGE_QUERY } from "@/lib/queries/pathway";
import type { CourseCardData } from "@/lib/course-categories";
import { pickPopularCourses } from "@/lib/constants/popular-courses";
import type { PathwayModalItem } from "@/components/course-search-modal";
import BookASession from "./courses/sections/session";

export const metadata: Metadata = {
  title: "Learn Technique | Expert-Led Electrical & Trade Training",
  description:
    "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities. City & Guilds and EAL accredited programmes with training centres in Chesterfield and Stirling. Career-changing courses for beginners and experienced professionals.",
  alternates: { canonical: "https://www.learntechnique.com" },
  openGraph: {
    title: "Learn Technique | Expert-Led Electrical & Trade Training",
    description:
      "Industry-recognised electrical, HVAC, and PLC trade courses at world-class facilities. Accredited programmes to advance your career.",
    url: "https://www.learntechnique.com",
  },
};

export default async function Home() {
  const [allCourses, pathwaysPage] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch(PATHWAYS_PAGE_QUERY).catch(() => null),
  ]);
  const popularCourses = pickPopularCourses(allCourses);

  const pathwayItems: PathwayModalItem[] = (pathwaysPage?.pathways ?? [])
    .filter((p: any) => p.pathway?.slug && p.pathway?.title)
    .map((p: any) => ({
      title: p.pathway.title,
      slug: p.pathway.slug,
      heroImage: p.pathway.heroImage ?? null,
      priceIncVat: p.pathway.priceIncVat ?? null,
      duration: p.pathway.duration ?? null,
      badge: p.badge ?? "",
      href: p.href ?? `/pathways/${p.pathway.slug}`,
    }));

  return (
    <main className="overflow-hidden">
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <Hero
          courses={allCourses}
          popularCourses={popularCourses}
          pathways={pathwayItems}
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Stages />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <TradeCourses />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Courses courses={popularCourses} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <Brochure />
      </AnimatedSection>
      <AnimatedSection variant="fade-left">
        <Certification />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CampaignBanner />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <BookASession />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
