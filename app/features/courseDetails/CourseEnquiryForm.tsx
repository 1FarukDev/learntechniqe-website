"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type CourseEnquiryFormHandle = {
  open: () => void;
};

interface CourseEnquiryFormProps {
  courseName: string;
  courseUrl: string;
}

export const CourseEnquiryForm = forwardRef<
  CourseEnquiryFormHandle,
  CourseEnquiryFormProps
>(function CourseEnquiryForm({ courseName, courseUrl }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);

  useImperativeHandle(ref, () => ({ open }), [open]);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && formRef.current) {
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const [first, ...rest] = formData.name.trim().split(" ");
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "course_enquiry",
          first_name: first || formData.name,
          last_name: rest.join(" ") || "",
          number: formData.phone,
          email: formData.email,
          course_name: courseName,
          course_url: courseUrl,
          message: `Course Enquiry: ${courseName} (${courseUrl})`,
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
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full flex items-center bg-[#016068] hover:bg-[#014d54] text-white font-outfit font-semibold uppercase tracking-widest text-xs sm:text-sm h-12 sm:h-14 px-4 rounded-md overflow-hidden"
      >
        <span
          className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 ease-in-out ${
            isOpen ? "left-4 translate-x-0" : "left-1/2 -translate-x-1/2"
          }`}
        >
          Contact Us
        </span>
        <span
          className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      <div
        ref={formRef}
        className={`col-span-1 sm:col-span-2 overflow-hidden transition-all duration-300 ease-in-out scroll-mt-24 w-full ${
          isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="course-enquiry-name" className="block text-sm font-semibold text-gray-700 mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="course-enquiry-name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
                className="bg-white"
              />
            </div>
            <div>
              <label htmlFor="course-enquiry-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="course-enquiry-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                required
                className="bg-white"
              />
            </div>
            <div>
              <label htmlFor="course-enquiry-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="course-enquiry-email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
                className="bg-white"
              />
            </div>

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">Thank you! We&apos;ll be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
            >
              {status === "loading" ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
});

CourseEnquiryForm.displayName = "CourseEnquiryForm";
