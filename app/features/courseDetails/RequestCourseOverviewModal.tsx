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

interface RequestCourseOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  courseUrl: string;
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

export function RequestCourseOverviewModal({
  open,
  onOpenChange,
  courseName,
  courseUrl,
}: RequestCourseOverviewModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const [first, ...rest] = formData.name.trim().split(" ");
      const res = await fetch("/api/zapier/course-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "course_overview_request",
          first_name: first || formData.name,
          last_name: rest.join(" ") || "",
          number: formData.phone,
          email: formData.email,
          course_name: courseName,
          course_url: courseUrl,
          message: `Course Overview Request: ${courseName} (${courseUrl})`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setFormData({ name: "", phone: "", email: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className={isMobile ? "h-[85vh] rounded-t-2xl border-t max-h-[90vh]" : "sm:max-w-md w-full"}
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-xl">Request Course Overview</SheetTitle>
          <SheetDescription>
            Enter your details and we&apos;ll send you a full overview of {courseName}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="overview-name" className="block text-sm font-semibold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
                className="bg-white h-12"
              />
            </div>
            <div>
              <label htmlFor="overview-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                required
                className="bg-white h-12"
              />
            </div>
            <div>
              <label htmlFor="overview-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
                className="bg-white h-12"
              />
            </div>

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">Thank you! We&apos;ll send the overview to your email soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
            >
              {status === "loading" ? "Sending..." : "Request Overview"}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
