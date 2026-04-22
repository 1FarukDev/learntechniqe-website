import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import { scormBucketName } from "@/lib/elearning/course-settings";
import { getSupabaseAdmin } from "@/lib/elearning/db";

export const runtime = "nodejs";

export async function POST() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  if (!(await verifyAdminSessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bucket = scormBucketName();
  const objectPath = `staging/${randomUUID()}.zip`;
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(objectPath);

  if (error || !data?.signedUrl) {
    console.error("sign-upload failed", error);
    return NextResponse.json(
      {
        error:
          "Could not create upload URL. Ensure the Storage bucket exists (see supabase-elearning-admin.sql).",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    signedUrl: data.signedUrl,
    path: objectPath,
    token: data.token,
  });
}
