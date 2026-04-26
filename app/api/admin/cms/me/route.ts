import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CMS_ADMIN_COOKIE_NAME,
  verifyCmsAdminSessionToken,
} from "@/lib/cms/admin-session";

export const runtime = "nodejs";

export async function GET() {
  const store = await cookies();
  const token = store.get(CMS_ADMIN_COOKIE_NAME)?.value;
  const ok = await verifyCmsAdminSessionToken(token);
  return NextResponse.json({ authenticated: ok });
}
