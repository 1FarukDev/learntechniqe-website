"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PathwayEnquiryFormProps {
  pathwayName: string;
  pathwaySlug: string;
  price?: string;
  priceIncVat?: string | number;
  deposit?: string | number;
  paymentPlan?: string;
  monthlyInstalment?: string | number;
  instalments?: string | number;
}

const parsePrice = (val: string | number | undefined): number => {
  if (!val) return 0;
  if (typeof val === "number") return val;
  return parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
};

const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
  }).format(n);

/** Temporary: re-enable to show grey price block under “Enquire About This Pathway”. */
const SHOW_ENQUIRY_PRICE_SUMMARY = false;

export function PathwayEnquiryForm({
  pathwayName,
  pathwaySlug,
  price,
  priceIncVat,
  deposit,
  paymentPlan,
  monthlyInstalment,
  instalments,
}: PathwayEnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    terms: false,
  });

  const totalPrice = parsePrice(priceIncVat) || parsePrice(price);
  const depositAmount = parsePrice(deposit);
  const paymentPlanRaw = (paymentPlan ?? "").toString().trim();
  const hasPaymentPlan =
    totalPrice > 0 &&
    paymentPlanRaw.length > 0 &&
    paymentPlanRaw.toLowerCase() !== "no";
  const paymentPlanLabel = paymentPlanRaw === "Yes" ? null : paymentPlanRaw;
  const defaultInstalments = parsePrice(instalments) || 10;
  const defaultMonthly = parsePrice(monthlyInstalment);

  const paymentSummary = useMemo(() => {
    if (!hasPaymentPlan) return null;
    const monthly = defaultMonthly > 0 ? defaultMonthly : (totalPrice - depositAmount) / defaultInstalments;
    return {
      deposit: depositAmount,
      monthly,
      months: defaultInstalments,
      total: totalPrice,
    };
  }, [hasPaymentPlan, totalPrice, depositAmount, defaultInstalments, defaultMonthly]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms) return;
    setStatus("loading");

    const messageLines = [
      `Pathway Enquiry: ${pathwayName}`,
      totalPrice > 0 ? `Price: ${formatPrice(totalPrice)}` : "",
      paymentSummary ? `Deposit: ${formatPrice(paymentSummary.deposit)} | ${paymentSummary.months} x ${formatPrice(paymentSummary.monthly)}/mo` : "",
    ].filter(Boolean).join(" | ");

    try {
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "pathway_enquiry",
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          number: formData.phone,
          message: messageLines,
          pathway_name: pathwayName,
          pathway_url: `/pathways/${pathwaySlug}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setStatus("success");
      setFormData({ first_name: "", last_name: "", email: "", phone: "", terms: false });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white scroll-mt-28" id="enquirySection">
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl sm:text-4xl text-black mb-3 text-center">
            Enquire About This Pathway
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm sm:text-base">
            Interested in <span className="font-semibold text-gray-700">{pathwayName}</span>?
            Fill in your details and our team will be in touch.
          </p>

          {SHOW_ENQUIRY_PRICE_SUMMARY && totalPrice > 0 && (
            <div className="bg-[#F5F5F5] rounded-xl p-5 sm:p-6 mb-8 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pathway Price (+ VAT)</span>
                <span className="font-semibold text-[#016068]">{formatPrice(totalPrice)}</span>
              </div>
              {paymentSummary && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Deposit</span>
                    <span className="font-semibold">{formatPrice(paymentSummary.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{paymentSummary.months} Monthly Instalments</span>
                    <span className="font-semibold">{formatPrice(paymentSummary.monthly)}/mo</span>
                  </div>
                  <p className="text-xs text-[#016068] font-medium pt-1">
                    0% Interest Payment Plan{paymentPlanLabel ? ` via ${paymentPlanLabel}` : ""} Available
                  </p>
                </>
              )}
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pathway-enquiry-first" className="block text-sm font-semibold text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="pathway-enquiry-first"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={(e) => setFormData((p) => ({ ...p, first_name: e.target.value }))}
                    required
                    className="bg-white h-12"
                  />
                </div>
                <div>
                  <label htmlFor="pathway-enquiry-last" className="block text-sm font-semibold text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="pathway-enquiry-last"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={(e) => setFormData((p) => ({ ...p, last_name: e.target.value }))}
                    required
                    className="bg-white h-12"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pathway-enquiry-phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Input
                  id="pathway-enquiry-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  required
                  className="bg-white h-12"
                />
              </div>
              <div>
                <label htmlFor="pathway-enquiry-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="pathway-enquiry-email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  required
                  className="bg-white h-12"
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
                <span className="text-sm text-gray-600">
                  By clicking this box, I agree to your{" "}
                  <Link href="/terms-and-conditions" className="text-[#016068] underline">
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">
                  Thank you! Our team will be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "loading" || !formData.terms}
                className="w-full h-12 uppercase bg-[#016068] hover:bg-[#014d54] text-white font-semibold"
              >
                {status === "loading" ? "Sending..." : "Submit Enquiry"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
