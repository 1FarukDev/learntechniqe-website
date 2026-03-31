import type { CourseCardData } from "@/lib/course-categories";
import { am2HeroData } from "@/content/am2-assessment-course";

/**
 * Homepage "Most popular" order. Each slot matches the first Sanity course
 * whose slug contains one of the patterns (case-insensitive), in pattern order.
 *
 * Slot 1: City & Guilds 2391-52 (exact CMS slug). Then TACR10, PLC10, 2365, AM2.
 */
const POPULAR_SLOTS: (string | string[])[] = [
  "initial-periodic-inspection-testing-of-electrical-installation-city-guilds-2391-52",
  ["tacr10", "total-air-conditioning"],
  ["plc10", "plc-total-industrial"],
  "2365",
  ["am2-assessment", "am2"],
];

function slugMatches(slug: string, pattern: string): boolean {
  return slug.toLowerCase().includes(pattern.toLowerCase());
}

function findCourseForSlot(
  courses: CourseCardData[],
  patterns: string | string[],
  usedSlugs: Set<string>,
): CourseCardData | undefined {
  const list = Array.isArray(patterns) ? patterns : [patterns];
  for (const pattern of list) {
    const found = courses.find(
      (c) => !usedSlugs.has(c.slug) && slugMatches(c.slug, pattern),
    );
    if (found) return found;
  }
  return undefined;
}

function am2FallbackCard(): CourseCardData {
  const desc = am2HeroData.description?.[0] ?? null;
  return {
    title: am2HeroData.title,
    slug: am2HeroData.slug,
    price: am2HeroData.price,
    duration: am2HeroData.duration ?? null,
    description: desc,
    heroImage: null,
    tags: am2HeroData.tags ?? null,
  };
}

/**
 * Returns up to five popular courses in the configured order.
 * AM2 uses local fallback data when no matching Sanity document exists.
 */
export function pickPopularCourses(
  allCourses: CourseCardData[],
): CourseCardData[] {
  const used = new Set<string>();
  const out: CourseCardData[] = [];

  for (let i = 0; i < POPULAR_SLOTS.length; i++) {
    const patterns = POPULAR_SLOTS[i];
    let course = findCourseForSlot(allCourses, patterns, used);

    if (!course && i === POPULAR_SLOTS.length - 1) {
      course = am2FallbackCard();
    }

    if (course) {
      out.push(course);
      used.add(course.slug);
    }
  }

  return out;
}
