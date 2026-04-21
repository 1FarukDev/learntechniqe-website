import { getSupabaseAdmin } from "./db";
import type { ElearningCourse } from "./catalog";
import { FREE_COURSE } from "./catalog";
import type { Learner } from "./learners";

/** Matches `public.elearning_courses` (service-role reads). */
export interface ElearningCourseRow {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  entry_file: string;
  storage_prefix: string | null;
  sort_order: number;
  assign_on_lead: boolean;
  is_catalog_teaser: boolean;
  is_open_to_all_learners: boolean;
  tag: string;
  accent_class: string;
  icon_path: string;
  package_updated_at: string | null;
  created_at: string;
  updated_at: string;
}

/** Legacy singleton shape still used by some routes and SCORM publish. */
export interface ElearningCourseSettingsRow {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  entry_file: string;
  storage_prefix: string | null;
  package_updated_at: string | null;
  updated_at: string;
}

let listCache: { rows: ElearningCourseRow[]; expires: number } | null = null;

const MEMORY_TTL_MS = 45_000;

export function invalidateCoursesCache(): void {
  listCache = null;
}

export function scormBucketName(): string {
  return process.env.ELEARNING_SCORM_BUCKET || "elearning-scorm";
}

export function rowToCatalogCourse(row: ElearningCourseRow): ElearningCourse {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    duration: row.duration,
    tag: row.tag,
    accentClass: row.accent_class,
    iconPath: row.icon_path,
  };
}

export function getLaunchUrlForCourse(row: ElearningCourseRow): string {
  const entry = (row.entry_file || "index.html").replace(/^\/+/, "");
  if (row.storage_prefix?.trim()) {
    const prefix = row.storage_prefix.replace(/^\/+|\/+$/g, "");
    return `/elearning-scorm/${prefix}/${entry}`;
  }
  return `/elearning/${row.slug}/${entry}`;
}

export function courseHasPlayablePackage(row: ElearningCourseRow): boolean {
  return !row.is_catalog_teaser;
}

export function canLearnerAccessCourse(
  learner: Learner,
  row: ElearningCourseRow
): boolean {
  if (row.is_catalog_teaser) return false;
  if (!courseHasPlayablePackage(row)) return false;
  if (row.is_open_to_all_learners) return true;
  return learner.courseSlug === row.slug;
}

export async function listCoursesOrdered(): Promise<ElearningCourseRow[]> {
  if (listCache && listCache.expires > Date.now()) {
    return listCache.rows;
  }
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_courses")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("title", { ascending: true });
  if (error) {
    console.error("elearning_courses list failed", error);
    return [];
  }
  const rows = (data ?? []) as ElearningCourseRow[];
  listCache = { rows, expires: Date.now() + MEMORY_TTL_MS };
  return rows;
}

export async function getCourseRowBySlug(
  slug: string
): Promise<ElearningCourseRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_courses")
    .select("*")
    .eq("slug", slug.trim())
    .maybeSingle<ElearningCourseRow>();
  if (error) {
    console.error("getCourseRowBySlug", error);
    return null;
  }
  return data;
}

export async function getCourseRowById(
  id: number
): Promise<ElearningCourseRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_courses")
    .select("*")
    .eq("id", id)
    .maybeSingle<ElearningCourseRow>();
  if (error) {
    console.error("getCourseRowById", error);
    return null;
  }
  return data;
}

export async function getLeadCourseRow(): Promise<ElearningCourseRow | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_courses")
    .select("*")
    .eq("assign_on_lead", true)
    .maybeSingle<ElearningCourseRow>();
  if (error) {
    console.error("getLeadCourseRow", error);
    return null;
  }
  return data;
}

function rowToSettingsShape(row: ElearningCourseRow): ElearningCourseSettingsRow {
  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    duration: row.duration,
    entry_file: row.entry_file,
    storage_prefix: row.storage_prefix,
    package_updated_at: row.package_updated_at,
    updated_at: row.updated_at,
  };
}

/**
 * Cached “primary” course used by Zapier defaults and legacy `getCourseSettings`.
 * Prefer the lead-assigned row; else the first playable row by sort order.
 */
export async function getCourseSettings(): Promise<ElearningCourseSettingsRow> {
  const list = await listCoursesOrdered();
  const lead = list.find((r) => r.assign_on_lead);
  const first = lead ?? list.find((r) => !r.is_catalog_teaser) ?? list[0];
  if (!first) {
    return {
      id: 0,
      slug: FREE_COURSE.slug,
      title: FREE_COURSE.title,
      tagline: FREE_COURSE.tagline,
      duration: FREE_COURSE.duration,
      entry_file: "index.html",
      storage_prefix: null,
      package_updated_at: null,
      updated_at: new Date().toISOString(),
    };
  }
  return rowToSettingsShape(first);
}

export async function getCourseSettingsForProxy(): Promise<ElearningCourseSettingsRow> {
  return getCourseSettings();
}

/** @deprecated Prefer `resolveHeroCourseForLearner` on the learner dashboard. */
export async function resolveFreeCourse(): Promise<
  ElearningCourse & { launchUrl: string }
> {
  const learnerHero = await getLeadCourseRow();
  const list = await listCoursesOrdered();
  const row =
    learnerHero ??
    list.find((c) => !c.is_catalog_teaser) ??
    list[0] ??
    null;
  if (!row) {
    return {
      ...FREE_COURSE,
      launchUrl: `/elearning/${FREE_COURSE.slug}/index.html`,
    };
  }
  return {
    ...rowToCatalogCourse(row),
    launchUrl: getLaunchUrlForCourse(row),
  };
}

export async function resolveHeroCourseForLearner(
  learner: Learner
): Promise<(ElearningCourse & { launchUrl: string; dbId: number }) | null> {
  const courses = await listCoursesOrdered();
  const lead = courses.find((c) => c.assign_on_lead);
  const ordered: ElearningCourseRow[] = [];
  if (lead && canLearnerAccessCourse(learner, lead)) {
    ordered.push(lead);
  }
  for (const c of courses) {
    if (lead && c.id === lead.id) continue;
    if (canLearnerAccessCourse(learner, c) && !c.is_catalog_teaser) {
      ordered.push(c);
    }
  }
  const hero = ordered[0];
  if (!hero) return null;
  return {
    ...rowToCatalogCourse(hero),
    launchUrl: getLaunchUrlForCourse(hero),
    dbId: hero.id,
  };
}

export async function resolveCourseBySlug(
  slug: string
): Promise<ElearningCourse | null> {
  const row = await getCourseRowBySlug(slug);
  if (!row) return null;
  return rowToCatalogCourse(row);
}

/** All non-empty storage prefixes allowed for `/elearning-scorm/...`. */
export async function getAuthorizedScormPathPrefixes(): Promise<string[]> {
  const rows = await listCoursesOrdered();
  const out: string[] = [];
  for (const r of rows) {
    const p = r.storage_prefix?.trim().replace(/^\/+|\/+$/g, "");
    if (p) out.push(p);
  }
  return out;
}

export function pathMatchesAnyPrefix(
  objectPath: string,
  prefixes: string[]
): boolean {
  const p = objectPath.replace(/^\/+/, "");
  return prefixes.some((pre) => p === pre || p.startsWith(`${pre}/`));
}
