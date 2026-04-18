import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { getSupabaseAdmin, type LearnerRow } from "./db";

export interface Learner {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  courseSlug: string;
  completedAt: Date | null;
  source: string | null;
  adCampaign: string | null;
  createdAt: Date;
  lastLoginAt: Date | null;
}

function mapRow(row: LearnerRow): Learner {
  return {
    id: Number(row.id),
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    courseSlug: row.course_slug,
    completedAt: row.completed_at ? new Date(row.completed_at) : null,
    source: row.source,
    adCampaign: row.ad_campaign,
    createdAt: new Date(row.created_at),
    lastLoginAt: row.last_login_at ? new Date(row.last_login_at) : null,
  };
}

const PASSWORD_ALPHABET =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

/** Generates a friendly 10-char password that's still high-entropy (~58 bits). */
export function generateWelcomePassword(length = 10): string {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += PASSWORD_ALPHABET[bytes[i] % PASSWORD_ALPHABET.length];
  }
  return out;
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 10);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export async function findLearnerByEmail(
  email: string
): Promise<Learner | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("learners")
    .select("*")
    .ilike("email", email.trim())
    .maybeSingle<LearnerRow>();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function findLearnerById(id: number): Promise<Learner | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("learners")
    .select("*")
    .eq("id", id)
    .maybeSingle<LearnerRow>();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function findLearnerCredentials(
  email: string
): Promise<{ learner: Learner; passwordHash: string } | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("learners")
    .select("*")
    .ilike("email", email.trim())
    .maybeSingle<LearnerRow>();
  if (error) throw error;
  if (!data) return null;
  return { learner: mapRow(data), passwordHash: data.password_hash };
}

export interface CreateLearnerInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string | null;
  password: string;
  courseSlug?: string;
  source?: string | null;
  adCampaign?: string | null;
}

/**
 * Creates a new learner, or updates the existing one with a fresh password if
 * the email already exists. Keeps the ad-funnel flow idempotent: a learner who
 * fills the Ads form twice simply receives a fresh password in the welcome
 * email.
 */
export async function upsertLearnerWithPassword(
  input: CreateLearnerInput
): Promise<{ learner: Learner; created: boolean }> {
  const supabase = getSupabaseAdmin();
  const email = input.email.trim().toLowerCase();
  const passwordHash = await hashPassword(input.password);
  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const phone = input.phone?.trim() || null;
  const courseSlug = input.courseSlug ?? "electrical-safety-essentials";
  const source = input.source ?? null;
  const campaign = input.adCampaign ?? null;

  const existing = await findLearnerCredentials(email);

  if (!existing) {
    const { data, error } = await supabase
      .from("learners")
      .insert({
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
        password_hash: passwordHash,
        course_slug: courseSlug,
        source,
        ad_campaign: campaign,
      })
      .select()
      .single<LearnerRow>();
    if (error) throw error;
    if (!data) throw new Error("Insert returned no row");
    return { learner: mapRow(data), created: true };
  }

  const { data, error } = await supabase
    .from("learners")
    .update({
      password_hash: passwordHash,
      first_name: firstName || existing.learner.firstName,
      last_name: lastName || existing.learner.lastName,
      phone: phone ?? existing.learner.phone,
      source: source ?? existing.learner.source,
      ad_campaign: campaign ?? existing.learner.adCampaign,
    })
    .eq("id", existing.learner.id)
    .select()
    .single<LearnerRow>();
  if (error) throw error;
  if (!data) throw new Error("Update returned no row");
  return { learner: mapRow(data), created: false };
}

export async function touchLastLogin(learnerId: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("learners")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", learnerId);
  if (error) {
    // Non-fatal: a failed last-login update shouldn't break sign-in.
    console.error("touchLastLogin failed", error);
  }
}

export async function markCourseCompleted(
  learnerId: number
): Promise<Learner | null> {
  const supabase = getSupabaseAdmin();

  // Read-modify-write so we only stamp the first completion (idempotent).
  const existing = await findLearnerById(learnerId);
  if (!existing) return null;
  if (existing.completedAt) return existing;

  const { data, error } = await supabase
    .from("learners")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", learnerId)
    .select()
    .single<LearnerRow>();
  if (error) throw error;
  if (!data) return null;
  return mapRow(data);
}
