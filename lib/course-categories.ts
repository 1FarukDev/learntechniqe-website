import type { MegaMenuColumn } from "@/types/header";

export interface CourseCardData {
  title: string;
  slug: string;
  price: string | null;
  duration: string | null;
  description: string | null;
  heroImage: string | null;
  tags: { label: string; color: string }[] | null;
}

interface SubcategoryRule {
  value: string;
  label: string;
  /** Slug substrings — first matching rule wins (checked in order). */
  match: string[];
}

const ELECTRICAL_RULES: SubcategoryRule[] = [
  {
    value: "course-packages",
    label: "Course Packages",
    match: [
      "total-electrical",
      "total-industrial",
      "city-guilds-combined",
      "city-guilds-2365",
      "city-guilds-2346",
      "commercial-electrical-installer",
      "domestic-electrical-installer",
      "nvq-level-3",
      "essential-electrics",
    ],
  },
  {
    value: "pat-testing",
    label: "PAT Testing",
    match: ["pat-testing", "in-service-inspection"],
  },
  {
    value: "ev-charging",
    label: "Electrical Vehicle Charging",
    match: ["electric-vehicle-charging", "ev-charging", "2921"],
  },
  {
    value: "18th-edition",
    label: "18th Edition Courses",
    match: ["18th-edition"],
  },
  {
    value: "inspection-testing",
    label: "Inspection and Testing",
    match: [
      "2391",
      "2392",
      "2396",
      "eicr",
      "design-and-verification",
      "fundamental-inspection",
      "initial-verification",
      "initial-periodic-inspection",
      "periodic-inspection",
    ],
  },
  {
    value: "part-p",
    label: "Part P",
    match: ["building-regulations", "2383"],
  },
  {
    value: "extra-experience",
    label: "Extra Experience",
    match: [
      "emergency-lighting",
      "thermal-imaging",
      "lightning-protection",
      "low-voltage",
      "domestic-ventilation",
      "central-heating",
      "domestic-burglar-alarm",
      "fire-alarm",
      "domestic-wiring-circuits",
      "basic-electrical-course",
      "industrial-electrical-maintenance-module",
    ],
  },
];

const NON_ELECTRICAL_SLUGS = [
  "f-gas",
  "hydrocarbon",
  "pipework-brazing",
  "refrigeration",
  "total-air-conditioning",
  "robotic",
  "5-day-beginner-industrial-robotics",
  "programmable-logic-controllers",
  "plc-total-industrial",
  "scada",
  "city-guilds-programmable-logic",
];

const PLC_RULES: SubcategoryRule[] = [
  {
    value: "plc-packages",
    label: "PLC Course Packages",
    match: ["plc-total-industrial"],
  },
  {
    value: "plc-programming",
    label: "PLC Programming",
    match: ["programmable-logic-controllers", "city-guilds-programmable-logic"],
  },
  {
    value: "scada",
    label: "SCADA & Networking",
    match: ["scada"],
  },
  {
    value: "robotics",
    label: "Robotics & Automation",
    match: ["robotic", "5-day-beginner-industrial-robotics"],
  },
];

const PLC_SLUG_MARKERS = PLC_RULES.flatMap((r) => r.match);

const AIRCON_RULES: SubcategoryRule[] = [
  {
    value: "aircon-packages",
    label: "Air Conditioning Packages",
    match: ["total-air-conditioning"],
  },
  {
    value: "f-gas",
    label: "F-Gas Certification",
    match: ["f-gas"],
  },
  {
    value: "refrigeration",
    label: "Refrigeration",
    match: ["refrigeration", "hydrocarbon"],
  },
  {
    value: "pipework",
    label: "Pipework & Brazing",
    match: ["pipework-brazing"],
  },
];

const AIRCON_SLUG_MARKERS = AIRCON_RULES.flatMap((r) => r.match);

function isElectricalCourse(slug: string): boolean {
  return !NON_ELECTRICAL_SLUGS.some((s) => slug.includes(s));
}

export function categoriseElectricalCourses(
  courses: CourseCardData[],
): { value: string; label: string; courses: CourseCardData[] }[] {
  const electricalCourses = courses.filter((c) => isElectricalCourse(c.slug));

  const assigned = new Set<string>();
  const grouped: Record<string, CourseCardData[]> = {};

  for (const rule of ELECTRICAL_RULES) {
    grouped[rule.value] = [];
  }

  for (const course of electricalCourses) {
    for (const rule of ELECTRICAL_RULES) {
      if (rule.match.some((m) => course.slug.includes(m))) {
        grouped[rule.value].push(course);
        assigned.add(course.slug);
        break;
      }
    }
  }

  const uncategorised = electricalCourses.filter((c) => !assigned.has(c.slug));
  if (uncategorised.length > 0) {
    if (!grouped["extra-experience"]) grouped["extra-experience"] = [];
    grouped["extra-experience"].push(...uncategorised);
  }

  return ELECTRICAL_RULES.map((rule) => ({
    value: rule.value,
    label: rule.label,
    courses: grouped[rule.value] ?? [],
  }));
}

function categoriseBySlugs(
  courses: CourseCardData[],
  markers: string[],
  rules: SubcategoryRule[],
): { value: string; label: string; courses: CourseCardData[] }[] {
  const matching = courses.filter((c) =>
    markers.some((m) => c.slug.includes(m)),
  );

  const assigned = new Set<string>();
  const grouped: Record<string, CourseCardData[]> = {};

  for (const rule of rules) {
    grouped[rule.value] = [];
  }

  for (const course of matching) {
    for (const rule of rules) {
      if (rule.match.some((m) => course.slug.includes(m))) {
        grouped[rule.value].push(course);
        assigned.add(course.slug);
        break;
      }
    }
  }

  const uncategorised = matching.filter((c) => !assigned.has(c.slug));
  const lastKey = rules[rules.length - 1]?.value;
  if (uncategorised.length > 0 && lastKey) {
    grouped[lastKey].push(...uncategorised);
  }

  return rules.map((rule) => ({
    value: rule.value,
    label: rule.label,
    courses: grouped[rule.value] ?? [],
  }));
}

export function categorisePLCCourses(
  courses: CourseCardData[],
): { value: string; label: string; courses: CourseCardData[] }[] {
  return categoriseBySlugs(courses, PLC_SLUG_MARKERS, PLC_RULES);
}

export function categoriseAirconCourses(
  courses: CourseCardData[],
): { value: string; label: string; courses: CourseCardData[] }[] {
  return categoriseBySlugs(courses, AIRCON_SLUG_MARKERS, AIRCON_RULES);
}

/**
 * Returns a category badge for any course slug, using the same slug-matching
 * rules the rest of the categorisation logic uses. The colors are saturated
 * versions of the mega-menu `cardColor` values so they work as tag backgrounds
 * with white text.
 */
export function getCategoryTag(slug: string): { label: string; color: string } {
  if (NON_ELECTRICAL_SLUGS.some((s) => slug.includes(s))) {
    if (PLC_SLUG_MARKERS.some((s) => slug.includes(s))) {
      return { label: "PLC & Automation", color: "#3B6BC7" };
    }
    if (AIRCON_SLUG_MARKERS.some((s) => slug.includes(s))) {
      return { label: "Aircon & Refrigeration", color: "#E99E20" };
    }
  }
  return { label: "Electrical", color: "#016068" };
}

const COLUMN_KEYWORDS: Record<string, string[]> = {
  electrical: ["electrical"],
  plc: ["plc", "programmable"],
  "aircon-refrigeration": ["air con", "refrigeration", "hvac", "aircon"],
};

/** Maps a Sanity mega-menu column title to its category listing URL (same rules as categoriseFromHeader). */
export function categoryHrefFromMegaMenuTitle(title: string): string {
  const t = title.toLowerCase();
  const entries: [keyof typeof COLUMN_KEYWORDS, string[]][] = [
    ["plc", COLUMN_KEYWORDS.plc],
    ["aircon-refrigeration", COLUMN_KEYWORDS["aircon-refrigeration"]],
    ["electrical", COLUMN_KEYWORDS.electrical],
  ];
  for (const [key, kws] of entries) {
    if (kws.some((kw) => t.includes(kw))) {
      return key === "electrical"
        ? "/courses/electrical"
        : key === "plc"
          ? "/courses/plc"
          : "/courses/aircon-refrigeration";
    }
  }
  return "/courses";
}

/**
 * Build grouped course data directly from the header mega-menu column
 * that matches the given category. This keeps category pages in sync
 * with the header navigation.
 */
export function categoriseFromHeader(
  columns: MegaMenuColumn[],
  allCourses: CourseCardData[],
  category: string,
): { value: string; label: string; courses: CourseCardData[] }[] {
  const keywords = COLUMN_KEYWORDS[category] ?? [category];

  const column = columns.find((col) => {
    const t = col.title.toLowerCase();
    return keywords.some((kw) => t.includes(kw));
  });

  if (!column) return [];

  const courseBySlug = new Map<string, CourseCardData>();
  for (const c of allCourses) {
    courseBySlug.set(c.slug, c);
  }

  return column.subcategories.map((sub, idx) => {
    const courses = sub.items
      .map((item) => {
        // Extract just the slug from URLs like /courses/electrical/slug-name
        const slug = item.href.replace(/^\/courses\/[^/]+\//, "");
        return courseBySlug.get(slug);
      })
      .filter((c): c is CourseCardData => c != null);

    return {
      value: `sub-${idx}`,
      label: sub.label,
      courses,
    };
  });
}

/**
 * Get the category slug from a course slug (e.g., "electrical", "plc", "aircon-refrigeration").
 * Returns "electrical" by default for unknown courses.
 */


export function getCategoryFromSlug(slug: string): "electrical" | "plc" | "aircon-refrigeration" {
  if (PLC_SLUG_MARKERS.some((s) => slug.includes(s))) {
    return "plc";
  }
  if (AIRCON_SLUG_MARKERS.some((s) => slug.includes(s))) {
    return "aircon-refrigeration";
  }
  return "electrical";
}

/**
 * Get the full course URL with category included (e.g., "/courses/electrical/my-course-slug").
 */
export function getCourseUrl(slug: string): string {
  const category = getCategoryFromSlug(slug);
  return `/courses/${category}/${slug}`;
}
