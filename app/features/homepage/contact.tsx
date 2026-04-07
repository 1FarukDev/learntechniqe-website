"use client";

import { FormInput } from "@/components/Input";
import { FormTextarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormValues = {
  first_name: string;
  last_name: string;
  number: string;
  email: string;
  message: string;
};

function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const methods = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      number: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <section id="contact-section" className="bg-[#E0ECED] md:px-0 px-4 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto py-10 sm:py-19 px-0 sm:px-6 gap-8 sm:gap-10">
        <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4">
          <h1 className="text-black font-semibold text-[32px] sm:text-[42px] md:text-[52px] leading-tight">
            Got Questions? <br className="hidden md:block" /> Get In Touch
          </h1>
          <h6 className="text-black font-bold text-base sm:text-xl">
            Technique Learning Solutions
          </h6>
          <p className="text-black font-normal text-sm sm:text-base">
            Technique Tower Business Park <br className="hidden md:block" /> High Street <br className="hidden md:block" /> Clay Cross{" "}
            <br className="hidden md:block" /> Chesterfield <br className="hidden md:block" /> Derbyshire <br className="hidden md:block" />
            S45 9EA
          </p>
          <div>
            <h6 className="font-bold text-sm sm:text-base">CALL</h6>
            <h6 className="font-bold text-base">0800 112 3310</h6>
          </div>
          <div>
            <h6 className="font-bold text-sm sm:text-base">EMAIL</h6>
            <h6 className="font-bold text-base"> info@learntechnique.com </h6>
          </div>

          <div className="flex gap-4">
            <Link href="https://www.facebook.com/LearnTechnique/" target="_blank" rel="noopener noreferrer">
              <Icon
                icon="ic:baseline-facebook"
                width="40"
                height="40"
                className="text-[#333C54]"
              />
            </Link>
            <Link href="https://www.instagram.com/learntechnique/" target="_blank" rel="noopener noreferrer">
              <Icon
                icon="mage:instagram-circle"
                width="40"
                height="40"
                className="text-[#333C54]"
              />
            </Link>
            <Link href="https://www.youtube.com/@LearnTechnique" target="_blank" rel="noopener noreferrer">
              <Icon
                icon="lineicons:youtube-music"
                width="40"
                height="40"
                className="text-[#333C54]"
              />
            </Link>
            <Link href="https://uk.linkedin.com/company/technique-learning-solutions" target="_blank" rel="noopener noreferrer">
              <Icon
                icon="entypo-social:linkedin-with-circle"
                width="40"
                height="40"
                className="text-[#333C54]"
              />
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[60%]">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="mt-8 sm:mt-12 space-y-6 text-left bg-white p-6 sm:p-13 rounded-2xl max-w-full mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <FormInput
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your first name"
                  rules={{ required: "First name is required" }}
                />
                <FormInput
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                  rules={{ required: "Last name is required" }}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <FormInput
                  name="number"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  rules={{ required: "Phone number is required" }}
                />
                <FormInput
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  }}
                />
              </div>

              <FormTextarea
                name="message"
                label="Message"
                placeholder="Enter your message"
                rules={{ required: "Message is required" }}
              />

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">Thank you! Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
              )}

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-14 sm:h-17.25 bg-[#242A3A] text-white uppercase font-bold text-sm sm:text-base"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

export default Contact;
