/**
 * When USE_LOCAL_CMS=true, all content reads use the local JSON store
 * (no Sanity API requests). Export content first: `npm run export:local-cms`.
 */
export function isLocalCmsEnabled(): boolean {
  return process.env.USE_LOCAL_CMS === "true";
}

/** Path to JSON store, relative to project cwd unless absolute. */
export function getLocalCmsDataPath(): string {
  return process.env.LOCAL_CMS_DATA_PATH || "data/local-cms/store.json";
}
