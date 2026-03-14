"use client";

import React, { useState } from "react";
import { RequestCourseOverviewModal } from "./RequestCourseOverviewModal";

interface RequestCourseOverviewProps {
  courseName: string;
  courseUrl: string;
}

export function RequestCourseOverview({ courseName, courseUrl }: RequestCourseOverviewProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-block mt-6 sm:mt-8 text-[#4DD9AC] font-semibold text-sm underline underline-offset-4 hover:text-white transition-colors text-left"
      >
        Request Course Overview
      </button>
      <RequestCourseOverviewModal
        open={open}
        onOpenChange={setOpen}
        courseName={courseName}
        courseUrl={courseUrl}
      />
    </>
  );
}
