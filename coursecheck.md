# Coursecheck → Next.js Integration

Fetch and render Coursecheck reviews in your Next.js (App Router) project.

## Files

```
app/
  api/
    reviews/
      route.ts          ← Server-side proxy (no CORS, keeps company_id secret)
  page.tsx              ← Example usage
components/
  ReviewsWidget.tsx     ← Drop-in React component with loading skeleton
lib/
  coursecheck/
    types.ts            ← TypeScript interfaces
    fetchers.ts         ← Helper functions for Server Components / SWR / RQ
```

---

## 1. Add your Company ID

Create (or edit) `.env.local` in your project root:

```env
COURSECHECK_COMPANY_ID=your_company_id_here
```

You can find your **Company ID** in your Coursecheck back-office dashboard.

---

## 2. Copy the files

Copy the four files above into your Next.js project, keeping the same folder structure.

---

## 3. Use the widget

Drop `<ReviewsWidget />` anywhere in your app:

```tsx
// Show all recent reviews
<ReviewsWidget heading="What our learners say" numReviews={6} />

// Filter to a specific course
<ReviewsWidget courseId="YOUR_COURSE_ID" numReviews={4} />

// Filter to a category
<ReviewsWidget categoryId="YOUR_CATEGORY_ID" numReviews={6} />
```

---

## 4. Use the fetchers (Server Components / data fetching)

```ts
import { fetchReviews, fetchSummary } from "@/lib/coursecheck/fetchers";

// In a Server Component:
const { reviews } = await fetchReviews({
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL, // e.g. "https://mysite.com"
  numReviews: 10,
});

const summary = await fetchSummary({
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL,
});
```

---

## API Route

The proxy at `/api/reviews` accepts these query params:

| Param          | Default    | Description                                 |
|----------------|------------|---------------------------------------------|
| `type`         | `reviews`  | `"reviews"` or `"summary"`                 |
| `num_reviews`  | `10`       | 1–10 (Coursecheck max)                     |
| `course_id`    | —          | Filter by Coursecheck CourseID             |
| `category_id`  | —          | Filter by Coursecheck CategoryID           |

---

## Caching

Both the API route and the `fetch()` calls use `next: { revalidate: 600 }` (10 minutes). Adjust this to suit your traffic.

---

## Notes

- The Coursecheck API is not publicly documented. The endpoint patterns used here (`/api/reviews`, `/api/summary`) are inferred from the official WordPress plugin source. If you hit a 404, inspect the network requests from the WordPress plugin demo at https://plugin.coursecheck.com to confirm the exact URLs, then update `COURSECHECK_BASE` in `route.ts`.
- Coursecheck support can also provide you the exact API spec — email them from your account.
