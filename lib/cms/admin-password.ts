import { timingSafeEqual } from "node:crypto";

/**
 * Password for /admin/cms (local content admin). Server-only.
 * Set SANITY_CMS_ADMIN_PASSWORD (min 12 chars). Distinct from Sanity account password.
 */
export function verifyCmsAdminPassword(provided: string): boolean {
  const expected = process.env.SANITY_CMS_ADMIN_PASSWORD;
  if (!expected || expected.length < 12) {
    console.error(
      "SANITY_CMS_ADMIN_PASSWORD is not set or shorter than 12 characters.",
    );
    return false;
  }
  try {
    const a = Buffer.from(provided, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
