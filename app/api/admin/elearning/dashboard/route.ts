import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import { getSupabaseAdmin } from "@/lib/elearning/db";

export const runtime = "nodejs";

export async function GET() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const [lr, cr] = await Promise.all([
    supabase.from("learners").select("*", { count: "exact", head: true }),
    supabase
      .from("elearning_courses")
      .select("*", { count: "exact", head: true }),
  ]);

  return NextResponse.json({
    learnerCount: lr.count ?? 0,
    courseCount: cr.count ?? 0,
  });
}
