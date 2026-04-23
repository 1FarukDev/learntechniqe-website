import Link from "next/link";
import { Button } from "@/components/ui/button";

function PracticalAssessmentBanner() {
  return (
    <section className="w-full bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-linear-to-r from-[#0d3b66] to-[#016068] p-6 text-white shadow-sm sm:p-8">
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
    </section>
  );
}

export default PracticalAssessmentBanner;
