"use client";

import { FormInput } from "@/components/Input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";

type FormValues = {
    name: string;
    email: string;
};

function NewsletterSection() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const methods = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/zapier/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, source: "newsletter" }),
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
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden py-10 sm:pt-20 sm:pb-30">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${BackgroundImage.src})` }}
            />

            <div className="absolute inset-0 bg-[#01656Bdd]" />

            <div className="relative z-10 max-w-xl w-full px-4 sm:px-6 md:px-10 text-white text-center">
                <h2 className="text-[28px] sm:text-4xl md:text-5xl font-semibold">
                    Subscribe to our Newsletter
                </h2>

                <p className="mt-4 text-xs sm:text-sm md:text-base text-white/80">
                    We won&apos;t spam you more. Unsubscribe at any time.
                </p>

                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="mt-8 sm:mt-12 space-y-4 text-left bg-white p-6 sm:p-10 rounded-2xl max-w-lg mx-auto"
                    >
                        <FormInput
                            name="name"
                            placeholder="Enter your full name"
                            rules={{ required: "Name is required" }}
                        />

                        <FormInput
                            name="email"
                            placeholder="Enter your email address"
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
                        <Button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-[#242A3A] text-white! h-13 uppercase font-bold text-sm"
                        >
                            {status === "loading" ? "Subscribing..." : "Subscribe"}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
}

export default NewsletterSection;
