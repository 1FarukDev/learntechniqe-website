"use client";

import { FormInput } from "@/components/Input";
import { FormTextarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

function Contact() {
  type FormValues = {
    first_name: string;
    last_name: string;
    number: string;
    email: string;
    message: string;
  };

  const methods = useForm<FormValues>({
    defaultValues: {
      first_name: "",
      last_name: "",
      number: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <section className="bg-[#E0ECED] md:px-0 px-4">
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
            <h6 className="font-bold text-base">info@technique.com</h6>
          </div>

          <div className="flex gap-4">
            <Icon
              icon="ic:baseline-facebook"
              width="40"
              height="40"
              className="text-[#333C54]"
            />
            <Icon
              icon="mage:instagram-circle"
              width="40"
              height="40"
              className="text-[#333C54]"
            />
            <Icon
              icon="lineicons:youtube-music"
              width="40"
              height="40"
              className="text-[#333C54]"
            />
            <Icon
              icon="entypo-social:linkedin-with-circle"
              width="40"
              height="40"
              className="text-[#333C54]"
            />
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
                />
                <FormInput
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <FormInput
                  name="number"
                  label="Phone Number"
                  placeholder="Enter your phone number"
                />
                <FormInput
                  name="email"
                  label="Email Address"
                  placeholder="Enter your email"
                />
              </div>

              <FormTextarea
                name="message"
                label="Message"
                placeholder="Enter your message"
              />

              <Button
                type="submit"
                className="w-full bg-[#242A3A] text-white! h-15 uppercase font-bold text-basae"
              >
                Send Message
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </section>
  );
}

export default Contact;
