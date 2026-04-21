import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  verifyAdminSessionToken,
} from "@/lib/elearning/admin-auth";
import { deleteLearnerById, listLearners } from "@/lib/elearning/learners";

export const runtime = "nodejs";

async function requireAdmin(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const learners = await listLearners(500);
  return NextResponse.json({ learners });
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const idRaw = searchParams.get("id");
  const id = idRaw ? Number(idRaw) : NaN;
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: "id query parameter required" }, { status: 400 });
  }

  try {
    await deleteLearnerById(id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("delete learner", e);
    return NextResponse.json({ error: "Could not delete learner" }, { status: 500 });
  }
}
