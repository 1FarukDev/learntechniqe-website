"use client";

import React, { useState, useEffect } from "react";
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

const POPULAR_COURSES = [
  { name: "Total Electrical 20", href: "#", category: "Electrical" },
  { name: "Air-con and Refrigeration", href: "#", category: "HVAC" },
  { name: "AM2 Assessment", href: "#", category: "Assessment" },
  { name: "PLC Training", href: "#", category: "Industrial" },
  { name: "Electrical Installation", href: "#", category: "Electrical" },
];

interface CourseSearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export function CourseSearchModal({ open, onOpenChange }: CourseSearchModalProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const filteredCourses = POPULAR_COURSES.filter((c) => {
    const matchesQuery = !query.trim() ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !category || c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={
          isMobile
            ? "h-[85vh] rounded-t-2xl border-t data-[side=bottom]:slide-in-from-bottom"
            : "sm:max-w-md w-full"
        }
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-xl">Find a course</SheetTitle>
          <SheetDescription>
            Search our electrical and trade courses. Filter by category or browse popular options.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          {/* Advanced search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search courses (e.g. electrical, AM2, PLC...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12"
              autoFocus
            />
          </div>

          {/* Filters - advanced search */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground w-full">Filter by category:</span>
            {["All", "Electrical", "HVAC", "Assessment", "Industrial"].map((cat) => (
              <Button
                key={cat}
                variant={category === (cat === "All" ? null : cat) ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setCategory(cat === "All" ? null : cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Popular / suggested courses */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">
              {query.trim() ? "Matching courses" : "Popular courses"}
            </h3>
            <ul className="space-y-2">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <li key={course.name}>
                    <Link
                      href={course.href}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors group"
                    >
                      <div>
                        <p className="font-medium text-foreground">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.category}</p>
                      </div>
                      <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground" />
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

          <Link
            href="#"
            onClick={() => onOpenChange(false)}
            className="block"
          >
            <Button className="w-full bg-[#01636B] uppercase">
              See all courses
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
