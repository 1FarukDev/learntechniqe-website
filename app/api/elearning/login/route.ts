import { NextRequest, NextResponse } from "next/server";
import {
  findLearnerCredentials,
  touchLastLogin,
  verifyPassword,
} from "@/lib/elearning/learners";
import { setLearnerSessionCookie } from "@/lib/elearning/session";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json(
      { error: "Enter your email and password" },
      { status: 400 }
    );
  }

  try {
    const found = await findLearnerCredentials(email);
    if (!found) {
      // Generic message — we don't disclose which field was wrong.
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 }
      );
    }
    const ok = await verifyPassword(password, found.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    await setLearnerSessionCookie(found.learner);
    await touchLastLogin(found.learner.id);

    return NextResponse.json({
      success: true,
      learner: {
        email: found.learner.email,
        firstName: found.learner.firstName,
        lastName: found.learner.lastName,
        courseSlug: found.learner.courseSlug,
      },
    });
  } catch (err) {
    console.error("elearning/login failed", err);
    return NextResponse.json(
      { error: "Sign in is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}
