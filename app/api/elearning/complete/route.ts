import { NextRequest, NextResponse } from "next/server";
import {
  markCourseCompleted,
  findLearnerById,
} from "@/lib/elearning/learners";
import { readLearnerSession } from "@/lib/elearning/session";
import { FREE_COURSE, getCourseBySlug } from "@/lib/elearning/catalog";

export const runtime = "nodejs";

/**
 * Called by the SCORM player when the learner reaches the end of the course.
 * Writes the completion timestamp (idempotent) and fires an optional Zapier
 * webhook so sales can follow up about paid courses.
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
    // Empty body is fine — default to the learner's assigned free course.
  }

  const slug =
    typeof body.slug === "string" ? body.slug : session.courseSlug || FREE_COURSE.slug;
  const course = getCourseBySlug(slug);
  if (!course) {
    return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  }

  try {
    const learnerId = Number(session.sub);
    const learner = await findLearnerById(learnerId);
    if (!learner) {
      return NextResponse.json({ error: "Learner not found" }, { status: 404 });
    }

    const updated = await markCourseCompleted(learnerId);
    const completedAt = updated?.completedAt ?? new Date();
    const alreadyCompleted = Boolean(learner.completedAt);

    const webhook = process.env.ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL;
    if (webhook && !alreadyCompleted) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: learner.email,
            first_name: learner.firstName,
            last_name: learner.lastName,
            course_slug: course.slug,
            course_title: course.title,
            completed_at: completedAt.toISOString(),
          }),
        });
      } catch (err) {
        console.error("elearning/complete: webhook failed", err);
      }
    }

    return NextResponse.json({
      success: true,
      completedAt: completedAt.toISOString(),
    });
  } catch (err) {
    console.error("elearning/complete failed", err);
    return NextResponse.json(
      { error: "Could not save completion" },
      { status: 500 }
    );
  }
}
