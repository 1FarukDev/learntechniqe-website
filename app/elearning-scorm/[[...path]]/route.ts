import { NextRequest, NextResponse } from "next/server";
import {
  getAuthorizedScormPathPrefixes,
  pathMatchesAnyPrefix,
  scormBucketName,
} from "@/lib/elearning/course-settings";
import { getSupabaseAdmin } from "@/lib/elearning/db";
import { guessMime } from "@/lib/elearning/scorm-zip";

export const runtime = "nodejs";

/**
 * Serves SCORM assets from Supabase Storage under the same site origin so
 * `window.parent.API` (SCORM 1.2) remains accessible from the iframe.
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path: rawPath } = await context.params;
  const segments = rawPath ?? [];
  if (segments.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const objectPath = segments.map((s) => decodeURIComponent(s)).join("/");
  const prefixes = await getAuthorizedScormPathPrefixes();
  if (prefixes.length === 0) {
    return new NextResponse("No SCORM package published to storage", {
      status: 404,
    });
  }

  if (!pathMatchesAnyPrefix(objectPath, prefixes)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const supabase = getSupabaseAdmin();
  const bucket = scormBucketName();
  const { data, error } = await supabase.storage.from(bucket).download(objectPath);

  if (error || !data) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buf = Buffer.from(await data.arrayBuffer());
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      "Content-Type": guessMime(objectPath),
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
