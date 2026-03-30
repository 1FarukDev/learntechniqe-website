"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { CourseCardData } from "@/lib/course-categories";

interface CourseSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses?: CourseCardData[];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

export function CourseSearchModal({
  open,
  onOpenChange,
  courses = [],
}: CourseSearchModalProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCategory(null);
    }
  }, [open]);

  const categories = useMemo(() => {
    const tagSet = new Set<string>();
    for (const course of courses) {
      if (course.tags) {
        for (const tag of course.tags) {
          tagSet.add(tag.label);
        }
      }
    }
    return Array.from(tagSet).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.tags ?? []).some((t) => t.label.toLowerCase().includes(q)) ||
        (c.description ?? "").toLowerCase().includes(q);
      const matchesCategory =
        !category ||
        (c.tags ?? []).some((t) => t.label === category);
      return matchesQuery && matchesCategory;
    });
  }, [courses, query, category]);

  const displayCourses = query.trim() ? filteredCourses : filteredCourses.slice(0, 8);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={
          isMobile
            ? "h-[85vh] rounded-t-2xl border-t"
            : "sm:max-w-xl w-full"
        }
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-xl">
            Find a course
          </SheetTitle>
          <SheetDescription>
            Search our electrical and trade courses. Filter by category or
            browse popular options.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-[60%] -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search courses (e.g. electrical, AM2, PLC...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12 mt-2"
              autoFocus={!isMobile}
            />
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground w-full">
                Filter by category:
              </span>
              <Button
                variant={category === null ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setCategory(null)}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={category === cat ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">
              {query.trim()
                ? `Matching courses (${filteredCourses.length})`
                : "Popular courses"}
            </h3>
            <ul className="space-y-2">
              {displayCourses.length > 0 ? (
                displayCourses.map((course) => (
                  <li key={course.slug}>
                    <Link
                      href={`/courses/${course.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {course.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {course.tags?.[0] && (
                            <span
                              className="text-[10px] font-semibold text-white px-1.5 py-0.5 rounded-sm"
                              style={{
                                backgroundColor: course.tags[0].color,
                              }}
                            >
                              {course.tags[0].label}
                            </span>
                          )}
                          {course.duration && (
                            <span className="text-xs text-muted-foreground">
                              {course.duration}
                            </span>
                          )}
                          {course.price && (
                            <span className="text-xs font-semibold text-[#14AE5C]">
                              {course.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground shrink-0 ml-2" />
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4">
                  No courses match &quot;{query}&quot;. Try a different search.
                </p>
              )}
            </ul>
          </div>

          <Link href="/courses" className="block">
            <Button className="w-full bg-[#01636B] h-12 uppercase">
              See all courses
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
