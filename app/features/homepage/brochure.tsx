"use client";

import { FormInput } from "@/components/Input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";

type FormValues = {
  email: string;
  name: string;
};

function Brochure() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const methods = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/zapier/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "brochure" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit");
      setStatus("success");
      methods.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden py-10 sm:py-0 px-4 md:px-0">
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

      <div className="absolute inset-0 bg-[#242A3A80]" />

      <div className="relative z-10 max-w-3xl w-full px-4 sm:px-6 md:px-10 text-white text-center py-6 md:py-6">
        <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold">
          Subscribe To Download <br /> Our Brochure
        </h2>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-200">
          Our Brochure will keep you up to date with industry changes, new
          courses, upcoming dates and promotions. To sign up, simply fill in
          your details below:
        </p>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="mt-8 sm:mt-12 space-y-6 text-left bg-white p-6 sm:p-13 rounded-2xl max-w-lg mx-auto"
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

            {status === "success" && (
              <p className="text-sm text-green-600 font-medium">Thank you! You&apos;ve been subscribed.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
            )}

            <Button type="submit" disabled={status === "loading"} className="w-full bg-[#242A3A] h-15 uppercase font-bold text-base">
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}

export default Brochure;
