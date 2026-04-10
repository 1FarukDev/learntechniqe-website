import type { CourseCardData } from "@/lib/course-categories";
import { getCourseUrl } from "@/lib/course-categories";

export type SessionCourseOption = { title: string; url: string };

/** Dedupe by slug, sort by title — for Book a Session course dropdown */
export function courseOptionsForSessionBook(
  courses: CourseCardData[],
): SessionCourseOption[] {
  const bySlug = new Map<string, SessionCourseOption>();
  for (const c of courses) {
    if (!c?.slug) continue;
    bySlug.set(c.slug, { title: c.title, url: getCourseUrl(c.slug) });
  }
  return Array.from(bySlug.values()).sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}
