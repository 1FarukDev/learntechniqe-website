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

export async function learnerCompletedCourse(
  learnerId: number,
  courseId: number
): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_completions")
    .select("id")
    .eq("learner_id", learnerId)
    .eq("course_id", courseId)
    .maybeSingle();
  if (error) throw error;
  return Boolean(data);
}

export async function getCourseCompletionDate(
  learnerId: number,
  courseId: number
): Promise<Date | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("elearning_completions")
    .select("completed_at")
    .eq("learner_id", learnerId)
    .eq("course_id", courseId)
    .maybeSingle<{ completed_at: string }>();
  if (error) throw error;
  return data?.completed_at ? new Date(data.completed_at) : null;
}

export async function countLearnerCompletions(learnerId: number): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from("elearning_completions")
    .select("*", { count: "exact", head: true })
    .eq("learner_id", learnerId);
  if (error) return 0;
  return count ?? 0;
}

/**
 * Records per-course completion (idempotent). Stamps `learners.completed_at`
 * on first completion of the lead course (Zapier / legacy certificate).
 */
export async function recordCourseCompletionBySlug(
  learnerId: number,
  courseSlug: string
): Promise<{
  learner: Learner | null;
  inserted: boolean;
  completedAt: Date;
  assignOnLead: boolean;
}> {
  const supabase = getSupabaseAdmin();
  const slug = courseSlug.trim();
  const { data: course, error: cErr } = await supabase
    .from("elearning_courses")
    .select("id, assign_on_lead")
    .eq("slug", slug)
    .maybeSingle<{ id: number; assign_on_lead: boolean }>();
  if (cErr) throw cErr;
  if (!course) {
    throw new Error("Unknown course");
  }

  const { error: insErr } = await supabase.from("elearning_completions").insert({
    learner_id: learnerId,
    course_id: course.id,
  });

  let inserted = true;
  if (insErr) {
    const code = (insErr as { code?: string }).code;
    if (code === "23505") inserted = false;
    else throw insErr;
  }

  if (inserted && course.assign_on_lead) {
    await supabase
      .from("learners")
      .update({ completed_at: new Date().toISOString() })
      .eq("id", learnerId)
      .is("completed_at", null);
  }

  const completionDate =
    (await getCourseCompletionDate(learnerId, course.id)) ?? new Date();
  const learner = await findLearnerById(learnerId);
  return {
    learner,
    inserted,
    completedAt: completionDate,
    assignOnLead: course.assign_on_lead,
  };
}

export async function listLearners(limit = 500): Promise<Learner[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("learners")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function deleteLearnerById(id: number): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("learners").delete().eq("id", id);
  if (error) throw error;
}
