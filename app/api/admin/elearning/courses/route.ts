import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import { invalidateCoursesCache, listCoursesOrdered } from "@/lib/elearning/courses";
import { getSupabaseAdmin } from "@/lib/elearning/db";

export const runtime = "nodejs";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const courses = await listCoursesOrdered();
  return NextResponse.json({ courses });
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug.trim().toLowerCase() : "";
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!slug || !title) {
    return NextResponse.json(
      { error: "slug and title are required" },
      { status: 400 }
    );
  }
  if (!SLUG_RE.test(slug) || slug.length > 120) {
    return NextResponse.json(
      { error: "slug must be lowercase letters, numbers, and hyphens only" },
      { status: 400 }
    );
  }

  const tagline = typeof body.tagline === "string" ? body.tagline : "";
  const duration = typeof body.duration === "string" ? body.duration : "";
  const entryFile =
    typeof body.entry_file === "string"
      ? body.entry_file.trim().replace(/^\/+/, "") || "index.html"
      : "index.html";
  const sortOrder =
    typeof body.sort_order === "number" && Number.isFinite(body.sort_order)
      ? body.sort_order
      : 0;
  const assignOnLead = Boolean(body.assign_on_lead);
  const isCatalogTeaser = Boolean(body.is_catalog_teaser);
  const isOpenToAll = Boolean(body.is_open_to_all_learners);
  const tag = typeof body.tag === "string" ? body.tag : "Course";
  const accentClass =
    typeof body.accent_class === "string"
      ? body.accent_class
      : "from-[#016068] to-[#024850]";
  const iconPath =
    typeof body.icon_path === "string"
      ? body.icon_path
      : "M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z";

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("elearning_courses")
    .insert({
      slug,
      title,
      tagline,
      duration,
      entry_file: entryFile,
      sort_order: sortOrder,
      assign_on_lead: false,
      is_catalog_teaser: isCatalogTeaser,
      is_open_to_all_learners: isOpenToAll,
      tag,
      accent_class: accentClass,
      icon_path: iconPath,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "A course with this slug already exists" },
        { status: 409 }
      );
    }
    console.error("POST elearning_courses", error);
    return NextResponse.json({ error: "Could not create course" }, { status: 500 });
  }

  if (assignOnLead && data?.id != null) {
    await supabase
      .from("elearning_courses")
      .update({ assign_on_lead: false })
      .neq("id", data.id as number);
    await supabase
      .from("elearning_courses")
      .update({ assign_on_lead: true })
      .eq("id", data.id as number);
  }

  invalidateCoursesCache();
  return NextResponse.json({ course: data });
}
