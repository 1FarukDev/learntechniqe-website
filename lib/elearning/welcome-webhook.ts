/**
 * Lead source for routing welcome emails to Meta vs Google Ads Catch Hooks.
 */
export type LeadSourceType = "meta" | "google_ads";

export function normalizeLeadSourceType(raw: unknown): LeadSourceType {
  if (typeof raw !== "string") return "meta";
  const t = raw.trim().toLowerCase();
  if (
    t === "google_ads" ||
    t === "google" ||
    t === "google ads" ||
    t === "googleads"
  ) {
    return "google_ads";
  }
  if (t === "meta" || t === "facebook" || t === "fb") {
    return "meta";
  }
  return "meta";
}

/**
 * Resolves Catch Hook URL: per-source env, then legacy `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`.
 */
export function resolveWelcomeWebhookUrl(type: LeadSourceType): string | undefined {
  const legacy = process.env.ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL?.trim();
  if (type === "google_ads") {
    return (
      process.env.ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS?.trim() ||
      legacy
    );
  }
  return (
    process.env.ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META?.trim() || legacy
  );
}

/** Splits a single "full name" when Zapier only sends `name`. */
export function splitFullName(full: string): { first: string; last: string } {
  const s = full.trim();
  if (!s) return { first: "", last: "" };
  const i = s.indexOf(" ");
  if (i === -1) return { first: s, last: "" };
  return { first: s.slice(0, i).trim(), last: s.slice(i + 1).trim() };
}
