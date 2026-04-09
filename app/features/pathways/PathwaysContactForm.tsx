"use client";

import React, { useState } from "react";
import { FormInput } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { FormPrivacyConsent, PRIVACY_CONSENT_FIELD } from "@/components/form-privacy-consent";

type CallFormValues = {
  name: string;
  phone: string;
  [PRIVACY_CONSENT_FIELD]: boolean;
};

type BrochureFormValues = {
  email: string;
  [PRIVACY_CONSENT_FIELD]: boolean;
};

export function PathwaysContactForm() {
  const [callStatus, setCallStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [brochureStatus, setBrochureStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const callMethods = useForm<CallFormValues>({
    defaultValues: { name: "", phone: "", [PRIVACY_CONSENT_FIELD]: false },
  });
  const brochureMethods = useForm<BrochureFormValues>({
    defaultValues: { email: "", [PRIVACY_CONSENT_FIELD]: false },
  });

  const onCallSubmit = async (data: CallFormValues) => {
    const { [PRIVACY_CONSENT_FIELD]: _c, ...rest } = data;
    setCallStatus("loading");
    try {
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: rest.name.split(" ")[0] || rest.name,
          last_name: rest.name.split(" ").slice(1).join(" ") || "",
          number: rest.phone,
          email: "",
          message: "Pathways page - Request callback",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setCallStatus("success");
      callMethods.reset();
    } catch {
      setCallStatus("error");
    }
  };

  const onBrochureSubmit = async (data: BrochureFormValues) => {
    const { [PRIVACY_CONSENT_FIELD]: _c, ...rest } = data;
    setBrochureStatus("loading");
    try {
      const res = await fetch("/api/zapier/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Brochure", email: rest.email, source: "pathways-brochure" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setBrochureStatus("success");
      brochureMethods.reset();
    } catch {
      setBrochureStatus("error");
    }
  };

  return (
    <section className="bg-white py-12 sm:py-20 md:px-0 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F5F5F5] rounded-xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-[#016068] mb-2">We&apos;ll Call You</h3>
          <p className="text-gray-600 text-sm mb-6">
            One of our course advisors will contact you with full details about the pathways.
          </p>
          <FormProvider {...callMethods}>
            <form onSubmit={callMethods.handleSubmit(onCallSubmit)} className="space-y-4">
              <FormInput
                name="name"
                placeholder="Your name"
                rules={{ required: "Name is required" }}
              />
              <FormInput
                name="phone"
                placeholder="Contact number"
                rules={{ required: "Phone is required" }}
              />
              <FormPrivacyConsent />
              {callStatus === "success" && (
                <p className="text-sm text-green-600">Thank you! We&apos;ll be in touch soon.</p>
              )}
              {callStatus === "error" && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
              <Button
                type="submit"
                disabled={callStatus === "loading"}
                className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]"
              >
                {callStatus === "loading" ? "Sending..." : "Call Me"}
              </Button>
            </form>
          </FormProvider>
        </div>

        <div className="bg-[#F5F5F5] rounded-xl p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-[#016068] mb-2">Get the Brochure</h3>
          <p className="text-gray-600 text-sm mb-6">
            Provide your email to receive our course overview brochure.
          </p>
          <FormProvider {...brochureMethods}>
            <form onSubmit={brochureMethods.handleSubmit(onBrochureSubmit)} className="space-y-4">
              <FormInput
                name="email"
                type="email"
                placeholder="Your email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                }}
              />
              <FormPrivacyConsent />
              {brochureStatus === "success" && (
                <p className="text-sm text-green-600">Thank you! Check your email for the brochure.</p>
              )}
              {brochureStatus === "error" && (
                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
              )}
              <Button
                type="submit"
                disabled={brochureStatus === "loading"}
                className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]"
              >
                {brochureStatus === "loading" ? "Sending..." : "Get it now"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}
