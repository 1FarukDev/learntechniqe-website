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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export type CourseEnquiryFormHandle = {
  open: () => void;
};

interface CourseEnquiryFormProps {
  courseName: string;
  courseUrl: string;
}

const emptyForm = {
  first_name: "",
  last_name: "",
  number: "",
  email: "",
  message: "",
};

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
  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "course_enquiry",
          first_name: formData.first_name,
          last_name: formData.last_name,
          number: formData.number,
          email: formData.email,
          message: formData.message,
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
          isOpen ? "max-h-[900px] opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="course-enquiry-first" className="block text-sm font-semibold text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="course-enquiry-first"
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={(e) => setFormData((p) => ({ ...p, first_name: e.target.value }))}
                  required
                  className="bg-white"
                />
              </div>
              <div>
                <label htmlFor="course-enquiry-last" className="block text-sm font-semibold text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="course-enquiry-last"
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={(e) => setFormData((p) => ({ ...p, last_name: e.target.value }))}
                  required
                  className="bg-white"
                />
              </div>
            </div>
            <div>
              <label htmlFor="course-enquiry-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <Input
                id="course-enquiry-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.number}
                onChange={(e) => setFormData((p) => ({ ...p, number: e.target.value }))}
                required
                className="bg-white"
              />
            </div>
            <div>
              <label htmlFor="course-enquiry-email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
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
            <div>
              <label htmlFor="course-enquiry-message" className="block text-sm font-semibold text-gray-700 mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="course-enquiry-message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                required
                className="bg-white min-h-24"
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
              {status === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
});

CourseEnquiryForm.displayName = "CourseEnquiryForm";
