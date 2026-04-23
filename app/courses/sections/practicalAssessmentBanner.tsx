import Image from "next/image";
import Link from "next/link";
import SessionImage from "@/app/assets/png/session.jpg";
import { Button } from "@/components/ui/button";

function PracticalAssessmentBanner() {
  return (
    <section className="w-full bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          <Image
            src={SessionImage}
            alt="Practical assessment background"
            fill
            className="z-0 object-cover object-center"
            sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 960px, 100vw"
          />
          <div
            className="absolute inset-0 z-10 bg-linear-to-r from-[rgba(13,59,102,0.88)] to-[rgba(1,96,104,0.86)]"
            aria-hidden
          />

          <div className="relative z-20 p-6 text-white sm:p-8">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              Practical Assessments
            </p>

            <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
              Ready to book your practical assessment?
            </h2>

            <p className="mt-3 max-w-2xl text-white/90">
              View available centres, dates, and times for your first practical
              assessment.
            </p>

            <div className="mt-6">
              <Button
                asChild
                className="h-12 bg-[#F5A623] px-6 font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#e09410]"
              >
                <Link href="/practical-assessments">
                  Go to practical assessments
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PracticalAssessmentBanner;