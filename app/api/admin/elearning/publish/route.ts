import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import {
  getCourseRowById,
  invalidateCoursesCache,
  scormBucketName,
} from "@/lib/elearning/course-settings";
import { getSupabaseAdmin } from "@/lib/elearning/db";
import { extractScormZip, guessMime } from "@/lib/elearning/scorm-zip";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const courseIdRaw = body.courseId;
  const courseId =
    typeof courseIdRaw === "number"
      ? courseIdRaw
      : typeof courseIdRaw === "string"
        ? Number(courseIdRaw)
        : NaN;
  if (!Number.isFinite(courseId) || courseId <= 0) {
    return NextResponse.json({ error: "courseId is required" }, { status: 400 });
  }

  const stagingZipPath =
    typeof body.stagingZipPath === "string" ? body.stagingZipPath.trim() : "";
  if (!stagingZipPath.startsWith("staging/") || !stagingZipPath.endsWith(".zip")) {
    return NextResponse.json(
      { error: "Invalid stagingZipPath (expected staging/<uuid>.zip)" },
      { status: 400 }
    );
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const tagline = typeof body.tagline === "string" ? body.tagline.trim() : "";
  const duration = typeof body.duration === "string" ? body.duration.trim() : "";
  let entryFile =
    typeof body.entryFile === "string" ? body.entryFile.trim() : "index.html";
  entryFile = entryFile.replace(/^\/+/, "") || "index.html";

  if (!title || !duration) {
    return NextResponse.json(
      { error: "Title and duration are required." },
      { status: 400 }
    );
  }

  const courseRow = await getCourseRowById(courseId);
  if (!courseRow) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  const prefix = courseRow.slug.replace(/^\/+|\/+$/g, "");

  const bucket = scormBucketName();
  const supabase = getSupabaseAdmin();

  const { data: zipBlob, error: dlError } = await supabase.storage
    .from(bucket)
    .download(stagingZipPath);

  if (dlError || !zipBlob) {
    console.error("publish: download staging zip", dlError);
    return NextResponse.json(
      {
        error:
          "Could not read the uploaded zip. Upload again (sign-upload → PUT → publish).",
      },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await zipBlob.arrayBuffer());

  let extracted: ReturnType<typeof extractScormZip>;
  try {
    extracted = extractScormZip(buf);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Invalid zip package.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const { files, manifestEntryHint } = extracted;

  let launchFile = entryFile;
  const hasLaunch = files.some((f) => f.relativePath === launchFile);
  if (!hasLaunch && manifestEntryHint) {
    launchFile = manifestEntryHint;
  }
  const exists = files.some((f) => f.relativePath === launchFile);
  if (!exists) {
    return NextResponse.json(
      {
        error: `Launch file not found in package: "${launchFile}". Try setting Entry file to the HTML file inside the zip (from imsmanifest).`,
      },
      { status: 400 }
    );
  }

  for (const f of files) {
    const objectPath = `${prefix}/${f.relativePath}`;
    const { error: upError } = await supabase.storage.from(bucket).upload(objectPath, f.data, {
      upsert: true,
      contentType: guessMime(f.relativePath),
    });
    if (upError) {
      console.error("publish upload failed", objectPath, upError);
      return NextResponse.json(
        { error: `Upload failed for ${f.relativePath}: ${upError.message}` },
        { status: 500 }
      );
    }
  }

  await supabase.storage.from(bucket).remove([stagingZipPath]);

  const { error: dbError } = await supabase
    .from("elearning_courses")
    .update({
      title,
      tagline,
      duration,
      entry_file: launchFile,
      storage_prefix: prefix,
      package_updated_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", courseId);

  if (dbError) {
    console.error("publish db update", dbError);
    return NextResponse.json(
      { error: "Package uploaded but saving course failed." },
      { status: 500 }
    );
  }

  invalidateCoursesCache();

  return NextResponse.json({
    success: true,
    slug: prefix,
    entry_file: launchFile,
    fileCount: files.length,
  });
}
