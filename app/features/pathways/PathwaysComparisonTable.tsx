"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface Pathway {
  id: string;
  image?: string;
  title: string;
  badge: string;
  description: string;
  href: string;
  external?: boolean;
  eligibility: string[];
  attendance: string;
  exams: string;
  duration: string;
  location: string;
  priceExVat: number;
  priceIncVat: number;
  paymentPlan: boolean;
  deposit: number;
  monthlyInstalment: number;
  instalments: number;
}

interface PathwaysComparisonTableProps {
  pathways: Pathway[];
  title: string;
  description: string;
  disclaimer: string;
}

export function PathwaysComparisonTable({
  pathways,
  title,
  description,
  disclaimer,
}: PathwaysComparisonTableProps) {
  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(n);

  return (
    <section id="pathways-table" className="bg-white md:px-0 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#016068] mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="bg-[#016068] text-white">
                <th className="text-left p-3 md:p-4 font-semibold w-32">Criteria</th>
                {pathways.map((p) => (
                  <th key={p.id} className="text-left p-3 md:p-4 font-semibold min-w-[140px]">
                    <span className="inline-block text-xs text-[#E99E20] font-medium mb-1 px-2 py-0.5 rounded bg-white/10">{p.badge}</span>
                    <br />
                    {p.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Eligibility</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4">
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      {p.eligibility.slice(0, 2).map((e, i) => (
                        <li key={i}>{e}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Attendance</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4 text-xs">{p.attendance}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Duration</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4 text-xs">{p.duration}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Location</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4 text-xs">{p.location}</td>
                ))}
              </tr>
              <tr className="border-b border-gray-200 bg-gray-50">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Price (Inc VAT)</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4 font-semibold text-[#016068]">
                    {formatPrice(p.priceIncVat)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3 md:p-4 font-semibold text-gray-700">Payment Plan</td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4 text-xs">
                    {p.paymentPlan ? "Yes" : "Pay in full"}
                  </td>
                ))}
              </tr>
              {pathways.some((p) => p.paymentPlan) && (
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3 md:p-4 font-semibold text-gray-700">Deposit / Monthly</td>
                  {pathways.map((p) => (
                    <td key={p.id} className="p-3 md:p-4 text-xs">
                      {p.paymentPlan
                        ? `${formatPrice(p.deposit)} / ${formatPrice(p.monthlyInstalment)} × ${p.instalments}`
                        : "-"}
                    </td>
                  ))}
                </tr>
              )}
              <tr className="bg-[#016068]/5">
                <td className="p-3 md:p-4"></td>
                {pathways.map((p) => (
                  <td key={p.id} className="p-3 md:p-4">
                    {p.external ? (
                      <Button asChild className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]">
                        <a href={p.href} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </Button>
                    ) : (
                      <Button asChild className="text-white rounded text-sm px-8 font-bold h-10 w-full max-w-[200px] bg-[#016068]">
                        <Link href={p.href}>View Pathway</Link>
                      </Button>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-700 my-8 py-4 px-4 bg-[#016068]/10 rounded-lg text-center font-medium">
          {disclaimer}
        </p>
      </div>
    </section>
  );
}
