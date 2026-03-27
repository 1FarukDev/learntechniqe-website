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
                <ul className="flex flex-col">
                  {topic.points.map((point, j) => {
                    const isFirst = j === 0;
                    const isLast = j === topic.points.length - 1;
                    return (
                      <li key={j} className="flex items-start gap-4">
                        <div className="flex w-4 shrink-0 flex-col items-center self-stretch">
                          {!isFirst && (
                            <div className="h-[3px] w-px shrink-0 bg-gray-200" aria-hidden />
                          )}
                          <span
                            className="z-[1] mt-[3px] size-2.5 shrink-0 rounded-full bg-[#016068] ring-2 ring-white"
                            aria-hidden
                          />
                          {!isLast && (
                            <div
                              className="min-h-2 w-px flex-1 bg-gray-200"
                              aria-hidden
                            />
                          )}
                        </div>
                        <p
                          className={`flex-1 text-sm leading-6 text-gray-700 ${isLast ? "pb-0" : "pb-5"}`}
                        >
                          {point}
                        </p>
                      </li>
                    );
                  })}
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

  const courseGoals = course.courseGoals ?? [];
  const entryRequirements = course.entryRequirements ?? [];
  const syllabus = course.syllabus ?? [];

  const allTabs: { key: Tab; label: string; content: { title: string; points: string[] }[] }[] = [
    { key: "goals", label: "Course Goals", content: courseGoals },
    { key: "entry", label: "Entry Requirements", content: entryRequirements },
    { key: "syllabus", label: "Detailed Course Syllabus", content: syllabus },
  ];

  const tabs = allTabs.filter((t) => t.content.length > 0);
  const defaultTab = tabs[0]?.key ?? "goals";

  const tabContent: Record<string, { title: string; points: string[] }[]> = {};
  tabs.forEach((t) => { tabContent[t.key] = t.content; });

  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [animating, setAnimating] = useState(false);
  const [displayedTab, setDisplayedTab] = useState<Tab>(defaultTab);
  const tabScrollRef = useRef<HTMLDivElement>(null);

  const scrollTabIntoView = useCallback((el: HTMLButtonElement | null) => {
    if (!el || !tabScrollRef.current) return;
    const container = tabScrollRef.current;
    const offsetLeft = el.offsetLeft - container.offsetLeft;
    const scrollTarget = offsetLeft - (container.clientWidth / 2 - el.clientWidth / 2);
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

  if (tabs.length === 0) return null;

  return (
    <div className="bg-white">
      <section className="py-12 max-w-7xl mx-auto px-6">
        {/* Desktop: grid tabs */}
        <div
          className="hidden sm:grid border border-gray-200 rounded-sm overflow-hidden mb-10"
          style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
        >
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
            topics={tabContent[displayedTab] ?? []}
          />
        </div>
      </section>
    </div>
  );
}

export default CourseDetails;