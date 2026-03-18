"use client";
import React, { useRef, useState, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { CourseDetailsData } from "@/lib/types/course";
import { defaultCourseDetailsData } from "@/lib/constants/course";

type Tab = "goals" | "entry" | "syllabus";

interface AccordionListProps {
  topics: { title: string; points: string[] }[];
}

function AccordionList({ topics }: AccordionListProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="flex flex-col gap-3">
      {topics.map((topic, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="rounded-sm overflow-hidden">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200 ${
                isOpen
                  ? "bg-[#016068] text-white"
                  : "bg-[#e8edf2] text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="font-semibold text-sm">{topic.title}</span>
              {isOpen ? (
                <Minus className="w-4 h-4 shrink-0" />
              ) : (
                <Plus className="w-4 h-4 shrink-0" />
              )}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white px-6 py-5">
                <ul className="flex flex-col gap-5">
                  {topic.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#016068] shrink-0" />
                      <p className="text-gray-700 text-sm leading-6">{point}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CourseDetailsProps {
  data?: CourseDetailsData | null;
}

function CourseDetails({ data }: CourseDetailsProps) {
  const course = data ?? defaultCourseDetailsData;

  const courseGoals = course.courseGoals ?? []
  const entryRequirements = course.entryRequirements ?? []
  const syllabus = course.syllabus ?? []

  const tabContent: Record<Tab, { title: string; points: string[] }[]> = {
    goals: courseGoals,
    entry: entryRequirements,
    syllabus: syllabus,
  };

  const [activeTab, setActiveTab] = useState<Tab>("syllabus");
  const [animating, setAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<Tab>("syllabus");
  const tabScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabIntoView = useCallback((el: HTMLButtonElement | null) => {
    if (!el || !tabScrollRef.current) return;
    const container = tabScrollRef.current;
    const offsetLeft = el.offsetLeft - container.offsetLeft;
    const scrollTarget =
      offsetLeft - (container.clientWidth / 2 - el.clientWidth / 2);
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, []);

  const handleTabChange = (tab: Tab, el: HTMLButtonElement | null) => {
    if (tab === activeTab) return;
    scrollTabIntoView(el);
    setAnimating(true);
    setTimeout(() => {
      setDisplayedTab(tab);
      setActiveTab(tab);
      setAnimating(false);
    }, 200);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "goals", label: "Course Goals" },
    { key: "entry", label: "Entry Requirements" },
    { key: "syllabus", label: "Detailed Course Syllabus" },
  ];

  return (
    <div className="bg-white">
      <section className="py-12 max-w-7xl mx-auto px-6">
        {/* Desktop: grid tabs */}
        <div className="hidden sm:grid grid-cols-3 border border-gray-200 rounded-sm overflow-hidden mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={(e) => handleTabChange(tab.key, e.currentTarget)}
              className={`py-5 text-xs font-semibold uppercase tracking-widest transition-all duration-200 border-r last:border-r-0 border-gray-200 ${
                activeTab === tab.key
                  ? "bg-[#4a5568] text-white"
                  : "bg-[#e8edf2] text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile: horizontally scrollable pill buttons */}
        <div
          ref={tabScrollRef}
          className="flex sm:hidden gap-2.5 overflow-x-auto pb-1 mb-8 -mx-6 px-6 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={(e) => handleTabChange(tab.key, e.currentTarget)}
              className={`shrink-0 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[#4a5568] text-white shadow-md"
                  : "bg-[#e8edf2] text-gray-500 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`transition-all duration-200 ease-in-out ${
            animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <AccordionList
            key={displayedTab}
            topics={tabContent[displayedTab]}
          />
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;