import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Row shape as stored in the Supabase `learners` table. The table is created
 * one-off via the SQL migration in `supabase-schema.sql`.
 */
export interface LearnerRow {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  password_hash: string;
  course_slug: string;
  completed_at: string | null;
  source: string | null;
  ad_campaign: string | null;
  created_at: string;
  last_login_at: string | null;
}

let adminClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client authenticated with the service-role key.
 *
 * IMPORTANT: this client bypasses Row-Level Security. Only use it inside
 * server-side code (API routes, server components). Never expose the
 * service-role key to the browser.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) return adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not configured. See .env.example."
    );
  }
  if (!serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. See .env.example."
    );
  }

  adminClient = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: { schema: "public" },
  });

  return adminClient;
}
