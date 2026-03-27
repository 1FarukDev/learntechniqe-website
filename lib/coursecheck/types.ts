export interface CoursecheckReview {
  date: string;
  rating: string;
  name: string;
  comment: string;
}

export interface CoursecheckResponse {
  reviews: CoursecheckReview[];
}

export interface CoursecheckFetchOptions {
  companyId: string | number;
  courseId?: string | number;
  categoryId?: string | number;
}
