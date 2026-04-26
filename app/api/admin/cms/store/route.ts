import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CMS_ADMIN_COOKIE_NAME,
  verifyCmsAdminSessionToken,
} from "@/lib/cms/admin-session";
import {
  readLocalCmsStore,
  writeLocalCmsStore,
  type LocalCmsStore,
} from "@/lib/cms/store";

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
  try {
    const data = await readLocalCmsStore();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (e) {
    console.error("local CMS store read:", e);
    return NextResponse.json(
      { error: "Could not read store. Run npm run export:local-cms first." },
      { status: 404 },
    );
  }
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

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Expected JSON object" }, { status: 400 });
  }

  const incoming = body as Record<string, unknown>;
  if (incoming.version !== 1) {
    return NextResponse.json(
      { error: 'Store must have version: 1' },
      { status: 400 },
    );
  }
  if (!Array.isArray(incoming.documents)) {
    return NextResponse.json(
      { error: "Store must include a documents array" },
      { status: 400 },
    );
  }

  const next: LocalCmsStore = {
    version: 1,
    exportedAt:
      typeof incoming.exportedAt === "string"
        ? incoming.exportedAt
        : new Date().toISOString(),
    documents: incoming.documents as LocalCmsStore["documents"],
  };

  try {
    await writeLocalCmsStore(next);
  } catch (e) {
    console.error("local CMS store write:", e);
    return NextResponse.json({ error: "Failed to save store" }, { status: 500 });
  }

  return NextResponse.json({ success: true, documentCount: next.documents.length });
}
