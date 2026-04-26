import type { SanityDoc } from "./store";

function globMatch(pattern: string, value: string): boolean {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const p = pattern.toLowerCase().split("*").map(esc).join(".*");
  return new RegExp(`^${p}$`, "i").test(value.toLowerCase());
}

/** Mirrors headerQuery GROQ `select` for course-based mega-menu hrefs. */
export function courseSlugToListingPrefix(slug: string): string {
  const s = slug.toLowerCase();
  const plcExact = new Set([
    "plc-total-industrial",
    "programmable-logic-controllers",
    "city-guilds-programmable-logic",
    "scada",
    "robotic",
    "5-day-beginner-industrial-robotics",
  ]);
  if (
    plcExact.has(s) ||
    globMatch("programmable-logic-controllers*", s) ||
    globMatch("*plc*", s) ||
    globMatch("*scada*", s) ||
    globMatch("*robotic*", s)
  ) {
    return "plc";
  }
  const airExact = new Set([
    "f-gas",
    "hydrocarbon",
    "pipework-brazing",
    "refrigeration",
    "total-air-conditioning",
  ]);
  if (
    airExact.has(s) ||
    globMatch("*f-gas*", s) ||
    globMatch("*refrigeration*", s) ||
    globMatch("*air-con*", s)
  ) {
    return "aircon-refrigeration";
  }
  return "electrical";
}

export function resolveMenuItemHref(
  item: Record<string, unknown>,
  byId: Map<string, SanityDoc>,
): string {
  const courseRef =
    item.course &&
    typeof item.course === "object" &&
    (item.course as { _ref?: string })._ref
      ? (item.course as { _ref: string })._ref
      : undefined;
  if (courseRef) {
    const course = byId.get(courseRef);
    const cslug =
      course &&
      typeof course.slug === "object" &&
      course.slug !== null &&
      "current" in course.slug
        ? String((course.slug as { current?: string }).current ?? "")
      : "";
    if (cslug) {
      const prefix = courseSlugToListingPrefix(cslug);
      return `/courses/${prefix}/${cslug}`;
    }
  }
  const slugObj = item.slug;
  if (
    slugObj &&
    typeof slugObj === "object" &&
    slugObj !== null &&
    "current" in slugObj
  ) {
    const cur = (slugObj as { current?: string }).current;
    if (cur) return `/courses/${cur}`;
  }
  if (typeof item.href === "string" && item.href.length > 0) {
    return item.href;
  }
  return "#";
}
