import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CademyBookingIframe } from "@/app/features/courseDetails/CademyBookingIframe";
import { MarkNotFoundForHeader } from "@/app/shared/mark-not-found-header";
import { getPracticalAssessment } from "@/lib/practical-assessments-data";

export default async function PracticalAssessmentEmbedPage({
  params,
}: {
  params: Promise<{ centre: string; assessment: string }>;
}) {
  const { centre: centreSlug, assessment: assessmentSlug } = await params;
  const found = await getPracticalAssessment(centreSlug, assessmentSlug);

  if (!found) {
    notFound();
  }

  const { centre, assessment } = found;

  return (
    <main className="min-h-screen bg-[#f3f6f7] pt-28 pb-16">
      <MarkNotFoundForHeader />
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-[#0d3b66] to-[#016068] px-6 py-7 sm:px-8 lg:px-10">
            <h1 className="text-2xl sm:text-3xl font-heading font-semibold text-white">
              {centre.shortName} Practical Assessments
            </h1>
          </div>

          <div className="px-6 pb-8 pt-8 sm:px-8 lg:px-10">
            <Link
              href={`/practical-assessments/${centre.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#016068] hover:underline"
            >
              <ArrowLeft size={16} />
              Back
            </Link>

            <h2 className="mt-4 text-3xl font-heading font-semibold text-zinc-900">
              {assessment.label}
            </h2>

            <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-2 sm:p-4">
              {assessment.embedUrl ? (
                <CademyBookingIframe
                  src={assessment.embedUrl}
                  title={`${assessment.label} booking calendar`}
                />
              ) : (
                <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 px-6 py-12 text-center">
                  <p className="text-sm sm:text-base text-zinc-700">
                    Booking embed link not configured for this assessment yet.
                  </p>
                  <p className="mt-2 text-sm text-zinc-600">
                    Add the relevant{" "}
                    <code className="rounded bg-zinc-200 px-1 py-0.5 text-xs">
                      PRACTICAL_CADEMY_*_EMBED_URL
                    </code>{" "}
                    variable to your environment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
