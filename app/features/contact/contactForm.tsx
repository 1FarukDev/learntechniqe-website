"use client";

import { FormInput } from "@/components/Input";
import { FormTextarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormPrivacyConsent, PRIVACY_CONSENT_FIELD } from "@/components/form-privacy-consent";

type FormValues = {
    first_name: string;
    last_name: string;
    number: string;
    email: string;
    message: string;
    [PRIVACY_CONSENT_FIELD]: boolean;
};

function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const methods = useForm<FormValues>({
        defaultValues: {
            first_name: "",
            last_name: "",
            number: "",
            email: "",
            message: "",
            [PRIVACY_CONSENT_FIELD]: false,
        },
    });

    const onSubmit = async (data: FormValues) => {
        const { [PRIVACY_CONSENT_FIELD]: _consent, ...payload } = data;
        setStatus("loading");
        try {
            const res = await fetch("/api/zapier/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
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
        <section className="bg-[#E0ECED] md:px-0 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start max-w-7xl mx-auto py-10 sm:py-19 px-0 sm:px-6 gap-8 sm:gap-10">
                {/* Left: Office Info */}
                <div className="w-full md:w-[40%] flex flex-col gap-3 sm:gap-4 text-black">
                    <h2 className="font-semibold text-[32px] sm:text-[42px] md:text-[52px] leading-tight">
                        Head Office
                    </h2>
                    <h6 className="font-bold text-base sm:text-xl">
                        Technique Learning Solutions
                    </h6>
                    <p className="font-normal text-sm sm:text-base">
                        Technique Tower Business Park <br className="hidden md:block" /> High Street <br className="hidden md:block" /> Clay Cross{" "}
                        <br className="hidden md:block" /> Chesterfield <br className="hidden md:block" /> Derbyshire <br className="hidden md:block" />
                        S45 9EA
                    </p>
                    <div>
                        <h6 className="font-bold text-sm sm:text-base uppercase">CALL</h6>
                        <h6 className="font-bold text-base">0800 112 3310</h6>
                    </div>
                    <div>
                        <h6 className="font-bold text-sm sm:text-base uppercase">EMAIL</h6>
                        <h6 className="font-bold text-base">info@learntechnique.com</h6>
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

                {/* Right: Contact Form */}
                <div className="w-full md:w-[60%]">
                    <FormProvider {...methods}>
                        <form
                            onSubmit={methods.handleSubmit(onSubmit)}
                            className="space-y-6 text-left bg-white p-6 sm:p-13 rounded-2xl max-w-full mx-auto shadow-sm"
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
                                    placeholder="Enter your phone"
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

                            <FormPrivacyConsent />

                            {status === "success" && (
                                <p className="text-sm text-green-600 font-medium">Thank you! Your message has been sent.</p>
                            )}
                            {status === "error" && (
                                <p className="text-sm text-red-600 font-medium">Something went wrong. Please try again.</p>
                            )}

                            <Button
                                type="submit"
                                disabled={status === "loading"}
                                className="h-14 sm:h-17.25 bg-[#14AE5C] text-white uppercase font-bold text-sm sm:text-base px-8 sm:px-10 hover:bg-[#108a46] transition-colors"
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

export default ContactForm;
