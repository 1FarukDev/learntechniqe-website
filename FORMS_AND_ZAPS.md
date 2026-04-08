# Forms & Zapier Webhooks Reference

> Complete inventory of every form on the site, the Zapier webhook it connects to, and which pages it appears on.

---

## Environment Variables Required

Add all of these to your `.env` file:

```env
ZAPIER_CONTACT_WEBHOOK_URL=
ZAPIER_NEWSLETTER_WEBHOOK_URL=
ZAPIER_BROCHURE_WEBHOOK_URL=
ZAPIER_CALLBACK_WEBHOOK_URL=
ZAPIER_BOOK_SESSION_WEBHOOK_URL=
```

All of the above keys are listed in `.env.example`.

---

## API Routes Summary

| Endpoint                      | Route File                                  | Env Variable                        |
| ----------------------------- | ------------------------------------------- | ----------------------------------- |
| `POST /api/zapier/contact`    | `app/api/zapier/contact/route.ts`           | `ZAPIER_CONTACT_WEBHOOK_URL`        |
| `POST /api/zapier/newsletter` | `app/api/zapier/newsletter/route.ts`        | `ZAPIER_NEWSLETTER_WEBHOOK_URL`     |
| `POST /api/zapier/brochure`   | `app/api/zapier/brochure/route.ts`          | `ZAPIER_BROCHURE_WEBHOOK_URL`       |
| `POST /api/zapier/callback` | `app/api/zapier/callback/route.ts` | `ZAPIER_CALLBACK_WEBHOOK_URL` |
| `POST /api/zapier/book-session` | `app/api/zapier/book-session/route.ts`    | `ZAPIER_BOOK_SESSION_WEBHOOK_URL`   |

---

## Forms Detail

### 1. General Contact Form (Homepage block)

| | |
|-|-|
| **File** | `app/features/homepage/contact.tsx` |
| **Purpose** | General enquiry — collects name, phone, email, message |
| **Posts to** | `/api/zapier/contact` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL` |
| **Pages** | `/` · `/courses` · `/courses/electrical` · `/courses/plc` · `/courses/aircon-refrigeration` · `/courses/[slug]` · `/pathways` · `/pathways/[slug]` · `/company` · `/blog` · `/blog/all` · `/blog/[slug]` · `/career/[slug]` |

---

### 2. Contact Page Form

| | |
|-|-|
| **File** | `app/features/contact/contactForm.tsx` |
| **Purpose** | Dedicated contact page enquiry — same fields as homepage contact |
| **Posts to** | `/api/zapier/contact` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL` |
| **Pages** | `/contact` |

---

### 3. Newsletter Signup

| | |
|-|-|
| **File** | `app/features/contact/newsletterSection.tsx` |
| **Purpose** | Newsletter subscription — collects name, email (source: `"newsletter"`) |
| **Posts to** | `/api/zapier/newsletter` |
| **Env** | `ZAPIER_NEWSLETTER_WEBHOOK_URL` |
| **Pages** | `/contact` |

---

### 4. Brochure Download CTA

| | |
|-|-|
| **File** | `app/features/homepage/brochure.tsx` |
| **Purpose** | Brochure interest — collects name, email (source: `"brochure"`) |
| **Posts to** | `/api/zapier/brochure` |
| **Env** | `ZAPIER_BROCHURE_WEBHOOK_URL` |
| **Pages** | `/` · `/career/[slug]` |

---

### 5. Pathway Enquiry Form

| | |
|-|-|
| **File** | `app/features/pathways/PathwayEnquiryForm.tsx` |
| **Purpose** | Enquiry for a specific pathway — includes pricing summary in message (source: `"pathway_enquiry"`) |
| **Posts to** | `/api/zapier/contact` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL` |
| **Pages** | `/pathways/[slug]` |

---

### 6. Pathway Calculator Sticky Enquiry

| | |
|-|-|
| **File** | `app/features/pathways/PathwaysCalculatorSticky.tsx` |
| **Purpose** | Enquiry from the repayment calculator UI (source: `"pathway_calculator_enquiry"`) |
| **Posts to** | `/api/zapier/contact` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL` |
| **Pages** | `/pathways` · `/pathways/[slug]` |

---

### 7. Course Enquiry (Hero Card)

| | |
|-|-|
| **File** | `app/features/courseDetails/CourseEnquiryForm.tsx` |
| **Purpose** | Course-specific enquiry from the course hero info card |
| **Posts to** | `/api/zapier/contact` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL` |
| **Pages** | `/courses/[slug]` · `/pathways/[slug]` |

---

### 8. Request a callback (Modal)

| | |
|-|-|
| **File** | `app/features/courseDetails/RequestCourseOverviewModal.tsx` |
| **Purpose** | Request a callback from course / pathway page |
| **Posts to** | `/api/zapier/callback` |
| **Env** | `ZAPIER_CALLBACK_WEBHOOK_URL` |
| **Pages** | `/courses/[slug]` · `/pathways/[slug]` |

---

### 9. Request callback inline (BookCourse fallback)

| | |
|-|-|
| **File** | `app/features/courseDetails/BookCourse.tsx` (inner `RequestOverviewInlineForm`) |
| **Purpose** | Fallback when no Cademy embed URL exists — collects lead and sends course name/URL |
| **Posts to** | `/api/zapier/callback` |
| **Env** | `ZAPIER_CALLBACK_WEBHOOK_URL` |
| **Pages** | `/courses/[slug]` (only when course has no `cademyEmbedUrl`) |

---

### 10. Book a Session (Drawer)

| | |
|-|-|
| **File** | `app/courses/sections/session.tsx` |
| **Purpose** | Book / enquire about a training session — collects name, email, phone, company, message |
| **Posts to** | `/api/zapier/book-session` |
| **Env** | `ZAPIER_BOOK_SESSION_WEBHOOK_URL` |
| **Pages** | `/courses` · `/courses/electrical` · `/courses/plc` · `/courses/aircon-refrigeration` · `/courses/[slug]` |

---

## Non-Zapier Forms (UI only)

### 11. Course Filter Sidebar

| | |
|-|-|
| **File** | `app/courses/sections/coursesPackage.tsx` |
| **Purpose** | Client-side filter/search — `onSubmit` is a no-op |
| **Posts to** | Nothing |
| **Pages** | `/courses` · `/courses/electrical` · `/courses/plc` · `/courses/aircon-refrigeration` |

### 12. Blog Comment Form

| | |
|-|-|
| **File** | `app/features/blog/BlogDetails.tsx` |
| **Purpose** | UI placeholder — submit only logs to `console.log` |
| **Posts to** | Nothing |
| **Pages** | `/blog/[slug]` |

---

## Dead Code

### PathwaysContactForm (unused)

| | |
|-|-|
| **File** | `app/features/pathways/PathwaysContactForm.tsx` |
| **Purpose** | Contains two forms: call-back → `/api/zapier/contact`, brochure → `/api/zapier/newsletter` |
| **Env** | `ZAPIER_CONTACT_WEBHOOK_URL`, `ZAPIER_NEWSLETTER_WEBHOOK_URL` |
| **Pages** | **None** — not imported anywhere. This is dead code. |
