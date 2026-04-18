import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  Heart,
} from "lucide-react";
import { getCurrentLearner } from "@/lib/elearning/session";
import { getCourseBySlug, isFreeCourse } from "@/lib/elearning/catalog";
import { LearnerTopBar } from "../../LearnerTopBar";
import { CertificatePanel } from "./CertificatePanel";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CertificatePage({ params }: PageProps) {
  const { slug } = await params;
  const learner = await getCurrentLearner();
  if (!learner) {
    redirect(`/learn/login?next=/learn/certificate/${encodeURIComponent(slug)}`);
  }

  const course = getCourseBySlug(slug);
  if (!course) notFound();
  if (!isFreeCourse(slug)) redirect("/learn/dashboard");

  if (!learner.completedAt) {
    redirect(`/learn/courses/${slug}`);
  }

  const fullName =
    [learner.firstName, learner.lastName].filter(Boolean).join(" ").trim() ||
    learner.email;

  const completedDate = learner.completedAt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const certificateId = `LT-${String(learner.id).padStart(6, "0")}-${learner.completedAt.getFullYear()}`;

  return (
    <>
      <LearnerTopBar learnerName={fullName} learnerEmail={learner.email} />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="mb-6">
          <Link
            href="/learn/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 hover:text-[#016068] transition"
          >
            <ArrowLeft size={13} strokeWidth={2.4} />
            Back to dashboard
          </Link>
        </div>

        <header className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-emerald-700">
            <BadgeCheck size={13} strokeWidth={2.4} />
            Course completed
          </div>
          <h1 className="mt-4 font-heading text-3xl md:text-4xl tracking-tight text-zinc-900">
            Congratulations, {learner.firstName || "learner"}.
          </h1>
          <p className="mt-3 text-sm md:text-base text-zinc-500 max-w-2xl leading-relaxed">
            You&rsquo;ve completed{" "}
            <strong className="text-zinc-800">{course.title}</strong>. Download
            your certificate below and keep it for your records.
          </p>
          <p className="mt-2 text-xs text-zinc-400 inline-flex items-center gap-1.5">
            <CalendarCheck size={12} strokeWidth={2.4} />
            Completed on {completedDate}
          </p>
        </header>

        <CertificatePanel
          fullName={fullName}
          courseTitle={course.title}
          completedDate={completedDate}
          certificateId={certificateId}
        />

        {/* Loyalty prompt */}
        <aside className="mt-12 rounded-3xl border border-[#016068]/20 bg-gradient-to-br from-white via-white to-[#ECF5F6] p-7 md:p-10 overflow-hidden relative">
          <div className="absolute -top-16 -right-10 size-48 rounded-full bg-[#E99E20]/15 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#E99E20]/15 border border-[#E99E20]/30 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-[#8a5b0c]">
                <Heart size={12} strokeWidth={2.4} />
                A little thank-you
              </div>
              <h2 className="mt-4 font-heading text-2xl md:text-3xl tracking-tight text-zinc-900 leading-tight">
                Because we offered you this course on us,
                <br className="hidden md:block" /> we&rsquo;d love to train you
                again.
              </h2>
              <p className="mt-4 text-sm md:text-[15px] text-zinc-600 leading-relaxed max-w-2xl">
                If you&rsquo;re thinking about taking the next step — whether
                that&rsquo;s our 18th Edition, PAT Testing, F-Gas, or a full
                career pathway — mention this free course to our team and
                we&rsquo;ll look after you with a preferential rate on your
                first paid booking. Your loyalty means a lot to us.
              </p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#016068] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#014d54] active:scale-[0.99] transition"
                >
                  Explore our paid courses
                  <ArrowUpRight size={15} strokeWidth={2.4} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-300 transition"
                >
                  Claim my preferential rate
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
