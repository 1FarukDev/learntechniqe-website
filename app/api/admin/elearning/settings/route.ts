import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import {
  getCourseSettings,
  invalidateCoursesCache,
  listCoursesOrdered,
} from "@/lib/elearning/courses";
import { getSupabaseAdmin } from "@/lib/elearning/db";

export const runtime = "nodejs";

async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const settings = await getCourseSettings();
  return NextResponse.json({ settings });
}

/**
 * Patches the current lead (Zapier) course, or the first catalog row if none
 * is marked as lead. Kept for older admin clients; prefer
 * `PATCH /api/admin/elearning/courses/:id`.
 */
export async function PATCH(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title =
    typeof body.title === "string" ? body.title.trim() : undefined;
  const tagline =
    typeof body.tagline === "string" ? body.tagline.trim() : undefined;
  const duration =
    typeof body.duration === "string" ? body.duration.trim() : undefined;
  const entryFile =
    typeof body.entry_file === "string"
      ? body.entry_file.trim().replace(/^\/+/, "")
      : undefined;

  const list = await listCoursesOrdered();
  const target = list.find((r) => r.assign_on_lead) ?? list[0];
  if (!target) {
    return NextResponse.json({ error: "No courses configured" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("elearning_courses")
    .update({
      title: title ?? target.title,
      tagline: tagline ?? target.tagline,
      duration: duration ?? target.duration,
      entry_file: entryFile ?? target.entry_file,
      updated_at: new Date().toISOString(),
    })
    .eq("id", target.id);

  if (error) {
    console.error("settings PATCH", error);
    return NextResponse.json({ error: "Could not save settings" }, { status: 500 });
  }

  invalidateCoursesCache();
  return NextResponse.json({ success: true, settings: await getCourseSettings() });
}
