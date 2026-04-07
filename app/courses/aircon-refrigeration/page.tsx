import React, { Suspense } from "react";
import type { Metadata } from "next";
import CoursesPackage from "../sections/coursesPackage";
import Session from "../sections/session";
import Contact from "@/app/features/homepage/contact";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import { headerQuery } from "@/lib/queries/navigation";
import { categoriseFromHeader } from "@/lib/course-categories";
import type { CourseCardData } from "@/lib/course-categories";
import type { HeaderData } from "@/types/header";

export const metadata: Metadata = {
  title: "Air Conditioning & Refrigeration Courses",
  description:
    "Comprehensive HVAC and refrigeration training from F-Gas certification to total air conditioning packages. Learn from industry experts with hands-on practical experience at accredited facilities.",
  alternates: { canonical: "https://www.learntechnique.com/courses/aircon-refrigeration" },
  openGraph: {
    title: "Air Conditioning & Refrigeration Courses | Technique Learning Solutions",
    description:
      "F-Gas certification and HVAC training with hands-on practical experience.",
    url: "https://www.learntechnique.com/courses/aircon-refrigeration",
  },
};

export default async function AirconRefrigerationCoursesPage() {
  const [allCourses, headerData] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch<HeaderData>(headerQuery),
  ]);
  const grouped = categoriseFromHeader(
    headerData.megaMenuColumns,
    allCourses,
    "aircon-refrigeration",
  );

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad className="relative z-0">
        <HeroSection
          title="Air Conditioning & Refrigeration Courses"
          description="Comprehensive HVAC and refrigeration training from F-Gas certification to total air conditioning packages. Learn from industry experts with hands-on practical experience."
        />
      </AnimatedSection>
      <Suspense>
        <CoursesPackage category="aircon-refrigeration" grouped={grouped} />
      </Suspense>
      <Session />
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>
    </main>
  );
}
