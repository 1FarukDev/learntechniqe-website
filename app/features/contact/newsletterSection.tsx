"use client";

import { FormInput } from "@/components/Input";
import { Button } from "@/components/ui/button";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import BackgroundImage from "@/app/assets/png/881da83f746febd0519b1816f0e94e64c9dbca31.jpg";

type FormValues = {
    name: string;
    email: string;
    course: string;
};

function NewsletterSection() {
    const methods = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            course: "",
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden py-10 sm:py-0">
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
                        />

                        <FormInput
                            name="email"
                            placeholder="Enter your email address"
                            type="email"
                        />

                        <select
                            {...methods.register("course")}
                            className="w-full h-12 px-4 rounded-lg bg-white border border-gray-200 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#01656B]/30"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                What courses are you interested in?
                            </option>
                            <option value="electrical">Electrical Courses</option>
                            <option value="plumbing">Plumbing Courses</option>
                            <option value="hvac">HVAC / Air Conditioning</option>
                            <option value="smart-energy">Smart Energy</option>
                            <option value="testing">Testing & Inspection</option>
                        </select>

                        <Button
                            type="submit"
                            className="w-full bg-[#242A3A] text-white! h-13 uppercase font-bold text-sm"
                        >
                            Subscribe
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </section>
    );
}

export default NewsletterSection;
