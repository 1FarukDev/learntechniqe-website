"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export interface CalculatorCourse {
  id: string;
  name: string;
  priceIncVat: number;
  paymentPlanAvailable: boolean;
}

export interface PlatinumUpgrade {
  name: string;
  priceIncVat: number;
  description: string;
}

interface PathwaysCalculatorStickyProps {
  courses: CalculatorCourse[];
  platinumUpgrade: PlatinumUpgrade;
}

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(n);

export function PathwaysCalculatorSticky({
  courses,
  platinumUpgrade,
}: PathwaysCalculatorStickyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [selectedCourseIds, setSelectedCourseIds] = useState<Set<string>>(new Set());
  const [includePlatinum, setIncludePlatinum] = useState(false);
  const [months, setMonths] = useState(10);
  const [showEnquireForm, setShowEnquireForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    terms: false,
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleCourse = (id: string) => {
    setSelectedCourseIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedCourses = useMemo(
    () => courses.filter((c) => selectedCourseIds.has(c.id)),
    [courses, selectedCourseIds]
  );

  const hasPaymentPlanCourse = selectedCourses.some((c) => c.paymentPlanAvailable);
  const coursesTotal = selectedCourses.reduce((sum, c) => sum + c.priceIncVat, 0);
  const platinumTotal = includePlatinum ? platinumUpgrade.priceIncVat : 0;
  const subtotal = coursesTotal + platinumTotal;

  const instalmentPrice =
    hasPaymentPlanCourse && months > 1 ? subtotal / months : subtotal;

  const handleEnquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) return;
    setFormStatus("loading");
    try {
      const [first, ...rest] = formData.name.trim().split(" ");
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first || formData.name,
          last_name: rest.join(" ") || "",
          email: formData.email,
          number: formData.phone,
          message: `Pathway Calculator Enquiry - Courses: ${selectedCourses.map((c) => c.name).join(", ")} | Months: ${months} | Total: ${formatPrice(subtotal)}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setFormStatus("success");
      setFormData({ name: "", email: "", phone: "", terms: false });
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <>
      {/* Sticky Bottom Bar - only visible after scrolling */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#016068] text-white shadow-lg md:px-0 px-4 transition-transform duration-300 ease-out ${
          showStickyBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm sm:text-base font-medium text-center sm:text-left">
            Calculate Technique Pathway Monthly Repayments - 0% interest
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#E99E20] hover:bg-[#d88e10]"
          >
            Open Calculator
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - slides in from right on all screen sizes */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-[420px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h3 className="font-semibold text-lg">Pathway Calculator</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <CalculatorContent
            courses={courses}
            platinumUpgrade={platinumUpgrade}
            selectedCourseIds={selectedCourseIds}
            toggleCourse={toggleCourse}
            includePlatinum={includePlatinum}
            setIncludePlatinum={setIncludePlatinum}
            months={months}
            setMonths={setMonths}
            hasPaymentPlanCourse={hasPaymentPlanCourse}
            selectedCourses={selectedCourses}
            coursesTotal={coursesTotal}
            subtotal={subtotal}
            instalmentPrice={instalmentPrice}
            showEnquireForm={showEnquireForm}
            setShowEnquireForm={setShowEnquireForm}
            formData={formData}
            setFormData={setFormData}
            formStatus={formStatus}
            handleEnquireSubmit={handleEnquireSubmit}
          />
        </div>
      </div>
    </>
  );
}

function CalculatorContent({
  courses,
  platinumUpgrade,
  selectedCourseIds,
  toggleCourse,
  includePlatinum,
  setIncludePlatinum,
  months,
  setMonths,
  hasPaymentPlanCourse,
  selectedCourses,
  coursesTotal,
  subtotal,
  instalmentPrice,
  showEnquireForm,
  setShowEnquireForm,
  formData,
  setFormData,
  formStatus,
  handleEnquireSubmit,
}: {
  courses: CalculatorCourse[];
  platinumUpgrade: PlatinumUpgrade;
  selectedCourseIds: Set<string>;
  toggleCourse: (id: string) => void;
  includePlatinum: boolean;
  setIncludePlatinum: (v: boolean) => void;
  months: number;
  setMonths: (v: number) => void;
  hasPaymentPlanCourse: boolean;
  selectedCourses: CalculatorCourse[];
  coursesTotal: number;
  subtotal: number;
  instalmentPrice: number;
  showEnquireForm: boolean;
  setShowEnquireForm: (v: boolean) => void;
  formData: { name: string; email: string; phone: string; terms: boolean };
  setFormData: React.Dispatch<
    React.SetStateAction<{ name: string; email: string; phone: string; terms: boolean }>
  >;
  formStatus: string;
  handleEnquireSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-[#016068] mb-1">Calculate Your Pathway Cost</h4>
        <p className="text-sm text-gray-600">Build your Pathway package to get your cost estimate</p>
      </div>

      <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg">
        Payment options NOT available for the City & Guilds BS:7671 18th Edition and/or the City
        & Guilds 2391-52 Inspection and Testing as stand alone courses
      </p>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Courses *
        </label>
        <p className="text-xs text-gray-500 mb-2">Select the courses to add to your package</p>
        <div className="space-y-2 max-h-72 overflow-y-auto border rounded-lg p-2">
          {courses.map((c) => (
            <label
              key={c.id}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCourseIds.has(c.id)}
                onChange={() => toggleCourse(c.id)}
                className="rounded border-gray-300"
              />
              <span className="text-sm flex-1">{c.name}</span>
              <span className="text-sm font-semibold text-[#016068]">
                {formatPrice(c.priceIncVat)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={includePlatinum}
          onChange={(e) => setIncludePlatinum(e.target.checked)}
          className="rounded border-gray-300"
        />
        <span className="text-sm">
          {platinumUpgrade.name} – {formatPrice(platinumUpgrade.priceIncVat)}
        </span>
      </label>

      {hasPaymentPlanCourse && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Payment Option
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Select the number of installments/months you want to make payment
          </p>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="24"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value) || 1)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#016068]"
            />
            <span className="text-sm font-semibold w-12">{months} month{months !== 1 ? "s" : ""}</span>
          </div>
        </div>
      )}

      <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-2">
        <h5 className="font-semibold text-gray-800">Payment Plan Summary</h5>
        <div className="flex justify-between text-sm">
          <span>Courses</span>
          <span>{formatPrice(coursesTotal)}</span>
        </div>
        {includePlatinum && (
          <div className="flex justify-between text-sm">
            <span>{platinumUpgrade.name}</span>
            <span>{formatPrice(platinumUpgrade.priceIncVat)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span>Payment Option</span>
          <span>
            {hasPaymentPlanCourse && months > 1
              ? `${months} month${months !== 1 ? "s" : ""}`
              : "Pay in full"}
          </span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-2 border-t">
          <span>{hasPaymentPlanCourse && months > 1 ? "Instalment Price + VAT" : "Total + VAT"}</span>
          <span className="text-[#016068]">{formatPrice(instalmentPrice)}</span>
        </div>
        <div className="flex justify-between text-sm pt-1">
          <span>Total</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
        </div>
      </div>

      {!showEnquireForm ? (
        <Button
          onClick={() => setShowEnquireForm(true)}
          className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]"
        >
          Enquire Now
        </Button>
      ) : (
        <div className="border rounded-lg p-4 space-y-4">
          <button
            onClick={() => setShowEnquireForm(false)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <ChevronUp size={16} />
            Collapse form
          </button>
          <form onSubmit={handleEnquireSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Name and Surname *</label>
              <Input
                placeholder="Type your name"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email Address *</label>
              <Input
                type="email"
                placeholder="Type your email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phone Number *</label>
              <Input
                type="tel"
                placeholder="Type your phone"
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                required
              />
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData((p) => ({ ...p, terms: e.target.checked }))}
                required
                className="mt-1 rounded border-gray-300"
              />
              <span className="text-sm">
                By clicking this box, I agree to your{" "}
                <Link href="/terms-and-conditions" className="text-[#016068] underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {formStatus === "success" && (
              <p className="text-sm text-green-600">Thank you! We&apos;ll be in touch soon.</p>
            )}
            {formStatus === "error" && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
            <Button
              type="submit"
              disabled={formStatus === "loading" || !formData.terms}
              className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]"
            >
              {formStatus === "loading" ? "Sending..." : "Submit Enquiry"}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
