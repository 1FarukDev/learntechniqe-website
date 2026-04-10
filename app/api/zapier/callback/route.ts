import { NextRequest, NextResponse } from "next/server";
import { formatCourseNameForZapier } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const webhookUrl =
      process.env.ZAPIER_CALLBACK_WEBHOOK_URL ||
      process.env.ZAPIER_COURSE_OVERVIEW_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error(
        "ZAPIER_CALLBACK_WEBHOOK_URL is not configured (optional legacy: ZAPIER_COURSE_OVERVIEW_WEBHOOK_URL)",
      );
      return NextResponse.json(
        { error: "Callback request is not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const courseLabel =
      typeof body.course === "string" && body.course.trim()
        ? body.course.trim()
        : typeof body.course_name === "string" && body.course_name.trim()
          ? body.course_name.trim()
          : typeof body.course_title === "string" && body.course_title.trim()
            ? body.course_title.trim()
            : undefined;
    const payload: Record<string, unknown> = {
      ...body,
      ...(courseLabel != null
        ? { course: courseLabel, course_name: body.course_name ?? courseLabel }
        : {}),
      source: "request_callback",
      timestamp: new Date().toISOString(),
    };
    if (typeof payload.course === "string") {
      payload.course = formatCourseNameForZapier(payload.course);
    }
    if (typeof payload.course_name === "string") {
      payload.course_name = formatCourseNameForZapier(payload.course_name);
    }
    if (typeof payload.course_title === "string") {
      payload.course_title = formatCourseNameForZapier(payload.course_title);
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook failed: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Callback Zapier submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 },
    );
  }
}
