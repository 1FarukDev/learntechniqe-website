import { NextResponse } from "next/server";
import { getCurrentLearner } from "@/lib/elearning/session";

export const runtime = "nodejs";

export async function GET() {
  const learner = await getCurrentLearner();
  if (!learner) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  return NextResponse.json({
    authenticated: true,
    learner: {
      email: learner.email,
      firstName: learner.firstName,
      lastName: learner.lastName,
      courseSlug: learner.courseSlug,
      completedAt: learner.completedAt?.toISOString() ?? null,
    },
  });
}
