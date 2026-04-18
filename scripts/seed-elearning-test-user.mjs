/**
 * Seeds (or resets) a learner row in Supabase for local / staging testing.
 *
 * Usage (from repo root, with .env containing Supabase keys):
 *   npm run seed:elearning-test-user
 *
 * Optional overrides in .env:
 *   ELEARNING_TEST_EMAIL=you@example.com
 *   ELEARNING_TEST_PASSWORD=YourChosenPassword
 *
 * Re-running resets completed_at so you can test the full course → certificate flow again.
 */

import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const email = (
  process.env.ELEARNING_TEST_EMAIL || "elearning-test@learntechnique.local"
).trim().toLowerCase();
const password =
  process.env.ELEARNING_TEST_PASSWORD || "LearnTest-Portal-2026";

if (!url || !serviceKey) {
  console.error(
    "\nMissing Supabase env vars. Add to .env:\n" +
      "  NEXT_PUBLIC_SUPABASE_URL\n" +
      "  SUPABASE_SERVICE_ROLE_KEY\n" +
      "\nThen run: npm run seed:elearning-test-user\n"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const passwordHash = await bcrypt.hash(password, 10);
const courseSlug = "electrical-safety-essentials";

const row = {
  email,
  first_name: "Test",
  last_name: "Learner",
  phone: null,
  password_hash: passwordHash,
  course_slug: courseSlug,
  source: "seed-script",
  ad_campaign: null,
  completed_at: null,
  last_login_at: null,
};

const { data, error } = await supabase
  .from("learners")
  .upsert(row, { onConflict: "email" })
  .select("id, email")
  .single();

if (error) {
  console.error("\nSupabase error:", error.message);
  console.error(
    "\nIf the table is missing, run supabase-schema.sql in the Supabase SQL editor.\n"
  );
  process.exit(1);
}

console.log("\n── E-learning test learner ready ─────────────────────────────");
console.log("  Login URL:    http://localhost:3000/learn/login");
console.log("  Email:       ", data?.email ?? email);
console.log("  Password:    ", password);
console.log("  Dashboard:   http://localhost:3000/learn/dashboard");
console.log("\n  (Re-run this script anytime to reset password & completion.)\n");
