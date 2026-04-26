/**
 * One-time (or periodic) export of all published Sanity documents into the local CMS JSON store.
 * Preserves _id, _type, references, and portable text so the site behaves the same as with Sanity reads.
 *
 * Usage: npm run export:local-cms
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID (and dataset). Optional SANITY_API_READ_TOKEN if the dataset is private.
 */
import { createClient } from "next-sanity";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in environment.");
  process.exit(1);
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";
const token = process.env.SANITY_API_READ_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn,
  ...(token ? { token } : {}),
});

const rawPath =
  process.env.LOCAL_CMS_DATA_PATH || "data/local-cms/store.json";
const outPath = path.isAbsolute(rawPath)
  ? rawPath
  : path.join(root, rawPath);

async function fetchAllDocuments() {
  try {
    return await client.fetch(
      `*[!(_id in path("drafts.**"))]`,
    );
  } catch {
    const all = await client.fetch(`*`);
    return Array.isArray(all)
      ? all.filter((d) => d && typeof d._id === "string" && !d._id.startsWith("drafts."))
      : [];
  }
}

const documents = await fetchAllDocuments();

const store = {
  version: 1,
  exportedAt: new Date().toISOString(),
  documents,
};

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, `${JSON.stringify(store, null, 2)}\n`, "utf8");

console.log(`Wrote ${documents.length} documents to ${outPath}`);
console.log(
  "Next: in /admin/cms → Content source, enable the local store (or set USE_LOCAL_CMS until you save a mode file).",
);
console.log("Edit content at /admin/cms (password: SANITY_CMS_ADMIN_PASSWORD).");
