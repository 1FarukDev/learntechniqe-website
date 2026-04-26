import { NextRequest, NextResponse } from "next/server";
import {
  CMS_ADMIN_COOKIE_NAME,
  cmsAdminCookieOptions,
  signCmsAdminSessionToken,
} from "@/lib/cms/admin-session";
import { verifyCmsAdminPassword } from "@/lib/cms/admin-password";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password =
    typeof body.password === "string" ? body.password : "";
  if (!password) {
    return NextResponse.json({ error: "Password required" }, { status: 400 });
  }

  if (!verifyCmsAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = await signCmsAdminSessionToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set(CMS_ADMIN_COOKIE_NAME, token, cmsAdminCookieOptions());
  return res;
}
