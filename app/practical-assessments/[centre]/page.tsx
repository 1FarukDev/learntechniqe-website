import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MarkNotFoundForHeader } from "@/app/shared/mark-not-found-header";
import { getPracticalCentre } from "@/lib/practical-assessments-data";

export default async function PracticalAssessmentsCentrePage({
  params,
}: {
  params: Promise<{ centre: string }>;
}) {
  const { centre: centreSlug } = await params;
  const centre = await getPracticalCentre(centreSlug);

  if (!centre) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f3f6f7] pt-28 pb-16">
      <MarkNotFoundForHeader />
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-[#0d3b66] to-[#016068] px-6 py-8 sm:px-8 lg:px-10">
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white">
              Protected: {centre.title}
            </h1>
          </div>

          <div className="px-6 pb-8 pt-8 sm:px-8 lg:px-10">
            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              This page is for students who have attended one of our courses at
              any of our centres and would like to book their practical
              assessment.
            </p>
            <p className="mt-4 text-sm sm:text-base text-zinc-700 leading-relaxed">
              If you would like to book a resit please ring us on{" "}
              <a
                href="tel:08001123310"
                className="font-semibold text-[#016068] hover:underline"
              >
                0800 112 3310
              </a>{" "}
              or email{" "}
              <a
                href="mailto:info@learntechnique.com"
                className="font-semibold text-[#016068] hover:underline"
              >
                info@learntechnique.com
              </a>
              .
            </p>
            <p className="mt-6 text-base font-semibold text-zinc-900 text-center">
              Please select which type you require to see a list of available
              dates and times.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {centre.assessments.map((item) => (
                <Link
                  key={item.slug}
                  href={`/practical-assessments/${centre.slug}/${item.slug}`}
                  className="inline-flex min-h-[96px] items-center justify-center rounded-md bg-linear-to-b from-[#3f7e89] to-[#1c5d66] px-4 py-4 text-center text-sm font-semibold leading-snug text-white transition hover:brightness-110"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/practical-assessments"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#016068] hover:underline"
              >
                <ArrowLeft size={16} />
                Back to centres
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
