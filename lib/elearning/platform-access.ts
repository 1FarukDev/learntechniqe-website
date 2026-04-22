/**
 * When `NEXT_PUBLIC_SHOW_LEARNER_LOGIN` is the string `"false"`, the learner
 * portal, e-learning admin, SCORM routes, and related APIs are disabled.
 */
export function isElearningPlatformDisabled(): boolean {
  return process.env.NEXT_PUBLIC_SHOW_LEARNER_LOGIN === "false";
}

/** Paths blocked when {@link isElearningPlatformDisabled} is true. */
export function isBlockedElearningPath(pathname: string): boolean {
  if (pathname.startsWith("/learn")) return true;
  if (pathname.startsWith("/admin/elearning")) return true;
  if (pathname.startsWith("/elearning-scorm")) return true;
  if (pathname === "/elearning" || pathname.startsWith("/elearning/")) return true;
  if (pathname.startsWith("/api/elearning")) return true;
  if (pathname.startsWith("/api/admin/elearning")) return true;
  return false;
}
