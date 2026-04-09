"use client";

import { FormInput } from "@/components/Input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";
import { FormPrivacyConsent, PRIVACY_CONSENT_FIELD } from "@/components/form-privacy-consent";

type FormValues = {
  email: string;
  name: string;
  [PRIVACY_CONSENT_FIELD]: boolean;
};

type BrochureProps = {
  /** When set (e.g. on a course page), sent to Zapier as `course_url` with name and email. */
  courseUrl?: string;
  /** When set with a course page, shown in the heading instead of the generic brochure title. */
  courseTitle?: string;
};

function Brochure({ courseUrl, courseTitle }: BrochureProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
      [PRIVACY_CONSENT_FIELD]: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { [PRIVACY_CONSENT_FIELD]: _consent, ...payload } = data;
    setStatus("loading");
    try {
      const res = await fetch("/api/zapier/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "brochure",
          ...(courseUrl && courseTitle
            ? {
                course_url: courseUrl,
                course: courseTitle,
                course_name: courseTitle,
              }
            : courseUrl
              ? { course_url: courseUrl }
              : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit");
      setStatus("success");
      methods.reset();
    } catch {
      setStatus("error");
    }
  };

  const isCourseContext = Boolean(courseUrl && courseTitle);

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden py-16 sm:py-16 md:py-16 px-4 md:px-0">
      <Image
        src={BackgroundImage}
        alt=""
        aria-hidden="true"
        fill
        className="absolute inset-0 object-cover object-center z-0"
        sizes="100vw"
        quality={80}
        priority={false}
        placeholder="blur"
      />

      {/* Slightly stronger than 50% so type reads clearly; still lets the photo show through */}
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[#1a2230]/58 via-[#1a2230]/62 to-[#151a26]/68"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl w-full px-4 sm:px-6 md:px-10 text-white text-center py-8 sm:py-10 md:py-12">
        <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold leading-tight drop-shadow-sm">
          {isCourseContext ? (
            <>
              Download our brochure
              <br />
              <span className="mt-2 inline-block text-[22px] sm:text-3xl md:text-4xl font-medium text-white/95">
                {courseTitle}
              </span>
            </>
          ) : (
            <>
              Download our <br />
              brochure
            </>
          )}
        </h2>

        <p className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-100/95 max-w-xl mx-auto drop-shadow-sm">
          {isCourseContext ? (
            <>
              Get industry updates, new courses, dates and promotions — including anything relevant to
              this programme. Enter your details below:
            </>
          ) : (
            <>
              Our brochure keeps you up to date with industry changes, new
              courses, upcoming dates and promotions. Enter your details below
              and we&apos;ll send it to you:
            </>
          )}
        </p>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-8 sm:mt-12 space-y-6 text-left bg-white text-black p-6 sm:p-13 rounded-2xl max-w-lg mx-auto"
          >
            <FormInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              rules={{ required: "Name is required" }}
            />

            <FormInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email",
                },
              }}
            />

            <FormPrivacyConsent />

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">
                Thank you! We&apos;ll email you the brochure shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
            )}

            <Button type="submit" disabled={status === "loading"} className="w-full bg-[#242A3A] h-15 uppercase font-bold text-base hover:bg-[#1a202a]">
              {status === "loading" ? "Sending..." : "Email me the brochure"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

export default Brochure;
