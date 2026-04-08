import type { Metadata } from "next";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import { PathwayEnquiryForm } from "@/app/features/pathways/PathwayEnquiryForm";
import { PathwaysCalculatorSticky } from "@/app/features/pathways/PathwaysCalculatorSticky";
import type { PathwayCalcData } from "@/app/features/pathways/PathwaysCalculatorSticky";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import { client } from "@/lib/sanity/client";
import {
  PATHWAY_DETAIL_QUERY,
  PATHWAYS_QUERY,
  PATHWAYS_CALC_QUERY,
} from "@/lib/queries/pathway";
import {
  defaultCourseDetailsData,
  defaultCourseHeroData,
} from "@/lib/constants/course";
import { notFound } from "next/navigation";

interface PathwayPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PathwayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathway = await client.fetch(PATHWAY_DETAIL_QUERY, { slug });
  if (!pathway) return {};

  const title = pathway.title ?? "Career Pathway";
  const description =
    Array.isArray(pathway.description) && pathway.description.length > 0
      ? typeof pathway.description[0] === "string"
        ? pathway.description[0]
        : pathway.description[0]?.children?.[0]?.text ?? ""
      : typeof pathway.description === "string"
        ? pathway.description
        : `${title} — structured electrical career pathway at Technique Learning Solutions.`;

  const metaDescription = description.length > 155
    ? `${description.slice(0, 152)}...`
    : description || `${title} — structured career pathway at Technique Learning Solutions.`;

  return {
    title,
    description: metaDescription,
    alternates: { canonical: `https://www.learntechnique.com/pathways/${slug}` },
    openGraph: {
      title: `${title} | Technique Learning Solutions`,
      description: metaDescription,
      url: `https://www.learntechnique.com/pathways/${slug}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const pathways = await client.fetch(PATHWAYS_QUERY);
  return pathways.map((p: any) => ({ slug: p.slug }));
}

async function PathwayDetail({ params }: PathwayPageProps) {
  const { slug } = await params;

  const [rawCourse, allPathways] = await Promise.all([
    client.fetch(PATHWAY_DETAIL_QUERY, { slug }),
    client.fetch<PathwayCalcData[]>(PATHWAYS_CALC_QUERY),
  ]);

  if (!rawCourse) return notFound();

  const heroData = {
    ...defaultCourseHeroData,
    ...rawCourse,
    tags: rawCourse?.tags ?? defaultCourseHeroData.tags,
    description: rawCourse?.description ?? defaultCourseHeroData.description,
    qualifications: rawCourse?.qualifications ?? defaultCourseHeroData.qualifications,
    bookingAvailable: true,
  };

  const detailsSummaryRaw = rawCourse?.detailsSummary;
  const detailsSummary =
    typeof detailsSummaryRaw === "string" && detailsSummaryRaw.trim().length > 0
      ? detailsSummaryRaw.trim()
      : undefined;

  const detailsData = {
    ...defaultCourseDetailsData,
    ...(detailsSummary ? { detailsSummary } : {}),
    courseGoals: rawCourse?.courseGoals ?? defaultCourseDetailsData.courseGoals,
    entryRequirements: rawCourse?.entryRequirements ?? defaultCourseDetailsData.entryRequirements,
    syllabus: rawCourse?.syllabus ?? defaultCourseDetailsData.syllabus,
  };

  const calculatorPathways: PathwayCalcData[] = (allPathways ?? []).filter(
    (p) => p.slug && p.priceIncVat,
  );

  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <CourseHero data={heroData} isPathway />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <CourseDetails data={detailsData} />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <PathwayEnquiryForm
          pathwayName={rawCourse?.title ?? ""}
          pathwaySlug={slug}
          price={rawCourse?.price}
          priceIncVat={rawCourse?.priceIncVat}
          deposit={rawCourse?.deposit}
          paymentPlan={rawCourse?.paymentPlan}
          monthlyInstalment={rawCourse?.monthlyInstalment}
          instalments={rawCourse?.instalments}
        />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Ratings />
      </AnimatedSection>
      <AnimatedSection variant="fade-up">
        <Contact />
      </AnimatedSection>

      {calculatorPathways.length > 0 && (
        <PathwaysCalculatorSticky
          pathways={calculatorPathways}
          initialSlug={slug}
        />
      )}
    </main>
  );
}

export default PathwayDetail;