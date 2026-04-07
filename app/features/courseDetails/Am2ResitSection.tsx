import React from "react";
import {
  am2MainAssessmentPricing,
  am2ResitPricing,
  am2ResitSections,
  am2ResitSectionsHeading,
} from "@/content/am2-assessment-course";

function FeeTable({
  rows,
}: {
  rows: { label: string; fee: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-gray-100 last:border-b-0 odd:bg-gray-50/80"
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-800 align-top"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 font-semibold text-[#016068] whitespace-nowrap">
                {row.fee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Am2ResitSection() {
  const compositeKeys = Object.keys(
    am2ResitPricing.composite,
  ) as (keyof typeof am2ResitPricing.composite)[];
  const individualKeys = Object.keys(
    am2ResitPricing.individualRows,
  ) as (keyof typeof am2ResitPricing.individualRows)[];

  return (
    <section
      className="bg-white border-t border-gray-200"
      aria-labelledby="am2-pricing-resits-heading"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">
        <h2
          id="am2-pricing-resits-heading"
          className="font-outfit font-bold text-xl sm:text-2xl text-[#016068] mb-2"
        >
          Assessment pricing & resits
        </h2>
        <p className="text-sm text-gray-600 mb-8 max-w-3xl">
          The fee you pay depends on which assessment and apprenticeship
          version applies. We confirm the correct price when you book.
        </p>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mb-3">
          Course duration
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-10">
          <li>AM2 — two and a half days</li>
          <li>AM2S — three days</li>
          <li>AM2E — three days</li>
        </ul>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mb-3">
          Main assessment fees
        </h3>
        <FeeTable
          rows={am2MainAssessmentPricing.map((r) => ({
            label: r.label,
            fee: r.fee,
          }))}
        />
        <p className="mt-4 text-sm font-semibold text-gray-900">
          <a
            href="tel:08001123310"
            className="text-[#016068] underline underline-offset-2 hover:opacity-80"
          >
            Ring us on 0800 112 3310 to book
          </a>
        </p>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mt-12 mb-3">
          {am2ResitSectionsHeading}
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1.5 mb-10">
          {am2ResitSections.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mb-4">
          Resit costs
        </h3>
        <div className="flex flex-col gap-8 mb-12">
          {compositeKeys.map((key) => {
            const block = am2ResitPricing.composite[key];
            const rows = Object.entries(block).map(([label, fee]) => ({
              label,
              fee,
            }));
            return (
              <div key={key}>
                <p className="text-sm font-semibold text-[#016068] mb-2">
                  {key}
                </p>
                <FeeTable rows={rows} />
              </div>
            );
          })}
        </div>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mb-4">
          Section — resit fee
        </h3>
        <div className="flex flex-col gap-8">
          {individualKeys.map((key) => (
            <div key={key}>
              <p className="text-sm font-semibold text-[#016068] mb-2">
                {key}
              </p>
              <FeeTable rows={[...am2ResitPricing.individualRows[key]]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
