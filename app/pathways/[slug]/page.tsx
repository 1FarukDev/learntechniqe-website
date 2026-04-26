import type { Metadata } from "next";
import CourseDetails from "@/app/features/courseDetails/CourseDetails";
import CourseHero from "@/app/features/courseDetails/heroSection";
import { PathwayEnquiryForm } from "@/app/features/pathways/PathwayEnquiryForm";
import { PathwaysCalculatorSticky } from "@/app/features/pathways/PathwaysCalculatorSticky";
import type { PathwayCalcData } from "@/app/features/pathways/PathwaysCalculatorSticky";
import Contact from "@/app/features/homepage/contact";
import Ratings from "@/app/features/homepage/ratings";
import { AnimatedSection } from "@/components/animated-section";
import { cmsFetch } from "@/lib/cms/fetch";
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
import type { CourseDetailsData, CourseHeroData } from "@/lib/types/course";

interface PathwayPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PathwayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathway = await cmsFetch<Record<string, unknown> | null>(
    PATHWAY_DETAIL_QUERY,
    { slug },
  );
  if (!pathway) return {};

  const title = (pathway.title as string | undefined) ?? "Career Pathway";
  const pDesc = pathway.description;
  const description =
    Array.isArray(pDesc) && pDesc.length > 0
      ? typeof pDesc[0] === "string"
        ? pDesc[0]
        : (pDesc[0] as { children?: { text?: string }[] })?.children?.[0]
            ?.text ?? ""
      : typeof pDesc === "string"
        ? pDesc
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
  const pathways = await cmsFetch<{ slug: string }[]>(PATHWAYS_QUERY);
  return pathways.map((p) => ({ slug: p.slug }));
}

async function PathwayDetail({ params }: PathwayPageProps) {
  const { slug } = await params;

  const [rawCourse, allPathways] = await Promise.all([
    cmsFetch<Record<string, unknown> | null>(PATHWAY_DETAIL_QUERY, { slug }),
    cmsFetch<PathwayCalcData[]>(PATHWAYS_CALC_QUERY),
  ]);

  if (!rawCourse) return notFound();

  const raw = rawCourse as unknown as Partial<CourseHeroData> & {
    priceIncVat?: string | number;
    deposit?: string | number;
    paymentPlan?: string;
    monthlyInstalment?: string | number;
    instalments?: string | number;
  };
  const heroData: CourseHeroData = {
    ...defaultCourseHeroData,
    ...raw,
    tags: raw.tags ?? defaultCourseHeroData.tags,
    description: raw.description ?? defaultCourseHeroData.description,
    qualifications: raw.qualifications ?? defaultCourseHeroData.qualifications,
    bookingAvailable: true,
  };

  const detailsSummaryRaw = rawCourse?.detailsSummary;
  const detailsSummary =
    typeof detailsSummaryRaw === "string" && detailsSummaryRaw.trim().length > 0
      ? detailsSummaryRaw.trim()
      : undefined;

  const dr = rawCourse as unknown as Partial<CourseDetailsData>;
  const detailsData: CourseDetailsData = {
    ...defaultCourseDetailsData,
    ...(detailsSummary ? { detailsSummary } : {}),
    courseGoals: dr.courseGoals ?? defaultCourseDetailsData.courseGoals,
    entryRequirements:
      dr.entryRequirements ?? defaultCourseDetailsData.entryRequirements,
    syllabus: dr.syllabus ?? defaultCourseDetailsData.syllabus,
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
          pathwayName={String(raw.title ?? "")}
          pathwaySlug={slug}
          price={raw.price}
          priceIncVat={rawCourse.priceIncVat as string | number | undefined}
          deposit={rawCourse.deposit as string | number | undefined}
          paymentPlan={rawCourse.paymentPlan as string | undefined}
          monthlyInstalment={rawCourse.monthlyInstalment as string | number | undefined}
          instalments={rawCourse.instalments as string | number | undefined}
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