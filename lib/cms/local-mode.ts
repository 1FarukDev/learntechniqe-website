import { existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type LocalCmsModeFile = {
  useLocalCms: boolean;
};

const DEFAULT_RELATIVE = "data/local-cms/local-cms-mode.json";

let cache: { mtimeMs: number; value: boolean; source: "file" } | null = null;

export function getLocalCmsModeFilePath(): string {
  const raw = process.env.LOCAL_CMS_MODE_PATH || DEFAULT_RELATIVE;
  return path.isAbsolute(raw) ? raw : path.join(process.cwd(), raw);
}

function readFileSyncBoolean(): { value: boolean; mtimeMs: number } | null {
  const fp = getLocalCmsModeFilePath();
  if (!existsSync(fp)) {
    cache = null;
    return null;
  }
  const st = statSync(fp);
  if (cache && cache.source === "file" && cache.mtimeMs === st.mtimeMs) {
    return { value: cache.value, mtimeMs: st.mtimeMs };
  }
  const raw = readFileSync(fp, "utf8");
  const j = JSON.parse(raw) as LocalCmsModeFile;
  const value = j.useLocalCms === true;
  cache = { mtimeMs: st.mtimeMs, value, source: "file" };
  return { value, mtimeMs: st.mtimeMs };
}

/**
 * When `local-cms-mode.json` exists, that value is authoritative.
 * If the file is missing, falls back to `USE_LOCAL_CMS` env (deploy / CI compatibility).
 */
export function getLocalCmsModeInfo(): {
  useLocalCms: boolean;
  source: "file" | "env" | "default";
  fileExists: boolean;
} {
  const fromFile = readFileSyncBoolean();
  if (fromFile) {
    return { useLocalCms: fromFile.value, source: "file", fileExists: true };
  }
  if (process.env.USE_LOCAL_CMS === "true") {
    return { useLocalCms: true, source: "env", fileExists: false };
  }
  return { useLocalCms: false, source: "default", fileExists: false };
}

export function isLocalCmsEnabled(): boolean {
  return getLocalCmsModeInfo().useLocalCms;
}

export function clearLocalCmsModeCache(): void {
  cache = null;
}

export async function writeLocalCmsModeFile(
  next: LocalCmsModeFile,
): Promise<void> {
  const fp = getLocalCmsModeFilePath();
  await mkdir(path.dirname(fp), { recursive: true });
  const body = `${JSON.stringify(
    { useLocalCms: next.useLocalCms } satisfies LocalCmsModeFile,
    null,
    2,
  )}\n`;
  await writeFile(fp, body, "utf8");
  clearLocalCmsModeCache();
}
