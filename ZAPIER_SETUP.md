# Zapier integration setup

Site forms post to Next.js routes under `app/api/zapier/`. Each route forwards JSON to **Webhooks by Zapier → Catch Hook**. You can chain Google Sheets, email, CRM actions, and so on.

**How payloads work:** The app merges the form body with server fields. Every successful forward includes **`timestamp`** (ISO 8601). Some routes set or default **`source`** so you can filter in Zapier.

---

## Environment variables

Copy webhook URLs from Zapier into `.env`. Names are listed in `.env.example`.

| Variable | Route | Purpose |
|----------|--------|---------|
| `ZAPIER_CONTACT_WEBHOOK_URL` | `POST /api/zapier/contact` | General contact, course/pathway enquiries, calculator, etc. |
| `ZAPIER_NEWSLETTER_WEBHOOK_URL` | `POST /api/zapier/newsletter` | Newsletter signups |
| `ZAPIER_BROCHURE_WEBHOOK_URL` | `POST /api/zapier/brochure` | Brochure interest |
| `ZAPIER_CALLBACK_WEBHOOK_URL` | `POST /api/zapier/callback` | “Request a callback” from course or pathway |
| `ZAPIER_BOOK_SESSION_WEBHOOK_URL` | `POST /api/zapier/book-session` | Book training at your premises |

Newsletter and brochure use **separate** webhooks (not one shared URL).

**Legacy:** If production still has `ZAPIER_COURSE_OVERVIEW_WEBHOOK_URL`, the callback route uses it as a fallback until you set `ZAPIER_CALLBACK_WEBHOOK_URL`. In Zapier / Sheets, treat callback **`source`** as **`request_callback`** (not `course_overview_request`).

---

## Google Sheets: mapping

1. After **Catch Hook**, add **Create Spreadsheet Row** (or lookup/update).
2. Put **column headers in row 1** exactly as listed below (same spelling as Zapier field names).
3. Submit a real form from the site (or use Zapier **Test trigger**) so every field appears in the mapper before you finish mapping.

---

## 1. Newsletter Zap

**Env:** `ZAPIER_NEWSLETTER_WEBHOOK_URL`

**Payload (typical):** `name`, `email`, `source` (e.g. `newsletter`, `pathways-brochure` if reused), **`timestamp`** (always added server-side; default `source` is `newsletter` if omitted)

| Column header | Notes |
|---------------|--------|
| `timestamp` | Server |
| `source` | e.g. contact-page newsletter vs pathways brochure |
| `name` | Full name |
| `email` | |

**Steps:** **Webhooks by Zapier** → **Catch Hook** → paste URL into `ZAPIER_NEWSLETTER_WEBHOOK_URL` → map to the sheet.

---

## 2. Brochure Zap

**Env:** `ZAPIER_BROCHURE_WEBHOOK_URL`

**Payload:** `name`, `email`, `source` (defaults to `brochure` if omitted), **`timestamp`**

| Column header |
|---------------|
| `timestamp` |
| `source` |
| `name` |
| `email` |

**Steps:** **Catch Hook** → `ZAPIER_BROCHURE_WEBHOOK_URL` → map fields.

---

## 3. Contact Zap

**Env:** `ZAPIER_CONTACT_WEBHOOK_URL`

Several forms share this webhook. Use **one** sheet with all columns below; leave cells empty when a given form does not send a field.

**`source`:** Defaults to `contact` if the client omits it. Other values include `course_enquiry`, `pathway_enquiry`, `pathway_calculator_enquiry`.

| Column header | Usually filled? |
|---------------|-----------------|
| `timestamp` | Always |
| `source` | Always |
| `first_name` | Yes |
| `last_name` | Yes (may be empty for single-name flows) |
| `email` | Usually; **empty** for some pathways “call me” flows |
| `number` | Phone |
| `message` | Often |
| `course_name` | Course enquiry only |
| `course_url` | Course enquiry only |
| `pathway_name` | Pathway calculator / pathway enquiry only |
| `pathway_url` | Pathway calculator / pathway enquiry only |

**Steps:** **Catch Hook** → `ZAPIER_CONTACT_WEBHOOK_URL` → map fields. Optional columns may only show in Zapier after a submission that includes them.

---

## 4. Request callback Zap (course / pathway)

**Env:** `ZAPIER_CALLBACK_WEBHOOK_URL`

Used for **callback** requests from course or pathway UI (modal or inline). The API **always** sets **`source`** to **`request_callback`** (overwrites any client value).

**Payload:** `first_name`, `last_name`, `number`, `email`, `course_name`, `course_url`, **`source`** (`request_callback`), **`timestamp`**

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

**Purpose:** Enquiries for **on-site / at-your-premises** training. Collects contact details plus **which course** they care about.

**Payload:** `first_name`, `last_name`, `email`, `number`, **`course`** (course title), **`course_url`** (full URL, e.g. `https://www.learntechnique.com/courses/...`), **`course_path`** (path only, e.g. `/courses/your-slug`), **`source`** (`book_session`), **`timestamp`**

**Where it appears**

| Context | UI | How `course` / URLs are set |
|---------|-----|-----------------------------|
| `/courses`, `/courses/electrical`, `/courses/plc`, `/courses/aircon-refrigeration` | Full-width “Book Session” hero + drawer | User picks a course from a **dropdown** |
| `/courses/[slug]` | Compact **banner** (only if Sanity flag is on) | **Fixed** to that page’s course — no dropdown |

**Sanity:** On the `course` document, add a boolean field named **`bookASession`**. When `true`, the course detail page shows the banner; the form automatically sends that course’s title and URLs to Zapier.

**Sheet columns (header row):**

| Column header |
|---------------|
| `timestamp` |
| `source` |
| `first_name` |
| `last_name` |
| `email` |
| `number` |
| `course` |
| `course_url` |
| `course_path` |

**Migration from older site builds:** If your Zap or sheet still expects **`company`** or **`message`**, remove those columns and map **`course`**, **`course_url`**, and **`course_path`** instead. Those fields are no longer sent.

**Steps:** **Catch Hook** → `ZAPIER_BOOK_SESSION_WEBHOOK_URL` → map fields.

---

## Testing

1. Set all URLs in `.env`, then restart the dev server (or redeploy).
2. Submit each form type once and confirm tasks in Zapier **History**.
3. Use **Test trigger** in the Zap editor if you need sample payloads before mapping.

For a page-by-page list of forms, see `FORMS_AND_ZAPS.md`.
