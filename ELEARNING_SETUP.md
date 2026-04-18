# Learner Portal & Free E-Learning Setup

This document describes how the new learner portal is wired together and the
four things you need to configure for launch.

## What's been built

- **Public entry points**
  - Header link **Learner Login** (desktop & mobile) → `/learn/login`
- **Learner-only pages** (all behind middleware auth)
  - `/learn/dashboard` – hero card for the learner's free course + a grid of
    "coming soon" locked courses and a loyalty/upsell strip.
  - `/learn/courses/[slug]` – SCORM course player (iframe + SCORM 1.2 / 2004
    runtime via the `scorm-again` package). Surfaces completion to the parent.
  - `/learn/certificate/[slug]` – rendered certificate + one-click PDF download
    (jsPDF) + loyalty prompt for paid courses.
- **API routes** (`app/api/elearning/…`)
  - `POST /api/elearning/lead` – ad-funnel intake from Zapier (creates/refreshes
    learner, generates password, fires welcome-email webhook).
  - `POST /api/elearning/login` – password login.
  - `POST /api/elearning/logout`
  - `GET  /api/elearning/me`
  - `POST /api/elearning/complete` – called by the player on completion.
- **Storage** – Supabase (Postgres). A single `learners` table, created once
  via the SQL migration in `supabase-schema.sql` (see step 2 below).
- **Auth** – bcrypt password hashes, JWT session in an httpOnly cookie
  (`lt_learner`), verified in middleware for protected routes.

## 1. Environment variables

Add these to your deployment environment (see `.env.example` for the full
template):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...

ELEARNING_JWT_SECRET=<64-char random string>
ELEARNING_LEAD_INTAKE_SECRET=<any shared secret for Zapier>
ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL=https://hooks.zapier.com/...
ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL=https://hooks.zapier.com/...   # optional
```

Generate the JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

> ⚠️  `SUPABASE_SERVICE_ROLE_KEY` bypasses Row-Level Security. It must only be
> set on the server (Vercel / hosting env). Never expose it to the browser.

## 2. Create the Supabase project (one-off, ~3 minutes)

1. Sign up at [supabase.com](https://supabase.com) and create a new project
   (the free tier handles thousands of learners comfortably).
2. Once the project is ready, open **Project Settings → Data API** and copy
   **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`.
3. Open **Project Settings → API Keys** and copy the **`service_role`** key
   into `SUPABASE_SERVICE_ROLE_KEY`. (Keep the `anon` key — we don't use it
   here, but it's handy for any public Supabase usage later.)
4. Open **SQL editor → New query**, paste the entire contents of
   `supabase-schema.sql` from this repo, and click **Run**. This creates the
   `learners` table and enables Row-Level Security.

That's it — our server-side API routes use the service-role key and can
read/write `learners` directly. RLS keeps the table invisible to the browser.

## 3. Zapier wiring

### 3a. Lead intake (Google Ads / Facebook Ads → our site)

- Trigger: new lead from your Ads form (Lead Ads / Google Lead Form).
- Action: **Webhooks by Zapier → Custom Request (POST)**
  - URL: `https://www.learntechnique.com/api/elearning/lead`
  - Header: `X-Lead-Secret: <value of ELEARNING_LEAD_INTAKE_SECRET>`
  - Header: `Content-Type: application/json`
  - Data (JSON):
    ```json
    {
      "email":      "{{email}}",
      "first_name": "{{first_name}}",
      "last_name":  "{{last_name}}",
      "phone":      "{{phone}}",
      "source":     "google-ads",
      "campaign":   "{{campaign_name}}"
    }
    ```

Our endpoint generates a random 10-char password, stores the learner, and then
posts to the welcome-email webhook (see below).

### 3b. Welcome email (our site → learner)

- Trigger: **Webhooks by Zapier → Catch Hook**
  - Paste the hook URL into `ZAPIER_ELEARNING_WELCOME_WEBHOOK_URL`.
- Action: **Gmail / Outlook / your ESP → Send Email**
  - To: `{{email}}`
  - Subject: `Welcome to Learn Technique – your free course is ready`
  - Body: use `{{first_name}}`, `{{password}}`, `{{login_url}}`,
    `{{course_title}}`, `{{course_duration}}`.

Payload shape delivered to your Zap:

```json
{
  "email": "…",
  "first_name": "…",
  "last_name": "…",
  "password": "Ab3k9Rt2Xc",
  "login_url": "https://www.learntechnique.com/learn/login",
  "course_title": "Electrical Safety Essentials",
  "course_duration": "Approx. 30 minutes",
  "is_new_account": true,
  "timestamp": "2026-04-18T10:22:33.000Z"
}
```

### 3c. (Optional) Completion notification

- Trigger: Catch Hook → paste into `ZAPIER_ELEARNING_COMPLETION_WEBHOOK_URL`.
- Action: Notify sales in Slack / Pipedrive / email, so they can offer a paid
  course to the learner while the free course is fresh.

## 4. Installing the SCORM course

When the SCORM package arrives:

1. Unzip it.
2. Replace the contents of `public/elearning/electrical-safety-essentials/`
   with the unzipped files.
3. If the entry HTML isn't called `index.html`, update the `scormEntryUrl`
   prop in `app/learn/courses/[slug]/page.tsx` to match (e.g. `index_lms.html`).

No progress tracking is retained — the player watches for the SCORM
`completed` / `passed` status and triggers `/api/elearning/complete`, which
records the completion timestamp in the `learners` table and unlocks the
certificate page.

## Local development

```bash
npm run dev
```

### Test login (no Zapier required)

With `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set in `.env`
and the `learners` table created (`supabase-schema.sql`), seed a fixed test
account:

```bash
npm run seed:elearning-test-user
```

Default credentials printed by the script:

| Field    | Value |
|----------|--------|
| **URL**  | `http://localhost:3000/learn/login` |
| **Email** | `elearning-test@learntechnique.local` |
| **Password** | `LearnTest-Portal-2026` |

Override via `.env`: `ELEARNING_TEST_EMAIL`, `ELEARNING_TEST_PASSWORD`.
Re-running the seed resets `completed_at` so you can test course → certificate again.

Then:

- Visit `/learn/login`, sign in, open the course, use the placeholder
  **Simulate course completion** button, then open the certificate flow.
- Alternatively, seed via production funnel: POST to `/api/elearning/lead`
  with the `X-Lead-Secret` header (welcome email fires if the Zap URL is set).
