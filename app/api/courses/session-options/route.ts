import { NextResponse } from "next/server";
import { client } from "@/lib/sanity/client";
import { courseCardsQuery } from "@/lib/queries/courses";
import { courseOptionsForSessionBook } from "@/lib/course-session-options";
import type { CourseCardData } from "@/lib/course-categories";

export async function GET() {
  try {
    const courses = await client.fetch<CourseCardData[]>(courseCardsQuery);
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
