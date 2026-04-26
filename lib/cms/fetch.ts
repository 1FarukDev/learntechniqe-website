import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { getCmsDataCacheRevalidateResolved } from "./data-cache-settings";
import { isLocalCmsEnabled } from "./config";
import { runLocalCmsQuery } from "./local-engine";

const revalidateForThisRequest = cache(async () => {
  const { nextSeconds } = await getCmsDataCacheRevalidateResolved();
  return nextSeconds;
});

/**
 * Use everywhere you previously called `client.fetch`.
 * When local mode is on (see admin → Content source), reads the local JSON store.
 * Otherwise uses the shared Sanity client with Next Data Cache revalidation
 * from admin + env (see `lib/cms/data-cache-settings.ts`).
 */
export async function cmsFetch<T>(
  query: string,
  params?: Record<string, unknown>,
): Promise<T> {
  if (isLocalCmsEnabled()) {
    return runLocalCmsQuery<T>(query, params);
  }
  const revalidate = await revalidateForThisRequest();
  // GROQ params are typed at call sites; next-sanity’s QueryParams is stricter.
  return client.fetch<T>(query, params as never, {
    next: { revalidate },
  });
}
