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
import { StandalonePrivacyConsent } from "@/components/form-privacy-consent";
import { formatCourseNameForZapier } from "@/lib/utils";

interface RequestCourseOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  /** Full page URL sent to Zapier (brochure webhook) */
  courseCanonicalUrl: string;
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

const emptyForm = { name: "", email: "" };

export function RequestCourseOverviewModal({
  open,
  onOpenChange,
  courseName,
  courseCanonicalUrl,
}: RequestCourseOverviewModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState(emptyForm);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setFormData(emptyForm);
      setPrivacyAgreed(false);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) return;
    setStatus("loading");
    try {
      const courseForZapier = formatCourseNameForZapier(courseName);
      const res = await fetch("/api/zapier/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          source: "brochure",
          course: courseForZapier,
          course_name: courseForZapier,
          course_url: courseCanonicalUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setFormData(emptyForm);
      setStatus("success");
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
            Enter your name and email and we&apos;ll send you an overview of {courseName}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 pb-6 overflow-y-auto flex-1">
          {status === "success" ? (
            <p className="text-sm text-green-600 font-medium">
              Thank you! We&apos;ll email you the course overview shortly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="overview-name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
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
                <label htmlFor="overview-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
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

              <StandalonePrivacyConsent
                id="request-overview-privacy"
                checked={privacyAgreed}
                onChange={setPrivacyAgreed}
              />

              {status === "error" && (
                <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
              )}

              <Button
                type="submit"
                disabled={status === "loading" || !privacyAgreed}
                className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
              >
                {status === "loading" ? "Sending..." : "Request course overview"}
              </Button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
