"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import type { Pathway } from "./PathwaysComparisonTable";

interface PaymentCalculatorProps {
  pathways: Pathway[];
}

export function PaymentCalculator({ pathways }: PaymentCalculatorProps) {
  const [selectedHref, setSelectedHref] = useState<string>(pathways[0]?.href ?? "");
  const [customMonths, setCustomMonths] = useState<number>(10);

  const selectedPathway = useMemo(
    () => pathways.find((p) => p.href === selectedHref),
    [pathways, selectedHref]
  );

  const parsePrice = (val: string | number | undefined): number => {
    if (!val) return 0
    if (typeof val === 'number') return val
    return parseFloat(val.replace(/[^0-9.]/g, '')) || 0
  }

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(n);

  const priceIncVat = parsePrice(selectedPathway?.pathway?.priceIncVat)
  const deposit = parsePrice(selectedPathway?.pathway?.deposit)

  const customCalculation = useMemo(() => {
    if (!selectedPathway || selectedPathway.pathway?.paymentPlan !== 'Yes') return null
    const remaining = priceIncVat - deposit
    const monthly = remaining / customMonths
    return { deposit, monthly, months: customMonths, total: priceIncVat }
  }, [selectedPathway, customMonths, priceIncVat, deposit])

  return (
    <section className="bg-white py-12 sm:py-20 md:px-0 px-4 border-t border-gray-200">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#016068] mb-2 text-center">
          Payment Calculator
        </h2>
        <p className="text-gray-600 text-center mb-8">
          See how much you&apos;ll pay with our flexible payment plans
        </p>

        <div className="bg-[#F5F5F5] rounded-xl p-6 sm:p-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select Pathway
          </label>
          <select
            value={selectedHref}
            onChange={(e) => setSelectedHref(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 mb-6 focus:ring-2 focus:ring-[#016068] focus:border-[#016068]"
          >
            {pathways.map((p, i) => (
              <option key={p.href ?? i} value={p.href}>
                {p.pathway?.title} – {formatPrice(parsePrice(p.pathway?.priceIncVat))}
              </option>
            ))}
          </select>

          {selectedPathway && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total (inc VAT)</span>
                <span className="font-semibold text-[#016068]">
                  {formatPrice(priceIncVat)}
                </span>
              </div>

              {selectedPathway.pathway?.paymentPlan === 'Yes' ? (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of monthly instalments
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="24"
                      value={customMonths}
                      onChange={(e) =>
                        setCustomMonths(Math.min(24, Math.max(3, parseInt(e.target.value) || 3)))
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-[#016068] focus:border-[#016068]"
                    />
                  </div>

                  {customCalculation && (
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deposit</span>
                        <span className="font-semibold">{formatPrice(customCalculation.deposit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {customCalculation.months} × Monthly
                        </span>
                        <span className="font-semibold">
                          {formatPrice(customCalculation.monthly)}/mo
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-[#016068]">
                          {formatPrice(customCalculation.total)}
                        </span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-600">Pay in full at booking</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}