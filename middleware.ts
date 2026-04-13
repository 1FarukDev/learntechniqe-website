import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/locations" || pathname === "/locations/") {
    const url = request.nextUrl.clone();
    url.pathname = "/company";
    url.hash = "location";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/locations", "/locations/"],
};
