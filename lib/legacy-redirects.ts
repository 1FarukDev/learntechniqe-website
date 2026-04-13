/**
 * Permanent (308) redirects for old paths so search equity moves to the new URLs.
 *
 * How to use with your old sitemap:
 * 1. For each important old URL path (path only, no domain), add `{ source, destination }`.
 * 2. Use `source` like `/old-slug` — with or without a trailing slash; both variants are registered.
 * 3. `destination` must be a path on this site (e.g. `/courses/electrical/some-course`).
 * 4. If an old blog post path changed, map the old path to `/blog/new-slug` (or the correct slug).
 * 5. `/locations` is handled in `middleware.ts` so the `#location` hash is preserved — do not duplicate it here.
 *
 * Also submit the new sitemap in Google Search Console and use “Redirects” or URL inspection
 * to confirm high-traffic old URLs return 308 to the right target.
 */
export const legacyPathRedirects: readonly {
  readonly source: string;
  readonly destination: string;
}[] = [
  { source: "/plc-training-courses", destination: "/courses/plc" },
  { source: "/electrician-courses", destination: "/courses/electrical" },
  { source: "/online-training-courses", destination: "/courses" },
  // Add more rows from your old sitemap, for example:
  // { source: "/some-old-course-page", destination: "/courses/electrical/new-slug" },
];
