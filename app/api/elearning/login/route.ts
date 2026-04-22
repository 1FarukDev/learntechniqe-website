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
      { status: 400 },
    );
  }

  try {
    console.log("[login] 1. Looking up learner:", email);
    const found = await findLearnerCredentials(email);
    console.log("[login] 2. Found learner:", found ? "yes" : "no");

    if (!found) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 },
      );
    }

    console.log("[login] 3. Verifying password...");
    const ok = await verifyPassword(password, found.passwordHash);
    console.log("[login] 4. Password ok:", ok);

    if (!ok) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 },
      );
    }

    console.log("[login] 5. Setting session cookie...");
    await setLearnerSessionCookie(found.learner);
    console.log("[login] 6. Touching last login...");
    await touchLastLogin(found.learner.id);
    console.log("[login] 7. Done!");

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
    console.error("[login] failed at step:", err);
    return NextResponse.json(
      { error: "Sign in is temporarily unavailable. Please try again." },
      { status: 500 },
    );
  }
}