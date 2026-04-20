import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { getCurrentLearner } from "@/lib/elearning/session";
import {
  canLearnerAccessCourse,
  listCoursesOrdered,
  resolveHeroCourseForLearner,
  rowToCatalogCourse,
} from "@/lib/elearning/courses";
import { learnerCompletedCourse } from "@/lib/elearning/learners";
import { LearnerTopBar } from "../LearnerTopBar";

export const dynamic = "force-dynamic";

export default async function LearnerDashboardPage() {
  const learner = await getCurrentLearner();
  if (!learner) {
    redirect("/learn/login?next=/learn/dashboard");
  }

  const hero = await resolveHeroCourseForLearner(learner);
  const heroCompleted = hero
    ? await learnerCompletedCourse(learner.id, hero.dbId)
    : false;

  const catalogRows = await listCoursesOrdered();
  const secondaryRows = hero
    ? catalogRows.filter((r) => r.slug !== hero.slug)
    : catalogRows;

  const firstName = learner.firstName?.trim() || "there";

  return (
    <>
      <LearnerTopBar
        learnerName={
          [learner.firstName, learner.lastName].filter(Boolean).join(" ") ||
          learner.email
        }
        learnerEmail={learner.email}
      />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <header className="mb-10 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#016068]">
            Your learner dashboard
          </p>
          <h1 className="mt-3 font-heading text-3xl md:text-4xl tracking-tight text-zinc-900">
            Welcome, {firstName}.
          </h1>
          <p className="mt-3 text-sm md:text-base text-zinc-500 max-w-2xl">
            Your courses are listed below. Start where you left off, or explore
            more from our catalogue.
          </p>
        </header>

        {hero && (
          <section className="mb-14">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-3">
              Featured for you
            </h2>
            <article
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${hero.accentClass} text-white shadow-[0_20px_60px_-20px_rgba(1,96,104,0.45)]`}
            >
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_15%_15%,white,transparent_55%)]" />
              <div className="absolute -bottom-16 -right-16 size-64 rounded-full bg-white/10 blur-2xl" />
              <div className="relative z-10 p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-semibold tracking-wide uppercase">
                    <Sparkles size={13} strokeWidth={2.4} />
                    {hero.tag}
                  </div>
                  <h3 className="mt-5 font-heading text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
                    {hero.title}
                  </h3>
                  <p className="mt-4 text-white/85 text-sm md:text-[15px] leading-relaxed max-w-xl">
                    {hero.tagline}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-5 text-xs md:text-sm text-white/80">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={15} strokeWidth={2.25} />
                      {hero.duration}
                    </span>
                    {heroCompleted && (
                      <span className="inline-flex items-center gap-1.5 text-white">
                        <CheckCircle2 size={15} strokeWidth={2.25} />
                        Completed
                      </span>
                    )}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={`/learn/courses/${hero.slug}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#016068] shadow-lg shadow-black/20 hover:bg-zinc-100 active:scale-[0.99] transition"
                    >
                      <PlayCircle size={16} strokeWidth={2.4} />
                      {heroCompleted ? "Revisit course" : "Start course"}
                    </Link>
                    {heroCompleted && (
                      <Link
                        href={`/learn/certificate/${hero.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 active:scale-[0.99] transition"
                      >
                        <Award size={16} strokeWidth={2.4} />
                        Download certificate
                      </Link>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex shrink-0 w-56 aspect-square items-center justify-center rounded-2xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-24 opacity-90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={hero.iconPath} />
                  </svg>
                </div>
              </div>
            </article>
          </section>
        )}

        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Catalogue
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                Teaser courses are locked; your assigned and open courses are
                playable.
              </p>
            </div>
            <Link
              href="/courses"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[#016068] hover:text-[#014d54] transition"
            >
              See all courses
              <ArrowUpRight size={14} strokeWidth={2.25} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {secondaryRows.map((row) => {
              const course = rowToCatalogCourse(row);
              const access = canLearnerAccessCourse(learner, row);
              const locked = row.is_catalog_teaser || !access;
              const playable = access && !row.is_catalog_teaser;

              return (
                <article
                  key={row.slug}
                  className="group relative overflow-hidden rounded-2xl bg-white border border-zinc-200 p-6 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${course.accentClass} opacity-70`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${course.accentClass} text-white shadow-md shadow-black/10`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d={course.iconPath} />
                      </svg>
                    </div>
                    {locked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase text-zinc-500 bg-zinc-100 border border-zinc-200 rounded-full px-2.5 py-1">
                        <Lock size={11} strokeWidth={2.4} />
                        Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">
                        Open
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-semibold text-[15px] text-zinc-900 leading-snug">
                    {course.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-500 leading-relaxed line-clamp-3">
                    {course.tagline}
                  </p>
                  <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-zinc-400 font-medium">
                      <Clock size={11} strokeWidth={2.4} />
                      {course.duration}
                    </span>
                    <span className="font-semibold text-zinc-500">
                      {course.tag}
                    </span>
                  </div>
                  {playable && (
                    <Link
                      href={`/learn/courses/${row.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#016068] hover:text-[#014d54]"
                    >
                      <PlayCircle size={14} />
                      Launch course
                    </Link>
                  )}
                </article>
              );
            })}
          </div>

          <aside className="mt-10 rounded-2xl border border-[#016068]/15 bg-gradient-to-br from-white via-white to-[#ECF5F6] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#016068]">
                Ready for the next step?
              </p>
              <h3 className="mt-2 font-heading text-xl md:text-2xl tracking-tight text-zinc-900">
                Continue your training at a Learn Technique centre.
              </h3>
              <p className="mt-2 text-sm text-zinc-500 max-w-2xl leading-relaxed">
                We run accredited short courses, apprenticeships and career
                pathways at our Chesterfield and Stirling centres. Because
                you&rsquo;ve started with us, speak to our team about
                preferential rates on your first paid course.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#016068] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#014d54] active:scale-[0.99] transition"
              >
                Browse courses
                <ArrowUpRight size={15} strokeWidth={2.4} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:border-zinc-300 transition"
              >
                Talk to our team
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
