import { NextResponse } from "next/server";
import {
  CMS_ADMIN_COOKIE_NAME,
  cmsAdminCookieOptions,
} from "@/lib/cms/admin-session";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(CMS_ADMIN_COOKIE_NAME, "", {
    ...cmsAdminCookieOptions(),
    maxAge: 0,
  });
  return res;
}
