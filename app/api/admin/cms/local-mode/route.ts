import { existsSync } from "node:fs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CMS_ADMIN_COOKIE_NAME,
  verifyCmsAdminSessionToken,
} from "@/lib/cms/admin-session";
import {
  getLocalCmsModeFilePath,
  getLocalCmsModeInfo,
  writeLocalCmsModeFile,
} from "@/lib/cms/local-mode";
import { storeAbsolutePath } from "@/lib/cms/store";

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
  const info = getLocalCmsModeInfo();
  const storePath = storeAbsolutePath();
  return NextResponse.json({
    useLocalCms: info.useLocalCms,
    source: info.source,
    fileExists: info.fileExists,
    storeFilePath: storePath,
    storeFileExists: existsSync(storePath),
    modeFilePath: getLocalCmsModeFilePath(),
  });
}

export async function PUT(request: NextRequest) {
  if (!(await requireCmsAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("useLocalCms" in body)) {
    return NextResponse.json(
      { error: "Body must be { useLocalCms: boolean }" },
      { status: 400 },
    );
  }
  const u = (body as { useLocalCms: unknown }).useLocalCms;
  if (typeof u !== "boolean") {
    return NextResponse.json(
      { error: "useLocalCms must be a boolean" },
      { status: 400 },
    );
  }
  try {
    await writeLocalCmsModeFile({ useLocalCms: u });
  } catch (e) {
    console.error("local-mode write", e);
    return NextResponse.json({ error: "Failed to save setting" }, { status: 500 });
  }
  const info = getLocalCmsModeInfo();
  return NextResponse.json({
    success: true,
    useLocalCms: info.useLocalCms,
    source: info.source,
  });
}
