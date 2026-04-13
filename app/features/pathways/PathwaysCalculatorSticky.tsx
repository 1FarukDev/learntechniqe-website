"use client";

import React, { useState, useMemo, useEffect } from "react";
import { X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export interface PathwayCalcData {
  title: string;
  slug: string;
  priceIncVat: number | string;
  deposit: number | string;
  paymentPlan: string;
  monthlyInstalment: number | string;
  instalments: number | string;
}

interface PathwaysCalculatorStickyProps {
  pathways: PathwayCalcData[];
  initialSlug?: string;
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

/** Temporary: sticky bar (“Calculate Technique Pathway… / Open Calculator”). */
const SHOW_CALCULATOR_STICKY_HEADER = false;

/** Temporary: price summary inside drawer when “Enquire About This Pathway” is open. */
const SHOW_CALCULATOR_DRAWER_ENQUIRY_SUMMARY = false;

export function PathwaysCalculatorSticky({
  pathways,
  initialSlug,
}: PathwaysCalculatorStickyProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [enquiryData, setEnquiryData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    terms: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const resolvedInitial =
    initialSlug && pathways.some((p) => p.slug === initialSlug)
      ? initialSlug
      : pathways[0]?.slug ?? "";
  const [selectedSlug, setSelectedSlug] = useState<string>(resolvedInitial);
  const [customMonths, setCustomMonths] = useState<number>(10);

  const selectedPathway = useMemo(
    () => pathways.find((p) => p.slug === selectedSlug),
    [pathways, selectedSlug],
  );

  const totalPrice = parsePrice(selectedPathway?.priceIncVat);
  const depositAmount = parsePrice(selectedPathway?.deposit);
  const paymentPlanRaw = (selectedPathway?.paymentPlan ?? "").toString().trim();
  const hasPaymentPlan =
    totalPrice > 0 &&
    paymentPlanRaw.length > 0 &&
    paymentPlanRaw.toLowerCase() !== "no";
  const paymentPlanLabel = paymentPlanRaw === "Yes" ? null : paymentPlanRaw;

  const calculation = useMemo(() => {
    if (!hasPaymentPlan || totalPrice <= 0) return null;
    const remaining = totalPrice - depositAmount;
    const monthly = remaining / customMonths;
    return {
      deposit: depositAmount,
      monthly,
      months: customMonths,
      total: totalPrice,
      remaining,
    };
  }, [hasPaymentPlan, totalPrice, depositAmount, customMonths]);

  useEffect(() => {
    const p = pathways.find((x) => x.slug === selectedSlug);
    if (p) {
      const def = parsePrice(p.instalments) || 10;
      setCustomMonths(def);
    }
  }, [selectedSlug, pathways]);

  const handleEnquireNow = () => {
    setShowEnquiryForm(true);
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryData.terms || !selectedPathway) return;
    setEnquiryStatus("loading");

    const messageLines = [
      `Pathway Enquiry: ${selectedPathway.title}`,
      totalPrice > 0 ? `Price: ${formatPrice(totalPrice)}` : "",
      calculation
        ? `Deposit: ${formatPrice(calculation.deposit)} | ${calculation.months} x ${formatPrice(calculation.monthly)}/mo`
        : "",
    ]
      .filter(Boolean)
      .join(" | ");

    try {
      const res = await fetch("/api/zapier/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "pathway_calculator_enquiry",
          first_name: enquiryData.first_name,
          last_name: enquiryData.last_name,
          email: enquiryData.email,
          number: enquiryData.phone,
          message: messageLines,
          pathway_name: selectedPathway.title,
          pathway_url: `/pathways/${selectedPathway.slug}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setEnquiryStatus("success");
      setEnquiryData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        terms: false,
      });
    } catch {
      setEnquiryStatus("error");
    }
  };

  return (
    <>
      {SHOW_CALCULATOR_STICKY_HEADER && (
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 bg-[#016068] text-white shadow-lg md:px-0 px-4 transition-transform duration-300 ease-out ${
            showStickyBar ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="max-w-7xl mx-auto py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm sm:text-base font-medium text-center sm:text-left">
              Calculate Technique Pathway Monthly Repayments – 0% Interest
            </p>
            <Button
              onClick={() => setIsOpen(true)}
              className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#E99E20] hover:bg-[#d88e10]"
            >
              Open Calculator
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => {
            setIsOpen(false);
            setShowEnquiryForm(false);
          }}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-[440px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h3 className="font-semibold text-lg">
            {showEnquiryForm
              ? "Enquire About This Pathway"
              : "Pathway Payment Calculator"}
          </h3>
          <button
            onClick={() => {
              if (showEnquiryForm) {
                setShowEnquiryForm(false);
              } else {
                setIsOpen(false);
              }
            }}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label={showEnquiryForm ? "Back" : "Close"}
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {showEnquiryForm ? (
            /* ── Enquiry form inside the drawer ── */
            <div className="space-y-5">
              {SHOW_CALCULATOR_DRAWER_ENQUIRY_SUMMARY && selectedPathway && (
                <div className="bg-[#016068]/5 border border-[#016068]/15 rounded-xl p-4 space-y-2">
                  <p className="text-sm font-bold text-[#016068]">
                    {selectedPathway.title}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Price</span>
                    <span className="font-semibold text-[#016068]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  {calculation && (
                    <>
                      {calculation.deposit > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Deposit</span>
                          <span className="font-semibold">
                            {formatPrice(calculation.deposit)}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {calculation.months} × Monthly
                        </span>
                        <span className="font-semibold">
                          {formatPrice(calculation.monthly)}/mo
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}

              <p className="text-sm text-gray-500">
                Fill in your details and our team will be in touch about this
                pathway.
              </p>

              <form onSubmit={handleEnquirySubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="First name"
                      value={enquiryData.first_name}
                      onChange={(e) =>
                        setEnquiryData((p) => ({
                          ...p,
                          first_name: e.target.value,
                        }))
                      }
                      required
                      className="bg-white h-11"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      placeholder="Last name"
                      value={enquiryData.last_name}
                      onChange={(e) =>
                        setEnquiryData((p) => ({
                          ...p,
                          last_name: e.target.value,
                        }))
                      }
                      required
                      className="bg-white h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={enquiryData.phone}
                    onChange={(e) =>
                      setEnquiryData((p) => ({ ...p, phone: e.target.value }))
                    }
                    required
                    className="bg-white h-11"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={enquiryData.email}
                    onChange={(e) =>
                      setEnquiryData((p) => ({ ...p, email: e.target.value }))
                    }
                    required
                    className="bg-white h-11"
                  />
                </div>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enquiryData.terms}
                    onChange={(e) =>
                      setEnquiryData((p) => ({
                        ...p,
                        terms: e.target.checked,
                      }))
                    }
                    required
                    className="mt-1 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    By clicking this box, I agree to your{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-[#016068] underline"
                    >
                      privacy policy
                    </Link>
                  </span>
                </label>

                {enquiryStatus === "success" && (
                  <p className="text-sm text-green-600 font-medium">
                    Thank you! Our team will be in touch shortly.
                  </p>
                )}
                {enquiryStatus === "error" && (
                  <p className="text-sm text-red-600 font-medium">
                    Something went wrong. Please try again.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={
                    enquiryStatus === "loading" || !enquiryData.terms
                  }
                  className="text-white rounded text-sm font-bold h-11 w-full bg-[#016068] hover:bg-[#014d54]"
                >
                  {enquiryStatus === "loading"
                    ? "Sending..."
                    : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          ) : (
            /* ── Calculator view ── */
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#016068] mb-1">
                  Calculate Your Pathway Cost
                </h4>
                <p className="text-sm text-gray-600">
                  Choose a pathway below to see your payment breakdown
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Pathway
                </p>
                <div
                  className="flex flex-col gap-2"
                  role="listbox"
                  aria-label="Select pathway"
                >
                  {pathways.map((p) => {
                    const selected = p.slug === selectedSlug;
                    const pTotal = parsePrice(p.priceIncVat);
                    return (
                      <button
                        key={p.slug}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => setSelectedSlug(p.slug)}
                        className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all ${
                          selected
                            ? "border-[#016068] bg-[#016068]/5 shadow-sm ring-1 ring-[#016068]/20"
                            : "border-gray-200 bg-white hover:border-[#016068]/40 hover:bg-gray-50/80"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`text-sm font-semibold leading-snug ${
                              selected ? "text-[#016068]" : "text-gray-900"
                            }`}
                          >
                            {p.title}
                          </span>
                          {selected && (
                            <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#016068] text-white">
                              <Check
                                className="h-3.5 w-3.5"
                                strokeWidth={3}
                              />
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm font-bold text-[#016068]">
                          {formatPrice(pTotal)}
                          <span className="font-normal text-gray-500">
                            {" "}
                            inc VAT
                          </span>
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedPathway && totalPrice > 0 && (
                <>
                  <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Total Price 
                      </span>
                      <span className="font-semibold text-[#016068]">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>

                  {hasPaymentPlan ? (
                    <>
                      {paymentPlanLabel && (
                        <div className="flex items-center gap-2 bg-[#016068]/5 border border-[#016068]/15 rounded-lg px-4 py-2.5">
                          <span className="text-xs font-semibold text-[#016068]">
                            Payment via {paymentPlanLabel}
                          </span>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Monthly Instalments
                        </label>
                        <p className="text-xs text-gray-500 mb-3">
                          Adjust the slider to see different payment options
                        </p>
                        <div className="flex items-center gap-4">
                          <input
                            type="range"
                            min="3"
                            max="24"
                            value={customMonths}
                            onChange={(e) =>
                              setCustomMonths(
                                parseInt(e.target.value) || 3,
                              )
                            }
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#016068]"
                          />
                          <span className="text-sm font-semibold w-20 text-right">
                            {customMonths} month
                            {customMonths !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>

                      {calculation && (
                        <div className="bg-[#F5F5F5] rounded-lg p-4 space-y-3">
                          <h5 className="font-semibold text-gray-800">
                            Payment Plan Summary
                          </h5>
                          {calculation.deposit > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Deposit</span>
                              <span className="font-semibold">
                                {formatPrice(calculation.deposit)}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {calculation.months} × Monthly Instalment
                            </span>
                            <span className="font-semibold">
                              {formatPrice(calculation.monthly)}/mo
                            </span>
                          </div>
                          <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                            <span>Total</span>
                            <span className="text-[#016068]">
                              {formatPrice(calculation.total)}
                            </span>
                          </div>
                          <p className="text-xs text-[#016068] font-medium">
                            0% Interest
                            {paymentPlanLabel
                              ? ` via ${paymentPlanLabel}`
                              : ""}{" "}
                            – No hidden fees
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="bg-amber-50 p-3 rounded-lg">
                      <p className="text-sm text-amber-700">
                        Payment plans are not available for this pathway.
                        Full payment is required at booking.
                      </p>
                    </div>
                  )}
                </>
              )}

              <Button
                onClick={handleEnquireNow}
                disabled={!selectedPathway || totalPrice <= 0}
                className="text-white rounded text-sm px-8 font-bold h-11 w-full bg-[#016068] hover:bg-[#014d54]"
              >
                Enquire Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
