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
import { headerQuery } from "@/lib/queries/navigation";
import { categoriseFromHeader } from "@/lib/course-categories";
import type { CourseCardData } from "@/lib/course-categories";
import type { HeaderData } from "@/types/header";

export default async function Home() {
  const [allCourses, headerData] = await Promise.all([
    client.fetch<CourseCardData[]>(courseCardsQuery),
    client.fetch<HeaderData>(headerQuery),
  ]);

  const electricalGroups = categoriseFromHeader(
    headerData.megaMenuColumns,
    allCourses,
    "electrical",
  );

  const coursePackages =
    electricalGroups.find((g) =>
      g.label.toLowerCase().includes("course package"),
    )?.courses ?? [];
  return (
    <div className="overflow-hidden ">
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <Hero />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Stages />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <TradeCourses />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Courses courses={coursePackages} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Location />
      </AnimatedSection>
      <AnimatedSection variant="scale">
        <Brochure />
      <AnimatedSection variant="fade-left">
        <Certification />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CampaignBanner />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>   </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
   
    </div>
  );
}
