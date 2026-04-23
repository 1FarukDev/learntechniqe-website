import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import ClayImage from "@/app/assets/png/clay.png";
import StirlingImage from "@/app/assets/png/striling.jpg";
import { MarkNotFoundForHeader } from "@/app/shared/mark-not-found-header";
import { getPracticalCentres } from "@/lib/practical-assessments-data";

const ELIGIBLE_COURSES = [
  "City & Guilds Inspection & Testing 2391-50",
  "City & Guilds Inspection & Testing 2391-51",
  "City & Guilds Inspection & Testing 2391-52",
  "City & Guilds Inspection & Testing 2392-10",
];

const FALLBACK_CENTRE_IMAGES: Record<string, typeof ClayImage> = {
  chesterfield: ClayImage,
  scotland: StirlingImage,
};

export default async function PracticalAssessmentsPage() {
  const centres = await getPracticalCentres();

  return (
    <main className="min-h-screen bg-[#f3f6f7] pt-28 pb-16">
      <MarkNotFoundForHeader />
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="bg-linear-to-r from-[#0d3b66] to-[#016068] px-6 py-8 sm:px-8 lg:px-10">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              Restricted Access
            </p>
            <h1 className="mt-4 text-3xl sm:text-4xl font-heading font-semibold text-white">
              Protected: Practical Assessments
            </h1>
          </div>

          <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10">
            <div className="space-y-5 text-sm sm:text-base text-zinc-700 leading-relaxed">
            <p>
              This page is for students who have attended one of the following
              courses at any of our centres and would like to book their first
              practical assessment.
            </p>
            <p>
              If you would like to book a resit please call us on{" "}
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
            <ul className="space-y-2 pl-5">
              {ELIGIBLE_COURSES.map((course) => (
                <li key={course} className="list-disc marker:text-[#14AE5C]">
                  {course}
                </li>
              ))}
            </ul>
            <p className="pt-2 text-base font-semibold text-zinc-900">
              Please select which centre you would like, to see a list of
              available dates and times.
            </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {centres.map((centre) => (
                <article
                  key={centre.slug}
                  className="group relative min-h-[280px] overflow-hidden rounded-xl border border-zinc-300 shadow-sm"
                >
                  <Image
                    src={
                      centre.heroImageUrl ??
                      FALLBACK_CENTRE_IMAGES[centre.slug] ??
                      ClayImage
                    }
                    alt={`${centre.shortName} training centre`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-b from-[#0a2e44]/40 via-[#0a2e44]/55 to-[#0a2e44]/90" />

                  <div className="relative flex h-full flex-col justify-between p-5 sm:p-6 text-white">
                    <div>
                      <p className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                        <MapPin size={14} />
                        Training Centre
                      </p>
                      <h2 className="mt-3 text-2xl font-heading font-semibold">
                        {centre.shortName}
                      </h2>
                      <div className="mt-3 text-sm sm:text-base leading-relaxed text-white/95">
                        {(centre.addressLines ?? []).map((line) => (
                          <p key={`${centre.slug}-${line}`}>{line}</p>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/practical-assessments/${centre.slug}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-white/70 bg-white/10 px-4 py-3 text-base font-semibold backdrop-blur-sm transition hover:bg-white/20"
                    >
                      View dates and times
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}