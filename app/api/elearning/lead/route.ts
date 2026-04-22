import { NextRequest, NextResponse } from "next/server";
import {
  generateWelcomePassword,
  upsertLearnerWithPassword,
} from "@/lib/elearning/learners";
import { getCourseSettings } from "@/lib/elearning/course-settings";

export const runtime = "nodejs";

/**
 * Zapier (or any ad-funnel) posts new leads here. Creates/refreshes the
 * learner record with a freshly generated password, then fires a second
 * Zapier webhook that sends the welcome email.
 *
 * Protected by a shared secret in the `X-Lead-Secret` header to stop random
 * traffic from minting accounts.
 */
export async function POST(request: NextRequest) {
  const intakeSecret = process.env.ELEARNING_LEAD_INTAKE_SECRET;
  if (!intakeSecret) {
    return NextResponse.json(
      { error: "Lead intake not configured" },
      { status: 500 }
    );
  }

  const provided = request.headers.get("x-lead-secret");
  if (!provided || provided !== intakeSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required" },
      { status: 400 }
    );
  }

  const firstName =
    typeof body.first_name === "string"
      ? body.first_name
      : typeof body.firstName === "string"
        ? body.firstName
        : "";
  const lastName =
    typeof body.last_name === "string"
      ? body.last_name
      : typeof body.lastName === "string"
        ? body.lastName
        : "";
  const phone =
    typeof body.phone === "string"
      ? body.phone
      : typeof body.phone_number === "string"
        ? body.phone_number
        : null;
  const source =
    typeof body.source === "string" ? body.source : "ad-funnel";
  const adCampaign =
    typeof body.campaign === "string"
      ? body.campaign
      : typeof body.ad_campaign === "string"
        ? body.ad_campaign
        : null;

  const password = generateWelcomePassword();

  const courseMeta = await getCourseSettings();

  let result;
  try {
    result = await upsertLearnerWithPassword({
      email,
      firstName,
      lastName,
      phone,
      password,
      courseSlug: courseMeta.slug,
      source,
      adCampaign,
    });
  } catch (err) {
    console.error("elearning/lead: upsert failed", err);
    return NextResponse.json(
      { error: "Could not create learner" },
      { status: 500 }
    );
  }

  const loginUrl = new URL("/learn/login", request.nextUrl.origin).toString();
  const welcomeWebhook = process.env.ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL;
  if (welcomeWebhook) {
    try {
      await fetch(welcomeWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.learner.email,
          first_name: result.learner.firstName,
          last_name: result.learner.lastName,
          password,
          login_url: loginUrl,
          course_title: courseMeta.title,
          course_duration: courseMeta.duration,
          is_new_account: result.created,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("elearning/lead: welcome webhook failed", err);
    }
  } else {
    console.warn(
      "ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL not set — skipping welcome email"
    );
  }

  return NextResponse.json({
    success: true,
    created: result.created,
    login_url: loginUrl,
  });
}
