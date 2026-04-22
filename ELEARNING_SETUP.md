# Learner portal & free e-learning — setup guide

This document is the single source of truth for configuring the **Learn
Technique learner portal** (`/learn/*`), the **admin console** (`/admin/elearning`),
database, environment variables, Zapier, SCORM packages, and local testing.

For the **rest of the website** (CMS, courses from Sanity, contact forms),
see the root `.env.example` and `README.md`. The learner portal only needs the
variables listed below for e-learning.

---

## What you get (feature summary)

| Area | Details |
|------|---------|
| **Entry** | **Learner Login** in the site header → `/learn/login` |
| **Dashboard** | `/learn/dashboard` — free course card, locked “coming soon” courses, loyalty strip |
| **Course** | `/learn/courses/[slug]` — SCORM 1.2 / 2004 player (`scorm-again`), completion → certificate |
| **Certificate** | `/learn/certificate/[slug]` — on-screen certificate + PDF download (`jspdf`) |
| **APIs** | `POST /api/elearning/lead`, `/login`, `/logout`, `GET /me`, `POST /complete` |
| **Admin** | `/admin/elearning` — edit title / duration / description; upload SCORM zip to Supabase Storage (served via `/elearning-scorm/…` same-origin proxy) |
| **Data** | Supabase Postgres — `learners` (`supabase-schema.sql`), `elearning_course_settings` (`supabase-elearning-admin.sql`) |
| **Auth** | Learners: bcrypt + JWT cookie `lt_learner`. Admin: password env + JWT cookie `lt_eadmin`. Middleware protects learner + admin routes. |

Session cookies are set on **`NextResponse`** in Route Handlers (reliable cookie
delivery in Next.js App Router).

---

## Recommended order of work

1. Create Supabase project and run `supabase-schema.sql`, then `supabase-elearning-admin.sql`.
2. Create Storage bucket **`elearning-scorm`** (private) — or uncomment the bucket stanza in the SQL file if your role allows it.
3. Fill **required** env vars locally (including **`ELEARNING_ADMIN_PASSWORD`**) and test with `npm run dev` + seed script.
4. Open **`/admin/elearning`** — publish your SCORM zip **or** keep serving from `public/elearning/...` until you upload.
5. Add **Zapier** vars when the ad funnel goes live.
6. Copy all env vars to **production** (e.g. Vercel) and redeploy.

---

## 1. Environment variables

Copy from `.env.example` into `.env` (local) or your host’s environment
dashboard. Names are exact.

### 1.1 Required for the learner portal (login, dashboard, course, DB)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://xxxxx.supabase.co`). **Project Settings → API → Project URL** in the Supabase dashboard. |
| `SUPABASE_SERVICE_ROLE_KEY` | **`service_role`** secret key. **Project Settings → API → service_role**. Server-only — never expose in client code or the browser. Bypasses RLS so API routes can read/write `learners`. |
| `ELEARNING_JWT_SECRET` | Secret used to sign the session JWT. **Minimum 32 characters.** Generate once and keep stable across deploys so existing sessions stay valid. |

Generate `ELEARNING_JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

**Development:** If `ELEARNING_JWT_SECRET` is missing or shorter than 32
characters while `NODE_ENV === "development"`, the app logs a warning and uses
a fixed dev-only secret so you can sign in locally. **Production and `next start`
must set a real secret.**

### 1.2 Required only for the **ad lead → account** flow (`POST /api/elearning/lead`)

If this is unset, the lead endpoint returns **500 — “Lead intake not
configured”** and Ads cannot create learners.

| Variable | Description |
|----------|-------------|
| `ELEARNING_LEAD_INTAKE_SECRET` | Shared secret. Zapier must send header **`X-Lead-Secret`** with exactly this value on every `POST` to `/api/elearning/lead`. |

### 1.3 Welcome email after a lead is accepted

Not strictly required for the HTTP handler to succeed, but without it learners
won’t get an email with their password.

| Variable | Description |
|----------|-------------|
| `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL` | **Optional legacy fallback.** If the per-source URL below is unset, the app uses this Catch Hook for that source. |
| `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META` | Catch Hook for **Meta** leads. Used when the lead JSON includes `"type": "meta"` (or omitted — **meta** is the default). |
| `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS` | Catch Hook for **Google Ads** leads. Used when the lead JSON includes `"type": "google_ads"`. |

The lead body may include **`type`**: `"meta"` or `"google_ads"`. The server
`POST`s the welcome payload (including `type`, `source`, `ad_campaign`) to the
matching URL, with fallback to `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL` if a
per-source URL is not set.

### 1.4 Optional

| Variable | Description |
|----------|-------------|
| `ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL` | Zapier Catch Hook — notified the **first** time a learner completes the free course (sales follow-up). |

### 1.5 Admin UI (`/admin/elearning`)

| Variable | Description |
|----------|-------------|
| `ELEARNING_ADMIN_PASSWORD` | **Required** to sign in at `/admin/elearning/login`. Use a long random password (≥ 12 characters). |

Optional:

| Variable | Description |
|----------|-------------|
| `ELEARNING_SCORM_BUCKET` | Supabase Storage bucket id (default **`elearning-scorm`**). Must exist and match what you created in the dashboard. |

### 1.6 Optional — local seed script overrides

Used only by `npm run seed:elearning-test-user` (see §4). Not required in
production.

| Variable | Description |
|----------|-------------|
| `ELEARNING_TEST_EMAIL` | Override default seed email (`elearning-test@learntechnique.local`). |
| `ELEARNING_TEST_PASSWORD` | Override default seed password (`LearnTest-Portal-2026`). |

### 1.7 Minimal copy-paste template (fill in values)

```env
# ─── Learner portal (required) ─────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
ELEARNING_JWT_SECRET=paste_output_from_crypto_command_min_32_chars

# ─── Ads funnel (required when Zapier posts leads) ─────────────────
ELEARNING_LEAD_INTAKE_SECRET=your_random_shared_secret

# ─── Zapier (welcome email Catch Hooks) ─────────────────────────────
# ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
# ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META=https://hooks.zapier.com/hooks/catch/...
# ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS=https://hooks.zapier.com/hooks/catch/...
# ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...

# ─── Admin UI ───────────────────────────────────────────────────────
ELEARNING_ADMIN_PASSWORD=your_long_random_admin_password_here
# ELEARNING_SCORM_BUCKET=elearning-scorm
```

---

## 2. Supabase project & database (one-off)

1. Create a project at [supabase.com](https://supabase.com) (free tier is fine).
2. **Project Settings → API**
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy **`service_role` `secret`** → `SUPABASE_SERVICE_ROLE_KEY` (not the `anon` key).
3. **SQL Editor → New query** — paste the entire contents of
   **`supabase-schema.sql`** from this repo → **Run**.

This creates **`public.learners`**, an index on email, enables **RLS**, and does
not add public policies — only server-side calls using the **service_role** key
can access the table.

---

## 3. Zapier

Replace the site origin with yours (`https://www.learntechnique.com` in
production, or your Vercel preview URL for testing).

### 3a. Lead intake (Meta / Google Lead Form → website)

- **Trigger:** New lead from your ad form.
- **Action:** **Webhooks by Zapier → Custom Request (POST)**  
  - **URL:** `https://www.learntechnique.com/api/elearning/lead`  
  - **Headers:**  
    - `Content-Type: application/json`  
    - `X-Lead-Secret: <same value as ELEARNING_LEAD_INTAKE_SECRET>`  
  - **Body** (example — map fields from your trigger):

```json
{
  "email": "{{email}}",
  "first_name": "{{first_name}}",
  "last_name": "{{last_name}}",
  "phone": "{{phone}}",
  "source": "meta-leads",
  "campaign": "{{campaign_name}}",
  "type": "meta"
}
```

Use **`"type": "meta"`** or **`"type": "google_ads"`** so the correct welcome
Catch Hook is used (`ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META` vs
`ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS`). JSON must use **one**
string value — not `||` inside the JSON.

The API also accepts **`firstName` / `lastName`** (camelCase),
**`phone_number`** instead of `phone`, and a single **`name`** field (split into
first/last on the server if first/last are missing).

The server generates a **new random password**, upserts the learner, then
posts the welcome payload (below) to the Catch Hook chosen by **`type`** (with
fallback to `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`).

### 3b. Welcome email (Catch Hook ← website)

1. Create **two** Zaps (recommended): **Webhooks by Zapier → Catch Hook** — copy
   Meta’s hook URL into **`ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META`** and
   Google Ads’ hook URL into **`ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_GOOGLE_ADS`**.
   Alternatively, set **`ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`** alone as a
   shared Catch Hook for both sources.
2. Second step on each Zap: **Email** (Gmail, Microsoft, etc.) using the fields from the
   webhook body.

**JSON body sent to the Catch Hook** (exact field names):

| Field | Type | Description |
|-------|------|-------------|
| `email` | string | Learner email |
| `first_name` | string | |
| `last_name` | string | |
| `password` | string | New one-time password (regenerated on every upsert from the lead endpoint) |
| `login_url` | string | Absolute URL to `/learn/login` (same origin as the request) |
| `course_title` | string | e.g. Electrical Safety Essentials |
| `course_duration` | string | e.g. Approx. 30 minutes |
| `is_new_account` | boolean | `true` on first insert, `false` if email existed and was updated |
| `timestamp` | string | ISO 8601 |
| `type` | string | **`meta`** or **`google_ads`** — which source fired the welcome webhook |
| `source` | string | From lead JSON (e.g. landing page label) |
| `ad_campaign` | string \| null | From lead `campaign` / `ad_campaign` |

### 3c. Course completion (optional)

Set `ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL` to another Catch Hook. It is
called **only on first completion** (not on repeat completes).

**JSON body:**

| Field | Type |
|-------|------|
| `email` | string |
| `first_name` | string |
| `last_name` | string |
| `course_slug` | string |
| `course_title` | string |
| `completed_at` | string (ISO 8601) |

---

## 4. Local development & test account

```bash
npm install
npm run dev
```

**Prerequisites:** `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and
`supabase-schema.sql` applied. `ELEARNING_JWT_SECRET` strongly recommended;
dev fallback exists only for `next dev`.

**Seed a fixed test learner** (no Zapier):

```bash
npm run seed:elearning-test-user
```

Default login (unless overridden by `ELEARNING_TEST_*` in `.env`):

| | |
|--|--|
| URL | `http://localhost:3000/learn/login` |
| Email | `elearning-test@learntechnique.local` |
| Password | `LearnTest-Portal-2026` |

Re-running the seed **updates the password** (if you changed env overrides) and
**clears `completed_at`** so you can retest course → certificate.

Test the placeholder course: open the SCORM page, click **Simulate course
completion**, then open the certificate.

**Test the lead endpoint** (with dev server running):

```bash
curl -s -X POST http://localhost:3000/api/elearning/lead \
  -H "Content-Type: application/json" \
  -H "X-Lead-Secret: YOUR_ELEARNING_LEAD_INTAKE_SECRET" \
  -d '{"email":"someone@example.com","first_name":"Test","last_name":"User"}'
```

---

## 5. SCORM package

**Recommended (production):** sign in at **`/admin/elearning`** and use **Upload
zip & publish**. This stores files in Supabase Storage and streams them via
**`/elearning-scorm/<slug>/…`** on your own domain — SCORM 1.2 **API** calls
from the iframe still reach the parent player (same origin).

Set **Launch file** to your entry HTML (`index.html` unless `imsmanifest.xml`
points elsewhere). Metadata (title, duration, description) can be saved without
re-uploading the zip (**Save text only**).

**Alternative (manual / dev):** unzip into
**`public/elearning/electrical-safety-essentials/`**. While **`storage_prefix`**
is empty in `elearning_course_settings`, the player uses
**`/elearning/<slug>/<entry>`** from `public/`.

No SCORM suspend data is persisted server-side — completion is detected from
SCORM status and saved via **`POST /api/elearning/complete`**.

---

## 6. Production deployment

1. Add all required env vars on the host (e.g. **Vercel → Settings → Environment
   Variables**). Use **Production** (and **Preview** if you use branch deploys).
2. Do **not** prefix server secrets with `NEXT_PUBLIC_` (only
   `NEXT_PUBLIC_SUPABASE_URL` is public by design).
3. Redeploy after changing env.
4. Point Zapier webhook URLs at the **production** origin
   (`https://www.learntechnique.com/...`) when you go live.

---

## 7. Troubleshooting

| Symptom | Things to check |
|---------|------------------|
| **Login** “temporarily unavailable” / 500 | `ELEARNING_JWT_SECRET` (length ≥ 32 in prod), Supabase URL + service role, `learners` table exists. In **development**, the JSON error may include a short hint. |
| **Lead** returns 401 | `X-Lead-Secret` header must match `ELEARNING_LEAD_INTAKE_SECRET` exactly. |
| **Lead** returns 500 “not configured” | Set `ELEARNING_LEAD_INTAKE_SECRET`. |
| **No welcome email** | Set `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL_META` / `_GOOGLE_ADS` or legacy `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`; confirm lead JSON `type` matches the hook you configured; check Zapier task history and server logs. |
| **Main site / Sanity errors** (`apicdn.sanity.io`) | Not part of e-learning — set `NEXT_PUBLIC_SANITY_*` and optionally `NEXT_PUBLIC_SANITY_USE_CDN=false` (see `.env.example`). |
| **Admin login fails** | Set **`ELEARNING_ADMIN_PASSWORD`** (≥ 12 chars). Middleware uses JWT only (`admin-auth.ts`); password check runs in **`/api/admin/elearning/login`** only. |
| **ZIP upload fails** | Create bucket **`elearning-scorm`** in Supabase Storage; confirm `SUPABASE_SERVICE_ROLE_KEY` works. |

---

## 8. File reference

| File | Purpose |
|------|---------|
| `.env.example` | All env var names for the repo (including Sanity & other Zapier hooks). |
| `supabase-schema.sql` | Learners table for Supabase. |
| `supabase-elearning-admin.sql` | Course settings row + optional bucket notes. |
| `scripts/seed-elearning-test-user.mjs` | Local test learner seed. |
| `lib/elearning/catalog.ts` | Locked “coming soon” courses + default styling for the free course card. |
| `lib/elearning/course-settings.ts` | Runtime title/duration/description + SCORM launch URL (DB + storage). |
