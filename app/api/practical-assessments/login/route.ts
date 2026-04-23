import { NextRequest, NextResponse } from "next/server";
import {
  hasPracticalPasswordConfigured,
  isPracticalPasswordValid,
  practicalAccessCookieValue,
  practicalCookieOptions,
  PRACTICAL_COOKIE_NAME,
} from "@/lib/practical-assessments-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (!hasPracticalPasswordConfigured()) {
    return NextResponse.json(
      { error: "Practical assessments password is not configured." },
      { status: 500 }
    );
  }

  if (!isPracticalPasswordValid(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(
    PRACTICAL_COOKIE_NAME,
    practicalAccessCookieValue(),
    practicalCookieOptions()
  );
  return res;
}
