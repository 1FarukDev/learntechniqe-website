import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env (see Sanity project settings).",
  );
}

/** CDN host is `{id}.apicdn.sanity.io`. Set NEXT_PUBLIC_SANITY_USE_CDN=false to use `{id}.api.sanity.io` if DNS/firewall blocks the CDN. */
const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";

export const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn,
});