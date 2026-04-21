/**
 * E-learning catalog shown on the learner dashboard.
 *
 * The single `active` course is the free SCORM course a learner has been
 * granted access to via the ad-funnel. The `locked` entries are visible but
 * un-clickable "coming soon" cards — they exist purely to communicate the
 * depth of the Learn Technique catalogue and nudge learners toward our paid
 * offering. Titles can be edited here freely without touching any other code.
 */

export interface ElearningCourse {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  tag: string;
  accentClass: string;
  iconPath: string;
}

export const FREE_COURSE: ElearningCourse = {
  slug: "electrical-safety-essentials",
  title: "Electrical Safety Essentials",
  tagline:
    "A concise introduction to working safely with electricity — perfect for anyone exploring a career in the trade.",
  duration: "Approx. 30 minutes",
  tag: "Free • Complimentary",
  accentClass: "from-[#016068] to-[#024850]",
  iconPath:
    "M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z",
};

export const LOCKED_COURSES: ElearningCourse[] = [
  {
    slug: "18th-edition-wiring-regulations",
    title: "18th Edition Wiring Regulations — Advanced",
    tagline:
      "Deep-dive masterclass aligned with BS 7671. Unlocked when you book our classroom 18th Edition course.",
    duration: "3 hours",
    tag: "Premium pathway",
    accentClass: "from-amber-500 to-amber-700",
    iconPath:
      "M3 7h18M3 12h18M3 17h12M17 17l3 3-3 3 3-3-3-3",
  },
  {
    slug: "pat-testing-in-depth",
    title: "Portable Appliance Testing — In Depth",
    tagline:
      "Practical PAT testing theory, inspection regimes and compliance reporting. Part of our paid PAT programme.",
    duration: "1 hour 45 minutes",
    tag: "Paid course companion",
    accentClass: "from-sky-500 to-sky-700",
    iconPath:
      "M9 3h6a2 2 0 0 1 2 2v14l-5-3-5 3V5a2 2 0 0 1 2-2Z",
  },
  {
    slug: "f-gas-refrigerants-handling",
    title: "F-Gas & Refrigerant Handling",
    tagline:
      "Environmental legislation, safe handling, and F-Gas Category I readiness — bundled with our HVAC pathway.",
    duration: "2 hours",
    tag: "HVAC pathway",
    accentClass: "from-emerald-500 to-emerald-700",
    iconPath:
      "M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11Z",
  },
  {
    slug: "plc-fundamentals-siemens-s7",
    title: "PLC Fundamentals — Siemens S7",
    tagline:
      "Ladder logic, TIA Portal basics and PLC troubleshooting, preparing you for our in-centre automation course.",
    duration: "2 hours 30 minutes",
    tag: "Industrial pathway",
    accentClass: "from-indigo-500 to-indigo-700",
    iconPath:
      "M5 5h6v6H5V5Zm8 0h6v6h-6V5ZM5 13h6v6H5v-6Zm8 3h6",
  },
  {
    slug: "inspection-testing-2391",
    title: "Inspection & Testing (2391-52)",
    tagline:
      "Exam-focused preparation for the City & Guilds 2391-52 qualification with worked test sheets and periodic inspections.",
    duration: "4 hours",
    tag: "Qualification prep",
    accentClass: "from-rose-500 to-rose-700",
    iconPath:
      "M4 6h16M4 12h16M4 18h10M18 16l2 2-2 2",
  },
  {
    slug: "am2-practical-readiness",
    title: "AM2 Practical Readiness",
    tagline:
      "Walkthrough of the AM2 assessment stages with tips from our master assessors. Unlocks with our AM2 package.",
    duration: "1 hour 30 minutes",
    tag: "Apprentice end-point",
    accentClass: "from-purple-500 to-purple-700",
    iconPath:
      "M12 2 2 7l10 5 10-5-10-5Zm0 12L2 9v6l10 5 10-5V9l-10 5Z",
  },
];

export function getCourseBySlug(slug: string): ElearningCourse | null {
  if (slug === FREE_COURSE.slug) return FREE_COURSE;
  return LOCKED_COURSES.find((c) => c.slug === slug) ?? null;
}

export function isFreeCourse(slug: string): boolean {
  return slug === FREE_COURSE.slug;
}
