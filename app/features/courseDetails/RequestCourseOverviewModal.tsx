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

const emptyForm = {
  first_name: "",
  last_name: "",
  number: "",
  email: "",
};

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
    try {
      const res = await fetch("/api/zapier/course-overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          number: formData.number,
          email: formData.email,
          course_name: courseName,
          course_url: courseUrl,
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
          <SheetTitle className="font-heading text-xl">Request a call back</SheetTitle>
          <SheetDescription>
            Enter your details and we&apos;ll call you back about {courseName}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="overview-first" className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="overview-first"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={(e) => setFormData((p) => ({ ...p, first_name: e.target.value }))}
                  required
                  className="bg-white h-12"
                />
              </div>
              <div>
                <label htmlFor="overview-last" className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="overview-last"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={(e) => setFormData((p) => ({ ...p, last_name: e.target.value }))}
                  required
                  className="bg-white h-12"
                />
              </div>
            </div>
            <div>
              <label htmlFor="overview-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="overview-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))}
                required
                className="bg-white h-12"
              />
            </div>
            <div>
              <label htmlFor="overview-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
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
              {status === "loading" ? "Sending..." : "Request a call back"}
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
