import { NextResponse } from "next/server";
import { cmsFetch } from "@/lib/cms/fetch";
import { courseCardsQuery } from "@/lib/queries/courses";
import { courseOptionsForSessionBook } from "@/lib/course-session-options";
import type { CourseCardData } from "@/lib/course-categories";

export async function GET() {
  try {
    const courses = await cmsFetch<CourseCardData[]>(courseCardsQuery);
    const coursesPayload = courseOptionsForSessionBook(courses);
    return NextResponse.json({ courses: coursesPayload });
  } catch (e) {
    console.error("session-options fetch error:", e);
    return NextResponse.json(
      { error: "Failed to load courses" },
      { status: 500 },
    );
  }
}
