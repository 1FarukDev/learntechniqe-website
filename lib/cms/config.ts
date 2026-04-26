export { isLocalCmsEnabled, getLocalCmsModeInfo } from "./local-mode";

/** Path to JSON store, relative to project cwd unless absolute. */
export function getLocalCmsDataPath(): string {
  return process.env.LOCAL_CMS_DATA_PATH || "data/local-cms/store.json";
}
