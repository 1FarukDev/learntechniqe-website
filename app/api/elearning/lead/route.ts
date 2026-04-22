import { NextRequest, NextResponse } from "next/server";
import {
  generateWelcomePassword,
  upsertLearnerWithPassword,
} from "@/lib/elearning/learners";
import { getCourseSettings } from "@/lib/elearning/course-settings";
import {
  normalizeLeadSourceType,
  resolveWelcomeWebhookUrl,
  splitFullName,
} from "@/lib/elearning/welcome-webhook";

export const runtime = "nodejs";

/**
 * Zapier (or any ad-funnel) posts new leads here. Creates/refreshes the
 * learner record with a freshly generated password, then fires a Zapier Catch
 * Hook so you can send the welcome email.
 *
 * Optional JSON field `type`: `"meta"` | `"google_ads"` — routes the welcome
 * POST to `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META` or
 * `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS`, with fallback to
 * `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`.
 *
 * Protected by `X-Lead-Secret` matching `ELEARNING_LEAD_INTAKE_SECRET`.
 */
export async function POST(request: NextRequest) {
  const intakeSecret = process.env.ELEARNING_LEAD_INTAKE_SECRET?.trim();
  if (!intakeSecret) {
    return NextResponse.json(
      { error: "Lead intake not configured" },
      { status: 500 },
    );
  }

  const provided = request.headers.get("x-lead-secret")?.trim();
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
      { status: 400 },
    );
  }

  let firstName =
    typeof body.first_name === "string"
      ? body.first_name
      : typeof body.firstName === "string"
        ? body.firstName
        : "";
  let lastName =
    typeof body.last_name === "string"
      ? body.last_name
      : typeof body.lastName === "string"
        ? body.lastName
        : "";

  if (
    !(firstName ?? "").trim() &&
    !(lastName ?? "").trim() &&
    typeof body.name === "string"
  ) {
    const split = splitFullName(body.name);
    firstName = split.first;
    lastName = split.last;
  }

  firstName = (firstName ?? "").trim();
  lastName = (lastName ?? "").trim();

  const phone =
    typeof body.phone === "string"
      ? body.phone
      : typeof body.phone_number === "string"
        ? body.phone_number
        : null;
  const leadCourse =
    typeof body.course === "string" ? body.course.trim() : "";
  const leadCourseSlug =
    typeof body.course_slug === "string"
      ? body.course_slug.trim()
      : typeof body.courseSlug === "string"
        ? body.courseSlug.trim()
        : "";
  const source = typeof body.source === "string" ? body.source : "ad-funnel";
  const adCampaign =
    typeof body.campaign === "string"
      ? body.campaign
      : typeof body.ad_campaign === "string"
        ? body.ad_campaign
        : null;

  const leadType = normalizeLeadSourceType(body.type);

  const password = generateWelcomePassword();

  const courseMeta = await getCourseSettings();
  const courseForWelcome = leadCourse || courseMeta.title;
  const courseSlugForWelcome = leadCourseSlug || courseMeta.slug;

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
      { status: 500 },
    );
  }

  const loginUrl = new URL("/learn/login", request.nextUrl.origin).toString();
  const welcomeWebhook = resolveWelcomeWebhookUrl(leadType);

  if (welcomeWebhook) {
    try {
      await fetch(welcomeWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: result.learner.email,
          first_name: result.learner.firstName,
          last_name: result.learner.lastName,
          phone: result.learner.phone,
          password,
          login_url: loginUrl,
          course: courseForWelcome,
          course_slug: courseSlugForWelcome,
          course_title: courseMeta.title,
          course_duration: courseMeta.duration,
          is_new_account: result.created,
          timestamp: new Date().toISOString(),
          type: leadType,
          source,
          ad_campaign: adCampaign,
        }),
      });
    } catch (err) {
      console.error("elearning/lead: welcome webhook failed", err);
    }
  } else {
    console.warn(
      `elearning/lead: no welcome webhook for type=${leadType}; set ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META, ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS, or ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`,
    );
  }

  return NextResponse.json({
    success: true,
    created: result.created,
    login_url: loginUrl,
    type: leadType,
  });
}
