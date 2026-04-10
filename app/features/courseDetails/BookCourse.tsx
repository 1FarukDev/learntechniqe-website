"use client";
import React, { useState } from "react";
import Image from "next/image";
import { BookCourseData } from "@/lib/types/course";
import { defaultBookCourseData } from "@/lib/constants/course";
import { CademyBookingIframe } from "./CademyBookingIframe";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StandalonePrivacyConsent } from "@/components/form-privacy-consent";
import { formatCourseNameForZapier } from "@/lib/utils";

interface BookCourseProps {
  data?: BookCourseData | null;
  courseUrl?: string;
  showAccreditation?: boolean;
}

const emptyForm = {
  first_name: "",
  last_name: "",
  number: "",
  email: "",
};

function RequestOverviewInlineForm({
  courseName,
  courseUrl,
}: {
  courseName: string;
  courseUrl: string;
}) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState(emptyForm);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAgreed) return;
    setStatus("loading");
    try {
      const courseForZapier = formatCourseNameForZapier(courseName);
      const res = await fetch("/api/zapier/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          number: formData.number,
          email: formData.email,
          course: courseForZapier,
          course_name: courseForZapier,
          course_url: courseUrl,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setFormData(emptyForm);
      setPrivacyAgreed(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
      <h3 className="font-outfit font-bold text-xl sm:text-2xl text-black mb-2">
        Request a call back
      </h3>
      <p className="text-gray-500 text-sm mb-6">
        Enter your details and we&apos;ll call you back about{" "}
        <span className="font-semibold text-gray-700">{courseName}</span>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="inline-overview-first"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="inline-overview-first"
              type="text"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, first_name: e.target.value }))
              }
              required
              className="bg-white h-12"
            />
          </div>
          <div>
            <label
              htmlFor="inline-overview-last"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="inline-overview-last"
              type="text"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, last_name: e.target.value }))
              }
              required
              className="bg-white h-12"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="inline-overview-phone"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="inline-overview-phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.number}
            onChange={(e) =>
              setFormData((p) => ({ ...p, number: e.target.value }))
            }
            required
            className="bg-white h-12"
          />
        </div>
        <div>
          <label
            htmlFor="inline-overview-email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="inline-overview-email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            required
            className="bg-white h-12"
          />
        </div>

        <StandalonePrivacyConsent
          id="inline-callback-privacy"
          checked={privacyAgreed}
          onChange={setPrivacyAgreed}
        />

        {status === "success" && (
          <p className="text-sm text-green-600 font-medium">
            Thank you! We&apos;ll be in touch shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 font-medium">
            Something went wrong. Please try again.
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "loading" || !privacyAgreed}
          className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
        >
          {status === "loading" ? "Sending..." : "Request a call back"}
        </Button>
      </form>
    </div>
  );
}

function BookCourse({ data, courseUrl = "" }: BookCourseProps) {
  const course = data ?? defaultBookCourseData;

  const title = course.title ?? defaultBookCourseData.title;
  const prerequisites =
    course.prerequisites ?? defaultBookCourseData.prerequisites;
  const completionRewards =
    course.completionRewards ?? defaultBookCourseData.completionRewards ?? [];
  const qualifications =
    course.qualifications ?? defaultBookCourseData.qualifications ?? [];
  const cademyEmbedUrl = course.cademyEmbedUrl;
  const showAccreditation = course.showAccreditation ?? true;
  const hasBooking =
    typeof cademyEmbedUrl === "string" && cademyEmbedUrl.trim().length > 0;

  return (
    <div className="bg-white" id="bookSection">
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-black mb-6 sm:mb-8">
          {hasBooking ? "Book Course" : "Get Course Details"}
        </h2>

        <div className="flex flex-col md:flex-row gap-6 md:gap-15 mb-8 sm:mb-10">
          <div className="flex items-stretch gap-3 flex-wrap sm:flex-nowrap">
            {prerequisites && (
              <div className="border border-gray-200 rounded-xl p-4 w-full sm:w-44 flex flex-col justify-between bg-gray-50">
                <p className="text-gray-800 font-semibold text-sm leading-snug mb-3">
                  Course <br /> Pre-Requisites:
                </p>
                <p className="text-gray-500 text-xs leading-5">
                  {prerequisites}
                </p>
              </div>
            )}

            {showAccreditation &&
              qualifications
                .filter(
                  (q, i, arr) =>
                    arr.findIndex(
                      (x) =>
                        x.accreditationLogoAlt?.toLowerCase() ===
                        q.accreditationLogoAlt?.toLowerCase(),
                    ) === i,
                )
                .slice(0, 2)
                .map((q, i) =>
                  q.accreditationLogo ? (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl p-4 w-36 flex flex-col items-center justify-between bg-gray-50"
                    >
                      <Image
                        src={q.accreditationLogo}
                        alt={
                          q.accreditationLogoAlt ||
                          q.accreditedBy ||
                          "Accreditation"
                        }
                        width={q.accreditationLogoAlt === "EAL logo" ? 250 : 90}
                        height={100}
                        className="object-contain"
                      />
                      {q.accreditedBy && (
                        <p className="text-[#14AE5C] bg-[#DCF2E9] p-2 py-1 rounded-full text-xs font-normal mt-4">
                          Accredited
                        </p>
                      )}
                    </div>
                  ) : null,
                )}
          </div>

          {completionRewards.length > 0 && (
            <div className="flex flex-col justify-center">
              <p className="font-bold text-gray-800 text-base leading-snug mb-3">
                Upon completion of <br /> {title} participants receive:
              </p>
              {completionRewards.map((reward, i) => (
                <p key={i} className="text-gray-500 text-sm mb-2">
                  {reward}
                </p>
              ))}
            </div>
          )}
        </div>

        {hasBooking ? (
          <div className="max-w-3xl mx-auto overflow-hidden">
            <CademyBookingIframe
              key={cademyEmbedUrl}
              src={cademyEmbedUrl!}
              title="Course booking dates"
            />
          </div>
        ) : (
          <RequestOverviewInlineForm courseName={title} courseUrl={courseUrl} />
        )}
      </section>
    </div>
  );
}

export default BookCourse;
