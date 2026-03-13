# Zapier Integration Setup

Forms on this site submit to Zapier webhooks, which can forward data to Google Sheets or other apps.

## 1. Newsletter / Brochure Zap (same webhook)

**Used by:** Subscribe to our Newsletter (contact page), Subscribe To Download Our Brochure (homepage)

**Payload fields:** `name`, `email`, `source` (either "newsletter" or "brochure")

1. In Zapier, create a new Zap
2. **Trigger:** Webhooks by Zapier → Catch Hook
3. Choose "Catch Hook" and copy the webhook URL
4. Add to `.env`: `ZAPIER_NEWSLETTER_WEBHOOK_URL=<your-url>`
5. **Action:** Google Sheets → Create Spreadsheet Row (or your preferred action)
6. Map the fields: `name`, `email`, `source` to your sheet columns

## 2. Contact Form Zap

**Used by:** Contact form on homepage and contact page (same URL)

**Payload fields:** `first_name`, `last_name`, `number`, `email`, `message`

1. In Zapier, create a new Zap
2. **Trigger:** Webhooks by Zapier → Catch Hook
3. Copy the webhook URL
4. Add to `.env`: `ZAPIER_CONTACT_WEBHOOK_URL=<your-url>`
5. **Action:** Google Sheets → Create Spreadsheet Row
6. Map the fields to your sheet columns

## Testing

After adding the URLs to `.env`, restart the dev server. Submit a form and check your Zapier task history to confirm the webhook received the data.
