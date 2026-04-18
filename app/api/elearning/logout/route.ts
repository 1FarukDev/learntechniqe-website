import { NextResponse } from "next/server";
import { clearLearnerSessionCookie } from "@/lib/elearning/session";

export const runtime = "nodejs";

export async function POST() {
  await clearLearnerSessionCookie();
  return NextResponse.json({ success: true });
}
