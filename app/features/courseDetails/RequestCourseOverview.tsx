"use client";

import React, { useState } from "react";
import { RequestCourseOverviewModal } from "./RequestCourseOverviewModal";

const defaultTriggerClassName =
  "inline-block mt-6 sm:mt-8 text-[#4DD9AC] font-semibold text-sm underline underline-offset-4 hover:text-white transition-colors text-left";

interface RequestCourseOverviewProps {
  courseName: string;
  /** Full URL for Zapier (brochure webhook) */
  courseCanonicalUrl: string;
  /** Overrides default text-link styling (e.g. hero card CTA button) */
  triggerClassName?: string;
}

export function RequestCourseOverview({
  courseName,
  courseCanonicalUrl,
  triggerClassName,
}: RequestCourseOverviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClassName ?? defaultTriggerClassName}
      >
        Request course overview
      </button>
      <RequestCourseOverviewModal
        open={open}
        onOpenChange={setOpen}
        courseName={courseName}
        courseCanonicalUrl={courseCanonicalUrl}
      />
    </>
  );
}
