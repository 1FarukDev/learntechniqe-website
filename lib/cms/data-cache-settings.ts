import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import { SANITY_CMS_REVALIDATE_SECONDS } from "@/lib/sanity/fetch-constants";
import { getLocalCmsDataPath } from "./config";

export const CMS_CACHE_SETTINGS_FILE = "cache-settings.json";

/** True when `CMS_DATA_CACHE_REVALIDATE_SECONDS` is set; that value wins over admin storage. */
export function cmsDataCacheEnvIsSet(): boolean {
  return process.env.CMS_DATA_CACHE_REVALIDATE_SECONDS !== undefined;
}

function getEnvOverrideSeconds(): number | null {
  const raw = process.env.CMS_DATA_CACHE_REVALIDATE_SECONDS;
  if (raw === undefined || raw === "") return null;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

function getCacheSettingsDir(): string {
  const store = getLocalCmsDataPath();
  return path.isAbsolute(store)
    ? path.dirname(store)
    : path.join(process.cwd(), path.dirname(store));
}

function getCacheSettingsPath(): string {
  return path.join(getCacheSettingsDir(), CMS_CACHE_SETTINGS_FILE);
}

type FileShape = { revalidateSeconds: number };

/**
 * -1 = “use app default (constant / env)”, 0 = no data cache, else seconds (5 … 7d)
 */
export function clampCmsRevalidateForStorage(n: number): number {
  if (n === 0) return 0;
  if (n < 0 || n === -1) return -1;
  return Math.max(5, Math.min(604_800, Math.floor(n)));
}

type PersistedMeta = { raw: number; where: "supabase" | "file" | "default" };

/**
 * What is stored for admin (ignores `CMS_DATA_CACHE_REVALIDATE_SECONDS` override).
 * Used to populate the admin form.
 */
export async function readCmsRevalidateFromPersistence(): Promise<PersistedMeta> {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { getSupabaseAdmin } = await import("@/lib/elearning/db");
      const sb = getSupabaseAdmin();
      const { data, error } = await sb
        .from("cms_cache_settings")
        .select("revalidate_seconds")
        .eq("id", "default")
        .maybeSingle();
      if (!error && data && typeof data.revalidate_seconds === "number") {
        return { raw: data.revalidate_seconds, where: "supabase" };
      }
    } catch {
      /* no table or Supabase */
    }
  }
  try {
    const filePath = getCacheSettingsPath();
    const raw = await readFile(filePath, "utf8");
    const p = JSON.parse(raw) as FileShape;
    if (typeof p.revalidateSeconds === "number" && Number.isFinite(p.revalidateSeconds)) {
      return { raw: clampCmsRevalidateForStorage(p.revalidateSeconds), where: "file" };
    }
  } catch {
    /* */
  }
  return { raw: -1, where: "default" };
}

/**
 * Resolves a stored -1/0/seconds to what Next’s `revalidate` expects.
 */
export function resolveCmsRevalidateToSeconds(stored: number): number {
  if (stored === 0) return 0;
  if (stored < 0) return SANITY_CMS_REVALIDATE_SECONDS;
  return clampCmsRevalidateForStorage(stored);
}

let mem: { at: number; value: Awaited<ReturnType<typeof buildResolved>> } | null = null;
const MEM_MS = 15_000;

export function bumpCmsDataCacheConfigCache(): void {
  mem = null;
}

async function buildResolved() {
  const env = getEnvOverrideSeconds();
  const persisted = await readCmsRevalidateFromPersistence();
  if (env !== null) {
    return {
      nextSeconds: env,
      effectiveSource: "env" as const,
      persisted,
      envValue: env,
    };
  }
  const nextSeconds = resolveCmsRevalidateToSeconds(persisted.raw);
  return {
    nextSeconds,
    effectiveSource:
      persisted.where === "default" ? ("default" as const) : ("persistence" as const),
    persisted,
    envValue: null,
  };
}

/**
 * Value used for public `cmsFetch` (respects env override, then storage, 15s in-process memo).
 */
export async function getCmsDataCacheRevalidateResolved() {
  if (mem && Date.now() - mem.at < MEM_MS) return mem.value;
  const value = await buildResolved();
  mem = { at: Date.now(), value };
  return value;
}

export async function writeCmsRevalidateSetting(
  revalidateSeconds: number,
): Promise<"supabase" | "file" | "failed"> {
  const toStore = clampCmsRevalidateForStorage(revalidateSeconds);
  bumpCmsDataCacheConfigCache();
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { getSupabaseAdmin } = await import("@/lib/elearning/db");
      const sb = getSupabaseAdmin();
      const { error } = await sb.from("cms_cache_settings").upsert(
        { id: "default", revalidate_seconds: toStore },
        { onConflict: "id" },
      );
      if (!error) return "supabase";
    } catch {
      /* */
    }
  }
  const dir = getCacheSettingsDir();
  await mkdir(dir, { recursive: true });
  const toWrite: FileShape = { revalidateSeconds: toStore };
  const fp = getCacheSettingsPath();
  const tmp = `${fp}.tmp`;
  await writeFile(
    tmp,
    `${JSON.stringify(
      toWrite,
      null,
      2,
    )}\n`,
    "utf8",
  );
  try {
    await rename(tmp, fp);
  } catch {
    return "failed";
  }
  return "file";
}
