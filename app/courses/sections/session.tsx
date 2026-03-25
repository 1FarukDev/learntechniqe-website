"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import SessionImage from "@/app/assets/png/session.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

function Session() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const [first, ...rest] = form.name.trim().split(" ");
      const res = await fetch("/api/zapier/book-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first || form.name,
          last_name: rest.join(" ") || "",
          email: form.email,
          number: form.phone,
          company: form.company,
          message: form.message,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative w-full min-h-170 flex items-center justify-center overflow-hidden">
        <Image
          src={SessionImage}
          alt="Training session background"
          fill
          className="object-cover object-center z-0"
        />

        <div className="absolute inset-0 z-10 bg-linear-to-br from-[rgba(0,140,140,0.55)] via-[rgba(0,100,110,0.70)] to-[rgba(0,60,80,0.88)]" />

        <div className="relative z-20 flex flex-col items-center text-center text-white px-6 max-w-2xl mx-auto gap-6">
          <h2 className="font-outfit font-semibold text-4xl md:text-5xl leading-tight">
            Want To Do The Training <br className="hidden md:block" />
            At Your Premises?
          </h2>

          <p className="text-white/85 font-outfit text-sm md:text-base leading-7 font-normal">
            We bring the full training experience to your location, saving you
            time while{" "}
            <br className="hidden md:block" /> delivering hands-on,
            results-driven sessions built around your environment and{" "}
            <br className="hidden md:block" /> goals, and available for direct
            staff training when needed.
          </p>

          <div className="mx-4 w-full">
            <Button
              onClick={() => setDrawerOpen(true)}
              className="mt-4 h-17.25 w-full bg-[#F5A623] hover:bg-[#e09410] text-white font-outfit font-semibold uppercase tracking-widest text-sm px-16 py-6 rounded-md"
            >
              Book Session
            </Button>
          </div>
        </div>
      </section>

      {drawerOpen &&
        createPortal(
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setDrawerOpen(false)}
            />
            <div
              className="fixed top-0 right-0 z-[70] w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
              style={{ animation: "slideInRight 250ms ease forwards" }}
            >
              <style>{`
                @keyframes slideInRight {
                  from { transform: translateX(100%); }
                  to   { transform: translateX(0); }
                }
              `}</style>

              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
                <h3 className="font-semibold text-lg text-gray-900">
                  Book a Session
                </h3>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <p className="text-sm text-gray-500 mb-6">
                  Fill in your details and we&apos;ll get back to you to arrange
                  training at your premises.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="session-name"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-name"
                      type="text"
                      placeholder="Enter your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-email"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-phone"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="session-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      required
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-company"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Company / Organisation
                    </label>
                    <Input
                      id="session-company"
                      type="text"
                      placeholder="Enter your company name"
                      value={form.company}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, company: e.target.value }))
                      }
                      className="bg-gray-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="session-message"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="session-message"
                      rows={3}
                      placeholder="Tell us about your training needs..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#016068] resize-none"
                    />
                  </div>

                  {status === "success" && (
                    <p className="text-sm text-green-600 font-medium">
                      Thank you! We&apos;ll be in touch soon to arrange your
                      session.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-red-600 font-medium">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
                  >
                    {status === "loading" ? "Sending..." : "Book Now"}
                  </Button>
                </form>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

export default Session;
