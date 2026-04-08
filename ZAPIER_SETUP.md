# Zapier Integration Setup

Site forms post to Next.js API routes under `app/api/zapier/`, which forward JSON to **Webhooks by Zapier → Catch Hook** URLs. You can chain any Zapier action (Google Sheets, email, CRM, and so on).

## Environment variables

Add each webhook URL to `.env` (see `.env.example` for names):

| Variable | API route |
|----------|-----------|
| `ZAPIER_CONTACT_WEBHOOK_URL` | `POST /api/zapier/contact` |
| `ZAPIER_NEWSLETTER_WEBHOOK_URL` | `POST /api/zapier/newsletter` |
| `ZAPIER_BROCHURE_WEBHOOK_URL` | `POST /api/zapier/brochure` |
| `ZAPIER_CALLBACK_WEBHOOK_URL` | `POST /api/zapier/callback` |
| `ZAPIER_BOOK_SESSION_WEBHOOK_URL` | `POST /api/zapier/book-session` |

Newsletter and brochure use **different** webhooks and env vars (they are no longer combined on one URL).

Every route appends a server-side **`timestamp`** (ISO 8601). Several routes set or default a **`source`** string so you can filter or branch in Zapier.

**Migration:** If you still have `ZAPIER_COURSE_OVERVIEW_WEBHOOK_URL` in production `.env`, rename it to `ZAPIER_CALLBACK_WEBHOOK_URL` (the app accepts the old name as a fallback until you switch). In Zapier / Google Sheets, replace any column or filter that used `source` = `course_overview_request` with **`request_callback`**.

### Google Sheets: how to map

1. Add a **Create Spreadsheet Row** (or **Lookup + update**) action after the Catch Hook.
2. Put these field names in **row 1** of your sheet as column headers (same spelling as below).
3. Map each Zapier webhook field to the matching column. Send a test from the site first so optional fields appear in the mapper.

---

## 1. Newsletter Zap

**Env:** `ZAPIER_NEWSLETTER_WEBHOOK_URL`

**Payload:** `name`, `email`, `source` (e.g. `newsletter`, `pathways-brochure`), `timestamp`

**Sheet columns (header row):**

| Column header | Notes |
|---------------|--------|
| `timestamp` | Server |
| `source` | Distinguish contact-page newsletter vs pathways brochure signup |
| `name` | Full name (pathways brochure signup may send `Brochure` as the name) |
| `email` | |

**Steps:** Zap → **Webhooks by Zapier** → **Catch Hook** → copy URL into `ZAPIER_NEWSLETTER_WEBHOOK_URL` → Google Sheets action → map fields.

---

## 2. Brochure Zap

**Env:** `ZAPIER_BROCHURE_WEBHOOK_URL`

**Payload:** `name`, `email`, `source` (defaults to `brochure`), `timestamp`

**Sheet columns (header row):**

| Column header |
|---------------|
| `timestamp` |
| `source` |
| `name` |
| `email` |

**Steps:** **Catch Hook** → `ZAPIER_BROCHURE_WEBHOOK_URL` → map to the sheet.

---

## 3. Contact Zap

**Env:** `ZAPIER_CONTACT_WEBHOOK_URL`

Several forms share this webhook. Use **one** sheet with all columns below; leave cells empty when that form does not send a field.

**`source`:** Defaults to `contact` if omitted. Other values: `course_enquiry`, `pathway_enquiry`, `pathway_calculator_enquiry`.

**Sheet columns (header row):**

| Column header | Usually filled? |
|---------------|-----------------|
| `timestamp` | Always |
| `source` | Always |
| `first_name` | Yes |
| `last_name` | Yes (may be empty for single-name flows) |
| `email` | Usually; **empty** for pathways “We’ll call you” callback |
| `number` | Phone |
| `message` | Yes |
| `course_name` | Course enquiry only |
| `course_url` | Course enquiry only |
| `pathway_name` | Pathway calculator / pathway page enquiry only |
| `pathway_url` | Pathway calculator / pathway page enquiry only |

**Steps:** **Catch Hook** → `ZAPIER_CONTACT_WEBHOOK_URL` → map fields. Optional columns may only appear in Zapier after a submission that includes them.

---

## 4. Request callback Zap (course / pathway)

**Env:** `ZAPIER_CALLBACK_WEBHOOK_URL`

Used when someone asks for a **callback** from a course or pathway page (modal or inline form).

**Payload:** `first_name`, `last_name`, `number`, `email`, `course_name`, `course_url`, `source` (`request_callback`), `timestamp`

**Sheet columns (header row):**

| Column header |
|---------------|
| `timestamp` |
| `source` |
| `first_name` |
| `last_name` |
| `number` |
| `email` |
| `course_name` |
| `course_url` |

**Steps:** **Catch Hook** → `ZAPIER_CALLBACK_WEBHOOK_URL` → map fields.

---

## 5. Book session Zap

**Env:** `ZAPIER_BOOK_SESSION_WEBHOOK_URL`

**Payload:** `first_name`, `last_name`, `email`, `number`, `company`, `message`, `source` (`book_session`), `timestamp`

**Sheet columns (header row):**

| Column header |
|---------------|
| `timestamp` |
| `source` |
| `first_name` |
| `last_name` |
| `email` |
| `number` |
| `company` |
| `message` |

**Steps:** **Catch Hook** → `ZAPIER_BOOK_SESSION_WEBHOOK_URL` → map fields.

---

## Testing

After setting URLs in `.env`, restart the dev server (or redeploy). Submit each form type once and confirm tasks in Zapier’s history. Use **Test trigger** in the editor if you need sample field names before mapping.

For a page-by-page list of forms and endpoints, see `FORMS_AND_ZAPS.md`.
