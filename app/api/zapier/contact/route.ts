import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.ZAPIER_CONTACT_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("ZAPIER_CONTACT_WEBHOOK_URL is not configured");
      return NextResponse.json(
        { error: "Contact form submission is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const payload = {
      ...body,
      source: body.source || "contact",
      timestamp: new Date().toISOString(),
    };

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
    console.error("Contact Zapier submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
