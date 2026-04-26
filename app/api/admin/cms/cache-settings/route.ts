import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CMS_ADMIN_COOKIE_NAME,
  verifyCmsAdminSessionToken,
} from "@/lib/cms/admin-session";
import {
  bumpCmsDataCacheConfigCache,
  clampCmsRevalidateForStorage,
  cmsDataCacheEnvIsSet,
  getCmsDataCacheRevalidateResolved,
  readCmsRevalidateFromPersistence,
  writeCmsRevalidateSetting,
} from "@/lib/cms/data-cache-settings";
import { SANITY_CMS_REVALIDATE_SECONDS } from "@/lib/sanity/fetch-constants";

export const runtime = "nodejs";

async function requireCmsAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(CMS_ADMIN_COOKIE_NAME)?.value;
  return verifyCmsAdminSessionToken(token);
}

export async function GET() {
  if (!(await requireCmsAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const resolved = await getCmsDataCacheRevalidateResolved();
  return NextResponse.json(
    {
      defaultSeconds: SANITY_CMS_REVALIDATE_SECONDS,
      /** Raw storage: -1 default, 0 off, else seconds */
      storedRaw: resolved.persisted.raw,
      storage: resolved.persisted.where,
      nextSeconds: resolved.nextSeconds,
      effectiveSource: resolved.effectiveSource,
      envOverrides: cmsDataCacheEnvIsSet(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: NextRequest) {
  if (!(await requireCmsAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (cmsDataCacheEnvIsSet()) {
    return NextResponse.json(
      {
        error:
          "Cache is fixed by CMS_DATA_CACHE_REVALIDATE_SECONDS in the environment. Remove that variable to use admin settings.",
      },
      { status: 409 },
    );
  }

  let body: { revalidateSeconds?: number };
  try {
    body = (await request.json()) as { revalidateSeconds?: number };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const n = body.revalidateSeconds;
  if (typeof n !== "number" || !Number.isFinite(n)) {
    return NextResponse.json(
      { error: "revalidateSeconds must be a number (-1, 0, or 5+)" },
      { status: 400 },
    );
  }
  if (n !== 0 && n !== -1 && n < 5) {
    return NextResponse.json(
      { error: "Use 0 (no cache), -1 (default), or at least 5 seconds" },
      { status: 400 },
    );
  }
  if (n > 604_800) {
    return NextResponse.json(
      { error: "Maximum 604800 seconds (7 days)" },
      { status: 400 },
    );
  }

  const toWrite = clampCmsRevalidateForStorage(n);
  const where = await writeCmsRevalidateSetting(toWrite);
  if (where === "failed") {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
  bumpCmsDataCacheConfigCache();
  const persisted = await readCmsRevalidateFromPersistence();
  return NextResponse.json({
    ok: true,
    revalidateSeconds: toWrite,
    where,
    persisted: persisted,
  });
}
