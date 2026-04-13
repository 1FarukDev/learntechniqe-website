/**
 * Optional extra `next.config` redirects (applied in addition to middleware).
 * Most legacy URLs are handled in `legacy-redirect-resolve.ts` + `legacy-redirect-data.ts`.
 *
 * Use this only for edge cases that must live in `next.config` (rare).
 */
export const legacyPathRedirects: readonly {
  readonly source: string;
  readonly destination: string;
}[] = [];
