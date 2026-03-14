"use client";
import { FilterAccordion } from "@/components/accordion";
import { FormInput } from "@/components/Input";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";
import Link from "next/link";

const CATEGORY_CONFIG = {
  electrical: {
    courseCount: "75",
    filterCategories: [
      { label: "Course Packages", value: "course-packages" },
      { label: "PAT Testing", value: "pat-testing" },
      { label: "Electrical Vehicle Charging", value: "ev-charging" },
      { label: "18th Edition Courses", value: "18th-edition" },
      { label: "Extra Experience", value: "extra-experience" },
      { label: "Inspection and Testing", value: "inspection-testing" },
      { label: "Part P", value: "part-p" },
      { label: "Online Courses", value: "online-courses" },
    ],
    carousels: [
      { title: "Course Packages", count: "24 courses" },
      { title: "PAT Testing", count: "24 courses" },
      { title: "Electrical Vehicle Charging", count: "24 courses" },
    ],
    sidebarText:
      "We have a wide range of electrician courses aimed at different levels, whether you're looking to start a career as an electrician hoping to enter the industry or already work as a qualified electrician who is looking to extend their services or knowledge, we will have an electricians course for you. Being able to provide practical electrical training to both experienced electricians as well as new starters means we are able to offer unbiased advice on what is the correct training for your individual circumstances. Our courses are designed to be as practical as they can be, we believe this is the best way to learn! Our courses are all taught by knowledgeable, experienced industry experts. We have training centres across the UK, all of which are kitted out with state-of-the-art equipment for candidates to practice and work with – these are just some reasons we have high pass rates for our electrical training courses.",
  },
  "aircon-refrigeration": {
    courseCount: "45",
    filterCategories: [
      { label: "Course Packages", value: "course-packages" },
      { label: "F Gas", value: "f-gas" },
      { label: "Hydrocarbon", value: "hydrocarbon" },
      { label: "Pipework & Brazing", value: "pipework-brazing" },
      { label: "Total Air Conditioning", value: "total-aircon" },
    ],
    carousels: [
      { title: "Course Packages", count: "12 courses" },
      { title: "F Gas Regulations", count: "8 courses" },
      { title: "Total Air Conditioning & Refrigeration", count: "10 courses" },
    ],
    sidebarText:
      "Our air conditioning and refrigeration courses cover everything from F-Gas certification to comprehensive total air conditioning packages. Whether you're new to the industry or an experienced technician looking to upskill, we offer hands-on training with state-of-the-art equipment. Our courses are designed to provide practical, real-world skills that you can apply immediately in your career.",
  },
  plc: {
    courseCount: "35",
    filterCategories: [
      { label: "Course Packages", value: "course-packages" },
      { label: "SCADA", value: "scada" },
      { label: "Manufacturer Specific", value: "manufacturer" },
      { label: "Beginner/Intermediate/Advanced", value: "experience" },
    ],
    carousels: [
      { title: "Course Packages", count: "15 courses" },
      { title: "SCADA & Communications", count: "8 courses" },
      { title: "Manufacturer Specific (Siemens, Allen Bradley, Mitsubishi)", count: "12 courses" },
    ],
    sidebarText:
      "Our PLC training courses range from beginner to advanced levels, with City & Guilds and EAL accredited qualifications. Learn programmable logic controllers, SCADA systems, industrial networking, and manufacturer-specific training. Our experienced instructors provide hands-on training with industry-standard equipment to ensure you gain the practical skills needed for automation and control systems.",
  },
} as const;

type CategoryType = keyof typeof CATEGORY_CONFIG;

function CourseCarousel({
  title,
  count,
  allCoursesHref = "/courses",
}: {
  title: string;
  count: string;
  allCoursesHref?: string;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0 });
  }, []);

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
          <Button asChild className="uppercase bg-[#016068] px-6 sm:px-10 h-10 sm:h-11 text-xs sm:text-sm flex-1 sm:flex-initial">
            <Link href={allCoursesHref}>All Courses</Link>
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="-mx-4 flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none pl-4 pr-4 md:mx-0 md:pl-0 md:pr-0"
        style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[max(220px,min(260px,calc(100vw-56px)))] md:w-auto md:min-w-0"
          >
            <CourseCard />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesPackage({
  category = "electrical",
}: {
  category?: CategoryType;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const config = CATEGORY_CONFIG[category];

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const methods = useForm({
    defaultValues: {
      search: "",
      expertiseLevel: "",
      category: "",
      location: "",
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const expertiseLevel = watch("expertiseLevel");
  const filterCategory = watch("category");
  const location = watch("location");

  const SidebarContent = (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <FormInput
          name="search"
          placeholder="Search by topic"
          iconRight={<Search className="w-4 h-4 text-gray-400" />}
          className="bg-gray-100 border-none rounded-xl py-5 text-gray-500 placeholder:text-gray-400"
          wrapperClassName="mb-6"
        />

        {category === "electrical" && (
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
          title="Categories"
          options={[...config.filterCategories]}
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

      <hr className="my-4" />

      <p className="bg-[#F5F5F5] p-4 text-sm">
        {config.sidebarText}
      </p>
    </FormProvider>
  );

  return (
    <section className="sm:py-10 bg-white overflow-x-clip">
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
            {config.courseCount} Courses
          </h3>
          {SidebarContent}
        </aside>

        <div className="flex-1 min-w-0">
          {config.carousels.map((carousel, index) => (
            <div key={carousel.title} className={index > 0 ? "mt-8 sm:mt-10" : ""}>
              <CourseCarousel
                title={carousel.title}
                count={carousel.count}
                allCoursesHref="/courses"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesPackage;
