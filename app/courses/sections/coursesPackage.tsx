"use client";
import { FilterAccordion } from "@/components/accordion";
import { FormInput } from "@/components/Input";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";
import Link from "next/link";
import type { CourseCardData } from "@/lib/course-categories";

export interface GroupedCategory {
  value: string;
  label: string;
  courses: CourseCardData[];
  courseType?: string;
}

type CategoryType = "electrical" | "aircon-refrigeration" | "plc" | "all";

function CourseCarousel({
  title,
  count,
  courses,
  allCoursesHref = "/courses",
  showAllCoursesLink = true,
}: {
  title: string;
  count: string;
  courses: CourseCardData[];
  allCoursesHref?: string;
  /** Hide on `/courses` where the full listing is already shown */
  showAllCoursesLink?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, [courses]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const scrollAmount = isMobile
      ? Math.min(320, Math.floor(window.innerWidth * 0.88))
      : clientWidth;
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4"
        style={{ paddingRight: "max(0rem, calc((100vw - 80rem) / 2 + 1rem))" }}
      >
        <div>
          <h3 className="text-black font-semibold text-lg sm:text-xl">
            {title}
          </h3>
          <p className="text-[#9A9A9A] font-normal text-sm sm:text-base">
            {count}
          </p>
        </div>
        {courses.length > 0 && (
          <div className="flex items-center gap-4 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-3">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] transition-colors cursor-pointer shrink-0"
              >
                <Image src={ArrowBack} alt="Scroll left" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="h-9 w-9 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] active:bg-[#0E7377] transition-colors cursor-pointer shrink-0"
              >
                <Image src={ArrowRight} alt="Scroll right" />
              </button>
            </div>
            {showAllCoursesLink && (
              <Button asChild className="uppercase bg-[#016068] px-6 sm:px-10 h-10 sm:h-11 text-xs sm:text-sm flex-1 sm:flex-initial">
                <Link href={allCoursesHref}>All Courses</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      {courses.length > 0 ? (
        <div
          ref={scrollRef}
          className="-mx-4 flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none pl-4 pr-4 md:mx-0 md:pl-0 md:pr-0"
          style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
        >
          {courses.map((course) => (
            <div
              key={course.slug}
              className="snap-start shrink-0 w-[max(220px,min(260px,calc(100vw-56px)))] md:w-auto md:min-w-0"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-gray-50 border border-gray-100 py-10 text-center">
          <p className="text-gray-400 text-sm">
            No courses available in this category yet.
          </p>
        </div>
      )}
    </div>
  );
}

function CoursesPackage({
  category = "electrical",
  grouped = [],
  courseTypes = [],
}: {
  category?: CategoryType;
  grouped?: GroupedCategory[];
  courseTypes?: { label: string; value: string }[];
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchParams = useSearchParams();

  const initialLevel = (() => {
    const param = searchParams.get("level");
    if (param === "beginner") return "beginner";
    if (param === "existing-electrician") return "existing-electrician";
    return "";
  })();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const methods = useForm({
    defaultValues: {
      search: "",
      expertiseLevel: initialLevel,
      category: "",
      courseType: "",
      location: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const expertiseLevel = watch("expertiseLevel");
  const filterCategory = watch("category");
  const filterCourseType = watch("courseType");
  const location = watch("location");
  const searchTerm = watch("search");

  const totalCourses = useMemo(
    () => grouped.reduce((sum, g) => sum + g.courses.length, 0),
    [grouped],
  );

  const filteredByType = useMemo(() => {
    if (!filterCourseType) return grouped;
    return grouped.filter((g) => g.courseType === filterCourseType);
  }, [grouped, filterCourseType]);

  const filterCategories = useMemo(
    () => filteredByType.map((g) => ({ label: g.label, value: g.value })),
    [filteredByType],
  );

  const visibleGroups = useMemo(() => {
    let groups = filteredByType;

    if (filterCategory) {
      groups = groups.filter((g) => g.value === filterCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      groups = groups
        .map((g) => ({
          ...g,
          courses: g.courses.filter(
            (c) =>
              c.title.toLowerCase().includes(term) ||
              (c.description ?? "").toLowerCase().includes(term),
          ),
        }))
        .filter((g) => g.courses.length > 0);
    }

    if (expertiseLevel) {
      const tagLabel =
        expertiseLevel === "beginner" ? "Beginner" : "Existing Electrician";
      groups = groups
        .map((g) => ({
          ...g,
          courses: g.courses.filter((c) =>
            c.tags?.some((t) => t.label === tagLabel),
          ),
        }))
        .filter((g) => g.courses.length > 0);
    }

    return groups;
  }, [filteredByType, filterCategory, searchTerm, expertiseLevel]);

  const showCourseTypeFilter = category === "all" && courseTypes.length > 0;

  const handleCourseTypeChange = (val: string) => {
    setValue("courseType", val);
    setValue("category", "");
  };

  const SidebarContent = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => {})}>
        <FormInput
          name="search"
          placeholder="Search by topic"
          iconRight={<Search className="w-4 h-4 text-gray-400" />}
          className="bg-gray-100 border-none rounded-xl py-5 text-gray-500 placeholder:text-gray-400"
          wrapperClassName="mb-6"
        />

        {showCourseTypeFilter && (
          <FilterAccordion
            title="Course Type"
            options={courseTypes}
            selectedValue={filterCourseType}
            onChange={handleCourseTypeChange}
          />
        )}

        {(category === "electrical" || category === "all") && (
          <FilterAccordion
            title="Expertise Level"
            options={[
              { label: "Beginner", value: "beginner" },
              { label: "Existing Electrician", value: "existing-electrician" },
            ]}
            selectedValue={expertiseLevel}
            onChange={(val) => setValue("expertiseLevel", val)}
          />
        )}

        <FilterAccordion
          title="Subcategories"
          options={filterCategories}
          selectedValue={filterCategory}
          onChange={(val) => setValue("category", val)}
        />

        <FilterAccordion
          title="Location"
          options={[
            { label: "Clay Cross", value: "clay-cross" },
            { label: "Stirling", value: "stirling" },
          ]}
          selectedValue={location}
          onChange={(val) => setValue("location", val)}
        />
      </form>

      <Button
        className="bg-[#F5A623] hover:bg-[#e09410] px-7 py-7 transition-colors mt-4 w-full"
        onClick={() => methods.reset()}
      >
        Clear All Filters
      </Button>
    </FormProvider>
  );

  return (
    <section className="relative z-10 sm:py-10 bg-white overflow-x-clip">
      {drawerOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/40 z-[60] md:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-[70] flex flex-col shadow-2xl overflow-y-auto overscroll-y-contain md:hidden"
              style={{ animation: "slideInLeft 250ms ease forwards" }}
            >
              <style>{`
                @keyframes slideInLeft {
                  from { transform: translateX(-100%); }
                  to { transform: translateX(0); }
                }
              `}</style>

              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
                <h3 className="font-semibold text-gray-800 text-sm">Filters</h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              </div>

              <div className="px-5 py-5 pb-10 flex-1">{SidebarContent}</div>
            </div>
          </>,
          document.body
        )}

      <div className="max-w-7xl mx-auto px-4 md:hidden">
        <button
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#016068] border border-[#016068] rounded-lg px-4 py-2 hover:bg-[#016068]/5 transition"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="px-4 md:px-0 md:flex md:items-start md:gap-10">
        <aside
          className="hidden md:block w-72 shrink-0"
          style={{ marginLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))" }}
        >
          <h3 className="text-black font-semibold text-xl mb-4">
            {totalCourses} Courses
          </h3>
          {SidebarContent}
        </aside>

        <div className="flex-1 min-w-0">
          {visibleGroups.length > 0 ? (
            visibleGroups.map((group, index) => (
              <div key={group.value} className={index > 0 ? "mt-8 sm:mt-10" : ""}>
                <CourseCarousel
                  title={group.label}
                  count={`${group.courses.length} course${group.courses.length === 1 ? "" : "s"}`}
                  courses={group.courses}
                  allCoursesHref="/courses"
                  showAllCoursesLink={category !== "all"}
                />
              </div>
            ))
          ) : (
            <div className="rounded-lg bg-gray-50 border border-gray-100 py-16 text-center">
              <p className="text-gray-400 text-base">
                No courses match your filters.
              </p>
              <button
                type="button"
                onClick={() => methods.reset()}
                className="mt-3 text-sm font-semibold text-[#016068] underline underline-offset-2 hover:text-[#014d54]"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CoursesPackage;
