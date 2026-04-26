export interface CourseTag {
  label: string;
  color: string;
}

export interface CourseQualification {
  title: string;
  accreditedBy?: string;
  accreditationLogo?: any;
  accreditationLogoAlt?: string;
}

export interface CourseTopic {
  title: string;
  points: string[];
}
export interface CourseDate {
  month: string;
  day: number;
  from: string;
  to: string;
  spaces: number | null;
  location: string;
  price: string;
  bookUrl?: string;
}

export interface CademyDate {
  month: string;
  day: number;
  from: string;
  to: string;
  spaces: number | null;
  location: string;
  price: string;
  bookUrl: string;
}

// export interface CourseDate {
//   from: string
//   to: string
//   spaces: number
//   location: string
//   price: string
// }

export interface CourseHeroData {
  title: string;
  slug: string;
  tags?: CourseTag[];
  heroImage?: any;
  price: string;
  description?: string[];
  requestOverviewLink?: string;
  qualifications?: CourseQualification[];
  duration?: string;
  durationNote?: string;
  durationNoteLink?: string;
  summary?: string;
  bookingAvailable?: boolean;
  bookASession?: boolean;
  /** When true, show the practical assessment promo block on the course page */
  showPracticalAssessmentBanner?: boolean;
  /** Full URL for brochure / course-overview Zapier payloads */
  courseCanonicalUrl?: string;
}

export interface CourseDetailsData {
  /** Optional intro from Sanity, shown above the goals/entry/syllabus accordions when set */
  detailsSummary?: string | null;
  courseGoals?: CourseTopic[];
  entryRequirements?: CourseTopic[];
  syllabus?: CourseTopic[];
}

export interface PricingBannerData {
  price: string;
  originalPrice?: string;
  pricingTagline?: string;
}

export interface BookCourseData {
  title: string;
  /** Coursecheck / reviews integration id from Sanity */
  courseReviewId?: number;
  prerequisites?: string;
  showAccreditation?: boolean;
  completionRewards?: string[];
  qualifications?: CourseQualification[];
  cademyEmbedUrl?: string;
  cademyDirectUrl?: string;
  dates?: CourseDate[];
}

export interface Course
  extends
    CourseHeroData,
    CourseDetailsData,
    PricingBannerData,
    BookCourseData {}
