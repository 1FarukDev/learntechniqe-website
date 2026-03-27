import type { CoursecheckResponse, CoursecheckFetchOptions } from "./types";

const COURSECHECK_BASE = "https://www.coursecheck.com/api/provider/reviews";

export async function fetchCoursecheckReviews(
  opts: CoursecheckFetchOptions,
): Promise<CoursecheckResponse> {
  const { companyId, courseId, categoryId } = opts;

  let url = `${COURSECHECK_BASE}/${companyId}`;
  const params = new URLSearchParams();
  if (courseId) params.set("course", String(courseId));
  else if (categoryId) params.set("category", String(categoryId));

  const qs = params.toString();
  if (qs) url += `?${qs}`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) {
    console.error(`Coursecheck API error: ${res.status} ${res.statusText}`);
    return { reviews: [] };
  }

  return res.json();
}
