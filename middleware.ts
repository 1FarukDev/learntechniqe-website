import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveLegacyRedirect } from "@/lib/legacy-redirect-resolve";
import {
  LEARNER_COOKIE_NAME,
  verifyLearnerToken,
} from "@/lib/elearning/auth";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import {
  isBlockedElearningPath,
  isElearningPlatformDisabled,
} from "@/lib/elearning/platform-access";

const PROTECTED_LEARNER_PREFIXES = [
  "/learn/dashboard",
  "/learn/courses",
  "/learn/certificate",
];

function isProtectedLearnerPath(pathname: string): boolean {
  return PROTECTED_LEARNER_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function isProtectedAdminPath(pathname: string): boolean {
  return (
    pathname.startsWith("/admin/elearning") &&
    pathname !== "/admin/elearning/login"
  );
}

export async function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.endsWith(".local");

  if (!isLocal && (host === "learntechnique.com" || host === "www.learntechnique.com")) {
    if (host === "learntechnique.com" || request.nextUrl.protocol !== "https:") {
      const u = request.nextUrl.clone();
      u.hostname = "www.learntechnique.com";
      u.protocol = "https:";
      return NextResponse.redirect(u, 308);
    }
  }

  const pathname = request.nextUrl.pathname;

  if (isElearningPlatformDisabled() && isBlockedElearningPath(pathname)) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "E-learning is currently unavailable." },
        { status: 403 }
      );
    }
    const url = request.nextUrl.clone();
    url.pathname = "/404";
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (isProtectedAdminPath(pathname)) {
    const adminToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const ok = await verifyAdminSessionToken(adminToken);
    if (!ok) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/admin/elearning/login";
      redirect.searchParams.set("next", pathname);
      return NextResponse.redirect(redirect);
    }
    return NextResponse.next();
  }

  if (isProtectedLearnerPath(pathname)) {
    const token = request.cookies.get(LEARNER_COOKIE_NAME)?.value;
    const session = await verifyLearnerToken(token);
    if (!session) {
      const redirect = request.nextUrl.clone();
      redirect.pathname = "/learn/login";
      redirect.searchParams.set("next", pathname);
      return NextResponse.redirect(redirect);
    }
    return NextResponse.next();
  }

  const target = resolveLegacyRedirect(pathname);
  if (!target) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = target.pathname;
  url.hash = target.hash ?? "";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|documents|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|xml|pdf|doc|docx|woff2?|ttf)).*)",
  ],
};
