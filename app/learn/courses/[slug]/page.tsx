import { redirect } from "next/navigation";
import { getCurrentLearner } from "@/lib/elearning/session";
import {
  canLearnerAccessCourse,
  getCourseRowBySlug,
  getLaunchUrlForCourse,
} from "@/lib/elearning/courses";
import { learnerCompletedCourse } from "@/lib/elearning/learners";
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

  const row = await getCourseRowBySlug(slug);
  if (!row || !canLearnerAccessCourse(learner, row)) {
    redirect("/learn/dashboard");
  }

  const launchUrl = getLaunchUrlForCourse(row);
  const completed = await learnerCompletedCourse(learner.id, row.id);

  const fullName =
    [learner.firstName, learner.lastName].filter(Boolean).join(" ") ||
    learner.email;

  return (
    <>
      <LearnerTopBar learnerName={fullName} learnerEmail={learner.email} />
      <CoursePlayer
        courseSlug={row.slug}
        courseTitle={row.title}
        courseDuration={row.duration}
        learnerFullName={fullName}
        learnerFirstName={learner.firstName || "Learner"}
        alreadyCompleted={completed}
        scormEntryUrl={launchUrl}
      />
    </>
  );
}
