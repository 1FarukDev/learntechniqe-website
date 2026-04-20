import { timingSafeEqual } from "node:crypto";

/** Constant-time compare for admin password from env. API routes only. */
export function verifyAdminPassword(provided: string): boolean {
  const expected = process.env.ELEARNING_ADMIN_PASSWORD;
  if (!expected || expected.length < 12) {
    console.error(
      "ELEARNING_ADMIN_PASSWORD is not set or shorter than 12 characters."
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
