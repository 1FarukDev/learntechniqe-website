import type { NextConfig } from "next";
import { legacyPathRedirects } from "./lib/legacy-redirects";

function permanentRedirectsFromLegacy(
  entries: ReadonlyArray<{ readonly source: string; readonly destination: string }>,
) {
  const out: { source: string; destination: string; permanent: true }[] = [];
  const seen = new Set<string>();

  for (const { source: raw, destination } of entries) {
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    const base = path === "/" ? "/" : path.replace(/\/+$/, "") || "/";
    const variants = base === "/" ? ["/"] : [base, `${base}/`];

    for (const source of variants) {
      if (seen.has(source)) continue;
      seen.add(source);
      out.push({ source, destination, permanent: true });
    }
  }

  return out;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return permanentRedirectsFromLegacy(legacyPathRedirects);
  },
};

export default nextConfig;