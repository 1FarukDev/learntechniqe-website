import { NextRequest, NextResponse } from "next/server";
import { formatCourseNameForZapier } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.ZAPIER_BOOK_SESSION_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("ZAPIER_BOOK_SESSION_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Session booking is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const payload: Record<string, unknown> = {
      ...body,
      source: "book_session",
      timestamp: new Date().toISOString(),
    };
    if (typeof payload.course === "string") {
      payload.course = formatCourseNameForZapier(payload.course);
    }
    if (typeof payload.course_name === "string") {
      payload.course_name = formatCourseNameForZapier(payload.course_name);
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
    console.error("Book session Zapier submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
