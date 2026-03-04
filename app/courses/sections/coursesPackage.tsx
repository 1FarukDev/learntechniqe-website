"use client";
import { FilterAccordion } from "@/components/accordion";
import { FormInput } from "@/components/Input";
import React, { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";

function CoursesPackage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
  const category = watch("category");
  const location = watch("location");
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

        <FilterAccordion
          title="Expertise Level"
          options={[
            { label: "Beginner", value: "beginner" },
            { label: "Existing Electrician", value: "existing-electrician" },
          ]}
          selectedValue={expertiseLevel}
          onChange={(val) => setValue("expertiseLevel", val)}
        />

        <FilterAccordion
          title="Categories"
          options={[
            { label: "Course Packages", value: "course-packages" },
            { label: "PAT Testing", value: "pat-testing" },
            { label: "Electrical Vehicle Charging", value: "ev-charging" },
            { label: "18th Edition Courses", value: "18th-edition" },
            { label: "Extra Experience", value: "extra-experience" },
            { label: "Inspection and Testing", value: "inspection-testing" },
            { label: "Part P", value: "part-p" },
            { label: "Online Courses", value: "online-courses" },
          ]}
          selectedValue={category}
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
        We have a wide range of electrician courses aimed at different
        levels, whether you're looking to start a career as an
        electrician hoping to enter the industry or already work as a
        qualified electrician who is looking to extend their services or
        knowledge, we will have an electricians course for you. Being
        able to provide practical electrical training to both
        experienced electricians as well as new starters means we are
        able to offer unbiased advice on what is the correct training
        for your individual circumstances. Our courses are designed to
        be as practical as they can be, we believe this is the best way
        to learn! Our courses are all taught by knowledgeable,
        experienced industry experts. We have training centres across
        the UK, all of which are kitted out with state-of-the-art
        equipment for candidates to practice and work with – these are
        just some reasons we have high pass rates for our electrical
        training courses.
      </p>
    </FormProvider>
  );

  return (
    <section className="py-8 sm:py-10 bg-white">

      {/* ── Mobile Drawer ─────────────────────────────────────────────────── */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setDrawerOpen(false)}
          />
          <div
            className="fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-white z-50 flex flex-col shadow-2xl overflow-y-auto md:hidden"
            style={{ animation: "slideInLeft 250ms ease forwards" }}
          >
            <style>{`
              @keyframes slideInLeft {
                from { transform: translateX(-100%); }
                to { transform: translateX(0); }
              }
            `}</style>

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h3 className="font-semibold text-gray-800 text-sm">Filters</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <X size={18} className="text-gray-600" />
              </button>
            </div>

            {/* Drawer content */}
            <div className="px-5 py-5 flex-1">{SidebarContent}</div>
          </div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4">

        {/* Mobile filter trigger */}
        <button
          className="md:hidden mb-5 flex items-center gap-2 text-sm font-semibold text-[#016068] border border-[#016068] rounded-lg px-4 py-2 hover:bg-[#016068]/5 transition"
          onClick={() => setDrawerOpen(true)}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <div className="flex items-start flex-col md:flex-row gap-10">

          {/* Desktop sidebar */}
          <aside className="hidden md:block w-72 shrink-0">
            <h3 className="text-black font-semibold text-xl mb-4">
              75 Courses
            </h3>
            {SidebarContent}
          </aside>

          {/* Course sections */}
          <div className="flex-1 min-w-0">

            {/* Course Packages */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-lg sm:text-xl">
                    Course Packages
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-sm sm:text-base">
                    24 courses
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>
                  <Button className="uppercase bg-[#016068] px-4 sm:px-10 h-9 sm:h-11 text-xs sm:text-sm">
                    All Courses
                  </Button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none"
                style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="snap-start shrink-0 w-[max(280px,min(320px,calc(100vw-56px)))] md:w-auto md:min-w-0">
                    <CourseCard />
                  </div>
                ))}
              </div>
            </div>

            {/* PAT Testing */}
            <div className="mt-8 sm:mt-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-lg sm:text-xl">
                    PAT Testing
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-sm sm:text-base">
                    24 courses
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>
                  <Button className="uppercase bg-[#016068] px-4 sm:px-10 h-9 sm:h-11 text-xs sm:text-sm">
                    All Courses
                  </Button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none"
                style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="snap-start shrink-0 w-[max(280px,min(320px,calc(100vw-56px)))] md:w-auto md:min-w-0">
                    <CourseCard />
                  </div>
                ))}
              </div>
            </div>

            {/* Electrical Vehicle Charging */}
            <div className="mt-8 sm:mt-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-lg sm:text-xl">
                    Electrical Vehicle Charging
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-sm sm:text-base">
                    24 courses
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-8 w-8 sm:h-10 sm:w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>
                  <Button className="uppercase bg-[#016068] px-4 sm:px-10 h-9 sm:h-11 text-xs sm:text-sm">
                    All Courses
                  </Button>
                </div>
              </div>
              <div
                ref={scrollRef}
                className="flex overflow-x-hidden gap-4 py-4 no-scrollbar snap-x snap-mandatory overscroll-x-contain md:snap-none"
                style={{ scrollPaddingLeft: "1rem", scrollPaddingRight: "1rem" }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="snap-start shrink-0 w-[max(280px,min(320px,calc(100vw-56px)))] md:w-auto md:min-w-0">
                    <CourseCard />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesPackage;