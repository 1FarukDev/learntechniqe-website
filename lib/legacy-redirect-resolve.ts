import { getCourseUrl } from "@/lib/course-categories";
import {
  COURSE_SLUG_ALIASES,
  EXACT_PATH_REDIRECTS,
  KNOWN_COURSE_SLUGS,
  RESERVED_ROOT_SEGMENTS,
} from "@/lib/legacy-redirect-data";

export type LegacyRedirectTarget = {
  pathname: string;
  /** URL fragment without leading # */
  hash?: string;
};

function normalizePathname(pathname: string): string {
  const withSlash = pathname.replace(/\/{2,}/g, "/");
  if (withSlash.length <= 1) return withSlash || "/";
  return withSlash.endsWith("/") ? withSlash.slice(0, -1) : withSlash;
}

function decodeSegment(seg: string): string {
  try {
    return decodeURIComponent(seg);
  } catch {
    return seg;
  }
}

function resolveOldCoursePrefix(
  prefix: "electrician" | "plc" | "aircon",
  restRaw: string | undefined,
): LegacyRedirectTarget | null {
  const hub =
    prefix === "electrician"
      ? "/courses/electrical"
      : prefix === "plc"
        ? "/courses/plc"
        : "/courses/aircon-refrigeration";

  if (!restRaw || restRaw === "/") {
    return { pathname: hub };
  }

  const rest = restRaw.replace(/^\/+|\/+$/g, "");
  if (!rest) return { pathname: hub };

  const slug = decodeSegment(rest.split("/")[0] ?? "").toLowerCase();
  if (!slug) return { pathname: hub };

  const canonical = COURSE_SLUG_ALIASES[slug] ?? slug;
  return { pathname: getCourseUrl(canonical) };
}

/**
 * Returns a same-site redirect target for legacy WordPress URLs, or null to fall through.
 */
const COURSE_LISTING_SEGMENTS = new Set([
  "electrical",
  "plc",
  "aircon-refrigeration",
]);

export function resolveLegacyRedirect(
  pathname: string,
): LegacyRedirectTarget | null {
  const path = normalizePathname(pathname);
  const key = path.toLowerCase();

  /**
   * Marketing / GSC links like `/courses/city-guilds-combined` (no category segment).
   * Canonical URLs are `/courses/{electrical|plc|aircon-refrigeration}/{slug}`.
   */
  if (key.startsWith("/courses/")) {
    const parts = key.split("/").filter(Boolean);
    if (
      parts.length >= 3 &&
      parts[0] === "courses" &&
      COURSE_LISTING_SEGMENTS.has(parts[1]!)
    ) {
      return null;
    }
    if (parts.length === 2 && parts[0] === "courses") {
      const seg = parts[1]!;
      if (COURSE_LISTING_SEGMENTS.has(seg)) {
        return null;
      }
      const canonical = COURSE_SLUG_ALIASES[seg] ?? seg;
      if (KNOWN_COURSE_SLUGS.has(canonical)) {
        return { pathname: getCourseUrl(canonical) };
      }
      return { pathname: "/courses" };
    }
    if (parts.length > 2 && parts[0] === "courses" && !COURSE_LISTING_SEGMENTS.has(parts[1]!)) {
      const seg = parts[1]!;
      const canonical = COURSE_SLUG_ALIASES[seg] ?? seg;
      if (KNOWN_COURSE_SLUGS.has(canonical)) {
        return { pathname: getCourseUrl(canonical) };
      }
      return { pathname: "/courses" };
    }
    return null;
  }

  if (key.startsWith("/blog/") || key.startsWith("/pathways/") || key.startsWith("/career/")) {
    return null;
  }

  if (key === "/locations") {
    return { pathname: "/company", hash: "location" };
  }

  if (key === "/venues") {
    return { pathname: "/company", hash: "location" };
  }

  if (key === "/accommodation") {
    return { pathname: "/company", hash: "accommodation" };
  }

  const exact = EXACT_PATH_REDIRECTS[key];
  if (exact) {
    return { pathname: exact };
  }

  // --- /electrician-courses/... ---
  if (key === "/electrician-courses" || key.startsWith("/electrician-courses/")) {
    const rest = key.slice("/electrician-courses".length);
    return resolveOldCoursePrefix("electrician", rest);
  }

  // --- /plc-training-courses/... ---
  if (key === "/plc-training-courses" || key.startsWith("/plc-training-courses/")) {
    const rest = key.slice("/plc-training-courses".length);
    return resolveOldCoursePrefix("plc", rest);
  }

  // --- /aircon-refrig-training-courses/... ---
  if (
    key === "/aircon-refrig-training-courses" ||
    key.startsWith("/aircon-refrig-training-courses/")
  ) {
    const rest = key.slice("/aircon-refrig-training-courses".length);
    return resolveOldCoursePrefix("aircon", rest);
  }

  // --- /gas-courses/... ---
  if (key === "/gas-courses" || key.startsWith("/gas-courses/")) {
    return { pathname: "/courses/aircon-refrigeration" };
  }

  // --- /technique_courses/... ---
  if (key.startsWith("/technique_courses/")) {
    if (key.includes("plc")) return { pathname: "/courses/plc" };
    return { pathname: "/courses" };
  }

  // --- /technique_trainarea/... ---
  if (key.startsWith("/technique_trainarea/")) {
    return { pathname: "/company", hash: "location" };
  }

  // --- /category/... ---
  if (key.startsWith("/category/")) {
    if (key.includes("/plc")) {
      if (key.includes("/page/")) {
        return { pathname: "/blog/all" };
      }
      return { pathname: "/courses/plc" };
    }
    if (key.includes("company-news") || key.includes("case-studies")) {
      return { pathname: "/blog/all" };
    }
    return { pathname: "/blog/all" };
  }

  // --- /technique-blog/page/N ---
  if (key === "/technique-blog" || key.startsWith("/technique-blog/")) {
    return { pathname: "/blog/all" };
  }

  // --- /meet-team-* ---
  if (key.startsWith("/meet-team-") || key === "/meet-our-team") {
    return { pathname: "/company" };
  }

  // --- /testimonial/... ---
  if (key.startsWith("/testimonial/")) {
    return { pathname: "/blog/all" };
  }

  // --- Single-segment: known course slug at site root (old WP) ---
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 1) {
    const seg = segments[0]!.toLowerCase();
    if (seg.includes(".")) return null;

    const courseCanonical = COURSE_SLUG_ALIASES[seg] ?? seg;
    if (KNOWN_COURSE_SLUGS.has(courseCanonical)) {
      return { pathname: getCourseUrl(courseCanonical) };
    }

    if (!RESERVED_ROOT_SEGMENTS.has(seg)) {
      return { pathname: `/blog/${seg}` };
    }
  }

  return null;
}
