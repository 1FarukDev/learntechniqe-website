"use client";
import { FilterAccordion } from "@/components/accordion";
import { FormInput } from "@/components/Input";
import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Search } from "lucide-react";
import ArrowRight from "@/app/assets/svg/arrow-front.svg";
import ArrowBack from "@/app/assets/svg/arrow-back.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/course-card";

function CoursesPackage() {
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
    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-start flex-col md:flex-row gap-10">
          <aside className="w-full md:w-72 shrink-0">
            <h3 className="text-black font-semibold text-xl mb-4">
              75 Courses
            </h3>
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
                    {
                      label: "Existing Electrician",
                      value: "existing-electrician",
                    },
                  ]}
                  selectedValue={expertiseLevel}
                  onChange={(val) => setValue("expertiseLevel", val)}
                />

                <FilterAccordion
                  title="Categories"
                  options={[
                    { label: "Course Packages", value: "course-packages" },
                    { label: "PAT Testing", value: "pat-testing" },
                    {
                      label: "Electrical Vehicle Charging",
                      value: "ev-charging",
                    },
                    { label: "18th Edition Courses", value: "18th-edition" },
                    { label: "Extra Experience", value: "extra-experience" },
                    {
                      label: "Inspection and Testing",
                      value: "inspection-testing",
                    },
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
                levels, whether you’re  looking to start a career as an
                electrician hoping to enter the industry or already work as a
                qualified electrician who is looking to extend their services or
                knowledge, we will have an electricians course for you. Being
                able to provide practical electrical training to both
                experienced electricians as well as new starters means we are
                able to offer unbiased advice on what is the correct training
                for your individual circumstances. Our courses are designed to
                be as practical as they can be, we believe this is the best way
                to learn! Our courses are all taught by knowledgeable,
                experienced industry experts. We have training centres across
                the UK, all of which are kitted out with state-of-the-art
                equipment for candidates to practice and work with – these are
                just some reasons we have high pass rates for our electrical
                training courses. Whether its domestic electrical work/
                installations, gaining electrical experience or your a more
                experienced electrician looking for  more commercial/industrial
                works we have electrical training courses to give you the
                relevant skills required. If you require assistance on booking
                your next electrical training course, our course advisors have
                superb knowledge on offering advice. Each of these electrician
                courses has been designed to provide you with the qualifications
                needed to enter and work within the electrical industry, saving
                you both time and money.
              </p>
            </FormProvider>
          </aside>

          <div className="flex-1 min-w-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-xl">
                    Course Packages
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-base">
                    24 courses
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>

                  <Button className="uppercase bg-[#016068] px-10 h-11">
                    All Courses
                  </Button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 no-scrollbar"
              >
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-xl">
                    PAT Testing
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-base">
                    24 courses
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>

                  <Button className="uppercase bg-[#016068] px-10 h-11">
                    All Courses
                  </Button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 no-scrollbar"
              >
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-black font-semibold text-xl">
                    Electrical Vehicle Charging
                  </h3>
                  <p className="text-[#9A9A9A] font-normal text-base">
                    24 courses
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => scroll("left")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowBack} alt="Scroll left" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scroll("right")}
                      className="h-10 w-10 bg-[#9A9A9A] flex items-center justify-center rounded-full hover:bg-[#016068] transition-colors cursor-pointer"
                    >
                      <Image src={ArrowRight} alt="Scroll right" />
                    </button>
                  </div>

                  <Button className="uppercase bg-[#016068] px-10 h-11">
                    All Courses
                  </Button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-4 py-4 no-scrollbar"
              >
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoursesPackage;
