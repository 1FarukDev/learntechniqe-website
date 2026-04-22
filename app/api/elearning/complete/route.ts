import { NextRequest, NextResponse } from "next/server";
import {
  countLearnerCompletions,
  findLearnerById,
  recordCourseCompletionBySlug,
} from "@/lib/elearning/learners";
import { readLearnerSession } from "@/lib/elearning/session";
import {
  canLearnerAccessCourse,
  getCourseSettings,
  getCourseRowBySlug,
  resolveCourseBySlug,
} from "@/lib/elearning/courses";

export const runtime = "nodejs";

/**
 * Called by the SCORM player when the learner reaches the end of the course.
 * Writes per-course completion (idempotent), syncs legacy `completed_at` for
 * the lead course, and fires an optional Zapier webhook on the learner's first
 * ever completion.
 */
export async function POST(request: NextRequest) {
  const session = await readLearnerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    // Empty body — default slug from session / lead course.
  }

  const settings = await getCourseSettings();
  const slugRaw =
    typeof body.slug === "string"
      ? body.slug.trim()
      : session.courseSlug || settings.slug;
  const slug = slugRaw || settings.slug;

  const row = await getCourseRowBySlug(slug);
  if (!row) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }

  const course = await resolveCourseBySlug(slug);
  if (!course) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }

  try {
    const learnerId = Number(session.sub);
    const learner = await findLearnerById(learnerId);
    if (!learner) {
      return NextResponse.json({ error: "Learner not found" }, { status: 404 });
    }

    if (!canLearnerAccessCourse(learner, row)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const priorCompletions = await countLearnerCompletions(learnerId);

    const result = await recordCourseCompletionBySlug(learnerId, slug);

    const webhook = process.env.ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL;
    if (webhook && result.inserted && priorCompletions === 0) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: result.learner?.email,
            first_name: result.learner?.firstName,
            last_name: result.learner?.lastName,
            course_slug: course.slug,
            course_title: course.title,
            completed_at: result.completedAt.toISOString(),
          }),
        });
      } catch (err) {
        console.error("elearning/complete: webhook failed", err);
      }
    }

    return NextResponse.json({
      success: true,
      completedAt: result.completedAt.toISOString(),
    });
  } catch (err) {
    console.error("elearning/complete failed", err);
    return NextResponse.json(
      { error: "Could not save completion" },
      { status: 500 }
    );
  }
}
