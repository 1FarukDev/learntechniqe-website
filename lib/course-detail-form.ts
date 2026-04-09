/** Use from the browser only (e.g. form submit). */
export function getAbsoluteCourseUrl(relativePath: string): string {
  if (typeof window === "undefined") return relativePath;
  const path = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
  return `${window.location.origin}${path}`;
}

export function splitFullName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const t = fullName.trim();
  if (!t) return { first_name: "", last_name: "" };
  const i = t.indexOf(" ");
  if (i === -1) return { first_name: t, last_name: "" };
  return { first_name: t.slice(0, i), last_name: t.slice(i + 1).trim() };
}
