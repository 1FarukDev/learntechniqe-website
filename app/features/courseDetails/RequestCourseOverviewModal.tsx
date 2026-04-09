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
import {
  getAbsoluteCourseUrl,
  splitFullName,
} from "@/lib/course-detail-form";

interface RequestCourseOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  courseUrl: string;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 768px)").matches
      : false,
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const emptyForm = { name: "", email: "" };

export function RequestCourseOverviewModal({
  open,
  onOpenChange,
  courseName,
  courseUrl,
}: RequestCourseOverviewModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState(emptyForm);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) setStatus("idle");
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const { first_name, last_name } = splitFullName(formData.name);
    const absoluteUrl = getAbsoluteCourseUrl(courseUrl);
    try {
      const res = await fetch("/api/zapier/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          first_name,
          last_name,
          number: "",
          email: formData.email.trim(),
          course_name: courseName,
          course_url: absoluteUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setFormData(emptyForm);
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
          <SheetTitle className="font-heading text-xl">Request course overview</SheetTitle>
          <SheetDescription>
            Enter your details and we&apos;ll send you an overview of {courseName}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="overview-name" className="block text-sm font-semibold text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
                autoComplete="name"
                className="bg-white h-12"
              />
            </div>
            <div>
              <label htmlFor="overview-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-email"
                type="email"
                placeholder="Your email address"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
                autoComplete="email"
                className="bg-white h-12"
              />
            </div>
            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">Thank you! We&apos;ll be in touch shortly.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
            >
              {status === "loading" ? "Sending..." : "Request course overview"}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
