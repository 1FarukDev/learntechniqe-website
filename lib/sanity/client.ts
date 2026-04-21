import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env (see Sanity project settings).",
  );
}

/**
 * CDN uses `{projectId}.apicdn.sanity.io`. Some networks/VPNs hit ConnectTimeout (e.g. 10s) there.
 * Set NEXT_PUBLIC_SANITY_USE_CDN=false so queries use `{projectId}.api.sanity.io` instead.
 */
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

const requestTimeoutMs = (() => {
  const raw = process.env.SANITY_FETCH_TIMEOUT_MS;
  if (!raw) return undefined;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
})();

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn,
  ...(requestTimeoutMs !== undefined ? { timeout: requestTimeoutMs } : {}),
});
