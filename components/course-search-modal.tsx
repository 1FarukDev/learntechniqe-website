"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { CourseCardData } from "@/lib/course-categories";
import { getCourseUrl } from "@/lib/course-categories";

export interface PathwayModalItem {
  title: string;
  slug: string;
  heroImage?: string | null;
  priceIncVat?: string | number | null;
  duration?: string | null;
  badge?: string;
  href: string;
}

interface CourseSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Full catalogue for search / filters */
  courses?: CourseCardData[];
  /** When set, empty search shows this list (same order as homepage popular strip) */
  popularCourses?: CourseCardData[];
  pathways?: PathwayModalItem[];
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

const parsePrice = (val: string | number | undefined | null): number => {
  if (!val) return 0;
  if (typeof val === "number") return val;
  return parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

function PathwayCarousel({
  pathways,
  onClose,
}: {
  pathways: PathwayModalItem[];
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left:
        dir === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm text-muted-foreground">
          Career Pathways
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <ChevronLeft size={16} className="text-gray-500" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-1 rounded-md hover:bg-gray-100 transition"
          >
            <ChevronRight size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1"
      >
        {pathways.map((p) => {
          const price = parsePrice(p.priceIncVat);
          return (
            <Link
              key={p.slug}
              href={p.href}
              onClick={onClose}
              className="group shrink-0 w-[200px] snap-start rounded-xl border-2 border-gray-200 overflow-hidden transition-all hover:border-[#016068]/40 hover:shadow-md"
            >
              {p.heroImage && (
                <div className="relative w-full h-24 overflow-hidden">
                  <Image
                    src={p.heroImage}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="200px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#E99E20] text-white text-[9px] font-bold rounded-sm">
                      {p.badge}
                    </span>
                  )}
                </div>
              )}
              <div className="p-2.5">
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-[#016068] transition-colors line-clamp-2 leading-snug mb-1.5">
                  {p.title}
                </h4>
                <div className="flex items-center justify-between gap-1">
                  {price > 0 && (
                    <span className="text-xs font-bold text-[#016068]">
                      {formatPrice(price)}
                    </span>
                  )}
                  {p.duration && (
                    <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                      <Clock size={10} />
                      {p.duration}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function CourseSearchModal({
  open,
  onOpenChange,
  courses = [],
  popularCourses = [],
  pathways = [],
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

  const popularOrDefault = useMemo(() => {
    const base =
      popularCourses.length > 0 ? popularCourses : courses.slice(0, 8);
    if (!category) return base;
    return base.filter((c) =>
      (c.tags ?? []).some((t) => t.label === category),
    );
  }, [popularCourses, courses, category]);

  const displayCourses = query.trim() ? filteredCourses : popularOrDefault;

  const handleClose = () => onOpenChange(false);

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
                      href={getCourseUrl(course.slug)}
                      onClick={handleClose}
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

          {/* Pathway cards carousel */}
          {pathways.length > 0 && (
            <PathwayCarousel pathways={pathways} onClose={handleClose} />
          )}

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
