/**
 * Full Sanity / site course titles → labels used in Google Sheets / Zapier.
 * Longer titles must be listed first so lookups stay unambiguous.
 */
const COURSE_TITLE_TO_SHEET_SHORT: readonly [string, string][] = [
  [
    "City and Guilds 2382-22 18th Edition Wiring Regulations - 1 Day Update - Online",
    "2382-22 Online 1 Day Update",
  ],
  [
    "City and Guilds 2382-22 18th Edition Wiring Regulations - 1 Day Update",
    "2382-22 1 Day Update",
  ],
  [
    "City and Guilds 2377-77 In-Service Inspection and Testing of Electrical Equipment (PAT Testing) - 3 Days",
    "2377-77 3 Days",
  ],
  [
    "City and Guilds 2377-77 In-Service Inspection and Testing of Electrical Equipment (PAT Testing) - 2 Days",
    "2377-77 2 Days",
  ],
  [
    "City and Guilds 2921-34 Level 3 Award in Design and Installation of Domestic and Small Commercial Electric Vehicle Charging Installations",
    "2921-34",
  ],
  [
    "EAL Level 3 Award in the Requirements of Fire Detection and Fire Alarm Systems for Buildings BS 5839 with Addressable systems",
    "Fire Alarms",
  ],
  [
    "City and Guilds 2382-22 18th Edition Wiring Regulations - Online",
    "2382-22 Online",
  ],
  [
    "City and Guilds 2391-52 Initial and Periodic Inspection and Testing of Electrical Installations",
    "2391-52",
  ],
  [
    "City and Guilds 2391-51 Periodic Inspection and Testing of Electrical Installations",
    "2391-51",
  ],
  [
    "City and Guilds 2383-10 Building Regulations for Electrical Installations in Dwellings (Part P)",
    "2383-10",
  ],
  [
    "City and Guilds 2391-50 Initial Verification of Electrical Installations",
    "2391-50",
  ],
  [
    "City and Guilds 2392-10 Fundamental Inspection and Testing",
    "2392-10",
  ],
  ["Central Heating Controls - Wiring and Fault Finding", "Central Heating"],
  ["City and Guilds 2382-22 18th Edition Wiring Regulations", "2382-22"],
  ["Refrigeration Air Conditioning and Heat Pump Systems", "RACHP"],
]

function normalizeZapierCourseTitle(name: string): string {
  return name
    .trim()
    .replaceAll("&", "and")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
}

const SHEET_SHORT_BY_NORMALIZED = new Map<string, string>()
for (const [full, short] of COURSE_TITLE_TO_SHEET_SHORT) {
  SHEET_SHORT_BY_NORMALIZED.set(normalizeZapierCourseTitle(full), short)
}

/**
 * Sheet short name when the title matches a known course; otherwise normalizes
 * `&` → `and`, trims, and collapses whitespace (Zapier-safe).
 */
export function formatCourseNameForZapier(name: string): string {
  const normalized = normalizeZapierCourseTitle(name)
  return SHEET_SHORT_BY_NORMALIZED.get(normalized) ?? normalized
}
