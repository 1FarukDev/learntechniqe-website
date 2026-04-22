import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import {
  getCourseRowById,
  invalidateCoursesCache,
} from "@/lib/elearning/courses";
import { getSupabaseAdmin } from "@/lib/elearning/db";

export const runtime = "nodejs";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

interface RouteCtx {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, context: RouteCtx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id: raw } = await context.params;
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }
  const course = await getCourseRowById(id);
  if (!course) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ course });
}

export async function PATCH(request: NextRequest, context: RouteCtx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const existing = await getCourseRowById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug =
    typeof body.slug === "string" ? body.slug.trim().toLowerCase() : undefined;
  if (slug !== undefined) {
    if (!SLUG_RE.test(slug) || slug.length > 120) {
      return NextResponse.json(
        { error: "slug must be lowercase letters, numbers, and hyphens only" },
        { status: 400 }
      );
    }
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (typeof body.title === "string") patch.title = body.title.trim();
  if (typeof body.tagline === "string") patch.tagline = body.tagline;
  if (typeof body.duration === "string") patch.duration = body.duration;
  if (typeof body.entry_file === "string") {
    patch.entry_file = body.entry_file.trim().replace(/^\/+/, "") || "index.html";
  }
  if (typeof body.sort_order === "number" && Number.isFinite(body.sort_order)) {
    patch.sort_order = body.sort_order;
  }
  if (typeof body.tag === "string") patch.tag = body.tag;
  if (typeof body.accent_class === "string") patch.accent_class = body.accent_class;
  if (typeof body.icon_path === "string") patch.icon_path = body.icon_path;
  if (typeof body.is_catalog_teaser === "boolean") {
    patch.is_catalog_teaser = body.is_catalog_teaser;
  }
  if (typeof body.is_open_to_all_learners === "boolean") {
    patch.is_open_to_all_learners = body.is_open_to_all_learners;
  }
  if (slug !== undefined) patch.slug = slug;

  const assignOnLead =
    typeof body.assign_on_lead === "boolean" ? body.assign_on_lead : undefined;

  const supabase = getSupabaseAdmin();

  if (assignOnLead === true) {
    await supabase.from("elearning_courses").update({ assign_on_lead: false }).neq("id", id);
    patch.assign_on_lead = true;
  } else if (assignOnLead === false) {
    patch.assign_on_lead = false;
  }

  const { data, error } = await supabase
    .from("elearning_courses")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A course with this slug already exists" },
        { status: 409 }
      );
    }
    console.error("PATCH elearning_courses", error);
    return NextResponse.json({ error: "Could not update course" }, { status: 500 });
  }

  invalidateCoursesCache();
  return NextResponse.json({ course: data });
}

export async function DELETE(_request: NextRequest, context: RouteCtx) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: raw } = await context.params;
  const id = Number(raw);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("elearning_courses").delete().eq("id", id);
  if (error) {
    console.error("DELETE elearning_courses", error);
    return NextResponse.json({ error: "Could not delete course" }, { status: 500 });
  }

  invalidateCoursesCache();
  return NextResponse.json({ success: true });
}
