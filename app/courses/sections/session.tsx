"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import SessionImage from "@/app/assets/png/session.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, X } from "lucide-react";
import type { SessionCourseOption } from "@/lib/course-session-options";

/** Radix Select requires a non-empty value for the placeholder row */
const COURSE_SELECT_NONE = "__book_session_no_course__";

type SessionVariant = "full" | "banner";

export type SessionProps = {
  variant?: SessionVariant;
  /** Course listing pages: dropdown of courses */
  courseOptions?: SessionCourseOption[];
  /** Course detail page: fixed course + URL sent to Zapier */
  lockedCourse?: SessionCourseOption;
};

function Session({
  variant = "full",
  courseOptions = [],
  lockedCourse,
}: SessionProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const sortedOptions = useMemo(
    () =>
      [...courseOptions].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
      ),
    [courseOptions],
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: lockedCourse?.title ?? "",
    coursePath: lockedCourse?.url ?? "",
  });

  useEffect(() => {
    if (lockedCourse) {
      setForm((p) => ({
        ...p,
        course: lockedCourse.title,
        coursePath: lockedCourse.url,
      }));
    }
  }, [lockedCourse?.title, lockedCourse?.url]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const coursePageFullUrl = () => {
    if (typeof window === "undefined" || !form.coursePath) return "";
    return `${window.location.origin}${form.coursePath}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lockedCourse && !form.coursePath.trim()) return;
    setStatus("loading");
    try {
      const [first, ...rest] = form.name.trim().split(" ");
      const fullUrl = coursePageFullUrl();
      const res = await fetch("/api/zapier/book-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first || form.name,
          last_name: rest.join(" ") || "",
          email: form.email,
          number: form.phone,
          course: form.course,
          course_url: fullUrl || form.coursePath,
          course_path: form.coursePath,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setForm((p) => ({
        name: "",
        email: "",
        phone: "",
        course: lockedCourse?.title ?? "",
        coursePath: lockedCourse?.url ?? "",
      }));
    } catch {
      setStatus("error");
    }
  };

  const openDrawer = () => setDrawerOpen(true);

  const bannerSection = (
    <section
      className="w-full bg-white py-10 sm:py-12 md:py-14"
      aria-labelledby="book-session-banner-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
          <Image
            src={SessionImage}
            alt="Training session background"
            fill
            className="z-0 object-cover object-center"
            sizes="(min-width: 1280px) 1216px, (min-width: 1024px) 960px, 100vw"
          />
          <div
            className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.55)] via-[rgba(0,100,110,0.70)] to-[rgba(0,60,80,0.88)]"
            aria-hidden
          />
          <div className="relative z-20 p-6 sm:p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-10 lg:p-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5A623] sm:text-xs">
                  On-site training
                </p>
                <h2
                  id="book-session-banner-heading"
                  className="mt-2 font-outfit text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[1.85rem] md:leading-snug"
                >
                  Training at your premises?
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-[1.05rem]">
                  This course can be delivered at{" "}
                  <strong className="font-semibold text-white">your location</strong>
                  {", "}
                  same syllabus, hands-on where facilities allow. Tell us you&apos;re
                  interested and we&apos;ll follow up with availability, group sizes,
                  and logistics.
                </p>
              </div>
            </div>

            <div className="mt-8 flex shrink-0 flex-col gap-3 sm:mt-0 md:ml-4 md:max-w-[min(100%,280px)]">
              <Button
                type="button"
                onClick={openDrawer}
                className="h-14 w-full bg-[#F5A623] px-8 font-outfit text-base font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:bg-[#e09410] hover:shadow-md md:min-w-[240px]"
              >
                Book a session
              </Button>
              <p className="text-center text-xs text-white/60 sm:text-left md:text-center">
                No obligation, we&apos;ll reply with next steps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const fullSection = (
    <section className="relative flex min-h-170 w-full items-center justify-center overflow-hidden">
      <Image
        src={SessionImage}
        alt="Training session background"
        fill
        className="z-0 object-cover object-center"
      />

      <div className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.55)] via-[rgba(0,100,110,0.70)] to-[rgba(0,60,80,0.88)]" />

      <div className="relative z-20 mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 text-center text-white">
        <h2 className="font-outfit text-4xl leading-tight font-semibold md:text-5xl">
          Want To Do The Training <br className="hidden md:block" />
          At Your Premises?
        </h2>

        <p className="font-outfit text-sm leading-7 font-normal text-white/85 md:text-base">
          We bring the full training experience to your location, saving you
          time while{" "}
          <br className="hidden md:block" /> delivering hands-on,
          results-driven sessions built around your environment and{" "}
          <br className="hidden md:block" /> goals, and available for direct
          staff training when needed.
        </p>

        <div className="mx-4 w-full">
          <Button
            type="button"
            onClick={openDrawer}
            className="mt-4 h-17.25 w-full rounded-md bg-[#F5A623] px-16 py-6 font-outfit text-sm font-semibold tracking-widest text-white uppercase hover:bg-[#e09410]"
          >
            Book Session
          </Button>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {variant === "banner" ? bannerSection : fullSection}

      {drawerOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[60] bg-black/50"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
              style={{ animation: "slideInRight 250ms ease forwards" }}
            >
              <style>{`
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to   { transform: translateX(0); }
                }
              `}</style>

              <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Book a Session
                </h3>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="mb-6 text-sm text-gray-500">
                  {lockedCourse
                    ? "We’ll use this course from the page you’re on. Add your contact details and we’ll be in touch."
                    : "Choose the course you’re interested in and your contact details — we’ll arrange training at your premises."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="session-name"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-name"
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-email"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-phone"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <span className="mb-1 block text-sm font-semibold text-gray-700">
                      Course <span className="text-red-500">*</span>
                    </span>
                    {lockedCourse ? (
                      <>
                        <p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900">
                          {form.course}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Page: {form.coursePath}
                        </p>
                      </>
                    ) : (
                      <Select
                        value={
                          form.coursePath.trim()
                            ? form.coursePath
                            : COURSE_SELECT_NONE
                        }
                        onValueChange={(path) => {
                          if (path === COURSE_SELECT_NONE) {
                            setForm((p) => ({
                              ...p,
                              coursePath: "",
                              course: "",
                            }));
                            return;
                          }
                          const opt = sortedOptions.find((o) => o.url === path);
                          setForm((p) => ({
                            ...p,
                            coursePath: path,
                            course: opt?.title ?? "",
                          }));
                        }}
                      >
                        <SelectTrigger
                          id="session-course"
                          aria-label="Course"
                          className="h-11 w-full min-w-0 border-gray-200 bg-gray-50 text-left text-sm text-gray-900 shadow-sm hover:bg-gray-100/80 focus-visible:border-[#016068] focus-visible:ring-[3px] focus-visible:ring-[#016068]/25 data-[size=default]:h-11"
                        >
                          <SelectValue placeholder="Select a course…" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          sideOffset={6}
                          className="z-[100] max-h-[min(300px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
                        >
                          <SelectItem
                            value={COURSE_SELECT_NONE}
                            className="cursor-pointer py-2.5 text-gray-500 focus:bg-gray-50 focus:text-gray-700"
                          >
                            Select a course…
                          </SelectItem>
                          {sortedOptions.map((o) => (
                            <SelectItem
                              key={o.url}
                              value={o.url}
                              className="cursor-pointer py-2.5 pr-9 focus:bg-[#016068]/10 focus:text-gray-900"
                            >
                              {o.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {status === "success" && (
                    <p className="text-sm font-medium text-green-600">
                      Thank you! We&apos;ll be in touch soon to arrange your
                      session.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm font-medium text-red-600">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      status === "loading" ||
                      (!lockedCourse && !form.coursePath.trim())
                    }
                    className="h-12 w-full bg-[#016068] font-semibold text-white uppercase hover:bg-[#014d54]"
                  >
                    {status === "loading" ? "Sending..." : "Book Now"}
                  </Button>
                </form>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default Session;
