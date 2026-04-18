import { notFound, redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/elearning/session";
import {
  FREE_COURSE,
  getCourseBySlug,
  isFreeCourse,
} from "@/lib/elearning/catalog";
import { LearnerTopBar } from "../../LearnerTopBar";
import { CoursePlayer } from "./CoursePlayer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePlayerPage({ params }: PageProps) {
  const { slug } = await params;
  const learner = await getCurrentLearner();
  if (!learner) {
    redirect(`/learn/login?next=/learn/courses/${encodeURIComponent(slug)}`);
  }

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  if (!isFreeCourse(slug)) {
    // Locked courses are dashboard-only — bounce back rather than 404 so the
    // learner isn't confused if they bookmark a locked slug.
    redirect("/learn/dashboard");
  }

  const fullName =
    [learner.firstName, learner.lastName].filter(Boolean).join(" ") ||
    learner.email;

  return (
    <>
      <LearnerTopBar learnerName={fullName} learnerEmail={learner.email} />
      <CoursePlayer
        courseSlug={course.slug}
        courseTitle={course.title}
        courseDuration={course.duration}
        learnerFullName={fullName}
        learnerFirstName={learner.firstName || "Learner"}
        alreadyCompleted={Boolean(learner.completedAt)}
        scormEntryUrl={`/elearning/${FREE_COURSE.slug}/index.html`}
      />
    </>
  );
}
